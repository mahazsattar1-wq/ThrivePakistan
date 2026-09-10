import { VIDEOS } from '../data/videos';
import type { VideoItem } from '../types';
import { apiGet, delay } from './api';

export interface VideoFilters {
  category?: string;
  event?: string;
  query?: string;
}

export const videosService = {
  async list(filters: VideoFilters = {}): Promise<VideoItem[]> {
    const remote = await apiGet<VideoItem>('videos.php');
    const source = remote?.data ?? VIDEOS;
    await delay();
    const { category = 'all', event = 'all', query = '' } = filters;
    let out = source;
    if (category !== 'all') out = out.filter((v) => v.category === category);
    if (event !== 'all') out = out.filter((v) => v.eventSlug === event);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((v) => `${v.title} ${v.description} ${v.category}`.toLowerCase().includes(q));
    }
    return [...out].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  },

  async featured(): Promise<VideoItem | undefined> {
    await delay(120);
    return VIDEOS[0];
  },
};
