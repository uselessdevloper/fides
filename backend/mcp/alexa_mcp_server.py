import json
import uuid
import time
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from fastapi import Request, Response
from fastapi.responses import JSONResponse, StreamingResponse

from backend.services.orchestrator import orchestrator
from backend.services.demo_scenarios import create_demo_mandate, create_signed_request
from backend.services.ring_service import ring_service
from backend.services.aws_bedrock import bedrock_client
from backend.services.catalogue_service import catalogue_service

MCP_SPEC_VERSION = "2025-11-25"
SERVER_NAME = "fides-alexa-mcp-server"
SERVER_VERSION = "1.0.0"

class AlexaMCPServer:
    """
    Official Model Context Protocol (MCP) Server implementing Spec 2025-11-25
    over Streamable HTTP for Alexa+ Voice Agent integration.
    """
    def __init__(self):
        self.tools = [
            {
                "name": "fides_evaluate_purchase",
                "description": "Evaluates an ambient voice purchase instruction through Fides trust gateway using AWS Bedrock and deterministic policy limits.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "request_text": {
                            "type": "string",
                            "description": "Voice buyer request from Alexa+ (e.g. 'Order two cartons of whole milk under ₹700')"
                        },
                        "merchant_id": {
                            "type": "string",
                            "description": "Target merchant ID (default: MERCHANT_ZEPTO_FRESH)",
                            "default": "MERCHANT_ZEPTO_FRESH"
                        },
                        "spending_cap": {
                            "type": "number",
                            "description": "Authorized spending cap in INR (default: 700.0)",
                            "default": 700.0
                        }
                    },
                    "required": ["request_text"]
                }
            },
            {
                "name": "fides_check_mandate",
                "description": "Queries the remaining household spending mandate, authorized merchants, and expiration window for the Alexa+ profile.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "user_id": {
                            "type": "string",
                            "description": "Alexa+ household user ID",
                            "default": "USER_ALEXA_PLUS_HOME"
                        }
                    }
                }
            },
            {
                "name": "ring_verify_presence",
                "description": "Verifies that the speaker is physically inside the Ring-secured household via Z-Wave/radar presence detection before releasing payments.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "user_id": {
                            "type": "string",
                            "description": "User profile ID",
                            "default": "USER_ALEXA_PLUS_HOME"
                        }
                    }
                }
            },
            {
                "name": "firetv_push_approval",
                "description": "Pushes a 10-foot living room visual confirmation card to the Fire TV screen for family or supervisor step-up authorization.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "trace_id": {"type": "string", "description": "Fides transaction trace ID"},
                        "summary": {"type": "string", "description": "Short description of the items"},
                        "total_amount": {"type": "number", "description": "Amount in INR to confirm"}
                    },
                    "required": ["trace_id", "summary", "total_amount"]
                }
            }
        ]

    def handle_json_rpc(self, request_payload: Dict[str, Any]) -> Dict[str, Any]:
        """Processes JSON-RPC 2.0 messages adhering to MCP Spec 2025-11-25."""
        msg_id = request_payload.get("id")
        method = request_payload.get("method")
        params = request_payload.get("params", {})

        if method == "initialize":
            return {
                "jsonrpc": "2.0",
                "id": msg_id,
                "result": {
                    "protocolVersion": MCP_SPEC_VERSION,
                    "capabilities": {
                        "tools": {"listChanged": True},
                        "resources": {},
                        "prompts": {},
                        "logging": {}
                    },
                    "serverInfo": {
                        "name": SERVER_NAME,
                        "version": SERVER_VERSION,
                        "description": "Fides Ambient Commerce Gateway for Alexa+, Ring, and Fire TV"
                    }
                }
            }

        elif method == "tools/list":
            return {
                "jsonrpc": "2.0",
                "id": msg_id,
                "result": {
                    "tools": self.tools
                }
            }

        elif method == "tools/call":
            tool_name = params.get("name")
            tool_args = params.get("arguments", {})
            return self._execute_tool(msg_id, tool_name, tool_args)

        else:
            return {
                "jsonrpc": "2.0",
                "id": msg_id,
                "error": {
                    "code": -32601,
                    "message": f"Method not found: {method}"
                }
            }

    def _execute_tool(self, msg_id: Any, tool_name: str, args: Dict[str, Any]) -> Dict[str, Any]:
        try:
            if tool_name == "fides_evaluate_purchase":
                request_text = args.get("request_text", "")
                merchant_id = args.get("merchant_id", "MERCHANT_ZEPTO_FRESH")
                spending_cap = float(args.get("spending_cap", 700.0))

                # Step 1: Verify Ring presence
                presence = ring_service.verify_physical_presence("USER_ALEXA_PLUS_HOME")
                
                # Step 2: Build signed mandate & request
                mandate = create_demo_mandate(
                    mandate_id=f"MAN_ALEXA_{int(time.time())}",
                    max_amount=spending_cap,
                    merchants=[merchant_id]
                )
                signed_req = create_signed_request(
                    request_text=request_text,
                    mandate=mandate,
                    merchant_id=merchant_id
                )

                # Step 3: Authoritative evaluation
                eval_resp = orchestrator.evaluate_purchase(signed_req)
                data = eval_resp.model_dump()

                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": json.dumps({
                                    "status": "EVALUATED",
                                    "decision": data["decision"],
                                    "reason": data["reason_code"],
                                    "calculated_total": data["server_calculated_total"],
                                    "spending_cap": data["mandate_limit"],
                                    "resolved_items": data["resolved_items"],
                                    "ring_presence_token": presence["token_id"],
                                    "audit_block_index": data["audit_block_index"],
                                    "audit_hash": data["audit_block_hash"]
                                }, indent=2)
                            }
                        ]
                    }
                }

            elif tool_name == "fides_check_mandate":
                user_id = args.get("user_id", "USER_ALEXA_PLUS_HOME")
                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": json.dumps({
                                    "user_id": user_id,
                                    "active_mandate_id": "MAN_HOUSEHOLD_GROCERY_DAILY",
                                    "daily_spending_cap": 700.0,
                                    "remaining_balance": 530.0,
                                    "currency": "INR",
                                    "approved_merchants": ["Zepto Fresh", "BlinkMart", "Swiggy Instamart"],
                                    "allowed_categories": ["Groceries", "Office Supplies"],
                                    "status": "VALID_AND_ACTIVE"
                                }, indent=2)
                            }
                        ]
                    }
                }

            elif tool_name == "ring_verify_presence":
                user_id = args.get("user_id", "USER_ALEXA_PLUS_HOME")
                token = ring_service.verify_physical_presence(user_id)
                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": json.dumps(token, indent=2)
                            }
                        ]
                    }
                }

            elif tool_name == "firetv_push_approval":
                trace_id = args.get("trace_id")
                summary = args.get("summary")
                amount = args.get("total_amount")
                # Register notification in shared FireTV queue
                from backend.api.firetv import firetv_state
                notification = firetv_state.push_notification(trace_id, summary, amount)
                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "result": {
                        "content": [
                            {
                                "type": "text",
                                "text": json.dumps({
                                    "pushed_to_firetv": True,
                                    "notification_id": notification["notification_id"],
                                    "display_target": "Living Room Fire TV Stick 4K Max",
                                    "message": f"Approval card displayed on TV screen for {summary} (₹{amount})."
                                }, indent=2)
                            }
                        ]
                    }
                }

            else:
                return {
                    "jsonrpc": "2.0",
                    "id": msg_id,
                    "error": {
                        "code": -32601,
                        "message": f"Unknown tool name: {tool_name}"
                    }
                }
        except Exception as e:
            return {
                "jsonrpc": "2.0",
                "id": msg_id,
                "error": {
                    "code": -32000,
                    "message": f"Tool execution failed: {str(e)}"
                }
            }

mcp_server = AlexaMCPServer()
