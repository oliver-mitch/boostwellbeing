import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workplace Wellbeing Assessment',
  description: 'Take our free 10-minute assessment to evaluate your workplace wellbeing across 6 key dimensions. Get personalised recommendations for your team.',
  alternates: {
    canonical: 'https://www.boostwellbeing.co.nz/survey',
  },
};

export default function SurveyLayout({ children }: { children: ReactNode }) {
  return children;
}
