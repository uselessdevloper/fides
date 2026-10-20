import React, { useState, useEffect } from 'react';
import { Tv, Bell, Activity, Wifi, Battery, CheckCircle2, XCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ShieldCheck, Play, Sparkles } from 'lucide-react';

export default function LivingRoomDashboard() {
  const [ringStatus, setRingStatus] = useState(null);
  const [ringEvents, setRingEvents] = useState([]);
  const [firetvStatus, setFiretvStatus] = useState(null);
  const [isLoadingRing, setIsLoadingRing] = useState(false);
  const [isLoadingFiretv, setIsLoadingFiretv] = useState(false);

  useEffect(() => {
    fetchRingStatus();
    fetchRingEvents();
    fetchFiretvStatus();
  }, []);

  const fetchRingStatus = async () => {
    try {
      const res = await fetch('/api/ring/status');
      if (res.ok) setRingStatus(await res.json());
    } catch (e) {
      console.error("Ring status error:", e);
    }
  };

  const fetchRingEvents = async () => {
    try {
      const res = await fetch('/api/ring/events');
      if (res.ok) setRingEvents(await res.json());
    } catch (e) {
      console.error("Ring events error:", e);
    }
  };

  const fetchFiretvStatus = async () => {
    try {
      const res = await fetch('/api/firetv/status');
      if (res.ok) setFiretvStatus(await res.json());
    } catch (e) {
      console.error("Fire TV status error:", e);
    }
  };

  const triggerRingMotion = async () => {
    setIsLoadingRing(true);
    try {
      await fetch('/api/ring/motion', { method: 'POST' });
      await fetchRingStatus();
      await fetchRingEvents();
    } finally {
      setIsLoadingRing(false);
    }
  };

  const triggerRingChime = async () => {
    setIsLoadingRing(true);
    try {
      await fetch('/api/ring/doorbell', { method: 'POST' });
      await fetchRingStatus();
      await fetchRingEvents();
    } finally {
      setIsLoadingRing(false);
    }
  };

  const triggerDemoFireTVCard = async () => {
    setIsLoadingFiretv(true);
    try {
      await fetch('/api/firetv/notify?trace_id=TRC_DEMO_CARD&summary=USB-C%20Fast%20Cable%20and%20Gel%20Pens&amount=380.0', {
        method: 'POST'
      });
      await fetchFiretvStatus();
    } finally {
      setIsLoadingFiretv(false);
    }
  };

  const resolveFireTVCard = async (action) => {
    const notifId = firetvStatus?.active_notification?.notification_id;
    if (!notifId) return;

    setIsLoadingFiretv(true);
    try {
      await fetch(`/api/firetv/resolve/${notifId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      await fetchFiretvStatus();
    } finally {
      setIsLoadingFiretv(false);
    }
  };

  const activeNotif = firetvStatus?.active_notification;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
      <div className="ghost-card" style={{ padding: '24px 26px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-orange)', fontWeight: 700, letterSpacing: '0.08em' }}>
                AMAZON LIVING ROOM // FIRE TV & RING IOT
              </span>
              <span className="badge-ghost-orange">
                VEGA OS + RING PRO 2
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-ink)', letterSpacing: '-0.01em' }}>
              Connected Living Room & Physical Access Security
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 780, marginTop: 4 }}>
              Demonstrating the full Amazon ecosystem: <strong>Ring</strong> verifies in-home 3D radar presence, while <strong>Fire TV</strong> provides an interactive 10-foot visual companion display for high-value purchase step-up authorizations.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Fire TV 10-Foot Screen vs Ring Video Doorbell */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* Left: Fire TV 10-Foot Living Room Display */}
        <div className="ghost-card" style={{ padding: 24, background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tv size={18} color="var(--ghost-orange)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                Fire TV 10-Foot Companion (Vega / Fire OS)
              </h3>
            </div>
            <button
              onClick={triggerDemoFireTVCard}
              disabled={isLoadingFiretv || Boolean(activeNotif)}
              className="btn-ghost-outline"
              style={{ fontSize: '0.72rem', padding: '4px 10px' }}
            >
              <Play size={11} color="var(--ghost-blue)" />
              <span>Push Demo TV Card</span>
            </button>
          </div>

          {/* Simulated 16:9 TV Screen Frame */}
          <div style={{
            background: '#0d131f',
            border: '4px solid #1e293b',
            borderRadius: 4,
            padding: 22,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            color: '#FFFFFF'
          }}>
            {/* TV Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.85 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="font-mono" style={{ fontWeight: 800, color: 'var(--ghost-orange)', letterSpacing: '0.04em' }}>firetv</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                <span style={{ color: '#d6eaff' }}>Vega OS 10-Foot Ambient Mode</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#888e98' }}>HDMI 1 // 4K UHD</span>
            </div>

            {/* TV Screen Center / Content */}
            {activeNotif ? (
              <div style={{
                background: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid var(--ghost-orange)',
                borderRadius: 4,
                padding: '20px 22px',
                margin: '20px 0',
                boxShadow: '0 8px 30px rgba(255, 85, 0, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ghost-orange)' }} />
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ghost-orange)', fontWeight: 700, letterSpacing: '0.06em' }}>
                      ALEXA+ PURCHASE STEP-UP REQUIRED
                    </span>
                  </div>
                  <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                    ₹{activeNotif.amount.toFixed(2)}
                  </span>
                </div>

                <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, color: '#ffffff' }}>
                  {activeNotif.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={() => resolveFireTVCard("APPROVE")}
                    disabled={isLoadingFiretv}
                    className="btn-approve"
                  >
                    [Select / OK] Approve
                  </button>

                  <button
                    onClick={() => resolveFireTVCard("DENY")}
                    disabled={isLoadingFiretv}
                    className="btn-reject"
                  >
                    [Back] Deny
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px 10px', opacity: 0.7 }}>
                <Tv size={36} color="var(--ghost-blue)" style={{ margin: '0 auto 10px', opacity: 0.6 }} />
                <p style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                  No active approval cards on Fire TV screen.
                </p>
                <p style={{ fontSize: '0.72rem', marginTop: 4, color: '#888e98' }}>
                  High-value or moderate-risk voice orders from Alexa+ will pop up here automatically.
                </p>
              </div>
            )}

            {/* TV Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', opacity: 0.6 }}>
              <span>D-Pad Remote Focus: Active</span>
              <span className="font-mono">FIDES COMPANION v2.0</span>
            </div>
          </div>
        </div>

        {/* Right: Ring Video Doorbell & Access Control */}
        <div className="ghost-card" style={{ padding: 24, background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={18} color="var(--ghost-blue)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                Ring Video Doorbell Pro 2
              </h3>
            </div>
            <span className="badge-approve" style={{ fontSize: '0.65rem' }}>
              ONLINE
            </span>
          </div>

          {/* Camera Snapshot with clean border */}
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            marginBottom: 16,
            background: '#000000',
            aspectRatio: '16/9',
            position: 'relative'
          }}>
            <img
              src="/api/ring/snapshot"
              alt="Ring Camera Feed"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          {/* Ring Telemetry Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            <div className="ghost-inset" style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, background: '#f8f8f5' }}>
              <Battery size={14} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-ink)' }}>Battery: <strong style={{ color: 'var(--accent-emerald)' }}>98%</strong></span>
            </div>
            <div className="ghost-inset" style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, background: '#f8f8f5' }}>
              <Wifi size={14} color="var(--ghost-blue)" />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-ink)' }}>Signal: <strong style={{ color: 'var(--ghost-blue)' }}>-48 dBm</strong></span>
            </div>
          </div>

          {/* Ring Interactive Simulation Controls */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <button
              onClick={triggerRingMotion}
              disabled={isLoadingRing}
              className="btn-ghost-outline"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '8px' }}
            >
              <Activity size={13} color="var(--ghost-blue)" />
              <span>Simulate Motion</span>
            </button>

            <button
              onClick={triggerRingChime}
              disabled={isLoadingRing}
              className="btn-ghost-outline"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '8px' }}
            >
              <Bell size={13} color="var(--ghost-orange)" />
              <span>Simulate Chime</span>
            </button>
          </div>

          {/* Ring Recent Event Feed */}
          <div>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: 8, letterSpacing: '0.06em' }}>
              RECENT RADAR & CHIME EVENTS:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 150, overflowY: 'auto' }}>
              {ringEvents.slice(-4).reverse().map((evt) => (
                <div key={evt.event_id} style={{
                  fontSize: '0.7rem',
                  padding: '8px 10px',
                  background: '#f8f8f5',
                  borderRadius: 2,
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-ink)', marginBottom: 2 }}>
                    <span style={{ color: 'var(--ghost-blue)' }}>{evt.type}</span>
                    <span className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>
                      {evt.timestamp.substring(11, 19)}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                    {evt.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
