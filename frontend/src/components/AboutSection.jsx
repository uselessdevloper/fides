import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  Lock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Play,
  Sparkles,
  Radio,
  Tv,
  Bell,
  Layers,
  ShoppingBag,
  ExternalLink,
  Wifi,
  Eye,
  Sliders,
  Watch
} from 'lucide-react';
import ContinuousCommerceLoop from './ContinuousCommerceLoop';

export default function AboutSection({ onExplorePlayground, onRunScenario }) {
  const [activeCategory, setActiveCategory] = useState('HOME');

  return (
    <section id="about" style={{
      paddingTop: '24px',
      paddingBottom: '56px',
      display: 'flex',
      flexDirection: 'column',
      gap: 36
    }}>
      {/* 1. GHOST CORE PANORAMIC ECOSYSTEM HERO */}
      <div style={{
        background: '#ffffff',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)'
      }}>
        {/* Top Technical Metadata Header */}
        <div style={{
          background: '#0e1117',
          color: '#ffffff',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          borderBottom: '1px solid #1e2633'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-blue)', fontWeight: 800, letterSpacing: '0.08em' }}>
              FIDES // SOVEREIGN AMBIENT GATEWAY
            </span>
            <span style={{ color: '#4a5568' }}>•</span>
            <span style={{ fontSize: '0.7rem', color: '#a0aec0', fontFamily: 'var(--font-mono)' }}>
              AMAZON ECOSYSTEM INTEGRATION
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>
                4 DEVICES CONNECTED
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: '#8892b0' }}>
              MCP SPEC 2025-11-25
            </span>
          </div>
        </div>

        {/* Panoramic Full-Width Visual Hardware Showcase */}
        <div style={{
          position: 'relative',
          background: '#141820',
          overflow: 'hidden',
          aspectRatio: '16/9',
          maxHeight: 520
        }}>
          <img
            src="/fides_ecosystem_hero.jpg"
            alt="Fides Connected Amazon Ecosystem: Ring, Gateway, Bee Wearable, Alexa+, and Fire TV"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Interactive Spatial Hotspot Pills Overlaid on Devices */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            zIndex: 10
          }}>
            <div style={{
              background: 'rgba(9, 11, 14, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#ffffff',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <Bell size={12} color="var(--ghost-blue)" />
              <span>RING 3D RADAR</span>
            </div>

            <div style={{
              background: 'rgba(9, 11, 14, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#ffffff',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <ShieldCheck size={12} color="var(--ghost-blue)" />
              <span style={{ fontWeight: 800, color: 'var(--ghost-blue)' }}>FIDES GATEWAY</span>
            </div>

            <div style={{
              background: 'rgba(9, 11, 14, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#ffffff',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <Watch size={12} color="var(--accent-purple)" />
              <span>BEE WEARABLE DOCK</span>
            </div>

            <div style={{
              background: 'rgba(9, 11, 14, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#ffffff',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <Radio size={12} color="var(--ghost-orange)" />
              <span>ALEXA+ TERMINAL</span>
            </div>

            <div style={{
              background: 'rgba(9, 11, 14, 0.82)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#ffffff',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <Tv size={12} color="var(--accent-amber)" />
              <span>FIRE TV 10-FOOT</span>
            </div>
          </div>
        </div>

        {/* Lower Banner Strip in Warm Retro Sand */}
        <div style={{
          background: '#ebebe6',
          borderTop: '1px solid #dcdcd5',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-ink)',
              fontFamily: 'var(--font-heading)',
              marginBottom: 10,
              lineHeight: 1.2
            }}>
              The personal AI commerce gateway
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: 620, lineHeight: 1.5, marginBottom: 14 }}>
              Connecting <strong>Fire TV</strong>, <strong>Alexa+</strong>, <strong>Ring</strong>, and <strong>Bee Wearable</strong> into an authoritative, air-gapped security boundary. Ambient voice agents interpret intent; Fides cryptographically authorizes checkout.
            </p>

            {/* Wireframe Blue Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="ghost-wire-pill">
                <span>⊘</span>
                <span>Zero Wallet Leak</span>
              </span>
              <span className="ghost-wire-pill">
                <span>✢</span>
                <span>Entirely On-Device</span>
              </span>
              <span className="ghost-wire-pill">
                <span>∞</span>
                <span>Continuous Context</span>
              </span>
              <span className="ghost-wire-pill">
                <span>⟲</span>
                <span>Ring 3D Radar</span>
              </span>
              <span className="ghost-wire-pill">
                <span>⚡</span>
                <span>Bee Wrist Haptics</span>
              </span>
            </div>
          </div>

          {/* Right Action Block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="badge-ghost-orange">
                Spec 2025-11-25 Ready
              </span>
              <span className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-ink)' }}>
                100% SAFE
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={onExplorePlayground}
                className="btn-ghost-primary"
                style={{ padding: '12px 26px', fontSize: '0.88rem' }}
              >
                <span>Open Alexa+ MCP Console</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => {
                  if (onRunScenario) onRunScenario(1);
                }}
                className="btn-ghost-outline"
                style={{ padding: '12px 22px', fontSize: '0.86rem' }}
              >
                <Play size={14} color="var(--nuvei-cyan)" />
                <span>Run Benchmark #1</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE CORE MANIFESTO: TRUST INFRASTRUCTURE FOR AGENTIC COMMERCE */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 8,
        padding: '32px 32px 28px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge-ghost-blue">
              Fides Core Thesis
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>|</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Amazon Developer Hackathon 2026 Integration
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="ghost-wire-pill" style={{ fontSize: '0.72rem' }}>
              Visa TAP Compatible
            </span>
            <span className="ghost-wire-pill" style={{ fontSize: '0.72rem' }}>
              Deterministic Policy Engine
            </span>
          </div>
        </div>

        {/* Core Belief Callout Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(12, 152, 212, 0.06) 0%, rgba(11, 14, 30, 0.03) 100%)',
          borderLeft: '4px solid var(--nuvei-cyan)',
          padding: '20px 24px',
          borderRadius: '0 8px 8px 0'
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--nuvei-cyan)',
            display: 'block',
            marginBottom: 6,
            fontFamily: 'var(--font-heading)'
          }}>
            Our Belief
          </span>
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            fontWeight: 700,
            lineHeight: 1.45,
            color: 'var(--text-ink)',
            fontFamily: 'var(--font-heading)',
            margin: 0
          }}>
            “Identity tells you who is asking. Authorization tells you what they are allowed to do. <span style={{ color: 'var(--nuvei-cyan)' }}>Fides answers the question: Should this specific order go through?</span> And keeps a full record of how and why the decision was made.”
          </p>
        </div>

        {/* 3 Pillars: Problem, Solution, Impact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 20
        }}>
          {/* Pillar 1: Problem */}
          <div style={{
            background: '#faf9f6',
            border: '1px solid #e7e4dc',
            borderRadius: 6,
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(220, 38, 38, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={15} color="var(--accent-rose)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                Problem
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
              AI agents can now place orders using real money. Companies have started showing how agents prove authorization, but one big question remains: <strong>when an order arrives at a merchant, should the merchant trust it?</strong>
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Verifying agent identity and permission does not make the transaction safe. Merchants still face <strong>injection attacks, replay attacks, unauthorized spending, and strange or suspicious AI agent behaviors</strong>, forcing them to decide whether to approve, review, or reject.
            </p>
          </div>

          {/* Pillar 2: Solution */}
          <div style={{
            background: '#faf9f6',
            border: '1px solid #e7e4dc',
            borderRadius: 6,
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(12, 152, 212, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={16} color="var(--nuvei-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                Solution
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
              <strong>Fides is a trust and authorization gateway built for AI-driven commerce.</strong> It sits between AI buyer agents and merchants, acting as a policy-driven gatekeeper. Fides evaluates every order in real-time: <strong>APPROVE, STEP UP (human approval), or DENY</strong> with deterministic reasons.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Uses a <strong>policy engine, NOT a language model</strong>, to make financial decisions. Every outcome is stored in a tamper-evident SHA-256 hash-chained audit ledger. <em>An AI model may suggest a purchase, but it cannot independently move money.</em>
            </p>
          </div>

          {/* Pillar 3: Impact */}
          <div style={{
            background: '#faf9f6',
            border: '1px solid #e7e4dc',
            borderRadius: 6,
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(5, 150, 105, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                Impact
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
              Fides serves <strong>e-commerce merchants, payment service providers (PSPs), issuers, AI-agent platforms, consumers, and fraud & risk teams</strong>.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Its purpose is to make agent-initiated payments <strong>safer, more transparent, and fully traceable</strong> — keeping the convenience of ambient shopping while eliminating wallet leakage and unauthorized rogue AI purchases.
            </p>
          </div>
        </div>
      </div>

      {/* 3. CONTINUOUS COMMERCE LOOP: END-TO-END AUTONOMOUS PURCHASING WALKTHROUGH */}
      <ContinuousCommerceLoop
        onOpenPlayground={onExplorePlayground}
        onRunScenario={onRunScenario}
      />

      {/* 3. DIORAMA LIVING ROOM SHOWCASE (Exact Match to Screenshot 2 & 3) */}
      <div style={{
        background: '#ebebe6',
        border: '1px solid var(--border-color)',
        borderRadius: 4,
        padding: '28px',
        position: 'relative'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 28,
          alignItems: 'center'
        }}>
          {/* Left: Floating Diorama Box with Blue Sky & Clouds */}
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            border: '2px solid #ffffff',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            position: 'relative'
          }}>
            <img
              src="/fides_diorama_room.jpg"
              alt="Connected Living Room Diorama"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Right: Copy & Context Telemetry */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-blue)', fontWeight: 700, letterSpacing: '0.08em' }}>
                  AMBIENT PRESENCE // FIRE TV & RING
                </span>
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                lineHeight: 1.2,
                color: 'var(--text-ink)',
                fontFamily: 'var(--font-heading)',
                marginBottom: 10
              }}>
                Intelligence stays yours on Fides.
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Everything you do with Fides is run with deterministic boundary controls on-device and in-home. No model ever touches your credit card, and your AI spending rules are owned entirely by you.
              </p>
            </div>

            {/* Context Pills (Matching Screenshot 3) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                padding: '10px 14px',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.8rem',
                color: 'var(--text-ink)'
              }}>
                <Bell size={15} color="var(--ghost-blue)" />
                <span>Ring 3D radar verifies buyer presence inside the home boundary.</span>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                padding: '10px 14px',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.8rem',
                color: 'var(--text-ink)'
              }}>
                <Radio size={15} color="var(--ghost-orange)" />
                <span>Alexa+ intent resolved via AWS Bedrock & NVIDIA Nemotron.</span>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                padding: '10px 14px',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.8rem',
                color: 'var(--text-ink)'
              }}>
                <Tv size={15} color="var(--accent-emerald)" />
                <span>10-foot interactive card pushes to Fire TV for human step-up review.</span>
              </div>
            </div>

            {/* Bottom Wireframe Tags */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="ghost-wire-pill">
                  <span>◫</span>
                  <span>LOCAL INTELLIGENCE</span>
                </span>
                <span className="ghost-wire-pill">
                  <span>📖</span>
                  <span>CONTINUOUS CONTEXT</span>
                </span>
                <span className="ghost-wire-pill">
                  <span>⁖</span>
                  <span>PROACTIVE AGENT</span>
                </span>
              </div>

              {/* Square Blue Button from bottom right of screenshots */}
              <button
                onClick={onExplorePlayground}
                style={{
                  width: 38,
                  height: 38,
                  background: 'var(--ghost-blue)',
                  border: 'none',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(22, 104, 232, 0.3)'
                }}
                title="Open Simulator"
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE DEVICE MAP & ECOSYSTEM GRID (Exact Match to Screenshot 4 & 5) */}
      <div style={{
        background: '#e8e8e2',
        border: '1px solid var(--border-color)',
        borderRadius: 4,
        padding: '32px 28px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Category Switcher Tabs */}
        <div style={{
          display: 'inline-flex',
          background: '#dcdcd5',
          padding: 3,
          borderRadius: 2,
          marginBottom: 32,
          gap: 2
        }}>
          {['DIGITAL', 'HOME', 'PROTOCOL'].map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isSelected ? 'var(--ghost-blue)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '5px 16px',
                  borderRadius: 2,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {isSelected && '■ '}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Central Device Connection Nodes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
          alignItems: 'center',
          maxWidth: 960,
          margin: '0 auto 28px'
        }}>
          {/* Node 1: Ring Sensor */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-hairline)',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ height: 80, overflow: 'hidden', position: 'relative' }}>
              <img src="/ring_doorbell_radar.jpg" alt="Ring Pro 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.7)', borderRadius: 2, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Bell size={11} color="var(--ghost-blue)" />
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#fff' }}>RADAR</span>
              </div>
            </div>
            <div style={{ padding: '10px 8px', textAlign: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                RING PRO 2
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>3D Radar Presence</span>
            </div>
          </div>

          {/* Node 2: Alexa+ Voice */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-hairline)',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ height: 80, overflow: 'hidden', position: 'relative' }}>
              <img src="/alexa_plus_device.jpg" alt="Alexa+ Terminal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.7)', borderRadius: 2, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Radio size={11} color="var(--ghost-orange)" />
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#fff' }}>MCP</span>
              </div>
            </div>
            <div style={{ padding: '10px 8px', textAlign: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                ALEXA+ (MCP)
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Spec 2025-11-25</span>
            </div>
          </div>

          {/* Center Monolith Node: Fides Sovereign Core */}
          <div style={{
            background: '#111317',
            border: '2px solid var(--ghost-blue)',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(22, 104, 232, 0.2)'
          }}>
            <div style={{ height: 80, overflow: 'hidden', position: 'relative' }}>
              <img src="/fides_core_monolith.jpg" alt="Fides Sovereign Core" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 6, left: 6, background: 'var(--ghost-blue)', borderRadius: 2, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={11} color="#fff" />
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#fff', fontWeight: 800 }}>CORE</span>
              </div>
            </div>
            <div style={{ padding: '10px 8px', textAlign: 'center', background: '#111317' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--ghost-blue)', display: 'block' }}>
                FIDES CORE
              </span>
              <span style={{ fontSize: '0.62rem', color: '#888e98' }}>Air-Gapped Gateway</span>
            </div>
          </div>

          {/* Node 4: Fire TV */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-hairline)',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ height: 80, overflow: 'hidden', position: 'relative' }}>
              <img src="/firetv_living_room.jpg" alt="Fire TV Vega OS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.7)', borderRadius: 2, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Tv size={11} color="var(--accent-amber)" />
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#fff' }}>10-FOOT</span>
              </div>
            </div>
            <div style={{ padding: '10px 8px', textAlign: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                FIRE TV (VEGA)
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Living Room Display</span>
            </div>
          </div>

          {/* Node 5: Bee Wearable AI */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-hairline)',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ height: 80, overflow: 'hidden', position: 'relative' }}>
              <img src="/bee_wearable_wrist.jpg" alt="Bee Wearable AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.7)', borderRadius: 2, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Watch size={11} color="var(--accent-purple)" />
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#fff' }}>HAPTIC</span>
              </div>
            </div>
            <div style={{ padding: '10px 8px', textAlign: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                BEE WEARABLE
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>On-Wrist Haptic HUD</span>
            </div>
          </div>
        </div>

        <p style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--text-ink)',
          fontFamily: 'var(--font-heading)',
          margin: 0
        }}>
          Connect to the devices in the world around you.
        </p>
      </div>

      {/* 4. SECURITY MATRIX CONTRAST (Light Retro Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 4,
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <AlertTriangle size={18} color="var(--accent-rose)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-ink)' }}>
              Direct Agent Vulnerability
            </h4>
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
            <li>LLM holds raw financial authority and payment API keys.</li>
            <li>Adversarial prompts convince the model that prices are ₹0 or approved.</li>
            <li>Network replays duplicate orders without nonces.</li>
            <li>Zero physical presence proof: remote voice spoofing drains limits.</li>
          </ul>
        </div>

        <div style={{
          background: '#ffffff',
          border: '1px solid var(--ghost-blue)',
          borderRadius: 4,
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <CheckCircle2 size={18} color="var(--ghost-blue)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-ink)' }}>
              Fides Air-Gapped Trust
            </h4>
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
            <li>LLM only outputs candidate SKU strings — zero financial authority.</li>
            <li>Server verifies official catalogue prices and signed mandates.</li>
            <li>Ring 3D radar proof required before high-value checkouts.</li>
            <li>Every decision is cryptographically signed and hash-chained with SHA-256.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
