'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Heart, CheckCircle } from 'lucide-react';
import { BoostIcon } from '@/components/icons/BoostIcon';
import ScrollVideoBackground from '@/components/ScrollVideoBackground';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Scroll-Reactive Video Background */}
      <ScrollVideoBackground
        videoSrc="/videos/office-background.mp4"
        opacity={0.5}
        blur={true}
        parallaxSpeed={0.3}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-lg">
                <BoostIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  <span className="text-brand-blue">Boost</span>
                  <span className="text-white">Wellbeing</span>
                </span>
                <span className="text-xs text-white/70 font-medium">Better Health Starts at Work</span>
              </div>
            </Link>

            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Meet the <span className="text-brand-blue">Boost</span>Wellbeing Team
            </h1>

            <p className="text-xl text-white/90 leading-relaxed">
              Real people who understand health insurance and care about making it simple for your business
            </p>
          </div>

          {/* Team Bios */}
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Oliver Mitch */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-8 p-8">
                <div className="lg:col-span-1">
                  <div className="w-48 h-48 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <Users className="w-24 h-24 text-white" />
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-2xl font-bold text-slate-900">Oliver Mitch</h3>
                    <p className="text-slate-600 font-semibold">Co-Founder, <span className="text-brand-blue">Boost</span>Wellbeing</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="prose prose-lg max-w-none text-slate-700">
                    <p>
                      Oliver brings over 25 years of experience in sales, property and business development, but what people notice most is how easy he is to talk to. He has a knack for understanding what a business needs and explaining things in a way that actually makes sense.
                    </p>
                    <p>
                      After a long, high-paced career, Oliver stepped back to refocus on health, family and what matters most. That time shaped his view of why good workplace benefits, especially access to health care, make such a meaningful difference.
                    </p>
                    <p>
                      At BoostWellbeing, Oliver's role is simple: make it easy for businesses to bring Southern Cross health insurance into their workplace. He takes a friendly, no-pressure approach, helping leaders understand their options and choose a plan that fits their people and their budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ashley Griffiths */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-8 p-8">
                <div className="lg:col-span-1">
                  <div className="w-48 h-48 bg-brand-teal rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <Heart className="w-24 h-24 text-white" />
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-2xl font-bold text-slate-900">Ashley Griffiths</h3>
                    <p className="text-slate-600 font-semibold">Co-Founder, <span className="text-brand-blue">Boost</span>Wellbeing</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="prose prose-lg max-w-none text-slate-700">
                    <p>
                      Ashley has spent more than 10 years in the insurance industry, helping Kiwi businesses choose the right health, protection and employee benefit solutions. He's known for being relaxed, genuine and great at breaking down the technical stuff so anyone can feel confident in their decisions.
                    </p>
                    <p>
                      He takes the time to get to know each business - how big they are, how their teams work, and what they're trying to achieve - and then guides them through the Southern Cross workplace health insurance options that will support their people best.
                    </p>
                    <p>
                      At BoostWellbeing, Ashley keeps things straightforward: clear advice, practical choices, and support that feels personal, not transactional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Approach</h2>
              <div className="space-y-4 text-white/90">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">
                    We translate the world of health insurance into plain language and practical decisions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">
                    We take a friendly, no-pressure approach - helping you understand your options without the hard sell
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">
                    We're here to guide, not pressure - trust is our currency
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">
                    We make things simple, take care of the details, and help you make confident decisions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center mt-16">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to work with us?
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-white py-12 border-t border-white/10 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-white/60">
            <p>BoostWellbeing is an authorized partner helping businesses access Southern Cross Health Insurance workplace schemes.</p>
            <p className="mt-4">&copy; 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
