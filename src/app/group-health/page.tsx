import Link from 'next/link';
import {
  Users, Shield, Heart, TrendingUp, CheckCircle, Mail,
  Clock, UserCheck, TrendingDown,
  ArrowRight, BarChart3, Building2
} from 'lucide-react';
import TeamHealthCalculator from '@/components/TeamHealthCalculator';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Health Insurance Plans & Cost Estimator',
  description: 'Explore Southern Cross workplace health insurance plans and estimate costs with our calculator. Plans from ~$15/person/week.',
};

export default function BoostWellbeingGroupHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SiteNav variant="light" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8">
              <Building2 className="w-4 h-4" />
              For HR Managers & Business Owners
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Invest in Health.<br />
              <span className="text-brand-blue">Gain Competitive Advantage.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Southern Cross Group Health Insurance delivers measurable returns through reduced turnover,
              increased productivity, and a healthier, more engaged workforce.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white">
                <Users className="w-4 h-4 text-brand-blue" />
                <span>Southern Cross Authorised Partner</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white">
                <Shield className="w-4 h-4 text-brand-teal" />
                <span>950,000+ members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Business Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              Why Leading NZ Employers Choose Southern Cross
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Evidence-based benefits that directly impact your bottom line and company culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* ROI Benefit */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-blue/10 hover:border-brand-blue/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">2:1 Return on Investment</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    95% of companies measuring ROI see positive returns—most achieving $2+ for every $1 invested through reduced absenteeism and increased productivity.
                  </p>
                  <div className="text-xs text-brand-blue font-semibold">Research-backed ROI</div>
                </div>
              </div>
            </div>

            {/* Retention Benefit */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-teal/10 hover:border-brand-teal/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Attract & Retain Top Talent</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    53% of workers say health plans are a top reason they stay with their employer. Health insurance is now a must-have benefit for competitive recruitment.
                  </p>
                  <div className="text-xs text-brand-teal font-semibold">Reduce turnover costs</div>
                </div>
              </div>
            </div>

            {/* Productivity Benefit */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-dark/10 hover:border-brand-dark/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-dark/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-brand-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">85% Reduction in Sick Days</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    85% of employers credit wellness programs with reducing absenteeism and recruitment costs. Faster access to treatment means healthier, more present teams.
                  </p>
                  <div className="text-xs text-brand-dark font-semibold">Minimize downtime</div>
                </div>
              </div>
            </div>

            {/* Pre-existing Conditions */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-blue/10 hover:border-brand-blue/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Pre-existing Coverage from Day 1</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Group plans cover pre-existing conditions immediately—a unique benefit that provides peace of mind and comprehensive coverage for your entire team.
                  </p>
                  <div className="text-xs text-brand-blue font-semibold">Inclusive coverage</div>
                </div>
              </div>
            </div>

            {/* Zero Admin */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-teal/10 hover:border-brand-teal/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Zero Admin Burden for HR</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    We handle all setup, employee onboarding, policy management, and ongoing support. Your HR team can focus on strategic initiatives, not administration.
                  </p>
                  <div className="text-xs text-brand-teal font-semibold">Turnkey solution</div>
                </div>
              </div>
            </div>

            {/* Family Benefits */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-dark/10 hover:border-brand-dark/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-dark/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-brand-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Family Discounts up to 25%</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Employees can add partners and dependents at discounted group rates—extending care beyond the workplace and increasing the perceived value of your benefits package.
                  </p>
                  <div className="text-xs text-brand-dark font-semibold">Enhanced employee value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Statistics Banner */}
      <section className="py-16 bg-brand-blue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-white/90" />
            <h3 className="text-3xl font-bold text-white mb-2">The Business Case is Clear</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Independent research shows workplace health programs deliver quantifiable returns
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-white/80">See positive ROI</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-1">$2:$1</div>
              <div className="text-sm text-white/80">Average return rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-1">53%</div>
              <div className="text-sm text-white/80">Stay for health benefits</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-1">85%</div>
              <div className="text-sm text-white/80">Reduced sick days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              Estimate Your Group Health Costs
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Calculate costs using actual Southern Cross employee plan rates based on your team size and average age
            </p>
          </div>
          <TeamHealthCalculator />
        </div>
      </section>

      {/* Why Southern Cross Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-2xl shadow-lg border-2 border-brand-blue/20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Why NZ Businesses Choose Southern Cross
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">NZ's Most Trusted Health Insurer</h4>
                    <p className="text-sm text-slate-600">950,000 members and nearly 90 years of healthcare expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">No Waiting Periods for Group Plans</h4>
                    <p className="text-sm text-slate-600">Employees can access care immediately, unlike individual policies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Fast Access to Diagnostics & Treatment</h4>
                    <p className="text-sm text-slate-600">Get your team back to full health and productivity faster</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">BeingWellPlus Workplace Resources</h4>
                    <p className="text-sm text-slate-600">Self-service health and wellbeing hub for your team</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">24/7 Health Helpline</h4>
                    <p className="text-sm text-slate-600">Expert medical advice anytime your team needs it</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Flexible Contribution Options</h4>
                    <p className="text-sm text-slate-600">Subsidize all, part, or offer discounted group rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 bg-brand-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Strengthen Your Benefits Package?</h2>
            <p className="text-white/80 mb-10 text-lg">
              Get a tailored quote and see how Southern Cross can help you attract top talent,
              reduce turnover, and build a healthier, more productive workforce.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-brand-blue px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/90 transition-all shadow-2xl mb-10"
            >
              <Mail className="w-5 h-5" />
              Request a Business Quote
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white" />
                <span>No obligation quote</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Customized to your business</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter additionalDisclaimer="Pricing is indicative and subject to Southern Cross underwriting. Minimum 15 employees required for group plans." />
    </div>
  );
}
