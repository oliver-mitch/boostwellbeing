'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Heart,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Download,
  Mail,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface AssessmentAnswer {
  questionId: string;
  value: number;
}

interface Question {
  id: string;
  text: string;
  dimension: string;
}

interface Dimension {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface WellbeingResultsProps {
  answers: AssessmentAnswer[];
  questions: Question[];
  dimensions: Dimension[];
  onRestart: () => void;
}

interface DimensionScore {
  dimension: Dimension;
  score: number;
  percentile: number;
  status: 'thriving' | 'good' | 'struggling' | 'at-risk';
}

function calculateScores(
  answers: AssessmentAnswer[],
  questions: Question[],
  dimensions: Dimension[]
): { overallScore: number; dimensionScores: DimensionScore[] } {
  const dimensionScores: DimensionScore[] = dimensions.map(dim => {
    const dimQuestions = questions.filter(q => q.dimension === dim.id);
    const dimAnswers = dimQuestions.map(q =>
      answers.find(a => a.questionId === q.id)?.value || 0
    );

    // Calculate average and convert to 0-100 scale
    const avg = dimAnswers.reduce((sum, val) => sum + val, 0) / dimAnswers.length;
    const score = Math.round(((avg - 1) / 4) * 100); // Convert 1-5 scale to 0-100

    // Calculate percentile (simplified - in production, use actual benchmark data)
    const percentile = Math.round(score * 0.95); // Approximate percentile

    // Determine status
    let status: 'thriving' | 'good' | 'struggling' | 'at-risk';
    if (score >= 80) status = 'thriving';
    else if (score >= 60) status = 'good';
    else if (score >= 40) status = 'struggling';
    else status = 'at-risk';

    return { dimension: dim, score, percentile, status };
  });

  // Calculate weighted overall score
  const overallScore = Math.round(
    dimensionScores.reduce((sum, ds) => sum + ds.score, 0) / dimensionScores.length
  );

  return { overallScore, dimensionScores };
}

function getOverallStatus(score: number): {
  label: string;
  color: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
} {
  if (score >= 80) {
    return {
      label: 'Thriving',
      color: 'green',
      description: 'You\'re in the top 20% of workplace wellbeing',
      icon: CheckCircle
    };
  } else if (score >= 60) {
    return {
      label: 'Doing Well',
      color: 'blue',
      description: 'You\'re experiencing good workplace wellbeing',
      icon: TrendingUp
    };
  } else if (score >= 40) {
    return {
      label: 'Struggling',
      color: 'orange',
      description: 'Some areas need attention and improvement',
      icon: AlertCircle
    };
  } else {
    return {
      label: 'At Risk',
      color: 'red',
      description: 'Immediate action needed to improve wellbeing',
      icon: TrendingDown
    };
  }
}

// Helper function to get color classes (Tailwind needs full class names)
function getColorClasses(color: string) {
  const colorMap: Record<string, { bg: string; text: string; bgGradient: string; border: string; ring: string }> = {
    green: { bg: 'bg-green-100', text: 'text-green-600', bgGradient: 'bg-gradient-to-br from-green-50 to-green-100', border: 'border-green-200', ring: 'text-green-500' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100', border: 'border-blue-200', ring: 'text-blue-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100', border: 'border-orange-200', ring: 'text-orange-500' },
    red: { bg: 'bg-red-100', text: 'text-red-600', bgGradient: 'bg-gradient-to-br from-red-50 to-red-100', border: 'border-red-200', ring: 'text-red-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', bgGradient: 'bg-gradient-to-br from-purple-50 to-purple-100', border: 'border-purple-200', ring: 'text-purple-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', bgGradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100', border: 'border-yellow-200', ring: 'text-yellow-500' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', bgGradient: 'bg-gradient-to-br from-indigo-50 to-indigo-100', border: 'border-indigo-200', ring: 'text-indigo-500' },
  };
  return colorMap[color] || colorMap.green;
}

function getRecommendations(dimensionScores: DimensionScore[]): string[] {
  const recommendations: string[] = [];

  // Find lowest scoring dimensions
  const sortedScores = [...dimensionScores].sort((a, b) => a.score - b.score);
  const lowestDimensions = sortedScores.slice(0, 2);

  lowestDimensions.forEach(ds => {
    switch (ds.dimension.id) {
      case 'career':
        recommendations.push('Schedule a career conversation with your manager about growth opportunities and role alignment');
        recommendations.push('Identify 2-3 learning resources (courses, mentors, projects) that align with your career goals');
        break;
      case 'health':
        recommendations.push('Set firm boundaries between work and personal time - try a "shutdown ritual" at end of day');
        recommendations.push('Prioritize 7-8 hours of sleep and schedule regular breaks throughout your workday');
        break;
      case 'social':
        recommendations.push('Initiate coffee chats with 2-3 colleagues you\'d like to know better');
        recommendations.push('Share concerns with your manager and explore team-building opportunities');
        break;
      case 'autonomy':
        recommendations.push('Discuss flexible work arrangements with your manager (schedule, location, methods)');
        recommendations.push('Identify decisions you can own and communicate your preferred level of independence');
        break;
      case 'recognition':
        recommendations.push('Document your wins and impact - share monthly updates with your manager');
        recommendations.push('Ask for specific feedback on your contributions and growth areas');
        break;
      case 'financial':
        recommendations.push('Review your compensation with HR and discuss your benefits package');
        recommendations.push('Consider speaking with a financial advisor about stress management and planning');
        break;
    }
  });

  // Add general recommendations
  if (dimensionScores.some(ds => ds.score < 60)) {
    recommendations.push('Consider whether this role and workplace align with your values and long-term goals');
  }

  return recommendations.slice(0, 4); // Return top 4 recommendations
}

export default function WellbeingResults({
  answers,
  questions,
  dimensions,
  onRestart
}: WellbeingResultsProps) {
  const { overallScore, dimensionScores } = calculateScores(answers, questions, dimensions);
  const overallStatus = getOverallStatus(overallScore);
  const recommendations = getRecommendations(dimensionScores);
  const StatusIcon = overallStatus.icon;
  const statusColors = getColorClasses(overallStatus.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container-turtle py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Assessment Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Wellbeing Results
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Here's your personalized wellbeing profile across 6 key dimensions
          </p>
        </motion.div>

        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className={`card-turtle p-10 ${statusColors.bgGradient} border-2 ${statusColors.border}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <StatusIcon className={`w-10 h-10 ${statusColors.text}`} />
                  <h2 className="text-3xl font-bold text-slate-900">{overallStatus.label}</h2>
                </div>
                <p className="text-lg text-slate-700 mb-2">{overallStatus.description}</p>
                <p className="text-sm text-slate-600">
                  Based on validated wellbeing frameworks from Gallup, PERMA, and workplace psychology research
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      className="text-slate-200"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - overallScore / 100)}`}
                      className={`${statusColors.ring} transition-all duration-1000`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-slate-900">{overallScore}</div>
                    <div className="text-sm text-slate-600 mt-1">out of 100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dimension Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Dimension Scores</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dimensionScores.map((ds, index) => {
              const Icon = ds.dimension.icon;
              const barColorClass = ds.score >= 70 ? 'bg-turtle-green-500' : ds.score >= 50 ? 'bg-blue-500' : 'bg-orange-500';
              const dimColors = getColorClasses(ds.dimension.color);

              return (
                <motion.div
                  key={ds.dimension.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card-turtle p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 ${dimColors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${dimColors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{ds.dimension.name}</h3>
                      <p className="text-sm text-slate-600">{ds.dimension.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{ds.score}</div>
                      <div className="text-xs text-slate-500">/ 100</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${barColorClass}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${ds.score}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {ds.percentile}th percentile - {ds.status === 'thriving' ? 'Excellent' : ds.status === 'good' ? 'Good' : ds.status === 'struggling' ? 'Needs attention' : 'Requires focus'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <div className="card-turtle p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Personalized Recommendations</h2>
            </div>

            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-6 h-6 bg-turtle-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Team Health Insurance CTA */}
          <div className="card-turtle p-8 bg-gradient-to-br from-turtle-green-50 to-turtle-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-turtle-green-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">For Employers</h3>
            </div>
            <p className="text-slate-700 mb-6">
              Support your team's wellbeing with group health insurance. Pre-existing conditions covered, family discounts up to 25%.
            </p>
            <Link href="/teamhealth" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              Explore Team Health Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Contact/Download */}
          <div className="card-turtle p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Save Your Results</h3>
            </div>
            <p className="text-slate-700 mb-6">
              Want a copy of your results? We can send you a detailed PDF report with all your scores and recommendations.
            </p>
            <a
              href="mailto:hello@turtlemoney.co.nz?subject=Wellbeing%20Assessment%20Results"
              className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Me Results
            </a>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <div className="card-turtle p-8 inline-block">
            <p className="text-slate-700 mb-6">
              We recommend retaking this assessment quarterly to track your progress and identify trends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onRestart}
                className="btn-secondary px-8 py-3 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Retake Assessment
              </button>
              <Link href="/" className="btn-primary px-8 py-3 flex items-center justify-center gap-2">
                Back to Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-8 text-center text-xs text-slate-500 max-w-4xl mx-auto"
        >
          <p>
            <strong>Disclaimer:</strong> This assessment provides indicative insights for self-awareness and personal development.
            It is based on validated frameworks (Gallup Wellbeing Model, PERMA, Warwick-Edinburgh Mental Wellbeing Scale) but is not
            a diagnostic tool. For clinical mental health concerns, please consult a qualified healthcare professional. Results are
            benchmarked against general workplace wellbeing research and should be used as a guide for reflection and conversation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
