import { GALLERY, GALLERY_COLLECTIONS, GALLERY_MEDIA } from '../data/gallery';
import type { GalleryCollection, GalleryItem, GalleryMediaItem } from '../types';
import { apiGet, delay } from './api';

export const galleryService = {
  /** List all published central gallery collections, optionally filtered by gallery type. */
  async listCollections(typeFilter: 'all' | 'event_gallery' | 'random_clicks' = 'all'): Promise<GalleryCollection[]> {
    const remote = await apiGet<GalleryCollection>('gallery_collections.php');
    let source = remote?.data ?? GALLERY_COLLECTIONS;
    await delay();

    source = source.filter((c) => c.published !== false);

    if (typeFilter !== 'all') {
      source = source.filter((c) => c.type === typeFilter);
    }

    const collectionsWithMedia = source.map((col) => {
      const media = GALLERY_MEDIA.filter((m) => m.galleryId === col.id && m.visibility !== false).sort(
        (a, b) => a.displayOrder - b.displayOrder,
      );
      return { ...col, mediaItems: media };
    });

    return collectionsWithMedia.sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));
  },

  /** Get a single gallery collection by ID, slug, or eventId. */
  async getCollectionById(idOrSlug: string): Promise<GalleryCollection | null> {
    if (!idOrSlug) return null;
    const collections = await this.listCollections();
    const found = collections.find((c) => c.id === idOrSlug || c.slug === idOrSlug || c.eventId === idOrSlug);
    return found ?? null;
  },

  /** Get a single gallery collection by slug. */
  async getCollectionBySlug(slug: string): Promise<GalleryCollection | null> {
    return this.getCollectionById(slug);
  },

  /** Get gallery collection linked to an event by eventId. */
  async getCollectionByEventId(eventId: string): Promise<GalleryCollection | null> {
    if (!eventId) return null;
    const collections = await this.listCollections();
    return collections.find((c) => c.type === 'event_gallery' && c.eventId === eventId) ?? null;
  },

  /** Get all visible media items for a specific gallery collection ID. */
  async getMediaForCollection(galleryId: string): Promise<GalleryMediaItem[]> {
    await delay();
    return GALLERY_MEDIA.filter((m) => m.galleryId === galleryId && m.visibility !== false).sort(
      (a, b) => a.displayOrder - b.displayOrder,
    );
  },

  /** List media items filtered by category name or all items (backwards compatible). */
  async list(category = 'all'): Promise<GalleryItem[]> {
    const remote = await apiGet<GalleryItem>('gallery.php');
    const source = remote?.data ?? GALLERY;
    await delay();
    return category === 'all' ? source : source.filter((g) => g.category === category);
  },

  /** Get media items for a specific event slug or ID (backwards compatible). */
  async forEvent(slugOrId: string): Promise<GalleryItem[]> {
    await delay(120);
    const col = await this.getCollectionById(slugOrId);
    if (!col) return [];
    return (col.mediaItems ?? []).map((m) => ({
      id: m.id,
      galleryId: m.galleryId,
      type: m.type,
      image: m.image,
      imageSource: m.imageSource,
      youtubeUrl: m.youtubeUrl,
      caption: m.title,
      category: col.title,
      eventSlug: col.slug,
    }));
  },
};
