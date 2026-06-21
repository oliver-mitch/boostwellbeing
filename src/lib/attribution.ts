// Attribution capture for retail landing pages.
// Reads UTM params + fbclid from the URL on first load and persists to
// sessionStorage so attribution survives the qualifier → savings page nav.
// First-touch wins: once captured for a session, subsequent page loads don't overwrite.

const SESSION_KEY = 'bw_attribution';

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  referrer?: string;
  landing_path?: string;
}

export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem(SESSION_KEY)) return; // first touch wins

  const params = new URLSearchParams(window.location.search);

  const attr: Attribution = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
    fbclid: params.get('fbclid') ?? undefined,
    referrer: document.referrer || undefined,
    landing_path: window.location.pathname,
  };

  const clean = Object.fromEntries(
    Object.entries(attr).filter(([, v]) => v !== undefined)
  ) as Attribution;

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(clean));
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
