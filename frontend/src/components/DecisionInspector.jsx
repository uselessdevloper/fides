import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Cpu,
  ShieldCheck,
  Lock,
  ExternalLink,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function DecisionInspector({ decision, onGoToAudit, onRunDemoScenario }) {
  if (!decision) {
    return (
      <div className="ghost-card" style={{ padding: '52px 32px', textAlign: 'center', margin: '20px 0' }}>
        <ShieldCheck size={44} color="var(--ghost-cyan)" style={{ margin: '0 auto 16px', opacity: 0.9 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
          No Purchase Decision Evaluated Yet
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Run an automated evaluation or submit a prompt from the Playground to see the cryptographic, model, and policy verification trace side-by-side.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={onRunDemoScenario}
            className="btn-ghost-primary"
            style={{ padding: '10px 22px', fontSize: '0.82rem' }}
          >
            <span>Run Benchmark Scenario #1 (Instant Demo)</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    trace_id,
    timestamp,
    natural_language_request,
    model_used,
    nemotron_inference_latency_ms,
    candidate_intent,
    resolved_items,
    server_calculated_total,
    mandate_limit,
    verification,
    risk_score,
    risk_factors,
    decision: outcome,
    reason_code,
    human_approval_id,
    audit_block_index,
    audit_block_hash
  } = decision;

  const isApproved = outcome === 'APPROVE';
  const isStepUp = outcome === 'STEP_UP';
  const isDenied = outcome === 'DENY';

  const checks = [
    {
      name: "Ed25519 Signature",
      passed: verification?.signature_valid,
      detail: "Cryptographic signature matches registered agent public key"
    },
    {
      name: "Mandate Expiry",
      passed: verification?.mandate_not_expired,
      detail: "Temporal validity window verified"
    },
    {
      name: "Trusted Key Keystore",
      passed: verification?.trusted_key_verified,
      detail: "Agent ID verified in trusted keystore"
    },
    {
      name: "Merchant Whitelist",
      passed: verification?.merchant_approved,
      detail: "Target merchant allowed under active mandate"
    },
    {
      name: "Category Conformance",
      passed: verification?.category_allowed,
      detail: "All product SKUs match authorized mandate categories"
    },
    {
      name: "Atomic Replay Protection",
      passed: verification?.replay_status_clean,
      detail: "Cryptographic nonce is fresh; duplicate attacks blocked"
    },
    {
      name: "Prompt Injection Neutralized",
      passed: verification?.prompt_injection_neutralized,
      detail: "Adversarial instructions & rogue descriptions stripped"
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner: Decision Outcome with Ghost glow */}
      <div
        className="ghost-card"
        style={{
          padding: '24px 28px',
          borderLeft: `5px solid ${isApproved ? 'var(--ghost-emerald)' : isStepUp ? 'var(--ghost-amber)' : 'var(--ghost-crimson)'}`,
          background: isApproved
            ? 'linear-gradient(135deg, rgba(0, 245, 155, 0.08) 0%, rgba(10, 16, 26, 0.95) 100%)'
            : isStepUp
              ? 'linear-gradient(135deg, rgba(255, 170, 51, 0.08) 0%, rgba(10, 16, 26, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(255, 51, 85, 0.08) 0%, rgba(10, 16, 26, 0.95) 100%)',
          boxShadow: isApproved
            ? '0 8px 32px rgba(0, 245, 155, 0.12)'
            : isStepUp
              ? '0 8px 32px rgba(255, 170, 51, 0.12)'
              : '0 8px 32px rgba(255, 51, 85, 0.12)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className={isApproved ? 'badge-approve' : isStepUp ? 'badge-step-up' : 'badge-deny'} style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                {outcome}
              </span>
              <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--ghost-cyan)' }}>
                TRACE: {trace_id}
              </span>
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
              {reason_code}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
              Server Calculated Total / Mandate Limit
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end' }}>
              <span className="font-mono" style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: server_calculated_total > mandate_limit ? 'var(--ghost-crimson)' : 'var(--ghost-emerald)'
              }}>
                ₹{server_calculated_total?.toFixed(2)}
              </span>
              <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                / ₹{mandate_limit?.toFixed(2)}
              </span>
            </div>
            {human_approval_id && (
              <span style={{ fontSize: '0.72rem', color: 'var(--ghost-amber)', fontWeight: 700 }}>
                Escalated to Human Review: {human_approval_id}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Heart of Fides: Model Proposal VS Deterministic Policy Engine */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left: NVIDIA Nemotron Model Proposal */}
        <div className="ghost-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={18} color="var(--ghost-cyan)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                1. Nemotron Intent Proposal (Untrusted)
              </h3>
            </div>
            <span className="badge-mono" style={{ color: 'var(--ghost-cyan)' }}>
              {nemotron_inference_latency_ms}ms runtime
            </span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 14 }}>
            Model: <strong style={{ color: '#ffffff' }}>{model_used}</strong>. Interprets dialogue into candidate SKUs. Strictly excluded from setting prices or issuing financial authorizations.
          </p>

          <div className="ghost-inset" style={{ padding: 14, marginBottom: 12 }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: 8, letterSpacing: '0.06em' }}>
              CANDIDATE SKUS EXTRACTED BY LLM:
            </span>
            {candidate_intent?.line_items?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {candidate_intent.line_items.map((li, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span className="font-mono" style={{ color: 'var(--ghost-cyan)', fontWeight: 600 }}>{li.sku}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Quantity: <strong style={{ color: '#ffffff' }}>{li.qty}</strong></span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.78rem', color: 'var(--ghost-crimson)' }}>
                No valid candidate SKUs extracted.
              </p>
            )}
          </div>

          {candidate_intent?.raw_reasoning && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
              "{candidate_intent.raw_reasoning}"
            </p>
          )}
        </div>

        {/* Right: Fides Authoritative Resolution */}
        <div className="ghost-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={18} color="var(--ghost-emerald)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                2. Fides Policy Engine (Authoritative)
              </h3>
            </div>
            <span className="badge-mono" style={{ color: 'var(--ghost-emerald)' }}>
              Deterministic Server
            </span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 14 }}>
            Prices and totals calculated authoritatively from the verified merchant catalogue.
          </p>

          <div className="ghost-inset" style={{ padding: 14, marginBottom: 12 }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: 8, letterSpacing: '0.06em' }}>
              VERIFIED SERVER LINE TOTALS:
            </span>
            {resolved_items?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {resolved_items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: '#ffffff' }}>
                      {item.name} <span style={{ color: 'var(--text-dim)' }}>({item.qty}x @ ₹{item.unit_price})</span>
                    </span>
                    <span className="font-mono" style={{ color: 'var(--ghost-emerald)', fontWeight: 700 }}>
                      ₹{item.line_total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                No items resolved.
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Effective Total:</span>
            <span className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ghost-emerald)' }}>
              ₹{server_calculated_total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Cryptographic & Policy Verification Matrix */}
      <div className="ghost-card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-cyan)', fontWeight: 700, letterSpacing: '0.08em' }}>
            CHECKS //
          </span>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
            Cryptographic & Policy Verification Matrix
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12
        }}>
          {checks.map((c, i) => (
            <div
              key={i}
              style={{
                background: c.passed ? 'rgba(0, 245, 155, 0.05)' : 'rgba(255, 51, 85, 0.05)',
                border: c.passed ? '1px solid rgba(0, 245, 155, 0.25)' : '1px solid rgba(255, 51, 85, 0.25)',
                borderRadius: 4,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10
              }}
            >
              {c.passed ? (
                <CheckCircle2 size={17} color="var(--ghost-emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
              ) : (
                <XCircle size={17} color="var(--ghost-crimson)" style={{ flexShrink: 0, marginTop: 2 }} />
              )}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: c.passed ? 'var(--ghost-emerald)' : 'var(--ghost-crimson)' }}>
                  {c.name}
                </span>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35, marginTop: 2, margin: 0 }}>
                  {c.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Engine & Audit Record Footer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Scikit-Learn Behavioral Risk Scorer */}
        <div className="ghost-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={18} color="var(--ghost-amber)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Scikit-Learn Risk Scorer
              </h3>
            </div>
            <span className="font-mono" style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: risk_score >= 0.7 ? 'var(--ghost-crimson)' : risk_score >= 0.3 ? 'var(--ghost-amber)' : 'var(--ghost-emerald)'
            }}>
              Score: {risk_score?.toFixed(3)}
            </span>
          </div>

          {/* Risk Gauge Bar */}
          <div style={{
            height: 8,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 10,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, Math.max(0, risk_score * 100))}%`,
                background: risk_score >= 0.7
                  ? 'var(--ghost-crimson)'
                  : risk_score >= 0.3
                    ? 'var(--ghost-amber)'
                    : 'var(--ghost-emerald)',
                borderRadius: 4,
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 12 }}>
            <span>0.0 (Nominal)</span>
            <span>0.30 (Step-Up Ceiling)</span>
            <span>0.70 (Deny Threshold)</span>
            <span>1.0</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>TELEMETRY FACTORS:</span>
            {risk_factors?.map((rf, idx) => (
              <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                • {rf}
              </span>
            ))}
          </div>
        </div>

        {/* Cryptographic Audit Proof */}
        <div className="ghost-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={18} color="var(--ghost-cyan)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Cryptographic Audit Proof
              </h3>
            </div>
            <button
              onClick={onGoToAudit}
              className="btn-ghost-outline"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              <span>View In Ledger</span>
              <ExternalLink size={12} color="var(--ghost-cyan)" />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Block Index:</span>
              <span className="font-mono" style={{ color: 'var(--ghost-cyan)', fontWeight: 700 }}>#{audit_block_index}</span>
            </div>

            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: 4 }}>
                SHA-256 Block Hash:
              </span>
              <code className="font-mono" style={{
                display: 'block',
                background: 'rgba(3, 7, 13, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '6px 8px',
                borderRadius: 4,
                fontSize: '0.68rem',
                color: 'var(--ghost-ice-blue)',
                wordBreak: 'break-all'
              }}>
                {audit_block_hash}
              </code>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <CheckCircle2 size={14} color="var(--ghost-emerald)" />
              <span style={{ fontSize: '0.72rem', color: 'var(--ghost-emerald)', fontWeight: 600 }}>
                Committed to tamper-evident SHA-256 hash chain
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
