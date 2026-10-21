import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Tv,
  Bell,
  Watch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Lock
} from 'lucide-react';

const SCENES = [
  {
    id: 'ambient_alexa',
    title: 'Ambient Living Room & Alexa+ Intent',
    subtitle: 'Streamable HTTP MCP Spec (2025-11-25) with Bedrock Intent Extraction',
    image: '/fides_vector_hero.jpg',
    tag: 'Alexa+ Voice Protocol',
    tabLabel: 'Living Room & Alexa+',
    tagColor: 'var(--nuvei-cyan)',
    hotspots: [
      { id: 'speaker', label: 'Alexa+ MCP Terminal', x: '51%', y: '65%', icon: Radio, desc: 'Self-hosted streamable MCP server tools at /mcp' },
      { id: 'tv', label: 'Fire TV Step-Up Card', x: '43%', y: '60%', icon: Tv, desc: '10-foot interactive card pushes on policy trigger' },
      { id: 'buyer', label: 'In-Room Buyer Presence', x: '26%', y: '64%', icon: ShieldCheck, desc: 'Physical presence checked before payment release' }
    ],
    soundWaves: { x: 520, y: 390 },
    radarWaves: null
  },
  {
    id: 'ring_radar',
    title: 'Front Porch 3D Radar Boundary',
    subtitle: 'Ring Doorbell Pro 2 Aerial Radar Waves & Z-Wave RSSI Verification',
    image: '/fides_vector_radar.jpg',
    tag: 'Ring 3D Radar Perimeter',
    tabLabel: 'Front Door & Radar',
    tagColor: 'var(--accent-emerald)',
    hotspots: [
      { id: 'radar', label: 'Ring 3D Radar Node', x: '57%', y: '58%', icon: Bell, desc: '3D Radar scans entry zone for in-home buyer motion' },
      { id: 'porch', label: 'Delivery Threshold', x: '39%', y: '63%', icon: ShieldCheck, desc: 'Geofenced home perimeter verified' }
    ],
    soundWaves: null,
    radarWaves: { x: 575, y: 350 }
  },
  {
    id: 'firetv_wearable',
    title: 'Living Room 10-Foot & Bee Wearable',
    subtitle: 'Fire TV Vega OS Card Push with On-Wrist LRA Haptic Confirmation',
    image: '/fides_vector_livingroom.jpg',
    tag: 'Fire TV & Wearable Dual-Screen',
    tabLabel: 'TV & Wristband',
    tagColor: 'var(--ghost-orange)',
    hotspots: [
      { id: 'wrist', label: 'Bee Wearable Haptic HUD', x: '25%', y: '54%', icon: Watch, desc: 'LRA double-pulse alerts for approval tap' },
      { id: 'firetv', label: 'Fire TV 10-Foot Display', x: '78%', y: '38%', icon: Tv, desc: 'Visual card rendered over TV content' }
    ],
    soundWaves: { x: 630, y: 500 },
    radarWaves: null
  },
  {
    id: 'workers_sovereign',
    title: 'Autonomous Commerce Infrastructure',
    subtitle: 'Air-Gapped Trust Engine Sitting Between Buyer Agents & Merchant Gateways',
    image: '/fides_vector_workers.png',
    tag: 'Sovereign Settlement Engine',
    tabLabel: 'Settlement Engine',
    tagColor: 'var(--nuvei-midnight)',
    hotspots: [
      { id: 'hub', label: 'Fides Ambient Hub', x: '51%', y: '65%', icon: ShieldCheck, desc: 'Deterministic policy evaluation without LLM hallucination' },
      { id: 'crane', label: 'Autonomous Fulfillment', x: '82%', y: '25%', icon: Zap, desc: 'Cryptographically signed orders dispatched to merchants' }
    ],
    soundWaves: { x: 515, y: 420 },
    radarWaves: null
  }
];

