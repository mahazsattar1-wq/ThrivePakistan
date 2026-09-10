import { PROGRAMS } from '../data/programs';
import type { Program } from '../types';
import { apiGet, delay } from './api';

export const programsService = {
  async list(): Promise<Program[]> {
    const remote = await apiGet<Program>('programs.php');
    await delay();
    return remote?.data ?? PROGRAMS;
  },

  async getBySlug(slug: string): Promise<Program | undefined> {
    await delay(150);
    return PROGRAMS.find((p) => p.slug === slug);
  },
};
