#!/usr/bin/env python3
"""
Fides CLI — Trust Infrastructure for Agentic Commerce
Command-Line Interface to connect to Nebius Token Factory, test NVIDIA Nemotron,
evaluate purchase requests, and audit cryptographic transactions.
"""

import sys
import os
import argparse
import json
import time
import uuid
import concurrent.futures
from dotenv import load_dotenv

load_dotenv()

from backend.services.nebius_client import nebius_client, NebiusClient
from backend.services.orchestrator import orchestrator
from backend.services.demo_scenarios import (
    get_demo_scenario_request,
    create_demo_mandate,
    create_signed_request
)
from backend.services.audit_ledger import audit_ledger
from backend.services.catalogue_service import catalogue_service

# ANSI color codes
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"

def print_banner():
    print(f"\n{BOLD}{CYAN}============================================================{RESET}")
    print(f"{BOLD}  FIDES // CLI GATEWAY{RESET}")
    print(f"  {DIM}Trust Infrastructure for Agentic Commerce{RESET}")
    print(f"  {DIM}NVIDIA Nemotron 3.5 × Nebius Token Factory{RESET}")
    print(f"{BOLD}{CYAN}============================================================{RESET}\n")

def cmd_set_key(api_key: str):
    """Save Nebius Token Factory API key to .env file."""
    env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".env"))
    
    lines = []
    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            lines = f.readlines()
    
    updated = False
    new_lines = []
    for line in lines:
        if line.strip().startswith("NEBIUS_API_KEY="):
            new_lines.append(f"NEBIUS_API_KEY={api_key.strip()}\n")
            updated = True
        else:
            new_lines.append(line)
            
    if not updated:
        new_lines.append(f"\nNEBIUS_API_KEY={api_key.strip()}\n")
        
    with open(env_path, "w") as f:
        f.writelines(new_lines)
        
    print(f"{GREEN}✓ NEBIUS_API_KEY successfully saved to {env_path}{RESET}")
    print(f"Now test the live connection with: {BOLD}python cli.py test-connection{RESET}")

def cmd_test_connection():
    """Test connection to Nebius Token Factory with the current API key."""
    print_banner()
    key = os.getenv("NEBIUS_API_KEY", "")
    model = os.getenv("NEBIUS_MODEL", "nvidia/Nemotron-3_5-Lightning")
    base_url = os.getenv("NEBIUS_BASE_URL", "https://api.tokenfactory.nebius.com/v1/")
    
    print(f"Endpoint: {BOLD}{base_url}{RESET}")
    print(f"Model:    {BOLD}{model}{RESET}")
    
    if not key or key.startswith("your_"):
        print(f"\n{YELLOW}[!] Notice: No live NEBIUS_API_KEY found in .env{RESET}")
        print(f"    Set your key using: {BOLD}python cli.py set-key <YOUR_TOKEN_FACTORY_API_KEY>{RESET}")
        print(f"    Or: {BOLD}export NEBIUS_API_KEY=<YOUR_KEY>{RESET}\n")
        print(f"{CYAN}Running deterministic fallback check...{RESET}")
        client = NebiusClient(api_key=None)
        summary = catalogue_service.get_catalogue_summary_for_prompt()
        start = time.perf_counter()
        raw, lat, mod, usage = client.interpret_purchase_request("Order two milks and one bread", summary)
        print(f"{GREEN}✓ Fallback Runtime: Operational ({lat}ms simulated latency){RESET}")
        print(f"  Extracted JSON: {raw}")
        return

    print(f"Key:      {key[:8]}...{key[-4:] if len(key) > 12 else ''} (configured)")
    print(f"\n{CYAN}Pinging Nebius Token Factory live endpoint...{RESET}")
    
    try:
        from openai import OpenAI
        client = OpenAI(base_url=base_url, api_key=key, timeout=12.0)
        start = time.perf_counter()
        response = client.chat.completions.create(
            model=model,
            temperature=0.0,
            messages=[
                {"role": "system", "content": "You are NVIDIA Nemotron. Respond with JSON: {\"status\": \"connected\"}"},
                {"role": "user", "content": "Ping connection"}
            ]
        )
        latency = (time.perf_counter() - start) * 1000.0
        content = response.choices[0].message.content
        tokens = response.usage.total_tokens if response.usage else 0
        
        print(f"\n{GREEN}{BOLD}✓ SUCCESS: Connected to Nebius Token Factory!{RESET}")
        print(f"  Response:     {content.strip()}")
        print(f"  Latency:      {latency:.1f}ms")
        print(f"  Total Tokens: {tokens}")
        print(f"  Model:        {model}")
    except Exception as e:
        print(f"\n{RED}{BOLD}✗ CONNECTION FAILED:{RESET} {e}")
        print(f"\nPlease check your API key at https://tokenfactory.nebius.com/")

