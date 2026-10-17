import json
import os
from typing import Dict, Any, List, Optional, Tuple, Set
from backend.schemas.purchase import ResolvedItem

class CatalogueService:
    def __init__(self, catalogue_path: Optional[str] = None):
        if not catalogue_path:
            catalogue_path = os.path.join(os.path.dirname(__file__), "..", "config", "catalogue.json")
        
        with open(catalogue_path, "r") as f:
            self._catalogue_list = json.load(f)

        self._by_sku: Dict[str, Dict[str, Any]] = {
            item["sku"]: item for item in self._catalogue_list
        }

    def get_all_items(self) -> List[Dict[str, Any]]:
        return list(self._catalogue_list)

    def get_by_sku(self, sku: str) -> Optional[Dict[str, Any]]:
        return self._by_sku.get(sku.upper())

    def get_catalogue_summary_for_prompt(self) -> str:
        """
        Creates a clean, bounded catalogue summary to feed into Nemotron prompt.
        Does NOT feed arbitrary merchant instructions or injection vectors.
        """
        lines = []
        for item in self._catalogue_list:
            # Strip prompt injection phrases from prompt context
            safe_name = item['name'].split('[')[0].strip()
            lines.append(f"- SKU: {item['sku']} | Name: {safe_name} | Category: {item['category']}")
        return "\n".join(lines)

    def resolve_items(self, line_items: List[Any]) -> Tuple[List[ResolvedItem], float, Set[str]]:
        """
        Server-side resolution of unit prices, line totals, and categories.
        Guarantees that prices and totals are calculated authoritatively by the server.
        """
        resolved = []
        total = 0.0
        categories = set()

        for li in line_items:
            sku = li.sku.upper()
            catalogue_item = self.get_by_sku(sku)
            if not catalogue_item:
                continue

            unit_price = float(catalogue_item["price"])
            category = catalogue_item["category"]
            qty = int(li.qty)
            line_total = round(unit_price * qty, 2)
            
            resolved.append(ResolvedItem(
                sku=sku,
                name=catalogue_item["name"],
                category=category,
                unit_price=unit_price,
                qty=qty,
                line_total=line_total
            ))
            total += line_total
            categories.add(category)

        return resolved, round(total, 2), categories

catalogue_service = CatalogueService()
