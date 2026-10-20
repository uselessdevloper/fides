from fastapi import APIRouter, Response
from backend.services.ring_service import ring_service

router = APIRouter(prefix="/api/ring", tags=["Ring IoT"])

@router.get("/status")
def get_ring_status():
    """Returns Ring Video Doorbell telemetry and status."""
    return ring_service.get_status()

@router.get("/events")
def get_ring_events():
    """Returns recent Ring security and motion events."""
    return ring_service.get_recent_events()

@router.post("/motion")
def trigger_motion():
    """Simulates 3D radar motion detection event from the Ring Doorbell."""
    return ring_service.trigger_motion()

@router.post("/doorbell")
def trigger_doorbell():
    """Simulates doorbell chime button press."""
    return ring_service.trigger_doorbell_press()

@router.post("/verify-presence")
def verify_presence(user_id: str = "USER_PRIMARY_HOUSEHOLD"):
    """Generates cryptographic presence token for Alexa+ ambient purchase."""
    return ring_service.verify_physical_presence(user_id)

@router.get("/snapshot")
def get_camera_snapshot():
    """Returns a visual SVG camera feed snapshot from Ring Doorbell Pro."""
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A202C"/>
      <stop offset="60%" stop-color="#2D3748"/>
      <stop offset="100%" stop-color="#4A5568"/>
    </linearGradient>
    <linearGradient id="porchGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2D3748"/>
      <stop offset="100%" stop-color="#1A202C"/>
    </linearGradient>
  </defs>
  <!-- Background Porch View -->
  <rect width="480" height="270" fill="url(#skyGrad)"/>
  <polygon points="0,180 480,180 480,270 0,270" fill="url(#porchGrad)"/>
  <rect x="180" y="70" width="120" height="150" fill="#2B3945" stroke="#4A5568" stroke-width="2"/>
  <circle cx="280" cy="145" r="4" fill="#D69E2E"/>
  
  <!-- Ring Watermark & Live HUD -->
  <rect x="12" y="12" width="60" height="22" rx="3" fill="rgba(0,0,0,0.6)"/>
  <text x="42" y="27" font-family="monospace" font-size="11" font-weight="bold" fill="#00A8E8" text-anchor="middle">ring</text>
  
  <rect x="370" y="12" width="98" height="22" rx="3" fill="rgba(0,0,0,0.6)"/>
  <circle cx="382" cy="23" r="4" fill="#E53E3E"/>
  <text x="392" y="27" font-family="monospace" font-size="10" font-weight="bold" fill="#FFFFFF">LIVE 1080p</text>
  
  <!-- Radar Field Indicator -->
  <circle cx="240" cy="220" r="45" fill="none" stroke="rgba(0,168,232,0.4)" stroke-dasharray="4,4"/>
  <circle cx="240" cy="220" r="25" fill="none" stroke="rgba(0,168,232,0.7)"/>
  <text x="240" y="258" font-family="monospace" font-size="9" fill="#00A8E8" text-anchor="middle">RADAR PRESENCE ZONE: VERIFIED</text>
</svg>"""
    return Response(content=svg_content, media_type="image/svg+xml")
