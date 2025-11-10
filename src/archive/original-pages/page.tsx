'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Brain,
  Shield,
  CheckCircle,
  Building2,
  LineChart,
  Target
} from 'lucide-react';

export default function BoostWellbeingHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="container-turtle py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BoostWellbeing
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/group-health" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Group Health
            </Link>
            <Link href="/survey" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Wellbeing Survey
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all">
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-turtle py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            For HR Managers & Business Leaders
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Transform Your Team's
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Health & Wellbeing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Discover how Southern Cross Group Health Insurance can boost productivity,
            reduce turnover, and create a thriving workplace culture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/survey"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 hover:shadow-xl transition-all"
            >
              Take the Wellbeing Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/group-health"
              className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              Explore Group Health
              <Shield className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span>3,500+ NZ businesses</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Award className="w-4 h-4 text-green-500" />
              <span>950,000+ members</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>2:1 Average ROI</span>
            </div>
          </div>
        </motion.div>

        {/* Two-Path Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Start Your Wellbeing Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose your path to understanding and improving workplace wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Survey Path */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/survey" className="block group">
                <div className="relative card-turtle p-8 hover:shadow-2xl transition-all border-2 border-transparent group-hover:border-blue-400 h-full">
                  <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    FREE • 10 MINS
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Wellbeing Survey
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Measure your team's wellbeing across 6 key dimensions. Get instant,
                    personalized insights and actionable recommendations based on science-backed research.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>6 validated wellbeing dimensions</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>Instant personalized report</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>Benchmark against NZ standards</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>100% anonymous and confidential</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Start Survey
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Group Health Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/group-health" className="block group">
                <div className="relative card-turtle p-8 hover:shadow-2xl transition-all border-2 border-transparent group-hover:border-green-400 h-full">
                  <div className="absolute top-4 right-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                    ROI: 2:1
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Group Health Insurance
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Invest in your team's health with Southern Cross Group Health Insurance.
                    Proven to reduce turnover, boost productivity, and attract top talent.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>85% reduction in sick days</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>No waiting periods or medical tests</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Pre-existing conditions covered</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Zero admin burden for HR</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ROI Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Business Case for Wellbeing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Research-backed evidence shows investing in employee wellbeing delivers measurable returns
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">2:1</div>
              <div className="text-sm text-slate-600 font-medium">Average ROI</div>
              <div className="text-xs text-slate-500 mt-1">Every $1 invested returns $2+</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">53%</div>
              <div className="text-sm text-slate-600 font-medium">Stay for Benefits</div>
              <div className="text-xs text-slate-500 mt-1">Top reason employees stay</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LineChart className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">85%</div>
              <div className="text-sm text-slate-600 font-medium">Reduced Sick Days</div>
              <div className="text-xs text-slate-500 mt-1">Measurable productivity gains</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-sm text-slate-600 font-medium">Positive ROI</div>
              <div className="text-xs text-slate-500 mt-1">Of companies measuring results</div>
            </div>
          </div>
        </motion.div>

        {/* Why BoostWellbeing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose BoostWellbeing?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine data-driven insights with proven health insurance solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-turtle p-8 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Science-Backed Assessment</h3>
              <p className="text-slate-600">
                Our wellbeing survey is built on validated frameworks from Gallup, PERMA,
                and workplace psychology research.
              </p>
            </div>

            <div className="card-turtle p-8 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Trusted Health Partner</h3>
              <p className="text-slate-600">
                Southern Cross is New Zealand's most trusted health insurer,
                serving 950,000+ Kiwis and 3,500+ businesses.
              </p>
            </div>

            <div className="card-turtle p-8 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Proven Business Results</h3>
              <p className="text-slate-600">
                Measurable improvements in productivity, retention, and employee
                satisfaction with clear ROI tracking.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Start with our free wellbeing survey or explore group health insurance options
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/survey"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 hover:shadow-xl transition-all"
            >
              Take Wellbeing Survey
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 hover:bg-white/10 transition-all"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-20">
        <div className="container-turtle">
          <div className="text-center text-sm text-slate-600">
            <p className="mb-2">
              <strong>BoostWellbeing</strong> - Powered by Southern Cross Health Insurance
            </p>
            <p>© 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
