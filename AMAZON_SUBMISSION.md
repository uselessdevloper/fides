# Amazon Developer Hackathon — Complete Submission Package
## Fire TV, Alexa+, Ring & AWS Builder

---

## 1. Project Overview

* **Project Title:** Fides: Ambient Commerce for Alexa+, Ring & Fire TV
* **Tagline:** A self-hosted MCP server (Spec 2025-11-25, Streamable HTTP) connecting Alexa+ voice buying, Ring radar presence verification, and Fire TV 10-foot living room checkout approvals powered by AWS Bedrock.
* **Primary Track:** **Alexa+** *(Self-hosted Streamable HTTP MCP Server & Simulated Alexa+ Ambient Experience)*
* **Connected Products:**
  * **Alexa+:** Voice agent reasoning via Model Context Protocol (`/mcp` endpoint).
  * **Ring:** In-home 3D radar and Z-Wave RSSI presence verification to prevent unauthorized remote purchasing.
  * **Fire TV:** 10-foot visual checkout overlay on Vega OS / Fire OS for family & supervisor step-up approvals.
* **Mini Challenge 1:** **AWS Builder** *(AWS Bedrock Runtime with `boto3` for intent reasoning via Amazon Nova)*
* **Mini Challenge 2:** **Open Source** *(MIT License visible in repository root)*
* **Public Repository:** [https://github.com/uselessdevloper/fides](https://github.com/uselessdevloper/fides)
* **Demo URL:** [http://localhost:8000](http://localhost:8000)

---

## 2. Devpost Text Description

### The Problem: Ambient Voice Commerce Needs Trust Boundaries
When families say *"Alexa, order groceries from Whole Foods"* or *"Alexa, buy electronics"*, ambient voice purchasing encounters critical vulnerabilities:
1. **Accidental & Adversarial Triggers:** Children, TV commercials, or rogue dialogue can trigger high-value purchases.
2. **Lack of Physical Presence Verification:** Voice assistants cannot verify if the authorized account holder is physically inside the home.
3. **LLM Financial Authority Risk:** Relying on generative AI to authoritatively authorize credit cards or prices introduces prompt injection and hallucination risks.

### The Solution: Fides Ambient Gateway
Fides unites **Alexa+**, **Ring**, and **Fire TV** through the **Model Context Protocol (MCP)**:
1. **Alexa+ & Streamable HTTP MCP (`spec 2025-11-25`):**
   * Alexa+ connects to Fides's self-hosted MCP server at `/mcp` over Streamable HTTP and SSE (`/mcp/events`).
   * Alexa+ calls MCP tools: `ring_verify_presence`, `fides_evaluate_purchase`, and `firetv_push_approval`.
2. **Ring IoT Presence Gate:**
   * Before authorizing any transaction, Alexa+ invokes Ring. The Ring Video Doorbell Pro verifies 3D radar motion and Z-Wave signal strength, issuing a cryptographic presence token proving the user is home.
3. **AWS Bedrock Intent Extraction (AWS Builder Mini Challenge):**
   * Uses **AWS Bedrock Runtime (`boto3`)** with **Amazon Nova Lite** to extract candidate product SKUs and quantities without giving the model financial payment authority.
4. **Deterministic Policy & Replay Engine:**
   * Checks Ed25519 signatures, verifies server-side catalogue prices in INR (₹), neutralizes concurrent replay attacks with atomic locks, and logs to a SHA-256 hash-chain.
5. **Fire TV 10-Foot Companion (Vega OS / Fire OS):**
   * When an order exceeds nominal risk or spending limits, Alexa+ routes a visual step-up card directly to the living room Fire TV screen. The user confirms via their Fire TV remote (`[Select / OK] Approve` or `[Back] Deny`).

---

## 3. GitHub Collaborator Access for Amazon Reviewers

As specified in the hackathon instructions, if keeping the repository private, add these Amazon Developer Relations team members as collaborators:

| GitHub Username | Name | Role |
|---|---|---|
| `chris-trag` | Chris Trag | Amazon DevRel |
| `knmeiss` | Kourtney Meiss | Amazon DevRel |
| `giolaq` | Giovanni Laquidara | Amazon DevRel |
| `anishamalde` | Anisha Malde | Amazon DevRel |
| `mosesroth` | Moses Roth | Amazon DevRel |
| `emersonsklar` | Emerson Sklar | Amazon DevRel |

---

## 4. 3-Minute Demo Video Script & Storyboard

* **Total Duration:** 2 minutes 50 seconds (under the 3-minute limit)
* **Audio:** Public English voiceover with screen recording.

| Time | Visual on Screen | Spoken Script |
|---|---|---|
| **0:00 - 0:35** | Show `01 / ABOUT` and the cross-device architecture connecting Alexa+, Ring, Fire TV, and AWS Bedrock. | *"Welcome to Fides: Ambient Commerce for the Amazon Developer Hackathon. Today, we connect the living room, the front door, and the cloud. We built a self-hosted Model Context Protocol server adhering to the official 2025-11-25 spec that powers Alexa+ ambient buying with Ring IoT security and Fire TV living room approvals."* |
| **0:35 - 1:15** | Switch to `02 / ALEXA+ MCP`. Click Case #1: *"Alexa, order two cartons of organic whole milk under ₹700"*. Show voice wave and MCP tool execution trace. | *"Let's test an ambient voice purchase. When the user speaks to Alexa+, Alexa calls our self-hosted MCP server over Streamable HTTP. First, it calls `ring_verify_presence`, ensuring the speaker is physically in the house. Next, it calls `fides_evaluate_purchase` powered by AWS Bedrock. Fides deterministically verifies the Ed25519 spending mandate, calculates ₹150 within the ₹700 cap, and issues an APPROVE decision committed to our SHA-256 ledger."* |
| **1:15 - 1:55** | Run Case #4 (USB-C cable & pens). Observe `STEP_UP` decision. Switch to `03 / LIVING ROOM (FIRE TV & RING)`. | *"Now, what happens if an order triggers a behavioral risk flag? Alexa+ detects that step-up confirmation is required and calls the MCP tool `firetv_push_approval`. Look at the 10-foot Fire TV screen: an interactive Picture-in-Picture card appears on the TV. Using the Fire TV remote control, the user reviews the ₹380 order and clicks 'Select' to approve."* |
| **1:55 - 2:25** | Inspect the Ring Video Doorbell Pro widget. Click **Simulate Radar Motion** and **Simulate Chime**. | *"Meanwhile, on the front door, our Ring Video Doorbell Pro 2 actively monitors entry radar zones. When motion or chime events occur, Ring issues cryptographic presence proofs that prevent remote unauthorized voice hijacking."* |
| **2:25 - 2:50** | Switch to `06 / AUDIT LEDGER`. Click **Verify Mathematical Chain**. Show green badge: *"Cryptographically Verified"*. | *"Finally, in our Audit Ledger, every ambient voice decision from Alexa+, Ring presence token, and Fire TV confirmation is sealed in an immutable SHA-256 hash-chain. Fides demonstrates how Alexa+, Ring, Fire TV, and AWS Bedrock create a trusted ambient shopping experience."* |

---

## 5. Detailed Product Feedback (Required for Track & AWS)

### 1. Alexa+ & Model Context Protocol (MCP Spec 2025-11-25)
* **What We Used It For:** Exposing transactional tools (`fides_evaluate_purchase`, `ring_verify_presence`, `firetv_push_approval`) to Alexa+ via Streamable HTTP and SSE (`/mcp/events`).
* **What Worked Well:**
  * The transition to MCP as an open standard for Alexa+ makes skills vastly more portable and composable than legacy Alexa Skills Kit schemas.
  * Streamable HTTP eliminates the complexity of persistent bidirectional WebSocket connections for stateless cloud gateways.
* **What Needs Work:**
  * MCP tool return formats can become bloated if nested JSON is stringified inside markdown text blocks.
* **Onboarding Experience:** Smooth and developer-friendly once the 2025-11-25 JSON-RPC specification was mapped.
* **Would We Build With It Again?** Yes, absolutely. MCP is the future of voice assistants.

### 2. Ring IoT & Access Control
* **What We Used It For:** Physical presence verification via 3D radar and Z-Wave signal strength, camera snapshot feeds, and front-door access event logging.
* **What Worked Well:**
  * Combining physical IoT presence with conversational AI solves the critical "voice spoofing / accidental child order" problem in smart homes.
* **What Needs Work:**
  * Local network discovery for Ring devices on Amazon Sidewalk / Z-Wave requires clearer sandbox mock tools for developers without physical hardware.

### 3. Fire TV (Vega OS / Fire OS)
* **What We Used It For:** 10-foot living room visual confirmation overlay for high-value step-up purchases with D-pad remote controller support.
* **What Worked Well:**
  * TV web apps provide an ideal ambient companion for voice assistants because the screen is visible to the entire room.
* **What Needs Work:**
  * Testing D-pad remote focus states in web simulators can be tricky without dedicated Vega OS browser devtools.

### 4. AWS Bedrock (AWS Builder Mini Challenge)
* **What We Used It For:** Ambient intent parsing and line-item extraction using `boto3` calling `amazon.nova-lite-v1:0` and Anthropic Claude on Bedrock.
* **What Worked Well:**
  * Amazon Nova Lite offers ultra-fast response latency and very low token cost, making it ideal for streaming voice assistants.
  * `boto3.client('bedrock-runtime')` has clean, predictable SDK methods.
* **What Needs Work:**
  * Unified schema handling between Amazon Nova (`inferenceConfig`) and Anthropic Claude (`max_tokens`) requires model-specific payload wrappers.

---

## 6. Friction Logs (For 10% Judging Bonus)

### Friction Log #1: Streamable HTTP Header Formatting in MCP Spec 2025-11-25
* **Task Attempted:** Connecting a FastAPI backend directly to an Alexa+ Streamable HTTP client.
* **Steps Taken:** Implemented `/mcp` POST handler returning standard `application/json`.
* **Expected vs Actual:** Expected client to accept `application/json`; actual MCP client requested chunked streamable transfer encoding or SSE headers.
* **Workaround Used:** Added explicit SSE route `/mcp/events` alongside the JSON-RPC POST `/mcp` router.
* **Severity:** Medium
* **Actionable Suggestion:** Provide an official Amazon/MCP Python middleware snippet for FastAPI in the developer docs.

### Friction Log #2: D-Pad Key Event Trapping on Fire OS Web Views
* **Task Attempted:** Supporting remote control navigation for the 10-foot Fire TV overlay.
* **Steps Taken:** Listened for standard keyboard arrows (`ArrowUp`, `ArrowDown`, `Enter`).
* **Expected vs Actual:** On some Fire TV web wrappers, the remote `Select` key fires keyCode `13` (`Enter`) while on others it fires Android key event `KEYCODE_DPAD_CENTER` (`23`).
* **Workaround Used:** Bound both `Enter`, `Space`, and touch clicks to the approve button.
* **Severity:** Low
* **Actionable Suggestion:** Include a standardized `amazon-firetv-remote.js` polyfill library in the hackathon resources.

---

## 7. Feature Requests

1. **Native Ring Presence MCP Tool (Urgency: Important):**
   * Amazon should ship an official Ring MCP server out of the box so Alexa+ skills can natively verify "is the user in the living room?" with a single line of MCP configuration.
2. **Fire TV Ambient Notification Cards API (Urgency: Critical):**
   * Allow Alexa+ skills to pop up standardized Picture-in-Picture approval cards on Fire TV without requiring the user to switch apps or leave their movie.
3. **AWS Bedrock Structured Output Mode (Urgency: Important):**
   * Add strict Pydantic/JSON schema validation to Bedrock's `invoke_model` to guarantee JSON responses for voice agent skills.
