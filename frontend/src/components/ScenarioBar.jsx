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
    <div className="ghost-card" style={{ padding: '10px 16px', marginBottom: 12, background: '#ffffff' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
        flexWrap: 'wrap',
        gap: 8
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge-ghost-blue" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
            Deterministic Benchmark Suite
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>|</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-ink)' }}>
            6 Repeatable Autonomous Commerce Evaluation Scenarios
          </span>
        </div>
        
        {/* Race test button */}
        <button
          onClick={onRunRaceTest}
          disabled={isLoading}
          className="btn-ghost-outline"
          style={{ fontSize: '0.72rem', padding: '4px 12px' }}
          title="Submits 10 simultaneous threads with the same nonce to demonstrate atomic lock replay protection"
        >
          <RefreshCw size={12} className={isLoading ? "listening-pulse" : ""} color="var(--nuvei-cyan)" />
          <span>Run Concurrency Race Test (10 Threads)</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 8
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
                background: isSelected ? 'rgba(12, 152, 212, 0.08)' : '#fbfaf8',
                border: isSelected ? '1.5px solid var(--nuvei-cyan)' : '1px solid var(--border-color)',
                borderRadius: 6,
                padding: '8px 10px',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                boxShadow: isSelected ? '0 2px 8px rgba(12, 152, 212, 0.15)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--nuvei-cyan)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge-mono" style={{ fontSize: '0.66rem', padding: '1px 8px' }}>
                  {s.num}
                </span>
                <span className={s.tagClass}>
                  {s.tag}
                </span>
              </div>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-ink)', fontFamily: 'var(--font-heading)' }}>
                {s.title}
              </span>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                {s.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
