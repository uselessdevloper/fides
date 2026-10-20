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
      {/* 1. GHOST CORE HERO MONOLITH STAGE (Exact Match to Screenshot 1) */}
      <div style={{
        background: '#090b0e',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        border: '1px solid #d4d4cb'
      }}>
        {/* Massive Spaced Display Letters Behind Monolith */}
        <div style={{
          position: 'absolute',
          top: 32,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0 40px',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.85)',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <span>F</span>
          <span>I</span>
          <span>D</span>
          <span>E</span>
          <span>S</span>
        </div>

        {/* Hero Hardware Monolith Visual */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 40,
          paddingBottom: 20
        }}>
          <div style={{
            maxWidth: 620,
            width: '100%',
            position: 'relative'
          }}>
            <img
              src="/fides_core_monolith.jpg"
              alt="Fides Core Gateway Monolith"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 4,
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
              }}
            />
          </div>
        </div>

        {/* Lower Banner Strip in Warm Retro Sand (Like Screenshot 1) */}
        <div style={{
          background: '#ebebe6',
          borderTop: '1px solid #dcdcd5',
          padding: '24px 28px',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-ink)',
              fontFamily: 'var(--font-heading)',
              marginBottom: 12
            }}>
              The personal AI commerce gateway
            </h1>

            {/* Wireframe Blue Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="ghost-wire-pill">
                <span>⊘</span>
                <span>ZERO WALLET LEAK</span>
              </span>
              <span className="ghost-wire-pill">
                <span>✢</span>
                <span>ENTIRELY ON-DEVICE</span>
              </span>
              <span className="ghost-wire-pill">
                <span>∞</span>
                <span>CONTINUOUS CONTEXT</span>
              </span>
              <span className="ghost-wire-pill">
                <span>⟲</span>
                <span>RING 3D RADAR</span>
              </span>
            </div>
          </div>

          {/* Right Action Block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="badge-ghost-orange">
                Spec 2025-11-25 Ready
              </span>
              <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-ink)' }}>
                100% SAFE
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={onExplorePlayground}
                className="btn-ghost-primary"
                style={{ padding: '12px 24px', fontSize: '0.85rem' }}
              >
                <span>OPEN ALEXA+ MCP CONSOLE</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => {
                  if (onRunScenario) onRunScenario(1);
                }}
                className="btn-ghost-outline"
                style={{ padding: '12px 20px', fontSize: '0.8rem' }}
              >
                <Play size={14} color="var(--ghost-blue)" />
                <span>RUN BENCHMARK #1</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTINUOUS COMMERCE LOOP: END-TO-END AUTONOMOUS PURCHASING WALKTHROUGH */}
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
