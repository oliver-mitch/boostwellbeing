'use client';

import React from 'react';
import { CheckCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';

interface QuoteCardProps {
  title: string;
  amount: number;
  frequency?: 'weekly' | 'fortnightly' | 'monthly' | 'annually';
  description?: string;
  highlight?: boolean;
  trend?: 'up' | 'down';
  children?: React.ReactNode;
  className?: string;
}

export function QuoteCard({
  title,
  amount,
  frequency = 'monthly',
  description,
  highlight = false,
  trend,
  children,
  className = '',
}: QuoteCardProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const frequencyLabel = {
    weekly: '/week',
    fortnightly: '/fortnight',
    monthly: '/month',
    annually: '/year',
  };

  return (
    <div
      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
        highlight
          ? 'border-turtle-green-500 bg-turtle-green-50 shadow-lg'
          : 'border-slate-200 bg-white'
      } ${className}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {description && (
              <p className="text-sm text-slate-600 mt-1">{description}</p>
            )}
          </div>
          {highlight && (
            <CheckCircle className="w-6 h-6 text-turtle-green-600 flex-shrink-0" />
          )}
        </div>

        {/* Amount */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900 font-mono">
            {formatAmount(amount)}
          </span>
          <span className="text-lg text-slate-600">{frequencyLabel[frequency]}</span>
          {trend && (
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
            </div>
          )}
        </div>

        {/* Additional content */}
        {children && <div className="pt-4 border-t border-slate-200">{children}</div>}
      </div>
    </div>
  );
}

interface QuoteResultLineProps {
  label: string;
  value: string | number;
  description?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}

export function QuoteResultLine({
  label,
  value,
  description,
  highlight = false,
  icon,
}: QuoteResultLineProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-200 last:border-b-0">
      <div className="flex items-start gap-2 flex-1">
        {icon && <div className="text-slate-400 mt-0.5">{icon}</div>}
        <div>
          <div className="text-sm font-medium text-slate-700">{label}</div>
          {description && (
            <div className="text-xs text-slate-500 mt-0.5">{description}</div>
          )}
        </div>
      </div>
      <div
        className={`text-sm font-semibold font-mono ${
          highlight ? 'text-turtle-green-600' : 'text-slate-900'
        }`}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
}

interface QuoteInfoBoxProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
}

export function QuoteInfoBox({ children, type = 'info' }: QuoteInfoBoxProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    success: 'bg-green-50 border-green-200 text-green-700',
  };

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles[type]}`}>
      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="text-sm flex-1">{children}</div>
    </div>
  );
}