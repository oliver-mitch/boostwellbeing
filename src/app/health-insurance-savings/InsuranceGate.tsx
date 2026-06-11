"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Info, Shield, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import LeadCtas from "@/app/southern-cross-savings/LeadCtas";

type Selection = "southern_cross" | "other" | "none" | null;

function Panel({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <div className="mt-6 max-w-lg mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-4 text-center">
      <h3 className="text-xl font-bold text-slate-900">{heading}</h3>
      <p className="text-slate-600 leading-relaxed">{body}</p>
      <div className="pt-2">
        <div className="bg-brand-blue rounded-2xl p-6 space-y-4">
          <p className="text-blue-100 text-sm">
            Book a quick call, get the details by email, or get started — an adviser handles the rest.
          </p>
          <LeadCtas />
        </div>
      </div>
    </div>
  );
}

export default function InsuranceGate() {
  const router = useRouter();
  const [selected, setSelected] = useState<Selection>(null);

  const handleSelect = (value: Selection) => {
    if (!value) return;
    trackEvent("gate_select", { insurer: value });
    if (value === "southern_cross") {
      router.push("/southern-cross-savings");
      return;
    }
    setSelected(value);
  };

  const options: { value: Selection; label: string; icon: typeof Shield }[] = [
    { value: "southern_cross", label: "Southern Cross", icon: Shield },
    { value: "other", label: "Another insurer", icon: Info },
    { value: "none", label: "I don't have health insurance", icon: Phone },
  ];

  return (
    <div className="space-y-6">
      {/* Gate card */}
      <div className="max-w-lg mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <p className="text-base font-semibold text-slate-800 text-center mb-5">
          Who is your health insurance with today?
        </p>
        <div className="space-y-3">
          {options.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl border-2 font-medium text-left transition-all ${
                selected === value
                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                  : "border-slate-200 text-slate-700 hover:border-brand-blue/40 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selected === value ? "bg-brand-blue/10" : "bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${selected === value ? "text-brand-blue" : "text-slate-500"}`}
                  />
                </span>
                {label}
              </span>
              <ChevronRight
                className={`w-4 h-4 flex-shrink-0 ${selected === value ? "text-brand-blue" : "text-slate-400"}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Reveal panels */}
      {selected === "other" && (
        <Panel
          heading="Let's check before you switch"
          body="Switching health insurers can affect cover for pre-existing conditions and trigger stand-down periods. We'll review your current policy first — free of charge — so you know exactly where you'd stand before making any change."
        />
      )}

      {selected === "none" && (
        <Panel
          heading="Let's find the right starting point"
          body="Whether you're looking for individual cover or a workplace scheme, we'll help you find the right Southern Cross plan for your situation — at no cost to you."
        />
      )}
    </div>
  );
}
