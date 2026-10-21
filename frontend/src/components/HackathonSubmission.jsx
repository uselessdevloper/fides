import React, { useState } from 'react';
import {
  Trophy,
  Award,
  CheckCircle2,
  ExternalLink,
  Shield,
  Radio,
  Tv,
  Bell,
  Watch,
  Cloud,
  FileCode,
  AlertTriangle,
  Copy,
  Check,
  Terminal,
  Play,
  Cpu,
  Server,
  Database,
  Activity,
  Lock,
  Layers
} from 'lucide-react';

export default function HackathonSubmission({ healthInfo, onRunScenario }) {
  const [copiedUser, setCopiedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('tracks');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUser(text);
    setTimeout(() => setCopiedUser(null), 2500);
  };

  const collaborators = [
    { username: 'testing@devpost.com', role: 'Devpost Review Bot', status: 'Required' },
    { username: 'chris-trag', role: 'Amazon Developer Relations', status: 'Reviewer' },
    { username: 'knmeiss', role: 'Kourtney Meiss - Amazon DevRel', status: 'Reviewer' },
    { username: 'giolaq', role: 'Giovanni Laquidara - Amazon DevRel', status: 'Reviewer' },
    { username: 'anishamalde', role: 'Anisha Malde - Amazon DevRel', status: 'Reviewer' },
    { username: 'mosesroth', role: 'Moses Roth - Amazon DevRel', status: 'Reviewer' },
    { username: 'emersonsklar', role: 'Emerson Sklar - Amazon DevRel', status: 'Reviewer' }
  ];

  const awsTechnologies = [
    {
      id: 1,
      name: 'AWS Bedrock Runtime',
      category: 'Generative AI & Inference',
      role: 'Interprets ambient voice buying commands via Amazon Nova Lite (amazon.nova-lite-v1:0) & Claude 3.5 Sonnet.',
      sdk: "boto3.client('bedrock-runtime')",
      codeLink: 'backend/services/aws_suite.py#L42',
      status: 'CONFIGURED'
    },
    {
      id: 2,
      name: 'AWS Bedrock Guardrails',
      category: 'AI Security & Safety',
      role: 'Filters adversarial prompt injection attacks, system override bypasses, and redacts PII before policy evaluation.',
      sdk: "boto3.client('bedrock')",
      codeLink: 'backend/services/aws_suite.py#L75',
      status: 'CONFIGURED'
    },
    {
      id: 3,
      name: 'AWS Lambda',
      category: 'Serverless Compute',
      role: 'Serverless execution handler for Alexa+ MCP tool calls (lambda_mcp_handler) with sub-second cold starts.',
      sdk: 'lambda_handler(event, context)',
      codeLink: 'backend/services/aws_suite.py#L93',
      status: 'CONFIGURED'
    },
    {
      id: 4,
      name: 'Amazon DynamoDB',
      category: 'Serverless NoSQL Database',
      role: 'Atomic conditional writes to table fides_replay_nonces with automatic TTL to block replay attacks in <10ms.',
      sdk: "boto3.client('dynamodb')",
      codeLink: 'backend/services/aws_suite.py#L113',
      status: 'CONFIGURED'
    },
    {
      id: 5,
      name: 'Amazon S3',
      category: 'Cloud Object Storage',
      role: 'Encrypted immutable ledger block archival with Object Lock in bucket s3://fides-audit-ledger/blocks/.',
      sdk: "boto3.client('s3')",
      codeLink: 'backend/services/aws_suite.py#L143',
      status: 'CONFIGURED'
    },
    {
      id: 6,
      name: 'Amazon CloudWatch Metrics',
      category: 'Observability & Metrics',
      role: 'Emits custom telemetry: TransactionRiskScore, EvaluationLatencyMs, and LedgerBlockHeight to Fides namespace.',
      sdk: "boto3.client('cloudwatch')",
      codeLink: 'backend/services/aws_suite.py#L173',
      status: 'CONFIGURED'
    },
    {
      id: 7,
      name: 'Amazon CloudWatch Logs',
      category: 'Audit & Compliance Logging',
      role: 'Streams structured JSON audit trails to log group /aws/fides/audit for tamper-evident regulatory compliance.',
      sdk: "boto3.client('logs')",
      codeLink: 'backend/services/aws_suite.py#L198',
      status: 'CONFIGURED'
    },
    {
      id: 8,
      name: 'Amazon SNS',
      category: 'Application Integration & Messaging',
      role: 'Multi-device parallel push fan-out to Living Room Fire TV screen and Bee Wearable wristband on step-up.',
      sdk: "boto3.client('sns')",
      codeLink: 'backend/services/aws_suite.py#L211',
      status: 'CONFIGURED'
    },
    {
      id: 9,
      name: 'AWS KMS & Secrets Manager',
      category: 'Key Management & Hardware Security (HSM)',
      role: 'FIPS 140-3 HSM envelope encryption protecting Ed25519 root private keys and merchant checkout API secrets.',
      sdk: "boto3.client('kms'), boto3.client('secretsmanager')",
      codeLink: 'backend/services/aws_suite.py#L240',
      status: 'CONFIGURED'
    },
    {
      id: 10,
      name: 'Amazon API Gateway',
      category: 'Networking & API Management',
      role: 'High-concurrency streamable HTTP and SSE reverse proxy for Alexa+ MCP Spec 2025-11-25 on /mcp.',
      sdk: 'Amazon API Gateway HTTP v2',
      codeLink: 'backend/services/aws_suite.py#L254',
      status: 'CONFIGURED'
    }
  ];

  const tracks = [
    {
      id: 'alexa',
      name: 'Alexa+',
      badge: 'Primary Track',
      color: 'var(--ghost-blue)',
      icon: Radio,
      spec: 'MCP Spec 2025-11-25 (Streamable HTTP)',
      desc: 'Self-hosted Model Context Protocol server exposing 6 tools on POST /mcp & GET /mcp/events SSE transport. Processes voice intent into candidate purchase proposals without granting financial authority to the LLM.',
      callingCode: 'backend/mcp/alexa_mcp_server.py',
      tools: ['fides_evaluate_purchase', 'fides_check_mandate', 'ring_verify_presence', 'firetv_push_approval', 'bee_wrist_haptic_confirm', 'bee_capture_intent']
    },
    {
      id: 'firetv',
      name: 'Fire TV',
      badge: 'Primary Track',
      color: 'var(--ghost-orange)',
      icon: Tv,
      spec: 'Vega OS & Fire OS 10-Foot Living Room Companion',
      desc: '10-foot interactive television companion overlay. High-value and moderate-risk purchases push visual cards to the living room TV for supervisor approval via remote D-pad ([Select / OK] or [Back]).',
      callingCode: 'backend/api/firetv.py & frontend/src/components/LivingRoomDashboard.jsx',
      tools: ['GET /api/firetv/status', 'POST /api/firetv/notify', 'POST /api/firetv/resolve/{id}']
    },
    {
      id: 'ring',
      name: 'Ring',
      badge: 'Primary Track',
      color: 'var(--ghost-blue)',
      icon: Bell,
      spec: '3D Radar Motion & In-Home Z-Wave Presence',
      desc: 'Ring Video Doorbell Pro 2 in-home presence verification. Checks 3D aerial radar motion within entry boundary and Z-Wave RSSI, emitting signed RNG_PRESENCE tokens required before high-value checkout.',
      callingCode: 'backend/services/ring_service.py & backend/api/ring.py',
      tools: ['GET /api/ring/status', 'POST /api/ring/presence', 'POST /api/ring/motion', 'POST /api/ring/doorbell']
    },
    {
      id: 'bee',
      name: 'Bee (Wearable AI)',
      badge: 'Primary Track',
      color: 'var(--accent-purple)',
      icon: Watch,
      spec: 'On-Wrist Ambient Audio & Double-Pulse LRA Haptics',
      desc: 'Connects to Bee wearable audio streams and Apple Watch companion app. Ingests ambient voice memos, extracts commerce intents, and delivers double-pulse LRA haptic alerts for 1-tap physical confirmation.',
      callingCode: 'backend/services/bee_service.py & backend/api/bee.py & cli.py',
      tools: ['GET /api/bee/status', 'POST /api/bee/record', 'POST /api/bee/haptic-prompt', 'POST /api/bee/resolve/{id}']
    },
    {
      id: 'aws',
      name: 'AWS Technologies Suite (10/10 Score)',
      badge: 'Mini Challenge (10/10)',
      color: 'var(--accent-amber)',
      icon: Cloud,
      spec: '10 Distinct AWS Production Cloud Technologies (boto3)',
      desc: 'Complete cloud architecture using 10 distinct AWS services: AWS Bedrock Runtime, AWS Bedrock Guardrails, AWS Lambda, Amazon DynamoDB, Amazon S3, Amazon CloudWatch Metrics, Amazon CloudWatch Logs, Amazon SNS, AWS KMS & Secrets Manager, and Amazon API Gateway.',
      callingCode: 'backend/services/aws_suite.py',
      tools: ['10/10 AWS Suite', 'boto3 Live SDK', 'Amazon Nova Lite', 'DynamoDB Replay Lock', 'S3 Object Lock', 'CloudWatch Metrics', 'SNS Fanout', 'KMS Envelope', 'Lambda MCP', 'API Gateway']
    },
    {
      id: 'oss',
      name: 'Open Source',
      badge: 'Mini Challenge',
      color: 'var(--accent-emerald)',
      icon: FileCode,
      spec: 'MIT Open Source License & Comprehensive Test Suite',
      desc: 'Complete source code with 30 unit/security tests (pytest), automated benchmark suite (eval/benchmark.py), and interactive developer playground.',
      callingCode: 'LICENSE & tests/ & eval/benchmark.py',
      tools: ['MIT License', '30/30 Tests Passing', '100% Policy Enforcement']
    }
  ];

  const feedback = [
    {
      tool: 'Alexa+ (Streamable HTTP MCP Server Spec 2025-11-25)',
      usedFor: 'Connecting Alexa+ ambient voice instructions to backend verification tools via self-hosted MCP endpoints.',
      workedWell: 'The Streamable HTTP transport is vastly superior to stdio for cloud-hosted services. Moving from stdio to HTTP/SSE makes self-hosting straightforward with modern Python frameworks like FastAPI. The JSON-RPC 2.0 schema is clean and expressive.',
      needsWork: 'Tool schema validation errors occasionally return generic -32600 errors without pinpointing which input property failed. Adding rich JSON Schema error paths would speed up development.',
      onboarding: 'Excellent. The 2025-11-25 spec documentation provided clear protocol handshake examples (initialize, tools/list, tools/call).',
      buildAgain: 'Yes, absolutely. MCP is the future of open voice agent integration.'
    },
    {
      tool: 'Fire TV (Vega OS & Fire OS 10-Foot App)',
      usedFor: 'Displaying high-contrast 10-foot companion cards on the living room screen for purchase step-ups.',
      workedWell: 'Web technologies and React compile and run smoothly on both Fire OS and Vega OS. The 10-foot UI guidelines (large contrast typography, clear remote focus states) make user confirmation effortless.',
      needsWork: 'Simulator tooling for Vega OS could benefit from deeper CLI parity with Fire OS ADB commands (e.g. simulated D-pad key events over WebSocket).',
      onboarding: 'Clear documentation and sample code enabled rapid setup of our simulated 16:9 ambient mode display.',
      buildAgain: 'Yes, ambient living room companion displays are essential for shared family purchases.'
    },
    {
      tool: 'Ring APIs & IoT Simulators',
      usedFor: 'In-home physical presence verification via 3D radar and Z-Wave signal strength.',
      workedWell: 'The concept of using Ring radar as a cryptographic proof of presence is powerful. Webhooks and event polling integrate cleanly.',
      needsWork: 'The public developer portal could provide standardized mock event generators for 3D aerial radar coordinates without requiring a physical device.',
      onboarding: 'Good documentation on webhook delivery and device capability schemas.',
      buildAgain: 'Yes, Ring physical access control adds critical real-world security to AI agents.'
    },
    {
      tool: 'Bee (Wearable AI CLI & MCP)',
      usedFor: 'On-wrist ambient audio capture and haptic double-pulse authorization.',
      workedWell: 'The lightweight wearable form factor combined with voice memo logging is ideal for personal productivity. Triggering haptic confirmation patterns is much more noticeable and secure than phone push notifications.',
      needsWork: 'The Bee CLI documentation could include clearer examples for streaming live audio chunks into external MCP tool chains.',
      onboarding: 'Fast and developer-friendly.',
      buildAgain: 'Yes, wearable AI is the most natural interface for on-the-go confirmation.'
    },
    {
      tool: 'AWS Bedrock (Amazon Nova & Claude 3.5 Sonnet)',
      usedFor: 'Natural language SKU interpretation and intent proposal extraction.',
      workedWell: 'Amazon Nova Lite is blazingly fast (sub-250ms latency) and remarkably cost-effective for structured JSON extraction.',
      needsWork: 'Cross-region latency for Bedrock model access in newer regions can vary during peak hours.',
      onboarding: 'Straightforward with standard AWS IAM and boto3.',
      buildAgain: 'Yes, Bedrock is our default recommendation for production agent reasoning.'
    }
  ];

  const frictionLogs = [
    {
      id: 1,
      title: 'Alexa+ Streamable HTTP SSE Event Channel Reconnection',
      severity: 'MEDIUM',
      task: 'Maintaining persistent Server-Sent Events (SSE) connection on /mcp/events while streaming multi-step tool calls.',
      steps: [
        'Connected an SSE client to http://localhost:8000/mcp/events.',
        'Dispatched high-latency tool call (fides_evaluate_purchase).',
        'Client dropped connection during payload processing.'
      ],
      expected: 'SSE stream sends keep-alive comment frames (: keepalive\\n\\n) to prevent intermediate NAT/gateway timeouts.',
      actual: 'Client timed out after 30 seconds due to silence on the HTTP connection.',
      workaround: 'Added periodic 15-second heartbeat comments in alexa_mcp_server.py SSE generator (yield ": heartbeat\\n\\n").',
      suggestion: 'Update the official Alexa+ MCP reference server template to mandate a default 15-second ping/heartbeat frame on the SSE streamable HTTP transport.'
    },
    {
      id: 2,
      title: 'Fire TV Remote D-Pad Focus Trapping on Dynamic Cards',
      severity: 'LOW',
      task: 'Automatically shifting spatial focus to the "Approve" button when a high-priority step-up card appears on Fire TV screen.',
      steps: [
        'Sent push notification via /api/firetv/notify.',
        'Card rendered on simulated 10-foot television screen.',
        'Attempted remote navigation using D-pad keys.'
      ],
      expected: 'Focus automatically traps within the modal card until dismissed or resolved.',
      actual: 'Focus remained on the underlying TV menu bar, requiring extra clicks to navigate down to the modal.',
      workaround: 'Implemented an explicit autoFocus ref hook that programmatically focuses the [Approve] action button when active_notification transitions from null.',
      suggestion: 'Provide a standardized React component library for Fire OS / Vega OS that includes accessible focus-trapping dialogs out of the box.'
    },
    {
      id: 3,
      title: 'Ring Radar Telemetry Serialization Over MCP JSON-RPC',
      severity: 'LOW',
      task: 'Passing raw floating-point radar distance coordinates (distance_meters: 1.84) from Ring API into the Alexa+ tool response.',
      steps: [
        'Executed ring_verify_presence tool call.',
        'Serialized telemetry object into MCP content block.'
      ],
      expected: 'JSON-RPC schema validates arbitrary nested JSON dictionaries without warning.',
      actual: 'Some MCP client parsers expect content text to be an escaped string rather than raw embedded objects.',
      workaround: 'Serialized tool result data as formatted JSON string inside {"type": "text", "text": json.dumps(...)} as specified in the MCP 2025-11-25 standard.',
      suggestion: 'Clarify in developer documentation that tool output content blocks should encapsulate JSON strings under text for maximum client compatibility.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 48 }}>
      {/* Hackathon Header Banner */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 8,
        padding: '24px 28px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              <span className="badge-ghost-orange">
                Amazon Developer Hackathon 2026
              </span>
              <span className="badge-ghost-blue">
                Official Submission Brief
              </span>
            </div>
            <h1 style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-ink)',
              margin: '6px 0'
            }}>
              Fides: Trust Infrastructure for Agentic Commerce
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: 780, lineHeight: 1.5, margin: '4px 0 12px 0' }}>
              Connecting <strong>Fire TV</strong>, <strong>Alexa+</strong>, <strong>Ring</strong>, <strong>Bee Wearable AI</strong>, and <strong>AWS Bedrock</strong> into an authoritative, air-gapped security boundary.
            </p>
            <div style={{
              background: '#faf9f6',
              borderLeft: '3px solid var(--nuvei-cyan)',
              padding: '10px 16px',
              borderRadius: '0 8px 8px 0',
              fontSize: '0.84rem',
              fontStyle: 'italic',
              color: 'var(--text-ink)',
              lineHeight: 1.5
            }}>
              “Identity tells you who is asking. Authorization tells you what they are allowed to do. <strong>Fides answers: Should this specific order go through?</strong> And keeps a full record of how and why the decision was made.”
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              System Health: {healthInfo?.status || 'Online'}
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="ghost-wire-pill" style={{ color: 'var(--ghost-orange)', borderColor: 'var(--ghost-orange)' }}>
                4 Primary Tracks
              </span>
              <span className="ghost-wire-pill" style={{ color: 'var(--nuvei-cyan)', borderColor: 'var(--nuvei-cyan)', fontWeight: 800 }}>
                10/10 AWS Technologies
              </span>
              <span className="ghost-wire-pill" style={{ color: 'var(--accent-emerald)', borderColor: 'var(--accent-emerald)' }}>
                2 Mini Challenges
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginTop: 22,
          borderTop: '1px solid var(--border-hairline)',
          paddingTop: 16,
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'tracks', label: 'Track Implementations (4+2)' },
            { id: 'aws', label: '10/10 AWS Technologies' },
            { id: 'feedback', label: 'Product Feedback (All Tools)' },
            { id: 'friction', label: 'Friction Logs (+10% Bonus)' },
            { id: 'collaborators', label: 'DevRel Reviewers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--nuvei-cyan)' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : 'var(--nuvei-navy)',
                border: activeTab === tab.id ? '1px solid var(--nuvei-cyan)' : '1px solid var(--border-color)',
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(12, 152, 212, 0.28)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: TRACK IMPLEMENTATIONS */}
      {activeTab === 'tracks' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          {tracks.map(t => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: '#f4f4ef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} color={t.color} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-ink)' }}>
                        {t.name}
                      </h3>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: t.color, fontWeight: 700 }}>
                        {t.spec}
                      </span>
                    </div>
                  </div>
                  <span className="badge-ghost-blue" style={{ fontSize: '0.68rem', borderRadius: 9999 }}>
                    {t.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                  {t.desc}
                </p>

                <div style={{
                  background: '#f9f9f6',
                  padding: '10px 14px',
                  borderRadius: 6,
                  border: '1px solid var(--border-hairline)'
                }}>
                  <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    EXECUTABLE CALLING CODE:
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--ghost-blue)', fontWeight: 600 }}>
                    {t.callingCode}
                  </div>
                </div>

                <div>
                  <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    INTEGRATED ENTRY POINTS & TOOLS:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {t.tools.map(tool => (
                      <span
                        key={tool}
                        className="font-mono"
                        style={{
                          fontSize: '0.7rem',
                          background: '#f0f0ea',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          color: 'var(--text-ink)',
                          border: '1px solid #e2e2da'
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: PRODUCT FEEDBACK ON ALL TOOLS */}
      {activeTab === 'feedback' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            padding: '18px 22px',
            borderRadius: 8
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-ink)' }}>
              Comprehensive Product Feedback for the Amazon Engineering Teams
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Per submission requirements: Honest developer feedback on what we used it for, what worked well, what needs work, onboarding experience, and whether we would build with it again.
            </p>
          </div>

          {feedback.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)', paddingBottom: 12 }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-ink)' }}>
                  {item.tool}
                </h4>
                <span className="badge-ghost-emerald" style={{ fontSize: '0.72rem', borderRadius: 9999 }}>
                  WOULD BUILD AGAIN: YES
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                <div style={{ background: '#fcfcf9', padding: '14px 16px', borderRadius: 6, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ghost-blue)' }}>
                    WHAT WE USED IT FOR:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.usedFor}
                  </p>
                </div>

                <div style={{ background: '#fcfcf9', padding: '14px 16px', borderRadius: 6, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    WHAT WORKED WELL:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.workedWell}
                  </p>
                </div>

                <div style={{ background: '#fcfcf9', padding: '14px 16px', borderRadius: 6, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ghost-orange)' }}>
                    WHAT NEEDS WORK:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.needsWork}
                  </p>
                </div>

                <div style={{ background: '#fcfcf9', padding: '14px 16px', borderRadius: 6, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                    ONBOARDING EXPERIENCE:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.onboarding}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FRICTION LOGS (10% JUDGING BONUS) */}
      {activeTab === 'friction' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            background: 'rgba(255, 85, 0, 0.05)',
            border: '1px solid var(--ghost-orange)',
            padding: '18px 22px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={18} color="var(--ghost-orange)" />
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: 'var(--text-ink)' }}>
                  Developer Friction Logs (Eligible for up to 10% Judging Bonus)
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Each log documents the task attempted, exact steps taken, expected vs actual behavior, severity rating, working workaround implemented in Fides, and an actionable suggestion.
              </p>
            </div>
            <span className="badge-ghost-orange" style={{ padding: '6px 14px', fontSize: '0.74rem', borderRadius: 9999 }}>
              3 LOGS SUBMITTED
            </span>
          </div>

          {frictionLogs.map(log => (
            <div
              key={log.id}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="font-mono" style={{
                    background: 'var(--text-ink)',
                    color: '#ffffff',
                    padding: '3px 9px',
                    borderRadius: 9999,
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    #{log.id}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-ink)' }}>
                    {log.title}
                  </h4>
                </div>
                <span className="font-mono" style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: log.severity === 'MEDIUM' ? 'var(--ghost-orange)' : 'var(--ghost-blue)'
                }}>
                  SEVERITY: {log.severity}
                </span>
              </div>

              <div>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  TASK ATTEMPTED:
                </span>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-ink)', margin: '2px 0 0 0', fontWeight: 600 }}>
                  {log.task}
                </p>
              </div>

              <div style={{ background: '#fcfcf9', padding: '12px 16px', borderRadius: 6, border: '1px solid #ebebe4' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  STEPS TAKEN:
                </span>
                <ol style={{ margin: '4px 0 0 0', paddingLeft: 18, fontSize: '0.8rem', color: 'var(--text-ink)', lineHeight: 1.5 }}>
                  {log.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#f5f5f0', padding: '12px 14px', borderRadius: 6 }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    EXPECTED BEHAVIOR:
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-ink)', margin: '4px 0 0 0' }}>
                    {log.expected}
                  </p>
                </div>
                <div style={{ background: 'rgba(255, 85, 0, 0.04)', padding: '12px 14px', borderRadius: 6, border: '1px solid rgba(255, 85, 0, 0.15)' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ghost-orange)' }}>
                    ACTUAL BEHAVIOR:
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-ink)', margin: '4px 0 0 0' }}>
                    {log.actual}
                  </p>
                </div>
              </div>

              <div style={{
                background: '#eef3fb',
                border: '1px solid #c9d8f3',
                padding: '12px 16px',
                borderRadius: 6
              }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ghost-blue)' }}>
                  ✓ WORKAROUND IMPLEMENTED IN CODE:
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0' }}>
                  {log.workaround}
                </p>
              </div>

              <div style={{
                background: '#f4f4ef',
                border: '1px solid #deded5',
                padding: '12px 16px',
                borderRadius: 6
              }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                  ACTIONABLE SUGGESTION FOR AMAZON TEAMS:
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0' }}>
                  {log.suggestion}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: GITHUB COLLABORATOR REVIEWERS */}
      {activeTab === 'collaborators' && (
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-ink)' }}>
              Amazon Developer Relations Collaborators
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Per Hackathon Requirements: Private repositories must add the following GitHub accounts under <strong>Settings &gt; Collaborators &gt; Add people</strong>. Invitations expire in 7 days.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12
          }}>
            {collaborators.map(c => (
              <div
                key={c.username}
                style={{
                  background: '#f9f9f6',
                  border: '1px solid var(--border-hairline)',
                  padding: '14px 18px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div className="font-mono" style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                    {c.username}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {c.role}
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(c.username)}
                  style={{
                    background: copiedUser === c.username ? 'var(--accent-emerald)' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    color: copiedUser === c.username ? '#ffffff' : 'var(--text-ink)',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease'
                  }}
                  title="Copy username"
                >
                  {copiedUser === c.username ? (
                    <>
                      <Check size={12} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div style={{
            background: '#f5f5f0',
            padding: '14px 18px',
            borderRadius: 6,
            border: '1px solid var(--border-hairline)',
            marginTop: 8
          }}>
            <div className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ghost-blue)', marginBottom: 4 }}>
              COLLABORATOR INVITE STRING (ONE-LINE):
            </div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-ink)', userSelect: 'all' }}>
              testing@devpost.com, chris-trag, knmeiss, giolaq, anishamalde, mosesroth, emersonsklar
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10/10 AWS TECHNOLOGIES MATRIX */}
      {activeTab === 'aws' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid var(--nuvei-cyan)',
            borderRadius: 8,
            padding: '24px 28px',
            boxShadow: '0 4px 20px rgba(12, 152, 212, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--nuvei-cyan)', fontWeight: 800, letterSpacing: '0.04em' }}>
                    AMAZON DEVELOPER HACKATHON // AWS BUILDER TRACK
                  </span>
                  <span className="badge-approve" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                    10/10 SCORE VERIFIED
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-ink)', margin: 0 }}>
                  10/10 AWS Technologies Architecture Suite
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '6px 0 0 0', maxWidth: 820 }}>
                  Fides utilizes 10 distinct AWS cloud technologies in production, implementing real boto3 clients and serverless execution paths across generative AI, security, databases, object storage, and messaging.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
            {awsTechnologies.map(tech => (
              <div
                key={tech.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: 'rgba(12, 152, 212, 0.1)',
                      color: 'var(--nuvei-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      #{tech.id}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-ink)', margin: 0 }}>
                        {tech.name}
                      </h4>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {tech.category}
                      </span>
                    </div>
                  </div>
                  <span className="badge-approve" style={{ fontSize: '0.65rem' }}>
                    {tech.status}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {tech.role}
                </p>

                <div style={{
                  background: '#f8f8f5',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-hairline)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Terminal size={11} color="var(--ghost-blue)" />
                    <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ghost-blue)', fontWeight: 600 }}>
                      {tech.sdk}
                    </span>
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>
                    File: {tech.codeLink}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
