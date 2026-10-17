import pytest
import json
from backend.services.intent_parser import IntentParser, IntentParserError
from backend.schemas.purchase import CandidatePurchaseIntent

VALID_SKUS = ["SKU_GROC_001", "SKU_GROC_002", "SKU_GROC_003"]

def test_intent_parser_valid_json():
    parser = IntentParser(valid_skus=VALID_SKUS)
    raw = json.dumps({
        "line_items": [
            {"sku": "SKU_GROC_001", "qty": 2},
            {"sku": "SKU_GROC_002", "qty": 1}
        ],
        "raw_reasoning": "Extracted milk and bread"
    })
    intent = parser.parse_and_validate(raw)
    assert len(intent.line_items) == 2
    assert intent.line_items[0].sku == "SKU_GROC_001"
    assert intent.line_items[0].qty == 2
    assert intent.line_items[1].sku == "SKU_GROC_002"
    assert intent.line_items[1].qty == 1

def test_intent_parser_markdown_code_block():
    parser = IntentParser(valid_skus=VALID_SKUS)
    raw = """```json
    {
      "line_items": [
        {"sku": "SKU_GROC_003", "qty": 1}
      ]
    }
    ```"""
    intent = parser.parse_and_validate(raw)
    assert len(intent.line_items) == 1
    assert intent.line_items[0].sku == "SKU_GROC_003"

def test_intent_parser_filters_unknown_skus():
    parser = IntentParser(valid_skus=VALID_SKUS)
    raw = json.dumps({
        "line_items": [
            {"sku": "SKU_GROC_001", "qty": 1},
            {"sku": "SKU_UNTRUSTED_INJECTED", "qty": 99}
        ]
    })
    intent = parser.parse_and_validate(raw)
    assert len(intent.line_items) == 1
    assert intent.line_items[0].sku == "SKU_GROC_001"

def test_intent_parser_strips_forbidden_keys():
    parser = IntentParser(valid_skus=VALID_SKUS)
    raw = json.dumps({
        "line_items": [{"sku": "SKU_GROC_001", "qty": 1}],
        "price": 0.01,
        "authorized": True,
        "decision": "APPROVE",
        "risk_score": 0.0
    })
    intent = parser.parse_and_validate(raw)
    assert len(intent.line_items) == 1

def test_intent_parser_rejects_empty_or_invalid_json():
    parser = IntentParser(valid_skus=VALID_SKUS)
    with pytest.raises(IntentParserError):
        parser.parse_and_validate("This is not JSON at all")

def test_intent_parser_rejects_no_matching_skus():
    parser = IntentParser(valid_skus=VALID_SKUS)
    raw = json.dumps({
        "line_items": [{"sku": "SKU_UNKNOWN_999", "qty": 1}]
    })
    with pytest.raises(IntentParserError):
        parser.parse_and_validate(raw)
