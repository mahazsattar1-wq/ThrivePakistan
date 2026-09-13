<<<<<<< HEAD
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
=======
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
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
  },

  /** Get a single gallery collection by slug. */
  async getCollectionBySlug(slug: string): Promise<GalleryCollection | null> {
<<<<<<< HEAD
    const collections = await this.listCollections();
    return collections.find((c) => c.slug === slug) ?? null;
  },

  /** Get gallery collection for an event/activity if associated. */
  async getCollectionForContent(gallerySlug?: string): Promise<GalleryCollection | null> {
    if (!gallerySlug) return null;
    return this.getCollectionBySlug(gallerySlug);
  },

  /** List media items filtered by category name or all items. */
=======
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
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
  async list(category = 'all'): Promise<GalleryItem[]> {
    const remote = await apiGet<GalleryItem>('gallery.php');
    const source = remote?.data ?? GALLERY;
    await delay();
    return category === 'all' ? source : source.filter((g) => g.category === category);
  },

<<<<<<< HEAD
  /** Get media items for a specific event slug. */
  async forEvent(slug: string): Promise<GalleryItem[]> {
=======
  /** Get media items for a specific event slug or ID (backwards compatible). */
  async forEvent(slugOrId: string): Promise<GalleryItem[]> {
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
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
