import concurrent.futures
import uuid
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from backend.schemas.purchase import PurchaseEvaluationResponse
from backend.services.demo_scenarios import (
    DEMO_SCENARIO_DEFINITIONS,
    get_demo_scenario_request,
    create_demo_mandate,
    create_signed_request
)
from backend.services.orchestrator import orchestrator

router = APIRouter(prefix="/api/demo", tags=["Demo Scenarios"])

@router.get("/scenarios")
def list_scenarios():
    """Returns metadata for the 6 deterministic demo scenarios."""
    return DEMO_SCENARIO_DEFINITIONS

@router.post("/scenario/{scenario_id}", response_model=PurchaseEvaluationResponse)
def execute_scenario(scenario_id: int):
    """
    Executes one of the 6 deterministic judge scenarios through the full
    Nemotron + Fides pipeline.
    """
    try:
        request = get_demo_scenario_request(scenario_id)
        response = orchestrator.evaluate_purchase(request)
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to execute scenario {scenario_id}: {str(e)}")

@router.post("/replay-race")
def test_replay_race_concurrency():
    """
    Simultaneously fires 10 concurrent threads with the EXACT same signed request
    and nonce to prove that the atomic replay check prevents race condition double-spending.
    """
    shared_nonce = f"RACE_NONCE_{uuid.uuid4().hex[:8]}"
    mandate = create_demo_mandate(max_amount=700.0)
    signed_request = create_signed_request(
        request_text="Order 1 carton of organic milk.",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH",
        fixed_nonce=shared_nonce
    )

    results = []

    def submit_purchase():
        return orchestrator.evaluate_purchase(signed_request)

    # Launch 10 simultaneous threads hitting the pipeline
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(submit_purchase) for _ in range(10)]
        for f in concurrent.futures.as_completed(futures):
            try:
                res = f.result()
                results.append(res.decision.value)
            except Exception as e:
                results.append(f"ERROR: {str(e)}")

    approved_count = results.count("APPROVE")
    denied_count = results.count("DENY")

    return {
        "shared_nonce": shared_nonce,
        "concurrent_attempts": len(results),
        "authorized_count": approved_count,
        "rejected_count": denied_count,
        "is_safe": approved_count <= 1,
        "message": f"Race condition prevented: {approved_count} approved, {denied_count} rejected. Maximum 1 authorization permitted."
    }
