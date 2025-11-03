'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Palette, Sparkles, BarChart3, Users, Zap, Video } from 'lucide-react';

export default function V2VersionSelector() {
  const versions = [
    {
      id: 'v2a',
      name: 'Classic Corporate',
      description: 'Traditional, trust-focused design with conservative styling and proven corporate aesthetics',
      icon: Users,
      color: 'from-blue-900 to-slate-800',
      textColor: 'text-blue-900',
      bgColor: 'bg-blue-50',
      features: ['Traditional layout', 'Trust-focused', 'Conservative colors', 'Professional tone']
    },
    {
      id: 'v2b',
      name: 'Modern Minimal',
      description: 'Clean, spacious, contemporary design with generous whitespace and simplified UI',
      icon: Sparkles,
      color: 'from-slate-600 to-slate-400',
      textColor: 'text-slate-700',
      bgColor: 'bg-slate-50',
      features: ['Lots of whitespace', 'Minimalist UI', 'Contemporary', 'Clean typography']
    },
    {
      id: 'v2c',
      name: 'Data-Driven',
      description: 'Metrics-focused design emphasizing ROI, analytics, and business outcomes',
      icon: BarChart3,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      features: ['Metrics-focused', 'Charts & graphs', 'ROI emphasis', 'Analytical feel']
    },
    {
      id: 'v2d',
      name: 'Humanized Corporate',
      description: 'Balanced approach combining professional credibility with approachable warmth',
      icon: Palette,
      color: 'from-blue-500 to-green-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: ['People-focused', 'Warm & approachable', 'Team imagery', 'Balanced tone']
    },
    {
      id: 'v2e',
      name: 'Bold & Dynamic',
      description: 'Vibrant, energetic design that stands out with strong colors and dynamic elements',
      icon: Zap,
      color: 'from-orange-500 to-pink-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      features: ['Vibrant colors', 'Energetic', 'Bold typography', 'Eye-catching']
    },
    {
      id: 'v2f',
      name: 'Video Background',
      description: 'Cinematic design with scroll-reactive video background and verified Southern Cross statistics',
      icon: Video,
      color: 'from-purple-500 to-blue-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      features: ['Scroll-reactive video', 'Parallax effects', 'Verified stats', 'Cinematic feel']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container-turtle py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
            ← Back to current site
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="container-turtle py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Palette className="w-4 h-4" />
            Version 2 Design Options
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Choose Your Preferred Design
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We've created 5 distinct design variations for the new BoostWellbeing website.
            Explore each version and share your feedback to help us choose the best direction.
          </p>
        </div>

        {/* Version Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {versions.map((version, index) => {
            const Icon = version.icon;
            return (
              <Link
                key={version.id}
                href={`/${version.id}`}
                className="group block"
              >
                <div className={`card-turtle p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-current ${version.textColor} h-full`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${version.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    {version.name}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {version.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {version.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${version.bgColor}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all ${version.textColor}`}>
                    View Version {version.id.toUpperCase()}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-4">How to Provide Feedback</h3>
          <div className="space-y-3 text-slate-600">
            <p>1. Click on each version above to explore the full design</p>
            <p>2. Navigate through all pages (Home, How It Works, Case Studies, Resources, Contact)</p>
            <p>3. Note which elements you like and dislike in each version</p>
            <p>4. Share your feedback with the team, including your top choice and specific elements you'd like to see in the final design</p>
          </div>
        </div>
      </div>
    </div>
  );
}
