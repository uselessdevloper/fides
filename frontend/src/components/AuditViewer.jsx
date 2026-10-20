import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  UserX,
  Hash
} from 'lucide-react';

export default function AuditViewer({
  auditBlocks,
  pendingApprovals,
  auditVerification,
  onVerifyAudit,
  onResolveApproval,
  isVerifying
}) {
  const [reviewerId, setReviewerId] = useState("SUPERVISOR_COMPLIANCE_01");
  const [reviewNotes, setReviewNotes] = useState("");
  const [resolvingId, setResolvingId] = useState(null);

  const handleResolve = async (approvalId, action) => {
    setResolvingId(approvalId);
    await onResolveApproval(approvalId, reviewerId, action, reviewNotes || `Supervisory review: ${action}`);
    setResolvingId(null);
    setReviewNotes("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner: Cryptographic Integrity Status */}
      <div className="ghost-card" style={{ padding: '22px 26px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #a7f3d0'
            }}>
              <ShieldCheck size={22} color="var(--accent-emerald)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge-ghost-emerald" style={{ fontSize: '0.68rem', padding: '2px 10px' }}>
                  Immutable Ledger
                </span>
                <span className="badge-approve">
                  {auditVerification?.is_valid ? "Cryptographically Verified" : "Verification Pending"}
                </span>
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-ink)', marginTop: 4, fontFamily: 'var(--font-heading)', margin: 0 }}>
                SHA-256 Hash-Chained Audit Ledger
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, marginTop: 2 }}>
                {auditVerification?.message || "Cryptographically linked blocks proving all agent purchase requests, model traces, and policy decisions."}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Total Blocks: <strong style={{ color: 'var(--nuvei-cyan)', fontFamily: 'var(--font-heading)' }}>{auditBlocks?.length || 0}</strong>
            </span>
            <button
              onClick={onVerifyAudit}
              disabled={isVerifying}
              className="btn-ghost-outline"
              style={{ fontSize: '0.78rem', padding: '6px 16px', borderRadius: 9999 }}
            >
              <RefreshCw size={13} className={isVerifying ? "listening-pulse" : ""} color="var(--nuvei-cyan)" />
              <span>Verify Mathematical Chain</span>
            </button>
          </div>
        </div>
      </div>

      {/* Human Supervisory Escalations Queue (STEP_UP reviews) */}
      <div className="ghost-card" style={{ padding: 24, background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={18} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-ink)', fontFamily: 'var(--font-heading)', margin: 0 }}>
              Protected Human Supervisory Escalation Queue
            </h3>
            <span className="badge-step-up">
              {pendingApprovals?.length || 0} Pending
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>Supervisor ID:</span>
            <input
              type="text"
              value={reviewerId}
              onChange={(e) => setReviewerId(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 9999,
                padding: '5px 12px',
                color: 'var(--text-ink)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-heading)'
              }}
            />
          </div>
        </div>

        {pendingApprovals?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pendingApprovals.map((app) => (
              <div
                key={app.approval_id}
                style={{
                  background: '#fffdf5',
                  border: '1px solid #fde68a',
                  borderRadius: 8,
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 14
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span className="badge-step-up" style={{ fontSize: '0.68rem' }}>
                      STEP_UP ESCALATION
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-ink)', fontWeight: 700 }}>
                      {app.approval_id}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ghost-blue)' }}>
                      Trace: {app.trace_id}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-ink)', margin: '4px 0' }}>
                    Merchant: <strong>{app.merchant_id}</strong> | Amount: <strong className="font-mono" style={{ color: 'var(--ghost-orange)' }}>₹{app.total_amount?.toFixed(2)}</strong> | Risk Score: <strong className="font-mono">{app.risk_score?.toFixed(2)}</strong>
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    Trigger Reason: {app.reason}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Supervisory review notes..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderRadius: 9999,
                      padding: '7px 14px',
                      color: 'var(--text-ink)',
                      fontSize: '0.78rem',
                      width: 210,
                      fontFamily: 'var(--font-heading)'
                    }}
                  />
                  <button
                    onClick={() => handleResolve(app.approval_id, 'APPROVE')}
                    disabled={resolvingId === app.approval_id}
                    className="btn-approve"
                  >
                    <UserCheck size={14} />
                    <span>Authorize</span>
                  </button>
                  <button
                    onClick={() => handleResolve(app.approval_id, 'REJECT')}
                    disabled={resolvingId === app.approval_id}
                    className="btn-reject"
                  >
                    <UserX size={14} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
            No pending escalations. All nominal transactions evaluated automatically.
          </div>
        )}
      </div>

      {/* Hash-Chained Audit Ledger Blocks List */}
      <div className="ghost-card" style={{ padding: 24, background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Hash size={18} color="var(--nuvei-cyan)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-ink)', fontFamily: 'var(--font-heading)', margin: 0 }}>
            Verifiable Block Chain (Chronological)
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {auditBlocks && auditBlocks.slice().reverse().map((block) => {
            const isGenesis = block.index === 0;
            const isApprove = block.decision === 'APPROVE' || block.decision === 'HUMAN_APPROVED';
            const isDeny = block.decision === 'DENY' || block.decision === 'HUMAN_REJECTED';
            const isStepUp = block.decision === 'STEP_UP';

            return (
              <div
                key={block.index}
                style={{
                  background: '#faf9f6',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '14px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Block Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge-mono" style={{ fontWeight: 700, color: 'var(--ghost-blue)' }}>
                      BLOCK #{block.index}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-ink)', fontWeight: 600 }}>
                      {block.trace_id}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      {block.timestamp}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isGenesis ? (
                      <span className="badge-mono" style={{ color: 'var(--ghost-blue)' }}>
                        GENESIS ROOT
                      </span>
                    ) : (
                      <>
                        <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                          ₹{block.amount?.toFixed(2)}
                        </span>
                        <span className={isApprove ? 'badge-approve' : isStepUp ? 'badge-step-up' : 'badge-deny'}>
                          {block.decision}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Hashes Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  background: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: 2,
                  fontSize: '0.68rem',
                  border: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: 2 }}>Previous Block Hash (prev_hash):</span>
                    <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                      {block.prev_hash?.slice(0, 24)}...{block.prev_hash?.slice(-8)}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: 2 }}>Current Block Hash (block_hash):</span>
                    <span className="font-mono" style={{ color: 'var(--ghost-blue)', fontWeight: 600 }}>
                      {block.block_hash?.slice(0, 24)}...{block.block_hash?.slice(-8)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  <span>Agent: <strong style={{ color: 'var(--text-ink)' }}>{block.agent_id}</strong></span>
                  <span>Merchant: <strong style={{ color: 'var(--text-ink)' }}>{block.merchant_id}</strong></span>
                  <span>Reason: <strong style={{ color: 'var(--text-muted)' }}>{block.reason_code}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
