"use client";

import React, { useState } from "react";
import {
  Calculator,
  CalculatorSection,
  CalculatorRow,
  Slider,
  QuoteCard,
  QuoteResultLine,
  QuoteInfoBox,
} from "@/src/components/turtleui";
import { Download, FileText, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

type PlanTier = "Wellbeing 1" | "Wellbeing 2" | "UltraCare";

const DEFAULTS = {
  privateEquivalent: { "Wellbeing 1": 900, "Wellbeing 2": 1200, "UltraCare": 1800 },
  familyPrivateForFamilyOf4: 2800,
  familyDiscount: 0.2,
};

export default function TeamHealthCalculator(): JSX.Element {
  const [employees, setEmployees] = useState<number>(25);
  const [plan, setPlan] = useState<PlanTier>("Wellbeing 2");
  const [employerCostPerEmployeeYear, setEmployerCostPerEmployeeYear] = useState<number>(700);
  const [familyDiscount, setFamilyDiscount] = useState<number>(DEFAULTS.familyDiscount);
  const [familyIncluded, setFamilyIncluded] = useState<boolean>(true);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const privateEquivalentPerEmployee = DEFAULTS.privateEquivalent[plan];
  const companyAnnualCost = Math.round(employees * employerCostPerEmployeeYear);
  const employeeSurplusPerEmployee = Math.max(0, privateEquivalentPerEmployee - employerCostPerEmployeeYear);
  const familySavingPerEmployee = familyIncluded ? Math.round(DEFAULTS.familyPrivateForFamilyOf4 * familyDiscount) : 0;
  const totalPerceivedValuePerEmployee = Math.round(employeeSurplusPerEmployee + familySavingPerEmployee);
  const totalPerceivedValueCompany = Math.round(totalPerceivedValuePerEmployee * employees);

  async function downloadPDF() {
    try {
      setLoadingPdf(true);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://insureme-production.up.railway.app/api";

      const res = await fetch(`${apiUrl}/quote-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: "Your Company",
          employees,
          plan,
          employerCost: employerCostPerEmployeeYear,
          familyDiscount: Math.round(familyDiscount * 100),
          employeeValue: totalPerceivedValuePerEmployee,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("PDF generation error:", txt);
        alert("PDF generation failed. Please contact us for a quote.");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `turtlemoney-southerncross-quote-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed. Please contact us for a quote.");
    } finally {
      setLoadingPdf(false);
    }
  }

  const formatCurrency = (value: number) => `NZ$${value.toLocaleString()}`;
  const isHighValue = totalPerceivedValuePerEmployee > 1000;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Calculator Form - Left Column */}
      <div className="lg:col-span-3">
        <Calculator
          title="Quick Cost & Benefit Estimator"
          description="Calculate the value your team receives with Southern Cross group health plans"
        >
          {/* Company Details Section */}
          <CalculatorSection title="Company Details">
            <Slider
              label="Number of employees"
              value={employees}
              min={15}
              max={500}
              step={5}
              onChange={setEmployees}
              formatValue={(v) => `${v} employees`}
              description="Minimum 15 employees required for group plans"
            />

            <CalculatorRow label="Plan tier">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPlan("Wellbeing 1")}
                  className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                    plan === "Wellbeing 1"
                      ? "bg-turtle-green-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Wellbeing 1
                </button>
                <button
                  onClick={() => setPlan("Wellbeing 2")}
                  className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                    plan === "Wellbeing 2"
                      ? "bg-turtle-green-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Wellbeing 2
                  <span className="block text-xs opacity-80 mt-1">Popular</span>
                </button>
                <button
                  onClick={() => setPlan("UltraCare")}
                  className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                    plan === "UltraCare"
                      ? "bg-turtle-green-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  UltraCare
                  <span className="block text-xs opacity-80 mt-1">Premium</span>
                </button>
              </div>
            </CalculatorRow>

            <Slider
              label="Employer cost per employee"
              value={employerCostPerEmployeeYear}
              min={500}
              max={2000}
              step={50}
              onChange={setEmployerCostPerEmployeeYear}
              formatValue={(v) => `${formatCurrency(v)}/year`}
              description="Your annual contribution per employee"
            />
          </CalculatorSection>

          {/* Family Benefits Section */}
          <CalculatorSection title="Family Benefits">
            <CalculatorRow label="Include family discount estimate?">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="familyIncluded"
                  checked={familyIncluded}
                  onChange={(e) => setFamilyIncluded(e.target.checked)}
                  className="w-5 h-5 text-turtle-green-500 border-slate-300 rounded focus:ring-turtle-green-500 cursor-pointer"
                />
                <label htmlFor="familyIncluded" className="text-sm text-slate-700 cursor-pointer">
                  Include family savings (partner + 2 kids example)
                </label>
              </div>
            </CalculatorRow>

            {familyIncluded && (
              <Slider
                label="Estimated family discount"
                value={Math.round(familyDiscount * 100)}
                min={0}
                max={50}
                step={5}
                onChange={(value) => setFamilyDiscount(value / 100)}
                formatValue={(v) => `${v}%`}
                description="Typical discounts range from 15-25%"
              />
            )}
          </CalculatorSection>
        </Calculator>
      </div>

      {/* Results Panel - Right Column */}
      <div className="lg:col-span-2">
        <div className="sticky top-8 space-y-6">
          {/* Main Results Card */}
          <QuoteCard
            title="Indicative Results"
            amount={companyAnnualCost}
            frequency="annually"
            highlight={true}
            description="Total company investment"
          >
            <div className="space-y-3 mb-6">
              <QuoteResultLine
                label="Private equivalent (retail)"
                value={formatCurrency(privateEquivalentPerEmployee)}
                description="Per employee value"
              />
              <QuoteResultLine
                label="Employee direct surplus"
                value={formatCurrency(employeeSurplusPerEmployee)}
                description="Per employee savings"
              />
              {familyIncluded && (
                <QuoteResultLine
                  label="Family saving"
                  value={formatCurrency(familySavingPerEmployee)}
                  description="Per employee family benefit"
                />
              )}
              <div className="pt-3 border-t border-slate-200">
                <QuoteResultLine
                  label="Total perceived value"
                  value={formatCurrency(totalPerceivedValuePerEmployee)}
                  description="Per employee total benefit"
                />
                <QuoteResultLine
                  label="Aggregate team value"
                  value={formatCurrency(totalPerceivedValueCompany)}
                  description="Company-wide benefit"
                />
              </div>
            </div>

            {isHighValue && (
              <QuoteInfoBox type="success">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-turtle-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-turtle-green-900 mb-1">Excellent Value</p>
                    <p className="text-sm text-turtle-green-700">
                      Your employees receive over ${totalPerceivedValuePerEmployee} in value annually
                    </p>
                  </div>
                </div>
              </QuoteInfoBox>
            )}

            <QuoteInfoBox type="info">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Figures are indicative. Final prices, waiting periods, and pre-existing condition outcomes are confirmed by Southern Cross underwriting.
                  </p>
                </div>
              </div>
            </QuoteInfoBox>

            <div className="pt-4 space-y-3">
              <button
                onClick={downloadPDF}
                disabled={loadingPdf}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingPdf ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download 1-Page Quote
                  </>
                )}
              </button>
              <a href="#contact" className="w-full btn-secondary py-3 flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Request Tailored Quote
              </a>
            </div>
          </QuoteCard>

          {/* Additional Info Card */}
          <div className="card-turtle p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-turtle-green-500" />
              <div>
                <h3 className="font-semibold text-slate-900">Why Southern Cross?</h3>
                <p className="text-sm text-slate-600">NZ's most trusted health insurer</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-turtle-green-500 mt-0.5 flex-shrink-0" />
                <span>Pre-existing conditions covered from day one</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-turtle-green-500 mt-0.5 flex-shrink-0" />
                <span>No lengthy waiting periods for group plans</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-turtle-green-500 mt-0.5 flex-shrink-0" />
                <span>Family discounts up to 25%</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-turtle-green-500 mt-0.5 flex-shrink-0" />
                <span>Fast access to diagnostics and treatment</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-turtle-green-500 mt-0.5 flex-shrink-0" />
                <span>24/7 health helpline included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
