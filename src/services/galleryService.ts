import { GALLERY } from '../data/gallery';
import type { GalleryItem } from '../types';
import { apiGet, delay } from './api';

export const galleryService = {
  async list(category = 'all'): Promise<GalleryItem[]> {
    const remote = await apiGet<GalleryItem>('gallery.php');
    const source = remote?.data ?? GALLERY;
    await delay();
    return category === 'all' ? source : source.filter((g) => g.category === category);
  },

  async forEvent(slug: string): Promise<GalleryItem[]> {
    await delay(120);
    return GALLERY.filter((g) => g.eventSlug === slug);
  },
};
