import React from 'react';
import { Shield, Cpu, Lock, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const isNebiusConfigured = healthInfo?.nebius_integration?.api_key_configured;

  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(250, 249, 245, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="wispr-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        flexWrap: 'wrap',
        gap: 12
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 6,
            background: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF9F5'
          }}>
            <Shield size={18} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--text-main)' }}>
              FIDES
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>×</span>
            <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-coral)' }}>
              NEMOTRON 3.5
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Wispr-style uppercase monospace links) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <button
            onClick={() => setActiveTab('about')}
            style={{
              background: activeTab === 'about' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'about' ? 'var(--text-main)' : 'var(--text-muted)',
              border: activeTab === 'about' ? '1px solid var(--border-color)' : '1px solid transparent',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease'
            }}
            className="font-mono"
          >
            01 / ABOUT
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            style={{
              background: activeTab === 'playground' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'playground' ? 'var(--text-main)' : 'var(--text-muted)',
              border: activeTab === 'playground' ? '1px solid var(--border-color)' : '1px solid transparent',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease'
            }}
            className="font-mono"
          >
            02 / PLAYGROUND
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            style={{
              background: activeTab === 'inspector' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'inspector' ? 'var(--text-main)' : 'var(--text-muted)',
              border: activeTab === 'inspector' ? '1px solid var(--border-color)' : '1px solid transparent',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease'
            }}
            className="font-mono"
          >
            03 / INSPECTOR
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            style={{
              background: activeTab === 'audit' ? 'var(--bg-subtle)' : 'transparent',
              color: activeTab === 'audit' ? 'var(--text-main)' : 'var(--text-muted)',
              border: activeTab === 'audit' ? '1px solid var(--border-color)' : '1px solid transparent',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease'
            }}
            className="font-mono"
          >
            04 / AUDIT LEDGER
          </button>
        </nav>

        {/* Live Listening & Engine Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            padding: '5px 12px',
            borderRadius: 20,
            fontSize: '0.72rem'
          }}>
            <span style={{ position: 'relative', display: 'flex', width: 7, height: 7 }}>
              <span className="listening-pulse" style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-coral)',
                opacity: 0.75
              }}></span>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: 7,
                width: 7,
                backgroundColor: 'var(--accent-coral)'
              }}></span>
            </span>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
              LISTENING // NEBIUS RUNTIME
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
