import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'BoostWellbeing - Transform Your Team\'s Health & Wellbeing',
  description: 'Southern Cross group health insurance for NZ businesses. Comprehensive workplace wellbeing assessments and ROI-driven health solutions for HR managers and business owners.',
  keywords: ['group health insurance', 'Southern Cross', 'workplace wellbeing', 'employee health', 'New Zealand', 'HR solutions', 'business health insurance'],
  authors: [{ name: 'BoostWellbeing' }],
  openGraph: {
    title: 'BoostWellbeing - Group Health Insurance & Workplace Wellness',
    description: 'Proven 2:1 ROI with Southern Cross group health insurance. Reduce sick days by 85% and boost productivity.',
    type: 'website',
    locale: 'en_NZ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}