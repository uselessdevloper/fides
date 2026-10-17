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

export default function DecisionInspector({ decision, onGoToAudit }) {
  if (!decision) {
    return (
      <div className="wispr-card" style={{ padding: 56, textAlign: 'center' }}>
        <ShieldCheck size={44} color="var(--accent-coral)" style={{ margin: '0 auto 16px', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
          No Purchase Decision Evaluated Yet
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
          Submit a purchase request from the <strong>Playground</strong> or select one of the <strong>6 Deterministic Scenarios</strong> above to inspect the complete cryptographic, model, and policy verification trace.
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
      {/* Top Banner: Decision Outcome */}
      <div
        className="wispr-card"
        style={{
          padding: '22px 26px',
          borderLeft: `5px solid ${isApproved ? 'var(--accent-emerald)' : isStepUp ? 'var(--accent-amber)' : 'var(--accent-rose)'}`,
          background: isApproved ? '#F0FDF4' : isStepUp ? '#FFFBEB' : '#FEF2F2'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className={isApproved ? 'badge-approve' : isStepUp ? 'badge-step-up' : 'badge-deny'} style={{ fontSize: '0.85rem', padding: '4px 10px' }}>
                {outcome}
              </span>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                TRACE: {trace_id}
              </span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {reason_code}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>
              Server Calculated Total / Mandate Limit
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end' }}>
              <span className="font-mono" style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: server_calculated_total > mandate_limit ? 'var(--accent-rose)' : 'var(--text-main)'
              }}>
                ₹{server_calculated_total?.toFixed(2)}
              </span>
              <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                / ₹{mandate_limit?.toFixed(2)}
              </span>
            </div>
            {human_approval_id && (
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                Escalated to Human Review: {human_approval_id}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Heart of Fides: Model Proposal VS Deterministic Policy Engine */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left: NVIDIA Nemotron Model Proposal */}
        <div className="wispr-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={18} color="var(--accent-indigo)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                1. Nemotron Intent Proposal (Untrusted)
              </h3>
            </div>
            <span className="badge-mono" style={{ color: 'var(--accent-indigo)' }}>
              {nemotron_inference_latency_ms}ms runtime
            </span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 14 }}>
            Model: <strong>{model_used}</strong>. Interprets dialogue into candidate SKUs. Strictly excluded from setting prices or issuing financial authorizations.
          </p>

          <div className="wispr-inset" style={{ padding: 14, marginBottom: 12 }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: 8 }}>
              CANDIDATE SKUS EXTRACTED BY LLM:
            </span>
            {candidate_intent?.line_items?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {candidate_intent.line_items.map((li, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span className="font-mono" style={{ color: 'var(--accent-coral)', fontWeight: 600 }}>{li.sku}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Quantity: <strong>{li.qty}</strong></span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.78rem', color: 'var(--accent-rose)' }}>
                No valid candidate SKUs extracted.
              </p>
            )}
          </div>

          {candidate_intent?.raw_reasoning && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              "{candidate_intent.raw_reasoning}"
            </p>
          )}
        </div>

        {/* Right: Fides Authoritative Resolution */}
        <div className="wispr-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                2. Fides Policy Engine (Authoritative)
              </h3>
            </div>
            <span className="badge-mono" style={{ color: 'var(--accent-emerald)' }}>
              Deterministic Server
            </span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 14 }}>
            Prices and totals calculated authoritatively from the verified merchant catalogue.
          </p>

          <div className="wispr-inset" style={{ padding: 14, marginBottom: 12 }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: 8 }}>
              VERIFIED SERVER LINE TOTALS:
            </span>
            {resolved_items?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {resolved_items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>
                      {item.name} <span style={{ color: 'var(--text-dim)' }}>({item.qty}x @ ₹{item.unit_price})</span>
                    </span>
                    <span className="font-mono" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Effective Total:</span>
            <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              ₹{server_calculated_total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Cryptographic & Policy Verification Matrix */}
      <div className="wispr-card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
            CHECKS //
          </span>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
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
                background: c.passed ? '#F0FDF4' : '#FEF2F2',
                border: c.passed ? '1px solid #BBF7D0' : '1px solid #FECACA',
                borderRadius: 6,
                padding: '11px 13px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10
              }}
            >
              {c.passed ? (
                <CheckCircle2 size={17} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
              ) : (
                <XCircle size={17} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
              )}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: c.passed ? '#065F46' : '#991B1B' }}>
                  {c.name}
                </span>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35, marginTop: 2 }}>
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
        <div className="wispr-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={18} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Scikit-Learn Risk Scorer
              </h3>
            </div>
            <span className="font-mono" style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: risk_score >= 0.7 ? 'var(--accent-rose)' : risk_score >= 0.3 ? 'var(--accent-amber)' : 'var(--accent-emerald)'
            }}>
              Score: {risk_score?.toFixed(3)}
            </span>
          </div>

          {/* Risk Gauge Bar */}
          <div style={{
            height: 8,
            background: 'var(--bg-subtle)',
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 10,
            border: '1px solid var(--border-color)'
          }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, Math.max(0, risk_score * 100))}%`,
                background: risk_score >= 0.7
                  ? 'var(--accent-rose)'
                  : risk_score >= 0.3
                    ? 'var(--accent-amber)'
                    : 'var(--accent-emerald)',
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
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>TELEMETRY FACTORS:</span>
            {risk_factors?.map((rf, idx) => (
              <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                • {rf}
              </span>
            ))}
          </div>
        </div>

        {/* Cryptographic Audit Proof */}
        <div className="wispr-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={18} color="var(--accent-coral)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Cryptographic Audit Proof
              </h3>
            </div>
            <button
              onClick={onGoToAudit}
              className="btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              <span>View In Ledger</span>
              <ExternalLink size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Block Index:</span>
              <span className="font-mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>#{audit_block_index}</span>
            </div>

            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: 2 }}>
                SHA-256 Block Hash:
              </span>
              <code className="font-mono" style={{
                display: 'block',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                padding: '6px 8px',
                borderRadius: 4,
                fontSize: '0.68rem',
                color: 'var(--text-main)',
                wordBreak: 'break-all'
              }}>
                {audit_block_hash}
              </code>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <CheckCircle2 size={14} color="#059669" />
              <span style={{ fontSize: '0.72rem', color: '#065F46', fontWeight: 600 }}>
                Committed to tamper-evident SHA-256 hash chain
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
