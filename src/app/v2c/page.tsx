'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, BarChart3, TrendingUp, DollarSign, Users, Clock, Target, Award, LineChart } from 'lucide-react';
import VersionSwitcher from '@/components/VersionSwitcher';

export default function V2CHomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/v2c" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">BoostWellbeing</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/v2c" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/v2c/how-it-works" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                ROI Analysis
              </Link>
              <Link href="/v2c/case-studies" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Results
              </Link>
              <Link href="/v2c/resources" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Calculators
              </Link>
              <Link href="/v2c/contact" className="bg-emerald-600 text-white px-6 py-2.5 rounded font-semibold hover:bg-emerald-700 transition-colors">
                Get Data
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Key Metrics */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                Data-Driven Employee Benefits
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                2:1 Average ROI on Employee Health Benefits
              </h1>

              <p className="text-xl mb-8 text-emerald-50 leading-relaxed">
                Measurable results. Predictable costs. Proven retention outcomes for NZ businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/v2c/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded font-bold text-lg hover:bg-emerald-50 transition-all"
                >
                  Calculate Your ROI
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/v2c/resources"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white/20 transition-all"
                >
                  View Data
                  <BarChart3 className="w-5 h-5" />
                </Link>
              </div>

              {/* Quick Stats Bar */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">3,500+</div>
                  <div className="text-sm text-emerald-100">Companies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">950K+</div>
                  <div className="text-sm text-emerald-100">Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">95%</div>
                  <div className="text-sm text-emerald-100">Positive ROI</div>
                </div>
              </div>
            </div>

            {/* ROI Visual */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Annual Cost vs. Benefit Analysis</h3>
                  <p className="text-sm text-slate-600">Average 120-person company</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Investment</span>
                      <span className="text-sm font-bold text-slate-900">$72,000</span>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 w-1/3"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Productivity Gains</span>
                      <span className="text-sm font-bold text-emerald-600">$98,000</span>
                    </div>
                    <div className="h-4 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-1/2"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Retention Savings</span>
                      <span className="text-sm font-bold text-emerald-600">$46,000</span>
                    </div>
                    <div className="h-4 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-1/4"></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Net Benefit</span>
                      <span className="text-2xl font-bold text-emerald-600">+$72,000</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">2:1 return on investment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Measurable Business Impact</h2>
            <p className="text-xl text-slate-600">Real data from NZ businesses using group health schemes</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-slate-50 border-l-4 border-emerald-600 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="text-4xl font-bold text-slate-900">85%</div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Reduced Sick Days</div>
              <p className="text-xs text-slate-500">Average across all clients</p>
            </div>

            <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
                <div className="text-4xl font-bold text-slate-900">53%</div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Stay for Benefits</div>
              <p className="text-xs text-slate-500">Top retention driver</p>
            </div>

            <div className="bg-slate-50 border-l-4 border-purple-600 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-700" />
                </div>
                <div className="text-4xl font-bold text-slate-900">$600</div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Cost per Employee</div>
              <p className="text-xs text-slate-500">Average annual premium</p>
            </div>

            <div className="bg-slate-50 border-l-4 border-orange-600 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-700" />
                </div>
                <div className="text-4xl font-bold text-slate-900">35%</div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Less Admin Time</div>
              <p className="text-xs text-slate-500">HR efficiency gain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits with Numbers */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Numbers Don't Lie</h2>
            <p className="text-xl text-slate-600">Three pillars of measurable value</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-emerald-200">
              <div className="text-5xl font-bold text-emerald-600 mb-4">2:1</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Predictable ROI</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Every $1 invested returns $2+ through productivity gains, reduced turnover, and fewer sick days.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>95% of companies see positive ROI</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>Average payback period: 8 months</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-blue-200">
              <div className="text-5xl font-bold text-blue-600 mb-4">0hrs</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Admin Overhead</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Automated enrolment, claims processing, and reporting saves 35% of HR admin time.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Fully automated processes</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Real-time reporting dashboard</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-purple-200">
              <div className="text-5xl font-bold text-purple-600 mb-4">40%</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Retention Increase</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Companies see 40% improvement in retention, saving $15K-$50K per prevented departure.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>Top benefit cited by employees</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>93% employee uptake rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study with Data */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Verified Results</h2>
            <p className="text-xl text-slate-600">Real outcomes from NZ businesses</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-10 max-w-5xl mx-auto border border-emerald-200">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="inline-block bg-emerald-600 text-white px-4 py-1 rounded text-sm font-bold mb-4">
                  CASE STUDY
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Auckland Engineering Firm
                </h3>
                <p className="text-lg text-slate-700 mb-6">
                  120 employees • Manufacturing sector • Implemented January 2024
                </p>
                <p className="text-slate-600 leading-relaxed">
                  After implementing Southern Cross group health cover, this engineering firm tracked comprehensive metrics showing significant improvements across all KPIs.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-5 border-l-4 border-emerald-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">Admin Time Reduction</span>
                    <span className="text-3xl font-bold text-emerald-600">35%</span>
                  </div>
                  <div className="text-xs text-slate-500">12.5 hours saved per week</div>
                </div>

                <div className="bg-white rounded-lg p-5 border-l-4 border-blue-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">Sick Days Reduced</span>
                    <span className="text-3xl font-bold text-blue-600">28%</span>
                  </div>
                  <div className="text-xs text-slate-500">$84,000 productivity gain</div>
                </div>

                <div className="bg-white rounded-lg p-5 border-l-4 border-purple-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">Employee Satisfaction</span>
                    <span className="text-3xl font-bold text-purple-600">92%</span>
                  </div>
                  <div className="text-xs text-slate-500">Up from 67% pre-implementation</div>
                </div>

                <div className="bg-emerald-600 text-white rounded-lg p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold">Total Annual ROI</span>
                    <span className="text-3xl font-bold">2.3:1</span>
                  </div>
                  <div className="text-xs text-emerald-100">$166,000 net benefit year one</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-emerald-200">
              <Link
                href="/v2c/case-studies"
                className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-3 transition-all"
              >
                View full case study with detailed metrics
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Calculate Your Outcomes</h2>
            <p className="text-xl text-slate-600">Free tools to project your ROI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-emerald-200">
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ROI Calculator</h3>
              <p className="text-slate-600 mb-6">
                Input your company size and see projected savings, productivity gains, and ROI within 60 seconds.
              </p>
              <Link
                href="/v2c/resources#calculator"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded font-semibold hover:bg-emerald-700 transition-all"
              >
                Calculate ROI
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-blue-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <LineChart className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Wellbeing Metrics</h3>
              <p className="text-slate-600 mb-6">
                Benchmark your team's wellbeing against NZ averages and identify improvement opportunities.
              </p>
              <Link
                href="/v2c/resources#survey"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition-all"
              >
                Run Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to see your numbers?
          </h2>
          <p className="text-xl mb-10 text-emerald-50 max-w-2xl mx-auto">
            Get a customized ROI analysis for your business in under 5 minutes
          </p>
          <Link
            href="/v2c/contact"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-10 py-5 rounded font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
          >
            Get Your ROI Report
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BoostWellbeing</span>
              </div>
              <p className="text-sm text-slate-400">
                Data-driven employee benefits<br />powered by Southern Cross
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/v2c" className="block text-slate-400 hover:text-white transition-colors">Home</Link>
                <Link href="/v2c/how-it-works" className="block text-slate-400 hover:text-white transition-colors">ROI Analysis</Link>
                <Link href="/v2c/case-studies" className="block text-slate-400 hover:text-white transition-colors">Case Studies</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>ROI Calculator</p>
                <p>Wellbeing Assessment</p>
                <p>Cost Estimator</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/v2c/contact" className="block hover:text-white transition-colors">Request Analysis</Link>
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
