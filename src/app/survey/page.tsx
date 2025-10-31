'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  Heart,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Zap
} from 'lucide-react';
import WorkplaceWellbeingAssessment from '@/src/components/WorkplaceWellbeingAssessment';

export default function BoostWellbeingSurveyPage() {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <WorkplaceWellbeingAssessment onBack={() => setShowAssessment(false)} />;
  }

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
            <Link href="/boostwellbeing/group-health" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Group Health
            </Link>
            <Link href="/boostwellbeing/survey" className="text-blue-600 font-semibold">
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

      {/* Hero Section */}
      <div className="container-turtle py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            Free Science-Backed Assessment
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            How's your workplace wellbeing?
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Take our validated 10-minute assessment to discover your wellbeing score across 6 key dimensions.
            Get personalized insights based on research from Gallup, PERMA, and workplace psychology studies.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 mb-10">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span>10 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span>100% anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <span>Science-backed</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              <span>Instant results</span>
            </div>
          </div>

          <button
            onClick={() => setShowAssessment(true)}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-5 text-lg inline-flex items-center gap-3 rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-turtle p-6"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Career Wellbeing</h3>
            <p className="text-sm text-slate-600">
              Measure job satisfaction, purpose, and growth opportunities in your role
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-turtle p-6"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Physical & Mental Health</h3>
            <p className="text-sm text-slate-600">
              Assess stress levels, work-life balance, and overall vitality
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-turtle p-6"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Social Connection</h3>
            <p className="text-sm text-slate-600">
              Evaluate relationships with colleagues, managers, and sense of belonging
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card-turtle p-6"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Autonomy & Control</h3>
            <p className="text-sm text-slate-600">
              Understand your level of decision-making power and workplace flexibility
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card-turtle p-6"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Recognition & Growth</h3>
            <p className="text-sm text-slate-600">
              Measure how valued you feel and your progress toward meaningful goals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card-turtle p-6"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Financial Security</h3>
            <p className="text-sm text-slate-600">
              Assess financial stress, job security confidence, and benefits satisfaction
            </p>
          </motion.div>
        </div>

        {/* Why Take This Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-3xl p-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Why take this assessment?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Based on validated frameworks used by leading organizations worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Self-awareness</h4>
                  <p className="text-sm text-slate-600">
                    Gain clarity on which areas of your work life are thriving and which need attention
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Actionable insights</h4>
                  <p className="text-sm text-slate-600">
                    Receive personalized recommendations based on your unique results
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Benchmarking</h4>
                  <p className="text-sm text-slate-600">
                    See how your wellbeing compares to workplace wellbeing standards
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Track progress</h4>
                  <p className="text-sm text-slate-600">
                    Retake quarterly to monitor improvements and identify trends over time
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowAssessment(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 text-lg inline-flex items-center gap-3 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Research Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 card-turtle p-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Built on proven research
            </h3>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Our assessment methodology combines validated frameworks from leading workplace psychology research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="font-semibold text-slate-900 mb-2">Gallup Wellbeing Model</p>
              <p>5 essential elements of wellbeing validated across 150+ countries</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="font-semibold text-slate-900 mb-2">PERMA Framework</p>
              <p>Positive psychology's evidence-based model for human flourishing</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="font-semibold text-slate-900 mb-2">WEMWBS Scale</p>
              <p>Warwick-Edinburgh Mental Wellbeing validated measurement scale</p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            <p>
              <strong>Note:</strong> This assessment provides indicative insights for self-awareness and is not a diagnostic tool.
              For clinical mental health concerns, please consult a qualified healthcare professional.
            </p>
          </div>
        </motion.div>

        {/* CTA to Group Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-10 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Want to improve team wellbeing?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Explore how Southern Cross Group Health Insurance can support your team's health and wellbeing
          </p>
          <Link
            href="/boostwellbeing/group-health"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 hover:shadow-xl transition-all"
          >
            Learn About Group Health
            <ArrowRight className="w-5 h-5" />
          </Link>
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
