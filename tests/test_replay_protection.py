import pytest
import concurrent.futures
import uuid
from backend.services.orchestrator import orchestrator
from backend.services.demo_scenarios import create_demo_mandate, create_signed_request
from backend.schemas.purchase import DecisionOutcome

def test_sequential_replay_protection():
    shared_nonce = f"SEQ_REPLAY_{uuid.uuid4().hex[:10]}"
    mandate = create_demo_mandate(max_amount=700.0)
    req = create_signed_request(
        request_text="Order 1 whole milk.",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH",
        fixed_nonce=shared_nonce
    )

    # First attempt: should evaluate and pass verification
    resp1 = orchestrator.evaluate_purchase(req)
    assert resp1.verification.replay_status_clean is True

    # Second attempt with the SAME nonce: must be rejected as replay attack!
    resp2 = orchestrator.evaluate_purchase(req)
    assert resp2.verification.replay_status_clean is False
    assert resp2.decision == DecisionOutcome.DENY
    assert "REPLAY" in resp2.reason_code

def test_concurrent_replay_race_regression():
    """
    CRITICAL REGRESSION TEST:
    Verifies that simultaneous copies of the same request cannot race past
    replay protection due to atomic locking in verification service.
    Asserts that AT MOST ONE execution is authorized!
    """
    shared_nonce = f"CONCURRENT_RACE_{uuid.uuid4().hex[:10]}"
    mandate = create_demo_mandate(max_amount=700.0)
    signed_req = create_signed_request(
        request_text="Order 1 farm eggs.",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH",
        fixed_nonce=shared_nonce
    )

    num_threads = 10
    results = []

    def run_eval():
        return orchestrator.evaluate_purchase(signed_req)

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [executor.submit(run_eval) for _ in range(num_threads)]
        for f in concurrent.futures.as_completed(futures):
            res = f.result()
            results.append(res.decision)

    approved_count = results.count(DecisionOutcome.APPROVE)
    denied_count = results.count(DecisionOutcome.DENY)

    # Exactly 1 request may be authorized; all others MUST be denied!
    assert approved_count == 1, f"Concurrency race failure: expected 1 approval, got {approved_count}"
    assert denied_count == num_threads - 1, f"Expected {num_threads - 1} denials, got {denied_count}"
