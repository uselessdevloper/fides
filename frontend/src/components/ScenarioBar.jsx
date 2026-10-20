import React, { useState } from 'react';
import { Play, Zap, ShieldAlert, Clock, RefreshCw, AlertOctagon, Flame } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    num: "01",
    title: "Nominal Purchase",
    tag: "APPROVE",
    tagClass: "badge-approve",
    desc: "Valid mandate, approved merchant, under ₹700"
  },
  {
    id: 2,
    num: "02",
    title: "Limit Exceeded",
    tag: "DENY",
    tagClass: "badge-deny",
    desc: "Total ₹2,200 exceeds authorized spending cap"
  },
  {
    id: 3,
    num: "03",
    title: "Prompt Injection",
    tag: "DENY",
    tagClass: "badge-deny",
    desc: "Adversarial override & unapproved categories"
  },
  {
    id: 4,
    num: "04",
    title: "Expired Mandate",
    tag: "DENY",
    tagClass: "badge-deny",
    desc: "Temporal check fails before payment processing"
  },
  {
    id: 5,
    num: "05",
    title: "Replay Attack",
    tag: "DENY",
    tagClass: "badge-deny",
    desc: "Reused nonce & signature rejected atomically"
  },
  {
    id: 6,
    num: "06",
    title: "Behavioral Risk",
    tag: "STEP_UP",
    tagClass: "badge-step-up",
    desc: "ML risk engine triggers human review queue"
  }
];

export default function ScenarioBar({ onRunScenario, onRunRaceTest, isLoading }) {
  const [activeScenarioId, setActiveScenarioId] = useState(null);

  const handleScenarioClick = async (scenarioId) => {
    setActiveScenarioId(scenarioId);
    await onRunScenario(scenarioId);
  };

  return (
    <div className="ghost-card" style={{ padding: '20px 22px', marginBottom: 20 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-cyan)', fontWeight: 700, letterSpacing: '0.08em' }}>
            02 // DETERMINISTIC BENCHMARK SUITE
          </span>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
            6 Repeatable Hackathon Judge Scenarios
          </span>
        </div>
        
        {/* Race test button */}
        <button
          onClick={onRunRaceTest}
          disabled={isLoading}
          className="btn-ghost-outline"
          style={{ fontSize: '0.75rem' }}
          title="Submits 10 simultaneous threads with the same nonce to demonstrate atomic lock replay protection"
        >
          <RefreshCw size={13} className={isLoading ? "listening-pulse" : ""} color="var(--ghost-cyan)" />
          <span>Run Concurrency Race Test (10 Threads)</span>
        </button>
      </div>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 14 }}>
        Click any scenario below to trigger an automated live evaluation and view the resulting cryptographic trace and decision.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 10
      }}>
        {SCENARIOS.map((s) => {
          const isSelected = activeScenarioId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleScenarioClick(s.id)}
              disabled={isLoading}
              style={{
                textAlign: 'left',
                background: isSelected ? 'rgba(0, 141, 238, 0.15)' : 'rgba(3, 7, 13, 0.85)',
                border: isSelected ? '1px solid var(--ghost-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                boxShadow: isSelected ? '0 0 16px rgba(0, 141, 238, 0.25)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ghost-cyan)' }}>
                  {s.num}
                </span>
                <span className={s.tagClass}>
                  {s.tag}
                </span>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                {s.title}
              </span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35, margin: 0 }}>
                {s.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
