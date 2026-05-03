import { AppInputs, Calculations, Refinements, SessionRecord, SessionStatus } from './types';

const SESSION_KEY = 'protection_session_id';
const SESSION_DATE_KEY = 'protection_session_date';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function getStoredSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  const id = localStorage.getItem(SESSION_KEY);
  const dateStr = localStorage.getItem(SESSION_DATE_KEY);
  if (!id || !dateStr) return null;
  if (Date.now() - parseInt(dateStr, 10) > THIRTY_DAYS_MS) {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_DATE_KEY);
    return null;
  }
  return id;
}

export function storeSessionId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, id);
  localStorage.setItem(SESSION_DATE_KEY, Date.now().toString());
}

export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_DATE_KEY);
}

export async function createSession(
  inputs: AppInputs,
  calculations: Calculations
): Promise<string | null> {
  try {
    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs, calculations, status: 'calculated' }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id: string };
    return data.id;
  } catch {
    return null;
  }
}

export async function updateSession(
  id: string,
  updates: Partial<{
    refinements: Refinements;
    calculations: Calculations;
    status: SessionStatus;
    soa_generated_at: string;
  }>
): Promise<boolean> {
  try {
    const res = await fetch(`/api/sessions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchSession(id: string): Promise<SessionRecord | null> {
  try {
    const res = await fetch(`/api/sessions/${id}`);
    if (!res.ok) return null;
    return (await res.json()) as SessionRecord;
  } catch {
    return null;
  }
}
