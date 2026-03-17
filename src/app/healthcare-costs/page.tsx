import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Real Cost of Healthcare in New Zealand',
  description: 'Typical costs of common medical procedures in NZ, sourced from Southern Cross 2024-2025 claims data. See why workplace health insurance matters.',
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz/healthcare-costs',
  },
};

const PROCEDURES = [
  { name: 'Heart valve replacement', low: 75900, high: 102400, category: 'major' },
  { name: 'Knee replacement', low: 29200, high: 34700, category: 'major' },
  { name: 'Hip replacement', low: 27700, high: 33100, category: 'major' },
  { name: 'Prostate cancer surgery', low: 26700, high: 32300, category: 'major' },
  { name: 'Endometriosis surgery', low: 12400, high: 30900, category: 'major' },
  { name: 'Breast cancer surgery', low: 9400, high: 31100, category: 'major' },
  { name: 'Squint correction', low: 6200, high: 11000, category: 'moderate' },
  { name: 'Varicose veins', low: 5600, high: 9200, category: 'moderate' },
  { name: 'Tonsil removal', low: 5500, high: 8100, category: 'moderate' },
  { name: 'Grommet surgery', low: 2600, high: 3400, category: 'minor' },
  { name: 'Colonoscopy', low: 2300, high: 3900, category: 'minor' },
  { name: 'Skin cancer removal', low: 300, high: 2400, category: 'minor' },
];

const MAX_COST = 102400;

function formatCost(value: number): string {
  return `$${value.toLocaleString('en-NZ')}`;
}

export default function HealthcareCostsPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-normal text-slate-900 mb-4">
              The Real Cost of Healthcare in New Zealand
            </h1>
            <p className="text-xl text-slate-600 mb-4 leading-relaxed">
              Private healthcare in NZ isn&apos;t cheap. These are typical costs for common procedures, sourced directly from Southern Cross 2024-2025 claims data.
            </p>
            <p className="text-lg text-slate-700 mb-12 leading-relaxed">
              A single procedure can cost more than a year of workplace health insurance premiums for your entire team. That&apos;s why more NZ businesses are choosing to cover their people.
            </p>

            {/* Visual bar chart */}
            <div className="space-y-4 mb-12">
              {PROCEDURES.map((proc) => {
                const widthPercent = (proc.high / MAX_COST) * 100;
                const barColor =
                  proc.category === 'major'
                    ? 'bg-red-500'
                    : proc.category === 'moderate'
                    ? 'bg-amber-500'
                    : 'bg-blue-500';

                return (
                  <div key={proc.name} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-800">{proc.name}</span>
                      <span className="text-sm font-semibold text-slate-900 tabular-nums">
                        {formatCost(proc.low)} – {formatCost(proc.high)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-500`}
                        style={{ width: `${Math.max(widthPercent, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-12 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                <span className="text-slate-700">Major surgery ($10k+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full" />
                <span className="text-slate-700">Moderate procedures ($3k–$11k)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span className="text-slate-700">Minor procedures (under $4k)</span>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Public waiting lists are long and getting longer
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Southern Cross members spend less than half the time on waiting lists compared to the public system. For your team, that means faster treatment, less time off work, and less disruption to projects and workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-brand-blue rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Protect your team from unexpected healthcare costs
              </h3>
              <p className="text-white/90 mb-6">
                Workplace health insurance starts from around $15 per person per week — less than a single GP visit.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-brand-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-blue/10 hover:text-white transition-all"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-xs text-slate-500 text-center mt-8">
              Costs are GST inclusive, indicative, and sourced from Southern Cross 2024-2025 claims data. Actual costs vary by location, practitioner, and complexity.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
