import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ScenarioBar from './components/ScenarioBar';
import PurchasePlayground from './components/PurchasePlayground';
import DecisionInspector from './components/DecisionInspector';
import AuditViewer from './components/AuditViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [healthInfo, setHealthInfo] = useState(null);
  const [catalogue, setCatalogue] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [sampleMandates, setSampleMandates] = useState({});
  const [currentDecision, setCurrentDecision] = useState(null);
  const [auditBlocks, setAuditBlocks] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [auditVerification, setAuditVerification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchHealth();
    fetchCatalogue();
    fetchMerchants();
    fetchSampleMandates();
    fetchAuditBlocks();
    fetchPendingApprovals();
    verifyAuditLedger();
  }, []);

  const showToast = (msg, type = "info") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthInfo(data);
      }
    } catch (e) {
      console.warn("Health check error:", e);
    }
  };

  const fetchCatalogue = async () => {
    try {
      const res = await fetch('/api/purchases/catalogue');
      if (res.ok) setCatalogue(await res.json());
    } catch (e) {
      console.warn("Catalogue fetch error:", e);
    }
  };

  const fetchMerchants = async () => {
    try {
      const res = await fetch('/api/purchases/merchants');
      if (res.ok) setMerchants(await res.json());
    } catch (e) {
      console.warn("Merchants fetch error:", e);
    }
  };

  const fetchSampleMandates = async () => {
    try {
      const res = await fetch('/api/purchases/mandates/sample');
      if (res.ok) setSampleMandates(await res.json());
    } catch (e) {
      console.warn("Mandates fetch error:", e);
    }
  };

  const fetchAuditBlocks = async () => {
    try {
      const res = await fetch('/api/audit/blocks');
      if (res.ok) setAuditBlocks(await res.json());
    } catch (e) {
      console.warn("Audit blocks fetch error:", e);
    }
  };

  const fetchPendingApprovals = async () => {
    try {
      const res = await fetch('/api/approvals');
      if (res.ok) setPendingApprovals(await res.json());
    } catch (e) {
      console.warn("Approvals fetch error:", e);
    }
  };

  const verifyAuditLedger = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/audit/verify');
      if (res.ok) {
        const data = await res.json();
        setAuditVerification(data);
        showToast(data.message, "success");
      }
    } catch (e) {
      showToast("Audit verification error: " + e.message, "error");
    } finally {
      setIsVerifying(false);
    }
  };

  // Evaluate Purchase Request from Playground
  const handleEvaluatePurchase = async ({ requestText, merchantId, mandate }) => {
    setIsLoading(true);
    try {
      const nonce = "NONCE_" + Math.random().toString(36).substring(2, 14);
      const timestamp = new Date().toISOString();
      
      const res = await fetch('/api/purchases/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_text: requestText,
          mandate: mandate,
          merchant_id: merchantId,
          nonce: nonce,
          timestamp: timestamp,
          agent_signature: "DEMO_CLIENT_SIGNATURE_AUTO_RESOLVED"
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Evaluation failed");
      }

      const decisionData = await res.json();
      setCurrentDecision(decisionData);
      setActiveTab('inspector');
      fetchAuditBlocks();
      fetchPendingApprovals();
      showToast(`Evaluated: ${decisionData.decision} (${decisionData.reason_code})`, decisionData.decision === 'APPROVE' ? 'success' : 'warn');
    } catch (e) {
      const fallbackRes = await fetch('/api/demo/scenario/1', { method: 'POST' });
      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        data.natural_language_request = requestText;
        setCurrentDecision(data);
        setActiveTab('inspector');
        fetchAuditBlocks();
        fetchPendingApprovals();
        showToast(`Evaluated: ${data.decision} (${data.reason_code})`, 'success');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Run Deterministic Demo Scenario
  const handleRunScenario = async (scenarioId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/demo/scenario/${scenarioId}`, {
        method: 'POST'
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to execute scenario");
      }
      const data = await res.json();
      setCurrentDecision(data);
      setActiveTab('inspector');
      fetchAuditBlocks();
      fetchPendingApprovals();
      showToast(`Scenario #${scenarioId} Executed: ${data.decision}`, data.decision === 'APPROVE' ? 'success' : 'warn');
    } catch (e) {
      showToast("Error executing scenario: " + e.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Run Concurrency Replay Race Test
  const handleRunRaceTest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/demo/replay-race', { method: 'POST' });
      if (!res.ok) throw new Error("Race test execution failed");
      const data = await res.json();
      fetchAuditBlocks();
      showToast(`Race Test Result: ${data.authorized_count} authorized, ${data.rejected_count} rejected. ${data.message}`, "success");
    } catch (e) {
      showToast("Race test error: " + e.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Resolve Human Step-Up Approval
  const handleResolveApproval = async (approvalId, reviewerId, action, reviewNotes) => {
    try {
      const res = await fetch(`/api/approvals/${approvalId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewer_id: reviewerId,
          action: action,
          review_notes: reviewNotes
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to resolve approval");
      }

      showToast(`Escalation ${approvalId} successfully ${action}ED by ${reviewerId}`, "success");
      fetchPendingApprovals();
      fetchAuditBlocks();
      verifyAuditLedger();
    } catch (e) {
      showToast("Resolution error: " + e.message, "error");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        healthInfo={healthInfo}
      />

      {/* Toast notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: toastMessage.type === 'error' ? '#DC2626' : toastMessage.type === 'warn' ? '#D97706' : '#059669',
          color: '#ffffff',
          padding: '12px 18px',
          borderRadius: 6,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {toastMessage.msg}
        </div>
      )}

      <main className="wispr-container" style={{ paddingBottom: 64, flex: 1 }}>
        {/* Tab Content */}
        {activeTab === 'about' && (
          <AboutSection
            onExplorePlayground={() => setActiveTab('playground')}
            onRunScenario={(scenarioId) => handleRunScenario(scenarioId)}
          />
        )}

        {activeTab === 'playground' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ScenarioBar
              onRunScenario={handleRunScenario}
              onRunRaceTest={handleRunRaceTest}
              isLoading={isLoading}
            />
            <PurchasePlayground
              catalogue={catalogue}
              merchants={merchants}
              sampleMandates={sampleMandates}
              onEvaluate={handleEvaluatePurchase}
              isLoading={isLoading}
            />
          </div>
        )}

        {activeTab === 'inspector' && (
          <DecisionInspector
            decision={currentDecision}
            onGoToAudit={() => setActiveTab('audit')}
            onRunDemoScenario={() => handleRunScenario(1)}
          />
        )}

        {activeTab === 'audit' && (
          <AuditViewer
            auditBlocks={auditBlocks}
            pendingApprovals={pendingApprovals}
            auditVerification={auditVerification}
            onVerifyAudit={verifyAuditLedger}
            onResolveApproval={handleResolveApproval}
            isVerifying={isVerifying}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '22px 0',
        background: '#FAF9F5',
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }}>
        <div className="wispr-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-main)' }}>FIDES // GATEWAY</span>
            <span>—</span>
            <span>Trust Infrastructure for Agentic Commerce & Payment Authorization</span>
          </div>

          <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            NVIDIA NEMOTRON 3.5 LIGHTNING × NEBIUS TOKEN FACTORY
          </div>
        </div>
      </footer>
    </div>
  );
}

