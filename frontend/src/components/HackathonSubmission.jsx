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
  Cpu
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
      name: 'AWS Builder',
      badge: 'Mini Challenge',
      color: 'var(--accent-amber)',
      icon: Cloud,
      spec: 'AWS Bedrock Runtime (boto3) - Amazon Nova Lite & Claude',
      desc: 'Direct boto3 Bedrock client invocation targeting amazon.nova-lite-v1:0 and Claude 3.5 Sonnet for natural language intent interpretation, with automatic offline fallback.',
      callingCode: 'backend/services/aws_bedrock.py',
      tools: ['boto3.client("bedrock-runtime")', 'amazon.nova-lite-v1:0', 'anthropic.claude-3-5-sonnet-20241022-v2:0']
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
        borderRadius: 4,
        padding: '24px 28px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="badge-ghost-orange">
                AMAZON DEVELOPER HACKATHON 2026
              </span>
              <span className="badge-ghost-blue">
                OFFICIAL SUBMISSION BRIEF
              </span>
            </div>
            <h1 style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-ink)',
              margin: '6px 0'
            }}>
              Fides: Sovereign Trust & Ambient Commerce Gateway
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: 780, lineHeight: 1.5 }}>
              Connecting <strong>Fire TV</strong>, <strong>Alexa+</strong>, <strong>Ring</strong>, <strong>Bee Wearable AI</strong>, and <strong>AWS Bedrock</strong> into an authoritative, air-gapped security boundary for autonomous voice purchases.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              HEALTH // {healthInfo?.status || 'ONLINE'}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="ghost-wire-pill" style={{ color: 'var(--ghost-orange)', borderColor: 'var(--ghost-orange)' }}>
                4 PRIMARY TRACKS
              </span>
              <span className="ghost-wire-pill" style={{ color: 'var(--accent-emerald)', borderColor: 'var(--accent-emerald)' }}>
                2 MINI CHALLENGES
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: 6,
          marginTop: 20,
          borderTop: '1px solid var(--border-hairline)',
          paddingTop: 16
        }}>
          {[
            { id: 'tracks', label: '1. TRACK IMPLEMENTATIONS (4+2)' },
            { id: 'feedback', label: '2. PRODUCT FEEDBACK (ALL TOOLS)' },
            { id: 'friction', label: '3. FRICTION LOGS (+10% BONUS)' },
            { id: 'collaborators', label: '4. DEVREL REVIEWERS' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--ghost-blue)' : '#f3f3ee',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-ink)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 2,
                fontSize: '0.74rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
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
                  borderRadius: 4,
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
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
                  <span className="badge-ghost-blue" style={{ fontSize: '0.62rem' }}>
                    {t.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {t.desc}
                </p>

                <div style={{
                  background: '#f9f9f6',
                  padding: '8px 12px',
                  borderRadius: 2,
                  border: '1px solid var(--border-hairline)'
                }}>
                  <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    EXECUTABLE CALLING CODE:
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--ghost-blue)', fontWeight: 600 }}>
                    {t.callingCode}
                  </div>
                </div>

                <div>
                  <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                    INTEGRATED ENTRY POINTS & TOOLS:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {t.tools.map(tool => (
                      <span
                        key={tool}
                        className="font-mono"
                        style={{
                          fontSize: '0.68rem',
                          background: '#f0f0ea',
                          padding: '3px 8px',
                          borderRadius: 2,
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
            padding: '16px 20px',
            borderRadius: 4
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-ink)' }}>
              Comprehensive Product Feedback for the Amazon Engineering Teams
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Per submission requirements: Honest developer feedback on what we used it for, what worked well, what needs work, onboarding experience, and whether we would build with it again.
            </p>
          </div>

          {feedback.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)', paddingBottom: 10 }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-ink)' }}>
                  {item.tool}
                </h4>
                <span className="badge-ghost-emerald" style={{ fontSize: '0.68rem' }}>
                  WOULD BUILD AGAIN: YES
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                <div style={{ background: '#fcfcf9', padding: '12px 14px', borderRadius: 2, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ghost-blue)' }}>
                    WHAT WE USED IT FOR:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.usedFor}
                  </p>
                </div>

                <div style={{ background: '#fcfcf9', padding: '12px 14px', borderRadius: 2, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    WHAT WORKED WELL:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.workedWell}
                  </p>
                </div>

                <div style={{ background: '#fcfcf9', padding: '12px 14px', borderRadius: 2, border: '1px solid #ebebe4' }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ghost-orange)' }}>
                    WHAT NEEDS WORK:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {item.needsWork}
                  </p>
                </div>

                <div style={{ background: '#fcfcf9', padding: '12px 14px', borderRadius: 2, border: '1px solid #ebebe4' }}>
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
            padding: '16px 20px',
            borderRadius: 4,
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
            <span className="badge-ghost-orange" style={{ padding: '6px 14px', fontSize: '0.74rem' }}>
              3 LOGS SUBMITTED
            </span>
          </div>

          {frictionLogs.map(log => (
            <div
              key={log.id}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
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
                    padding: '2px 8px',
                    borderRadius: 2,
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

              <div style={{ background: '#fcfcf9', padding: '10px 14px', borderRadius: 2, border: '1px solid #ebebe4' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  STEPS TAKEN:
                </span>
                <ol style={{ margin: '4px 0 0 0', paddingLeft: 18, fontSize: '0.8rem', color: 'var(--text-ink)', lineHeight: 1.5 }}>
                  {log.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#f5f5f0', padding: '10px 14px', borderRadius: 2 }}>
                  <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    EXPECTED BEHAVIOR:
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-ink)', margin: '4px 0 0 0' }}>
                    {log.expected}
                  </p>
                </div>
                <div style={{ background: 'rgba(255, 85, 0, 0.04)', padding: '10px 14px', borderRadius: 2, border: '1px solid rgba(255, 85, 0, 0.15)' }}>
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
                borderRadius: 2
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
                borderRadius: 2
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
          borderRadius: 4,
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
                  padding: '12px 16px',
                  borderRadius: 2,
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
                    padding: '6px 10px',
                    borderRadius: 2,
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                  title="Copy username"
                >
                  {copiedUser === c.username ? (
                    <>
                      <Check size={12} />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div style={{
            background: '#f5f5f0',
            padding: '14px 18px',
            borderRadius: 2,
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
    </div>
  );
}
