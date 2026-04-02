'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  eventName: string;
  eventParams?: Record<string, string>;
  children: ReactNode;
}

export function TrackedLink({ eventName, eventParams, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}

interface TrackedAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  eventParams?: Record<string, string>;
  children: ReactNode;
}

export function TrackedAnchor({ eventName, eventParams, onClick, children, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
