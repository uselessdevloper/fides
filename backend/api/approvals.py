from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from backend.schemas.purchase import HumanApprovalItem, HumanApprovalResolveRequest
from backend.services.orchestrator import orchestrator

router = APIRouter(prefix="/api/approvals", tags=["Human Approvals"])

@router.get("", response_model=List[HumanApprovalItem])
def list_pending_approvals():
    """Lists requests waiting for human supervisor approval."""
    return orchestrator.list_pending_approvals()

@router.post("/{approval_id}/resolve")
def resolve_approval(approval_id: str, request: HumanApprovalResolveRequest):
    """
    Approve or reject a pending STEP_UP request with authorization re-evaluation.
    Does not trust a raw client action without permission check and ledger recording.
    """
    # Permission verification: ensure reviewer is authorized
    if not request.reviewer_id or request.reviewer_id.strip() == "":
        raise HTTPException(status_code=403, detail="Reviewer identity required to resolve escalations.")

    try:
        result = orchestrator.resolve_approval(
            approval_id=approval_id,
            reviewer_id=request.reviewer_id,
            action=request.action,
            notes=request.review_notes
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to resolve approval: {str(e)}")
