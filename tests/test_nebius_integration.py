import pytest
import os
import json
from unittest.mock import MagicMock, patch
from backend.services.nebius_client import NebiusClient
from backend.services.catalogue_service import catalogue_service

def test_nebius_client_deterministic_fallback():
    client = NebiusClient(api_key=None)
    summary = catalogue_service.get_catalogue_summary_for_prompt()
    raw, latency, model_name, usage = client.interpret_purchase_request(
        "Order two packs of whole milk and artisan bread",
        summary
    )
    assert latency > 0
    assert "Nemotron" in model_name
    parsed = json.loads(raw)
    assert "line_items" in parsed
    skus = [item["sku"] for item in parsed["line_items"]]
    assert "SKU_GROC_001" in skus  # Milk
    assert "SKU_GROC_002" in skus  # Bread

def test_nebius_client_mock_live_api():
    # Test OpenAI compatibility interface with mocked Nebius response
    with patch("backend.services.nebius_client.OpenAI") as mock_openai_cls:
        mock_instance = MagicMock()
        mock_choice = MagicMock()
        mock_choice.message.content = json.dumps({
            "line_items": [{"sku": "SKU_GROC_004", "qty": 3}],
            "raw_reasoning": "Extracted 3 kg gala apples"
        })
        mock_response = MagicMock()
        mock_response.choices = [mock_choice]
        mock_response.usage.prompt_tokens = 90
        mock_response.usage.completion_tokens = 25
        mock_response.usage.total_tokens = 115
        mock_instance.chat.completions.create.return_value = mock_response
        mock_openai_cls.return_value = mock_instance

        client = NebiusClient(api_key="mock_test_token_factory_key", model="nvidia/Nemotron-3_5-Lightning")
        client.live_client = mock_instance

        summary = catalogue_service.get_catalogue_summary_for_prompt()
        raw, latency, model_name, usage = client.interpret_purchase_request(
            "Get 3 kg apples",
            summary
        )

        assert "Live" in model_name
        assert usage["total_tokens"] == 115
        data = json.loads(raw)
        assert data["line_items"][0]["sku"] == "SKU_GROC_004"
        assert data["line_items"][0]["qty"] == 3
