import Link from 'next/link';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Questions Before Choosing Workplace Health Insurance',
  description: 'A practical guide for NZ business owners considering group health insurance. The 5 questions you should answer before committing.',
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz/guide',
  },
};

const QUESTIONS = [
  {
    number: 1,
    question: 'What are you actually trying to achieve?',
    explanation:
      'Is it a retention tool? A recruitment advantage? A genuine wellbeing investment? Your answer shapes everything — the plan you pick, how much you subsidise, and how you communicate it to your team. If you\'re just ticking a box, your people will treat it like one.',
    tip: 'Be honest about your motivation. A scheme chosen for the right reasons gets used more and delivers more value.',
  },
  {
    number: 2,
    question: 'How much should the company subsidise?',
    explanation:
      'You can cover 100% of premiums, split the cost with employees, or simply provide access to group rates (which are significantly cheaper than individual policies). Each approach sends a different message. Full subsidy says "we invest in you." Partial subsidy says "we\'re in this together." Access-only still saves your people money.',
    tip: 'Remember: employer-paid premiums attract Fringe Benefit Tax (FBT). Factor this into your budgeting.',
  },
  {
    number: 3,
    question: 'What level of cover makes sense for your team?',
    explanation:
      'Southern Cross offers plans ranging from hospital-only cover to comprehensive packages with dental, optical, and day-to-day care. A construction crew might value surgical and physio cover most. A tech team might care more about mental health support and specialists. There\'s no one-size-fits-all answer.',
    tip: 'Start with what your team would actually use. A cheaper plan that gets used beats an expensive one that doesn\'t.',
  },
  {
    number: 4,
    question: 'What happens with pre-existing conditions?',
    explanation:
      'This is often the first concern for employers. Group schemes through Southern Cross can offer cover for pre-existing conditions — something that\'s typically excluded on individual policies. The specifics depend on your group size and the conditions involved, but it\'s a significant advantage of going group.',
    tip: 'Don\'t assume your team can\'t be covered. Ask about pre-existing conditions early — the answer is often better than expected.',
  },
  {
    number: 5,
    question: 'Who will actually manage the scheme?',
    explanation:
      'Setting up is the easy part. The real work is onboarding new starters, managing leavers, handling renewal negotiations, and making sure your team actually understands and uses their cover. If nobody owns this internally, the scheme drifts into irrelevance within a year.',
    tip: 'This is exactly what BoostWellbeing does. We handle the ongoing management so your HR team doesn\'t have to.',
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <HelpCircle className="w-4 h-4" />
              Free Guide
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-normal text-slate-900 mb-4">
              5 Questions Before Choosing Workplace Health Insurance
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              A practical guide for NZ business owners. Answer these before you commit — and you&apos;ll make a better decision.
            </p>
          </div>

          <div className="space-y-10 mb-16">
            {QUESTIONS.map((q) => (
              <div key={q.number} className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-white">{q.number}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{q.question}</h2>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 pl-14">
                  {q.explanation}
                </p>
                <div className="pl-14 bg-brand-blue/5 p-4 rounded-xl">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-800 font-medium">{q.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-blue rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to talk through these questions?
            </h3>
            <p className="text-white/90 mb-6">
              Book a free 30-minute consultation. We&apos;ll help you answer all five and figure out the right approach for your team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-blue/10 hover:text-white transition-all"
            >
              Book Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/70 mt-4 text-sm">
              Or call us directly: <a href="tel:+6421720710" className="underline hover:text-white">021 720 710</a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
