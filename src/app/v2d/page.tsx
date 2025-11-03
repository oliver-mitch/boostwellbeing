'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Users, Smile, TrendingUp, Star, CheckCircle, MessageCircle } from 'lucide-react';
import VersionSwitcher from '@/components/VersionSwitcher';

export default function V2DHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Warm Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/v2d" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                BoostWellbeing
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/v2d" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/v2d/how-it-works" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/v2d/case-studies" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Success Stories
              </Link>
              <Link href="/v2d/resources" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Resources
              </Link>
              <Link href="/v2d/contact" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all">
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Human Touch */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Trusted by 3,500+ NZ businesses
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Health benefits your team will{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  actually love
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Partner with Southern Cross to create a group health plan that shows your team you care—while reducing costs and boosting retention.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/v2d/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
                >
                  Request a tailored quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/v2d/case-studies"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 transition-all"
                >
                  See success stories
                  <Star className="w-5 h-5" />
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    <strong>950,000+</strong> Kiwis trust Southern Cross
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Happy team collaborating in modern NZ workplace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <Smile className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900">92%</div>
                    <div className="text-sm text-slate-600">Employee Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits with Heart */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Benefits that make a difference
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We've designed our approach around what matters most—to your business and your people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Costs you can predict</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                No surprises, no hidden fees. Just transparent pricing that fits your budget and grows with your team.
              </p>
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>Average 2:1 ROI</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Admin made simple</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We handle the paperwork so your HR team can focus on what they do best—supporting your people.
              </p>
              <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>35% less admin time</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Teams that stay</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                53% of employees say benefits are their top reason for staying. Give them a reason to stay with you.
              </p>
              <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>40% better retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Human-Centered */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              A simple journey, together
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We'll guide you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Let's talk</h3>
              <p className="text-slate-600 leading-relaxed">
                We'll chat about your team's needs, your goals, and what matters most to your business.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">We'll design together</h3>
              <p className="text-slate-600 leading-relaxed">
                Our team creates a tailored Southern Cross plan that fits your budget and supports your people.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Smile className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">You'll see the difference</h3>
              <p className="text-slate-600 leading-relaxed">
                Watch your team thrive with ongoing support, insights, and care that makes a real impact.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/v2d/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
            >
              Start the conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Real Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Real teams, real results
            </h2>
            <p className="text-xl text-slate-600">
              See how NZ businesses are creating healthier, happier workplaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-100">
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>

              <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                "Our team feels valued and supported. Since implementing Southern Cross cover, we've seen a real shift in morale and productivity. It's been a game-changer for retention."
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <div className="font-bold text-slate-900">Sarah Chen</div>
                  <div className="text-sm text-slate-600">HR Director, Auckland Engineering Firm</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">35%</div>
                  <div className="text-xs text-slate-600">Less admin</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">28%</div>
                  <div className="text-xs text-slate-600">Fewer sick days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-xs text-slate-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-100">
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>

              <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                "The ROI has been incredible—not just financially, but in team wellbeing. Our people know we care about their health, and that's translated into better performance across the board."
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <div>
                  <div className="font-bold text-slate-900">James Wilson</div>
                  <div className="text-sm text-slate-600">CEO, Wellington Tech Company</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-green-200 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">40%</div>
                  <div className="text-xs text-slate-600">Better retention</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">2:1</div>
                  <div className="text-xs text-slate-600">ROI</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-xs text-slate-600">Uptake rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/v2d/case-studies"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-lg hover:gap-3 transition-all"
            >
              Read more success stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Free tools to get started
            </h2>
            <p className="text-xl text-slate-600">
              Explore what's possible for your team
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Wellbeing Assessment</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Take our 2-minute survey to understand your team's wellbeing and identify opportunities to make a difference.
              </p>
              <Link
                href="/v2d/resources#survey"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Start the assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Savings Calculator</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                See how much you could save while creating a healthier workplace. Get your personalized estimate in minutes.
              </p>
              <Link
                href="/v2d/resources#calculator"
                className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all"
              >
                Calculate savings
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warm CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to invest in your team's wellbeing?
            </h2>
            <p className="text-xl mb-10 text-blue-50 leading-relaxed">
              Join 3,500+ NZ businesses who've made the choice to support their people with Southern Cross group health cover
            </p>
            <Link
              href="/v2d/contact"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl"
            >
              Let's create your plan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BoostWellbeing</span>
              </div>
              <p className="text-sm text-slate-400">
                Caring for your team,<br />powered by Southern Cross
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <div className="space-y-2 text-sm">
                <Link href="/v2d" className="block text-slate-400 hover:text-white transition-colors">Home</Link>
                <Link href="/v2d/how-it-works" className="block text-slate-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/v2d/case-studies" className="block text-slate-400 hover:text-white transition-colors">Success Stories</Link>
                <Link href="/v2d/resources" className="block text-slate-400 hover:text-white transition-colors">Resources</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/v2d/contact" className="block hover:text-white transition-colors">Send us a message</Link>
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
