import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle, Award, Phone, ArrowRight } from "lucide-react";
import { BoostIcon } from "@/components/icons/BoostIcon";
import { SiteFooter } from "@/components/SiteFooter";
import SavingsCalculator, { HowItWorksAccordion } from "./SavingsCalculator";

export const metadata: Metadata = {
  title: "Save on Southern Cross Health Insurance | BoostWellbeing",
  description:
    "See how much you could save on Southern Cross health insurance when you join through BoostWellbeing. Get an instant indicative saving in seconds.",
  robots: {
    index: false,
    follow: false,
  },
};

const TRUST_ITEMS = [
  {
    icon: Shield,
    heading: "Southern Cross authorised",
    body: "We're an authorised Financial Adviser for Southern Cross Health Society — New Zealand's most trusted health insurer.",
  },
  {
    icon: Award,
    heading: "Group scheme savings",
    body: "Our group scheme means members typically save compared with buying direct. No catch, no employer required.",
  },
  {
    icon: CheckCircle,
    heading: "Personal support included",
    body: "A real adviser handles your application, answers your questions, and stays available after you're covered.",
  },
];

export default function SouthernCrossSavingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ── Minimal header — paid traffic page, no site nav ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center shadow">
              <BoostIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-brand-blue">Boost</span>
              <span className="text-slate-800">Wellbeing</span>
            </span>
          </Link>
          {/* TODO (§8): Replace placeholder with verified phone number */}
          <a
            href="tel:+6421720710"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors"
          >
            <Phone className="w-4 h-4" />
            021 720 710
          </a>
        </div>
      </header>

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
              Save on your Southern Cross health cover.
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Join through Boost Wellbeing&apos;s group scheme and pay less than
              buying direct — for exactly the same Southern Cross policy.
            </p>

            <ul className="space-y-2.5">
              {[
                "Same Southern Cross policy, less cost",
                "No employer needed — join as an individual",
                "Instant indicative saving below",
                "Personal adviser included, at no extra charge",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Social proof placeholder */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                {/* TODO (§8): Add verified testimonial with signed consent form */}
                <span className="italic text-slate-400">[Testimonial — pending consent sign-off]</span>
              </p>
            </div>
          </div>

          {/* Right: calculator */}
          <div>
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
      <section className="bg-brand-blue">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to get covered for less?
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto">
            Use the calculator above to see your saving, then talk to an adviser
            to get everything set up — usually in under a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* TODO (§8): Wire callback intake form once approved by SC compliance */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Talk to an adviser
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+6421720710"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {/* TODO (§8): Replace with verified phone number */}
              021 720 710
            </a>
          </div>
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
            This calculator provides an indicative saving only and does not
            constitute financial advice. Actual premiums are determined by
            Southern Cross Health Society and are subject to underwriting. Cover
            is subject to Southern Cross Health Society&apos;s policy terms and
            conditions. Switching health cover may affect your pre-existing
            condition cover — please review your current policy before making
            any changes and seek professional advice if you are unsure.
          </p>
          <p>
            Savings estimates are based on the Southern Cross individual rate
            card effective 1 January 2026. Rates may differ for your specific
            circumstances. Boost Wellbeing Ltd is a licensed Financial Advice
            Provider.{" "}
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
