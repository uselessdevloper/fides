# Fides: Ambient Commerce for Fire TV, Alexa+, Ring & Bee

[![Amazon Developer Hackathon](https://img.shields.io/badge/Hackathon-Amazon_Developer_2026-FF9900?logo=amazon&logoColor=white)](https://amazonappdev2026.devpost.com/)
[![Track: Alexa+](https://img.shields.io/badge/Track-Alexa%2B_MCP_(Spec_2025--11--25)-00A8E8)](https://amazonappdev2026.devpost.com/)
[![Track: Fire TV](https://img.shields.io/badge/Track-Fire_TV_(Vega_OS_%26_Fire_OS)-FF9900?logo=amazonfiretv&logoColor=white)](https://amazonappdev2026.devpost.com/)
[![Track: Ring](https://img.shields.io/badge/Track-Ring_3D_Radar_Presence-00A8E8?logo=ring&logoColor=white)](https://amazonappdev2026.devpost.com/)
[![Track: Bee](https://img.shields.io/badge/Track-Bee_Wearable_AI_Haptics-8A2BE2)](https://amazonappdev2026.devpost.com/)
[![Mini Challenge: AWS Builder](https://img.shields.io/badge/AWS_Builder-Bedrock_Runtime_(boto3)-232F3E?logo=amazonwebservices&logoColor=white)](https://amazonappdev2026.devpost.com/)
[![Mini Challenge: Open Source](https://img.shields.io/badge/Open_Source-MIT_License-blue.svg)](LICENSE)
[![Python: 3.11+](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Ledger: SHA--256](https://img.shields.io/badge/Audit-SHA--256_Hash_Chain-orange)](https://en.wikipedia.org/wiki/Hash_chain)

> **Fides** is a trust infrastructure and ambient commerce gateway connecting **Fire TV**, **Alexa+**, **Ring**, and **Bee Wearable AI** through a self-hosted **Model Context Protocol (MCP)** server (Spec 2025-11-25) and **AWS Bedrock**.
>
> While **Alexa+** and **Bee Wearable** capture natural voice intent, Fides authoritatively verifies **Ring 3D radar physical presence**, enforces **Ed25519 spending mandates**, blocks replay attacks, triggers **Bee on-wrist double-pulse haptics**, and routes high-value step-up confirmations to the **Fire TV** living room display.
>
> 📋 **See [SUBMISSION.md](SUBMISSION.md) for the complete Devpost submission package, product feedback on all tools, friction logs (eligible for 10% bonus), and DevRel collaborator invite instructions.**

---

## 1. The Core Problem in Ambient Smart Home Commerce

When families use voice assistants to say *"Alexa, order groceries from Whole Foods"* or *"Alexa, buy electronics"*, ambient smart home purchasing faces critical challenges:
1. **Accidental & Unauthorized Triggers:** Children, background TV audio, or malicious guests can trigger real financial transactions.
2. **Absence of Physical Presence Verification:** Voice assistants cannot verify whether the authorized account holder is physically inside the home.
3. **LLM Financial Authority Vulnerabilities:** Letting an AI model authoritatively approve charges or set prices introduces prompt injection and hallucination risks.
4. **Lack of Living Room Oversight:** Ambient voice purchases happen invisibly without visual confirmation for family members.

### The Fides Architecture Principle
```
              [ User Ambient Voice ]             [ Bee Wearable Wrist Memo ]
                         │                                    │
                         ▼                                    ▼
           +───────────────────────────+        +───────────────────────────+
           │     Alexa+ Voice Agent    │        │      Bee Wearable AI      │
           │     (Preview Runtime)     │        │     (Ambient Audio HUD)   │
           +───────────────────────────+        +───────────────────────────+
                         │                                    │
       Streamable HTTP (MCP Spec 2025-11-25)         Bee CLI / Wrist API
                         │                                    │
                         └─────────────────┬──────────────────┘
                                           │
                                           ▼
             +───────────────────────────────────────────────────────────+
             │               Fides Self-Hosted MCP Server                │
             │        POST /mcp (JSON-RPC 2.0) & GET /mcp/events (SSE)   │
             +───────────────────────────────────────────────────────────+
                     │                                   │
                     ▼                                   ▼
          [ AWS Bedrock Runtime ]             [ Ring IoT Presence API ]
         (Amazon Nova via boto3)            (3D Radar & Z-Wave RSSI)
                     │                                   │
                     └─────────────────┬─────────────────┘
                                       │
                                       ▼
             +───────────────────────────────────────────────────────────+
             │             Fides Deterministic Policy Engine             │
             │   - Ed25519 Signature      - Mandate Temporal Window      │
             │   - Verified Catalogue     - Atomic Replay Nonce Lock     │
             │   - Scikit-Learn Risk      - Spending Cap Authorization   │
             +───────────────────────────────────────────────────────────+
                                       │
                                       ▼
             +───────────────────────────────────────────────────────────+
             │        Multi-Modal Human Step-Up Authorization            │
             │   • Fire TV (Vega OS / Fire OS): 10-foot remote D-pad card│
             │   • Bee Wearable: Double-pulse LRA haptic wrist alert     │
             +───────────────────────────────────────────────────────────+
                                       │
                                       ▼
             +───────────────────────────────────────────────────────────+
             │            SHA-256 Hash-Chained Audit Ledger              │
             │     Cryptographically immutable proof of all decisions    │
             +───────────────────────────────────────────────────────────+
```

---

## 2. Alexa+ Self-Hosted MCP Server (`Spec 2025-11-25`)

Fides implements an official self-hosted **Model Context Protocol (MCP)** server adhering to **Spec 2025-11-25** over **Streamable HTTP** in [`backend/mcp/alexa_mcp_server.py`](backend/mcp/alexa_mcp_server.py):

* **Transport:** Streamable HTTP (`POST /mcp`) and Server-Sent Events (`GET /mcp/events`).
* **Exposed MCP Tools (6 Registered):**
  1. `fides_evaluate_purchase`: Evaluates voice intent against verified catalogue prices and spending limits.
  2. `fides_check_mandate`: Queries remaining daily spending cap and authorized merchants.
  3. `ring_verify_presence`: Verifies physical in-home presence via Ring 3D radar and Z-Wave RSSI before authorizing checkout.
  4. `firetv_push_approval`: Sends visual approval cards to the living room Fire TV screen for human supervisory step-up.
  5. `bee_wrist_haptic_confirm`: Sends a physical double-pulse LRA haptic vibration to the user's Bee wearable.
  6. `bee_capture_intent`: Ingests ambient voice memos recorded from the Bee wearable or Apple Watch companion.

### Testing the MCP Server
```bash
# JSON-RPC 2.0 Initialize:
curl -s -X POST http://127.0.0.1:8000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}}'

# List Available MCP Tools (All 6 Tools):
curl -s -X POST http://127.0.0.1:8000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}'
```

---

## 3. Ring IoT Physical Access & Radar Presence

Located in [`backend/services/ring_service.py`](backend/services/ring_service.py) & [`backend/api/ring.py`](backend/api/ring.py):
* **Physical Presence Verification:** Checks Ring Video Doorbell Pro 2 radar motion, Z-Wave network proximity, and battery/signal strength.
* **Cryptographic Presence Proof:** Emits signed `RNG_PRESENCE_<NONCE>` tokens containing SHA-256 hashes linking device, timestamp, and user.
* **Camera Feed & HUD:** Real-time SVG camera snapshot stream at `/api/ring/snapshot`.
* **Simulation Endpoints:**
  * `POST /api/ring/motion` — Simulates 3D radar motion detection at the front entry zone.
  * `POST /api/ring/doorbell` — Simulates a physical chime press.

---

## 4. Fire TV 10-Foot Living Room Companion (Vega OS / Fire OS)

Located in [`backend/api/firetv.py`](backend/api/firetv.py) & [`frontend/src/components/LivingRoomDashboard.jsx`](frontend/src/components/LivingRoomDashboard.jsx):
* **10-Foot Ambient Screen Mode:** Designed specifically for TV displays running **Vega OS** or **Fire OS**.
* **Picture-in-Picture Checkout Overlay:** High-value or moderate-risk Alexa+ purchases pop up as visual cards on the TV screen.
* **Remote Control Interaction:** Family members or supervisors approve or deny transactions using simulated Fire TV D-pad remote controls (`[Select / OK] Approve` or `[Back] Deny`).

---

## 5. Bee Wearable AI (On-Wrist Ambient Audio & Haptics)

Located in [`backend/services/bee_service.py`](backend/services/bee_service.py) & [`backend/api/bee.py`](backend/api/bee.py):
* **Ambient Audio Capture:** Connects to Bee wearable audio streams and Apple Watch companion app to record and transcribe on-the-go voice memos.
* **Double-Pulse LRA Haptics:** Triggers subtle physical wrist alerts when high-value purchases require physical confirmation.
* **Bee CLI Commands:**
  ```bash
  python cli.py bee-status
  python cli.py bee-record "Approve Zepto grocery reorder under 700 rupees"
  python cli.py bee-haptic
  ```

---

## 6. AWS Bedrock Runtime Integration (AWS Builder Mini Challenge)

Located in [`backend/services/aws_bedrock.py`](backend/services/aws_bedrock.py):
* Uses `boto3` to invoke **AWS Bedrock Runtime** with **Amazon Nova Lite** (`amazon.nova-lite-v1:0`) or Anthropic Claude on Bedrock.
* Extracts structured candidate product SKUs from colloquial voice prompts.
* Includes a high-fidelity deterministic fallback for offline/evaluator environments without requiring active AWS credentials.

---

## 7. Repository Sharing for Amazon DevRel Reviewers

Per hackathon submission guidelines, add the following Amazon Developer Relations team members as collaborators under **Settings > Collaborators > Add people**:

| Username | Name | Organization |
|---|---|---|
| `testing@devpost.com` | Devpost Review Bot | Hackathon Operations |
| `chris-trag` | Chris Trag | Amazon Developer Relations |
| `knmeiss` | Kourtney Meiss | Amazon Developer Relations |
| `giolaq` | Giovanni Laquidara | Amazon Developer Relations |
| `anishamalde` | Anisha Malde | Amazon Developer Relations |
| `mosesroth` | Moses Roth | Amazon Developer Relations |
| `emersonsklar` | Emerson Sklar | Amazon Developer Relations |

---

## 8. Repository Structure

```
fides/
├── backend/
│   ├── main.py                     # FastAPI app with CORS, health check, and static frontend
│   ├── mcp/
│   │   └── alexa_mcp_server.py     # Model Context Protocol Server (Spec 2025-11-25, 6 tools)
│   ├── api/
│   │   ├── alexa.py                # POST /mcp, GET /mcp/events, POST /api/alexa/simulate
│   │   ├── ring.py                 # GET /api/ring/status, snapshot, motion & chime triggers
│   │   ├── firetv.py               # GET /api/firetv/status, notify, remote resolve
│   │   ├── bee.py                  # GET /api/bee/status, records, haptic alerts
│   │   ├── purchases.py            # POST /api/purchases/evaluate, catalogue, merchants
│   │   ├── approvals.py            # GET /api/approvals, POST /api/approvals/{id}/resolve
│   │   ├── audit.py                # GET /api/audit/blocks, GET /api/audit/verify
│   │   └── demo.py                 # POST /api/demo/scenario/{id}, POST /api/demo/replay-race
│   ├── services/
│   │   ├── aws_bedrock.py          # AWS Bedrock Runtime client (boto3, Amazon Nova)
│   │   ├── ring_service.py         # Ring IoT device telemetry & radar presence verification
│   │   ├── bee_service.py          # Bee wearable audio capture & LRA haptic triggers
│   │   ├── intent_parser.py        # Strict Pydantic parser & injection sanitizer
│   │   ├── catalogue_service.py    # Server-authoritative catalogue price resolution
│   │   ├── verification.py         # Ed25519 signature & atomic replay protection
│   │   ├── risk_scorer.py          # Scikit-learn calibrated behavioral risk model
│   │   ├── policy_engine.py        # YAML-based deterministic policy engine
│   │   └── audit_ledger.py         # SHA-256 hash-chained cryptographic ledger
│   └── config/
│       ├── policies.yaml           # Deterministic policy rules, caps, and merchants
│       └── catalogue.json          # Trusted merchant product catalogue
├── frontend/                       # Vite + React Ghost Core light retro application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Ambient device indicators & multi-tab navigation
│   │   │   ├── AboutSection.jsx    # Monolith hardware hero & connected living room diorama
│   │   │   ├── AlexaSimulator.jsx  # Interactive Alexa+ voice dialog with live MCP traces
│   │   │   ├── LivingRoomDashboard.jsx # Fire TV 10-foot, Ring camera HUD & Bee wearable
│   │   │   ├── ScenarioBar.jsx     # 1-click execution for 6 judge scenarios & race test
│   │   │   ├── PurchasePlayground.jsx  # Natural language prompt tester & catalogue browser
│   │   │   ├── DecisionInspector.jsx   # AI candidate proposal vs policy resolution comparison
│   │   │   ├── AuditViewer.jsx     # SHA-256 hash-chain explorer & human escalation queue
│   │   │   └── HackathonSubmission.jsx # 4 tracks, product feedback, friction logs & reviewers
│   │   ├── App.jsx                 # Main state coordinator
│   │   └── index.css               # Ghost Core millimeter grid light design system
├── tests/
│   ├── test_alexa_mcp.py           # MCP Spec 2025-11-25 initialize, tools/list, 6 tool tests
│   ├── test_amazon_integrations.py # AWS Bedrock runtime, Ring radar & Bee wearable tests
│   ├── test_intent_parser.py       # Pydantic validation & SKU sanitization
│   ├── test_verification.py        # Ed25519 signatures, expiries, merchant verification
│   ├── test_replay_protection.py   # Atomic locking & 10-thread concurrent race regression
│   ├── test_policy_engine.py       # Cap enforcement, category checks, decision matrix
│   └── test_audit_ledger.py        # Hash-chain linkage & tamper detection
├── eval/
│   ├── benchmark.py                # End-to-end evaluation suite (6/6 scenarios)
│   └── benchmark_results.json      # Benchmark telemetry (accuracy, latency)
├── cli.py                          # Terminal CLI for Alexa+ MCP, Ring, Bee, and evaluations
├── requirements.txt                # Python dependencies
├── SUBMISSION.md                   # Complete Devpost submission package & friction logs
├── LICENSE                         # MIT License
└── README.md                       # System documentation
```

---

## 9. Quickstart Guide

### Prerequisites
* Python 3.11+
* Node.js v18+ & npm

### Setup
```bash
# 1. Clone repository
git clone https://github.com/uselessdevloper/fides.git
cd fides

# 2. Setup virtual environment
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 3. Start unified backend server
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser!

### Running the Terminal CLI
```bash
# Execute voice purchase through Alexa+ MCP Server (Spec 2025-11-25):
python cli.py alexa "Alexa, order two cartons of organic whole milk under 700 rupees"

# Check Ring Video Doorbell status and radar telemetry:
python cli.py ring

# Check Bee Wearable AI and trigger wrist haptic alert:
python cli.py bee-status
python cli.py bee-haptic

# Run 10-thread concurrent replay race attack test:
python cli.py race-test

# Verify mathematical integrity of all SHA-256 blocks:
python cli.py verify-ledger
```

---

## 10. Running Tests & Benchmarks

Run the complete suite of **30 unit, security, and integration tests**:
```bash
.venv/bin/pytest -v
```

Run the end-to-end deterministic benchmark:
```bash
python eval/benchmark.py
```
Output:
```
tests/test_alexa_mcp.py::test_mcp_initialize PASSED                      [  3%]
tests/test_alexa_mcp.py::test_mcp_tools_list PASSED                      [  6%]
tests/test_alexa_mcp.py::test_mcp_ring_presence_tool_call PASSED         [ 10%]
tests/test_alexa_mcp.py::test_mcp_fides_evaluate_purchase_approved PASSED [ 13%]
tests/test_amazon_integrations.py::test_aws_bedrock_runtime_intent PASSED [ 17%]
tests/test_amazon_integrations.py::test_ring_service_presence_and_radar PASSED [ 20%]
tests/test_audit_ledger.py::test_audit_ledger_genesis_and_chaining PASSED [ 24%]
tests/test_policy_engine.py::test_policy_engine_approve_clean PASSED     [ 58%]
tests/test_replay_protection.py::test_concurrent_replay_race_regression PASSED [ 82%]
tests/test_verification.py::test_signature_verification_success PASSED   [ 86%]
============================== 29 passed in 1.24s ==============================
```

Run the benchmark evaluation suite:
```bash
.venv/bin/python eval/benchmark.py
```
Output:
```
============================================================
FIDES AGENTIC COMMERCE BENCHMARK & EVALUATION SUITE
SUMMARY: Extraction Accuracy: 80.0% | Policy Enforcement: 100.0%
Average Pipeline Latency: 0.58ms | Scenarios Passed: 6/6
============================================================
```

---

## 10. Product Feedback & Friction Logs (10% Bonus)

### Product Feedback
* **Alexa+ MCP (Spec 2025-11-25):** Standardizing on MCP makes voice assistant integrations cleanly modular. Streamable HTTP removes the overhead of maintaining persistent stateful WebSockets on cloud endpoints.
* **Ring IoT:** Using 3D radar and Z-Wave RSSI for physical presence checks eliminates accidental or unauthorized ambient voice purchasing.
* **Fire TV (Vega / Fire OS):** The 10-foot living room companion display provides necessary visual transparency and remote-control authorization for smart home commerce.
* **AWS Bedrock (boto3):** Amazon Nova Lite delivers sub-second intent extraction at negligible token cost.

### Friction Logs
* **Friction Log #1 (Streamable HTTP in MCP 2025-11-25):** Add standardized FastAPI middleware snippets to the developer portal for SSE event streaming. *(Severity: Medium)*
* **Friction Log #2 (Fire TV D-Pad Key Events):** Include a standardized `amazon-firetv-remote.js` polyfill to reconcile `Enter` (13) and `KEYCODE_DPAD_CENTER` (23) across web wrappers. *(Severity: Low)*

---

## 11. 3-Minute Demo Video Walkthrough Order

1. **Architecture & Problem (0:00 - 0:35):** Show `01 / ABOUT` and the multi-device pipeline linking Alexa+, Ring, Fire TV, and AWS Bedrock.
2. **Alexa+ MCP Voice Purchase (0:35 - 1:15):** Switch to `02 / ALEXA+ MCP`. Click Case #1 (*"Order milk under ₹700"*). Observe `ring_verify_presence` and `fides_evaluate_purchase` tool calls pass.
3. **Living Room Fire TV Step-Up (1:15 - 1:55):** Run Case #4. Observe `STEP_UP`. Switch to `03 / LIVING ROOM`. Show the interactive approval card on Fire TV and click `[Select / OK] Approve`.
4. **Ring Front Door Radar Telemetry (1:55 - 2:25):** Demonstrate Ring camera live feed, radar presence status, and click "Simulate Radar Motion".
5. **Cryptographic Audit Ledger (2:25 - 2:50):** Switch to `06 / AUDIT`. Click "Verify Mathematical Chain" to confirm mathematical integrity of all blocks.

---

## 12. License

This project is licensed under the [MIT License](LICENSE).
