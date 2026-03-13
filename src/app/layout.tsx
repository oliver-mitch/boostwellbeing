import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: {
    default: 'BoostWellbeing — Southern Cross Workplace Health Insurance',
    template: '%s | BoostWellbeing',
  },
  description: 'Southern Cross group health insurance for NZ businesses. Plain language advice, personal support, and everything handled for you.',
  keywords: ['group health insurance', 'Southern Cross', 'workplace wellbeing', 'employee health', 'New Zealand', 'business health insurance'],
  authors: [{ name: 'BoostWellbeing' }],
  openGraph: {
    title: 'BoostWellbeing — Southern Cross Workplace Health Insurance',
    description: 'We help NZ businesses bring Southern Cross workplace health insurance to life.',
    type: 'website',
    locale: 'en_NZ',
    siteName: 'BoostWellbeing',
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