import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TurtleMoney - NZ\'s Smartest Financial Comparison',
  description: 'Compare insurance and home loans in New Zealand. Real-time rates, AI recommendations, and personalized insights for smarter financial decisions.',
  keywords: ['insurance comparison', 'home loans', 'New Zealand', 'financial advice', 'TurtleMoney'],
  authors: [{ name: 'TurtleMoney' }],
  openGraph: {
    title: 'TurtleMoney - Smart Financial Comparison for Kiwis',
    description: 'Better than LifeDirect or Squirrel. Real-time rates and AI-powered recommendations.',
    type: 'website',
    locale: 'en_NZ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}