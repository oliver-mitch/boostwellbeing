'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, Users, Award, CheckCircle, Building2, PhoneCall, Star } from 'lucide-react';
import VersionSwitcher from '@/components/VersionSwitcher';
import ScrollVideoBackground from '@/components/ScrollVideoBackground';
import { verifiedStats } from '@/data/southern-cross-stats';

export default function V2FHomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Scroll-Reactive Video Background */}
      <ScrollVideoBackground
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-business-people-working-in-an-office-4966-large.mp4"
        opacity={0.25}
        blur={true}
        parallaxSpeed={0.3}
      />

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/v2f" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">BoostWellbeing</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/v2f" className="text-white/80 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link href="/v2f/how-it-works" className="text-white/80 hover:text-white transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/v2f/case-studies" className="text-white/80 hover:text-white transition-colors font-medium">
                Case Studies
              </Link>
              <Link href="/v2f/resources" className="text-white/80 hover:text-white transition-colors font-medium">
                Resources
              </Link>
              <Link href="/v2f/contact" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-xl transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Overlaying Video */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20 text-white">
              <Building2 className="w-4 h-4" />
              In partnership with Southern Cross Health Society
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-white">
              Corporate health cover that{' '}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                transforms teams
              </span>
            </h1>

            <p className="text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Partner with NZ's most trusted health insurer to create tailored group health plans that reduce costs and boost retention.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/v2f/contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
              >
                Request a tailored quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#benefits"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
              >
                See how it works
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{verifiedStats['68%']}</div>
                <div className="text-sm text-white/80">{verifiedStats['68%']}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{verifiedStats['94c']}</div>
                <div className="text-sm text-white/80">{verifiedStats['94c']}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{verifiedStats['9 years']}</div>
                <div className="text-sm text-white/80">{verifiedStats["9 years"]}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Why businesses choose Southern Cross
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Verified benefits backed by New Zealand's most trusted health insurer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Predictable Costs</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                Control premiums and tailor coverage. 94 cents of every dollar goes to claims, not profits.
              </p>
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Not-for-profit structure</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Faster Treatment</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                Members spend 50% less time on waiting lists for elective surgery than those without cover.
              </p>
              <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Verified waiting time reduction</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Better Retention</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                Health cover is a sought-after employee benefit that drives talent attraction and team loyalty.
              </p>
              <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>3 free mental health sessions included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              New Zealand's Most Trusted Health Insurer
            </h2>
            <p className="text-xl text-white/80">
              9 years running - backed by verified performance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">68%</div>
              <div className="text-sm text-white/80">of all NZ health insurance claims</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">94c</div>
              <div className="text-sm text-white/80">per dollar paid in claims</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50%</div>
              <div className="text-sm text-white/80">less waiting time for members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">5+</div>
              <div className="text-sm text-white/80">employees to get started</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Simple 3-step process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get your team covered in under a week
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Assess Your Needs</h3>
              <p className="text-slate-600 leading-relaxed">
                We analyze your workforce to understand requirements. Minimum 5 employees needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Design Your Plan</h3>
              <p className="text-slate-600 leading-relaxed">
                Tailored Southern Cross scheme with dedicated account manager support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Launch & Support</h3>
              <p className="text-slate-600 leading-relaxed">
                Digital onboarding for employees with ongoing insights and award-winning service.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/v2f/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
            >
              Book a 15-minute consultation
              <PhoneCall className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to join NZ's leading businesses?
          </h2>
          <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
            More businesses choose Southern Cross than any other health insurer
          </p>
          <Link
            href="/v2f/contact"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-6 rounded-lg font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl"
          >
            Request a tailored quote
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BoostWellbeing</span>
              </div>
              <p className="text-sm text-white/60">
                In partnership with Southern Cross Health Society
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <div className="space-y-2 text-sm">
                <Link href="/v2f" className="block text-white/60 hover:text-white transition-colors">Home</Link>
                <Link href="/v2f/how-it-works" className="block text-white/60 hover:text-white transition-colors">How It Works</Link>
                <Link href="/v2f/case-studies" className="block text-white/60 hover:text-white transition-colors">Case Studies</Link>
                <Link href="/v2f/resources" className="block text-white/60 hover:text-white transition-colors">Resources</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-white/60">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/v2f/contact" className="block hover:text-white transition-colors">Get in touch</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="block text-white/60 hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2025 BoostWellbeing. All rights reserved.</p>
            <p className="mt-2 text-xs">Statistics verified from Southern Cross Health Society official website, November 2025</p>
          </div>
        </div>
      </footer>

      {/* Version Switcher */}
      <VersionSwitcher />
    </div>
  );
}
