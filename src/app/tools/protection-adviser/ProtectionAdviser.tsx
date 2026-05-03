'use client';

import { useEffect, useRef, useState } from 'react';
import { AppInputs, Calculations, SaveStatus, Step } from './lib/types';
import { processInputs } from './lib/calc';
import { createSession, fetchSession, getStoredSessionId, storeSessionId } from './lib/save';
import Step1Inputs from './components/Step1Inputs';
import Step2Calculator from './components/Step2Calculator';

const DEFAULT_INPUTS: AppInputs = {
  a1: {
    name: '',
    dob: '',
    gender: 'Male',
    smoker: 'No',
    income: 80000,
    occ: 'Software Engineer',
    emp: 'Sole Trader',
    hours: true,
  },
  hasPartner: false,
  a2: {
    name: '',
    dob: '',
    gender: 'Female',
    smoker: 'No',
    income: 0,
    occ: '',
    emp: 'Employee',
    hours: false,
  },
  children: 2,
  childrenUnder3: 0,
  childrenDetails: [
    { name: '', dob: '', gender: 'Male' },
    { name: '', dob: '', gender: 'Female' },
  ],
  hasHome: true,
  homePrin: 500000,
  homeRepay: 3500,
  hasInv: false,
  invPrin: 0,
  invRepay: 0,
  invRates: 0,
  invRent: 0,
  netRentDerived: 0,
  savings: 10000,
  otherDebt: 15000,
  funeralCosts: 15000,
};

const STEP_LABELS = ['Details', 'Calculator', 'Refine', 'SOA'];

export default function ProtectionAdviser() {
  const [step, setStep] = useState<Step>(1);
  const [inputs, setInputs] = useState<AppInputs>(DEFAULT_INPUTS);
  const [calcs, setCalcs] = useState<Calculations | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const mounted = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const id = getStoredSessionId();
    if (!id) return;
    fetchSession(id).then(session => {
      if (!session) return;
      setSessionId(id);
      setInputs(session.inputs as AppInputs);
      if (session.calculations && Object.keys(session.calculations).length > 0) {
        setCalcs(session.calculations as Calculations);
      }
      // Resume at appropriate step
      if (session.status === 'soa_generated') setStep(4);
      else if (session.status === 'refined') setStep(3);
      else if (session.status === 'calculated') setStep(2);
    });
  }, []);

  async function handleCalculate() {
    const result = processInputs(inputs);
    setCalcs(result);
    setStep(2);

    // Persist session
    setSaveStatus('saving');
    const id = await createSession(inputs, result);
    if (id) {
      setSessionId(id);
      storeSessionId(id);
      setSaveStatus('saved');
    } else {
      setSaveStatus('error');
    }
    setTimeout(() => setSaveStatus('idle'), 3000);
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Nav bar */}
      <nav className="no-print" style={{ background: '#53565A', color: '#fff', padding: '14px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '4px solid #FDB725' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Risk Solutions Adviser Tool</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
            {STEP_LABELS.map((label, i) => {
              const stepNum = (i + 1) as Step;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {i > 0 && <span style={{ color: '#C8C9C7', fontSize: '11px' }}>›</span>}
                  <span
                    style={{
                      color: isActive ? '#FDB725' : isDone ? '#C8C9C7' : '#9ca3af',
                      fontWeight: isActive ? 700 : 500,
                      cursor: isDone ? 'pointer' : 'default',
                    }}
                    onClick={() => { if (isDone) setStep(stepNum); }}
                  >
                    {i + 1}. {label}
                  </span>
                </span>
              );
            })}
            {saveStatus === 'error' && (
              <span style={{ marginLeft: '16px', background: '#e74c3c', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
                Not saved
              </span>
            )}
            {saveStatus === 'saving' && (
              <span style={{ marginLeft: '16px', color: '#C8C9C7', fontSize: '12px' }}>Saving…</span>
            )}
            {saveStatus === 'saved' && (
              <span style={{ marginLeft: '16px', color: '#4caf50', fontSize: '12px' }}>✓ Saved</span>
            )}
          </div>
        </div>
      </nav>

      {/* Steps */}
      {step === 1 && (
        <Step1Inputs inputs={inputs} onChange={setInputs} onCalculate={handleCalculate} />
      )}
      {step === 2 && calcs && (
        <Step2Calculator
          inputs={inputs}
          calcs={calcs}
          onBack={() => setStep(1)}
          onAdvance={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <PhaseOnePlaceholder
          title="Step 3: Refine Strategy"
          message="Phase 2 — awaiting source HTML (docs/protection-adviser-source.html). This step contains the live strategy summary panel, product sliders, and ACC restructure module."
          onBack={() => setStep(2)}
          onAdvance={() => setStep(4)}
          advanceLabel="Generate SOA →"
        />
      )}
      {step === 4 && (
        <PhaseOnePlaceholder
          title="Step 4: Statement of Advice"
          message="Phase 2 — awaiting source HTML. The SOA contains 7 regulated sections with Risk Solutions Ltd (FSP718392) and Ashley Griffiths (FSP443586) licensing details that must be reproduced verbatim."
          onBack={() => setStep(3)}
          showAdvance={false}
        />
      )}
    </div>
  );
}

function PhaseOnePlaceholder({
  title,
  message,
  onBack,
  onAdvance,
  advanceLabel,
  showAdvance = true,
}: {
  title: string;
  message: string;
  onBack: () => void;
  onAdvance?: () => void;
  advanceLabel?: string;
  showAdvance?: boolean;
}) {
  return (
    <section style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ background: '#fff', border: '2px dashed #C8C9C7', borderRadius: '12px', padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚧</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#53565A', marginBottom: '12px' }}>{title}</h2>
        <p style={{ color: '#888', fontSize: '14px', maxWidth: '500px', margin: '0 auto 24px' }}>{message}</p>
        <div style={{ background: '#fff8e1', border: '1px solid #FDB725', borderRadius: '8px', padding: '12px 20px', display: 'inline-block', fontSize: '13px', color: '#555', marginBottom: '32px' }}>
          <strong>Phase 2</strong> will be built once <code>docs/protection-adviser-source.html</code> is committed to the repo.
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{ background: '#fff', color: '#53565A', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: '2px solid #C8C9C7', cursor: 'pointer' }}
          >
            &larr; Back
          </button>
          {showAdvance && onAdvance && (
            <button
              onClick={onAdvance}
              style={{ background: '#53565A', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', border: '2px solid #53565A', cursor: 'pointer' }}
            >
              {advanceLabel ?? 'Next →'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
