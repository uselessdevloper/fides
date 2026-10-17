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
      <div className="wispr-card" style={{ padding: '22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 6,
              background: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #A7F3D0'
            }}>
              <ShieldCheck size={22} color="var(--accent-emerald)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  04 // IMMUTABLE LEDGER
                </span>
                <span className="badge-approve">
                  {auditVerification?.is_valid ? "Cryptographically Verified" : "Verification Pending"}
                </span>
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>
                SHA-256 Hash-Chained Audit Ledger
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {auditVerification?.message || "Cryptographically linked blocks proving all agent purchase requests, model traces, and policy decisions."}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Total Blocks: <strong style={{ color: 'var(--text-main)' }}>{auditBlocks?.length || 0}</strong>
            </span>
            <button
              onClick={onVerifyAudit}
              disabled={isVerifying}
              className="btn-outline"
              style={{ fontSize: '0.78rem' }}
            >
              <RefreshCw size={13} className={isVerifying ? "listening-pulse" : ""} />
              <span>Verify Mathematical Chain</span>
            </button>
          </div>
        </div>
      </div>

      {/* Human Supervisory Escalations Queue (STEP_UP reviews) */}
      <div className="wispr-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={18} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Protected Human Supervisory Escalation Queue
            </h3>
            <span className="badge-step-up">
              {pendingApprovals?.length || 0} Pending
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>SUPERVISOR ID:</span>
            <input
              type="text"
              value={reviewerId}
              onChange={(e) => setReviewerId(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                padding: '4px 8px',
                color: 'var(--text-main)',
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
                  background: '#FFFDF5',
                  border: '1px solid #FDE68A',
                  borderRadius: 6,
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
                    <span className="badge-step-up" style={{ fontSize: '0.68rem' }}>
                      STEP_UP ESCALATION
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>
                      {app.approval_id}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Trace: {app.trace_id}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                    Merchant: <strong>{app.merchant_id}</strong> | Amount: <strong className="font-mono" style={{ color: 'var(--accent-coral)' }}>₹{app.total_amount?.toFixed(2)}</strong> | Risk Score: <strong className="font-mono">{app.risk_score?.toFixed(2)}</strong>
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Trigger Reason: {app.reason}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Supervisory notes"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderRadius: 4,
                      padding: '7px 10px',
                      color: 'var(--text-main)',
                      fontSize: '0.75rem',
                      width: 190
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
      <div className="wispr-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Hash size={18} color="var(--accent-coral)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
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
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                {/* Block Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge-mono" style={{ fontWeight: 700 }}>
                      BLOCK #{block.index}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>
                      {block.trace_id}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      {block.timestamp}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isGenesis ? (
                      <span className="badge-mono" style={{ color: 'var(--accent-indigo)' }}>
                        GENESIS ROOT
                      </span>
                    ) : (
                      <>
                        <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
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
                  background: 'var(--bg-subtle)',
                  padding: '7px 10px',
                  borderRadius: 4,
                  fontSize: '0.68rem',
                  border: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Previous Block Hash (prev_hash):</span>
                    <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                      {block.prev_hash?.slice(0, 24)}...{block.prev_hash?.slice(-8)}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', display: 'block' }}>Current Block Hash (block_hash):</span>
                    <span className="font-mono" style={{ color: 'var(--accent-coral)', fontWeight: 600 }}>
                      {block.block_hash?.slice(0, 24)}...{block.block_hash?.slice(-8)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  <span>Agent: <strong style={{ color: 'var(--text-main)' }}>{block.agent_id}</strong></span>
                  <span>Merchant: <strong style={{ color: 'var(--text-main)' }}>{block.merchant_id}</strong></span>
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
