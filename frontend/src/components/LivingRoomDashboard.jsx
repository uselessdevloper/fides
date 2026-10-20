import React, { useState, useEffect } from 'react';
import { Tv, Bell, Activity, Wifi, Battery, CheckCircle2, XCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ShieldCheck, Play } from 'lucide-react';

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
      <div className="wispr-card" style={{ padding: '24px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#FF9900', fontWeight: 700 }}>
                AMAZON LIVING ROOM // FIRE TV & RING IOT
              </span>
              <span className="badge-mono" style={{ color: '#059669', borderColor: '#BBF7D0' }}>
                VEGA OS / FIRE OS + RING PRO 2
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Connected Living Room & Physical Access Security
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 760, marginTop: 4 }}>
              Demonstrating the full Amazon ecosystem: <strong>Ring</strong> verifies in-home radar presence, while <strong>Fire TV</strong> provides an interactive 10-foot visual companion display for high-value purchase step-up authorizations.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Fire TV 10-Foot Screen vs Ring Video Doorbell */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* Left: Fire TV 10-Foot Living Room Display */}
        <div className="wispr-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tv size={18} color="#FF9900" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Fire TV 10-Foot Companion (Vega / Fire OS)
              </h3>
            </div>
            <button
              onClick={triggerDemoFireTVCard}
              disabled={isLoadingFiretv || Boolean(activeNotif)}
              className="btn-outline"
              style={{ fontSize: '0.72rem', padding: '4px 10px' }}
            >
              <Play size={11} />
              <span>Push Demo TV Card</span>
            </button>
          </div>

          {/* Simulated 16:9 TV Screen Frame */}
          <div style={{
            background: '#0F172A',
            border: '8px solid #1E293B',
            borderRadius: 12,
            padding: 20,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
            color: '#FFFFFF'
          }}>
            {/* TV Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="font-mono" style={{ fontWeight: 700, color: '#FF9900' }}>firetv</span>
                <span>•</span>
                <span>Vega OS 10-Foot Ambient Mode</span>
              </div>
              <span className="font-mono">HDMI 1 • 4K UHD</span>
            </div>

            {/* TV Screen Center / Content */}
            {activeNotif ? (
              <div style={{
                background: 'rgba(30, 41, 59, 0.95)',
                border: '2px solid #FF9900',
                borderRadius: 10,
                padding: '20px 22px',
                margin: '20px 0',
                boxShadow: '0 8px 24px rgba(255, 153, 0, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9900' }} />
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#FF9900', fontWeight: 700 }}>
                      ALEXA+ PURCHASE STEP-UP REQUIRED
                    </span>
                  </div>
                  <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10B981' }}>
                    ₹{activeNotif.amount.toFixed(2)}
                  </span>
                </div>

                <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 14 }}>
                  {activeNotif.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={() => resolveFireTVCard("APPROVE")}
                    disabled={isLoadingFiretv}
                    style={{
                      background: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    [Select / OK] Approve
                  </button>

                  <button
                    onClick={() => resolveFireTVCard("DENY")}
                    disabled={isLoadingFiretv}
                    style={{
                      background: '#EF4444',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    [Back] Deny
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', opacity: 0.6 }}>
                <Tv size={36} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.85rem' }}>
                  No active approval cards on Fire TV screen.
                </p>
                <p style={{ fontSize: '0.72rem', marginTop: 4 }}>
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
        <div className="wispr-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={18} color="#00A8E8" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Ring Video Doorbell Pro 2
              </h3>
            </div>
            <span className="badge-approve" style={{ fontSize: '0.65rem' }}>
              ONLINE
            </span>
          </div>

          {/* Camera Snapshot */}
          <div style={{
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            marginBottom: 16,
            background: '#000000',
            aspectRatio: '16/9'
          }}>
            <img
              src="/api/ring/snapshot"
              alt="Ring Camera Feed"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          {/* Ring Telemetry Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            <div className="wispr-inset" style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Battery size={14} color="#10B981" />
              <span style={{ fontSize: '0.72rem' }}>Battery: <strong>98%</strong></span>
            </div>
            <div className="wispr-inset" style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Wifi size={14} color="#00A8E8" />
              <span style={{ fontSize: '0.72rem' }}>Signal: <strong>-48 dBm</strong></span>
            </div>
          </div>

          {/* Ring Interactive Simulation Controls */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <button
              onClick={triggerRingMotion}
              disabled={isLoadingRing}
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '8px' }}
            >
              <Activity size={13} color="#00A8E8" />
              <span>Simulate Motion</span>
            </button>

            <button
              onClick={triggerRingChime}
              disabled={isLoadingRing}
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '8px' }}
            >
              <Bell size={13} color="#E05D44" />
              <span>Simulate Chime</span>
            </button>
          </div>

          {/* Ring Recent Event Feed */}
          <div>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: 8 }}>
              RECENT RING EVENTS:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 150, overflowY: 'auto' }}>
              {ringEvents.slice(-4).reverse().map((evt) => (
                <div key={evt.event_id} style={{
                  fontSize: '0.7rem',
                  padding: '6px 8px',
                  background: 'var(--bg-subtle)',
                  borderRadius: 4,
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-main)', marginBottom: 2 }}>
                    <span>{evt.type}</span>
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
