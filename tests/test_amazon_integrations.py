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
