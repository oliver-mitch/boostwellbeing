'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Heart,
  Users,
  TrendingUp,
  Award,
  Shield,
  Check
} from 'lucide-react';
import WellbeingResults from './WellbeingResults';

interface Question {
  id: string;
  text: string;
  dimension: string;
}

interface AssessmentAnswer {
  questionId: string;
  value: number; // 1-5
}

const DIMENSIONS = [
  {
    id: 'career',
    name: 'Career Wellbeing',
    icon: Brain,
    color: 'purple',
    description: 'Job satisfaction, purpose, and growth'
  },
  {
    id: 'health',
    name: 'Physical & Mental Health',
    icon: Heart,
    color: 'green',
    description: 'Stress, work-life balance, and vitality'
  },
  {
    id: 'social',
    name: 'Social Connection',
    icon: Users,
    color: 'blue',
    description: 'Relationships and sense of belonging'
  },
  {
    id: 'autonomy',
    name: 'Autonomy & Control',
    icon: TrendingUp,
    color: 'orange',
    description: 'Decision-making power and flexibility'
  },
  {
    id: 'recognition',
    name: 'Recognition & Growth',
    icon: Award,
    color: 'yellow',
    description: 'Feeling valued and achieving goals'
  },
  {
    id: 'financial',
    name: 'Financial Security',
    icon: Shield,
    color: 'indigo',
    description: 'Financial stress and job security'
  }
];

const QUESTIONS: Question[] = [
  // Career Wellbeing (4 questions)
  { id: 'c1', text: 'I find my work meaningful and aligned with my values', dimension: 'career' },
  { id: 'c2', text: 'I have opportunities to learn and grow in my role', dimension: 'career' },
  { id: 'c3', text: 'I am clear about what is expected of me at work', dimension: 'career' },
  { id: 'c4', text: 'I feel enthusiastic about the work I do', dimension: 'career' },

  // Physical & Mental Health (4 questions)
  { id: 'h1', text: 'I feel energized and healthy most days', dimension: 'health' },
  { id: 'h2', text: 'I have a good balance between work and personal life', dimension: 'health' },
  { id: 'h3', text: 'I rarely feel burned out or emotionally drained from my work', dimension: 'health' },
  { id: 'h4', text: 'I get enough rest and can manage stress effectively', dimension: 'health' },

  // Social Connection (3 questions)
  { id: 's1', text: 'I have supportive relationships with my colleagues', dimension: 'social' },
  { id: 's2', text: 'My manager cares about my wellbeing and development', dimension: 'social' },
  { id: 's3', text: 'I feel like I truly belong and am accepted at work', dimension: 'social' },

  // Autonomy & Control (4 questions)
  { id: 'a1', text: 'I have control over how I complete my work', dimension: 'autonomy' },
  { id: 'a2', text: 'I can influence decisions that affect my work', dimension: 'autonomy' },
  { id: 'a3', text: 'I have flexibility in when and where I work', dimension: 'autonomy' },
  { id: 'a4', text: 'I can make important decisions without excessive oversight', dimension: 'autonomy' },

  // Recognition & Growth (3 questions)
  { id: 'r1', text: 'I receive recognition and appreciation for my contributions', dimension: 'recognition' },
  { id: 'r2', text: 'I am making progress toward my professional goals', dimension: 'recognition' },
  { id: 'r3', text: 'I feel my work makes a meaningful impact', dimension: 'recognition' },

  // Financial Security (3 questions)
  { id: 'f1', text: 'I feel financially secure and free from money worries', dimension: 'financial' },
  { id: 'f2', text: 'I am confident in my job security', dimension: 'financial' },
  { id: 'f3', text: 'My compensation and benefits meet my needs', dimension: 'financial' }
];

const SCALE_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

// Helper function to get color classes (Tailwind needs full class names)
function getColorClasses(color: string) {
  const colorMap: Record<string, { bg: string; text: string; bgDark: string; border: string }> = {
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', bgDark: 'bg-purple-400', border: 'border-purple-400' },
    green: { bg: 'bg-green-100', text: 'text-green-600', bgDark: 'bg-green-400', border: 'border-green-400' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', bgDark: 'bg-blue-400', border: 'border-blue-400' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', bgDark: 'bg-orange-400', border: 'border-orange-400' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', bgDark: 'bg-yellow-400', border: 'border-yellow-400' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', bgDark: 'bg-indigo-400', border: 'border-indigo-400' },
  };
  return colorMap[color] || colorMap.purple;
}

