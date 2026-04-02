"use client";

import { useState, useMemo } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  Calculator,
  CalculatorSection,
  CalculatorRow,
  Slider,
  QuoteCard,
  QuoteResultLine,
  QuoteInfoBox,
} from "@/components/turtleui";
import { Toggle } from "@/components/turtleui";
import { EMPLOYEE_PLANS, EMPLOYEE_MODULES, getRateForAge } from "@/data/rateData";
import { FileText } from "lucide-react";

type PlanCode = typeof EMPLOYEE_PLANS[number]["code"];

interface PlanButton {
  code: PlanCode;
  tag?: string;
}

const PLAN_GROUPS: { label: string; plans: PlanButton[] }[] = [
  {
    label: "Wellbeing",
    plans: [
      { code: "wb_1_500", tag: "Entry" },
      { code: "wb_1" },
      { code: "wb_2_500" },
      { code: "wb_2", tag: "Popular" },
    ],
  },
  {
    label: "UltraCare",
    plans: [
      { code: "ultracare_base" },
      { code: "ultracare_option_400", tag: "Premium" },
    ],
  },
];

export default function TeamHealthCalculator(): JSX.Element {
  const [employees, setEmployees] = useState(25);
  const [averageAge, setAverageAge] = useState(35);
  const [selectedPlanCode, setSelectedPlanCode] = useState<PlanCode>("wb_2");
  const [showModules, setShowModules] = useState(false);

  const selectedPlan = useMemo(
    () => EMPLOYEE_PLANS.find((p) => p.code === selectedPlanCode)!,
    [selectedPlanCode]
  );

  const planRate = useMemo(
    () => getRateForAge(selectedPlan.rates, averageAge),
    [selectedPlan, averageAge]
  );

  const perEmployeeMonthly = planRate;
  const perEmployeeAnnual = perEmployeeMonthly * 12;
  const totalCompanyMonthly = perEmployeeMonthly * employees;
  const totalCompanyAnnual = totalCompanyMonthly * 12;

  const moduleCosts = useMemo(
    () =>
      EMPLOYEE_MODULES.map((mod) => ({
        name: mod.name,
        perEmployeeMonthly: getRateForAge(mod.rates, averageAge),
      })),
    [averageAge]
  );

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("en-NZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Calculator Form */}
      <div className="lg:col-span-3">
        <Calculator
          title="Group Health Cost Estimator"
          description="Estimate costs using actual Southern Cross employee plan rates"
        >
          <CalculatorSection title="Company Details">
            <Slider
              label="Number of employees"
              value={employees}
              min={5}
              max={500}
              step={5}
              onChange={setEmployees}
              formatValue={(v) => `${v} employees`}
              description="Minimum 5 full-time employees who join the scheme"
            />

            <Slider
              label="Average employee age"
              value={averageAge}
              min={21}
              max={65}
              step={1}
              onChange={setAverageAge}
              formatValue={(v) => `${v} years`}
              description="Used to look up age-band pricing"
            />
          </CalculatorSection>

          <CalculatorSection title="Select Plan">
            {PLAN_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {group.plans.map((p) => {
                    const planData = EMPLOYEE_PLANS.find((ep) => ep.code === p.code)!;
                    const isSelected = selectedPlanCode === p.code;
                    return (
                      <button
                        key={p.code}
                        onClick={() => setSelectedPlanCode(p.code)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all text-sm text-left ${
                          isSelected
                            ? "bg-brand-blue text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <span className="block font-semibold">{planData.name}</span>
                        <span className={`block text-xs mt-1 ${isSelected ? "opacity-80" : "text-slate-500"}`}>
                          {p.tag || planData.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </CalculatorSection>

          <CalculatorSection title="Optional Modules" collapsible defaultOpen={false}>
            <Toggle
              label="Show add-on module costs"
              enabled={showModules}
              onChange={setShowModules}
              description="See per-employee costs for optional add-on modules"
            />
            {showModules && (
              <div className="space-y-2 mt-3">
                {moduleCosts.map((mod) => (
                  <div key={mod.name} className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">{mod.name}</span>
                    <span className="text-sm font-semibold font-mono text-slate-900">
                      +{formatCurrency(mod.perEmployeeMonthly)}/mo
                    </span>
                  </div>
                ))}
                <p className="text-xs text-slate-500 mt-2">
                  Module costs are per employee and added to the base plan cost.
                </p>
              </div>
            )}
          </CalculatorSection>
        </Calculator>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2">
        <div className="sticky top-8 space-y-6">
          <QuoteCard
            title="Estimated Costs"
            amount={Math.round(perEmployeeMonthly)}
            frequency="monthly"
            highlight={true}
            description="Per employee"
          >
            <div className="space-y-3 mb-6">
              <QuoteResultLine
                label="Per employee monthly"
                value={formatCurrency(perEmployeeMonthly)}
              />
              <QuoteResultLine
                label="Per employee annual"
                value={formatCurrency(perEmployeeAnnual)}
              />
              <div className="pt-3 border-t border-slate-200">
                <QuoteResultLine
                  label="Total company monthly"
                  value={formatCurrency(totalCompanyMonthly)}
                  description={`${employees} employees`}
                  highlight
                />
                <QuoteResultLine
                  label="Total company annual"
                  value={formatCurrency(totalCompanyAnnual)}
                  highlight
                />
              </div>
              <div className="pt-3 border-t border-slate-200">
                <QuoteResultLine
                  label="Plan"
                  value={selectedPlan.name}
                />
                <QuoteResultLine
                  label="Plan rate"
                  value={formatCurrency(planRate)}
                  description="Per employee/mo (workplace scheme rate)"
                />
              </div>
            </div>

            <QuoteInfoBox type="info">
              <p>
                <strong>Rates effective 01 January 2026.</strong> Final pricing
                confirmed by Southern Cross underwriting. Pre-existing
                conditions and waiting periods may vary.
              </p>
            </QuoteInfoBox>

            <div className="pt-4">
              <a
                href="/contact"
                onClick={() => trackEvent('cta_click', { label: 'request_tailored_quote', section: 'cost_calculator' })}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Request Tailored Quote
              </a>
            </div>
          </QuoteCard>
        </div>
      </div>
    </div>
  );
}
