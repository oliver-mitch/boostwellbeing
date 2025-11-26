'use client';

import React from 'react';
import Link from 'next/link';
import { BoostIcon } from '@/components/icons/BoostIcon';
import { Shield } from 'lucide-react';

export default function IconDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-brand-blue hover:text-brand-blue-dark font-medium">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          BoostWellbeing Custom Icon Preview
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Choose your preferred icon design to replace the Shield icon across the website.
        </p>

        {/* Current Icon */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Current Icon (Shield)</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* On white background */}
            <div className="text-center">
              <div className="bg-white border-2 border-slate-200 rounded-xl p-8 mb-4">
                <Shield className="w-16 h-16 text-brand-blue mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On White Background</p>
            </div>

            {/* On blue background */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4">
                <Shield className="w-16 h-16 text-white mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On Blue Background (Primary)</p>
            </div>

            {/* Small size */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-white" />
                  <span className="text-white font-bold text-lg">BoostWellbeing</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">Navigation Size (w-6 h-6)</p>
            </div>
          </div>
        </div>

        {/* Variation A: Arrow */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Variation A: "B" with Upward Arrow</h2>
              <p className="text-slate-600 mt-2">Stylized "B" with growth element representing boost/momentum</p>
            </div>
            <div className="px-4 py-2 bg-brand-blue/10 rounded-lg text-brand-blue font-medium">
              Default
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* On white background */}
            <div className="text-center">
              <div className="bg-white border-2 border-slate-200 rounded-xl p-8 mb-4">
                <BoostIcon variant="arrow" className="w-16 h-16 text-brand-blue mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On White Background</p>
            </div>

            {/* On blue background */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4">
                <BoostIcon variant="arrow" className="w-16 h-16 text-white mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On Blue Background (Primary)</p>
            </div>

            {/* Small size */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <BoostIcon variant="arrow" className="w-6 h-6 text-white" />
                  <span className="text-white font-bold text-lg">BoostWellbeing</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">Navigation Size (w-6 h-6)</p>
            </div>
          </div>
        </div>

        {/* Variation B: Monogram */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Variation B: "BW" Monogram</h2>
              <p className="text-slate-600 mt-2">Interlocking "B" and "W" letters for BoostWellbeing</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* On white background */}
            <div className="text-center">
              <div className="bg-white border-2 border-slate-200 rounded-xl p-8 mb-4">
                <BoostIcon variant="monogram" className="w-16 h-16 text-brand-blue mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On White Background</p>
            </div>

            {/* On blue background */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4">
                <BoostIcon variant="monogram" className="w-16 h-16 text-white mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On Blue Background (Primary)</p>
            </div>

            {/* Small size */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <BoostIcon variant="monogram" className="w-6 h-6 text-white" />
                  <span className="text-white font-bold text-lg">BoostWellbeing</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">Navigation Size (w-6 h-6)</p>
            </div>
          </div>
        </div>

        {/* Variation C: Geometric */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Variation C: Abstract Geometric "B"</h2>
              <p className="text-slate-600 mt-2">Modern geometric shapes forming a stylized "B"</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* On white background */}
            <div className="text-center">
              <div className="bg-white border-2 border-slate-200 rounded-xl p-8 mb-4">
                <BoostIcon variant="geometric" className="w-16 h-16 text-brand-blue mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On White Background</p>
            </div>

            {/* On blue background */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4">
                <BoostIcon variant="geometric" className="w-16 h-16 text-white mx-auto" />
              </div>
              <p className="text-sm text-slate-600">On Blue Background (Primary)</p>
            </div>

            {/* Small size */}
            <div className="text-center">
              <div className="bg-brand-blue rounded-xl p-8 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <BoostIcon variant="geometric" className="w-6 h-6 text-white" />
                  <span className="text-white font-bold text-lg">BoostWellbeing</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">Navigation Size (w-6 h-6)</p>
            </div>
          </div>
        </div>

        {/* Size Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Size Comparison (All Variations)</h2>
          <div className="bg-brand-blue rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Arrow variant sizes */}
              <div className="text-center">
                <BoostIcon variant="arrow" className="w-4 h-4 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">w-4 h-4</p>
              </div>
              <div className="text-center">
                <BoostIcon variant="arrow" className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">w-6 h-6 (Nav)</p>
              </div>
              <div className="text-center">
                <BoostIcon variant="arrow" className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">w-8 h-8</p>
              </div>
              <div className="text-center">
                <BoostIcon variant="arrow" className="w-16 h-16 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">w-16 h-16</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Next Steps</h3>
          <p className="text-slate-700">
            Please review the three icon variations above and let me know which one you prefer:
          </p>
          <ul className="list-disc list-inside text-slate-700 mt-3 space-y-1">
            <li><strong>Variation A (arrow)</strong> - "B" with upward arrow for growth/boost</li>
            <li><strong>Variation B (monogram)</strong> - Interlocking "BW" letters</li>
            <li><strong>Variation C (geometric)</strong> - Abstract geometric "B" shape</li>
          </ul>
          <p className="text-slate-700 mt-4">
            Once you choose, I'll replace all the Shield icons across the website with your selected design.
          </p>
        </div>
      </div>
    </div>
  );
}
