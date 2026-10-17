import hashlib
import json
import threading
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional, Tuple
from backend.schemas.purchase import AuditBlock

class AuditLedger:
    """
    Cryptographic SHA-256 hash-chained audit ledger.
    Every authorization evaluation creates an immutable, verifiable block.
    """
    def __init__(self):
        self._lock = threading.Lock()
        self._chain: List[AuditBlock] = []
        self._trace_index: Dict[str, int] = {}
        # Initialize with Genesis Block
        self._create_genesis_block()

    def _calculate_hash(self, index: int, timestamp: str, trace_id: str, agent_id: str, merchant_id: str,
                        decision: str, reason_code: str, amount: float, risk_score: float,
                        payload_hash: str, prev_hash: str) -> str:
        data_string = f"{index}|{timestamp}|{trace_id}|{agent_id}|{merchant_id}|{decision}|{reason_code}|{amount:.2f}|{risk_score:.3f}|{payload_hash}|{prev_hash}"
        return hashlib.sha256(data_string.encode("utf-8")).hexdigest()

    def _create_genesis_block(self):
        timestamp = "2026-01-01T00:00:00.000000Z"
        genesis_hash = self._calculate_hash(
            index=0,
            timestamp=timestamp,
            trace_id="TRACE_GENESIS_ROOT",
            agent_id="SYSTEM",
            merchant_id="SYSTEM",
            decision="GENESIS",
            reason_code="INITIAL_LEDGER_ROOT",
            amount=0.0,
            risk_score=0.0,
            payload_hash="0" * 64,
            prev_hash="0" * 64
        )
        genesis_block = AuditBlock(
            index=0,
            timestamp=timestamp,
            trace_id="TRACE_GENESIS_ROOT",
            agent_id="SYSTEM",
            merchant_id="SYSTEM",
            decision="GENESIS",
            reason_code="INITIAL_LEDGER_ROOT",
            amount=0.0,
            risk_score=0.0,
            payload_hash="0" * 64,
            prev_hash="0" * 64,
            block_hash=genesis_hash
        )
        self._chain.append(genesis_block)
        self._trace_index["TRACE_GENESIS_ROOT"] = 0

    def record_decision(
        self,
        trace_id: str,
        agent_id: str,
        merchant_id: str,
        decision: str,
        reason_code: str,
        amount: float,
        risk_score: float,
        payload_data: Dict[str, Any]
    ) -> AuditBlock:
        with self._lock:
            prev_block = self._chain[-1]
            index = len(self._chain)
            timestamp = datetime.now(timezone.utc).isoformat()
            
            # Compute canonical payload hash
            payload_json = json.dumps(payload_data, sort_keys=True)
            payload_hash = hashlib.sha256(payload_json.encode("utf-8")).hexdigest()

            block_hash = self._calculate_hash(
                index=index,
                timestamp=timestamp,
                trace_id=trace_id,
                agent_id=agent_id,
                merchant_id=merchant_id,
                decision=decision,
                reason_code=reason_code,
                amount=amount,
                risk_score=risk_score,
                payload_hash=payload_hash,
                prev_hash=prev_block.block_hash
            )

            block = AuditBlock(
                index=index,
                timestamp=timestamp,
                trace_id=trace_id,
                agent_id=agent_id,
                merchant_id=merchant_id,
                decision=decision,
                reason_code=reason_code,
                amount=amount,
                risk_score=risk_score,
                payload_hash=payload_hash,
                prev_hash=prev_block.block_hash,
                block_hash=block_hash
            )
            self._chain.append(block)
            self._trace_index[trace_id] = index
            return block

    def get_block_by_trace(self, trace_id: str) -> Optional[AuditBlock]:
        with self._lock:
            index = self._trace_index.get(trace_id)
            if index is not None and 0 <= index < len(self._chain):
                return self._chain[index]
            return None

    def get_all_blocks(self) -> List[AuditBlock]:
        with self._lock:
            return list(self._chain)

    def verify_chain(self) -> Tuple[bool, str]:
        """
        Validates the entire cryptographic hash chain.
        Returns (is_valid, message).
        """
        with self._lock:
            if not self._chain:
                return False, "Ledger is empty"

            for i in range(1, len(self._chain)):
                prev = self._chain[i - 1]
                curr = self._chain[i]

                # Check linkage
                if curr.prev_hash != prev.block_hash:
                    return False, f"Broken link at block #{curr.index}: prev_hash does not match block #{prev.index} hash."

                # Recompute hash
                recomputed = self._calculate_hash(
                    index=curr.index,
                    timestamp=curr.timestamp,
                    trace_id=curr.trace_id,
                    agent_id=curr.agent_id,
                    merchant_id=curr.merchant_id,
                    decision=curr.decision,
                    reason_code=curr.reason_code,
                    amount=curr.amount,
                    risk_score=curr.risk_score,
                    payload_hash=curr.payload_hash,
                    prev_hash=curr.prev_hash
                )
                if recomputed != curr.block_hash:
                    return False, f"Hash mismatch at block #{curr.index}: data has been tampered with."

            return True, f"Cryptographic integrity verified: all {len(self._chain)} blocks valid."

audit_ledger = AuditLedger()
