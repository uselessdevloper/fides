from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

class DecisionOutcome(str, Enum):
    APPROVE = "APPROVE"
    STEP_UP = "STEP_UP"
    DENY = "DENY"

class LineItem(BaseModel):
    sku: str = Field(..., description="Unique product SKU from trusted catalogue", min_length=3, max_length=50)
    qty: int = Field(default=1, ge=1, le=50, description="Quantity of product")

    @field_validator("sku")
    @classmethod
    def clean_sku(cls, v: str) -> str:
        # Prevent path traversal or command injection in SKU field
        cleaned = v.strip().upper()
        if not all(c.isalnum() or c in ("_", "-") for c in cleaned):
            raise ValueError(f"Invalid characters in SKU identifier: {v}")
        return cleaned

class CandidatePurchaseIntent(BaseModel):
    line_items: List[LineItem] = Field(default_factory=list, max_length=20)
    raw_reasoning: Optional[str] = Field(default=None, description="Model explanation if any, untrusted")

class SpendingMandate(BaseModel):
    mandate_id: str = Field(..., description="Unique mandate identifier")
    agent_id: str = Field(..., description="ID of the authorized purchasing agent")
    agent_public_key: str = Field(..., description="Hex-encoded Ed25519 public key")
    max_amount: float = Field(..., gt=0, description="Hard cap on single transaction")
    currency: str = Field(default="INR")
    allowed_merchants: List[str] = Field(default_factory=list)
    allowed_categories: List[str] = Field(default_factory=list)
    valid_from: str = Field(..., description="ISO 8601 start timestamp")
    valid_until: str = Field(..., description="ISO 8601 expiration timestamp")

class PurchaseRequest(BaseModel):
    request_text: str = Field(..., min_length=3, max_length=1000, description="Natural-language prompt from user/agent")
    mandate: SpendingMandate
    merchant_id: str = Field(..., description="Target merchant identifier")
    nonce: str = Field(..., min_length=8, description="Cryptographic nonce to prevent replay attacks")
    timestamp: str = Field(..., description="ISO 8601 timestamp of request generation")
    agent_signature: str = Field(..., description="Ed25519 signature over nonce:timestamp:merchant_id:mandate_id")

class ResolvedItem(BaseModel):
    sku: str
    name: str
    category: str
    unit_price: float
    qty: int
    line_total: float

class VerificationCheckResult(BaseModel):
    signature_valid: bool = False
    mandate_not_expired: bool = False
    trusted_key_verified: bool = False
    merchant_approved: bool = False
    category_allowed: bool = False
    replay_status_clean: bool = False
    prompt_injection_neutralized: bool = True
    all_passed: bool = False
    check_failures: List[str] = Field(default_factory=list)

class PurchaseEvaluationResponse(BaseModel):
    trace_id: str
    timestamp: str
    natural_language_request: str
    model_used: str
    nemotron_inference_latency_ms: float
    candidate_intent: CandidatePurchaseIntent
    resolved_items: List[ResolvedItem]
    server_calculated_total: float
    mandate_limit: float
    verification: VerificationCheckResult
    risk_score: float
    risk_factors: List[str]
    decision: DecisionOutcome
    reason_code: str
    human_approval_id: Optional[str] = None
    audit_block_index: int
    audit_block_hash: str
    audit_verified: bool

class HumanApprovalResolveRequest(BaseModel):
    reviewer_id: str = Field(..., min_length=2)
    action: str = Field(..., pattern="^(APPROVE|REJECT)$")
    review_notes: str = Field(default="")

class HumanApprovalItem(BaseModel):
    approval_id: str
    trace_id: str
    timestamp: str
    agent_id: str
    merchant_id: str
    total_amount: float
    currency: str
    risk_score: float
    reason: str
    status: str  # PENDING, APPROVED, REJECTED
    resolved_by: Optional[str] = None
    resolved_at: Optional[str] = None

class AuditBlock(BaseModel):
    index: int
    timestamp: str
    trace_id: str
    agent_id: str
    merchant_id: str
    decision: str
    reason_code: str
    amount: float
    risk_score: float
    payload_hash: str
    prev_hash: str
    block_hash: str
