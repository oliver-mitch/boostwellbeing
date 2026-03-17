'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { BoostIcon } from '@/components/icons/BoostIcon';

interface SiteNavProps {
  variant?: 'dark' | 'light';
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/group-health', label: 'Group Health' },
  { href: '/healthcare-costs', label: 'Healthcare Costs' },
  { href: '/about', label: 'About Us' },
];

export function SiteNav({ variant = 'dark' }: SiteNavProps) {
  const pathname = usePathname();
  const isDark = variant === 'dark';
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Desktop nav */}
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
            <a
              href="tel:+6421720710"
              className={`inline-flex items-center gap-1.5 font-medium ${
                isDark ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              } transition-colors`}
            >
              <Phone className="w-4 h-4" />
              021 720 710
            </a>
            <Link
              href="/contact"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isDark ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100'
            } transition-colors`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex flex-col gap-1 pt-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 rounded-lg text-lg font-medium ${
                      isActive
                        ? 'text-brand-blue bg-brand-blue/10'
                        : isDark
                          ? 'text-white/80 hover:text-white hover:bg-white/5'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    } transition-colors`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <a
                href="tel:+6421720710"
                className={`py-3 px-4 rounded-lg text-lg font-medium inline-flex items-center gap-2 ${
                  isDark ? 'text-white/80 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                } transition-colors`}
              >
                <Phone className="w-5 h-5" />
                021 720 710
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-lg font-semibold text-center text-lg hover:shadow-xl transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
