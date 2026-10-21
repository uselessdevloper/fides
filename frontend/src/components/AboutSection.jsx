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
import AnimatedEditorialHero from './illustrations/AnimatedEditorialHero';

export default function AboutSection({ onExplorePlayground, onRunScenario }) {
  const [overviewSubTab, setOverviewSubTab] = useState('gateway'); // 'gateway', 'loop', 'thesis', 'ecosystem'
  const [activeCategory, setActiveCategory] = useState('HOME');

  const subTabs = [
    { id: 'gateway', label: '1. Gateway & Devices', icon: Radio },
    { id: 'loop', label: '2. Continuous Commerce Loop', icon: Play },
    { id: 'thesis', label: '3. Core Thesis & Trust', icon: ShieldCheck },
    { id: 'ecosystem', label: '4. Connected Ecosystem', icon: Layers }
  ];

  return (
    <section id="about" style={{
      paddingTop: '6px',
      paddingBottom: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      {/* Overview Sub-Tabs Header Navigation for Compact Single-Screen Fitting */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        background: '#ffffff',
        padding: '7px 16px',
        borderRadius: 8,
        border: '1px solid var(--border-color)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-ink)', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: 4 }}>
            OVERVIEW:
          </span>
          {subTabs.map((tab) => {
            const isActive = overviewSubTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setOverviewSubTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: isActive ? 'var(--nuvei-cyan)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--nuvei-cyan)' : '1px solid transparent',
                  padding: '5px 14px',
                  borderRadius: 9999,
                  fontSize: '0.76rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="font-mono" style={{ fontSize: '0.66rem', color: 'var(--ghost-orange)', fontWeight: 700, letterSpacing: '0.04em' }}>
            ● SINGLE-PAGE COMPACT VIEW
          </span>
        </div>
      </div>

      {/* SUB-TAB 1: GATEWAY & AMBIENT DEVICES */}
      {overviewSubTab === 'gateway' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Animated Hero Carousel Canvas */}
          <AnimatedEditorialHero
            onExploreDevices={onExplorePlayground}
            onOpenSimulator={onExplorePlayground}
          />

          {/* Lower Banner Strip in Warm Retro Sand */}
          <div style={{
            background: '#ebebe6',
            borderTop: '1px solid #dcdcd5',
            borderRadius: '0 0 8px 8px',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            {/* Top Row: Title, Description, and Badges */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ maxWidth: 740 }}>
                <h1 style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: 'var(--text-ink)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: 6,
                  lineHeight: 1.15
                }}>
                  The personal AI commerce gateway
                </h1>
                <p style={{
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.45,
                  margin: 0
                }}>
                  Connecting <strong style={{ color: 'var(--text-ink)' }}>Fire TV</strong>, <strong style={{ color: 'var(--text-ink)' }}>Alexa+</strong>, <strong style={{ color: 'var(--text-ink)' }}>Ring</strong>, and <strong style={{ color: 'var(--text-ink)' }}>Bee Wearable</strong> into an authoritative, air-gapped security boundary. Ambient voice agents interpret intent; Fides cryptographically authorizes checkout.
                </p>
              </div>

              {/* Verification & Spec Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#ffffff',
                border: '1px solid #d5d0c5',
                borderRadius: 9999,
                padding: '4px 12px 4px 6px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
              }}>
                <span style={{
                  background: 'rgba(5, 150, 105, 0.1)',
                  color: 'var(--accent-emerald)',
                  border: '1px solid rgba(5, 150, 105, 0.3)',
                  padding: '2px 8px',
                  borderRadius: 9999,
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
                  100% AIR-GAPPED SAFE
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--text-ink)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Spec 2025-11-25 Ready
                </span>
              </div>
            </div>

            {/* Middle Row: Capability Feature Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { icon: '⊘', label: 'Zero Wallet Leak', color: 'var(--nuvei-cyan)' },
                { icon: '✢', label: 'Entirely On-Device', color: 'var(--accent-emerald)' },
                { icon: '∞', label: 'Continuous Context', color: 'var(--accent-purple)' },
                { icon: '⟲', label: 'Ring 3D Radar', color: 'var(--nuvei-cyan)' },
                { icon: '⚡', label: 'Bee Wrist Haptics', color: 'var(--ghost-orange)' }
              ].map((pill, pidx) => (
                <span key={pidx} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: '#ffffff',
                  border: '1px solid #d5d0c5',
                  color: 'var(--text-ink)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  padding: '4px 11px',
                  borderRadius: 9999,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}>
                  <span style={{ color: pill.color, fontWeight: 700 }}>{pill.icon}</span>
                  <span>{pill.label}</span>
                </span>
              ))}

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(12, 152, 212, 0.08)',
                border: '1px solid rgba(12, 152, 212, 0.35)',
                color: 'var(--nuvei-cyan)',
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                padding: '4px 11px',
                borderRadius: 9999
              }}>
                <span>☁</span>
                <span>10/10 AWS Technologies</span>
              </span>
            </div>

            {/* Bottom Row: Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              paddingTop: 2
            }}>
              <button
                onClick={onExplorePlayground}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  background: 'var(--nuvei-cyan)',
                  color: '#ffffff',
                  border: 'none',
                  height: 40,
                  padding: '0 20px',
                  borderRadius: 9999,
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(12, 152, 212, 0.35)',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(12, 152, 212, 0.45)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(12, 152, 212, 0.35)'; }}
              >
                <span>Open Alexa+ MCP Console</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => {
                  if (onRunScenario) onRunScenario(1);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  background: '#ffffff',
                  color: 'var(--text-ink)',
                  border: '1.5px solid #d5d0c5',
                  height: 40,
                  padding: '0 18px',
                  borderRadius: 9999,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'var(--text-ink)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#d5d0c5'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)'; }}
              >
                <Play size={13} color="var(--nuvei-cyan)" fill="var(--nuvei-cyan)" />
                <span>Run Benchmark #1</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CONTINUOUS COMMERCE LOOP */}
      {overviewSubTab === 'loop' && (
        <ContinuousCommerceLoop
          onOpenPlayground={onExplorePlayground}
          onRunScenario={onRunScenario}
        />
      )}

      {/* SUB-TAB 3: CORE THESIS & TRUST */}
      {overviewSubTab === 'thesis' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Manifesto Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: '22px 26px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            {/* Top Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge-ghost-blue" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                  Fides Core Thesis
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>|</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Ambient AI & Connected Devices Ecosystem Integration
                </span>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className="ghost-wire-pill" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                  Visa TAP Compatible
                </span>
                <span className="ghost-wire-pill" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                  Deterministic Policy Engine
                </span>
              </div>
            </div>

            {/* Core Belief Callout Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(12, 152, 212, 0.06) 0%, rgba(11, 14, 30, 0.03) 100%)',
              borderLeft: '4px solid var(--nuvei-cyan)',
              padding: '14px 18px',
              borderRadius: '0 8px 8px 0'
            }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--nuvei-cyan)',
                display: 'block',
                marginBottom: 4,
                fontFamily: 'var(--font-heading)'
              }}>
                Our Belief
              </span>
              <p style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.12rem)',
                fontWeight: 700,
                lineHeight: 1.4,
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 14
            }}>
              {/* Pillar 1: Problem */}
              <div style={{
                background: '#faf9f6',
                border: '1px solid #e7e4dc',
                borderRadius: 6,
                padding: '16px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(220, 38, 38, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AlertTriangle size={13} color="var(--accent-rose)" />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    Problem
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                  AI agents can now make purchases with real money. But when an order arrives at a merchant, <strong>how does the merchant know it's safe?</strong>
                </p>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                  Agent identity and permissions alone aren't enough: injection attacks, replay attacks, and rogue AI behavior create severe financial risk.
                </p>
              </div>

              {/* Pillar 2: Solution */}
              <div style={{
                background: '#faf9f6',
                border: '1px solid #e7e4dc',
                borderRadius: 6,
                padding: '16px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(12, 152, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={13} color="var(--nuvei-cyan)" />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    Solution
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                  Fides is a trust and authorization gateway for AI commerce sitting between buyer agents and merchants.
                </p>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                  Uses a deterministic <strong>policy engine, NOT an LLM</strong>, to make financial decisions. Every outcome is recorded in a SHA-256 hash-chained ledger.
                </p>
              </div>

              {/* Pillar 3: Impact */}
              <div style={{
                background: '#faf9f6',
                border: '1px solid #e7e4dc',
                borderRadius: 6,
                padding: '16px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(5, 150, 105, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle2 size={13} color="var(--accent-emerald)" />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    Impact
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                  Fides serves e-commerce merchants, PSPs, issuers, and AI-agent platforms.
                </p>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                  Makes agent-initiated payments <strong>safer, more transparent, and fully traceable</strong> without wallet leaks.
                </p>
              </div>
            </div>
          </div>

          {/* Security Matrix Contrast */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12
          }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '18px 20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <AlertTriangle size={16} color="var(--accent-rose)" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0 }}>
                  Direct Agent Vulnerability
                </h4>
              </div>
              <ul style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5, paddingLeft: 16, margin: 0 }}>
                <li>LLM holds raw financial authority and payment API keys.</li>
                <li>Adversarial prompts convince the model that prices are ₹0 or approved.</li>
                <li>Network replays duplicate orders without nonces.</li>
                <li>Zero physical presence proof: remote voice spoofing drains limits.</li>
              </ul>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid var(--nuvei-cyan)',
              borderRadius: 8,
              padding: '18px 20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <CheckCircle2 size={16} color="var(--nuvei-cyan)" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-ink)', margin: 0 }}>
                  Fides Air-Gapped Trust
                </h4>
              </div>
              <ul style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5, paddingLeft: 16, margin: 0 }}>
                <li>LLM only outputs candidate SKU strings — zero financial authority.</li>
                <li>Server verifies official catalogue prices and signed mandates.</li>
                <li>Ring 3D radar proof required before high-value checkouts.</li>
                <li>Every decision is cryptographically signed and hash-chained with SHA-256.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CONNECTED ECOSYSTEM & LIVING ROOM */}
      {overviewSubTab === 'ecosystem' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Interactive Device Map & Ecosystem Grid */}
          <div style={{
            background: '#e8e8e2',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: '20px 24px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Category Switcher Tabs */}
            <div style={{
              display: 'inline-flex',
              background: '#dcdcd5',
              padding: 3,
              borderRadius: 9999,
              marginBottom: 16,
              gap: 4
            }}>
              {['DIGITAL', 'HOME', 'PROTOCOL'].map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: isSelected ? 'var(--nuvei-navy)' : 'transparent',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      border: 'none',
                      padding: '5px 16px',
                      borderRadius: 9999,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Central Device Connection Nodes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 12,
              alignItems: 'center',
              maxWidth: 960,
              margin: '0 auto 16px'
            }}>
              {/* Node 1: Ring Sensor */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ height: 68, overflow: 'hidden', position: 'relative' }}>
                  <img src="/fides_vector_radar.jpg" alt="Ring Pro 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,0.7)', borderRadius: 9999, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Bell size={10} color="var(--ghost-blue)" />
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: '#fff' }}>RADAR</span>
                  </div>
                </div>
                <div style={{ padding: '8px 6px', textAlign: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                    RING PRO 2
                  </span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>3D Radar Presence</span>
                </div>
              </div>

              {/* Node 2: Alexa+ Voice */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ height: 68, overflow: 'hidden', position: 'relative' }}>
                  <img src="/fides_vector_hero.jpg" alt="Alexa+ Terminal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,0.7)', borderRadius: 9999, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Radio size={10} color="var(--ghost-orange)" />
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: '#fff' }}>MCP</span>
                  </div>
                </div>
                <div style={{ padding: '8px 6px', textAlign: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                    ALEXA+ (MCP)
                  </span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>Spec 2025-11-25</span>
                </div>
              </div>

              {/* Center Monolith Node: Fides Sovereign Core */}
              <div style={{
                background: '#111317',
                border: '2px solid var(--nuvei-cyan)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(12, 152, 212, 0.22)'
              }}>
                <div style={{ height: 68, overflow: 'hidden', position: 'relative' }}>
                  <img src="/fides_vector_workers.png" alt="Fides Sovereign Core" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 5, left: 5, background: 'var(--nuvei-cyan)', borderRadius: 9999, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <ShieldCheck size={10} color="#fff" />
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: '#fff', fontWeight: 800 }}>CORE</span>
                  </div>
                </div>
                <div style={{ padding: '8px 6px', textAlign: 'center', background: '#111317' }}>
                  <span className="font-mono" style={{ fontSize: '0.66rem', fontWeight: 800, color: 'var(--nuvei-cyan)', display: 'block' }}>
                    FIDES CORE
                  </span>
                  <span style={{ fontSize: '0.58rem', color: '#888e98' }}>Air-Gapped Gateway</span>
                </div>
              </div>

              {/* Node 4: Fire TV */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ height: 68, overflow: 'hidden', position: 'relative' }}>
                  <img src="/fides_vector_livingroom.jpg" alt="Fire TV Vega OS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,0.7)', borderRadius: 9999, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Tv size={10} color="var(--accent-amber)" />
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: '#fff' }}>10-FOOT</span>
                  </div>
                </div>
                <div style={{ padding: '8px 6px', textAlign: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                    FIRE TV (VEGA)
                  </span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>Living Room Display</span>
                </div>
              </div>

              {/* Node 5: Bee Wearable AI */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ height: 68, overflow: 'hidden', position: 'relative' }}>
                  <img src="/fides_vector_livingroom.jpg" alt="Bee Wearable AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,0.7)', borderRadius: 9999, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Watch size={10} color="var(--accent-purple)" />
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: '#fff' }}>HAPTIC</span>
                  </div>
                </div>
                <div style={{ padding: '8px 6px', textAlign: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '0.64rem', fontWeight: 800, color: 'var(--text-ink)', display: 'block' }}>
                    BEE WEARABLE
                  </span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>On-Wrist Haptic HUD</span>
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.86rem',
              fontWeight: 600,
              color: 'var(--text-ink)',
              fontFamily: 'var(--font-heading)',
              margin: 0
            }}>
              Connect to the ambient devices in the physical world around you.
            </p>
          </div>

          {/* Diorama Living Room Showcase */}
          <div style={{
            background: '#ebebe6',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: '20px 24px',
            position: 'relative'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              alignItems: 'center'
            }}>
              {/* Left: Floating Diorama Box with Vector Living Room Illustration */}
              <div style={{
                borderRadius: 8,
                overflow: 'hidden',
                border: '2px solid #ffffff',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                maxHeight: 240
              }}>
                <img
                  src="/fides_vector_livingroom.jpg"
                  alt="Connected Living Room Vector Illustration"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Right: Copy & Context Telemetry */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ghost-blue)', fontWeight: 700, letterSpacing: '0.04em' }}>
                      Ambient Presence • Fire TV & Ring Doorbell
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: 'var(--text-ink)',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: 6
                  }}>
                    Intelligence stays yours on Fides.
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                    Deterministic boundary controls run in-home and on-device. No model touches your credit card, and your AI spending rules are owned entirely by you.
                  </p>
                </div>

                {/* Context Pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    padding: '8px 12px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: '0.78rem',
                    color: 'var(--text-ink)'
                  }}>
                    <Bell size={14} color="var(--ghost-blue)" />
                    <span>Ring 3D radar verifies buyer presence inside the home boundary.</span>
                  </div>

                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    padding: '8px 12px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: '0.78rem',
                    color: 'var(--text-ink)'
                  }}>
                    <Radio size={14} color="var(--ghost-orange)" />
                    <span>Alexa+ intent resolved via AWS Bedrock & NVIDIA Nemotron.</span>
                  </div>

                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    padding: '8px 12px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: '0.78rem',
                    color: 'var(--text-ink)'
                  }}>
                    <Tv size={14} color="var(--accent-emerald)" />
                    <span>10-foot interactive card pushes to Fire TV for human step-up review.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
