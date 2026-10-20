import React from 'react';
import { Shield, Radio, Activity, Terminal } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const isNebiusConfigured = healthInfo?.nebius_integration?.api_key_configured;

  const navItems = [
    { id: 'about', label: '01 / ARCHITECTURE' },
    { id: 'alexa', label: '02 / ALEXA+ MCP', highlight: 'cyan' },
    { id: 'livingroom', label: '03 / LIVING ROOM (TV & RING)', highlight: 'ember' },
    { id: 'playground', label: '04 / PLAYGROUND' },
    { id: 'inspector', label: '05 / INSPECTOR' },
    { id: 'audit', label: '06 / AUDIT' }
  ];

  return (
    <header style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(0, 5, 10, 0.82)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.6)'
    }}>
      {/* Ghost subtle top aura accent line */}
      <div style={{
        height: 1,
        width: '100%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(158, 240, 255, 0.6) 35%, rgba(255, 83, 0, 0.6) 65%, transparent 100%)'
      }} />

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
            width: 32,
            height: 32,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 0 12px rgba(158, 240, 255, 0.15)'
          }}>
            <Shield size={16} color="#d6eaff" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)'
            }}>
              FIDES
            </span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.25)' }}>/</span>
            <span className="font-mono" style={{
              fontSize: '0.74rem',
              fontWeight: 600,
              color: 'var(--ghost-cyan)',
              letterSpacing: '0.06em'
            }}>
              AMAZON MCP 2025-11-25
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap'
        }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            let activeStyle = {
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              boxShadow: '0 0 12px rgba(255, 255, 255, 0.08)'
            };

            if (isActive && item.highlight === 'cyan') {
              activeStyle = {
                background: 'rgba(0, 141, 238, 0.15)',
                color: '#9ef0ff',
                borderColor: 'rgba(0, 141, 238, 0.45)',
                boxShadow: '0 0 16px rgba(0, 141, 238, 0.25)'
              };
            } else if (isActive && item.highlight === 'ember') {
              activeStyle = {
                background: 'rgba(255, 83, 0, 0.15)',
                color: '#ffaa33',
                borderColor: 'rgba(255, 83, 0, 0.45)',
                boxShadow: '0 0 16px rgba(255, 83, 0, 0.25)'
              };
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? activeStyle.background : 'transparent',
                  color: isActive ? activeStyle.color : 'var(--text-muted)',
                  border: isActive ? `1px solid ${activeStyle.borderColor}` : '1px solid transparent',
                  padding: '6px 12px',
                  borderRadius: 4,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? activeStyle.boxShadow : 'none'
                }}
                className="font-mono"
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Live Listening & Protocol Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(4, 8, 14, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '5px 12px',
            borderRadius: 20,
            fontSize: '0.7rem'
          }}>
            <span style={{ position: 'relative', display: 'flex', width: 7, height: 7 }}>
              <span className="listening-pulse" style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: 'var(--ghost-cyan)',
                opacity: 0.8
              }}></span>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: 7,
                width: 7,
                backgroundColor: 'var(--ghost-cyan)'
              }}></span>
            </span>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--ghost-ice-blue)', letterSpacing: '0.04em' }}>
              MCP HTTP // LIVE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