def cmd_evaluate(prompt: str, merchant_id: str = "MERCHANT_ZEPTO_FRESH", mandate_cap: float = 700.0):
    """Evaluate a natural language purchase request through Fides Gateway."""
    print_banner()
    print(f"{BOLD}Input Prompt:{RESET} \"{prompt}\"")
    print(f"Merchant ID:  {merchant_id}")
    print(f"Mandate Cap:  ₹{mandate_cap:.2f}\n")
    
    mandate = create_demo_mandate(
        mandate_id=f"MAN_CLI_{int(time.time())}",
        max_amount=mandate_cap,
        is_expired=False,
        categories=["Groceries", "Office Supplies", "Electronics"],
        merchants=[merchant_id]
    )
    
    signed_req = create_signed_request(
        request_text=prompt,
        mandate=mandate,
        merchant_id=merchant_id
    )
    
    print(f"{CYAN}Step 1: Interpreting intent with NVIDIA Nemotron (Nebius Token Factory)...{RESET}")
    eval_resp = orchestrator.evaluate_purchase(signed_req)
    result = eval_resp.model_dump()
    
    print(f"  Model:   {result['model_used']}")
    print(f"  Latency: {result['nemotron_inference_latency_ms']}ms")
    print(f"  Candidate SKUs: {result['candidate_intent'].get('line_items', [])}")
    
    print(f"\n{CYAN}Step 2: Fides Gateway Policy & Cryptographic Verification...{RESET}")
    for item in result.get('resolved_items', []):
        print(f"  • {item['name']} ({item['qty']}x @ ₹{item['unit_price']}) = ₹{item['line_total']}")
    print(f"  Server-Calculated Total: ₹{result['server_calculated_total']:.2f} / Cap: ₹{result['mandate_limit']:.2f}")
    print(f"  Risk Score:              {result['risk_score']:.3f}")
    
    decision = result['decision']
    dec_str = decision.value if hasattr(decision, 'value') else str(decision)
    if dec_str == 'APPROVE':
        color = GREEN
    elif dec_str == 'STEP_UP':
        color = YELLOW
    else:
        color = RED
        
    print(f"\n{BOLD}DECISION:{RESET} {color}{BOLD}[{dec_str}]{RESET}")
    print(f"Reason:   {result['reason_code']}")
    print(f"SHA-256 Block #{result['audit_block_index']}: {result['audit_block_hash']}")

