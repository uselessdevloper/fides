import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/firetv", tags=["Fire TV"])

class FireTVState:
    def __init__(self):
        self.device_id = "firetv_stick_4k_livingroom"
        self.os_type = "Vega OS / Fire OS 8"
        self.current_app = "Fides Ambient Checkout Companion"
        self.active_notification: Optional[Dict[str, Any]] = None
        self.notifications_history: List[Dict[str, Any]] = []

    def get_status(self) -> Dict[str, Any]:
        return {
            "device_id": self.device_id,
            "device_name": "Living Room Fire TV (55\" 4K)",
            "os": self.os_type,
            "status": "ACTIVE_10_FOOT_MODE",
            "resolution": "3840x2160 @ 60Hz",
            "active_notification": self.active_notification,
            "history_count": len(self.notifications_history)
        }

    def push_notification(self, trace_id: str, summary: str, amount: float) -> Dict[str, Any]:
        notif = {
            "notification_id": f"FTV_{uuid.uuid4().hex[:8].upper()}",
            "trace_id": trace_id,
            "summary": summary,
            "amount": amount,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "PENDING_REMOTE_CONFIRMATION",
            "ui_layout": "BOTTOM_RIGHT_PICTURE_IN_PICTURE"
        }
        self.active_notification = notif
        self.notifications_history.append(notif)
        return notif

    def resolve_notification(self, notification_id: str, action: str) -> Dict[str, Any]:
        if not self.active_notification or self.active_notification.get("notification_id") != notification_id:
            raise HTTPException(status_code=404, detail="Notification not active or already resolved.")
        
        self.active_notification["status"] = f"RESOLVED_{action.upper()}"
        self.active_notification["resolved_at"] = datetime.now(timezone.utc).isoformat()
        resolved = self.active_notification
        self.active_notification = None
        return resolved

firetv_state = FireTVState()

class ResolveRequest(BaseModel):
    action: str  # "APPROVE" or "DENY"

@router.get("/status")
def get_firetv_status():
    """Returns status of Fire TV living room display and active visual card."""
    return firetv_state.get_status()

@router.post("/notify")
def post_firetv_notification(trace_id: str, summary: str, amount: float):
    """Pushes a visual approval card onto the Fire TV screen."""
    return firetv_state.push_notification(trace_id, summary, amount)

@router.post("/resolve/{notification_id}")
def resolve_firetv_card(notification_id: str, req: ResolveRequest):
    """Simulates pressing the Fire TV Remote 'Select' or 'Back' button to approve/deny."""
    return firetv_state.resolve_notification(notification_id, req.action)
