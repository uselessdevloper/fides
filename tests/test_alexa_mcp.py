import pytest
import json
from backend.mcp.alexa_mcp_server import mcp_server, MCP_SPEC_VERSION

def test_mcp_initialize():
    res = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {}
    })
    assert res["jsonrpc"] == "2.0"
    assert res["id"] == 1
    assert res["result"]["protocolVersion"] == "2025-11-25"
    assert res["result"]["serverInfo"]["name"] == "fides-alexa-mcp-server"

def test_mcp_tools_list():
    res = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/list",
        "params": {}
    })
    tools = res["result"]["tools"]
    tool_names = [t["name"] for t in tools]
    assert "fides_evaluate_purchase" in tool_names
    assert "fides_check_mandate" in tool_names
    assert "ring_verify_presence" in tool_names
    assert "firetv_push_approval" in tool_names
    assert "bee_wrist_haptic_confirm" in tool_names
    assert "bee_capture_intent" in tool_names

def test_mcp_ring_presence_tool_call():
    res = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0",
        "id": 3,
        "method": "tools/call",
        "params": {
            "name": "ring_verify_presence",
            "arguments": {"user_id": "USER_ALEXA_PLUS_HOME"}
        }
    })
    content = json.loads(res["result"]["content"][0]["text"])
    assert content["presence_verified"] is True
    assert "RNG_PRESENCE_" in content["token_id"]

def test_mcp_fides_evaluate_purchase_approved():
    res = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0",
        "id": 4,
        "method": "tools/call",
        "params": {
            "name": "fides_evaluate_purchase",
            "arguments": {
                "request_text": "Order two milks and one bread under ₹700",
                "merchant_id": "MERCHANT_ZEPTO_FRESH",
                "spending_cap": 700.0
            }
        }
    })
    content = json.loads(res["result"]["content"][0]["text"])
    assert content["status"] == "EVALUATED"
    assert content["decision"] == "APPROVE"
    assert content["calculated_total"] <= 700.0
    assert "ring_presence_token" in content
    assert content["audit_block_index"] >= 0
