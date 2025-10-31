'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CalculatorProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Calculator({ title, description, children, className = '' }: CalculatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`card-turtle p-8 ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          {description && (
            <p className="text-lg text-slate-600">{description}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

interface CalculatorSectionProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function CalculatorSection({
  title,
  children,
  collapsible = false,
  defaultOpen = true
}: CalculatorSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  if (collapsible) {
    return (
      <div className="border-t border-slate-200 pt-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left mb-4 group"
        >
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-turtle-green-500 transition-colors">
            {title}
          </h3>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="space-y-4">{children}</div>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface CalculatorRowProps {
  label: string;
  children: React.ReactNode;
  description?: string;
}

export function CalculatorRow({ label, children, description }: CalculatorRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
      </div>
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
      <div>{children}</div>
    </div>
  );
}

interface CalculatorResultsProps {
  children: React.ReactNode;
  className?: string;
}

export function CalculatorResults({ children, className = '' }: CalculatorResultsProps) {
  return (
    <div className={`bg-gradient-to-br from-turtle-green-50 to-turtle-orange-50 rounded-2xl p-6 space-y-4 ${className}`}>
      {children}
    </div>
  );
}