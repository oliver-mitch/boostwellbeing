'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BoostIcon } from '@/components/icons/BoostIcon';

interface SiteNavProps {
  variant?: 'dark' | 'light';
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/group-health', label: 'Group Health' },
  { href: '/survey', label: 'Wellbeing Survey' },
  { href: '/about', label: 'About Us' },
  { href: '/portal/login', label: 'Client Login' },
];

export function SiteNav({ variant = 'dark' }: SiteNavProps) {
  const pathname = usePathname();
  const isDark = variant === 'dark';

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isDark
          ? 'bg-slate-900/80 border-b border-white/10'
          : 'bg-white/80 border-b border-slate-200/50'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-lg">
              <BoostIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                <span className="text-brand-blue">Boost</span>
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Wellbeing</span>
              </span>
              {isDark && (
                <span className="text-xs text-white/70 font-medium">
                  Better Health Starts at Work
                </span>
              )}
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? 'text-brand-blue font-semibold'
                      : isDark
                        ? 'text-white/80 hover:text-white transition-colors font-medium'
                        : 'text-slate-600 hover:text-slate-900 transition-colors font-medium'
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
