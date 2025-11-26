import React from 'react';

interface IconProps {
  className?: string;
  variant?: 'arrow' | 'monogram' | 'geometric';
}

/**
 * Custom BoostWellbeing brand icon component
 *
 * Three design variations:
 * - 'arrow' (default): Stylized "B" with upward arrow representing growth
 * - 'monogram': Interlocking "BW" letters
 * - 'geometric': Abstract "B" using geometric shapes
 *
 * Usage:
 * <BoostIcon className="w-6 h-6 text-white" />
 * <BoostIcon variant="monogram" className="w-8 h-8 text-brand-blue" />
 */
export const BoostIcon: React.FC<IconProps> = ({ className = '', variant = 'arrow' }) => {
  // Variation A: "B" with Upward Arrow
  if (variant === 'arrow') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical spine of the "B" */}
        <path d="M6 4 L6 20" />

        {/* Top curve of "B" extending into upward arrow */}
        <path d="M6 4 L14 4 C16.5 4 18 5.5 18 8 C18 10.5 16.5 12 14 12 L6 12" />

        {/* Bottom curve of "B" */}
        <path d="M6 12 L15 12 C17.5 12 19 13.5 19 16 C19 18.5 17.5 20 15 20 L6 20" />

        {/* Upward arrow accent on top curve */}
        <path d="M16 6 L18 4 L20 6" />
      </svg>
    );
  }

  // Variation B: "BW" Monogram
  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* "B" - Left side */}
        <path d="M4 4 L4 20" />
        <path d="M4 4 L10 4 C12 4 13 5 13 7 C13 9 12 10 10 10 L4 10" />
        <path d="M4 10 L11 10 C13 10 14 11 14 13.5 C14 16 13 17 11 17 L4 17" />

        {/* "W" - Right side, sharing middle stroke */}
        <path d="M14 7 L14 4 L16 4 L18 13 L20 4 L22 4 L22 7" />
        <path d="M16 4 L18 13 L20 4" />
      </svg>
    );
  }

  // Variation C: Abstract Geometric "B"
  if (variant === 'geometric') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical spine */}
        <line x1="6" y1="4" x2="6" y2="20" />

        {/* Top rounded rectangle (upper bulge of B) */}
        <path d="M6 4 L14 4 C16.2 4 18 5.8 18 8 C18 10.2 16.2 12 14 12 L6 12 Z" />

        {/* Bottom rounded rectangle (lower bulge of B) */}
        <path d="M6 12 L15 12 C17.5 12 19 13.5 19 16 C19 18.5 17.5 20 15 20 L6 20 Z" />

        {/* Subtle upward growth element - small arrow/chevron */}
        <path d="M15 7 L17 5 L19 7" strokeWidth="1.5" />
      </svg>
    );
  }

  return null;
};

// Export default variant for convenience
export default BoostIcon;
