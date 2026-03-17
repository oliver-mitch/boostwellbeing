import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Free Consultation',
  description: 'Schedule a free consultation with BoostWellbeing. We help NZ businesses set up Southern Cross workplace health insurance — usually in under a week.',
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz/contact',
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