export default function WorkplaceWellbeingAssessment({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentDimension = DIMENSIONS[currentStep];
  const dimensionQuestions = QUESTIONS.filter(q => q.dimension === currentDimension.id);
  const progress = ((currentStep + 1) / DIMENSIONS.length) * 100;
  const colors = getColorClasses(currentDimension.color);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => {
      const existing = prev.filter(a => a.questionId !== questionId);
      return [...existing, { questionId, value }];
    });
  };

  const getAnswer = (questionId: string): number | undefined => {
    return answers.find(a => a.questionId === questionId)?.value;
  };

  const isDimensionComplete = () => {
    return dimensionQuestions.every(q => getAnswer(q.id) !== undefined);
  };

  const handleNext = () => {
    if (currentStep < DIMENSIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  if (showResults) {
    return <WellbeingResults answers={answers} questions={QUESTIONS} dimensions={DIMENSIONS} onRestart={onBack} />;
  }

  const Icon = currentDimension.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container-turtle py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">
                Step {currentStep + 1} of {DIMENSIONS.length}
              </span>
              <span className="text-sm text-slate-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-turtle"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Dimension Indicator */}
          <div className="flex items-center gap-4 mb-2">
            <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${colors.text}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{currentDimension.name}</h2>
              <p className="text-slate-600">{currentDimension.description}</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {dimensionQuestions.map((question, index) => {
              const answer = getAnswer(question.id);

              return (
                <div key={question.id} className="card-turtle p-6">
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-slate-700">{index + 1}</span>
                      </div>
                      <p className="text-lg text-slate-900 font-medium pt-1">{question.text}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    {SCALE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(question.id, option.value)}
                        className={`relative py-4 px-2 rounded-xl border-2 transition-all ${
                          answer === option.value
                            ? 'border-turtle-green-500 bg-turtle-green-50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {answer === option.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-turtle-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="text-center">
                          <div className={`text-2xl font-bold mb-1 ${
                            answer === option.value ? 'text-turtle-green-600' : 'text-slate-700'
                          }`}>
                            {option.value}
                          </div>
                          <div className={`text-xs leading-tight ${
                            answer === option.value ? 'text-turtle-green-700' : 'text-slate-500'
                          }`}>
                            {option.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="btn-secondary px-6 py-3 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-600">
              {dimensionQuestions.length - dimensionQuestions.filter(q => getAnswer(q.id) !== undefined).length} question
              {dimensionQuestions.length - dimensionQuestions.filter(q => getAnswer(q.id) !== undefined).length !== 1 ? 's' : ''} remaining
            </p>
          </div>

          <button
            onClick={handleNext}
            disabled={!isDimensionComplete()}
            className="btn-primary px-6 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === DIMENSIONS.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dimension Progress Indicators */}
        <div className="mt-12 grid grid-cols-6 gap-4">
          {DIMENSIONS.map((dim, index) => {
            const dimQuestions = QUESTIONS.filter(q => q.dimension === dim.id);
            const answeredCount = dimQuestions.filter(q => getAnswer(q.id) !== undefined).length;
            const isComplete = answeredCount === dimQuestions.length;
            const isCurrent = index === currentStep;
            const dimColors = getColorClasses(dim.color);

            return (
              <div
                key={dim.id}
                className={`p-3 rounded-xl text-center transition-all ${
                  isCurrent
                    ? `${dimColors.bg} border-2 ${dimColors.border}`
                    : isComplete
                    ? 'bg-turtle-green-50 border-2 border-turtle-green-400'
                    : 'bg-slate-50 border-2 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {isComplete && !isCurrent ? (
                    <div className="w-6 h-6 bg-turtle-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className={`w-6 h-6 rounded-full ${
                      isCurrent ? dimColors.bgDark : 'bg-slate-300'
                    }`} />
                  )}
                </div>
                <p className={`text-xs font-medium ${
                  isCurrent || isComplete ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  {dim.name.split(' ')[0]}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {answeredCount}/{dimQuestions.length}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
