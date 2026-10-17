import pytest
from backend.services.policy_engine import policy_engine
from backend.schemas.purchase import DecisionOutcome, VerificationCheckResult, ResolvedItem
from backend.services.demo_scenarios import create_demo_mandate

def test_policy_engine_approve_clean():
    mandate = create_demo_mandate(max_amount=700.0)
    verif = VerificationCheckResult(
        signature_valid=True,
        mandate_not_expired=True,
        trusted_key_verified=True,
        merchant_approved=True,
        category_allowed=True,
        replay_status_clean=True,
        all_passed=True
    )
    items = [
        ResolvedItem(sku="SKU_GROC_001", name="Milk", category="Groceries", unit_price=75.0, qty=2, line_total=150.0)
    ]
    decision, reason = policy_engine.evaluate(
        mandate=mandate,
        verification=verif,
        server_total=150.0,
        resolved_items=items,
        risk_score=0.15
    )
    assert decision == DecisionOutcome.APPROVE
    assert "APPROVED" in reason

def test_policy_engine_denies_amount_exceeded():
    mandate = create_demo_mandate(max_amount=700.0)
    verif = VerificationCheckResult(
        signature_valid=True,
        mandate_not_expired=True,
        trusted_key_verified=True,
        merchant_approved=True,
        category_allowed=True,
        replay_status_clean=True,
        all_passed=True
    )
    items = [
        ResolvedItem(sku="SKU_GROC_005", name="Coffee", category="Groceries", unit_price=350.0, qty=3, line_total=1050.0)
    ]
    # Total is ₹1050 > ₹700 cap
    decision, reason = policy_engine.evaluate(
        mandate=mandate,
        verification=verif,
        server_total=1050.0,
        resolved_items=items,
        risk_score=0.20
    )
    assert decision == DecisionOutcome.DENY
    assert "POLICY_LIMIT_EXCEEDED" in reason

def test_policy_engine_step_up_for_moderate_risk():
    mandate = create_demo_mandate(max_amount=700.0)
    verif = VerificationCheckResult(
        signature_valid=True,
        mandate_not_expired=True,
        trusted_key_verified=True,
        merchant_approved=True,
        category_allowed=True,
        replay_status_clean=True,
        all_passed=True
    )
    items = [
        ResolvedItem(sku="SKU_OFFC_101", name="Notebook", category="Office Supplies", unit_price=110.0, qty=2, line_total=220.0)
    ]
    # Risk score 0.45 triggers human escalation step-up (0.30 <= risk < 0.70)
    decision, reason = policy_engine.evaluate(
        mandate=mandate,
        verification=verif,
        server_total=220.0,
        resolved_items=items,
        risk_score=0.45
    )
    assert decision == DecisionOutcome.STEP_UP
    assert "STEP_UP" in reason

def test_policy_engine_denies_security_failures():
    mandate = create_demo_mandate(max_amount=700.0)
    verif = VerificationCheckResult(
        signature_valid=False,  # Bad signature!
        mandate_not_expired=True,
        trusted_key_verified=True,
        merchant_approved=True,
        category_allowed=True,
        replay_status_clean=True,
        all_passed=False
    )
    items = [
        ResolvedItem(sku="SKU_GROC_001", name="Milk", category="Groceries", unit_price=75.0, qty=1, line_total=75.0)
    ]
    decision, reason = policy_engine.evaluate(
        mandate=mandate,
        verification=verif,
        server_total=75.0,
        resolved_items=items,
        risk_score=0.10
    )
    assert decision == DecisionOutcome.DENY
    assert "SECURITY_VIOLATION" in reason
