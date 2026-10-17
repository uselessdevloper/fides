import pytest
from datetime import datetime, timezone, timedelta
from backend.services.verification import (
    verification_service,
    generate_ed25519_keypair,
    sign_request_payload
)
from backend.services.demo_scenarios import create_demo_mandate, create_signed_request
from backend.services.policy_engine import policy_engine

def test_signature_verification_success():
    mandate = create_demo_mandate(max_amount=700.0)
    req = create_signed_request(
        request_text="Test groceries",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH"
    )
    result = verification_service.verify_request(
        request=req,
        resolved_categories={"Groceries"},
        approved_merchants=policy_engine.approved_merchants
    )
    assert result.signature_valid is True
    assert result.mandate_not_expired is True
    assert result.trusted_key_verified is True
    assert result.merchant_approved is True
    assert result.category_allowed is True
    assert result.all_passed is True

def test_signature_verification_fails_on_tampered_payload():
    mandate = create_demo_mandate(max_amount=700.0)
    req = create_signed_request(
        request_text="Test groceries",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH"
    )
    # Tamper with the nonce after signing
    req.nonce = "TAMPERED_NONCE_VALUE"
    result = verification_service.verify_request(
        request=req,
        resolved_categories={"Groceries"},
        approved_merchants=policy_engine.approved_merchants
    )
    assert result.signature_valid is False
    assert result.all_passed is False

def test_expired_mandate_fails():
    expired_mandate = create_demo_mandate(max_amount=700.0, is_expired=True)
    req = create_signed_request(
        request_text="Test expired groceries",
        mandate=expired_mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH"
    )
    result = verification_service.verify_request(
        request=req,
        resolved_categories={"Groceries"},
        approved_merchants=policy_engine.approved_merchants
    )
    assert result.mandate_not_expired is False
    assert result.all_passed is False

def test_unapproved_merchant_fails():
    mandate = create_demo_mandate(max_amount=700.0)
    req = create_signed_request(
        request_text="Test merchant",
        mandate=mandate,
        merchant_id="ROGUE_UNAPPROVED_MERCHANT"
    )
    result = verification_service.verify_request(
        request=req,
        resolved_categories={"Groceries"},
        approved_merchants=policy_engine.approved_merchants
    )
    assert result.merchant_approved is False
    assert result.all_passed is False

def test_unauthorized_category_fails():
    # Mandate allows only Groceries
    mandate = create_demo_mandate(max_amount=700.0, categories=["Groceries"])
    req = create_signed_request(
        request_text="Test category",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH"
    )
    result = verification_service.verify_request(
        request=req,
        resolved_categories={"Electronics"},  # Not allowed
        approved_merchants=policy_engine.approved_merchants
    )
    assert result.category_allowed is False
    assert result.all_passed is False
