'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, ChevronDown } from 'lucide-react';

export default function VersionSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine current version from pathname
  const getCurrentVersion = () => {
    if (pathname.startsWith('/v2a')) return 'v2a';
    if (pathname.startsWith('/v2b')) return 'v2b';
    if (pathname.startsWith('/v2c')) return 'v2c';
    if (pathname.startsWith('/v2d')) return 'v2d';
    if (pathname.startsWith('/v2e')) return 'v2e';
    if (pathname.startsWith('/v2f')) return 'v2f';
    return null;
  };

  const currentVersion = getCurrentVersion();

  // Don't show on version selector page or non-v2 pages
  if (!currentVersion || pathname === '/v2') {
    return null;
  }

  const versions = [
    { id: 'v2a', name: 'Classic Corporate', color: 'bg-blue-600' },
    { id: 'v2b', name: 'Modern Minimal', color: 'bg-slate-600' },
    { id: 'v2c', name: 'Data-Driven', color: 'bg-emerald-600' },
    { id: 'v2d', name: 'Humanized Corporate', color: 'bg-gradient-to-r from-blue-500 to-green-500' },
    { id: 'v2e', name: 'Bold & Dynamic', color: 'bg-gradient-to-r from-orange-500 to-pink-500' },
    { id: 'v2f', name: 'Video Background', color: 'bg-gradient-to-r from-purple-500 to-blue-500' }
  ];

  const currentVersionData = versions.find(v => v.id === currentVersion);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 bg-white text-slate-900 px-4 py-3 rounded-lg shadow-xl border border-slate-200 hover:shadow-2xl transition-all font-medium"
        >
          <Palette className="w-5 h-5 text-slate-600" />
          <span className="text-sm">{currentVersionData?.name}</span>
          <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-50">
              <div className="p-3 bg-slate-50 border-b border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Switch Version
                </div>
              </div>

              <div className="py-2">
                {versions.map((version) => (
                  <Link
                    key={version.id}
                    href={`/${version.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${
                      currentVersion === version.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className={`w-4 h-4 rounded ${version.color}`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {version.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {version.id.toUpperCase()}
                      </div>
                    </div>
                    {currentVersion === version.id && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <Link
                  href="/v2"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  ← View All Versions
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
