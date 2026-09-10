import { PARTNERS } from '../data/partners';
import type { Partner } from '../types';
import { apiGet, delay } from './api';

export const partnersService = {
  async list(category = 'all'): Promise<Partner[]> {
    const remote = await apiGet<Partner>('partners.php');
    const source = remote?.data ?? PARTNERS;
    await delay();
    return category === 'all' ? source : source.filter((p) => p.category === category);
  },

  async byIds(ids: string[]): Promise<Partner[]> {
    await delay(100);
    return PARTNERS.filter((p) => ids.includes(p.id));
  },
};