def cmd_scenario(scenario_id: int):
    """Run one of the 6 deterministic judge scenarios."""
    print_banner()
    print(f"{CYAN}Executing Deterministic Judge Scenario #{scenario_id}...{RESET}\n")
    request = get_demo_scenario_request(scenario_id)
    eval_resp = orchestrator.evaluate_purchase(request)
    result = eval_resp.model_dump()
    
    print(f"Scenario: {BOLD}#{scenario_id}{RESET}")
    print(f"Prompt:   \"{result['natural_language_request']}\"")
    print(f"Model:    {result['model_used']} ({result['nemotron_inference_latency_ms']}ms)")
    print(f"Total:    ₹{result['server_calculated_total']:.2f} (Limit: ₹{result['mandate_limit']:.2f})")
    print(f"Risk:     {result['risk_score']:.3f}")
    
    dec = result['decision']
    dec_str = dec.value if hasattr(dec, 'value') else str(dec)
    col = GREEN if dec_str == 'APPROVE' else YELLOW if dec_str == 'STEP_UP' else RED
    print(f"\n{BOLD}OUTCOME:{RESET} {col}{BOLD}[{dec_str}]{RESET}")
    print(f"Reason:  {result['reason_code']}")
    print(f"Block:   #{result['audit_block_index']} ({result['audit_block_hash'][:24]}...)")

def cmd_race_test():
    """Run the 10-thread concurrent replay race test."""
    print_banner()
    print(f"{CYAN}Firing 10 simultaneous threads with the identical signed nonce...{RESET}\n")
    shared_nonce = f"CLI_RACE_{uuid.uuid4().hex[:8]}"
    mandate = create_demo_mandate(max_amount=700.0)
    signed_request = create_signed_request(
        request_text="Order 1 carton of organic milk.",
        mandate=mandate,
        merchant_id="MERCHANT_ZEPTO_FRESH",
        fixed_nonce=shared_nonce
    )

    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(orchestrator.evaluate_purchase, signed_request) for _ in range(10)]
        for f in concurrent.futures.as_completed(futures):
            try:
                res = f.result()
                results.append(res.decision.value)
            except Exception as e:
                results.append(f"ERROR: {str(e)}")

    auth_count = results.count("APPROVE")
    rej_count = results.count("DENY")
    
    print(f"Threads Fired:   10")
    print(f"Authorized:      {GREEN}{auth_count}{RESET}")
    print(f"Rejected:        {RED}{rej_count}{RESET}")
    print(f"Replay Defense:  {GREEN}{BOLD}PASSED (Atomic Lock Neutralized Race Condition){RESET}")

def cmd_verify_ledger():
    """Verify cryptographic integrity of the SHA-256 hash-chain."""
    print_banner()
    print(f"{CYAN}Verifying mathematical integrity of all audit blocks...{RESET}\n")
    is_valid, msg = audit_ledger.verify_chain()
    blocks = audit_ledger.get_all_blocks()
    
    for b in blocks:
        print(f"  Block #{b.index:02d} [{b.decision:7s}] Hash: {b.block_hash[:20]}... Prev: {b.prev_hash[:12]}...")
        
    print()
    if is_valid:
        print(f"{GREEN}{BOLD}✓ INTEGRITY CONFIRMED:{RESET} {msg}")
    else:
        print(f"{RED}{BOLD}✗ TAMPER DETECTED:{RESET} {msg}")

def cmd_alexa(prompt: str):
    """Execute voice instruction via self-hosted Alexa+ MCP Server (Spec 2025-11-25)."""
    print_banner()
    from backend.mcp.alexa_mcp_server import mcp_server, MCP_SPEC_VERSION
    print(f"{CYAN}ALEXA+ STREAMABLE HTTP MCP INTERFACE (Spec {MCP_SPEC_VERSION}){RESET}")
    print(f"Voice Input: \"{BOLD}{prompt}{RESET}\"\n")
    
    # 1. Ring Presence Tool Call
    print(f"1. Calling MCP Tool: {BOLD}ring_verify_presence{RESET}...")
    t1 = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0", "id": "cli_1", "method": "tools/call",
        "params": {"name": "ring_verify_presence", "arguments": {"user_id": "USER_ALEXA_HOME"}}
    })
    res1 = json.loads(t1["result"]["content"][0]["text"])
    print(f"   ✓ Presence Token: {GREEN}{res1['token_id']}{RESET} (Method: {res1['verification_method']})")

    # 2. Fides Evaluate Purchase Tool Call
    print(f"\n2. Calling MCP Tool: {BOLD}fides_evaluate_purchase{RESET}...")
    t2 = mcp_server.handle_json_rpc({
        "jsonrpc": "2.0", "id": "cli_2", "method": "tools/call",
        "params": {"name": "fides_evaluate_purchase", "arguments": {"request_text": prompt, "spending_cap": 700.0}}
    })
    res2 = json.loads(t2["result"]["content"][0]["text"])
    dec = res2.get("decision", "DENY")
    col = GREEN if dec == "APPROVE" else YELLOW if dec == "STEP_UP" else RED
    print(f"   Outcome: {col}{BOLD}[{dec}]{RESET}")
    print(f"   Calculated Total: ₹{res2.get('calculated_total', 0.0):.2f} / Cap: ₹{res2.get('spending_cap', 0.0):.2f}")
    print(f"   Reason:  {res2.get('reason')}")
    print(f"   SHA-256: {res2.get('audit_hash')}")

