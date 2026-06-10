'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  ArrowLeft,
  LogOut,
  Users,
  Clock,
  TrendingDown,
  HeartPulse,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

// ─── Calculation model ────────────────────────────────────────────────────────
// Source of truth: TCS NZ proposal dated 3 June 2026 (spec doc cb2b7d01).
// Census: 39 NZ lives, average age 46. These are the REAL proposal figures —
// do not invent.
//
//  • Risk (Fidelity Life): annual premium TOTALS for the 39-life census, per
//    line. Scales LINEARLY by headcount only — risk does NOT vary with age here
//    (per spec §3). Enhanced is its own line mix, not a flat multiple of Entry.
//  • Health (Southern Cross Wellbeing, group-discounted, incl GST): annual
//    premium TOTALS per plan. Per-head scales along the SC rate curve,
//    normalised so age 46 = the proposal figure exactly.

const CENSUS = 39;

const RISK_TOTALS = {
  entry:    { life: 17549, trauma: 18812, ip: 15908 }, // total 52,269
  enhanced: { life: 27133, trauma: 18812, ip: 47503 }, // total 93,448
} as const;

const HEALTH_TOTALS: Record<string, number> = {
  wb_1_500: 72102,  // Wellbeing One · $500 excess  (recommended default)
  wb_1:     83355,  // Wellbeing One · no excess
  wb_2_500: 122070, // Wellbeing Two · $500 excess
  wb_2:     141121, // Wellbeing Two · no excess
};

// Health age curve = ratio to age 46, derived from the real Southern Cross
// workplace rate card (EMPLOYEE_PLANS), ages 25–65. WB1 plans use the WB1
// curve, WB2 the WB2 curve. Ratios only — the dollar rate card never ships to
// the client. age 46 → 1.0 (index 21), so the proposal figure is reproduced.
const AGE_MIN = 25;
const AGE_MAX = 65;
const HEALTH_AGE_CURVE: Record<'wb1' | 'wb2', number[]> = {
  wb1: [0.525,0.526,0.529,0.529,0.529,0.529,0.53,0.53,0.53,0.542,0.563,0.6,0.634,0.676,0.705,0.731,0.791,0.83,0.87,0.915,0.959,1,1.039,1.077,1.113,1.137,1.16,1.185,1.219,1.285,1.362,1.44,1.515,1.592,1.717,1.867,1.992,2.118,2.247,2.433,2.627],
  wb2: [0.526,0.529,0.532,0.536,0.543,0.549,0.56,0.565,0.572,0.603,0.623,0.658,0.7,0.735,0.758,0.782,0.813,0.838,0.862,0.908,0.953,1,1.046,1.081,1.113,1.133,1.143,1.163,1.191,1.245,1.308,1.371,1.433,1.496,1.592,1.717,1.798,1.895,1.992,2.122,2.254],
};

const planFamily = (plan: string): 'wb1' | 'wb2' => (plan.startsWith('wb_2') ? 'wb2' : 'wb1');

function healthAgeFactor(plan: string, age: number): number {
  const a = Math.min(AGE_MAX, Math.max(AGE_MIN, Math.round(age)));
  return HEALTH_AGE_CURVE[planFamily(plan)][a - AGE_MIN];
}

function calcMetrics(
  risk: 'entry' | 'enhanced',
  plan: string,
  age: number,
  staff: number
) {
  // Risk: per-head is the census line total / 39 (constant — no age scaling).
  const r = RISK_TOTALS[risk];
  const lifePH   = r.life / CENSUS;
  const traumaPH = r.trauma / CENSUS;
  const ipPH     = r.ip / CENSUS;

  // Health: census per-head, scaled along the SC rate curve (age 46 = 1.0).
  const healthBasePH = (HEALTH_TOTALS[plan] ?? HEALTH_TOTALS.wb_1_500) / CENSUS;
  const healthPH = healthBasePH * healthAgeFactor(plan, age);

  const perHead = lifePH + traumaPH + ipPH + healthPH;
  const riskAnnual = (lifePH + traumaPH + ipPH) * staff;
  const healthAnnual = healthPH * staff;
  const annual = perHead * staff;
  const weekly = annual / staff / 52;

  return {
    // per-head, per line (for the metric cards / donut)
    life: lifePH, trauma: traumaPH, ip: ipPH, health: healthPH,
    riskAnnual, healthAnnual,
    perHead, annual, weekly,
  };
}

