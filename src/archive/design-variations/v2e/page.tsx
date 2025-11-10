'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Rocket, TrendingUp, Target, Users, Star, ChevronRight, Sparkles, Award } from 'lucide-react';
import VersionSwitcher from '@/components/VersionSwitcher';

export default function V2EHomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Bold Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-orange-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/v2e" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/50 rotate-3">
                <Zap className="w-7 h-7 text-white -rotate-3" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                BOOST
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/v2e" className="text-slate-300 hover:text-orange-400 transition-colors font-bold text-sm uppercase tracking-wide">
                Home
              </Link>
              <Link href="/v2e/how-it-works" className="text-slate-300 hover:text-pink-400 transition-colors font-bold text-sm uppercase tracking-wide">
                Process
              </Link>
              <Link href="/v2e/case-studies" className="text-slate-300 hover:text-purple-400 transition-colors font-bold text-sm uppercase tracking-wide">
                Wins
              </Link>
              <Link href="/v2e/resources" className="text-slate-300 hover:text-orange-400 transition-colors font-bold text-sm uppercase tracking-wide">
                Tools
              </Link>
              <Link href="/v2e/contact" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-lg font-black uppercase text-sm">
                  Get Started
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - High Energy */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 border border-orange-500/30 rounded-full text-sm font-bold mb-8 text-orange-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              3,500+ Companies Transformed
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
              <span className="block text-white mb-4">REVOLUTIONIZE</span>
              <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                YOUR WORKPLACE
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-300 mb-12 leading-relaxed font-bold max-w-3xl mx-auto">
              Explosive ROI. Zero admin. Teams that stay and THRIVE.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link
                href="/v2e/contact"
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white px-10 py-5 rounded-xl font-black text-lg uppercase">
                  Launch Now
                  <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="#results"
                className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 rounded-xl font-black text-lg uppercase hover:bg-white/10 transition-all"
              >
                See Results
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>

            {/* Bold Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
                <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-2">
                  2:1
                </div>
                <div className="text-sm text-orange-300 font-bold uppercase tracking-wide">Avg ROI</div>
              </div>

              <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-xl p-6">
                <div className="text-5xl font-black bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent mb-2">
                  85%
                </div>
                <div className="text-sm text-pink-300 font-bold uppercase tracking-wide">Less Sick Days</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-2">
                  40%
                </div>
                <div className="text-sm text-purple-300 font-bold uppercase tracking-wide">Retention Boost</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-purple-600/10 border border-orange-500/30 rounded-xl p-6">
                <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <div className="text-sm text-orange-300 font-bold uppercase tracking-wide">Positive ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - High Contrast */}
      <section id="results" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-black uppercase tracking-widest text-orange-600 mb-4">
              The Triple Threat
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              UNSTOPPABLE VALUE
            </h2>
            <p className="text-2xl text-slate-600 font-bold">
              Three game-changing benefits that transform businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>
              <div className="relative bg-slate-900 p-10 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/50">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">EXPLOSIVE ROI</h3>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Every dollar invested returns $2+. 95% of companies see measurable financial gains within 8 months.
                </p>
                <div className="text-6xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  2:1
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>
              <div className="relative bg-slate-900 p-10 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/50">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">ZERO HASSLE</h3>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Fully automated. Your HR team saves 35% of admin time. We handle everything.
                </p>
                <div className="text-6xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  0hrs
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>
              <div className="relative bg-slate-900 p-10 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">TEAM LOYALTY</h3>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  40% retention improvement. 53% of employees stay BECAUSE of benefits like this.
                </p>
                <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  40%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Dynamic */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-black uppercase tracking-widest text-orange-400 mb-4">
              Fast & Powerful
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              3 STEPS TO SUCCESS
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="group flex items-center gap-8 bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-500 p-8 rounded-r-2xl hover:from-orange-500/20 transition-all">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-orange-500/50">
                1
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-3">DISCOVER</h3>
                <p className="text-xl text-slate-300 leading-relaxed">
                  We analyze your workforce and identify exactly what your team needs to thrive
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-8 bg-gradient-to-r from-pink-500/10 to-transparent border-l-4 border-pink-500 p-8 rounded-r-2xl hover:from-pink-500/20 transition-all">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-pink-500/50">
                2
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-3">DESIGN</h3>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Custom Southern Cross plan built for your budget, your goals, your success
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-8 bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 p-8 rounded-r-2xl hover:from-purple-500/20 transition-all">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-purple-500/50">
                3
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-3">DOMINATE</h3>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Launch with full support and watch the ROI roll in—productivity, retention, results
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/v2e/contact"
              className="group relative inline-block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition"></div>
              <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white px-10 py-5 rounded-xl font-black text-lg uppercase">
                Start Your Transformation
                <Rocket className="w-6 h-6" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Study - Bold Display */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block text-sm font-black uppercase tracking-widest text-orange-600 mb-4">
              Real Results
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              PROOF IN THE NUMBERS
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-slate-900 rounded-3xl p-12 border-2 border-orange-500/30">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-black uppercase mb-6">
                    Case Study
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">
                    Auckland Engineering Firm CRUSHES IT
                  </h3>
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    120 employees. Manufacturing sector. Massive transformation in just 12 months after implementing Southern Cross group health.
                  </p>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-slate-300 font-bold">5/5 Employee Rating</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 rounded-2xl p-6 text-center">
                    <div className="text-6xl font-black bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-3">
                      35%
                    </div>
                    <div className="text-sm text-orange-300 font-bold uppercase">Less Admin</div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-2 border-pink-500/50 rounded-2xl p-6 text-center">
                    <div className="text-6xl font-black bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent mb-3">
                      28%
                    </div>
                    <div className="text-sm text-pink-300 font-bold uppercase">Fewer Sick Days</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-500/50 rounded-2xl p-6 text-center">
                    <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-3">
                      92%
                    </div>
                    <div className="text-sm text-purple-300 font-bold uppercase">Satisfaction</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl p-6 text-center shadow-lg shadow-orange-500/50">
                    <div className="text-6xl font-black text-white mb-3">
                      2.3:1
                    </div>
                    <div className="text-sm text-white font-black uppercase">Total ROI</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/10 text-center">
                <Link
                  href="/v2e/case-studies"
                  className="inline-flex items-center gap-2 text-orange-400 font-black text-lg uppercase hover:gap-4 transition-all"
                >
                  See All Wins
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Maximum Impact */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            READY TO<br />
            <span className="text-yellow-300">EXPLODE YOUR ROI?</span>
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-bold max-w-3xl mx-auto">
            Join the 3,500+ NZ businesses already winning with Southern Cross
          </p>
          <Link
            href="/v2e/contact"
            className="group relative inline-block"
          >
            <div className="absolute -inset-2 bg-white rounded-2xl blur opacity-50 group-hover:opacity-75 transition"></div>
            <div className="relative inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-2xl uppercase shadow-2xl">
              Launch Now
              <Rocket className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer - Bold */}
      <footer className="bg-slate-950 text-white py-16 border-t border-orange-500/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                  BOOST
                </span>
              </div>
              <p className="text-sm text-slate-400 font-bold">
                Powered by Southern Cross<br />Health Society
              </p>
            </div>

            <div>
              <h4 className="font-black mb-6 text-orange-400 uppercase tracking-wide">Navigate</h4>
              <div className="space-y-3 text-sm">
                <Link href="/v2e" className="block text-slate-400 hover:text-white transition-colors font-bold">Home</Link>
                <Link href="/v2e/how-it-works" className="block text-slate-400 hover:text-white transition-colors font-bold">Process</Link>
                <Link href="/v2e/case-studies" className="block text-slate-400 hover:text-white transition-colors font-bold">Results</Link>
                <Link href="/v2e/resources" className="block text-slate-400 hover:text-white transition-colors font-bold">Tools</Link>
              </div>
            </div>

            <div>
              <h4 className="font-black mb-6 text-pink-400 uppercase tracking-wide">Connect</h4>
              <div className="space-y-3 text-sm text-slate-400 font-bold">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/v2e/contact" className="block hover:text-white transition-colors">Get Started</Link>
              </div>
            </div>

            <div>
              <h4 className="font-black mb-6 text-purple-400 uppercase tracking-wide">Legal</h4>
              <div className="space-y-3 text-sm">
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors font-bold">Privacy</Link>
                <Link href="#" className="block text-slate-400 hover:text-white transition-colors font-bold">Terms</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">
              &copy; 2025 BoostWellbeing. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Version Switcher */}
      <VersionSwitcher />
    </div>
  );
}