// 12 Ledger status blocks matching the bottom row of the user's illustration
const LEDGER_BLOCKS = [
  { id: 1, status: 'G', label: 'APPROVE', color: '#2d7a4f', text: '₹150 Organic Milk (Zepto)', sub: 'Block #108 • Hash: 8f3c...a19d' },
  { id: 2, status: 'G', label: 'APPROVE', color: '#2d7a4f', text: '₹340 Fast USB-C Cable', sub: 'Block #109 • Hash: c7e1...42b0' },
  { id: 3, status: 'O', label: 'STEP_UP', color: '#d97706', text: '₹950 Coffee Beans (Over Cap)', sub: 'Block #110 • Fire TV Escalation' },
  { id: 4, status: 'R', label: 'DENY', color: '#991b1b', isStriped: true, text: '₹0 System Override (Injection)', sub: 'Block #111 • Adversarial Blocked' },
  { id: 5, status: 'R', label: 'DENY', color: '#991b1b', isStriped: true, text: 'Nonce Replay Attack (Duplicate)', sub: 'Block #112 • Idempotency Locked' },
  { id: 6, status: 'R', label: 'DENY', color: '#991b1b', isStriped: true, text: '₹4,500 High-Velocity Burst', sub: 'Block #113 • Velocity Cap Exceeded' },
  { id: 7, status: 'R', label: 'DENY', color: '#991b1b', isStriped: true, text: 'Remote Voice Spoof (No Radar)', sub: 'Block #114 • Ring Radar Absent' },
  { id: 8, status: 'R', label: 'DENY', color: '#991b1b', isStriped: true, text: 'Tampered Merchant ID', sub: 'Block #115 • Ed25519 Bad Signature' },
  { id: 9, status: 'R', label: 'DENY', color: '#991b1b', isStriped: true, text: 'Catalogue Price Manipulation', sub: 'Block #116 • Server DB Enforced' },
  { id: 10, status: 'O', label: 'STEP_UP', color: '#d97706', text: '₹1,200 Dinner Delivery', sub: 'Block #117 • Bee Haptic Confirmed' },
  { id: 11, status: 'G', label: 'APPROVE', color: '#2d7a4f', text: '₹220 Eco Cleaning Spray', sub: 'Block #118 • Hash: a981...00fe' },
  { id: 12, status: 'G', label: 'APPROVE', color: '#2d7a4f', text: '₹90 Gel Pens Pack', sub: 'Block #119 • Hash: f1b2...77cc' }
];

