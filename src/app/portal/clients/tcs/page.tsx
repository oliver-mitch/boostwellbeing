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
// Base values: Entry risk, age 46, Wellbeing One $500
const BASE = {
  absenteeism: 450,
  presenteeism: 482,
  turnover: 408,
  healthValue: 1849,
} as const;

const RISK_MULT = { entry: 1, enhanced: 1.35 } as const;

const PLAN_HEALTH_MULT: Record<string, number> = {
  wb_1_500: 1.0,
  wb_2_500: 1.3,
  wb_1: 1.15,
  wb_2: 1.45,
};

function calcMetrics(
  risk: 'entry' | 'enhanced',
  plan: string,
  age: number,
  staff: number
) {
  const rm = RISK_MULT[risk];
  const af = age / 46;
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
      label: 'Absenteeism',
      sub: 'Cost of sick days & recovery time',
      value: m.absenteeism,
      icon: Clock,
      color: '#4D90DE',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-[#4D90DE]',
    },
    {
      label: 'Presenteeism',
      sub: 'Productivity lost while at work',
      value: m.presenteeism,
      icon: TrendingDown,
      color: '#21B1A6',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-[#21B1A6]',
    },
    {
      label: 'Staff Turnover',
      sub: 'Health-related resignations & replacements',
      value: m.turnover,
      icon: Users,
      color: '#3A7AC8',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-[#3A7AC8]',
    },
    {
      label: 'Health Coverage',
      sub: 'Annual plan value per employee',
      value: m.healthValue,
      icon: HeartPulse,
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
                This interactive companion models the annual value of group health cover for your
                team. Adjust the settings below to explore different scenarios.
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs">Total annual value</p>
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
                    BoostWellbeing covers this plan — no premium cost to TCS
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
              Value breakdown per employee
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-48 h-48 flex-shrink-0">
                <DonutChart
                  values={[m.absenteeism, m.presenteeism, m.turnover, m.healthValue]}
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
              Investment summary
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
                Productivity values (absenteeism, presenteeism, turnover) are modelled from NZIER and
                Southern Cross industry research benchmarks, scaled to the selected risk profile and
                average employee age. Entry risk reflects a standard NZ workforce health profile;
                Enhanced reflects a higher-risk cohort.
              </p>
              <p>
                Health coverage value represents the estimated annual value of the selected Southern
                Cross plan per employee, accounting for excess level and plan tier. Plan rates are
                effective 01 January 2026.
              </p>
              <p>
                <strong className="text-slate-700">On us</strong> plans (Wellbeing One $500 and
                Wellbeing Two $500) are provided at no premium cost to TCS as part of the BoostWellbeing
                arrangement. Final pricing subject to Southern Cross underwriting. This tool is for
                indicative purposes only.
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
