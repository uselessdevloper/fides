import pytest
from backend.services.audit_ledger import AuditLedger

def test_audit_ledger_genesis_and_chaining():
    ledger = AuditLedger()
    blocks = ledger.get_all_blocks()
    assert len(blocks) == 1
    assert blocks[0].index == 0
    assert blocks[0].trace_id == "TRACE_GENESIS_ROOT"

    # Add block 1
    b1 = ledger.record_decision(
        trace_id="TRC_TEST_001",
        agent_id="AGENT_ALPHA",
        merchant_id="MERCHANT_ZEPTO",
        decision="APPROVE",
        reason_code="POLICY_APPROVED",
        amount=150.0,
        risk_score=0.12,
        payload_data={"test": "data_1"}
    )
    assert b1.index == 1
    assert b1.prev_hash == blocks[0].block_hash

    # Add block 2
    b2 = ledger.record_decision(
        trace_id="TRC_TEST_002",
        agent_id="AGENT_BETA",
        merchant_id="MERCHANT_BLINK",
        decision="DENY",
        reason_code="POLICY_LIMIT_EXCEEDED",
        amount=1200.0,
        risk_score=0.91,
        payload_data={"test": "data_2"}
    )
    assert b2.index == 2
    assert b2.prev_hash == b1.block_hash

    # Verify cryptographic integrity
    is_valid, msg = ledger.verify_chain()
    assert is_valid is True
    assert "all 3 blocks valid" in msg

def test_audit_ledger_detects_tampering():
    ledger = AuditLedger()
    b1 = ledger.record_decision(
        trace_id="TRC_TAMPER_001",
        agent_id="AGENT_ALPHA",
        merchant_id="MERCHANT_ZEPTO",
        decision="APPROVE",
        reason_code="POLICY_APPROVED",
        amount=100.0,
        risk_score=0.10,
        payload_data={"data": 1}
    )
    
    # Verify initial valid state
    is_valid, _ = ledger.verify_chain()
    assert is_valid is True

    # Malicious actor mutates amount directly in memory
    b1.amount = 999999.0

    # Verification must detect the tampering
    tampered_valid, tampered_msg = ledger.verify_chain()
    assert tampered_valid is False
    assert "tampered" in tampered_msg.lower()