// ─── Plan options ─────────────────────────────────────────────────────────────
const PLANS = [
  { code: 'wb_1_500', label: 'Wellbeing One', sub: '$500 excess', onUs: true },
  { code: 'wb_2_500', label: 'Wellbeing Two', sub: '$500 excess', onUs: true },
  { code: 'wb_1',     label: 'Wellbeing One', sub: 'No excess',   onUs: false },
  { code: 'wb_2',     label: 'Wellbeing Two', sub: 'No excess',   onUs: false },
];

// ─── SVG donut chart ──────────────────────────────────────────────────────────
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlicePath(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startDeg: number, endDeg: number
) {
  const o1 = polarToCartesian(cx, cy, outerR, startDeg);
  const o2 = polarToCartesian(cx, cy, outerR, endDeg);
  const i1 = polarToCartesian(cx, cy, innerR, endDeg);
  const i2 = polarToCartesian(cx, cy, innerR, startDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ');
}

const CHART_COLORS = ['#4D90DE', '#21B1A6', '#3A7AC8', '#0F172A'];

interface DonutChartProps {
  values: number[];
  labels: string[];
  total: number;
}

function DonutChart({ values, labels, total }: DonutChartProps) {
  const cx = 100, cy = 100, outerR = 90, innerR = 55;
  let angle = 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {values.map((val, i) => {
        const frac = val / total;
        const sweep = frac * 360;
        const gap = 2;
        const start = angle + (i === 0 ? 0 : gap / 2);
        const end = angle + sweep - (i === values.length - 1 ? 0 : gap / 2);
        angle += sweep;
        return (
          <path
            key={labels[i]}
            d={donutSlicePath(cx, cy, outerR, innerR, start, end)}
            fill={CHART_COLORS[i]}
            opacity={0.9}
          />
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" className="text-2xl font-bold" fill="#0F172A" fontSize="22" fontWeight="700">
        ${total.toLocaleString()}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#64748b" fontSize="10">
        per head / yr
      </text>
    </svg>
  );
}

// ─── Slider component ─────────────────────────────────────────────────────────
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-brand-blue">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-brand-blue"
      />
      <div className="flex justify-between mt-0.5 text-xs text-slate-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

// ─── Currency formatter ───────────────────────────────────────────────────────
const fmt = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-NZ');

// ─── Main page ────────────────────────────────────────────────────────────────
export default function TcsProposalCompanion() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [risk, setRisk] = useState<'entry' | 'enhanced'>('entry');
  const [plan, setPlan] = useState('wb_1_500');
  const [staff, setStaff] = useState(39);
  const [age, setAge]   = useState(46);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/portal/login');
  }, [status, router]);

  const m = useMemo(() => calcMetrics(risk, plan, age, staff), [risk, plan, age, staff]);

  const metrics = [
    {
      label: 'Life',
      sub: 'Fidelity Life — life cover',
      value: m.life,
      icon: Users,
      color: '#4D90DE',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-[#4D90DE]',
    },
    {
      label: 'Trauma',
      sub: 'Fidelity Life — trauma cover',
      value: m.trauma,
      icon: HeartPulse,
      color: '#21B1A6',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-[#21B1A6]',
    },
    {
      label: 'Income Protection',
      sub: 'Fidelity Life — IP cover',
      value: m.ip,
      icon: TrendingDown,
      color: '#3A7AC8',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-[#3A7AC8]',
    },
    {
      label: 'Health',
      sub: 'Southern Cross Wellbeing premium',
      value: m.health,
      icon: Clock,
      color: '#0F172A',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-[#0F172A]',
    },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue" />
      </div>
    );
  }
  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portal</span>
            </Link>
            <span className="text-slate-300">|</span>
            <div>
              <p className="text-xs text-slate-400 leading-none">Proposal Companion</p>
              <h1 className="text-base font-semibold text-slate-900 leading-tight font-poppins">
                TCS NZ
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-600">{session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/portal/login' })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Hero banner ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 sm:p-8 text-white"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #2C4258 100%)' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">
                Southern Cross · BoostWellbeing
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins leading-tight">
                TCS NZ Health Proposal
              </h2>
              <p className="mt-2 text-slate-300 text-sm max-w-lg">
                Companion to your proposal dated 3 June 2026. This models the combined annual
                premium — Fidelity Life risk cover plus Southern Cross health — for your team.
                Adjust the settings below to model cover levels and team size.
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs">Total annual premium</p>
              <p className="text-3xl sm:text-4xl font-bold font-poppins text-white">
                {fmt(m.annual)}
              </p>
              <p className="text-slate-300 text-sm mt-0.5">
                {fmt(m.weekly)}/person/week · {staff} staff
              </p>
            </div>
          </div>
        </div>

        {/* ── Configuration ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900 font-poppins mb-6">
            Configure your scenario
          </h3>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Risk level */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Risk profile</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['entry', 'enhanced'] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setRisk(r)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all border ${
                        risk === r
                          ? 'bg-brand-blue text-white border-brand-blue shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-blue'
                      }`}
                    >
                      {r === 'entry' ? 'Entry' : 'Enhanced'}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  {risk === 'entry'
                    ? 'Standard workforce health profile — lower risk factors'
                    : 'Elevated risk factors — older cohort or higher health exposure'}
                </p>
              </div>

              {/* Plan selector */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Health plan</p>
                <div className="grid grid-cols-2 gap-2">
                  {PLANS.map(p => (
                    <button
                      key={p.code}
                      onClick={() => setPlan(p.code)}
                      className={`relative py-2.5 px-3 rounded-xl text-left text-sm transition-all border ${
                        plan === p.code
                          ? 'bg-brand-blue text-white border-brand-blue shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-blue'
                      }`}
                    >
                      <span className="block font-semibold leading-tight">{p.label}</span>
                      <span className={`block text-xs mt-0.5 ${plan === p.code ? 'text-blue-100' : 'text-slate-500'}`}>
                        {p.sub}
                      </span>
                      {p.onUs && (
                        <span
                          className={`absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            plan === p.code
                              ? 'bg-white/20 text-white'
                              : 'bg-brand-teal/10 text-brand-teal'
                          }`}
                        >
                          <BadgeCheck className="w-2.5 h-2.5" />
                          on us
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {PLANS.find(p => p.code === plan)?.onUs && (
                  <p className="text-xs text-brand-teal font-medium mt-1.5 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    $500 excess on us — reimbursed on the first eligible claim, per person, per year
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <Slider
                label="Number of employees"
                value={staff}
                min={5}
                max={200}
                step={1}
                format={v => `${v} staff`}
                onChange={setStaff}
              />
              <Slider
                label="Average employee age"
                value={age}
                min={25}
                max={65}
                step={1}
                format={v => `${v} years`}
                onChange={setAge}
              />
            </div>
          </div>
        </div>

        {/* ── Results grid ─────────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(({ label, sub, value, icon: Icon, bg, border, text }) => (
            <div
              key={label}
              className={`rounded-2xl border ${border} ${bg} p-5 flex flex-col gap-3`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}
                  style={{ background: 'rgba(255,255,255,0.7)' }}>
                  <Icon className={`w-4 h-4 ${text}`} />
                </div>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
              </div>
              <div>
                <p className={`text-2xl font-bold font-poppins ${text}`}>{fmt(value)}</p>
                <p className="text-xs text-slate-500 mt-0.5">per head / year</p>
              </div>
              <p className="text-xs text-slate-500 leading-tight">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Chart + Recap ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Donut chart */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 font-poppins mb-6">
              Premium breakdown per employee
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-48 h-48 flex-shrink-0">
                <DonutChart
                  values={[m.life, m.trauma, m.ip, m.health]}
                  labels={metrics.map(m => m.label)}
                  total={m.perHead}
                />
              </div>
              <ul className="flex-1 space-y-3">
                {metrics.map(({ label, value, color }) => (
                  <li key={label} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: color }}
                      />
                      <span className="text-sm text-slate-700">{label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-900">{fmt(value)}</span>
                      <span className="text-xs text-slate-400 ml-1">
                        ({Math.round((value / m.perHead) * 100)}%)
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recap table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 font-poppins mb-6">
              Premium summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">Staff headcount</span>
                <span className="text-sm font-semibold text-slate-900">{staff}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">Average age</span>
                <span className="text-sm font-semibold text-slate-900">{age} years</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">Risk profile</span>
                <span className={`text-sm font-semibold ${risk === 'entry' ? 'text-brand-teal' : 'text-amber-600'}`}>
                  {risk === 'entry' ? 'Entry' : 'Enhanced'}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600">Plan</span>
                <span className="text-sm font-semibold text-slate-900 text-right">
                  {PLANS.find(p => p.code === plan)?.label}{' '}
                  <span className="font-normal text-slate-500">
                    {PLANS.find(p => p.code === plan)?.sub}
                  </span>
                </span>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between items-center py-2 rounded-xl px-3 bg-slate-50">
                  <span className="text-sm font-medium text-slate-700">Per head (annual)</span>
                  <span className="text-base font-bold text-slate-900 font-poppins">
                    {fmt(m.perHead)}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center py-3 rounded-xl px-3 text-white"
                  style={{ background: 'linear-gradient(135deg, #4D90DE, #21B1A6)' }}
                >
                  <span className="text-sm font-semibold">Total ({staff} staff)</span>
                  <span className="text-xl font-bold font-poppins">{fmt(m.annual)}</span>
                </div>
                <div className="flex justify-between items-center py-2 rounded-xl px-3 bg-teal-50 border border-teal-100">
                  <span className="text-sm font-medium text-teal-700">Per person per week</span>
                  <span className="text-base font-bold text-teal-700 font-poppins">
                    {fmt(m.weekly)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Disclaimer ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowDisclaimer(d => !d)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-600">Notes &amp; methodology</span>
            {showDisclaimer ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          {showDisclaimer && (
            <div className="px-6 pb-6 text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-4">
              <p>
                Figures are the actual premiums from your proposal dated 3 June 2026, on a census of
                39 NZ lives at an average age of 46. They scale linearly with team size — exact at
                39 lives / age 46, indicative otherwise.
              </p>
              <p>
                <strong className="text-slate-700">Risk</strong> (Life, Trauma, Income Protection) are
                Fidelity Life estimates, salary/age-rated and subject to underwriting above the
                automatic acceptance limits; GST applies to Trauma and Income Protection, Life cover is
                GST-exempt. Risk premiums are scaled by headcount only and do not vary with the average
                age slider.
              </p>
              <p>
                <strong className="text-slate-700">Health</strong> is group-discounted Southern Cross
                Wellbeing cover (incl GST), confirmed by Southern Cross on application. Per-head health
                premium scales along the Southern Cross rate curve, normalised so age 46 matches the
                proposal exactly.
              </p>
              <p>
                <strong className="text-slate-700">$500 excess “on us”:</strong> BoostWellbeing (with
                Risk Solutions Ltd) reimburses the $500 excess on the $500-excess Wellbeing plans —
                first eligible claim, per person, per policy year. This is not provided by Southern
                Cross, and is the reimbursement of the excess, not the premium. On census, Wellbeing One
                $500 ($72,102) vs no-excess ($83,355) keeps roughly $11,253/yr lower premium across 39
                staff. Indicative only — not a quote, contract, or offer of insurance, and not financial
                advice.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <p className="text-center text-xs text-slate-400 pb-4">
          Prepared by BoostWellbeing · Southern Cross authorised representative ·
          Confidential — for TCS NZ internal use only
        </p>
      </main>
    </div>
  );
}
