import React, { useState } from 'react';
import { Shield, ShoppingBag, Terminal, Radio, Activity, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const [showBanner, setShowBanner] = useState(true);

  const navItems = [
    { id: 'about', label: 'Overview' },
    { id: 'alexa', label: 'Alexa+ MCP' },
    { id: 'livingroom', label: 'Living Room & Devices' },
    { id: 'playground', label: 'Playground' },
    { id: 'inspector', label: 'Inspector' },
    { id: 'audit', label: 'Audit Ledger' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#faf9f7',
      borderBottom: '1px solid #e2ded5'
    }}>
      {/* Ghost Core Safety Orange Announcement Banner */}
      {showBanner && (
        <div style={{
          background: 'var(--ghost-orange)',
          color: '#ffffff',
          padding: '6px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: '0.74rem',
          fontWeight: 600,
          letterSpacing: '0.01em',
          fontFamily: 'var(--font-heading)'
        }}>
          <span>
            Fides — Trust Infrastructure for Agentic Commerce · Real-Time Policy & Authorization Gateway for Autonomous AI Agents
          </span>
          <button
            onClick={() => setShowBanner(false)}
            style={{
              position: 'absolute',
              right: 18,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 4
            }}
            title="Dismiss announcement"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Nuvei & Ghost Top Header */}
      <div className="wispr-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        borderBottom: '1px solid #ebe8e1'
      }}>
        {/* Left: Brand Wordmark + Subtitle Badge */}
        <div
          onClick={() => setActiveTab('about')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-ink)',
            fontFamily: 'var(--font-heading)'
          }}>
            fides
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            padding: '2px 10px',
            background: '#eeece6',
            borderRadius: 9999,
            border: '1px solid #ded9ce'
          }}>
            Autonomous Commerce Core
          </span>
        </div>

        {/* Right: Quick Action Pill & Audit Shortcut */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setActiveTab('playground')}
            className="btn-ghost-primary"
            style={{
              padding: '7px 18px',
              fontSize: '0.8rem',
              fontWeight: 600,
              gap: 6
            }}
          >
            <ShoppingBag size={14} />
            <span>Dispatch Purchase</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            style={{
              background: '#ffffff',
              border: '1px solid #dcd7ce',
              borderRadius: 9999,
              cursor: 'pointer',
              color: 'var(--text-ink)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              fontSize: '0.76rem',
              fontWeight: 600,
              transition: 'all 0.18s ease'
            }}
            title="View Tamper-Evident Audit Ledger"
          >
            <Shield size={13} color="var(--nuvei-cyan)" />
            <span>Audit</span>
          </button>
        </div>
      </div>

      {/* Subnav: Nuvei Title-Cased Pill Tabs with Guaranteed Single-Row Alignment */}
      <div style={{
        background: '#f3f1ec',
        borderBottom: '1px solid #dedbd2',
        padding: '7px 0'
      }}>
        <div className="wispr-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          {/* Scrollable, non-wrapping pill tabs */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            whiteSpace: 'nowrap',
            flex: 1
          }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    background: isActive ? 'var(--nuvei-cyan)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    border: isActive ? '1px solid var(--nuvei-cyan)' : '1px solid transparent',
                    padding: '6px 15px',
                    borderRadius: 9999,
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    fontFamily: 'var(--font-heading)',
                    transition: 'all 0.16s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(12, 152, 212, 0.32)' : 'none',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#e7e5de';
                      e.currentTarget.style.color = 'var(--text-ink)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Telemetry Status Capsule: Always Anchored on Right, Never Broken or Wrapped */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            flexShrink: 0,
            background: 'rgba(12, 152, 212, 0.08)',
            border: '1px solid rgba(12, 152, 212, 0.25)',
            padding: '5px 12px',
            borderRadius: 9999
          }}>
            <span style={{ position: 'relative', display: 'flex', width: 7, height: 7 }}>
              <span className="listening-pulse" style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: 'var(--nuvei-cyan)',
                opacity: 0.75
              }}></span>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: 7,
                width: 7,
                backgroundColor: 'var(--nuvei-cyan)'
              }}></span>
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--nuvei-cyan)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em'
            }}>
              Alexa+ MCP Verified
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
