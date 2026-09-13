import { AWARDS, AWARD_WINNERS } from '../data/awards';
import type { Award, AwardWinner } from '../types';
import { apiGet, delay } from './api';

export const awardsService = {
  /** List all visible awards sorted by displayOrder. */
  async listAwards(): Promise<Award[]> {
    const remote = await apiGet<Award>('awards.php');
    const source = remote?.data ?? AWARDS;
    await delay();

    return source
      .filter((a) => a.isVisible !== false)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  /** Get an individual award by ID or slug. */
  async getAwardById(idOrSlug: string): Promise<Award | null> {
    if (!idOrSlug) return null;
    const list = await this.listAwards();
    return list.find((a) => a.id === idOrSlug || a.slug === idOrSlug) ?? null;
  },

  /** Get all visible winners for a specific award ID, optionally filtered by year. */
  async getWinnersForAward(awardId: string, yearFilter?: number | 'all'): Promise<AwardWinner[]> {
    await delay();
    let winners = AWARD_WINNERS.filter((w) => w.awardId === awardId && w.isVisible !== false);

    if (yearFilter && yearFilter !== 'all') {
      winners = winners.filter((w) => w.year === yearFilter);
    }

    return winners.sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);
  },

  /** Get distinct years available for an award. */
  async getYearsForAward(awardId: string): Promise<number[]> {
    const winners = await this.getWinnersForAward(awardId);
    const years = Array.from(new Set(winners.map((w) => w.year))).sort((a, b) => b - a);
    return years;
  },
};
