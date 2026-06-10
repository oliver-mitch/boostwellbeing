/**
 * TCS NZ Proposal Companion — Reference Prototype
 *
 * Approved React prototype (pre-adaptation).
 * Calculation logic and section order are the authoritative reference for
 * the production page at src/app/portal/clients/tcs/page.tsx.
 *
 * Design: Poppins headings · Inter body · brand #4D90DE blue, #21B1A6 teal, #0F172A navy
 *
 * Acceptance criteria (defaults: Entry risk, Wellbeing One $500, 39 staff, age 46):
 *   Combined:  ~$61/person/week · $124,371/year
 *   Recap:     $3,189 per head · $124,371 total
 *   Per-head:  $450 (absenteeism) / $482 (presenteeism) / $408 (turnover) / $1,849 (health value)
 *
 * Toggling Enhanced risk, Wellbeing Two, or no-excess updates all figures live.
 * $500 plans are flagged "on us" (BoostWellbeing covers the premium).
 */

import React, { useState, useMemo } from 'react';

// ─── Calculation model ────────────────────────────────────────────────────────
const BASE = {
  absenteeism: 450,
  presenteeism: 482,
  turnover: 408,
  healthValue: 1849,
};

const RISK_MULT = { entry: 1, enhanced: 1.35 };

const PLAN_HEALTH_MULT = {
  wb_1_500: 1.0,   // Wellbeing One $500 (on us)
  wb_2_500: 1.3,   // Wellbeing Two $500 (on us)
  wb_1:     1.15,  // Wellbeing One (no excess)
  wb_2:     1.45,  // Wellbeing Two (no excess)
};

const PLANS = [
  { code: 'wb_1_500', label: 'Wellbeing One', sub: '$500 excess', onUs: true },
  { code: 'wb_2_500', label: 'Wellbeing Two', sub: '$500 excess', onUs: true },
  { code: 'wb_1',     label: 'Wellbeing One', sub: 'No excess',   onUs: false },
  { code: 'wb_2',     label: 'Wellbeing Two', sub: 'No excess',   onUs: false },
];

function calcMetrics(risk, plan, age, staff) {
  const rm = RISK_MULT[risk];
  const af = age / 46;  // age factor: 1.0 at baseline age 46
  const phm = PLAN_HEALTH_MULT[plan] ?? 1;

  const absenteeism = Math.round(BASE.absenteeism * rm * af);
  const presenteeism = Math.round(BASE.presenteeism * rm * af);
  const turnover = Math.round(BASE.turnover * rm * af);
  const healthValue = Math.round(BASE.healthValue * rm * phm * af);

  const perHead = absenteeism + presenteeism + turnover + healthValue;
  const annual = perHead * staff;
  const weekly = annual / staff / 52;

  return { absenteeism, presenteeism, turnover, healthValue, perHead, annual, weekly };
}

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-NZ');

// ─── Styles ───────────────────────────────────────────────────────────────────
const BLUE  = '#4D90DE';
const TEAL  = '#21B1A6';
const NAVY  = '#0F172A';
const BLUE2 = '#3A7AC8';

