"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, Loader2, AlertCircle, TrendingDown, Baby, Heart, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanCode = "WB1" | "WB2";

interface QuoteResult {
  annualSaving: number;
  monthlySaving: number;
  indicativeAnnualPremium: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNZD(value: number): string {
  return value.toLocaleString("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function ageLabel(n: number): string {
  return `${n} year${n !== 1 ? "s" : ""} old`;
}

const PLAN_OPTIONS: { code: PlanCode; label: string; description: string }[] = [
  {
    code: "WB1",
    label: "Wellbeing One",
    description: "Essential hospital cover — a solid entry-level plan.",
  },
  {
    code: "WB2",
    label: "Wellbeing Two",
    description: "Enhanced hospital cover with broader specialist access.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AgeInput({
  label,
  age,
  onChange,
}: {
  label: string;
  age: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span className="text-brand-blue font-semibold">{ageLabel(age)}</span>
      </div>
      <input
        type="range"
        min={21}
        max={70}
        value={age}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-blue cursor-pointer h-2 rounded-lg"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>21</span>
        <span>70</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SavingsCalculator() {
  // ── State ──
  const [plan, setPlan] = useState<PlanCode>("WB2");
  const [primaryAge, setPrimaryAge] = useState(38);
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerAge, setPartnerAge] = useState(36);
  const [kids, setKids] = useState(0);
  const [healthyLifestyle, setHealthyLifestyle] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Quote request ──
  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setError("Configuration error — please contact us directly.");
      setLoading(false);
      return;
    }

    const adults = hasPartner ? [primaryAge, partnerAge] : [primaryAge];

    try {
      const res = await fetch(
        `${supabaseUrl}/functions/v1/retail-savings-quote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ plan, adults, kids, healthyLifestyle }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data: QuoteResult = await res.json();
      setResult(data);

      trackEvent("retail_savings_quote", {
        plan,
        hasPartner: hasPartner ? 1 : 0,
        kids,
        healthyLifestyle: healthyLifestyle ? 1 : 0,
        annualSaving: data.annualSaving,
      });
    } catch {
      setError("Unable to calculate quote right now. Please try again or call us.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [plan, primaryAge, hasPartner, partnerAge, kids, healthyLifestyle]);

  // Width of the "your premium" bar relative to the no-excess premium (visual only).
  const noExcessPremium = result ? result.indicativeAnnualPremium + result.annualSaving : 0;
  const yourBarPct = noExcessPremium > 0 ? (result!.indicativeAnnualPremium / noExcessPremium) * 100 : 100;

  // ── Render ──
  return (
    <div className="space-y-8">
      {/* ── Calculator Card ── */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Plan selector */}
        <div className="grid grid-cols-2 border-b border-slate-100">
          {PLAN_OPTIONS.map((p) => (
            <button
              key={p.code}
              onClick={() => { setPlan(p.code); setResult(null); }}
              className={`py-4 px-5 text-left transition-colors ${
                plan === p.code
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
              aria-pressed={plan === p.code}
            >
              <span className="block font-semibold text-sm">{p.label}</span>
              <span className={`block text-xs mt-0.5 ${plan === p.code ? "text-blue-100" : "text-slate-500"}`}>
                {p.description}
              </span>
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Ages */}
          <div className="space-y-5">
            <AgeInput label="Your age" age={primaryAge} onChange={(v) => { setPrimaryAge(v); setResult(null); }} />

            {/* Partner toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setHasPartner(!hasPartner); setResult(null); }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${
                  hasPartner ? "bg-brand-blue" : "bg-slate-200"
                }`}
                aria-checked={hasPartner}
                role="switch"
                aria-label="Include partner"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    hasPartner ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-slate-700 font-medium">
                {hasPartner ? "Including partner" : "Add a partner?"}
              </span>
            </div>

            {hasPartner && (
              <AgeInput label="Partner's age" age={partnerAge} onChange={(v) => { setPartnerAge(v); setResult(null); }} />
            )}
          </div>

          {/* Children */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Baby className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Children (under 21)</span>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => { setKids(n); setResult(null); }}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold border transition-colors ${
                    kids === n
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "border-slate-200 text-slate-700 hover:border-brand-blue/50"
                  }`}
                  aria-pressed={kids === n}
                >
                  {n === 4 ? "4+" : n}
                </button>
              ))}
            </div>
            {kids > 2 && (
              <p className="text-xs text-slate-500 mt-2">
                Southern Cross rates only the first two children — additional
                children are covered at no extra premium.
              </p>
            )}
          </div>

          {/* Healthy Lifestyle Reward */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={healthyLifestyle}
              onChange={(e) => { setHealthyLifestyle(e.target.checked); setResult(null); }}
              className="mt-0.5 h-4 w-4 rounded accent-brand-teal cursor-pointer"
            />
            <span className="text-sm text-slate-700">
              <span className="font-medium flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-brand-teal" />
                Healthy Lifestyle Reward
              </span>
              <span className="text-xs text-slate-500">
                10% off adult premiums if eligible (non-smoker, healthy measures).
              </span>
            </span>
          </label>

          {/* CTA Button */}
          <button
            onClick={fetchQuote}
            disabled={loading}
            className="w-full py-3.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Calculating…
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4" />
                Calculate my saving
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result */}
          {result && !error && (
            <div className="rounded-xl border border-brand-teal/20 bg-gradient-to-br from-teal-50 to-white p-5 space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-500 mb-1">Estimated annual saving</p>
                <p className="text-5xl font-bold text-brand-teal tabular-nums">
                  {formatNZD(result.annualSaving)}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  that&apos;s{" "}
                  <span className="font-semibold text-slate-700 tabular-nums">
                    {formatNZD(result.monthlySaving)}/month
                  </span>{" "}
                  back in your pocket
                </p>
              </div>

              {/* No-excess vs your-premium comparison */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Nil-excess premium</span>
                    <span className="tabular-nums">{formatNZD(noExcessPremium)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 font-medium mb-1">
                    <span>Your $500-excess premium</span>
                    <span className="tabular-nums">{formatNZD(result.indicativeAnnualPremium)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-teal transition-all"
                      style={{ width: `${yourBarPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* $500 excess — on us chip */}
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  $500 excess — on us
                </span>
              </div>

              <p className="text-xs text-slate-400 text-center pt-1">
                Indicative only — not a quote. Confirmed by Southern Cross on application.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Switching / pre-existing note — must remain visible near calculator (§6.7) ── */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p>
          <strong>Coming from another insurer?</strong> Switching can affect
          cover for <strong>pre-existing conditions</strong> and stand-downs —
          we&apos;ll check it with you first.
        </p>
      </div>
    </div>
  );
}

// ─── Accordion (separate export, rendered in page below Trust) ────────────────
// De-emphasised, collapsed by default (§6.6). Explains the $500-excess
// reimbursement mechanism in three short steps — kept visually quiet.

export function HowItWorksAccordion() {
  const [open, setOpen] = useState(false);

  const steps = [
    "You choose the $500-excess version of your Southern Cross Wellbeing plan — identical cover, lower premium.",
    "Southern Cross applies the $500 excess once, on your first eligible claim each policy year.",
    "BoostWellbeing (with Risk Solutions Ltd) reimburses that $500 — so you keep the lower premium and the excess is on us.",
  ];

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-slate-600">How does this work?</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-200 text-sm text-slate-600">
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-slate-400 pt-4">
            The $500 excess reimbursement is provided by BoostWellbeing (with
            Risk Solutions Ltd), not by Southern Cross. The saving shown is the
            difference between the Nil-excess and $500-excess premiums on the
            same Southern Cross plan — it is not a switch-and-save between
            insurers.
          </p>
        </div>
      )}
    </div>
  );
}
