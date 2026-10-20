import React, { useState, useEffect } from 'react';
import {
  Tv,
  Bell,
  Activity,
  Wifi,
  Battery,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  Watch,
  Mic,
  Radio,
  Send,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function LivingRoomDashboard() {
  const [ringStatus, setRingStatus] = useState(null);
  const [ringEvents, setRingEvents] = useState([]);
  const [firetvStatus, setFiretvStatus] = useState(null);
  const [beeStatus, setBeeStatus] = useState(null);
  const [beeTranscripts, setBeeTranscripts] = useState([]);
  const [newBeeMemo, setNewBeeMemo] = useState("");
  const [isLoadingRing, setIsLoadingRing] = useState(false);
  const [isLoadingFiretv, setIsLoadingFiretv] = useState(false);
  const [isLoadingBee, setIsLoadingBee] = useState(false);

  useEffect(() => {
    fetchRingStatus();
    fetchRingEvents();
    fetchFiretvStatus();
    fetchBeeStatus();
    fetchBeeTranscripts();
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

  const fetchBeeStatus = async () => {
    try {
      const res = await fetch('/api/bee/status');
      if (res.ok) setBeeStatus(await res.json());
    } catch (e) {
      console.error("Bee status error:", e);
    }
  };

  const fetchBeeTranscripts = async () => {
    try {
      const res = await fetch('/api/bee/transcripts');
      if (res.ok) setBeeTranscripts(await res.json());
    } catch (e) {
      console.error("Bee transcripts error:", e);
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

  const triggerBeeHaptic = async () => {
    setIsLoadingBee(true);
    try {
      await fetch('/api/bee/haptic-prompt?trace_id=TRC_BEE_STEP_UP&summary=Arabica%20Roast%20Coffee%20Reorder&amount=640.0', {
        method: 'POST'
      });
      await fetchBeeStatus();
    } finally {
      setIsLoadingBee(false);
    }
  };

  const resolveBeePrompt = async (action) => {
    const promptId = beeStatus?.active_haptic_prompt?.prompt_id;
    if (!promptId) return;

    setIsLoadingBee(true);
    try {
      await fetch(`/api/bee/resolve/${promptId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      await fetchBeeStatus();
    } finally {
      setIsLoadingBee(false);
    }
  };

  const handleRecordBeeMemo = async (e) => {
    e.preventDefault();
    if (!newBeeMemo.trim()) return;

    setIsLoadingBee(true);
    try {
      await fetch('/api/bee/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newBeeMemo })
      });
      setNewBeeMemo("");
      await fetchBeeStatus();
      await fetchBeeTranscripts();
    } finally {
      setIsLoadingBee(false);
    }
  };

  const activeNotif = firetvStatus?.active_notification;
  const activeBeePrompt = beeStatus?.active_haptic_prompt;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
      <div className="ghost-card" style={{ padding: '24px 26px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-orange)', fontWeight: 700, letterSpacing: '0.08em' }}>
                AMAZON LIVING ROOM, FRONT DOOR & WEARABLE AI
              </span>
              <span className="badge-ghost-orange">
                FIRE OS + VEGA OS // RING PRO 2 // BEE WRISTBAND
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-ink)', letterSpacing: '-0.01em' }}>
              Connected Living Room, Physical Radar & Wearable Confirmation
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 840, marginTop: 4 }}>
              Demonstrating all four primary Amazon Hackathon tracks in concert: <strong>Alexa+</strong> receives voice intent, <strong>Ring</strong> verifies in-home physical presence via 3D radar, <strong>Fire TV</strong> renders 10-foot living room step-ups, and <strong>Bee</strong> provides haptic double-pulse wrist authorization.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Column Ecosystem Grid: Fire TV vs Ring vs Bee Wearable */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, alignItems: 'start' }}>
        
        {/* Card 1: Fire TV 10-Foot Living Room Display */}
        <div className="ghost-card" style={{ padding: 22, background: '#ffffff', overflow: 'hidden' }}>
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 14,
            height: 120,
            border: '1px solid var(--border-hairline)',
            position: 'relative'
          }}>
            <img src="/firetv_living_room.jpg" alt="Fire TV Living Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              background: 'rgba(0,0,0,0.75)',
              padding: '3px 8px',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Tv size={12} color="var(--ghost-orange)" />
              <span className="font-mono" style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>LIVING ROOM // VEGA OS</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tv size={18} color="var(--ghost-orange)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                Fire TV (Vega / Fire OS)
              </h3>
            </div>
            <button
              onClick={triggerDemoFireTVCard}
              disabled={isLoadingFiretv || Boolean(activeNotif)}
              className="btn-ghost-outline"
              style={{ fontSize: '0.7rem', padding: '3px 8px' }}
            >
              <Play size={10} color="var(--ghost-blue)" />
              <span>Push TV Card</span>
            </button>
          </div>

          {/* TV Frame */}
          <div style={{
            background: '#0d131f',
            border: '4px solid #1e293b',
            borderRadius: 4,
            padding: 16,
            minHeight: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', opacity: 0.85 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="font-mono" style={{ fontWeight: 800, color: 'var(--ghost-orange)' }}>firetv</span>
                <span>•</span>
                <span>Vega OS 10-Foot Mode</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.62rem', color: '#888e98' }}>HDMI 1</span>
            </div>

            {activeNotif ? (
              <div style={{
                background: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid var(--ghost-orange)',
                borderRadius: 4,
                padding: '14px 16px',
                margin: '14px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--ghost-orange)', fontWeight: 700 }}>
                    STEP-UP REQUIRED
                  </span>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
                    ₹{activeNotif.amount.toFixed(2)}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 12, color: '#ffffff' }}>
                  {activeNotif.summary}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => resolveFireTVCard("APPROVE")} className="btn-approve" style={{ padding: '6px 12px', fontSize: '0.72rem' }}>
                    Approve
                  </button>
                  <button onClick={() => resolveFireTVCard("DENY")} className="btn-reject" style={{ padding: '6px 12px', fontSize: '0.72rem' }}>
                    Deny
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', opacity: 0.65 }}>
                <Tv size={32} color="var(--ghost-blue)" style={{ margin: '0 auto 8px', opacity: 0.6 }} />
                <p style={{ fontSize: '0.8rem', color: '#ffffff' }}>No active card on Fire TV</p>
                <p style={{ fontSize: '0.68rem', color: '#888e98' }}>Voice orders needing review appear here.</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', opacity: 0.6 }}>
              <span>D-Pad Remote: Active</span>
              <span className="font-mono">FIDES 10-FOOT</span>
            </div>
          </div>
        </div>

        {/* Card 2: Ring Video Doorbell & Radar Access */}
        <div className="ghost-card" style={{ padding: 22, background: '#ffffff', overflow: 'hidden' }}>
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 14,
            height: 120,
            border: '1px solid var(--border-hairline)',
            position: 'relative'
          }}>
            <img src="/ring_doorbell_radar.jpg" alt="Ring Doorbell Porch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              background: 'rgba(0,0,0,0.75)',
              padding: '3px 8px',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Bell size={12} color="var(--ghost-blue)" />
              <span className="font-mono" style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>FRONT DOOR // 3D RADAR</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={18} color="var(--ghost-blue)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                Ring Doorbell Pro 2
              </h3>
            </div>
            <span className="badge-approve" style={{ fontSize: '0.65rem' }}>ONLINE</span>
          </div>

          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            marginBottom: 12,
            background: '#000000',
            aspectRatio: '16/9'
          }}>
            <img src="/api/ring/snapshot" alt="Ring Feed" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div className="ghost-inset" style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6, background: '#f8f8f5' }}>
              <Battery size={13} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.7rem' }}>Battery: <strong>98%</strong></span>
            </div>
            <div className="ghost-inset" style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6, background: '#f8f8f5' }}>
              <Wifi size={13} color="var(--ghost-blue)" />
              <span style={{ fontSize: '0.7rem' }}>Signal: <strong>-48 dBm</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={triggerRingMotion} disabled={isLoadingRing} className="btn-ghost-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.72rem', padding: '6px' }}>
              <Activity size={12} color="var(--ghost-blue)" />
              <span>Motion</span>
            </button>
            <button onClick={triggerRingChime} disabled={isLoadingRing} className="btn-ghost-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.72rem', padding: '6px' }}>
              <Bell size={12} color="var(--ghost-orange)" />
              <span>Chime</span>
            </button>
          </div>
        </div>

        {/* Card 3: Bee Wearable AI Wristband */}
        <div className="ghost-card" style={{ padding: 22, background: '#ffffff', overflow: 'hidden' }}>
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 14,
            height: 120,
            border: '1px solid var(--border-hairline)',
            position: 'relative'
          }}>
            <img src="/bee_wearable_wrist.jpg" alt="Bee Wearable Band" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              background: 'rgba(0,0,0,0.75)',
              padding: '3px 8px',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Watch size={12} color="var(--accent-purple)" />
              <span className="font-mono" style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>ON-WRIST // LRA HAPTICS</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Watch size={18} color="var(--ghost-blue)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                Bee Wearable AI (Wrist)
              </h3>
            </div>
            <button
              onClick={triggerBeeHaptic}
              disabled={isLoadingBee || Boolean(activeBeePrompt)}
              className="btn-ghost-outline"
              style={{ fontSize: '0.7rem', padding: '3px 8px' }}
            >
              <Zap size={10} color="var(--ghost-orange)" />
              <span>Trigger Haptic</span>
            </button>
          </div>

          {/* Wristband OLED Screen Frame */}
          <div style={{
            background: '#090d14',
            border: '3px solid #252b36',
            borderRadius: 8,
            padding: 14,
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            color: '#ffffff',
            marginBottom: 12
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', opacity: 0.8 }}>
              <span className="font-mono" style={{ color: 'var(--ghost-blue)', fontWeight: 700 }}>bee wearable v1.2</span>
              <span>BLE 94%</span>
            </div>

            {activeBeePrompt ? (
              <div style={{ textAlign: 'center', padding: '8px 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                  <Zap size={13} color="var(--ghost-orange)" className="listening-pulse" />
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-orange)', fontWeight: 700 }}>
                    HAPTIC DOUBLE-PULSE
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: '2px 0 6px' }}>
                  {activeBeePrompt.summary} (₹{activeBeePrompt.amount})
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  <button onClick={() => resolveBeePrompt("APPROVE")} className="btn-approve" style={{ padding: '4px 10px', fontSize: '0.68rem' }}>
                    [Tap] Authorize
                  </button>
                  <button onClick={() => resolveBeePrompt("DENY")} className="btn-reject" style={{ padding: '4px 10px', fontSize: '0.68rem' }}>
                    [Dbl-Tap] Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 4px', opacity: 0.7 }}>
                <Watch size={24} color="var(--ghost-blue)" style={{ margin: '0 auto 6px', opacity: 0.7 }} />
                <p style={{ fontSize: '0.78rem', margin: 0 }}>Wrist Standby • Monitoring</p>
                <p style={{ fontSize: '0.65rem', color: '#888e98', margin: '2px 0 0' }}>Haptic step-ups alert here</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', opacity: 0.6 }}>
              <span>LRA Engine: Ready</span>
              <span className="font-mono">ON-BODY PROOF</span>
            </div>
          </div>

          {/* Record Voice Memo via Bee */}
          <form onSubmit={handleRecordBeeMemo} style={{ display: 'flex', gap: 6 }}>
            <input
              type="text"
              placeholder="Record intent via Bee mic..."
              value={newBeeMemo}
              onChange={(e) => setNewBeeMemo(e.target.value)}
              style={{
                flex: 1,
                fontSize: '0.75rem',
                padding: '6px 8px',
                border: '1px solid var(--border-color)',
                borderRadius: 2
              }}
            />
            <button
              type="submit"
              disabled={isLoadingBee || !newBeeMemo.trim()}
              className="btn-ghost-primary"
              style={{ padding: '6px 10px', fontSize: '0.72rem' }}
            >
              <Mic size={12} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
