import { EVENTS } from '../data/events';
import type { ThriveEvent } from '../types';
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
    let out = source;
    if (status !== 'all') out = out.filter((e) => e.status === status);
    if (category !== 'all') out = out.filter((e) => e.category === category);
    if (city !== 'all') out = out.filter((e) => e.city === city);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((e) => `${e.title} ${e.category} ${e.city} ${e.description}`.toLowerCase().includes(q));
    }
    return [...out].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  },

  async getBySlug(slug: string): Promise<ThriveEvent | undefined> {
    await delay(180);
    return EVENTS.find((e) => e.slug === slug);
  },

  async featured(): Promise<ThriveEvent | undefined> {
    await delay(120);
    return EVENTS.find((e) => e.featured);
  },

  async upcoming(): Promise<ThriveEvent[]> {
    return this.list({ status: 'upcoming' });
  },

  async related(slug: string, count = 3): Promise<ThriveEvent[]> {
    await delay(150);
    const current = EVENTS.find((e) => e.slug === slug);
    if (!current) return [];
    return EVENTS.filter((e) => e.slug !== slug && (e.category === current.category || e.status === current.status))
      .slice(0, count);
  },
};
