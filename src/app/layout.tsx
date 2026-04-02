import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'functionality_storage': 'denied',
                  'personalization_storage': 'denied',
                  'security_storage': 'granted'
                });

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}