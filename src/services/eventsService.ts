import { EVENTS } from '../data/events';
import type { ThriveEvent } from '../types';
import { getEventEndDate, getEventStatus } from '../utils';
import { apiGet, delay } from './api';

export interface EventFilters {
  status?: 'all' | 'upcoming' | 'past';
  category?: string;
  city?: string;
  query?: string;
}

export const eventsService = {
  async list(filters: EventFilters = {}): Promise<ThriveEvent[]> {
    const remote = await apiGet<ThriveEvent>('events.php');
    let source = remote?.data ?? EVENTS;
    await delay();
    const { status = 'all', category = 'all', city = 'all', query = '' } = filters;
    let out = source.map((e) => ({ ...e, status: getEventStatus(e) }));
    if (status !== 'all') out = out.filter((e) => e.status === status);
    if (category !== 'all') out = out.filter((e) => e.category === category);
    if (city !== 'all') out = out.filter((e) => e.city === city);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((e) => `${e.title} ${e.category} ${e.city} ${e.description}`.toLowerCase().includes(q));
    }
    // Sorting:
    // Past events: most recently completed first (descending by end date)
    // Upcoming / all events: nearest upcoming date first (ascending by start date)
    if (status === 'past') {
      return [...out].sort((a, b) => +getEventEndDate(b) - +getEventEndDate(a));
    }
    return [...out].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  },

  async getBySlug(slug: string): Promise<ThriveEvent | undefined> {
    await delay(180);
    const found = EVENTS.find((e) => e.slug === slug);
    return found ? { ...found, status: getEventStatus(found) } : undefined;
  },

  async featured(): Promise<ThriveEvent | undefined> {
    await delay(120);
    const found = EVENTS.find((e) => e.featured && getEventStatus(e) === 'upcoming');
    return found ? { ...found, status: 'upcoming' } : undefined;
  },

  async upcoming(): Promise<ThriveEvent[]> {
    return this.list({ status: 'upcoming' });
  },

  async related(slug: string, count = 3): Promise<ThriveEvent[]> {
    await delay(150);
    const current = EVENTS.find((e) => e.slug === slug);
    if (!current) return [];
    const currentStatus = getEventStatus(current);
    return EVENTS.filter((e) => e.slug !== slug && (e.category === current.category || getEventStatus(e) === currentStatus))
      .slice(0, count)
      .map((e) => ({ ...e, status: getEventStatus(e) }));
  },
};
