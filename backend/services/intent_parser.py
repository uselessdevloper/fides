import json
import re
from typing import Dict, Any, List, Tuple
from pydantic import ValidationError
from backend.schemas.purchase import CandidatePurchaseIntent, LineItem

class IntentParserError(Exception):
    """Raised when intent cannot be safely validated into candidate purchase items."""
    pass

class IntentParser:
    def __init__(self, valid_skus: List[str]):
        self.valid_skus = set(valid_skus)

    def parse_and_validate(self, raw_model_response: str) -> CandidatePurchaseIntent:
        """
        Takes raw string from Nemotron (or fallback), strips markdown formatting,
        extracts JSON, strictly parses via Pydantic, and sanitizes untrusted fields.
        """
        cleaned = raw_model_response.strip()
        
        # Strip markdown code blocks like ```json ... ```
        if "```" in cleaned:
            match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', cleaned)
            if match:
                cleaned = match.group(1).strip()

        # Parse JSON
        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError as e:
            # Attempt to find JSON object substring
            json_match = re.search(r'\{[\s\S]*\}', cleaned)
            if json_match:
                try:
                    data = json.loads(json_match.group(0))
                except json.JSONDecodeError:
                    raise IntentParserError(f"Model output is not valid JSON: {str(e)}")
            else:
                raise IntentParserError(f"Failed to extract JSON object from response: {cleaned[:100]}")

        if not isinstance(data, dict):
            raise IntentParserError("Model output JSON must be an object with 'line_items' list.")

        # Defense against Prompt Injection & Schema Pollution:
        # Untrusted fields like 'price', 'authorized', 'mandate_override', 'total' must be rejected
        forbidden_keys = {"price", "total", "authorized", "decision", "risk_score", "mandate_override", "status"}
        for k in forbidden_keys:
            if k in data:
                # Remove untrusted authorization hijacking attempts
                del data[k]

        raw_items = data.get("line_items", [])
        if not isinstance(raw_items, list):
            raise IntentParserError("'line_items' must be a list.")

        validated_items: List[LineItem] = []
        for item in raw_items:
            if not isinstance(item, dict):
                continue
            
            # Clean each line item of any untrusted price fields
            sku = str(item.get("sku", "")).strip().upper()
            qty = item.get("qty", 1)
            
            try:
                qty_int = int(qty)
                if qty_int <= 0:
                    continue
            except (ValueError, TypeError):
                continue

            # Verify against trusted catalogue SKUs
            if sku not in self.valid_skus:
                # Discard unknown or injected SKUs
                continue

            validated_items.append(LineItem(sku=sku, qty=qty_int))

        if not validated_items:
            raise IntentParserError("No valid products from the trusted catalogue were identified in the request.")

        return CandidatePurchaseIntent(
            line_items=validated_items,
            raw_reasoning=str(data.get("raw_reasoning", ""))[:200] if data.get("raw_reasoning") else None
        )
