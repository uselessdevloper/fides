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
    <div className="wispr-card" style={{ padding: '20px 22px', marginBottom: 20 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-coral)', fontWeight: 700 }}>
            02 // DETERMINISTIC EVALUATION SUITE
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>|</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
            6 Repeatable Hackathon Judge Scenarios
          </span>
        </div>
        
        {/* Race test button */}
        <button
          onClick={onRunRaceTest}
          disabled={isLoading}
          className="btn-dark"
          style={{ fontSize: '0.78rem' }}
          title="Submits 10 simultaneous threads with the same nonce to demonstrate atomic lock replay protection"
        >
          <RefreshCw size={13} className={isLoading ? "listening-pulse" : ""} />
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
                background: isSelected ? 'var(--bg-subtle)' : '#ffffff',
                border: isSelected ? '1px solid var(--accent-coral)' : '1px solid var(--border-color)',
                borderRadius: 6,
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = '#B8B6AB';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-coral)' }}>
                  {s.num}
                </span>
                <span className={s.tagClass}>
                  {s.tag}
                </span>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {s.title}
              </span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                {s.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
