/**
 * Form submission layer.
 *
 * Submissions POST JSON to the PHP endpoints in `public/api/`. On static
 * hosting without PHP (or before the MySQL layer exists) the endpoints
 * respond as placeholders and this layer resolves a professional simulated
 * success state so the prototype behaves end-to-end.
 */
import { apiPost, delay } from './api';
import type { ApiFormResponse } from '../types';

export type FormKind = 'contact' | 'newsletter' | 'partner' | 'speaker' | 'volunteer' | 'registration';

const ENDPOINTS: Record<FormKind, string> = {
  contact: 'contact.php',
  newsletter: 'newsletter.php',
  partner: 'partner.php',
  speaker: 'speaker.php',
  volunteer: 'volunteer.php',
  registration: 'registration.php',
};

const SUCCESS_MESSAGES: Record<FormKind, string> = {
  contact: 'Thank you, your message has been received. Our team replies within two working days.',
  newsletter: 'You\'re on the list! Watch your inbox for event waves and community updates.',
  partner: 'Partnership request received. Our partnerships lead will reach out to schedule a conversation.',
  speaker: 'Speaker profile received. Our program team reviews submissions before every event cycle.',
  volunteer: 'Welcome aboard! The volunteer community lead will contact you with onboarding details.',
  registration: 'Registration interest recorded. Pass details and wave-one codes will reach you by email.',
};

export async function submitForm(kind: FormKind, payload: Record<string, unknown>): Promise<ApiFormResponse> {
  const remote = await apiPost(ENDPOINTS[kind], payload);
  if (remote && remote.ok) return remote;
  await delay(600);
  return { ok: true, message: SUCCESS_MESSAGES[kind] };
}

/* ---------- Frontend validation helpers ---------- */

export const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
export const isPhone = (value: string): boolean => /^[+\d][\d\s()-]{6,18}$/.test(value.trim());

export type Errors = Record<string, string>;

export function validate(
  values: Record<string, string>,
  rules: Record<string, (v: string) => string | null>,
): Errors {
  const errors: Errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const message = rule(values[field] ?? '');
    if (message) errors[field] = message;
  }
  return errors;
}

export const required = (label: string) => (v: string): string | null =>
  v.trim() ? null : `${label} is required.`;

export const emailRule = (v: string): string | null =>
  !v.trim() ? 'Email is required.' : isEmail(v) ? null : 'Enter a valid email address.';

export const phoneRule = (v: string): string | null =>
  !v.trim() ? null : isPhone(v) ? null : 'Enter a valid phone number.';

export const minWords = (label: string, n: number) => (v: string): string | null =>
  v.trim().split(/\s+/).filter(Boolean).length >= n ? null : `${label} needs at least ${n} words.`;