const styles = {
  page:    { fontFamily: 'Inter, system-ui, sans-serif', background: '#F8FAFC', minHeight: '100vh', padding: '0 0 48px' },
  header:  { background: NAVY, color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  h1:      { fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, margin: 0 },
  main:    { maxWidth: 960, margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 24 },
  card:    { background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24 },
  hero:    { background: `linear-gradient(135deg, ${NAVY}, #2C4258)`, borderRadius: 16, padding: 24, color: '#fff' },
  label:   { fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#94A3B8' },
  bigNum:  { fontFamily: 'Poppins, sans-serif', fontSize: 36, fontWeight: 700, margin: '4px 0' },
  grid4:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 },
  metCard: (color) => ({ borderRadius: 16, border: `1px solid ${color}30`, background: `${color}08`, padding: 20 }),
  metVal:  { fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 700, margin: '8px 0 2px' },
  btn:     (active, color) => ({
    padding: '10px 16px', borderRadius: 12, border: `1px solid ${active ? color : '#CBD5E1'}`,
    background: active ? color : '#F8FAFC', color: active ? '#fff' : '#475569',
    fontWeight: 600, cursor: 'pointer', fontSize: 13, textAlign: 'left', transition: 'all .15s',
  }),
  pill:    { fontSize: 10, fontWeight: 700, background: `${TEAL}18`, color: TEAL, padding: '2px 7px', borderRadius: 99, marginLeft: 6 },
};

// ─── Prototype component ──────────────────────────────────────────────────────
export default function TcsProposalCompanion() {
  const [risk, setRisk]   = useState('entry');
  const [plan, setPlan]   = useState('wb_1_500');
  const [staff, setStaff] = useState(39);
  const [age, setAge]     = useState(46);

  const m = useMemo(() => calcMetrics(risk, plan, age, staff), [risk, plan, age, staff]);

  const metrics = [
    { label: 'Absenteeism',    sub: 'Sick days & recovery', value: m.absenteeism,  color: BLUE },
    { label: 'Presenteeism',   sub: 'Lost productivity',    value: m.presenteeism,  color: TEAL },
    { label: 'Staff Turnover', sub: 'Health-related exits', value: m.turnover,      color: BLUE2 },
    { label: 'Health Coverage',sub: 'Annual plan value',    value: m.healthValue,   color: NAVY },
  ];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.h1}>TCS NZ — Health Proposal Companion</h1>
        <span style={{ fontSize: 13, color: '#94A3B8' }}>BoostWellbeing · Confidential</span>
      </div>

      <div style={styles.main}>

        {/* Hero summary */}
        <div style={styles.hero}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={styles.label}>Southern Cross · {staff} employees · Age {age}</p>
              <p style={{ ...styles.bigNum, fontSize: 42 }}>{fmt(m.annual)}<span style={{ fontSize: 16, fontWeight: 400, marginLeft: 8, color: '#94A3B8' }}>/ year</span></p>
              <p style={{ color: '#CBD5E1', fontSize: 14 }}>{fmt(m.weekly)} per person per week</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={styles.label}>Per head</p>
              <p style={{ ...styles.bigNum, fontSize: 32 }}>{fmt(m.perHead)}</p>
              <p style={{ color: '#CBD5E1', fontSize: 13 }}>annual value per employee</p>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div style={styles.card}>
          <p style={{ ...styles.label, color: '#64748B', marginBottom: 16 }}>Configure scenario</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>

            {/* Risk */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Risk profile</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['entry', 'enhanced'].map(r => (
                  <button key={r} onClick={() => setRisk(r)} style={styles.btn(risk === r, BLUE)}>
                    {r === 'entry' ? 'Entry' : 'Enhanced'}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Health plan</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {PLANS.map(p => (
                  <button key={p.code} onClick={() => setPlan(p.code)} style={styles.btn(plan === p.code, BLUE)}>
                    <span style={{ display: 'block' }}>{p.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 400, color: plan === p.code ? '#BFDBFE' : '#94A3B8' }}>
                      {p.sub}
                      {p.onUs && <span style={styles.pill}>on us</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Staff slider */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
                <span>Staff count</span><span style={{ color: BLUE }}>{staff}</span>
              </label>
              <input type="range" min={5} max={200} value={staff} onChange={e => setStaff(+e.target.value)}
                style={{ width: '100%', accentColor: BLUE, marginTop: 6 }} />
            </div>

            {/* Age slider */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
                <span>Average age</span><span style={{ color: BLUE }}>{age} yrs</span>
              </label>
              <input type="range" min={25} max={65} value={age} onChange={e => setAge(+e.target.value)}
                style={{ width: '100%', accentColor: BLUE, marginTop: 6 }} />
            </div>
          </div>
        </div>

        {/* Four per-head metric cards */}
        <div style={styles.grid4}>
          {metrics.map(({ label, sub, value, color }) => (
            <div key={label} style={styles.metCard(color)}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</p>
              <p style={{ ...styles.metVal, color }}>{fmt(value)}</p>
              <p style={{ fontSize: 11, color: '#64748B' }}>per head / year</p>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Recap table */}
        <div style={styles.card}>
          <p style={{ ...styles.label, color: '#64748B', marginBottom: 16 }}>Investment recap</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              {[
                ['Staff', staff],
                ['Average age', `${age} years`],
                ['Risk profile', risk === 'entry' ? 'Entry' : 'Enhanced'],
                ['Plan', `${PLANS.find(p => p.code === plan)?.label} (${PLANS.find(p => p.code === plan)?.sub})`],
                ['Per head (annual)', fmt(m.perHead)],
                ['Total annual value', fmt(m.annual)],
                ['Per person per week', fmt(m.weekly)],
              ].map(([k, v], i) => (
                <tr key={k} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 0', color: '#64748B' }}>{k}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: i >= 4 ? 700 : 500, color: i >= 4 ? NAVY : '#1E293B' }}>
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', lineHeight: 1.6 }}>
          Values are modelled from NZIER and Southern Cross industry benchmarks. "On us" plans are covered by
          BoostWellbeing — no premium cost to TCS. Indicative only; subject to Southern Cross underwriting.
          Effective rates: 01 January 2026. Confidential — TCS NZ internal use only.
        </p>
      </div>
    </div>
  );
}
