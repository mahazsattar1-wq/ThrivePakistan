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

/** Split an ISO date into day / month / year chips for event cards. */
export function dateParts(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    year: String(d.getFullYear()),
  };
}
