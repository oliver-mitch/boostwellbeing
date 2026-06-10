import type { ReactNode } from 'react';

export const metadata = {
  title: 'TCS NZ — Proposal Companion',
  robots: { index: false, follow: false },
};

export default function TcsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
