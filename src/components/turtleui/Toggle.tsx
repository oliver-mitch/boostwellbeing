'use client';

import React from 'react';

interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  description?: string;
  className?: string;
}

export function Toggle({ label, enabled, onChange, description, className = '' }: ToggleProps) {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div className="flex-1">
        <label className="text-sm font-medium text-slate-700 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-turtle-green-500 focus:ring-offset-2 ${
          enabled ? 'bg-turtle-green-500' : 'bg-slate-300'
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

interface ToggleCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
}

export function ToggleCard({
  title,
  description,
  enabled,
  onChange,
  icon,
  badge,
  className = '',
}: ToggleCardProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
        enabled
          ? 'border-turtle-green-500 bg-turtle-green-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {icon && (
            <div className={`p-2 rounded-xl ${enabled ? 'bg-turtle-green-100' : 'bg-slate-100'}`}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-slate-900">{title}</h4>
              {badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-turtle-orange-100 text-turtle-orange-700 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
        </div>

        {/* Toggle indicator */}
        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          enabled ? 'border-turtle-green-500 bg-turtle-green-500' : 'border-slate-300'
        }`}>
          {enabled && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}