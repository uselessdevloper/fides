from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
from backend.services.bee_service import bee_service

router = APIRouter(prefix="/api/bee", tags=["Bee Wearable AI"])

class RecordMemoRequest(BaseModel):
    text: str
    category: Optional[str] = "commerce_authorization"

class ResolvePromptRequest(BaseModel):
    action: str  # "APPROVE" or "DENY"

@router.get("/status")
def get_bee_status() -> Dict[str, Any]:
    """Returns the operational status, battery, and active haptic prompt of the Bee wearable."""
    return bee_service.get_status()

@router.get("/transcripts")
def get_bee_transcripts() -> List[Dict[str, Any]]:
    """Returns the stream of real audio voice memos captured by the Bee device."""
    return bee_service.recent_transcripts

@router.post("/record")
def record_voice_memo(payload: RecordMemoRequest) -> Dict[str, Any]:
    """Simulates recording an on-device ambient memo or purchase instruction from Bee."""
    return bee_service.record_voice_memo(payload.text, payload.category or "commerce_authorization")

@router.post("/haptic-prompt")
def trigger_haptic_prompt(
    trace_id: str = Query(..., description="Transaction trace ID"),
    summary: str = Query(..., description="Purchase summary"),
    amount: float = Query(..., description="Purchase total")
) -> Dict[str, Any]:
    """Sends a double-pulse haptic vibration and authorization card to the Bee wearable."""
    return bee_service.push_wrist_haptic_confirmation(trace_id, summary, amount)

@router.post("/resolve/{prompt_id}")
def resolve_haptic_prompt(prompt_id: str, payload: ResolvePromptRequest) -> Dict[str, Any]:
    """Resolves an active wrist haptic card via wearable gesture or button tap."""
    result = bee_service.resolve_wrist_confirmation(prompt_id, payload.action)
    if not result.get("success"):
        raise HTTPException(status_code=404, detail=result.get("message"))
    return result
