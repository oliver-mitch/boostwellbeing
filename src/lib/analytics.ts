import { track } from '@vercel/analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackGA4(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  track(eventName, params);
  trackGA4(eventName, params);
}
