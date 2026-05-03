'use client';

import { AppInputs, ChildDetail, EmploymentStatus, Gender, YesNo } from '../lib/types';

interface Props {
  inputs: AppInputs;
  onChange: (inputs: AppInputs) => void;
  onCalculate: () => void;
}

const empOptions: EmploymentStatus[] = ['Employee', 'Sole Trader', 'Employed by own company', 'Unemployed'];
const childCounts = [0, 1, 2, 3, 4];

function setA1(inputs: AppInputs, patch: Partial<AppInputs['a1']>): AppInputs {
  return { ...inputs, a1: { ...inputs.a1, ...patch } };
}
function setA2(inputs: AppInputs, patch: Partial<AppInputs['a2']>): AppInputs {
  return { ...inputs, a2: { ...inputs.a2, ...patch } };
}

export default function Step1Inputs({ inputs, onChange, onCalculate }: Props) {
  function updateChildCount(count: number) {
    const details: ChildDetail[] = Array.from({ length: count }, (_, i) =>
      inputs.childrenDetails[i] ?? { name: '', dob: '', gender: 'Male' }
    );
    onChange({ ...inputs, children: count, childrenDetails: details });
  }

  const s: React.CSSProperties = {
    border: '1px solid #C8C9C7',
    borderRadius: '6px',
    padding: '8px',
    width: '100%',
    fontSize: '14px',
    background: '#fff',
    outline: 'none',
  };
  const label: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 700,
    color: '#53565A',
    marginBottom: '4px',
  };

  return (
    <section style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Adult 1 + Adult 2 */}
      <div style={{ background: '#fff', border: '1px solid #C8C9C7', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#53565A', borderBottom: '1px solid #C8C9C7', paddingBottom: '12px', marginBottom: '20px' }}>
          Step 1: Client &amp; Household Details
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Adult 1 */}
          <div>
            <h3 style={{ display: 'inline-block', background: '#53565A', color: '#FDB725', fontWeight: 700, padding: '4px 12px', borderRadius: '6px', marginBottom: '16px', fontSize: '15px' }}>
              Adult 1 (Primary)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={label}>Full Name</label>
                <input style={s} type="text" value={inputs.a1.name} onChange={e => onChange(setA1(inputs, { name: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={label}>DOB</label>
                  <input style={s} type="date" value={inputs.a1.dob} onChange={e => onChange(setA1(inputs, { dob: e.target.value }))} />
                </div>
                <div>
                  <label style={label}>Gender</label>
                  <select style={s} value={inputs.a1.gender} onChange={e => onChange(setA1(inputs, { gender: e.target.value as Gender }))}>
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={label}>Occupation</label>
                <input style={s} type="text" value={inputs.a1.occ} onChange={e => onChange(setA1(inputs, { occ: e.target.value }))} />
              </div>
              <div>
                <label style={label}>Employment Status</label>
                <select style={s} value={inputs.a1.emp} onChange={e => onChange(setA1(inputs, { emp: e.target.value as EmploymentStatus }))}>
                  {empOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={label}>Gross Income ($)</label>
                  <input style={s} type="number" value={inputs.a1.income} onChange={e => onChange(setA1(inputs, { income: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div>
                  <label style={label}>Smoker?</label>
                  <select style={s} value={inputs.a1.smoker} onChange={e => onChange(setA1(inputs, { smoker: e.target.value as YesNo }))}>
                    <option>No</option><option>Yes</option>
                  </select>
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#53565A' }}>
                <input type="checkbox" checked={inputs.a1.hours} onChange={e => onChange(setA1(inputs, { hours: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: '#FDB725' }} />
                Works 25+ hours/week?
              </label>
            </div>
          </div>

          {/* Adult 2 */}
          <div style={{ background: '#f8f9fa', border: '1px solid #C8C9C7', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #C8C9C7', paddingBottom: '10px', marginBottom: '14px' }}>
              <h3 style={{ display: 'inline-block', background: '#53565A', color: '#FDB725', fontWeight: 700, padding: '4px 12px', borderRadius: '6px', fontSize: '15px', margin: 0 }}>
                Adult 2 (Partner)
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#53565A', cursor: 'pointer' }}>
                Include Partner?
                <input type="checkbox" checked={inputs.hasPartner} onChange={e => onChange({ ...inputs, hasPartner: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#FDB725' }} />
              </label>
            </div>
            <div style={{ opacity: inputs.hasPartner ? 1 : 0.4, pointerEvents: inputs.hasPartner ? 'auto' : 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={label}>Full Name</label>
                <input style={s} type="text" value={inputs.a2.name} onChange={e => onChange(setA2(inputs, { name: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={label}>DOB</label>
                  <input style={s} type="date" value={inputs.a2.dob} onChange={e => onChange(setA2(inputs, { dob: e.target.value }))} />
                </div>
                <div>
                  <label style={label}>Gender</label>
                  <select style={s} value={inputs.a2.gender} onChange={e => onChange(setA2(inputs, { gender: e.target.value as Gender }))}>
                    <option>Female</option><option>Male</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={label}>Occupation</label>
                <input style={s} type="text" value={inputs.a2.occ} onChange={e => onChange(setA2(inputs, { occ: e.target.value }))} />
              </div>
              <div>
                <label style={label}>Employment Status</label>
                <select style={s} value={inputs.a2.emp} onChange={e => onChange(setA2(inputs, { emp: e.target.value as EmploymentStatus }))}>
                  {empOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={label}>Gross Income ($)</label>
                  <input style={s} type="number" value={inputs.a2.income} onChange={e => onChange(setA2(inputs, { income: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div>
                  <label style={label}>Smoker?</label>
                  <select style={s} value={inputs.a2.smoker} onChange={e => onChange(setA2(inputs, { smoker: e.target.value as YesNo }))}>
                    <option>No</option><option>Yes</option>
                  </select>
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#53565A' }}>
                <input type="checkbox" checked={inputs.a2.hours} onChange={e => onChange(setA2(inputs, { hours: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: '#FDB725' }} />
                Works 25+ hours/week?
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      <div style={{ background: '#fff', border: '1px solid #C8C9C7', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #C8C9C7', paddingBottom: '10px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#53565A', margin: 0 }}>Children (Dependants)</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#53565A' }}>Total Children:</label>
            <select style={{ ...s, width: 'auto', padding: '6px 10px', fontWeight: 700 }} value={inputs.children} onChange={e => updateChildCount(parseInt(e.target.value))}>
              {childCounts.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {inputs.children > 0 && (
          <>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ ...label, marginBottom: '6px' }}>Children aged under 3:</label>
              <select style={{ ...s, width: 'auto', padding: '6px 10px' }} value={inputs.childrenUnder3}
                onChange={e => onChange({ ...inputs, childrenUnder3: Math.min(parseInt(e.target.value), inputs.children) })}>
                {Array.from({ length: inputs.children + 1 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
              {inputs.childrenDetails.map((child, i) => (
                <div key={i} style={{ background: '#f8f9fa', border: '1px solid #C8C9C7', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontWeight: 700, color: '#53565A', fontSize: '13px', marginBottom: '10px' }}>Child {i + 1}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <label style={label}>Name</label>
                      <input style={s} type="text" value={child.name} onChange={e => {
                        const d = [...inputs.childrenDetails]; d[i] = { ...d[i], name: e.target.value };
                        onChange({ ...inputs, childrenDetails: d });
                      }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={label}>DOB</label>
                        <input style={s} type="date" value={child.dob} onChange={e => {
                          const d = [...inputs.childrenDetails]; d[i] = { ...d[i], dob: e.target.value };
                          onChange({ ...inputs, childrenDetails: d });
                        }} />
                      </div>
                      <div>
                        <label style={label}>Gender</label>
                        <select style={s} value={child.gender} onChange={e => {
                          const d = [...inputs.childrenDetails]; d[i] = { ...d[i], gender: e.target.value };
                          onChange({ ...inputs, childrenDetails: d });
                        }}>
                          <option>Male</option><option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Assets & Liabilities */}
      <div style={{ background: '#fff', border: '1px solid #C8C9C7', borderRadius: '12px', padding: '24px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#53565A', borderBottom: '1px solid #C8C9C7', paddingBottom: '10px', marginBottom: '16px' }}>Assets &amp; Liabilities</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {/* Home */}
          <div style={{ background: '#f8f9fa', border: '1px solid #C8C9C7', borderRadius: '10px', padding: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#53565A', fontSize: '14px', cursor: 'pointer', marginBottom: '10px' }}>
              <input type="checkbox" checked={inputs.hasHome} onChange={e => onChange({ ...inputs, hasHome: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#FDB725' }} />
              Owns Primary Home
            </label>
            {inputs.hasHome && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <label style={{ ...label, fontSize: '12px' }}>Mortgage Principal ($)</label>
                  <input style={s} type="number" value={inputs.homePrin} onChange={e => onChange({ ...inputs, homePrin: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label style={{ ...label, fontSize: '12px' }}>Monthly Repayment ($)</label>
                  <input style={s} type="number" value={inputs.homeRepay} onChange={e => onChange({ ...inputs, homeRepay: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>
            )}
          </div>

          {/* Investment property */}
          <div style={{ background: '#f8f9fa', border: '1px solid #C8C9C7', borderRadius: '10px', padding: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#53565A', fontSize: '14px', cursor: 'pointer', marginBottom: '10px' }}>
              <input type="checkbox" checked={inputs.hasInv} onChange={e => onChange({ ...inputs, hasInv: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#FDB725' }} />
              Owns Investment Property
            </label>
            {inputs.hasInv && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <label style={{ ...label, fontSize: '12px' }}>Total Inv. Mortgage ($)</label>
                  <input style={s} type="number" value={inputs.invPrin} onChange={e => onChange({ ...inputs, invPrin: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label style={{ ...label, fontSize: '12px' }}>Monthly Repayment ($)</label>
                  <input style={s} type="number" value={inputs.invRepay} onChange={e => onChange({ ...inputs, invRepay: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label style={{ ...label, fontSize: '12px' }}>Monthly Rates ($)</label>
                  <input style={s} type="number" value={inputs.invRates} onChange={e => onChange({ ...inputs, invRates: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label style={{ ...label, fontSize: '12px' }}>Monthly Rent Received ($)</label>
                  <input style={s} type="number" value={inputs.invRent} onChange={e => onChange({ ...inputs, invRent: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>
            )}
          </div>

          {/* Liquidity */}
          <div style={{ background: '#f8f9fa', border: '1px solid #C8C9C7', borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontWeight: 700, color: '#53565A', fontSize: '14px', borderBottom: '1px solid #C8C9C7', paddingBottom: '8px', marginBottom: '10px' }}>
              Liquidity &amp; Other Debts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ ...label, fontSize: '12px' }}>Liquid Savings ($)</label>
                <input style={s} type="number" value={inputs.savings} onChange={e => onChange({ ...inputs, savings: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <label style={{ ...label, fontSize: '12px' }}>Other Personal Debt ($)</label>
                <input style={s} type="number" value={inputs.otherDebt} onChange={e => onChange({ ...inputs, otherDebt: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <label style={{ ...label, fontSize: '12px' }}>Expected Funeral Costs ($)</label>
                <input style={s} type="number" value={inputs.funeralCosts} onChange={e => onChange({ ...inputs, funeralCosts: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculate button */}
      <div style={{ textAlign: 'right', paddingBottom: '40px' }}>
        <button
          onClick={onCalculate}
          style={{ background: '#53565A', color: '#fff', padding: '14px 36px', borderRadius: '10px', fontWeight: 700, fontSize: '16px', border: '2px solid #53565A', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#3a3d40')}
          onMouseLeave={e => (e.currentTarget.style.background = '#53565A')}
        >
          Calculate Shortfalls &amp; Recommendations &rarr;
        </button>
      </div>
    </section>
  );
}
