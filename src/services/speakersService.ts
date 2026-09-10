import { SPEAKERS } from '../data/speakers';
import type { Speaker } from '../types';
import { apiGet, delay } from './api';

export interface SpeakerFilters {
  expertise?: string;
  event?: string;
  query?: string;
}

export const speakersService = {
  async list(filters: SpeakerFilters = {}): Promise<Speaker[]> {
    const remote = await apiGet<Speaker>('speakers.php');
    const source = remote?.data ?? SPEAKERS;
    await delay();
    const { expertise = 'all', event = 'all', query = '' } = filters;
    let out = source;
    if (expertise !== 'all') out = out.filter((s) => s.expertise.includes(expertise as Speaker['expertise'][number]));
    if (event !== 'all') out = out.filter((s) => s.eventSlugs.includes(event));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((s) => `${s.name} ${s.title} ${s.organization} ${s.topics.join(' ')}`.toLowerCase().includes(q));
    }
    return out;
  },

  async getBySlug(slug: string): Promise<Speaker | undefined> {
    await delay(160);
    return SPEAKERS.find((s) => s.slug === slug);
  },

  async featured(count = 4): Promise<Speaker[]> {
    await delay(140);
    return SPEAKERS.filter((s) => s.featured).slice(0, count);
  },

  async bySlugs(slugs: string[]): Promise<Speaker[]> {
    await delay(120);
    return SPEAKERS.filter((s) => slugs.includes(s.slug));
  },
};
