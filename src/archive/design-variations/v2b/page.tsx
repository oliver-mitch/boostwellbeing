'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Sparkles, TrendingUp, Clock, Users } from 'lucide-react';
import VersionSwitcher from '@/components/VersionSwitcher';

export default function V2BHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/v2b" className="text-3xl font-light tracking-tight text-slate-900">
              BoostWellbeing
            </Link>

            <div className="hidden md:flex items-center gap-12">
              <Link href="/v2b" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link href="/v2b/how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                How It Works
              </Link>
              <Link href="/v2b/case-studies" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Case Studies
              </Link>
              <Link href="/v2b/resources" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Resources
              </Link>
              <Link href="/v2b/contact" className="text-sm bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Lots of Whitespace */}
      <section className="pt-40 pb-32 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                In Partnership with Southern Cross
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-light tracking-tight text-slate-900 mb-10 leading-[0.95]">
              Corporate health<br />
              cover, simplified.
            </h1>

            <p className="text-2xl text-slate-500 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Partner with Southern Cross to create tailored group health plans that reduce costs and boost retention.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/v2b/contact"
                className="group inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-full text-lg hover:bg-slate-800 transition-all"
              >
                Request a quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#benefits"
                className="inline-flex items-center gap-2 text-slate-600 px-10 py-5 rounded-full text-lg hover:text-slate-900 transition-all"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Benefits - Clean Grid */}
      <section id="benefits" className="py-32 px-8 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 mb-6">
              Why choose us
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              Three core benefits that matter to your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Predictable Costs</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Control premiums and tailor coverage to your budget with transparent pricing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Admin Simplified</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                We handle enrolment, claims, and reporting. Zero burden on your team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Better Retention</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Health cover your team values. 53% stay for the benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* How It Works - Minimal Timeline */}
      <section className="py-32 px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 mb-6">
              Three simple steps
            </h2>
          </div>

          <div className="space-y-24">
            <div className="flex items-start gap-12">
              <div className="text-8xl font-light text-slate-200 flex-shrink-0">01</div>
              <div className="pt-8">
                <h3 className="text-3xl font-light text-slate-900 mb-4">Assess your needs</h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                  We analyze your workforce to understand what matters most to your team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-12">
              <div className="text-8xl font-light text-slate-200 flex-shrink-0">02</div>
              <div className="pt-8">
                <h3 className="text-3xl font-light text-slate-900 mb-4">Design your plan</h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                  Our experts craft a tailored scheme that fits your budget and goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-12">
              <div className="text-8xl font-light text-slate-200 flex-shrink-0">03</div>
              <div className="pt-8">
                <h3 className="text-3xl font-light text-slate-900 mb-4">Launch & support</h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                  We handle implementation and provide ongoing insights.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-24">
            <Link
              href="/v2b/contact"
              className="inline-flex items-center gap-2 text-slate-900 border-b-2 border-slate-900 pb-1 hover:border-slate-600 transition-colors text-lg"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Stats - Clean Display */}
      <section className="py-32 px-8 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-16 text-center">
            <div>
              <div className="text-6xl font-light text-slate-900 mb-4">3,500+</div>
              <div className="text-sm uppercase tracking-widest text-slate-500">NZ Businesses</div>
            </div>

            <div>
              <div className="text-6xl font-light text-slate-900 mb-4">950K+</div>
              <div className="text-sm uppercase tracking-widest text-slate-500">Members</div>
            </div>

            <div>
              <div className="text-6xl font-light text-slate-900 mb-4">2:1</div>
              <div className="text-sm uppercase tracking-widest text-slate-500">Average ROI</div>
            </div>

            <div>
              <div className="text-6xl font-light text-slate-900 mb-4">85%</div>
              <div className="text-sm uppercase tracking-widest text-slate-500">Fewer Sick Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Case Study - Minimal Card */}
      <section className="py-32 px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 mb-6">
              Real results
            </h2>
          </div>

          <div className="bg-white border border-slate-200 p-12 rounded-2xl">
            <div className="mb-8">
              <div className="text-sm uppercase tracking-widest text-slate-400 mb-4">Case Study</div>
              <h3 className="text-3xl font-light text-slate-900 mb-4">
                Auckland Engineering Firm
              </h3>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Reduced admin time by 35% and cut sick days by 28% after implementing Southern Cross group cover.
              </p>
            </div>

            <div className="flex items-center gap-12 pt-8 border-t border-slate-200">
              <div>
                <div className="text-4xl font-light text-slate-900 mb-2">35%</div>
                <div className="text-sm text-slate-500">Less admin</div>
              </div>
              <div>
                <div className="text-4xl font-light text-slate-900 mb-2">28%</div>
                <div className="text-sm text-slate-500">Fewer sick days</div>
              </div>
              <div>
                <div className="text-4xl font-light text-slate-900 mb-2">92%</div>
                <div className="text-sm text-slate-500">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/v2b/case-studies"
              className="inline-flex items-center gap-2 text-slate-900 border-b-2 border-slate-900 pb-1 hover:border-slate-600 transition-colors"
            >
              View all case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* CTA - Minimal */}
      <section className="py-32 px-8 bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 leading-tight">
            Ready to simplify your<br />employee benefits?
          </h2>
          <p className="text-xl text-slate-400 mb-12 font-light">
            Join 3,500+ NZ businesses who trust Southern Cross
          </p>
          <Link
            href="/v2b/contact"
            className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full text-lg hover:bg-slate-100 transition-all"
          >
            Request a quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>

      {/* Footer - Minimal */}
      <footer className="py-16 px-8 border-t border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="text-2xl font-light tracking-tight text-slate-900 mb-4">
                BoostWellbeing
              </div>
              <p className="text-sm text-slate-500 font-light">
                In partnership with<br />Southern Cross Health Society
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-6">Navigation</div>
              <div className="space-y-3 text-sm">
                <Link href="/v2b" className="block text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
                <Link href="/v2b/how-it-works" className="block text-slate-600 hover:text-slate-900 transition-colors">How It Works</Link>
                <Link href="/v2b/case-studies" className="block text-slate-600 hover:text-slate-900 transition-colors">Case Studies</Link>
                <Link href="/v2b/resources" className="block text-slate-600 hover:text-slate-900 transition-colors">Resources</Link>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-6">Contact</div>
              <div className="space-y-3 text-sm text-slate-600">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/v2b/contact" className="block hover:text-slate-900 transition-colors">Get in touch</Link>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-6">Legal</div>
              <div className="space-y-3 text-sm">
                <Link href="#" className="block text-slate-600 hover:text-slate-900 transition-colors">Privacy</Link>
                <Link href="#" className="block text-slate-600 hover:text-slate-900 transition-colors">Terms</Link>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            <p>&copy; 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Version Switcher */}
      <VersionSwitcher />
    </div>
  );
}
