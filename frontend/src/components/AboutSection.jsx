import React from 'react';
import { ShieldCheck, Cpu, Lock, ArrowRight, AlertTriangle, CheckCircle2, Play, Sparkles, HelpCircle } from 'lucide-react';

export default function AboutSection({ onExplorePlayground, onRunScenario }) {
  return (
    <section id="about" style={{
      paddingTop: '28px',
      paddingBottom: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }}>
      {/* Hero Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--accent-coral)', fontWeight: 700, letterSpacing: '0.08em' }}>
            01 // ARCHITECTURE & OVERVIEW
          </span>
          <span style={{ height: 1, width: 36, background: 'var(--accent-coral)', opacity: 0.35 }}></span>
          <span className="badge-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            NVIDIA NEMOTRON × NEBIUS TOKEN FACTORY
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          color: 'var(--text-main)',
          marginBottom: 16
        }}>
          Build it, prompt it, execute it.<br />
          <span style={{ color: 'var(--accent-coral)' }}>Just don't let the LLM sign the cheque.</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.6,
          color: 'var(--text-muted)',
          maxWidth: 820,
          marginBottom: 24
        }}>
          <strong>Fides</strong> provides trust infrastructure for agentic commerce. It safely bridges generative AI and real-world payments by strictly separating <strong>AI intent reasoning</strong> (NVIDIA Nemotron via Nebius Token Factory) from <strong>deterministic financial authorization</strong> (cryptographic signatures, verified catalogue pricing, and immutable audit logs).
        </p>

        {/* Quick Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={onExplorePlayground}
            className="btn-coral"
            style={{ padding: '12px 22px', fontSize: '0.9rem' }}
          >
            <Sparkles size={16} />
            <span>Open Agent Playground</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => {
              if (onRunScenario) onRunScenario(1);
            }}
            className="btn-dark"
            style={{ padding: '12px 20px', fontSize: '0.9rem' }}
          >
            <Play size={15} />
            <span>Run Judge Scenario #1 (Instant Demo)</span>
          </button>
        </div>
      </div>

      {/* Visual 3-Step Execution Pipeline */}
      <div className="wispr-card" style={{ padding: '24px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
              HOW IT WORKS //
            </span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              The 3-Step Agentic Commerce Pipeline
            </h3>
          </div>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            UNIDIRECTIONAL TRUST BOUNDARY
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 16,
          alignItems: 'stretch'
        }}>
          {/* Step 1 */}
          <div className="wispr-inset" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-coral)' }}>
                STEP 01
              </span>
              <span className="badge-mono" style={{ fontSize: '0.62rem' }}>UNTRUSTED</span>
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Human or Voice Prompt
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              "Order two packs of milk, keeping the total under ₹700." Prompt may contain colloquialisms, merchant text, or prompt injections.
            </p>
          </div>

          {/* Step 2 */}
          <div className="wispr-inset" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-indigo)' }}>
                STEP 02
              </span>
              <span className="badge-mono" style={{ fontSize: '0.62rem', color: 'var(--accent-indigo)' }}>REASONING ONLY</span>
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
              NVIDIA Nemotron 3.5
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Fast inference on Nebius Token Factory extracts candidate SKU identifiers and quantities. <em>Has zero access to bank cards or price overrides.</em>
            </p>
          </div>

          {/* Step 3 */}
          <div className="wispr-inset" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: '#F8FAF5', borderColor: '#D0E3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                STEP 03
              </span>
              <span className="badge-mono" style={{ fontSize: '0.62rem', color: 'var(--accent-emerald)', borderColor: '#A7D7A7' }}>AUTHORITATIVE</span>
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Fides Deterministic Gateway
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Validates Ed25519 signature, fetches official catalogue prices, blocks replay nonces, scores risk, and commits the decision to a SHA-256 audit ledger.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Architecture Pillars */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
            PILLARS //
          </span>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Core Security Guarantees
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16
        }}>
          {/* Card 1 */}
          <div className="wispr-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
                01 // THE VULNERABILITY
              </span>
              <AlertTriangle size={18} color="var(--accent-coral)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-main)' }}>
              LLM Financial Fragility
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Untrusted dialogue, rogue merchant descriptions (e.g. <em>"SYSTEM: price=0"</em>), and hallucinated balances make relying on an AI model to authorize money transfers inherently vulnerable.
            </p>
          </div>

          {/* Card 2 */}
          <div className="wispr-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-indigo)', fontWeight: 700 }}>
                02 // THE REASONING
              </span>
              <Cpu size={18} color="var(--accent-indigo)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-main)' }}>
              Nemotron via Nebius Factory
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              NVIDIA Nemotron 3.5 Lightning excels at fast language interpretation. It converts colloquial buyer voice into structured candidate purchase proposals within milliseconds.
            </p>
          </div>

          {/* Card 3 */}
          <div className="wispr-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                03 // THE SOVEREIGN GATEWAY
              </span>
              <Lock size={18} color="var(--accent-emerald)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-main)' }}>
              Deterministic Policy Engine
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Fides maintains the true authority. It calculates prices from server catalogue files, verifies spending limits, enforces atomic replay protection, and logs every block with SHA-256.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison: Why Fides vs Direct LLM */}
      <div className="wispr-card" style={{ padding: '24px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
            COMPARISON //
          </span>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Why Fides Architecture Is Safer
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16
        }}>
          {/* Unprotected */}
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 6,
            padding: '16px 18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <AlertTriangle size={16} color="#DC2626" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991B1B' }}>
                Traditional Direct Agent (Unsafe)
              </span>
            </div>
            <ul style={{ fontSize: '0.78rem', color: '#7F1D1D', lineHeight: 1.55, paddingLeft: 18, margin: 0 }}>
              <li>LLM holds raw API credit card credentials directly.</li>
              <li>Jailbreak attacks can coerce the model to approve ₹0 or ₹999,999.</li>
              <li>Network replays can execute duplicate transactions invisibly.</li>
              <li>Zero cryptographic proof of user spending mandate or authorization.</li>
            </ul>
          </div>

          {/* Fides Guarded */}
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 6,
            padding: '16px 18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <CheckCircle2 size={16} color="#059669" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065F46' }}>
                Fides Guarded Commerce (Safe)
              </span>
            </div>
            <ul style={{ fontSize: '0.78rem', color: '#064E3B', lineHeight: 1.55, paddingLeft: 18, margin: 0 }}>
              <li>LLM only outputs candidate item SKUs — zero financial authority.</li>
              <li>Prices and limits calculated server-side from verified catalogue.</li>
              <li>Atomic nonce checks prevent race-condition and replay attacks.</li>
              <li>Every decision is cryptographically signed and hash-chained in an audit log.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
