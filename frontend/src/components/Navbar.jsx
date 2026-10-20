import React, { useState } from 'react';
import { Shield, ShoppingBag, Terminal, Radio, Activity, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, healthInfo }) {
  const [showBanner, setShowBanner] = useState(true);

  const navItems = [
    { id: 'about', label: '01 / OVERVIEW' },
    { id: 'alexa', label: '02 / ALEXA+ MCP' },
    { id: 'livingroom', label: '03 / LIVING ROOM, RING & BEE' },
    { id: 'playground', label: '04 / PLAYGROUND' },
    { id: 'inspector', label: '05 / INSPECTOR' },
    { id: 'audit', label: '06 / AUDIT' },
    { id: 'hackathon', label: '07 / HACKATHON BRIEF' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#ebebe6',
      borderBottom: '1px solid #d4d4cb'
    }}>
      {/* Ghost Core Safety Orange Announcement Banner */}
      {showBanner && (
        <div style={{
          background: 'var(--ghost-orange)',
          color: '#ffffff',
          padding: '7px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: '0.74rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-heading)'
        }}>
          <span>
            FIDES LAUNCHES AMBIENT TRUST CORE FOR FIRE TV, ALEXA+, RING & BEE WEARABLE AI — SPEC 2025-11-25 READY
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
              alignItems: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Main Ghost Header */}
      <div className="wispr-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        borderBottom: '1px solid #dfdfe7'
      }}>
        {/* Left minimal links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            onClick={() => setActiveTab('about')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: activeTab === 'about' ? 'var(--text-ink)' : 'var(--text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)'
            }}
          >
            ABOUT
          </button>
          <button
            onClick={() => setActiveTab('alexa')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)'
            }}
          >
            MCP SPEC
          </button>
          <button
            onClick={() => setActiveTab('livingroom')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)'
            }}
          >
            HARDWARE
          </button>
        </div>

        {/* Center Lowercase Wordmark */}
        <div
          onClick={() => setActiveTab('about')}
          style={{
            cursor: 'pointer',
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-ink)',
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span>fides</span>
        </div>

        {/* Right Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setActiveTab('playground')}
            style={{
              background: 'var(--ghost-orange)',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-heading)',
              padding: '7px 18px',
              borderRadius: 9999,
              boxShadow: '0 2px 8px rgba(255, 85, 0, 0.25)',
              transition: 'all 0.18s ease'
            }}
          >
            Dispatch Purchase
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-ink)',
              display: 'flex',
              alignItems: 'center'
            }}
            title="View Tamper-Evident Audit Ledger"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Subnav: Retro Engineering Tabs */}
      <div style={{ background: '#f2f2ee', borderBottom: '1px solid #dcdcd4', padding: '6px 0' }}>
        <div className="wispr-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8
        }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexWrap: 'wrap'
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
                    padding: '6px 16px',
                    borderRadius: 9999,
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.18s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(12, 152, 212, 0.3)' : 'none'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Telemetry Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ position: 'relative', display: 'flex', width: 6, height: 6 }}>
              <span className="listening-pulse" style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: 'var(--ghost-blue)',
                opacity: 0.8
              }}></span>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: 6,
                width: 6,
                backgroundColor: 'var(--ghost-blue)'
              }}></span>
            </span>
            <span className="font-mono" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ghost-blue)' }}>
              ALEXA+ MCP // ON-DEVICE VERIFIED
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
