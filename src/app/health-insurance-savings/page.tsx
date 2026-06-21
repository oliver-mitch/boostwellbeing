import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import AttributionCapture from "@/components/AttributionCapture";
import InsuranceGate from "./InsuranceGate";

export const metadata: Metadata = {
  title: "Save on your family's health insurance | BoostWellbeing",
  description:
    "Same cover, lower premium. Answer one question to see how much you could save on your family's health insurance — a real adviser, at no cost to you.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HealthInsuranceSavingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <AttributionCapture />
      <SiteNav variant="light" />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
          Save over $1,000 a year on your{" "}
          <span className="text-brand-teal">family&apos;s health insurance</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-xl mx-auto">
          Same cover. Lower premium. A real adviser, at no cost to you. Answer
          one question to see your saving.
        </p>
      </section>

      {/* Gate */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <InsuranceGate />
      </section>

      {/* Small print */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="text-xs text-slate-400 space-y-2 border-t border-slate-100 pt-6">
          <p>
            <strong className="text-slate-500">Saving example:</strong> a family
            on a Southern Cross Wellbeing plan choosing the $500-excess option
            instead of the Nil-excess option, based on Southern Cross premium
            rates effective to 30 June 2026. Individual savings vary with plan,
            age, and family size. The $500 excess is reimbursed by us on the
            first eligible claim each policy year — see full terms on the{" "}
            <a
              href="/southern-cross-savings"
              className="underline hover:text-slate-500 transition-colors"
            >
              savings page
            </a>
            .
          </p>
          <p>
            Financial advice is provided by Risk Solutions Limited (FSP718392), a
            licensed Financial Advice Provider. BoostWellbeing operates under
            Risk Solutions Limited&apos;s licence. View our disclosure
            information at{" "}
            <a
              href="https://www.risksolutions.net.nz/about/"
              target="_blank"
              rel="noopener"
              className="underline hover:text-slate-500 transition-colors"
            >
              risksolutions.net.nz/about
            </a>
            . Southern Cross Medical Care Society (Southern Cross Health Society)
            is the insurer. We are a distributor of Southern Cross plans and do
            not act as agent of, or advise on behalf of, Southern Cross.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
