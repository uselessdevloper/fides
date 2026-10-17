import yaml
import os
from typing import Dict, Any, List, Tuple, Optional
from backend.schemas.purchase import DecisionOutcome, VerificationCheckResult, SpendingMandate, ResolvedItem

class PolicyEngine:
    def __init__(self, config_path: Optional[str] = None):
        if not config_path:
            config_path = os.path.join(os.path.dirname(__file__), "..", "config", "policies.yaml")
        
        with open(config_path, "r") as f:
            self.config = yaml.safe_load(f)

        self.limits = self.config.get("limits", {})
        self.default_max_amount = float(self.limits.get("default_max_transaction_amount", 700.0))
        self.max_items = int(self.limits.get("max_items_per_transaction", 10))
        
        self.risk_cfg = self.config.get("risk_scoring", {})
        self.approve_thresh = float(self.risk_cfg.get("approve_threshold", 0.30))
        self.step_up_thresh = float(self.risk_cfg.get("step_up_threshold", 0.70))

        merchants_list = self.config.get("merchants", {}).get("approved_merchants", [])
        self.approved_merchants: Dict[str, Dict[str, Any]] = {
            m["id"]: m for m in merchants_list
        }

    def evaluate(
        self,
        mandate: SpendingMandate,
        verification: VerificationCheckResult,
        server_total: float,
        resolved_items: List[ResolvedItem],
        risk_score: float
    ) -> Tuple[DecisionOutcome, str]:
        """
        Deterministic, non-LLM authorization policy evaluation.
        Produces APPROVE, STEP_UP, or DENY with explicit audit reason code.
        """
        # 1. Immediate Security Vetoes
        if not verification.signature_valid:
            return DecisionOutcome.DENY, "SECURITY_VIOLATION_INVALID_SIGNATURE"

        if not verification.trusted_key_verified:
            return DecisionOutcome.DENY, "SECURITY_VIOLATION_UNTRUSTED_AGENT_KEY"

        if not verification.mandate_not_expired:
            return DecisionOutcome.DENY, "POLICY_MANDATE_EXPIRED"

        if not verification.replay_status_clean:
            return DecisionOutcome.DENY, "SECURITY_VIOLATION_REPLAY_ATTACK_DETECTED"

        if not verification.merchant_approved:
            return DecisionOutcome.DENY, "POLICY_UNAPPROVED_MERCHANT"

        if not verification.category_allowed:
            return DecisionOutcome.DENY, "POLICY_UNAUTHORIZED_CATEGORY"

        # 2. Strict Limit & Amount Controls
        effective_cap = min(mandate.max_amount, self.default_max_amount)
        if server_total > effective_cap:
            return (
                DecisionOutcome.DENY,
                f"POLICY_LIMIT_EXCEEDED: Total ₹{server_total:.2f} exceeds effective cap of ₹{effective_cap:.2f}"
            )

        if len(resolved_items) == 0:
            return DecisionOutcome.DENY, "POLICY_EMPTY_PURCHASE_INTENT"

        total_qty = sum(item.qty for item in resolved_items)
        if total_qty > self.max_items:
            return (
                DecisionOutcome.DENY,
                f"POLICY_ITEM_LIMIT_EXCEEDED: Requested {total_qty} units exceeds limit of {self.max_items}"
            )

        # 3. Behavioral Risk Engine Evaluation
        if risk_score >= self.step_up_thresh:
            return (
                DecisionOutcome.DENY,
                f"POLICY_HIGH_BEHAVIORAL_RISK: Calibrated risk score {risk_score:.2f} >= threshold {self.step_up_thresh:.2f}"
            )

        if risk_score >= self.approve_thresh:
            # Moderate risk triggers human escalation step-up
            return (
                DecisionOutcome.STEP_UP,
                f"POLICY_STEP_UP_REQUIRED: Risk score {risk_score:.2f} exceeds automatic approval threshold {self.approve_thresh:.2f}"
            )

        # 4. Clean Authorization
        return (
            DecisionOutcome.APPROVE,
            f"POLICY_APPROVED: Cryptographically verified, total ₹{server_total:.2f} within cap ₹{effective_cap:.2f}, risk score {risk_score:.2f} nominal"
        )

policy_engine = PolicyEngine()
