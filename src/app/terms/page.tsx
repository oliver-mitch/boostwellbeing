import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'BoostWellbeing terms of service — conditions governing use of our website and services.',
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-10">Last updated: March 2026</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Overview</h2>
              <p className="text-slate-700 leading-relaxed">
                These terms govern your use of the BoostWellbeing website (<strong>boostwellbeing.co.nz</strong>) and our advisory services. By using our website you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Our Services</h2>
              <p className="text-slate-700 leading-relaxed">
                BoostWellbeing provides workplace health insurance advisory services. We help businesses access Southern Cross Health Society workplace schemes. We are an authorised partner of Southern Cross but are not an insurer ourselves. All insurance policies are issued and underwritten by Southern Cross Health Society, subject to their terms, conditions, and underwriting criteria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Website Content</h2>
              <p className="text-slate-700 leading-relaxed">
                The information on this website is provided for general guidance only. While we take care to ensure accuracy, pricing, plan details, and availability are subject to change by Southern Cross. Indicative costs shown on our website (including the cost estimator) are estimates only and do not constitute a quote or offer. Final pricing is confirmed by Southern Cross underwriting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Eligibility</h2>
              <p className="text-slate-700 leading-relaxed">
                Southern Cross workplace health insurance schemes are available to organisations with at least 5 full-time employees who join the scheme. Additional eligibility requirements, pre-existing condition rules, and waiting periods are set by Southern Cross.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Client Portal</h2>
              <p className="text-slate-700 leading-relaxed">
                Access to the client portal requires registration. You are responsible for keeping your login credentials secure. We reserve the right to suspend or terminate accounts that breach these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Intellectual Property</h2>
              <p className="text-slate-700 leading-relaxed">
                All content on this website (text, design, logos, tools) is owned by BoostWellbeing or used with permission. You may not reproduce or redistribute our content without written consent. Southern Cross trademarks and brand assets are used under authorisation and remain the property of Southern Cross Health Society.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed">
                To the extent permitted by New Zealand law, BoostWellbeing is not liable for any loss or damage arising from your use of this website or reliance on information provided. Our advisory services are provided in good faith but do not constitute financial or insurance advice. We recommend you review all policy documents provided by Southern Cross before making a decision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Governing Law</h2>
              <p className="text-slate-700 leading-relaxed">
                These terms are governed by the laws of New Zealand. Any disputes will be subject to the jurisdiction of New Zealand courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Changes</h2>
              <p className="text-slate-700 leading-relaxed">
                We may update these terms from time to time. Changes will be posted on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Contact</h2>
              <p className="text-slate-700 leading-relaxed">
                Questions about these terms? Contact us at <a href="mailto:contact@boostwellbeing.co.nz" className="text-brand-blue hover:underline">contact@boostwellbeing.co.nz</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
