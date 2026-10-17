import React from 'react';
import { Shield, Cpu, Lock, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const isNebiusConfigured = healthInfo?.nebius_integration?.api_key_configured;

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(8, 12, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)'
          }}>
            <Shield size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.04em', color: '#ffffff' }}>
                FIDES
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                padding: '2px 7px',
                borderRadius: 4,
                border: '1px solid rgba(99, 102, 241, 0.4)'
              }}>
                GATEWAY v1.0
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Trust Infrastructure for Agentic Commerce
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.04)',
          padding: 4,
          borderRadius: 10,
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('playground')}
            style={{
              background: activeTab === 'playground' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'playground' ? '#ffffff' : 'var(--text-muted)',
              border: activeTab === 'playground' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease'
            }}
          >
            <span>🛒</span> Purchase Playground
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            style={{
              background: activeTab === 'inspector' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'inspector' ? '#ffffff' : 'var(--text-muted)',
              border: activeTab === 'inspector' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease'
            }}
          >
            <span>🔍</span> Decision Inspector
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            style={{
              background: activeTab === 'audit' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'audit' ? '#ffffff' : 'var(--text-muted)',
              border: activeTab === 'audit' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease'
            }}
          >
            <span>⛓️</span> Audit & Review
          </button>
        </nav>

        {/* Runtime Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            padding: '5px 10px',
            borderRadius: 20,
            fontSize: '0.72rem',
            color: '#67e8f9'
          }}>
            <Cpu size={14} color="#06b6d4" />
            <span>NVIDIA Nemotron 3.5</span>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
              boxShadow: '0 0 8px #10b981'
            }} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '5px 10px',
            borderRadius: 20,
            fontSize: '0.72rem',
            color: '#6ee7b7'
          }}>
            <Lock size={13} color="#10b981" />
            <span>Ed25519 & Policy Engine</span>
          </div>
        </div>
      </div>
    </header>
  );
}
