import { ArrowRight, Users, Heart, Phone, Mail } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { TrackedLink } from '@/components/TrackedLink';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Oliver & Ashley',
  description: 'Meet the team behind BoostWellbeing. We started this because too many businesses skip health insurance or sign up for a scheme nobody uses.',
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteNav variant="dark" />

      {/* Hero Section with Video Background */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/office-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              We&apos;re Oliver and Ashley
            </h1>

            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              BoostWellbeing exists because we saw too many businesses either skipping health insurance entirely or signing up for a scheme that nobody used. We started this to fix that — by being the advisers we&apos;d want to work with ourselves.
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
                    <div className="flex flex-col items-center gap-2 mt-4">
                      <a href="tel:+6421720710" className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue-dark transition-colors">
                        <Phone className="w-4 h-4" /> 021 720 710
                      </a>
                      <a href="mailto:contact@boostwellbeing.co.nz" className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue-dark transition-colors">
                        <Mail className="w-4 h-4" /> contact@boostwellbeing.co.nz
                      </a>
                    </div>
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
                      At BoostWellbeing, Oliver&apos;s role is simple: make it easy for businesses to bring Southern Cross health insurance into their workplace. He takes a friendly, no-pressure approach, helping leaders understand their options and choose a plan that fits their people and their budget.
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
                    <div className="flex flex-col items-center gap-2 mt-4">
                      <a href="tel:+6421720710" className="inline-flex items-center gap-2 text-sm text-brand-teal hover:text-brand-teal-dark transition-colors">
                        <Phone className="w-4 h-4" /> 021 720 710
                      </a>
                      <a href="mailto:contact@boostwellbeing.co.nz" className="inline-flex items-center gap-2 text-sm text-brand-teal hover:text-brand-teal-dark transition-colors">
                        <Mail className="w-4 h-4" /> contact@boostwellbeing.co.nz
                      </a>
                    </div>
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

          {/* Our Values */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-lg font-bold text-white">Plain language over jargon</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-lg font-bold text-white">Personal over transactional</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-lg font-bold text-white">Embedded over one-and-done</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-lg font-bold text-white">NZ businesses, not global platforms</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center mt-16">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to work with us?
            </h3>
            <TrackedLink
              href="/contact"
              eventName="cta_click"
              eventParams={{ label: 'get_free_consultation', section: 'about_page' }}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-10 py-5 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
