import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BoostWellbeing',
  description: 'BoostWellbeing privacy policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-10">Last updated: March 2026</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Who We Are</h2>
              <p className="text-slate-700 leading-relaxed">
                BoostWellbeing (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a New Zealand-based workplace health insurance advisory service. We help businesses access Southern Cross Health Society workplace schemes. Our website is <strong>boostwellbeing.co.nz</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Information We Collect</h2>
              <p className="text-slate-700 leading-relaxed mb-3">We collect information you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>Submit a contact or consultation request form (name, email, phone, company name, number of employees)</li>
                <li>Use our wellbeing survey tool (anonymised survey responses)</li>
                <li>Register for or log into the client portal (name, email, password)</li>
                <li>Communicate with us by email or phone</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-3">
                We also collect standard analytics data (pages visited, browser type, approximate location) through cookies and similar technologies to improve our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>To respond to your enquiry and provide quotes</li>
                <li>To set up and manage your workplace health insurance scheme</li>
                <li>To operate the client portal and wellbeing survey</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-3">
                We do not sell your personal information. We may share relevant details with Southern Cross Health Society solely for the purpose of setting up or managing your workplace scheme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Data Security</h2>
              <p className="text-slate-700 leading-relaxed">
                We take reasonable steps to protect your personal information from unauthorised access, modification, or disclosure. Our website uses HTTPS encryption. Client portal accounts are password-protected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Your Rights</h2>
              <p className="text-slate-700 leading-relaxed">
                Under the New Zealand Privacy Act 2020, you have the right to access, correct, or request deletion of your personal information. Contact us at <a href="mailto:contact@boostwellbeing.co.nz" className="text-brand-blue hover:underline">contact@boostwellbeing.co.nz</a> to make a request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Cookies</h2>
              <p className="text-slate-700 leading-relaxed">
                We use essential cookies for site functionality (e.g., client portal sessions) and analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings, though some features may not work correctly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Changes to This Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                We may update this policy from time to time. Changes will be posted on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Contact</h2>
              <p className="text-slate-700 leading-relaxed">
                If you have questions about this policy, contact us at <a href="mailto:contact@boostwellbeing.co.nz" className="text-brand-blue hover:underline">contact@boostwellbeing.co.nz</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