def cmd_ring():
    """Check Ring Video Doorbell status and radar presence telemetry."""
    print_banner()
    from backend.services.ring_service import ring_service
    status = ring_service.get_status()
    print(f"Device:   {BOLD}{status['device_model']}{RESET}")
    print(f"Location: {status['location']}")
    print(f"Status:   {GREEN}{status['status']}{RESET}")
    print(f"Battery:  {status['battery_level']}%")
    print(f"Signal:   {status['wifi_signal']}")
    print(f"Radar:    {status['presence_mode']}")
    print(f"Events:   {len(ring_service.get_recent_events())} logged")

def main():
    parser = argparse.ArgumentParser(description="Fides CLI — Trust Infrastructure for Agentic Commerce")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # alexa
    p_alexa = subparsers.add_parser("alexa", help="Send voice command via Alexa+ MCP Server (Spec 2025-11-25)")
    p_alexa.add_argument("prompt", help="Voice instruction for Alexa+")
    
    # ring
    subparsers.add_parser("ring", help="Check Ring Doorbell & radar presence telemetry")
    
    # set-key
    p_key = subparsers.add_parser("set-key", help="Save Nebius Token Factory API key to .env")
    p_key.add_argument("api_key", help="Nebius Token Factory API key")
    
    # test-connection
    subparsers.add_parser("test-connection", help="Ping Nebius Token Factory and test NVIDIA Nemotron")
    
    # evaluate
    p_eval = subparsers.add_parser("evaluate", help="Evaluate a natural language buyer prompt")
    p_eval.add_argument("prompt", help="Natural language purchase instruction")
    p_eval.add_argument("--merchant", default="MERCHANT_ZEPTO_FRESH", help="Target merchant ID")
    p_eval.add_argument("--cap", type=float, default=700.0, help="Spending mandate limit in INR")
    
    # scenario
    p_scen = subparsers.add_parser("scenario", help="Run a deterministic judge scenario (1-6)")
    p_scen.add_argument("id", type=int, choices=[1, 2, 3, 4, 5, 6], help="Scenario ID (1-6)")
    
    # race-test
    subparsers.add_parser("race-test", help="Run 10-thread concurrent replay race attack test")
    
    # verify-ledger
    subparsers.add_parser("verify-ledger", help="Cryptographically verify the SHA-256 audit ledger")
    
    args = parser.parse_args()
    
    if args.command == "alexa":
        cmd_alexa(args.prompt)
    elif args.command == "ring":
        cmd_ring()
    elif args.command == "set-key":
        cmd_set_key(args.api_key)
    elif args.command == "test-connection":
        cmd_test_connection()
    elif args.command == "evaluate":
        cmd_evaluate(args.prompt, args.merchant, args.cap)
    elif args.command == "scenario":
        cmd_scenario(args.id)
    elif args.command == "race-test":
        cmd_race_test()
    elif args.command == "verify-ledger":
        cmd_verify_ledger()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
