'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, FileText, Users, Clock, TrendingUp, CheckCircle, Building2, PhoneCall } from 'lucide-react';
import VersionSwitcher from '@/components/VersionSwitcher';

export default function V2AHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/v2a" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0077C8] rounded flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#1B2B3A]">BoostWellbeing</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/v2a" className="text-slate-700 hover:text-[#0077C8] transition-colors font-medium">
                Home
              </Link>
              <Link href="/v2a/how-it-works" className="text-slate-700 hover:text-[#0077C8] transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/v2a/case-studies" className="text-slate-700 hover:text-[#0077C8] transition-colors font-medium">
                Case Studies
              </Link>
              <Link href="/v2a/resources" className="text-slate-700 hover:text-[#0077C8] transition-colors font-medium">
                Resources
              </Link>
              <Link href="/v2a/contact" className="text-slate-700 hover:text-[#0077C8] transition-colors font-medium">
                Contact
              </Link>
              <Link href="/v2a/contact" className="bg-[#2ECCB6] text-white px-6 py-2.5 rounded font-semibold hover:bg-[#26b8a3] transition-colors">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B2B3A] to-[#0077C8] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                <Building2 className="w-4 h-4" />
                In partnership with Southern Cross Health Society
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Corporate health cover that simplifies benefits, cuts admin, and keeps teams healthy.
              </h1>

              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Partner with Southern Cross to create a tailored group health plan that reduces costs and boosts retention for NZ businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/v2a/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#2ECCB6] text-white px-8 py-4 rounded font-semibold text-lg hover:bg-[#26b8a3] transition-all"
                >
                  Request a tailored quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded font-semibold text-lg hover:bg-white/20 transition-all"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Professional team collaborating in modern NZ workplace"
                  className="rounded-lg w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Summary */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-[#0077C8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Predictable Costs</h3>
              <p className="text-slate-600 leading-relaxed">
                Control premiums and tailor coverage to your budget. No surprises, just transparent pricing for your team's health needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#2ECCB6]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Admin Simplified</h3>
              <p className="text-slate-600 leading-relaxed">
                We handle enrolment, claims, and reporting. Zero burden on your HR team, letting them focus on strategic initiatives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Better Retention</h3>
              <p className="text-slate-600 leading-relaxed">
                Health cover your team actually values. 53% of employees cite benefits as their top reason for staying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B2B3A] mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your employee benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0077C8] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Assess Your Needs</h3>
              <p className="text-slate-600 leading-relaxed">
                We analyze your workforce demographics and requirements to understand what matters most to your team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#0077C8] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Design Your Plan</h3>
              <p className="text-slate-600 leading-relaxed">
                Our experts craft a tailored Southern Cross group health scheme that fits your budget and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#0077C8] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Launch & Support</h3>
              <p className="text-slate-600 leading-relaxed">
                We handle implementation and provide ongoing insights to maximize your investment's impact.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/v2a/contact"
              className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-8 py-4 rounded font-semibold text-lg hover:bg-[#005fa3] transition-all"
            >
              Book a 15-minute consultation
              <PhoneCall className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Existing Tools Section */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B2B3A] mb-4">Free Business Tools</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Use our calculators to assess your team's needs and estimate potential savings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-[#0077C8]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Wellbeing Assessment</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Use our 2-minute survey to assess your team's wellbeing needs across 6 key dimensions.
              </p>
              <Link
                href="/v2a/resources#survey"
                className="inline-flex items-center gap-2 text-[#0077C8] font-semibold hover:gap-3 transition-all"
              >
                Take the survey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-[#2ECCB6]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-4">Cost Calculator</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Estimate your company's savings with our interactive cost calculator and ROI projections.
              </p>
              <Link
                href="/v2a/resources#calculator"
                className="inline-flex items-center gap-2 text-[#0077C8] font-semibold hover:gap-3 transition-all"
              >
                Calculate savings
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B2B3A] mb-4">Proven Results</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how NZ businesses are transforming their workplaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#F9FAFB] p-8 rounded-lg border border-slate-200">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80"
                  alt="Auckland engineering firm team"
                  className="rounded-lg w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-3">
                Auckland Engineering Firm
              </h3>
              <p className="text-slate-600 mb-4">
                Reduced admin time by 35% after implementing Southern Cross group cover for 120 employees.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0077C8]">35%</div>
                  <div className="text-sm text-slate-600">Less admin</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2ECCB6]">28%</div>
                  <div className="text-sm text-slate-600">Fewer sick days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-slate-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9FAFB] p-8 rounded-lg border border-slate-200">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                  alt="Wellington tech company team"
                  className="rounded-lg w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B3A] mb-3">
                Wellington Tech Company
              </h3>
              <p className="text-slate-600 mb-4">
                Improved employee retention by 40% and reduced recruitment costs significantly.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0077C8]">40%</div>
                  <div className="text-sm text-slate-600">Better retention</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2ECCB6]">2:1</div>
                  <div className="text-sm text-slate-600">ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-slate-600">Uptake rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/v2a/case-studies"
              className="inline-flex items-center gap-2 text-[#0077C8] font-semibold text-lg hover:gap-3 transition-all"
            >
              See all case studies
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0077C8] to-[#1B2B3A] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to simplify your employee benefits?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join 3,500+ NZ businesses who trust Southern Cross for their team's health and wellbeing
          </p>
          <Link
            href="/v2a/contact"
            className="inline-flex items-center gap-2 bg-[#2ECCB6] text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-[#26b8a3] transition-all shadow-lg"
          >
            Request a tailored quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B2B3A] text-white py-12 border-t border-slate-700">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0077C8] rounded flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BoostWellbeing</span>
              </div>
              <p className="text-sm text-slate-400">
                In partnership with Southern Cross Health Society
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <div className="space-y-2 text-sm">
                <Link href="/v2a" className="block text-slate-400 hover:text-white transition-colors">Home</Link>
                <Link href="/v2a/how-it-works" className="block text-slate-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/v2a/case-studies" className="block text-slate-400 hover:text-white transition-colors">Case Studies</Link>
                <Link href="/v2a/resources" className="block text-slate-400 hover:text-white transition-colors">Resources</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/v2a/contact" className="block hover:text-white transition-colors">Get in touch</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Version Switcher */}
      <VersionSwitcher />
    </div>
  );
}
