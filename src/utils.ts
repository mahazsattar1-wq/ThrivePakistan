import type { EventStatus } from './types';

/** Small shared formatting helpers. */

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString('en-GB', opts ?? { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateLong(iso: string): string {
  return formatDate(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export function isFuture(iso: string): boolean {
  return new Date(iso).getTime() > Date.now();
}

/** Get the JavaScript Date object representing the end of an event's final day. */
export function getEventEndDate(event: { date: string; endDate?: string }): Date {
  const dStr = event.endDate || event.date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dStr)) {
    const [y, m, d] = dStr.split('-').map(Number);
    return new Date(y, m - 1, d, 23, 59, 59, 999);
  }
  const date = new Date(dStr);
  date.setHours(23, 59, 59, 999);
  return date;
}

/** Returns true if the event has not yet concluded relative to `now`. */
export function isEventUpcoming(event: { date: string; endDate?: string }, now = new Date()): boolean {
  return now.getTime() <= getEventEndDate(event).getTime();
}

/** Dynamically computes an event's status based on its end date vs `now`. */
export function getEventStatus(event: { date: string; endDate?: string }, now = new Date()): EventStatus {
  return isEventUpcoming(event, now) ? 'upcoming' : 'past';
}

/** Split an ISO date into day / month / year chips for event cards. */
export function dateParts(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    year: String(d.getFullYear()),
  };
}
