import type { ReactNode } from 'react';

// Standalone layout — no BoostWellbeing nav, footer, or brand chrome.
// Risk Solutions Ltd branding only (scoped within this route).
export default function ProtectionAdviserLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {children}
    </div>
  );
}
