import type { Metadata } from 'next';
import ProtectionAdviser from './ProtectionAdviser';

export const metadata: Metadata = {
  title: 'Protection Adviser Tool — Risk Solutions Ltd',
  description: 'Personal insurance needs analysis tool. Powered by Risk Solutions Ltd (FSP718392).',
  robots: { index: false, follow: false },
};

export default function ProtectionAdviserPage() {
  return <ProtectionAdviser />;
}
