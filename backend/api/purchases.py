from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from backend.schemas.purchase import PurchaseRequest, PurchaseEvaluationResponse
from backend.services.orchestrator import orchestrator
from backend.services.catalogue_service import catalogue_service
from backend.services.policy_engine import policy_engine
from backend.services.demo_scenarios import create_demo_mandate

router = APIRouter(prefix="/api/purchases", tags=["Purchases"])

@router.post("/evaluate", response_model=PurchaseEvaluationResponse)
def evaluate_purchase(request: PurchaseRequest):
    """
    Submits an agent purchase request to Fides gateway.
    Interprets intent via NVIDIA Nemotron (Nebius Token Factory), validates through
    Ed25519 signature checks, runs scikit-learn risk scoring, and deterministically authorizes.
    """
    try:
        response = orchestrator.evaluate_purchase(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation pipeline failed: {str(e)}")

@router.get("/catalogue", response_model=List[Dict[str, Any]])
def get_catalogue():
    """Returns the merchant catalogue with server-authoritative prices."""
    return catalogue_service.get_all_items()

@router.get("/merchants", response_model=List[Dict[str, Any]])
def get_merchants():
    """Returns approved merchants and allowed categories."""
    return list(policy_engine.approved_merchants.values())

@router.get("/mandates/sample")
def get_sample_mandates():
    """Returns ready-to-use sample mandates for UI playground."""
    active_grocery = create_demo_mandate("MAN_ACTIVE_GROC_700", max_amount=700.0, is_expired=False)
    expired_grocery = create_demo_mandate("MAN_EXPIRED_GROC_700", max_amount=700.0, is_expired=True)
    high_cap_tech = create_demo_mandate("MAN_TECH_OFFICE_2500", max_amount=2500.0, is_expired=False,
                                        categories=["Groceries", "Office Supplies", "Electronics"])
    return {
        "active_grocery_mandate": active_grocery.model_dump(),
        "expired_grocery_mandate": expired_grocery.model_dump(),
        "high_cap_tech_mandate": high_cap_tech.model_dump()
    }
