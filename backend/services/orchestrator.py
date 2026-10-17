import uuid
import threading
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from backend.schemas.purchase import (
    PurchaseRequest,
    PurchaseEvaluationResponse,
    CandidatePurchaseIntent,
    DecisionOutcome,
    HumanApprovalItem,
    VerificationCheckResult
)
from backend.services.nebius_client import nebius_client
from backend.services.intent_parser import IntentParser, IntentParserError
from backend.services.catalogue_service import catalogue_service
from backend.services.verification import verification_service
from backend.services.risk_scorer import risk_scorer
from backend.services.policy_engine import policy_engine
from backend.services.audit_ledger import audit_ledger

class Orchestrator:
    def __init__(self):
        valid_skus = [item["sku"] for item in catalogue_service.get_all_items()]
        self.parser = IntentParser(valid_skus=valid_skus)
        self._lock = threading.Lock()
        self._pending_approvals: Dict[str, HumanApprovalItem] = {}
        self._decisions: Dict[str, PurchaseEvaluationResponse] = {}

    def evaluate_purchase(self, request: PurchaseRequest) -> PurchaseEvaluationResponse:
        """
        Executes the authoritative Fides transaction lifecycle:
        1. Nemotron runtime inference via Nebius Token Factory
        2. Strict Pydantic validation & SKU filtering
        3. Server-authoritative catalogue pricing & category resolution
        4. Ed25519 signature, mandate expiry, and atomic replay verification
        5. Scikit-learn behavioral risk model scoring
        6. Deterministic YAML policy engine authorization
        7. SHA-256 hash-chained immutable audit ledger recording
        """
        trace_id = f"TRC_{uuid.uuid4().hex[:12].upper()}"
        timestamp_str = datetime.now(timezone.utc).isoformat()
        
        # 1. Step 2 in workflow: Nemotron interprets the request via Nebius Token Factory
        catalogue_prompt_summary = catalogue_service.get_catalogue_summary_for_prompt()
        raw_completion, latency_ms, model_name, usage_stats = nebius_client.interpret_purchase_request(
            request_text=request.request_text,
            catalogue_summary=catalogue_prompt_summary
        )

        # 2. Strict Pydantic validation of model output
        parse_error = None
        try:
            candidate_intent = self.parser.parse_and_validate(raw_completion)
        except IntentParserError as e:
            parse_error = str(e)
            candidate_intent = CandidatePurchaseIntent(
                line_items=[],
                raw_reasoning=f"Parsing error: {parse_error}"
            )

        # 3. Server-side price resolution from trusted catalogue (Model NEVER sets prices)
        resolved_items, server_total, resolved_categories = catalogue_service.resolve_items(
            candidate_intent.line_items
        )

        # 4. Cryptographic and policy verification checks
        verification_result = verification_service.verify_request(
            request=request,
            resolved_categories=resolved_categories,
            approved_merchants=policy_engine.approved_merchants
        )

        # 5. Scikit-learn Risk scoring model
        if len(resolved_items) > 0:
            risk_score, risk_factors = risk_scorer.evaluate_risk(
                agent_id=request.mandate.agent_id,
                total_amount=server_total,
                mandate_cap=request.mandate.max_amount,
                item_count=sum(i.qty for i in resolved_items),
                categories=list(resolved_categories)
            )
        else:
            risk_score = 0.95
            risk_factors = [f"Model extraction failure: {parse_error or 'No catalogue items matched'}"]

        # 6. Step 5 in workflow: Deterministic Policy Engine evaluation
        if parse_error:
            # Safe Fallback: Never silently approve when model output is invalid
            decision = DecisionOutcome.DENY
            reason_code = f"FAIL_SAFE_REJECT: Model interpretation failed ({parse_error})"
        else:
            decision, reason_code = policy_engine.evaluate(
                mandate=request.mandate,
                verification=verification_result,
                server_total=server_total,
                resolved_items=resolved_items,
                risk_score=risk_score
            )

        # 7. Escalation: If STEP_UP, register human review item
        human_approval_id = None
        if decision == DecisionOutcome.STEP_UP:
            human_approval_id = f"APP_{uuid.uuid4().hex[:10].upper()}"
            approval_item = HumanApprovalItem(
                approval_id=human_approval_id,
                trace_id=trace_id,
                timestamp=timestamp_str,
                agent_id=request.mandate.agent_id,
                merchant_id=request.merchant_id,
                total_amount=server_total,
                currency=request.mandate.currency,
                risk_score=risk_score,
                reason=reason_code,
                status="PENDING"
            )
            with self._lock:
                self._pending_approvals[human_approval_id] = approval_item

        # 8. Step 6 in workflow: SHA-256 Hash-chained audit ledger recording
        audit_payload = {
            "trace_id": trace_id,
            "request_text": request.request_text,
            "merchant_id": request.merchant_id,
            "mandate_id": request.mandate.mandate_id,
            "agent_id": request.mandate.agent_id,
            "nonce": request.nonce,
            "server_total": server_total,
            "risk_score": risk_score,
            "model_used": model_name,
            "verification_passed": verification_result.all_passed,
            "decision": decision.value,
            "reason_code": reason_code
        }

        audit_block = audit_ledger.record_decision(
            trace_id=trace_id,
            agent_id=request.mandate.agent_id,
            merchant_id=request.merchant_id,
            decision=decision.value,
            reason_code=reason_code,
            amount=server_total,
            risk_score=risk_score,
            payload_data=audit_payload
        )

        chain_valid, _ = audit_ledger.verify_chain()

        response = PurchaseEvaluationResponse(
            trace_id=trace_id,
            timestamp=timestamp_str,
            natural_language_request=request.request_text,
            model_used=model_name,
            nemotron_inference_latency_ms=latency_ms,
            candidate_intent=candidate_intent,
            resolved_items=resolved_items,
            server_calculated_total=server_total,
            mandate_limit=request.mandate.max_amount,
            verification=verification_result,
            risk_score=risk_score,
            risk_factors=risk_factors,
            decision=decision,
            reason_code=reason_code,
            human_approval_id=human_approval_id,
            audit_block_index=audit_block.index,
            audit_block_hash=audit_block.block_hash,
            audit_verified=chain_valid
        )

        with self._lock:
            self._decisions[trace_id] = response

        return response

    def get_decision(self, trace_id: str) -> Optional[PurchaseEvaluationResponse]:
        with self._lock:
            return self._decisions.get(trace_id)

    def list_pending_approvals(self) -> List[HumanApprovalItem]:
        with self._lock:
            return [item for item in self._pending_approvals.values() if item.status == "PENDING"]

    def resolve_approval(self, approval_id: str, reviewer_id: str, action: str, notes: str) -> Dict[str, Any]:
        """
        Re-evaluates authorization conditions and applies human reviewer decision.
        """
        with self._lock:
            approval_item = self._pending_approvals.get(approval_id)
            if not approval_item:
                raise ValueError(f"Approval request '{approval_id}' not found.")
            if approval_item.status != "PENDING":
                raise ValueError(f"Approval request '{approval_id}' already resolved with status '{approval_item.status}'.")

            now_iso = datetime.now(timezone.utc).isoformat()
            if action.upper() == "APPROVE":
                approval_item.status = "APPROVED"
                final_decision = "HUMAN_APPROVED"
            else:
                approval_item.status = "REJECTED"
                final_decision = "HUMAN_REJECTED"

            approval_item.resolved_by = reviewer_id
            approval_item.resolved_at = now_iso

            # Update corresponding decision if present
            decision_resp = self._decisions.get(approval_item.trace_id)
            if decision_resp:
                decision_resp.decision = DecisionOutcome.APPROVE if action.upper() == "APPROVE" else DecisionOutcome.DENY
                decision_resp.reason_code = f"HUMAN_OVERRIDE_{action.upper()}: Reviewed by {reviewer_id}. Notes: {notes}"

        # Record resolution in audit ledger
        audit_ledger.record_decision(
            trace_id=f"{approval_item.trace_id}_RESOLVED",
            agent_id=f"REVIEWER:{reviewer_id}",
            merchant_id=approval_item.merchant_id,
            decision=final_decision,
            reason_code=f"Human review resolution: {action.upper()}. Notes: {notes}",
            amount=approval_item.total_amount,
            risk_score=approval_item.risk_score,
            payload_data={
                "approval_id": approval_id,
                "trace_id": approval_item.trace_id,
                "reviewer_id": reviewer_id,
                "action": action,
                "notes": notes
            }
        )

        return {
            "approval_id": approval_id,
            "trace_id": approval_item.trace_id,
            "status": approval_item.status,
            "resolved_by": reviewer_id,
            "resolved_at": now_iso
        }

orchestrator = Orchestrator()
