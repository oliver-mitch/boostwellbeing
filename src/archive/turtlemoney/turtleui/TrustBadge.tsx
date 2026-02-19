'use client';


import { Shield, Award, Lock, CheckCircle, Star, Users } from 'lucide-react';

type BadgeType = 'security' | 'certified' | 'encrypted' | 'verified' | 'rated' | 'trusted';

interface TrustBadgeProps {
  type: BadgeType;
  text: string;
  subtitle?: string;
  className?: string;
}

const badgeConfig = {
  security: {
    icon: Shield,
    color: 'text-turtle-green-600',
    bg: 'bg-turtle-green-50',
    border: 'border-turtle-green-200',
  },
  certified: {
    icon: Award,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  encrypted: {
    icon: Lock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  verified: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  rated: {
    icon: Star,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  trusted: {
    icon: Users,
    color: 'text-turtle-green-600',
    bg: 'bg-turtle-green-50',
    border: 'border-turtle-green-200',
  },
};

export function TrustBadge({ type, text, subtitle, className = '' }: TrustBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl border-2 ${config.bg} ${config.border} ${className}`}
    >
      <Icon className={`w-6 h-6 ${config.color} flex-shrink-0`} />
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900 text-sm">{text}</span>
        {subtitle && <span className="text-xs text-slate-600">{subtitle}</span>}
      </div>
    </div>
  );
}

interface TrustBadgeGridProps {
  badges: Array<{
    type: BadgeType;
    text: string;
    subtitle?: string;
  }>;
  className?: string;
}

export function TrustBadgeGrid({ badges, className = '' }: TrustBadgeGridProps) {
  return (
    <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
      {badges.map((badge, index) => (
        <TrustBadge key={index} {...badge} />
      ))}
    </div>
  );
}