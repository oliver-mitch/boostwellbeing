"use client";

import { useState, useCallback } from "react";
import { Phone, Info, ArrowRight, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// TODO (§8): Southern Cross broker-authority form URL — the form that authorises
// BoostWellbeing as the member's Southern Cross broker so we can change their plan.
// Oliver to provide. Until set, "Get started" falls back to the Get-more-info form
// so the CTA still captures the lead.
const SC_BROKER_AUTHORITY_FORM_URL = "";

type LeadType = "book_call" | "more_info";

interface FieldCfg {
  key: "name" | "email" | "phone";
  label: string;
  type: string;
  required: boolean;
}

const FORMS: Record<LeadType, { title: string; blurb: string; fields: FieldCfg[]; cta: string }> = {
  book_call: {
    title: "Book a 10-minute call",
    blurb: "Leave your name and number and an adviser will call you back.",
    cta: "Request my call",
    fields: [
      { key: "name", label: "Your name", type: "text", required: true },
      { key: "phone", label: "Mobile number", type: "tel", required: true },
      { key: "email", label: "Email (optional)", type: "email", required: false },
    ],
  },
  more_info: {
    title: "Get more info",
    blurb: "We'll email you the details on how the savings work.",
    cta: "Send me the info",
    fields: [
      { key: "name", label: "Your name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Mobile (optional)", type: "tel", required: false },
    ],
  },
};

function LeadModal({ kind, onClose }: { kind: LeadType; onClose: () => void }) {
  const cfg = FORMS[kind];
  const [values, setValues] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/retail-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: kind, ...values }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      trackEvent("retail_lead_submit", { type: kind });
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }, [kind, values]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={cfg.title}
      >
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="text-lg font-bold text-slate-900">{cfg.title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === "done" ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-brand-teal mx-auto" />
            <p className="font-semibold text-slate-900">Thanks — we've got it.</p>
            <p className="text-sm text-slate-500">
              {kind === "book_call"
                ? "An adviser will be in touch shortly."
                : "Check your inbox for the details."}
            </p>
            <button onClick={onClose} className="mt-2 text-sm font-medium text-brand-blue hover:underline">
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-5">{cfg.blurb}</p>
            <div className="space-y-3">
              {cfg.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm"
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="flex items-start gap-2 mt-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={submit}
              disabled={status === "loading"}
              className="w-full mt-5 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {cfg.cta}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-3">
              Indicative only — not a quote or financial advice. We'll only use your details to follow up.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function LeadCtas() {
  const [modal, setModal] = useState<LeadType | null>(null);

  const openStarted = () => {
    if (SC_BROKER_AUTHORITY_FORM_URL) {
      trackEvent("retail_cta_click", { cta: "get_started" });
      window.open(SC_BROKER_AUTHORITY_FORM_URL, "_blank", "noopener");
    } else {
      // Fallback until the SC authority form URL is provided.
      setModal("more_info");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
        <button
          onClick={() => { trackEvent("retail_cta_click", { cta: "book_call" }); setModal("book_call"); }}
          className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
        >
          <Phone className="w-4 h-4" />
          Book a 10-min call
        </button>
        <button
          onClick={() => { trackEvent("retail_cta_click", { cta: "more_info" }); setModal("more_info"); }}
          className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
        >
          <Info className="w-4 h-4" />
          Get more info
        </button>
        <button
          onClick={openStarted}
          className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg"
        >
          Get started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {modal && <LeadModal kind={modal} onClose={() => setModal(null)} />}
    </>
  );
}
