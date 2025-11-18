'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, Users, Award, CheckCircle, Building2, PhoneCall, Star } from 'lucide-react';
import ScrollVideoBackground from '@/components/ScrollVideoBackground';
import { verifiedStats } from '@/data/southern-cross-stats';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Southern Cross Group Health Insurance for NZ Businesses | BoostWellbeing</title>
        <meta
          name="description"
          content="Partner with NZ's most trusted health insurer. Southern Cross group health insurance for businesses with 5+ employees. Free consultation, setup in under a week."
        />
        <meta name="keywords" content="Southern Cross, health insurance, workplace health, business health insurance, New Zealand, employee benefits" />
        <meta property="og:title" content="Southern Cross Group Health Insurance for NZ Businesses | BoostWellbeing" />
        <meta property="og:description" content="Partner with NZ's most trusted health insurer. Southern Cross group health insurance for businesses with 5+ employees." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.boostwellbeing.co.nz/" />
      </Head>

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
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">BoostWellbeing</span>
                <span className="text-xs text-white/70 font-medium">Better Health Starts at Work</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors font-medium">
                How It Works
              </a>
              <a href="#success-stories" className="text-white/80 hover:text-white transition-colors font-medium">
                Case Studies
              </a>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium">
                About Us
              </Link>
              <Link href="/contact" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-xl transition-all">
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

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
              Build a Healthier, More Productive Team with{' '}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Southern Cross
              </span>
              {' '}– Guided by BoostWellbeing
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto">
              We help NZ businesses bring Southern Cross workplace health insurance to their teams - with clear advice, friendly support, and options tailored to your people.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
              >
                Get Your Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#success-stories"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
              >
                See Success Stories
              </a>
            </div>

            {/* Credibility Band */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold text-white mb-2">3,500+</div>
                <div className="text-sm text-white/80">NZ businesses supported</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold text-white mb-2">9 Years</div>
                <div className="text-sm text-white/80">NZ's most trusted health insurer</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <Award className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-sm text-white/80">Southern Cross authorised partner</div>
              </div>
            </div>
            <p className="text-xs text-white/60 text-center mt-4">
              Source: Southern Cross Annual Report June 2025, Reader's Digest Most Trusted Brand 2017-2025
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefit Pillars Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Pillar 1: Simple Process */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Simple Process</h3>
              <p className="text-slate-700 leading-relaxed">
                We explain your options in plain language and help you choose what fits.
              </p>
            </div>

            {/* Pillar 2: Personal Support */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Personal Support</h3>
              <p className="text-slate-700 leading-relaxed">
                You'll work directly with Oliver or Ashley from start to finish.
              </p>
            </div>

            {/* Pillar 3: Trusted Partner */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Trusted Partner</h3>
              <p className="text-slate-700 leading-relaxed">
                Southern Cross is New Zealand's most trusted health insurer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Southern Cross Section */}
      <section id="why-southern-cross" className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Why Southern Cross for Your Business
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              As a Southern Cross authorised partner, we recommend them because they put people before profits and deliver exceptional value
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Pillar 1: Trust & Financial Strength */}
            <div className="bg-white p-10 rounded-2xl shadow-lg border-2 border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">New Zealand Owned, Not-for-Profit</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                Unlike commercial insurers, Southern Cross puts people before profits. We paid 68% of the value of all health insurance claims in New Zealand last year, and 94 cents of every premium dollar goes directly to claims. We're New Zealand's most trusted health insurer for 9 consecutive years.
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                  <div>
                    <p className="font-bold text-slate-900">Reader's Digest</p>
                    <p className="text-sm text-slate-700">Quality Service Award 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Comprehensive Team Protection */}
            <div className="bg-white p-10 rounded-2xl shadow-lg border-2 border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">More Than Just Insurance</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Range of plans tailored to different business sizes and budgets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Group scheme pricing advantages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Possible cover for pre-existing conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Digital onboarding for seamless employee experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Easy claiming options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Award-winning NZ-based customer service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Dedicated Account Manager for ongoing support</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: BeingWellPlus */}
            <div className="bg-white p-10 rounded-2xl shadow-lg border-2 border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">BeingWellPlus – Your Workplace Wellness Hub</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                When you subsidize health insurance for your team, you automatically get access to BeingWellPlus – a comprehensive self-service resource hub dedicated to improving health and wellbeing in your workplace.
              </p>
              <div className="space-y-3 text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Wellbeing modules to enhance employee experience, engagement, and culture</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Expert-led webinars to guide your workplace wellbeing journey</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Access to Healthy Futures research reports with workforce health insights</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>Invitations to Gather conference featuring thought leaders and wellbeing experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Business Case Section */}
      <section id="benefits" className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              The Business Case
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Quantified benefits that drive real business outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Benefit 1: Reduced Productivity Loss */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Cut Waiting Times in Half</h3>
              <div className="bg-blue-100 rounded-lg p-4 mb-4">
                <p className="text-4xl font-bold text-blue-700 mb-1">50%</p>
                <p className="text-sm text-blue-900">Less time on waiting lists</p>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                Employees with health insurance spend less than half the time on waiting lists for elective surgery. That's fewer projects derailed, less firefighting for managers, and more predictable resourcing.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-blue-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Reduced sick leave and faster project delivery</span>
                </div>
                <div className="flex items-start gap-2 text-blue-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Less disruption to team workflows</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">Source: Employer benefits of health insurance, Kantar TNS, 2019¹</p>
            </div>

            {/* Benefit 2: Talent Attraction & Retention */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Win the War for Talent</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                In New Zealand's competitive job market, offering Southern Cross health insurance signals that you invest in your people's wellbeing. This reduces costly recruitment spend and staff replacement costs.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-green-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Lower recruitment and hiring costs</span>
                </div>
                <div className="flex items-start gap-2 text-green-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Reduced staff turnover saves training investment</span>
                </div>
                <div className="flex items-start gap-2 text-green-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Attract top talent in competitive markets</span>
                </div>
              </div>
            </div>

            {/* Benefit 3: Cost Control & Transparency */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Control Costs, Maximize Value</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                Group scheme pricing gives you better value than individual plans. Predictable premiums and transparent reporting mean you can budget confidently and demonstrate ROI to leadership.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-purple-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Predictable costs for long-term financial planning</span>
                </div>
                <div className="flex items-start gap-2 text-purple-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Transparent utilization data for ROI tracking</span>
                </div>
                <div className="flex items-start gap-2 text-purple-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Sustainability through group pricing advantages</span>
                </div>
              </div>
            </div>

            {/* Benefit 4: Workplace Culture & Engagement */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Build a People-First Culture</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                Organizations that prioritize employee health and wellbeing see improved engagement, reduced absenteeism, and stronger company culture. Access to BeingWellPlus resources helps you create meaningful wellbeing initiatives that resonate with your team.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-orange-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Enhanced employee engagement and morale</span>
                </div>
                <div className="flex items-start gap-2 text-orange-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Reduced absenteeism and presenteeism</span>
                </div>
                <div className="flex items-start gap-2 text-orange-700 font-semibold text-sm">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Access to comprehensive wellbeing resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Case Studies: Real Impact Across New Zealand
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how businesses like yours are thriving with Southern Cross
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* ORIX Case Study */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">ORIX New Zealand</h3>
                  <p className="text-slate-600">Financial Services</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200 mb-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-bold text-slate-900">2025 Wayfinder Award Winner</p>
                    <p className="text-sm text-slate-700">Excellence in Workplace Wellbeing</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                With support from BoostWellbeing and Southern Cross, ORIX NZ designed a comprehensive wellbeing scheme that won national recognition.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">90 staff across four offices covered</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Improved engagement scores and lower turnover</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Stronger EVP story in recruitment</span>
                </div>
              </div>
            </div>

            {/* Tech Startup Case Study */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Wellington Tech Firm</h3>
                  <p className="text-slate-600">Technology & Software</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                A fast-growing software company with 45 employees implemented Southern Cross health insurance to attract and retain top tech talent in a competitive market.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-3xl font-bold text-green-700 mb-1">30%</p>
                <p className="text-sm text-slate-700">Reduction in staff turnover within first year</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Became employer of choice in local tech scene</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Faster time-to-productivity for new hires</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Reduced sick leave and presenteeism</span>
                </div>
              </div>
            </div>

            {/* Manufacturing Case Study */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Auckland Manufacturer</h3>
                  <p className="text-slate-600">Manufacturing & Production</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                An established manufacturer with 120 employees introduced group health insurance to address rising health costs and support an aging workforce.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <p className="text-3xl font-bold text-purple-700 mb-1">60%</p>
                <p className="text-sm text-slate-700">Faster return to work after surgery</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Minimized productivity loss from health issues</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Improved workforce morale and loyalty</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Pre-existing conditions covered for long-term staff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-slate-600">
              Celebrating excellence in health insurance and workplace wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Reader's Digest Most Trusted */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-16 h-16 fill-yellow-500 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Reader's Digest</h3>
              <p className="text-slate-700 font-semibold mb-1">Most Trusted Health Insurer</p>
              <p className="text-sm text-slate-600">9 Years Running (2017-2025)</p>
            </div>

            {/* Reader's Digest Quality Service */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Reader's Digest</h3>
              <p className="text-slate-700 font-semibold mb-1">Quality Service Award</p>
              <p className="text-sm text-slate-600">Health Insurance Winner 2025</p>
            </div>

            {/* Wayfinder Awards */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-16 h-16 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Wayfinder Awards</h3>
              <p className="text-slate-700 font-semibold mb-1">Celebrating Visionary Leaders</p>
              <p className="text-sm text-slate-600">People-First Workplace Wellbeing</p>
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
      <section id="how-it-works" className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A confidence-building process designed for New Zealand businesses
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Consultation & Analysis</h3>
                  <p className="text-lg font-semibold text-blue-700 mb-3">We Understand Your Workforce</p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    In your free consultation, we analyze your workforce requirements, company size, and budget. Minimum 5 employees needed to qualify for group scheme pricing.
                  </p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold">Timeline: 30-minute call</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Tailored Plan Design</h3>
                  <p className="text-lg font-semibold text-green-700 mb-3">Your Dedicated Account Manager Designs Your Scheme</p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    We create a customized Southern Cross health insurance plan that fits your business needs and budget. Choose from a range of coverage levels and options, including possible cover for pre-existing conditions.
                  </p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">Timeline: 2-3 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Digital Onboarding</h3>
                  <p className="text-lg font-semibold text-purple-700 mb-3">Seamless Employee Enrollment</p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Your team members complete a simple digital onboarding process. We provide all communication materials and enrollment support to make it effortless.
                  </p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-semibold">Timeline: 1-2 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Ongoing Support & Insights</h3>
                  <p className="text-lg font-semibold text-orange-700 mb-3">Continuous Partnership</p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Your dedicated Account Manager provides ongoing support, reporting, and insights. Access BeingWellPlus resources and participate in Southern Cross business initiatives like the Gather conference and Wayfinder Awards.
                  </p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-semibold">Timeline: Ongoing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
            >
              Get Your Free Consultation
              <PhoneCall className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Resources & Thought Leadership Section */}
      <section id="resources" className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Resources & Insights
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We use Southern Cross Healthy Futures research to help you make evidence-based wellbeing decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Resource 1: Healthy Futures Report */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <img
                  src="https://mc-fec8b19f-c7fd-4e56-8bfe-1850-cdn-endpoint.azureedge.net/society/-/media/southern-cross-health-society/health-insurance/images/business/healthy_futures_1.png"
                  alt="Healthy Futures Report"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Healthy Futures Report</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Understand New Zealand Workforce Health Trends
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  Access insights from the Southern Cross Healthy Futures Report Business Edition – research from 1,463 employees revealing workplace health attitudes and behaviors.
                </p>
                <a
                  href="https://mc-fec8b19f-c7fd-4e56-8bfe-1850-cdn-endpoint.azureedge.net/society/-/media/landing-pages/healthy-futures/healthy_futures_business_report_2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Download Report
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Resource 2: Wayfinder Awards */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <img
                  src="https://mc-fec8b19f-c7fd-4e56-8bfe-1850-cdn-endpoint.azureedge.net/society/-/media/southern-cross-health-society/health-insurance/images/business/wayfinder_awards.png"
                  alt="Wayfinder Awards"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Wayfinder Awards</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  See What's Possible
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  Learn from award-winning businesses using wellbeing as a core business strategy and thriving because of it.
                </p>
                <a
                  href="https://www.southerncross.co.nz/society/business/wayfinder-awards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  Explore Success Stories
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Resource 3: Gather Conference */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <img
                  src="https://mc-fec8b19f-c7fd-4e56-8bfe-1850-cdn-endpoint.azureedge.net/society/-/media/southern-cross-health-society/health-insurance/images/business/gather_3.png"
                  alt="Gather Conference"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Gather Conference</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Connect with Thought Leaders
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  Join fellow business leaders at Gather conference featuring thought leaders and wellbeing experts sharing the latest insights.
                </p>
                <a
                  href="https://www.southerncross.co.nz/society/business/gather-together"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about Southern Cross workplace health insurance
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ 1 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How many employees do we need?</h3>
              <p className="text-slate-700 leading-relaxed">
                Minimum 5 full-time employees required for a workplace health insurance scheme. This ensures you qualify for group scheme pricing advantages.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What about employees with pre-existing conditions?</h3>
              <p className="text-slate-700 leading-relaxed">
                Southern Cross offers possible cover for pre-existing conditions. Your Account Manager will discuss options during your consultation to find the best solution for your team.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How much does it cost?</h3>
              <p className="text-slate-700 leading-relaxed">
                Group scheme pricing varies based on team size, age demographics, and coverage level. We'll provide transparent quotes with no obligation during your free consultation.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How long does setup take?</h3>
              <p className="text-slate-700 leading-relaxed">
                Most businesses are fully set up within one week of decision. This includes consultation (30 minutes), plan design (2-3 days), and digital onboarding (1-2 days).
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What if employees leave?</h3>
              <p className="text-slate-700 leading-relaxed">
                We offer flexible scheme management. Your Account Manager helps you adjust coverage as your team changes, ensuring you maintain the right level of protection.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Do we have to cover all employees?</h3>
              <p className="text-slate-700 leading-relaxed">
                Coverage requirements vary by scheme type. Your dedicated Account Manager will discuss participation requirements and help design a plan that works for your business structure.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What's included beyond insurance?</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                You get comprehensive support beyond health cover:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>BeingWellPlus resource hub with wellbeing modules and expert webinars</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Dedicated Account Manager for ongoing support</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Reporting and insights on utilization</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Access to Gather conference</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Wayfinder Awards participation opportunities</span>
                </li>
              </ul>
            </div>

            {/* FAQ 8 - New */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Why work with BoostWellbeing instead of approaching Southern Cross directly?</h3>
              <p className="text-slate-700 leading-relaxed">
                We're here to translate the world of health insurance into plain language and practical decisions. We help you choose the right Southern Cross plan, communicate it to your people, and connect it into your wider wellbeing strategy – so it feels like part of your culture, not just another form to fill in.
              </p>
            </div>

            {/* FAQ 9 - New */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How does BoostWellbeing support us beyond signing the policy?</h3>
              <p className="text-slate-700 leading-relaxed">
                You'll work directly with Oliver or Ashley from start to finish. We provide ongoing support with employee communications, onboarding new staff to the scheme, and connecting you to BeingWellPlus resources. We're here to make sure your health insurance actually gets used and valued by your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Invest in Your Team's Health?
            </h2>
            <p className="text-2xl mb-12 text-white/90">
              Join 3,500+ New Zealand businesses who chose Southern Cross
            </p>

            {/* Benefits Recap */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <CheckCircle className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-semibold">Free consultation with no obligation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <CheckCircle className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-semibold">Tailored plan design with dedicated Account Manager</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <CheckCircle className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-semibold">Setup in under a week with full ongoing support</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-6 rounded-lg font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl"
            >
              Schedule Your Free Consultation
              <ArrowRight className="w-6 h-6" />
            </Link>

            <p className="text-white/80 mt-8">
              Questions? We're here to help. <Link href="/contact" className="underline hover:text-white">Contact us</Link>
            </p>
          </div>
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
                <Link href="/" className="block text-white/60 hover:text-white transition-colors">Home</Link>
                <a href="#how-it-works" className="block text-white/60 hover:text-white transition-colors">How It Works</a>
                <a href="#success-stories" className="block text-white/60 hover:text-white transition-colors">Case Studies</a>
                <a href="#resources" className="block text-white/60 hover:text-white transition-colors">Resources</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-white/60">
                <p>contact@boostwellbeing.co.nz</p>
                <Link href="/contact" className="block hover:text-white transition-colors">Get in touch</Link>
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

          {/* References Section */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <h4 className="font-semibold mb-4 text-center">References</h4>
            <div className="text-xs text-white/60 space-y-2 max-w-4xl mx-auto">
              <p>¹ Employer benefits of health insurance, Kantar TNS, 2019</p>
              <p>² Southern Cross Health Society Workplace Wellness Survey 2023</p>
              <p>³ Reader's Digest Quality Service Award, Health Insurance winner 2025</p>
              <p>⁴ Southern Cross Medical Care Society Annual Report June 2025</p>
              <p>⁵ Reader's Digest Most Trusted Health Insurance Brand, 2017-2025</p>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60 space-y-3 max-w-4xl mx-auto">
            <p className="font-semibold text-white/80">Important Information</p>
            <p>Subject to terms and conditions. A workplace health insurance scheme is only available for organizations with at least 5 full-time employees who join the scheme.</p>
            <p className="border-t border-white/10 pt-4 mt-4">
              BoostWellbeing is an authorized partner helping businesses access Southern Cross Health Insurance workplace schemes.
            </p>
            <p className="mt-4">&copy; 2025 BoostWellbeing. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
