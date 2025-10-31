'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, Shield, Heart, TrendingUp, CheckCircle, Mail,
  Clock, UserCheck, TrendingDown,
  ArrowRight, BarChart3, Building2
} from 'lucide-react';
import TeamHealthCalculator from '@/src/components/TeamHealthCalculator';

export default function BoostWellbeingGroupHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="container-turtle py-6">
        <div className="flex items-center justify-between">
          <Link href="/boostwellbeing" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BoostWellbeing
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/boostwellbeing/group-health" className="text-blue-600 font-semibold">
              Group Health
            </Link>
            <Link href="/boostwellbeing/survey" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Wellbeing Survey
            </Link>
            <Link href="/boostwellbeing/contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/boostwellbeing" className="text-slate-700 hover:text-blue-600 transition-colors">
              ← Back Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Business Impact Focused */}
      <div className="container-turtle py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            For HR Managers & Business Owners
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Invest in Health.<br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Gain Competitive Advantage.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Southern Cross Group Health Insurance delivers measurable returns through reduced turnover,
            increased productivity, and a healthier, more engaged workforce.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span>3,500+ NZ businesses</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span>950,000+ members</span>
            </div>
          </div>
        </motion.div>

        {/* Key Business Benefits - Above the fold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Why Leading NZ Employers Choose Southern Cross
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Evidence-based benefits that directly impact your bottom line and company culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ROI Benefit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-turtle p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">2:1 Return on Investment</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    95% of companies measuring ROI see positive returns—most achieving $2+ for every $1 invested through reduced absenteeism and increased productivity.
                  </p>
                  <div className="text-xs text-emerald-600 font-semibold">Research-backed ROI</div>
                </div>
              </div>
            </motion.div>

            {/* Retention Benefit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card-turtle p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Attract & Retain Top Talent</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    53% of workers say health plans are a top reason they stay with their employer. Health insurance is now a must-have benefit for competitive recruitment.
                  </p>
                  <div className="text-xs text-blue-600 font-semibold">Reduce turnover costs</div>
                </div>
              </div>
            </motion.div>

            {/* Productivity Benefit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-turtle p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">85% Reduction in Sick Days</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    85% of employers credit wellness programs with reducing absenteeism and recruitment costs. Faster access to treatment means healthier, more present teams.
                  </p>
                  <div className="text-xs text-purple-600 font-semibold">Minimize downtime</div>
                </div>
              </div>
            </motion.div>

            {/* Pre-existing Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card-turtle p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Pre-existing Coverage from Day 1</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Group plans cover pre-existing conditions immediately—a unique benefit that provides peace of mind and comprehensive coverage for your entire team.
                  </p>
                  <div className="text-xs text-rose-600 font-semibold">Inclusive coverage</div>
                </div>
              </div>
            </motion.div>

            {/* Zero Admin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card-turtle p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Zero Admin Burden for HR</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    We handle all setup, employee onboarding, policy management, and ongoing support. Your HR team can focus on strategic initiatives, not administration.
                  </p>
                  <div className="text-xs text-amber-600 font-semibold">Turnkey solution</div>
                </div>
              </div>
            </motion.div>

            {/* Family Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card-turtle p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">Family Discounts up to 25%</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Employees can add partners and dependents at discounted group rates—extending care beyond the workplace and increasing the perceived value of your benefits package.
                  </p>
                  <div className="text-xs text-teal-600 font-semibold">Enhanced employee value</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ROI Statistics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white"
        >
          <div className="text-center mb-6">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">The Business Case is Clear</h3>
            <p className="text-blue-50 max-w-2xl mx-auto">
              Independent research shows workplace health programs deliver quantifiable returns
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm text-blue-50">See positive ROI</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">$2:$1</div>
              <div className="text-sm text-blue-50">Average return rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">53%</div>
              <div className="text-sm text-blue-50">Stay for health benefits</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm text-blue-50">Reduced sick days</div>
            </div>
          </div>
        </motion.div>

        {/* Calculator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Calculate Your Investment & Employee Value
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              See the real numbers: what you invest and what your team receives in value
            </p>
          </div>
          <TeamHealthCalculator />
        </motion.div>

        {/* Why Southern Cross Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-16"
        >
          <div className="card-turtle p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Why 3,500+ NZ Businesses Trust Southern Cross
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">NZ's Most Trusted Health Insurer</h4>
                  <p className="text-sm text-slate-600">950,000 members and nearly 90 years of healthcare expertise</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">No Waiting Periods for Group Plans</h4>
                  <p className="text-sm text-slate-600">Employees can access care immediately, unlike individual policies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Fast Access to Diagnostics & Treatment</h4>
                  <p className="text-sm text-slate-600">Get your team back to full health and productivity faster</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">BeingWellPlus Workplace Resources</h4>
                  <p className="text-sm text-slate-600">Self-service health and wellbeing hub for your team</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">24/7 Health Helpline</h4>
                  <p className="text-sm text-slate-600">Expert medical advice anytime your team needs it</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Flexible Contribution Options</h4>
                  <p className="text-sm text-slate-600">Subsidize all, part, or offer discounted group rates</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          id="contact"
          className="card-turtle p-8 text-center bg-gradient-to-br from-white to-blue-50"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Ready to Strengthen Your Benefits Package?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
            Get a tailored quote and see how Southern Cross can help you attract top talent,
            reduce turnover, and build a healthier, more productive workforce.
          </p>
          <Link
            href="/boostwellbeing/contact"
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white inline-flex items-center gap-2 px-8 py-4 text-lg mb-8 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Mail className="w-5 h-5" />
            Request a Business Quote
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span>Free consultation with HR benefits specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span>No obligation quote</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span>Customized to your business needs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="container-turtle py-8 border-t border-slate-200 mt-16">
        <div className="text-center text-sm text-slate-500">
          <p className="mb-2">
            <strong>BoostWellbeing</strong> is powered by Southern Cross Health Insurance.
            We help businesses implement comprehensive health and wellbeing solutions.
          </p>
          <p>
            Pricing is indicative and subject to Southern Cross underwriting. Minimum 15 employees required for group plans.
          </p>
        </div>
      </footer>
    </div>
  );
}
