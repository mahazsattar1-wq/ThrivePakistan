import { AWARDS, AWARD_CATEGORIES, AWARD_WINNERS } from '../data/awards';
import type { Award, AwardCategory, AwardWinner } from '../types';
import { apiGet, delay } from './api';

export const awardsService = {
  /** List all visible award categories sorted by displayOrder. */
  async listCategories(): Promise<AwardCategory[]> {
    const remote = await apiGet<AwardCategory>('award_categories.php');
    const source = remote?.data ?? AWARD_CATEGORIES;
    await delay();
    return source.filter((c) => c.isVisible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  /** Get category by ID or slug. */
  async getCategoryById(idOrSlug: string): Promise<AwardCategory | null> {
    if (!idOrSlug) return null;
    const list = await this.listCategories();
    return list.find((c) => c.id === idOrSlug || c.slug === idOrSlug) ?? null;
  },

  /** List all visible awards, optionally filtered by category ID or category slug. */
  async listAwards(categoryIdOrSlug = 'all'): Promise<Award[]> {
    const remote = await apiGet<Award>('awards.php');
    let source = remote?.data ?? AWARDS;
    await delay();

    source = source.filter((a) => a.isVisible !== false);

    if (categoryIdOrSlug !== 'all') {
      const category = await this.getCategoryById(categoryIdOrSlug);
      const targetId = category ? category.id : categoryIdOrSlug;
      source = source.filter((a) => a.categoryId === targetId);
    }

    return source.sort((a, b) => a.displayOrder - b.displayOrder);
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
