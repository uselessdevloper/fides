import React, { useState } from 'react';
import { Play, Zap, ShieldAlert, Clock, RefreshCw, AlertOctagon, Flame } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    title: "1. Nominal Purchase",
    tag: "APPROVE",
    tagClass: "badge-approve",
    icon: Zap,
    desc: "Valid mandate, approved merchant, < ₹700"
  },
  {
    id: 2,
    title: "2. Limit Exceeded",
    tag: "DENY",
    tagClass: "badge-deny",
    icon: AlertOctagon,
    desc: "Total ₹2,200 exceeds ₹700 spending cap"
  },
  {
    id: 3,
    title: "3. Prompt Injection",
    tag: "DENY",
    tagClass: "badge-deny",
    icon: ShieldAlert,
    desc: "Adversarial override & unapproved items"
  },
  {
    id: 4,
    title: "4. Expired Mandate",
    tag: "DENY",
    tagClass: "badge-deny",
    icon: Clock,
    desc: "Temporal check fails before payment"
  },
  {
    id: 5,
    title: "5. Replay Attack",
    tag: "DENY",
    tagClass: "badge-deny",
    icon: RefreshCw,
    desc: "Reused nonce & signature rejected"
  },
  {
    id: 6,
    title: "6. Behavioral Risk",
    tag: "STEP_UP",
    tagClass: "badge-step-up",
    icon: Flame,
    desc: "ML risk engine triggers human review"
  }
];

export default function ScenarioBar({ onRunScenario, onRunRaceTest, isLoading }) {
  const [activeScenarioId, setActiveScenarioId] = useState(null);

  const handleScenarioClick = async (scenarioId) => {
    setActiveScenarioId(scenarioId);
    await onRunScenario(scenarioId);
  };

  return (
    <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: 24 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        flexWrap: 'wrap',
        gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Play size={18} color="var(--accent-indigo)" />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.02em', color: '#ffffff' }}>
            HACKATHON JUDGE DEMO SUITE — 6 Deterministic Scenarios
          </h2>
        </div>
        
        {/* Race test button */}
        <button
          onClick={onRunRaceTest}
          disabled={isLoading}
          className="btn-secondary"
          style={{
            fontSize: '0.78rem',
            padding: '6px 12px',
            borderColor: 'rgba(239, 68, 68, 0.4)',
            color: '#fca5a5'
          }}
          title="Fires 10 concurrent requests with the identical nonce to prove atomic race condition prevention"
        >
          <RefreshCw size={14} className={isLoading ? "pulse-glow" : ""} />
          <span>Run Concurrency Race Test (10 Threads)</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 10
      }}>
        {SCENARIOS.map((s) => {
          const Icon = s.icon;
          const isSelected = activeScenarioId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleScenarioClick(s.id)}
              disabled={isLoading}
              style={{
                textAlign: 'left',
                background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid var(--border-subtle)',
                borderRadius: 10,
                padding: '10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                  {s.title}
                </span>
                <span className={s.tagClass} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  {s.tag}
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {s.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
