import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  UserX,
  Hash,
  Link,
  Clock
} from 'lucide-react';

export default function AuditViewer({
  auditBlocks,
  pendingApprovals,
  auditVerification,
  onVerifyAudit,
  onResolveApproval,
  isVerifying,
  onSelectDecision
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
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} color="var(--accent-emerald)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  SHA-256 Hash-Chained Audit Ledger
                </h2>
                <span className="badge-approve" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  {auditVerification?.is_valid ? "Integrity Cryptographically Verified" : "Verification Pending"}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {auditVerification?.message || "Cryptographically linked immutable blocks recording all purchase requests, model traces, and policy decisions."}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Total Blocks: <strong style={{ color: '#ffffff' }}>{auditBlocks?.length || 0}</strong>
            </span>
            <button
              onClick={onVerifyAudit}
              disabled={isVerifying}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              <RefreshCw size={14} className={isVerifying ? "pulse-glow" : ""} />
              <span>Verify Cryptographic Chain</span>
            </button>
          </div>
        </div>
      </div>

      {/* Human Supervisory Escalations Queue (STEP_UP reviews) */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={18} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              Protected Human Supervisory Escalation Queue
            </h3>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              padding: '2px 7px',
              borderRadius: 10
            }}>
              {pendingApprovals?.length || 0} Pending
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Reviewer ID:</span>
            <input
              type="text"
              value={reviewerId}
              onChange={(e) => setReviewerId(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                padding: '4px 8px',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)'
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
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: 8,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 14
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span className="badge-step-up" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                      STEP_UP ESCALATION
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 600 }}>
                      {app.approval_id}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Trace: {app.trace_id}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Merchant: <strong>{app.merchant_id}</strong> | Amount: <strong style={{ color: '#ffffff' }}>₹{app.total_amount?.toFixed(2)}</strong> | Risk Score: <strong style={{ color: '#fbbf24' }}>{app.risk_score?.toFixed(2)}</strong>
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 2 }}>
                    Trigger Reason: {app.reason}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Supervisory notes (optional)"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 6,
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      width: 200
                    }}
                  />
                  <button
                    onClick={() => handleResolve(app.approval_id, 'APPROVE')}
                    disabled={resolvingId === app.approval_id}
                    className="btn-approve"
                    style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <UserCheck size={14} />
                    <span>Authorize</span>
                  </button>
                  <button
                    onClick={() => handleResolve(app.approval_id, 'REJECT')}
                    disabled={resolvingId === app.approval_id}
                    className="btn-reject"
                    style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}
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
            No pending human escalations. All nominal transactions evaluated automatically.
          </div>
        )}
      </div>

      {/* Hash-Chained Audit Ledger Blocks List */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Hash size={18} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
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
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Block Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc',
                      padding: '2px 8px',
                      borderRadius: 4
                    }}>
                      BLOCK #{block.index}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: '#ffffff' }}>
                      {block.trace_id}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      {block.timestamp}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isGenesis ? (
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        GENESIS ROOT
                      </span>
                    ) : (
                      <>
                        <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                          ₹{block.amount?.toFixed(2)}
                        </span>
                        <span className={isApprove ? 'badge-approve' : isStepUp ? 'badge-step-up' : 'badge-deny'} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
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
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '8px 10px',
                  borderRadius: 6,
                  fontSize: '0.68rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Previous Block Hash (prev_hash):</span>
                    <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                      {block.prev_hash?.slice(0, 24)}...{block.prev_hash?.slice(-8)}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Current Block Hash (block_hash):</span>
                    <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>
                      {block.block_hash?.slice(0, 24)}...{block.block_hash?.slice(-8)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  <span>Agent: <strong style={{ color: 'var(--text-muted)' }}>{block.agent_id}</strong></span>
                  <span>Merchant: <strong style={{ color: 'var(--text-muted)' }}>{block.merchant_id}</strong></span>
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
