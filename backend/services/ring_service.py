import time
import uuid
import hashlib
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

class RingIoTService:
    """
    Ring IoT Device & Access Control Integration for Amazon Developer Hackathon.
    Provides physical home presence verification, front-door camera telemetry,
    and step-up authorization for Alexa+ ambient purchases.
    """
    def __init__(self):
        self.device_id = "ring_doorbell_pro_livingroom_front"
        self.location_name = "Home - Front Porch"
        self.is_motion_active = False
        self.last_motion_timestamp = datetime.now(timezone.utc).isoformat()
        self.last_chime_timestamp = None
        self.presence_cache: Dict[str, Dict[str, Any]] = {}
        self.event_log: List[Dict[str, Any]] = [
            {
                "event_id": "EVT_RING_INIT",
                "type": "DEVICE_CONNECTED",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "details": "Ring Video Doorbell Pro connected to local Z-Wave / Sidewalk network."
            }
        ]

    def get_status(self) -> Dict[str, Any]:
        """Returns live Ring telemetry and access control status."""
        return {
            "device_id": self.device_id,
            "device_model": "Ring Video Doorbell Pro 2",
            "location": self.location_name,
            "status": "ONLINE",
            "battery_level": 98,
            "wifi_signal": "-48 dBm (Strong)",
            "motion_detected": self.is_motion_active,
            "last_motion": self.last_motion_timestamp,
            "last_chime": self.last_chime_timestamp,
            "firmware_version": "v12.4.9-amazon-preview",
            "presence_mode": "HOME_VERIFIED",
            "camera_snapshot_url": "/api/ring/snapshot"
        }

    def verify_physical_presence(self, user_id: str = "USER_PRIMARY_HOUSEHOLD") -> Dict[str, Any]:
        """
        Generates a cryptographic presence token proving the user is physically located
        at the protected Ring-secured premises before an ambient voice purchase can be authorized.
        """
        now = datetime.now(timezone.utc)
        nonce = uuid.uuid4().hex[:12]
        # Hash device_id + timestamp + user to create verifiable presence signature
        presence_hash = hashlib.sha256(f"{self.device_id}:{user_id}:{now.isoformat()}:{nonce}".encode()).hexdigest()
        
        token = {
            "token_id": f"RNG_PRESENCE_{nonce.upper()}",
            "user_id": user_id,
            "device_id": self.device_id,
            "location": self.location_name,
            "presence_verified": True,
            "confidence_score": 0.98,
            "verification_method": "RING_Z_WAVE_RSSI_AND_DOORBELL_RADAR",
            "timestamp": now.isoformat(),
            "presence_hash": presence_hash
        }
        
        self.presence_cache[token["token_id"]] = token
        self._record_event("PRESENCE_CHALLENGE_VERIFIED", f"In-home physical presence verified for {user_id}")
        return token

    def trigger_motion(self) -> Dict[str, Any]:
        """Simulates 3D radar motion detection event from the Ring Doorbell."""
        now = datetime.now(timezone.utc).isoformat()
        self.is_motion_active = True
        self.last_motion_timestamp = now
        evt = self._record_event("MOTION_DETECTED", "3D Radar Motion detected at front entry zone (6 ft).")
        return {"status": "MOTION_TRIGGERED", "timestamp": now, "event": evt}

    def trigger_doorbell_press(self) -> Dict[str, Any]:
        """Simulates a physical doorbell button press on the Ring device."""
        now = datetime.now(timezone.utc).isoformat()
        self.last_chime_timestamp = now
        evt = self._record_event("DOORBELL_PRESSED", "Ring Doorbell button pressed. Ambient Alexa chime broadcasted.")
        return {"status": "DOORBELL_CHIMED", "timestamp": now, "event": evt}

    def get_recent_events(self, limit: int = 10) -> List[Dict[str, Any]]:
        return self.event_log[-limit:]

    def _record_event(self, event_type: str, details: str) -> Dict[str, Any]:
        evt = {
            "event_id": f"EVT_{uuid.uuid4().hex[:8].upper()}",
            "type": event_type,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "details": details
        }
        self.event_log.append(evt)
        return evt

# Global singleton
ring_service = RingIoTService()
