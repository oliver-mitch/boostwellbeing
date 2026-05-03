'use client';

import { AppInputs, Calculations } from '../lib/types';
import { fmt } from '../lib/formatters';

interface Props {
  inputs: AppInputs;
  calcs: Calculations;
  onBack: () => void;
  onAdvance: () => void;
}

function Row({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
      <td style={{ padding: '8px 12px', fontSize: '13px', color: '#53565A', fontWeight: sub ? 400 : 600 }}>{label}</td>
      <td style={{ padding: '8px 12px', fontSize: '13px', color: accent ? '#e74c3c' : '#53565A', fontWeight: 600, textAlign: 'right' }}>
        {value}
        {sub && <div style={{ fontSize: '11px', color: '#888', fontWeight: 400 }}>{sub}</div>}
      </td>
    </tr>
  );
}

function Section({ title, accent, children }: { title: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${accent ? '#FDB725' : '#C8C9C7'}`, borderRadius: '10px', marginBottom: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ background: accent ? '#FDB725' : '#53565A', color: accent ? '#000' : '#fff', padding: '10px 16px', fontWeight: 700, fontSize: '14px' }}>
        {title}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function AdultCalcPanel({ label, inputs, calcs, isA2 }: { label: string; inputs: AppInputs; calcs: Calculations; isA2?: boolean }) {
  const c = calcs;
  const inc = isA2 ? inputs.a2.income : inputs.a1.income;
  const name = (isA2 ? inputs.a2.name : inputs.a1.name) || label;
  const netMo = isA2 ? c.netA2 : c.netA1;
  const accAnn = isA2 ? c.accA2 : c.accA1;
  const jsIll = isA2 ? c.jobseekerA2Illness : c.jobseekerA1Illness;
  const jsLabel = isA2 ? c.jsA2_subLabel : c.jsA1_subLabel;
  const sfIll = isA2 ? c.sf_ill_a2 : c.sf_ill_a1;
  const sfAcc = isA2 ? c.sf_acc_a2 : c.sf_acc_a1;
  const disReq = isA2 ? c.disReqA2 : c.disReqA1;
  const recMpc = isA2 ? c.recMpcA2 : c.recMpcA1;
  const recIp = isA2 ? c.recIpA2 : c.recIpA1;
  const recLife = isA2 ? c.recLifeA2 : c.recLifeA1;
  const recLi = isA2 ? c.recLiA2 : c.recLiA1;
  const recTrauma = isA2 ? c.recTraumaA2 : c.recTraumaA1;
  const wffIll = isA2 ? c.wff_ill_a2_total : c.wff_ill_a1_total;

  return (
    <div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#53565A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ background: '#53565A', color: '#FDB725', padding: '3px 10px', borderRadius: '5px', fontSize: '13px' }}>{name}</span>
        <span style={{ fontSize: '13px', color: '#888', fontWeight: 400 }}>{inc > 0 ? `Gross ${fmt(inc)}/yr` : 'No income'}</span>
      </h3>

      <Section title="Income Analysis">
        <Row label="Gross Annual Income" value={fmt(inc)} />
        <Row label="Net Monthly (after tax + ACC)" value={`${fmt(netMo)}/mo`} />
        <Row label="ACC Earner's Levy (annual)" value={fmt(accAnn)} />
      </Section>

      <Section title="State Safety Net — If Unable to Work (Illness)">
        <Row label="Jobseeker entitlement" value={`${fmt(jsIll)}/mo`} sub={jsLabel} />
        <Row label="Working for Families (illness)" value={`${fmt(wffIll)}/mo`} />
        <Row label="Monthly Shortfall (illness)" value={`${fmt(sfIll)}/mo`} accent />
        <Row label="Monthly Shortfall (ACC accident)" value={`${fmt(sfAcc)}/mo`} accent />
        <Row label="Disability Income Required" value={`${fmt(disReq)}/mo`} accent />
      </Section>

      <Section title="Disability Protection Split" accent>
        <Row label="Mortgage Protection Cover" value={`${fmt(recMpc)}/mo`} />
        <Row label="Income Protection" value={`${fmt(recIp)}/mo`} />
      </Section>

      <Section title="Life &amp; Trauma Recommendations" accent>
        <Row label="Life Cover" value={fmt(recLife)} />
        {recLi > 0 && <Row label="Living Income (monthly)" value={`${fmt(recLi)}/mo`} />}
        <Row label="Trauma Cover" value={fmt(recTrauma)} />
      </Section>
    </div>
  );
}

export default function Step2Calculator({ inputs, calcs, onBack, onAdvance }: Props) {
  const c = calcs;

  return (
    <section style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ background: '#fff', border: '1px solid #C8C9C7', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#53565A', borderBottom: '1px solid #C8C9C7', paddingBottom: '12px', marginBottom: '20px' }}>
          Step 2: Shortfall Calculator
        </h2>

        {/* Household summary */}
        <div style={{ background: '#f8f9fa', border: '1px solid #C8C9C7', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: '#53565A', fontSize: '14px', marginBottom: '10px' }}>Household Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { l: 'Combined Gross', v: `${fmt(c.totalGross)}/yr` },
              { l: 'Total Monthly Repayments', v: `${fmt(c.totalMortgageRepayments)}/mo` },
              { l: 'Net Rent (monthly)', v: `${fmt(c.netRent)}/mo` },
              { l: 'WfF (normal)', v: `${fmt(c.sqWfF_total)}/mo` },
              { l: 'Base Income Needs', v: `${fmt(c.baseIncomeNeeds)}/mo` },
            ].map(({ l, v }) => (
              <div key={l} style={{ background: '#fff', border: '1px solid #C8C9C7', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '3px' }}>{l}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#53565A' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Per-adult panels */}
        <div style={{ display: 'grid', gridTemplateColumns: inputs.hasPartner ? '1fr 1fr' : '1fr', gap: '24px' }}>
          <AdultCalcPanel label="Adult 1" inputs={inputs} calcs={calcs} />
          {inputs.hasPartner && <AdultCalcPanel label="Adult 2" inputs={inputs} calcs={calcs} isA2 />}
        </div>

        {/* Disclaimer */}
        <div style={{ background: '#fff8e1', border: '1px solid #FDB725', borderRadius: '8px', padding: '12px 16px', marginTop: '20px', fontSize: '12px', color: '#555' }}>
          <strong>Note:</strong> These calculations are based on 2026/27 NZ tax brackets, ACC levy rates, and Working for Families parameters. Figures are indicative only. Shortfall calculations assume the ill/injured person earns $0 and receives maximum Jobseeker/ACC entitlement with no partner income abatement.
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '40px' }}>
        <button
          onClick={onBack}
          style={{ background: '#fff', color: '#53565A', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: '2px solid #C8C9C7', cursor: 'pointer' }}
        >
          &larr; Back to Details
        </button>
        <button
          onClick={onAdvance}
          style={{ background: '#53565A', color: '#fff', padding: '12px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', border: '2px solid #53565A', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#3a3d40')}
          onMouseLeave={e => (e.currentTarget.style.background = '#53565A')}
        >
          Refine Strategy &rarr;
        </button>
      </div>
    </section>
  );
}
