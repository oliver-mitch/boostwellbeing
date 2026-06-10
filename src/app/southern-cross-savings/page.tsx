import type { Metadata } from "next";
import { Shield, CheckCircle, Award, Phone, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import SavingsCalculator, { HowItWorksAccordion } from "./SavingsCalculator";
import LeadCtas from "./LeadCtas";

export const metadata: Metadata = {
  title: "Same Southern Cross cover, lower premium | BoostWellbeing",
  description:
    "Choose the $500-excess version of your Southern Cross Wellbeing plan — same cover, lower premium — and we pay the $500 excess. See your saving in seconds.",
  robots: {
    index: false,
    follow: false,
  },
};

const TRUST_ITEMS = [
  {
    icon: CheckCircle,
    heading: "Advice from people, not a portal",
    body: "A real adviser handles your application, answers your questions, and stays available after you're covered.",
  },
  {
    icon: Award,
    heading: "$0 adviser fee",
    body: "Our advice costs you nothing — we're paid by Southern Cross, not by you.",
  },
  {
    icon: Shield,
    heading: "Southern Cross partner",
    body: "We're an authorised Financial Adviser for Southern Cross Health Society — New Zealand's most trusted health insurer.",
  },
];

export default function SouthernCrossSavingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ── Site header (shared SiteNav) ── */}
      <SiteNav variant="light" />

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div className="space-y-6 lg:pt-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-sm font-semibold px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Southern Cross Authorised Adviser
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Same Southern Cross cover. Lower premium.{" "}
              <span className="text-brand-teal">We pay your $500 excess.</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Choose the $500-excess version of your Southern Cross Wellbeing
              plan — same cover, lower premium — and we cover the $500 excess.
              If you claim, we pay it, so you&apos;re never out of pocket. See
              your saving below.
            </p>

            <ul className="space-y-2.5">
              {[
                "Exactly the same Southern Cross cover",
                "Lower premium than the Nil-excess version",
                "We reimburse the $500 excess each year",
                "Personal adviser included, at no extra charge",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
              >
                See your saving
                <ArrowRight className="w-4 h-4 rotate-90" />
              </a>
              <a
                href="#get-started"
                className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                <Phone className="w-4 h-4" />
                Book a 10-min call
              </a>
            </div>

            {/* TODO (§8): Add first-person "Ollie" testimonial here once the consent
                form is signed. Placeholder intentionally not rendered. */}
          </div>

          {/* Right: calculator */}
          <div id="calculator" className="scroll-mt-24">
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* ── Trust section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
          Why Boost Wellbeing?
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.heading}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-slate-900">{item.heading}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section id="get-started" className="bg-brand-blue scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to get covered for less?
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto">
            Book a quick call, get the details by email, or get started — an
            adviser handles the rest, usually in under a week.
          </p>
          <LeadCtas />
        </div>
      </section>

      {/* ── How does this work? — collapsed accordion, de-emphasised ── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <HowItWorksAccordion />
      </section>

      {/* ── Compliance footer ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="text-xs text-slate-400 space-y-2 border-t border-slate-100 pt-6">
          <p>
            <strong className="text-slate-500">Important information:</strong>{" "}
            The calculator provides an indicative figure only. It is not a quote,
            contract, or offer of insurance, and its output is not personalised
            financial advice. Premiums are confirmed by Southern Cross Health
            Society on application and change over time (figures current to
            30 June 2026). Cover is subject to Southern Cross acceptance and the
            relevant policy document.
          </p>
          <p>
            The $500 excess reimbursement is provided by BoostWellbeing (with
            Risk Solutions Ltd), not by Southern Cross, and applies to the
            standard excess on a member&apos;s first eligible claim each policy
            year. The saving shown is anchored to the Nil-excess versus
            $500-excess premium on the same Southern Cross plan — it is not a
            switch-and-save between insurers. Switching insurer or plan may
            affect cover for pre-existing conditions and stand-downs.
          </p>
          <p>
            BoostWellbeing is a Financial Advice Provider.{" "}
            {/* TODO (§8): Insert FAP disclosure statement URL once approved */}
            <span className="underline cursor-default">
              Financial Advice Provider disclosure [TODO: insert URL]
            </span>
            . Southern Cross Health Society Limited is the insurer.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
