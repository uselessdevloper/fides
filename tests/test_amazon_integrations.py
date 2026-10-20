import pytest
import json
from backend.services.aws_bedrock import AWSBedrockClient
from backend.services.catalogue_service import catalogue_service

def test_aws_bedrock_runtime_intent():
    client = AWSBedrockClient()
    summary = catalogue_service.get_catalogue_summary_for_prompt()
    raw, latency, model, usage = client.interpret_voice_intent(
        "Alexa, please order two cartons of organic whole milk",
        summary
    )
    assert latency > 0
    assert "bedrock" in model.lower() or "nova" in model.lower()
    data = json.loads(raw)
    assert "line_items" in data
    assert any(item["sku"] == "SKU_GROC_001" for item in data["line_items"])

def test_ring_service_presence_and_radar():
    from backend.services.ring_service import ring_service
    status = ring_service.get_status()
    assert status["status"] == "ONLINE"
    assert "Ring Video Doorbell" in status["device_model"]
    
    token = ring_service.verify_physical_presence("USER_TEST_01")
    assert token["presence_verified"] is True
    assert token["confidence_score"] > 0.95
    assert len(token["presence_hash"]) == 64  # SHA-256
    
    # Motion test
    motion_res = ring_service.trigger_motion()
    assert motion_res["status"] == "MOTION_TRIGGERED"
    assert ring_service.is_motion_active is True

def test_bee_wearable_ai_and_haptics():
    from backend.services.bee_service import bee_service
    status = bee_service.get_status()
    assert status["connection_status"] == "CONNECTED_BLE_MESH"
    assert "Bee Wearable" in status["device_model"]
    
    # Record ambient memo
    memo = bee_service.record_voice_memo("Buy 2 packs of organic milk under 700 rupees")
    assert memo["intent_detected"] == "COMMERCE_TRIGGER"
    assert "BEE_MEMO_" in memo["memo_id"]
    
    # Trigger wrist haptic
    haptic = bee_service.push_wrist_haptic_confirmation("TRC_TEST_BEE", "Whole Milk", 140.0)
    assert haptic["pattern"] == "DOUBLE_PULSE_HIGH_PRIORITY"
    assert haptic["status"] == "AWAITING_WRIST_TAP"
    
    # Resolve wrist tap
    resolve = bee_service.resolve_wrist_confirmation(haptic["prompt_id"], "APPROVE")
    assert resolve["success"] is True
    assert resolve["action"] == "APPROVE"
    assert bee_service.active_haptic_prompt is None

