import { GALLERY, GALLERY_COLLECTIONS } from '../data/gallery';
import type { GalleryCollection, GalleryItem } from '../types';
import { apiGet, delay } from './api';

export const galleryService = {
  /** List all published central gallery collections. */
  async listCollections(): Promise<GalleryCollection[]> {
    const remote = await apiGet<GalleryCollection>('gallery_collections.php');
    const source = remote?.data ?? GALLERY_COLLECTIONS;
    await delay();
    return source.filter((c) => c.published).sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));
  },

  /** Get a single gallery collection by slug. */
  async getCollectionBySlug(slug: string): Promise<GalleryCollection | null> {
    const collections = await this.listCollections();
    return collections.find((c) => c.slug === slug) ?? null;
  },

  /** Get gallery collection for an event/activity if associated. */
  async getCollectionForContent(gallerySlug?: string): Promise<GalleryCollection | null> {
    if (!gallerySlug) return null;
    return this.getCollectionBySlug(gallerySlug);
  },

  /** List media items filtered by category name or all items. */
  async list(category = 'all'): Promise<GalleryItem[]> {
    const remote = await apiGet<GalleryItem>('gallery.php');
    const source = remote?.data ?? GALLERY;
    await delay();
    return category === 'all' ? source : source.filter((g) => g.category === category);
  },

  /** Get media items for a specific event slug. */
  async forEvent(slug: string): Promise<GalleryItem[]> {
    await delay(120);
    return GALLERY.filter((g) => g.eventSlug === slug);
  },
};
