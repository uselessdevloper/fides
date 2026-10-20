import React from 'react';
import { ShieldCheck, Cpu, Lock, ArrowRight, AlertTriangle, CheckCircle2, Play, Sparkles, Terminal, Radio, Tv, Layers } from 'lucide-react';

export default function AboutSection({ onExplorePlayground, onRunScenario }) {
  return (
    <section id="about" style={{
      paddingTop: '36px',
      paddingBottom: '48px',
      display: 'flex',
      flexDirection: 'column',
      gap: 36
    }}>
      {/* Ghost Hero Section with Ambient Aura Glow */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span className="font-mono" style={{
            fontSize: '0.72rem',
            color: 'var(--ghost-cyan)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            01 // SOVEREIGN TRUST INFRASTRUCTURE
          </span>
          <span style={{ height: 1, width: 40, background: 'linear-gradient(90deg, var(--ghost-cyan), transparent)' }}></span>
          <span className="badge-mono" style={{
            fontSize: '0.68rem',
            color: 'var(--ghost-ice-blue)',
            borderColor: 'rgba(214, 234, 255, 0.2)'
          }}>
            ALEXA+ MCP // RING RADAR // FIRE TV // NEMOTRON
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          marginBottom: 20,
          fontFamily: 'var(--font-heading)'
        }}>
          Build it, prompt it, execute it.<br />
          <span style={{
            background: 'linear-gradient(90deg, #9ef0ff 0%, #008dee 40%, #ff5300 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Just don't let the LLM sign the cheque.
          </span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.65,
          color: 'var(--text-muted)',
          maxWidth: 840,
          marginBottom: 28
        }}>
          <strong>Fides</strong> provides trust infrastructure for ambient and agentic commerce. It safely bridges conversational AI (<strong>Alexa+</strong> and <strong>NVIDIA Nemotron</strong>) with real-world payments by strictly enforcing a unidirectional trust boundary: AI models extract intent, while deterministic cryptographic engines authorize funds, verify <strong>Ring</strong> in-home physical presence, and push 10-foot approvals to <strong>Fire TV</strong>.
        </p>

        {/* Quick Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={onExplorePlayground}
            className="btn-ghost-primary"
            style={{ padding: '12px 24px', fontSize: '0.85rem' }}
          >
            <Sparkles size={16} />
            <span>Launch Alexa+ MCP Console</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => {
              if (onRunScenario) onRunScenario(1);
            }}
            className="btn-ghost-outline"
            style={{ padding: '12px 22px', fontSize: '0.82rem' }}
          >
            <Play size={14} color="var(--ghost-cyan)" />
            <span>Run Benchmark Scenario #1</span>
          </button>
        </div>
      </div>

      {/* Visual 3-Step Execution Pipeline with Ghost Glass styling */}
      <div className="ghost-card" style={{ padding: '26px 28px' }}>
        {/* Subtle decorative top hairline aura */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #9ef0ff 0%, #008dee 35%, #ff5300 70%, transparent 100%)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-cyan)', fontWeight: 700, letterSpacing: '0.08em' }}>
              PIPELINE TELEMETRY //
            </span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>
              The 3-Step Sovereign Authorization Pipeline
            </h3>
          </div>
          <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
            UNIDIRECTIONAL AIR-GAPPED BOUNDARY
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          alignItems: 'stretch'
        }}>
          {/* Step 1 */}
          <div className="ghost-inset" style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ghost-cyan)', letterSpacing: '0.06em' }}>
                STEP 01
              </span>
              <span className="badge-mono" style={{ color: 'var(--ghost-crimson)', borderColor: 'rgba(255, 51, 85, 0.3)' }}>
                UNTRUSTED INPUT
              </span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              Voice Prompt or Dialogue
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              "Alexa, buy two packs of organic milk under ₹700." Input may contain colloquial phrasing, price injections, or rogue merchant instructions.
            </p>
          </div>

          {/* Step 2 */}
          <div className="ghost-inset" style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ghost-electric-blue)', letterSpacing: '0.06em' }}>
                STEP 02
              </span>
              <span className="badge-mono" style={{ color: 'var(--ghost-cyan)', borderColor: 'rgba(0, 141, 238, 0.3)' }}>
                INTENT REASONING
              </span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              NVIDIA Nemotron 3.5 & Bedrock
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Extracts candidate items and counts into structured JSON proposals via Nebius Token Factory. <em>Has zero access to wallets, cards, or price overrides.</em>
            </p>
          </div>

          {/* Step 3 */}
          <div className="ghost-inset" style={{
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            borderColor: 'rgba(0, 245, 155, 0.25)',
            background: 'rgba(0, 245, 155, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ghost-emerald)', letterSpacing: '0.06em' }}>
                STEP 03
              </span>
              <span className="badge-mono" style={{ color: 'var(--ghost-emerald)', borderColor: 'rgba(0, 245, 155, 0.35)' }}>
                AUTHORITATIVE GATE
              </span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              Fides Deterministic Engine
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Validates Ed25519 signatures, verifies in-home radar presence via Ring, calculates catalogue totals, and writes SHA-256 hash-chained audit blocks.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars: Hardware & Protocol Integration */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-ember-orange)', fontWeight: 700, letterSpacing: '0.08em' }}>
            ECOSYSTEM //
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em' }}>
            Amazon & Nebius Hackathon Architecture
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16
        }}>
          {/* Card 1: Alexa+ MCP */}
          <div className="ghost-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ghost-cyan)', fontWeight: 700, letterSpacing: '0.06em' }}>
                01 // ALEXA+ MCP (2025-11-25)
              </span>
              <Radio size={18} color="var(--ghost-cyan)" />
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 8, color: '#ffffff' }}>
              Streamable HTTP MCP Server
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Implements self-hosted MCP endpoints at <code>/mcp</code> and <code>/mcp/events</code> exposing 4 sovereign tools for buyer intent, presence checks, and living room escalation.
            </p>
          </div>

          {/* Card 2: Ring IoT Radar */}
          <div className="ghost-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ghost-electric-blue)', fontWeight: 700, letterSpacing: '0.06em' }}>
                02 // RING IOT PRESENCE
              </span>
              <ShieldCheck size={18} color="var(--ghost-electric-blue)" />
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 8, color: '#ffffff' }}>
              Physical Radar Proof
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Leverages Ring 3D radar motion, Z-Wave RSSI, and doorbell biometric authentication to issue tamper-evident presence tokens before high-value checkouts.
            </p>
          </div>

          {/* Card 3: Fire TV */}
          <div className="ghost-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ghost-ember-orange)', fontWeight: 700, letterSpacing: '0.06em' }}>
                03 // FIRE TV 10-FOOT DISPLAY
              </span>
              <Tv size={18} color="var(--ghost-ember-orange)" />
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 8, color: '#ffffff' }}>
              Living Room Companion
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              When a transaction requires human step-up review, Fides pushes a 10-foot interactive card directly to Fire TV (Vega / Fire OS) for immediate remote approval.
            </p>
          </div>

          {/* Card 4: Nebius & Bedrock */}
          <div className="ghost-card" style={{ padding: '22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ghost-emerald)', fontWeight: 700, letterSpacing: '0.06em' }}>
                04 // NEBIUS × BEDROCK
              </span>
              <Cpu size={18} color="var(--ghost-emerald)" />
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 8, color: '#ffffff' }}>
              Hybrid LLM Reasoning
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              NVIDIA Nemotron 3.5 Lightning served on Nebius Token Factory delivers rapid SKU interpretation, while AWS Bedrock provides enterprise reliability for Alexa+ dialogue.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison: Ghost Style Glass Contrast */}
      <div className="ghost-card" style={{ padding: '26px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-cyan)', fontWeight: 700, letterSpacing: '0.08em' }}>
            SECURITY COMPARISON //
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
            Why Fides Architecture Eliminates Financial Jailbreaks
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16
        }}>
          {/* Unprotected */}
          <div style={{
            background: 'rgba(255, 51, 85, 0.05)',
            border: '1px solid rgba(255, 51, 85, 0.25)',
            borderRadius: 6,
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <AlertTriangle size={16} color="var(--ghost-crimson)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ghost-crimson)' }}>
                Direct LLM Execution (Vulnerable)
              </span>
            </div>
            <ul style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
              <li>LLM holds raw API credit card keys or bank authorization tokens.</li>
              <li>Prompt injection can persuade the model that price is ₹0 or ₹999,999.</li>
              <li>Zero physical presence proof: remote voice spoofing can drain accounts.</li>
              <li>Replay attacks execute duplicate transactions without detection.</li>
            </ul>
          </div>

          {/* Fides Guarded */}
          <div style={{
            background: 'rgba(0, 245, 155, 0.05)',
            border: '1px solid rgba(0, 245, 155, 0.25)',
            borderRadius: 6,
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CheckCircle2 size={16} color="var(--ghost-emerald)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ghost-emerald)' }}>
                Fides Ambient Trust Gateway (Secure)
              </span>
            </div>
            <ul style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
              <li>LLM only outputs candidate SKU strings — zero financial authority.</li>
              <li>Server fetches verified catalogue prices and checks signed mandates.</li>
              <li>Ring radar presence required for purchases exceeding auto-caps.</li>
              <li>Every action is cryptographically signed and hash-chained with SHA-256.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
