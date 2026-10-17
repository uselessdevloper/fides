import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Key,
  Layers,
  ArrowRight,
  ExternalLink,
  Zap,
  Activity
} from 'lucide-react';

export default function DecisionInspector({ decision, onGoToAudit }) {
  if (!decision) {
    return (
      <div className="glass-panel" style={{ padding: 48, textAlign: 'center' }}>
        <ShieldCheck size={48} color="var(--accent-indigo)" style={{ margin: '0 auto 16px', opacity: 0.6 }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
          No Purchase Decision Evaluated Yet
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
          Submit a purchase request from the <strong>Purchase Playground</strong> or click one of the <strong>6 Deterministic Scenarios</strong> above to inspect the complete cryptographic, model, and policy verification trace.
        </p>
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
      detail: "Cryptographic signature matches agent public key"
    },
    {
      name: "Mandate Expiry",
      passed: verification?.mandate_not_expired,
      detail: "Temporal validity window verified"
    },
    {
      name: "Trusted Key Registry",
      passed: verification?.trusted_key_verified,
      detail: "Agent ID whitelisted in trusted keystore"
    },
    {
      name: "Merchant Approval",
      passed: verification?.merchant_approved,
      detail: "Target merchant allowed under active mandate"
    },
    {
      name: "Category Conformance",
      passed: verification?.category_allowed,
      detail: "All SKUs match authorized mandate categories"
    },
    {
      name: "Atomic Replay Protection",
      passed: verification?.replay_status_clean,
      detail: "Cryptographic nonce is fresh; duplicate attack blocked"
    },
    {
      name: "Prompt Injection Neutralized",
      passed: verification?.prompt_injection_neutralized,
      detail: "Catalogue descriptions & prompt overrides blocked"
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner: Decision Outcome */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          borderLeft: `6px solid ${isApproved ? 'var(--accent-emerald)' : isStepUp ? 'var(--accent-amber)' : 'var(--accent-rose)'}`,
          background: isApproved ? 'rgba(16, 185, 129, 0.08)' : isStepUp ? 'rgba(245, 158, 11, 0.08)' : 'rgba(239, 68, 68, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className={isApproved ? 'badge-approve' : isStepUp ? 'badge-step-up' : 'badge-deny'} style={{ fontSize: '0.9rem', padding: '5px 12px' }}>
                {outcome}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }} className="font-mono">
                Trace: {trace_id}
              </span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
              {reason_code}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>
              Server Resolved Total / Mandate Limit
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: server_calculated_total > mandate_limit ? '#f87171' : '#ffffff' }} className="font-mono">
                ₹{server_calculated_total?.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }} className="font-mono">
                / ₹{mandate_limit?.toFixed(2)}
              </span>
            </div>
            {human_approval_id && (
              <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 600 }}>
                Escalated to Human Review: {human_approval_id}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Heart of Fides: Model Interpretation VS Authoritative Policy Resolution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left: NVIDIA Nemotron Model Proposal */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                1. Nemotron Intent Proposal (Untrusted)
              </h3>
            </div>
            <span style={{
              fontSize: '0.68rem',
              color: '#67e8f9',
              background: 'rgba(6, 182, 212, 0.1)',
              padding: '2px 8px',
              borderRadius: 4
            }}>
              {nemotron_inference_latency_ms}ms runtime
            </span>
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 12 }}>
            Model: <strong>{model_used}</strong>. Interprets buyer intent into candidate SKUs only. Strictly prohibited from setting prices or authorizations.
          </p>

          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-subtle)',
            marginBottom: 12
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>
              Candidate Line Items Extracted by LLM:
            </span>
            {candidate_intent?.line_items?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {candidate_intent.line_items.map((li, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{li.sku}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Qty: <strong>{li.qty}</strong></span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.78rem', color: '#f87171' }}>
                No valid candidate SKUs extracted.
              </p>
            )}
          </div>

          {candidate_intent?.raw_reasoning && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              "{candidate_intent.raw_reasoning}"
            </p>
          )}
        </div>

        {/* Right: Fides Deterministic Policy Engine Resolution */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                2. Fides Authoritative Resolution (Deterministic)
              </h3>
            </div>
            <span style={{
              fontSize: '0.68rem',
              color: '#6ee7b7',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '2px 8px',
              borderRadius: 4
            }}>
              Server Controlled
            </span>
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 12 }}>
            Unit prices and line totals resolved strictly from trusted merchant catalogue.
          </p>

          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-subtle)',
            marginBottom: 12
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>
              Authoritative Server-Calculated Line Totals:
            </span>
            {resolved_items?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {resolved_items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: '#ffffff' }}>
                      {item.name} <span style={{ color: 'var(--text-dim)' }}>({item.qty}x @ ₹{item.unit_price})</span>
                    </span>
                    <span className="font-mono" style={{ color: '#34d399', fontWeight: 600 }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Effective Total:</span>
            <span className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              ₹{server_calculated_total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Cryptographic & Policy Verification Matrix */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: 14 }}>
          Cryptographic, Mandate & Policy Verification Matrix
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12
        }}>
          {checks.map((c, i) => (
            <div
              key={i}
              style={{
                background: c.passed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.06)',
                border: c.passed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 8,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10
              }}
            >
              {c.passed ? (
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
              ) : (
                <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
              )}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: c.passed ? '#ffffff' : '#fca5a5' }}>
                  {c.name}
                </span>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.3, marginTop: 2 }}>
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
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={18} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Scikit-Learn Risk Scorer
              </h3>
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: risk_score >= 0.7 ? '#f87171' : risk_score >= 0.3 ? '#fbbf24' : '#34d399'
            }} className="font-mono">
              Score: {risk_score?.toFixed(3)}
            </span>
          </div>

          {/* Risk Gauge Bar */}
          <div style={{
            height: 10,
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 5,
            overflow: 'hidden',
            marginBottom: 12,
            position: 'relative'
          }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, Math.max(0, risk_score * 100))}%`,
                background: risk_score >= 0.7
                  ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                  : risk_score >= 0.3
                    ? 'linear-gradient(90deg, #10b981, #f59e0b)'
                    : 'linear-gradient(90deg, #06b6d4, #10b981)',
                borderRadius: 5,
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 12 }}>
            <span>0.0 (Nominal)</span>
            <span>0.30 (Step-Up Threshold)</span>
            <span>0.70 (Deny Threshold)</span>
            <span>1.0 (Critical)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Telemetry Indicators:</span>
            {risk_factors?.map((rf, idx) => (
              <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                • {rf}
              </span>
            ))}
          </div>
        </div>

        {/* Audit Hash-Chain Verification */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={18} color="var(--accent-indigo)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Cryptographic Audit Proof
              </h3>
            </div>
            <button
              onClick={onGoToAudit}
              className="btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              <span>View In Ledger</span>
              <ExternalLink size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Audit Block Index:</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>#{audit_block_index}</span>
            </div>

            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: 2 }}>
                SHA-256 Block Hash:
              </span>
              <code style={{
                display: 'block',
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '6px 8px',
                borderRadius: 6,
                fontSize: '0.68rem',
                color: 'var(--accent-cyan)',
                wordBreak: 'break-all'
              }} className="font-mono">
                {audit_block_hash}
              </code>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>
                Appended to tamper-evident SHA-256 hash chain
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
