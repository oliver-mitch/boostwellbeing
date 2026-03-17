import Link from 'next/link';
import { BoostIcon } from '@/components/icons/BoostIcon';

interface SiteFooterProps {
  showReferences?: boolean;
  additionalDisclaimer?: string;
}

const REFERENCES = [
  '¹ Employer benefits of health insurance, Kantar TNS, 2019',
  '² Southern Cross Health Society Workplace Wellness Survey 2023',
  '³ Reader\'s Digest Quality Service Award, Health Insurance winner 2025',
  '⁴ Southern Cross Medical Care Society Annual Report June 2025',
  '⁵ Reader\'s Digest Most Trusted Health Insurance Brand, 2017-2025',
];

export function SiteFooter({ showReferences = false, additionalDisclaimer }: SiteFooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
                <BoostIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-brand-blue">Boost</span>
                <span className="text-white">Wellbeing</span>
              </span>
            </div>
            <p className="text-sm text-white/60">
              In partnership with Southern Cross Health Society
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-white/60 hover:text-white transition-colors">Home</Link>
              <Link href="/group-health" className="block text-white/60 hover:text-white transition-colors">Group Health</Link>
              <Link href="/healthcare-costs" className="block text-white/60 hover:text-white transition-colors">Healthcare Costs</Link>
              <Link href="/guide" className="block text-white/60 hover:text-white transition-colors">Insurance Guide</Link>
              <Link href="/about" className="block text-white/60 hover:text-white transition-colors">About Us</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <a href="tel:+6421720710" className="block hover:text-white transition-colors">021 720 710</a>
              <p>contact@boostwellbeing.co.nz</p>
              <Link href="/contact" className="block hover:text-white transition-colors">Get in touch</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-white/60 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {showReferences && (
          <div className="border-t border-white/10 pt-8 mb-8">
            <h4 className="font-semibold mb-4 text-center">References</h4>
            <div className="text-xs text-white/60 space-y-2 max-w-4xl mx-auto">
              {REFERENCES.map((ref, i) => (
                <p key={i}>{ref}</p>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60 space-y-3 max-w-4xl mx-auto">
          <p className="font-semibold text-white/80">Important Information</p>
          <p>
            Subject to terms and conditions. A workplace health insurance scheme is only
            available for organisations with at least 5 full-time employees who join the scheme.
          </p>
          {additionalDisclaimer && <p>{additionalDisclaimer}</p>}
          <p className="border-t border-white/10 pt-4 mt-4">
            BoostWellbeing is an authorised partner helping businesses access Southern Cross
            Health Insurance workplace schemes.
          </p>
          <p className="mt-4">&copy; 2026 BoostWellbeing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