export default function AnimatedEditorialHero({ onExploreDevices, onOpenSimulator }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  const currentScene = SCENES[activeSceneIndex];

  // Auto-cycle scenes every 7 seconds if not paused
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveSceneIndex(prev => (prev + 1) % SCENES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
      position: 'relative'
    }}>
      {/* Top Bar: Scene Switcher Pills */}
      <div style={{
        background: '#0e1117',
        color: '#ffffff',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        borderBottom: '1px solid #1e2633'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }} />
          <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.02em' }}>
            Fides Trust Infrastructure
          </span>
          <span style={{ color: '#4a5568' }}>•</span>
          <span style={{ fontSize: '0.74rem', color: 'var(--nuvei-cyan)', fontWeight: 600 }}>
            {currentScene.tag}
          </span>
        </div>

        {/* Architecture & Device Views */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveSceneIndex(idx);
                setIsAutoCycling(false);
              }}
              style={{
                background: activeSceneIndex === idx ? 'var(--nuvei-cyan)' : 'rgba(255, 255, 255, 0.08)',
                color: activeSceneIndex === idx ? '#ffffff' : '#cbd5e1',
                border: activeSceneIndex === idx ? '1px solid var(--nuvei-cyan)' : '1px solid rgba(255, 255, 255, 0.12)',
                padding: '6px 14px',
                borderRadius: 9999,
                fontSize: '0.72rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              {scene.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Illustration Canvas with Animated Overlays */}
      <div style={{
        position: 'relative',
        background: '#f8eee2',
        width: '100%',
        aspectRatio: '16/9',
        maxHeight: 520,
        overflow: 'hidden'
      }}>
        {/* Background Vector Artwork */}
        <img
          src={currentScene.image}
          alt={currentScene.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* SVG Animation Overlay Layer for Sound Waves, Radar Arcs, and Glows */}
        <svg
          viewBox="0 0 1000 562"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 4
          }}
        >
          <defs>
            {/* Pattern for Diagonal Stripes on Deny Blocks */}
            <pattern id="diagStripes" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#7f1d1d" strokeWidth="3" />
            </pattern>

            {/* Glowing filter */}
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Ambient Sun Halo */}
          <circle
            cx="780"
            cy="140"
            r="105"
            fill="none"
            stroke="rgba(240, 139, 70, 0.4)"
            strokeWidth="3"
            className="anim-sun"
          />

          {/* Animated Sound Ripple Waves if Scene has Audio Source */}
          {currentScene.soundWaves && (
            <g transform={`translate(${currentScene.soundWaves.x}, ${currentScene.soundWaves.y})`}>
              <path
                d="M 10,-24 A 28,28 0 0,1 10,24"
                fill="none"
                stroke="#e05c2a"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="anim-sound-wave"
              />
              <path
                d="M 22,-38 A 46,46 0 0,1 22,38"
                fill="none"
                stroke="#e05c2a"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="anim-sound-wave-delay"
              />
              <path
                d="M 36,-52 A 64,64 0 0,1 36,52"
                fill="none"
                stroke="rgba(224, 92, 42, 0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                className="anim-sound-wave"
                style={{ animationDelay: '1.2s' }}
              />
            </g>
          )}

          {/* Animated 3D Radar Wave Rings if Scene has Radar Source */}
          {currentScene.radarWaves && (
            <g transform={`translate(${currentScene.radarWaves.x}, ${currentScene.radarWaves.y})`}>
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                className="anim-radar-wave-1"
              />
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                className="anim-radar-wave-2"
              />
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                className="anim-radar-wave-3"
              />
            </g>
          )}
        </svg>

        {/* Spatial Hotspot Trigger Badges Overlaid on Scene */}
        {currentScene.hotspots.map(spot => {
          const Icon = spot.icon;
          const isHovered = hoveredHotspot?.id === spot.id;
          return (
            <div
              key={spot.id}
              onMouseEnter={() => setHoveredHotspot(spot)}
              onMouseLeave={() => setHoveredHotspot(null)}
              style={{
                position: 'absolute',
                top: spot.y,
                left: spot.x,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer'
              }}
            >
              <div style={{
                background: isHovered ? 'var(--nuvei-cyan)' : 'rgba(11, 14, 30, 0.88)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                border: isHovered ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 9999,
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                fontSize: '0.72rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                boxShadow: isHovered ? '0 6px 20px rgba(12, 152, 212, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.18s ease'
              }}>
                <Icon size={13} color={isHovered ? '#ffffff' : 'var(--nuvei-cyan)'} />
                <span>{spot.label}</span>
              </div>

              {/* Tooltip on Hover */}
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  bottom: '125%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#0b0e1e',
                  color: '#ffffff',
                  border: '1px solid var(--nuvei-cyan)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  fontSize: '0.74rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  zIndex: 20
                }}>
                  {spot.desc}
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Narrative Badge in Top Left */}
        <div style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: '12px 18px',
          maxWidth: 340,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          zIndex: 8
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }} />
            <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-ink)' }}>
              LIVE TRANSACTION LEDGER
            </span>
          </div>
          <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {currentScene.title}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
            {currentScene.subtitle}
          </p>
        </div>
      </div>

      {/* Signature Animated Timeline / Status Block Strip Across the Bottom */}
      <div style={{
        background: '#e9ddcd',
        borderTop: '2px solid #dfcfbc',
        padding: '14px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#4a3b32', letterSpacing: '0.02em' }}>
              SHA-256 Audit Trail
            </span>
            <span style={{ fontSize: '0.72rem', color: '#6b584b' }}>
              • Hover over each block to inspect policy authorization & hash status:
            </span>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#2d7a4f' }} />
              <span className="font-mono" style={{ fontSize: '0.64rem', color: '#4a3b32', fontWeight: 700 }}>APPROVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#d97706' }} />
              <span className="font-mono" style={{ fontSize: '0.64rem', color: '#4a3b32', fontWeight: 700 }}>STEP_UP</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#991b1b', backgroundImage: 'repeating-linear-gradient(45deg, #7f1d1d, #7f1d1d 3px, #991b1b 3px, #991b1b 6px)' }} />
              <span className="font-mono" style={{ fontSize: '0.64rem', color: '#4a3b32', fontWeight: 700 }}>DENY</span>
            </div>
          </div>
        </div>

        {/* Interactive Block Sequence matching the user's illustration */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 8,
          alignItems: 'center'
        }}>
          {LEDGER_BLOCKS.map(block => {
            const isHovered = hoveredBlock?.id === block.id;
            return (
              <div
                key={block.id}
                onMouseEnter={() => setHoveredBlock(block)}
                onMouseLeave={() => setHoveredBlock(null)}
                style={{
                  height: 38,
                  borderRadius: 6,
                  background: block.color,
                  backgroundImage: block.isStriped
                    ? 'repeating-linear-gradient(45deg, #7f1d1d, #7f1d1d 4px, #991b1b 4px, #991b1b 8px)'
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? `0 6px 16px ${block.color}88`
                    : '0 2px 6px rgba(0, 0, 0, 0.12)',
                  transform: isHovered ? 'translateY(-3px) scale(1.04)' : 'none',
                  transition: 'all 0.16s ease',
                  border: isHovered ? '2px solid #ffffff' : '1px solid rgba(0, 0, 0, 0.15)'
                }}
                title={block.text}
              >
                {block.status}
              </div>
            );
          })}
        </div>

        {/* Tooltip Banner when Hovering a Block */}
        {hoveredBlock ? (
          <div style={{
            background: '#ffffff',
            borderRadius: 6,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: `1.5px solid ${hoveredBlock.color}`,
            marginTop: 4
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="font-mono" style={{
                background: hoveredBlock.color,
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 4,
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                BLOCK #{hoveredBlock.id + 107} [{hoveredBlock.label}]
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                {hoveredBlock.text}
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {hoveredBlock.sub}
            </span>
          </div>
        ) : (
          <div style={{ fontSize: '0.72rem', color: '#6b584b', fontStyle: 'italic', textAlign: 'center', paddingTop: 2 }}>
            Deterministic authorization: green for approved purchases, striped red for blocked adversarial attacks, amber for Fire TV step-ups.
          </div>
        )}
      </div>
    </div>
  );
}
