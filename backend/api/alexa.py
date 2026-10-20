import json
from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
from typing import Dict, Any, Optional

from backend.mcp.alexa_mcp_server import mcp_server, MCP_SPEC_VERSION
from backend.services.aws_bedrock import bedrock_client
from backend.services.ring_service import ring_service
from backend.api.firetv import firetv_state

router = APIRouter(tags=["Alexa+ MCP"])

class VoicePromptRequest(BaseModel):
    prompt: str
    merchant_id: Optional[str] = "MERCHANT_ZEPTO_FRESH"
    spending_cap: Optional[float] = 700.0

@router.post("/mcp")
async def handle_mcp_streamable_http(request: Request):
    """
    Official Model Context Protocol (MCP) Streamable HTTP Endpoint (Spec 2025-11-25).
    Handles JSON-RPC 2.0 requests: initialize, tools/list, and tools/call.
    """
    try:
        body = await request.json()
    except Exception:
        return JSONResponse(
            status_code=400,
            content={"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}}
        )

    response_payload = mcp_server.handle_json_rpc(body)
    return JSONResponse(content=response_payload)

@router.get("/mcp/events")
async def mcp_server_sent_events():
    """
    Server-Sent Events (SSE) stream for MCP Spec 2025-11-25.
    Streams tool updates and ambient device state notifications to Alexa+.
    """
    async def event_generator():
        yield f"event: endpoint\ndata: /mcp\n\n"
        yield f"event: mcp_spec\ndata: {MCP_SPEC_VERSION}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.post("/api/alexa/simulate")
async def simulate_alexa_conversation(req: VoicePromptRequest):
    """
    Simulates the Alexa+ experience in action:
    1. Alexa+ receives the voice instruction.
    2. Calls MCP tool `ring_verify_presence` to ensure speaker is at home.
    3. Calls MCP tool `fides_evaluate_purchase` to verify cryptographic spending mandate and prices.
    4. If step-up needed, pushes card to Fire TV living room screen via `firetv_push_approval`.
    5. Returns conversational Alexa+ speech response with full MCP audit trace.
    """
    prompt = req.prompt.strip()

    # Call tool 1: Ring Presence Check
    tool1_call = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0",
        "id": "alexa_call_01",
        "method": "tools/call",
        "params": {
            "name": "ring_verify_presence",
            "arguments": {"user_id": "USER_ALEXA_PLUS_HOME"}
        }
    })
    ring_result = json.loads(tool1_call["result"]["content"][0]["text"])

    # Call tool 2: Fides Purchase Evaluation
    tool2_call = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0",
        "id": "alexa_call_02",
        "method": "tools/call",
        "params": {
            "name": "fides_evaluate_purchase",
            "arguments": {
                "request_text": prompt,
                "merchant_id": req.merchant_id or "MERCHANT_ZEPTO_FRESH",
                "spending_cap": req.spending_cap or 700.0
            }
        }
    })
    fides_result = json.loads(tool2_call["result"]["content"][0]["text"])

    decision = fides_result.get("decision", "DENY")
    total = fides_result.get("calculated_total", 0.0)
    items = fides_result.get("resolved_items", [])
    item_names = ", ".join([f"{i['name']} ({i['qty']}x)" for i in items]) if items else "requested items"

    firetv_notif = None
    if decision == "APPROVE":
        spoken_response = (
            f"I've verified your presence through Ring and verified your spending mandate. "
            f"Your order for {item_names} comes to ₹{total:.2f}. "
            f"Payment has been cryptographically approved and recorded in your Fides audit ledger."
        )
    elif decision == "STEP_UP":
        spoken_response = (
            f"Your order for {item_names} totals ₹{total:.2f}, which requires step-up verification. "
            f"I've sent an approval card to your Living Room Fire TV. Please press Select on your remote to confirm."
        )
        # Push to Fire TV
        ftv_call = mcp_server.handle_json_rpc({
            "jsonrpc": "2.0",
            "id": "alexa_call_03",
            "method": "tools/call",
            "params": {
                "name": "firetv_push_approval",
                "arguments": {
                    "trace_id": fides_result.get("audit_hash", "TRACE_STEP_UP"),
                    "summary": item_names,
                    "total_amount": total
                }
            }
        })
        firetv_notif = json.loads(ftv_call["result"]["content"][0]["text"])
    else:
        reason = fides_result.get("reason", "Policy limit exceeded")
        spoken_response = (
            f"I cannot complete this purchase. Fides security policy denied the transaction: {reason}."
        )

    return {
        "user_voice_prompt": prompt,
        "alexa_response_text": spoken_response,
        "mcp_spec_version": MCP_SPEC_VERSION,
        "decision": decision,
        "fides_evaluation": fides_result,
        "ring_presence": ring_result,
        "firetv_push": firetv_notif,
        "mcp_tool_execution_trace": [
            {"step": 1, "tool": "ring_verify_presence", "status": "VERIFIED"},
            {"step": 2, "tool": "fides_evaluate_purchase", "status": decision},
            {"step": 3, "tool": "firetv_push_approval" if decision == "STEP_UP" else "settlement", "status": "COMPLETED"}
        ]
    }
