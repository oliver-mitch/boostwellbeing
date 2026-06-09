"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, Loader2, AlertCircle, TrendingDown, Users, Baby, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanCode = "wb1" | "wb2";
type ExcessCode = "nil" | "500";

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
    code: "wb1",
    label: "Wellbeing One",
    description: "Essential hospital cover — a solid entry-level plan.",
  },
  {
    code: "wb2",
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
        min={18}
        max={73}
        value={age}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-blue cursor-pointer h-2 rounded-lg"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>18</span>
        <span>73</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SavingsCalculator() {
  // ── State ──
  const [plan, setPlan] = useState<PlanCode>("wb2");
  const [excess, setExcess] = useState<ExcessCode>("nil");
  const [primaryAge, setPrimaryAge] = useState(38);
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerAge, setPartnerAge] = useState(36);
  const [numChildren, setNumChildren] = useState(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accordionOpen, setAccordionOpen] = useState(false);

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
          body: JSON.stringify({ plan, excess, adults, numChildren }),
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
        excess,
        hasPartner: hasPartner ? 1 : 0,
        numChildren,
        annualSaving: data.annualSaving,
      });
    } catch (err) {
      setError("Unable to calculate quote right now. Please try again or call us.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [plan, excess, primaryAge, hasPartner, partnerAge, numChildren]);

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
                  onClick={() => { setNumChildren(n); setResult(null); }}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold border transition-colors ${
                    numChildren === n
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "border-slate-200 text-slate-700 hover:border-brand-blue/50"
                  }`}
                  aria-pressed={numChildren === n}
                >
                  {n === 4 ? "4+" : n}
                </button>
              ))}
            </div>
          </div>

          {/* Excess */}
          <div>
            <span className="block text-sm font-medium text-slate-700 mb-2">Hospital excess</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: "nil" as const, label: "Nil excess", sub: "Highest cover" },
                { code: "500" as const, label: "$500 excess", sub: "Lower premium" },
              ].map((e) => (
                <button
                  key={e.code}
                  onClick={() => { setExcess(e.code); setResult(null); }}
                  className={`py-2.5 px-3 rounded-lg border text-left text-sm transition-colors ${
                    excess === e.code
                      ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                      : "border-slate-200 text-slate-700 hover:border-brand-blue/50"
                  }`}
                  aria-pressed={excess === e.code}
                >
                  <span className="block font-semibold">{e.label}</span>
                  <span className={`text-xs ${excess === e.code ? "text-brand-blue/70" : "text-slate-500"}`}>{e.sub}</span>
                </button>
              ))}
            </div>
          </div>

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
                <p className="text-5xl font-bold text-brand-teal">
                  {formatNZD(result.annualSaving)}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  that&apos;s <span className="font-semibold text-slate-700">{formatNZD(result.monthlySaving)}/month</span> back in your pocket
                </p>
              </div>
              <div className="border-t border-brand-teal/10 pt-3">
                <p className="text-xs text-slate-500 text-center">
                  Indicative annual premium through Boost:{" "}
                  <span className="font-semibold text-slate-700">{formatNZD(result.indicativeAnnualPremium)}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Compliance Disclosure — must remain visible near calculator ── */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 space-y-2">
        <p className="font-semibold">Before switching — please note:</p>
        <ul className="list-disc list-inside space-y-1 text-amber-800">
          <li>
            Switching health insurers may affect cover for{" "}
            <strong>pre-existing conditions</strong>. Always seek advice before
            switching.
          </li>
          <li>
            This calculation is <strong>indicative only</strong>. Your actual
            premium is subject to underwriting by Southern Cross Health
            Society.
          </li>
          <li>
            Rates are based on the Southern Cross rate card effective 1 January
            2026 and are subject to change.
          </li>
        </ul>
      </div>

      {/* ── How does this work? accordion — collapsed by default, below trust ── */}
      {/* This section is intentionally rendered below the trust section in page.tsx */}
    </div>
  );
}

// ─── Accordion (separate export, rendered in page below Trust) ────────────────

export function HowItWorksAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
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
        <div className="px-5 pb-5 pt-1 bg-white border-t border-slate-100 text-sm text-slate-600 space-y-3">
          <p>
            Southern Cross Health Society is New Zealand&apos;s largest health
            insurer. When you purchase health cover through an employer group
            scheme like Boost Wellbeing, Southern Cross offers a{" "}
            <strong>group discount</strong> compared to buying directly as an
            individual.
          </p>
          <p>
            The saving shown is the estimated difference between what you&apos;d
            pay buying directly from Southern Cross and what you&apos;d pay
            through Boost&apos;s group scheme, based on the Southern Cross rate
            card effective 1 January 2026.
          </p>
          <p>
            Your premium is calculated based on the age of each person covered
            and the plan you choose. Children under 21 are covered at a fixed
            child rate.
          </p>
          <p className="text-xs text-slate-400 pt-1">
            Boost Wellbeing Ltd is a Financial Advice Provider. See our{" "}
            {/* TODO (§8): Replace with FAP disclosure URL once approved */}
            <span className="underline text-slate-500 cursor-default">
              Financial Advice Provider disclosure [TODO: link]
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}
