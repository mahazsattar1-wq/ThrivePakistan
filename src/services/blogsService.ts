import { BLOGS } from '../data/blogs';
import type { BlogPost } from '../types';
import { apiGet, delay } from './api';

export interface BlogFilters {
  category?: string;
  query?: string;
  sort?: 'newest' | 'popular';
}

export const blogsService = {
  async list(filters: BlogFilters = {}): Promise<BlogPost[]> {
    const remote = await apiGet<BlogPost>('blogs.php');
    const source = remote?.data ?? BLOGS;
    await delay();
    const { category = 'all', query = '', sort = 'newest' } = filters;
    let out = source;
    if (category !== 'all') out = out.filter((b) => b.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((b) => `${b.title} ${b.excerpt} ${b.author} ${b.tags.join(' ')}`.toLowerCase().includes(q));
    }
    out = [...out].sort((a, b) =>
      sort === 'popular' ? b.views - a.views : +new Date(b.date) - +new Date(a.date),
    );
    return out;
  },

  async getBySlug(slug: string): Promise<BlogPost | undefined> {
    await delay(160);
    return BLOGS.find((b) => b.slug === slug);
  },

  async featured(): Promise<BlogPost | undefined> {
    await delay(120);
    return BLOGS.find((b) => b.featured);
  },

  async popular(count = 4): Promise<BlogPost[]> {
    await delay(140);
    return [...BLOGS].sort((a, b) => b.views - a.views).slice(0, count);
  },

  async related(slug: string, count = 3): Promise<BlogPost[]> {
    await delay(140);
    const current = BLOGS.find((b) => b.slug === slug);
    if (!current) return [];
    const same = BLOGS.filter((b) => b.slug !== slug && b.category === current.category);
    const rest = BLOGS.filter((b) => b.slug !== slug && b.category !== current.category);
    return [...same, ...rest].slice(0, count);
  },
};
