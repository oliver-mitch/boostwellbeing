import Link from 'next/link';
import { ArrowRight, Shield, Users, Award, CheckCircle, Building2, PhoneCall, MessageSquare, Heart } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ScrollReveal, AnimatedCounter } from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Southern Cross Group Health Insurance for NZ Businesses | BoostWellbeing',
  description: 'We help New Zealand businesses bring Southern Cross workplace health insurance to life. Plain language advice, personal support, setup in under a week. 5+ employees to get started.',
  keywords: ['Southern Cross', 'group health insurance', 'workplace health insurance', 'New Zealand', 'employee benefits', 'workplace wellbeing'],
  openGraph: {
    title: 'Southern Cross Group Health Insurance for NZ Businesses | BoostWellbeing',
    description: 'We help NZ businesses bring Southern Cross workplace health insurance to life. Free consultation, setup in under a week.',
    type: 'website',
    locale: 'en_NZ',
    url: 'https://www.boostwellbeing.co.nz',
  },
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: 'BoostWellbeing',
    description: 'Southern Cross workplace health insurance advisory for NZ businesses',
    url: 'https://boostwellbeing.co.nz',
    telephone: '+64-21-720-710',
    email: 'contact@boostwellbeing.co.nz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    areaServed: {
      '@type': 'Country',
      name: 'New Zealand',
    },
    openingHours: 'Mo-Fr 09:00-17:00',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many employees do we need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Minimum 5 full-time employees who join the scheme. This qualifies you for group scheme pricing, which is significantly better than individual rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What about pre-existing conditions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Southern Cross offers possible cover for pre-existing conditions under group schemes — something that\'s often excluded on individual policies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Group scheme pricing varies by team size, age mix, and coverage level. As a rough guide, basic plans start around $15 per person per week.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why work with BoostWellbeing instead of going to Southern Cross directly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We translate insurance into plain language, help you pick the right plan, handle all the employee communications and onboarding, and stay involved so your scheme actually delivers value.',
        },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav variant="dark" />

      {/* Hero */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-fallback.jpg"
          >
            <source src="/videos/office-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
              Health Insurance Your Team Will Actually Use
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto">
              We help New Zealand businesses bring Southern Cross workplace health insurance to life — with plain language advice, personal support, and everything handled for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
              >
                Get Your Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
              >
                See How It Works
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4 border border-white/20 max-w-4xl mx-auto">
              <p className="text-white/90 text-base md:text-lg font-medium tracking-wide">
                Southern Cross Authorised Partner &nbsp;&bull;&nbsp; 5+ employees to get started &nbsp;&bull;&nbsp; Set up in under a week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* We're Not Just a Broker */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  We&apos;re Not Just a Broker
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                  You can go to Southern Cross directly — but most businesses that do end up with a policy that sits in an inbox. We design your scheme around your people, handle everything, and stay involved long after setup. You get Oliver or Ashley directly — not a call centre.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-to-br from-brand-blue/5 to-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                  <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Plain Language</h3>
                  <p className="text-slate-700 leading-relaxed">
                    We translate insurance into practical decisions — no jargon, no pressure. You&apos;ll understand exactly what you&apos;re getting.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-gradient-to-br from-brand-blue/5 to-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                  <div className="w-14 h-14 bg-brand-teal rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Personal Service</h3>
                  <p className="text-slate-700 leading-relaxed">
                    You work directly with Oliver or Ashley from first call to ongoing support. No rotating account managers.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-gradient-to-br from-brand-blue/5 to-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                  <div className="w-14 h-14 bg-brand-dark rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Beyond the Policy</h3>
                  <p className="text-slate-700 leading-relaxed">
                    We handle employee communications, onboarding, and connect health insurance into your wider wellbeing strategy.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Southern Cross — with condensed business case */}
      <section id="why-southern-cross" className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Why Southern Cross
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                New Zealand owned, not-for-profit, and trusted more than any other health insurer for 9 consecutive years
              </p>
            </div>
          </ScrollReveal>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <ScrollReveal delay={0}>
              <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <AnimatedCounter value="68%" className="text-4xl font-bold text-brand-blue mb-1" />
                <div className="text-sm text-slate-600">of all NZ health insurance claims</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <AnimatedCounter value="94c" className="text-4xl font-bold text-brand-blue mb-1" delay={0.1} />
                <div className="text-sm text-slate-600">per dollar paid in claims</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <AnimatedCounter value="50%" className="text-4xl font-bold text-brand-blue mb-1" delay={0.2} />
                <div className="text-sm text-slate-600">less time on waiting lists</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <AnimatedCounter value="5+" className="text-4xl font-bold text-brand-blue mb-1" delay={0.3} />
                <div className="text-sm text-slate-600">employees to get started</div>
              </div>
            </ScrollReveal>
          </div>

          {/* Condensed business case — bullet points */}
          <ScrollReveal delay={0.2}>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                  <p className="text-slate-700"><strong>Cut waiting times in half</strong> — employees with health insurance spend less than half the time on elective surgery waiting lists</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-teal mt-1 flex-shrink-0" />
                  <p className="text-slate-700"><strong>Attract &amp; retain talent</strong> — Southern Cross signals genuine investment in your people and becomes a benefit they don&apos;t give up lightly</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-dark mt-1 flex-shrink-0" />
                  <p className="text-slate-700"><strong>Predictable costs</strong> — group scheme pricing gives better value than individual plans with transparent premiums you can budget around</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <p className="text-xs text-slate-500 text-center mt-8">
            Source: Southern Cross Annual Report June 2025, Reader&apos;s Digest Most Trusted Brand 2017-2025, Kantar TNS 2019
          </p>
        </div>
      </section>

      {/* What Does It Cost — moved up per spec */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #4D90DE 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                What Does It Cost?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Group scheme pricing starts lower than you might think. Here&apos;s a rough guide — your actual quote depends on team size, age mix, and coverage level.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200 text-center h-full">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Basic</p>
                <p className="text-4xl font-bold text-slate-900 mb-1">~$15</p>
                <p className="text-slate-600 mb-4">per person / week</p>
                <p className="text-sm text-slate-700">
                  Core surgical and hospital cover. A solid foundation for any team.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-brand-blue/5 to-white p-8 rounded-2xl border-2 border-brand-blue/30 text-center relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <p className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2">Comprehensive</p>
                <p className="text-4xl font-bold text-slate-900 mb-1">~$25</p>
                <p className="text-slate-600 mb-4">per person / week</p>
                <p className="text-sm text-slate-700">
                  Broader cover including specialists, tests, and day-to-day care.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border-2 border-slate-200 text-center h-full">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Premium</p>
                <p className="text-4xl font-bold text-slate-900 mb-1">~$40+</p>
                <p className="text-slate-600 mb-4">per person / week</p>
                <p className="text-sm text-slate-700">
                  Full cover with higher limits, optical, dental, and wellness add-ons.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>FBT note:</strong> Employer-paid health insurance premiums are subject to Fringe Benefit Tax (FBT). Many businesses find the productivity and retention benefits far outweigh the FBT cost. We can walk you through the numbers.
              </p>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Indicative only. Based on Southern Cross workplace scheme rates effective January 2026. Final pricing confirmed by underwriting.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/group-health#calculator"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-4 rounded-lg font-semibold transition-all"
            >
              Try the Cost Estimator
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Southern Cross in Action */}
      <section id="case-studies" className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Southern Cross in Action
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Real businesses, real outcomes — powered by Southern Cross workplace schemes
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-blue/20 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-brand-blue" />
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
                  ORIX NZ designed a comprehensive wellbeing scheme with Southern Cross that won national recognition.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-slate-700">90 staff across four offices covered</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Improved engagement and lower turnover</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-teal/20 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-brand-blue" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Beca</h3>
                    <p className="text-slate-600">Engineering &amp; Professional Services</p>
                  </div>
                </div>
                <div className="bg-brand-teal/5 p-4 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-brand-blue mb-1">&ldquo;A true partner&rdquo;</p>
                  <p className="text-sm text-slate-700">— Chloe Stewart Tyson</p>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  NZ&apos;s largest professional services consultancy provides comprehensive health coverage for employees and families.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Immediate specialist care when needed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Improved talent attraction and loyalty</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-dark/20 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-brand-blue" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Ravensdown</h3>
                    <p className="text-slate-600">Agriculture &amp; Fertiliser</p>
                  </div>
                </div>
                <div className="bg-brand-dark/5 p-4 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-brand-blue mb-1">600+ employees</p>
                  <p className="text-sm text-slate-700">Fully subsidised coverage including families</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Strong retention in competitive market</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-slate-700">&ldquo;A benefit you don&apos;t give up lightly&rdquo; — Tracey Paterson, GM HR</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <p className="text-sm text-slate-500 text-center italic">
            These are Southern Cross clients. BoostWellbeing is a new advisory — we&apos;re building our own client stories and would love yours to be among them.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                From first call to fully covered — usually in under a week
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg p-8 border-2 border-brand-blue/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Consultation</h3>
                    <p className="text-slate-700 leading-relaxed">
                      We learn about your workforce, budget, and goals. No obligation, no pressure — just a clear picture of your options.
                    </p>
                    <div className="flex items-center gap-2 text-slate-600 mt-3">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                      <span className="font-semibold">30-minute call</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg p-8 border-2 border-brand-teal/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Tailored Plan Design</h3>
                    <p className="text-slate-700 leading-relaxed">
                      We design a Southern Cross scheme that fits your team — coverage levels, budget, and possible cover for pre-existing conditions.
                    </p>
                    <div className="flex items-center gap-2 text-slate-600 mt-3">
                      <div className="w-2 h-2 bg-brand-teal/50 rounded-full"></div>
                      <span className="font-semibold">2-3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg p-8 border-2 border-brand-dark/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Onboarding &amp; Launch</h3>
                    <p className="text-slate-700 leading-relaxed">
                      We handle employee communications and digital enrolment. Your team signs up, and cover begins.
                    </p>
                    <div className="flex items-center gap-2 text-slate-600 mt-3">
                      <div className="w-2 h-2 bg-brand-dark/50 rounded-full"></div>
                      <span className="font-semibold">1-2 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg p-8 border-2 border-brand-dark/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                    <span className="text-3xl font-bold text-white">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Ongoing Support</h3>
                    <p className="text-slate-700 leading-relaxed">
                      We stay involved — helping with new starters, renewals, and connecting you to BeingWellPlus wellbeing resources.
                    </p>
                    <div className="flex items-center gap-2 text-slate-600 mt-3">
                      <div className="w-2 h-2 bg-brand-dark rounded-full"></div>
                      <span className="font-semibold">Ongoing</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
              >
                Get Your Free Consultation
                <PhoneCall className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How many employees do we need?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Minimum 5 full-time employees who join the scheme. This qualifies you for group scheme pricing, which is significantly better than individual rates.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">What about pre-existing conditions?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Southern Cross offers possible cover for pre-existing conditions under group schemes — something that&apos;s often excluded on individual policies. We&apos;ll discuss the specifics during your consultation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How much does it cost?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Group scheme pricing varies by team size, age mix, and coverage level. As a rough guide, basic plans start around $15 per person per week. We provide transparent, no-obligation quotes in your free consultation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="bg-white p-8 rounded-2xl border-2 border-brand-blue/20 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Why work with BoostWellbeing instead of going to Southern Cross directly?</h3>
                <p className="text-slate-700 leading-relaxed">
                  You absolutely can go direct. But most businesses that do end up with a policy nobody uses. We translate insurance into plain language, help you pick the right plan, handle all the employee communications and onboarding, and stay involved so your scheme actually delivers value.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-brand-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Invest in Your Team&apos;s Health?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Free consultation, no obligation. Most businesses are fully set up in under a week.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-brand-blue px-12 py-6 rounded-lg font-bold text-xl hover:bg-brand-blue/10 hover:text-white transition-all shadow-2xl"
            >
              Schedule Your Free Consultation
              <ArrowRight className="w-6 h-6" />
            </Link>

            <p className="text-white/80 mt-8">
              Questions? <Link href="/contact" className="underline hover:text-white">Get in touch</Link> or call <a href="tel:+6421720710" className="underline hover:text-white">021 720 710</a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter showReferences />
    </div>
  );
}
