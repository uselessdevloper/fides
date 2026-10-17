from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from backend.schemas.purchase import AuditBlock, PurchaseEvaluationResponse
from backend.services.audit_ledger import audit_ledger
from backend.services.orchestrator import orchestrator

router = APIRouter(tags=["Audit & Decisions"])

@router.get("/api/audit/blocks", response_model=List[AuditBlock])
def get_audit_blocks():
    """Returns the cryptographic SHA-256 hash-chained audit blocks."""
    return audit_ledger.get_all_blocks()

@router.get("/api/audit/verify")
def verify_audit_ledger():
    """
    Traverses and mathematically verifies the entire SHA-256 block hash chain.
    Detects any block mutation, deleted transactions, or unauthorized tampering.
    """
    is_valid, message = audit_ledger.verify_chain()
    blocks = audit_ledger.get_all_blocks()
    latest_hash = blocks[-1].block_hash if blocks else ""
    return {
        "is_valid": is_valid,
        "total_blocks": len(blocks),
        "latest_block_hash": latest_hash,
        "message": message
    }

@router.get("/api/decisions/{trace_id}", response_model=PurchaseEvaluationResponse)
def get_decision_details(trace_id: str):
    """Retrieves full decision evaluation and verification trace details."""
    decision = orchestrator.get_decision(trace_id)
    if not decision:
        raise HTTPException(status_code=404, detail=f"Trace ID '{trace_id}' not found.")
    return decision
