import type { GalleryCollection, GalleryItem } from '../types';
import { img } from '../media';

/**
 * CENTRAL MAIN GALLERY COLLECTIONS — single source of truth for platform media.
 *
 * Each collection represents an event, platform, or activity category.
 * Media items are attached directly to their parent gallery collection.
 */
export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    id: 'col-futurex-2026',
    slug: 'futurex-2026',
    title: 'FutureX 2026',
    description: 'A visual collection of moments, theme directions, and platform concepts for FutureX 2026.',
    coverImage: img('eventsA', 0),
    published: true,
    featured: true,
    displayOrder: 1,
    relatedContentId: 'ev-futurex-2026',
    relatedContentType: 'event',
    mediaItems: [
      { id: 'gl-01', image: img('eventsA', 0), caption: 'FutureX 2026, illustrative platform artwork' },
      { id: 'gl-02', image: img('eventsB', 0), caption: 'FutureX 2026, visual direction, illustrative artwork' },
      { id: 'gl-03', image: img('mediaA', 0), caption: 'FutureX 2026, AI Lab concept artwork' },
    ],
  },
  {
    id: 'col-hazara-tech-fiesta-2025',
    slug: 'hazara-tech-fiesta-2025',
    title: 'Hazara Tech Fiesta 2025',
    description: 'Platform artwork and visual identity from the three-day regional technology festival in Mansehra.',
    coverImage: img('eventsA', 5),
    published: true,
    featured: true,
    displayOrder: 2,
    relatedContentId: 'ev-hazara-tech-fiesta-2025',
    relatedContentType: 'event',
    mediaItems: [
      { id: 'gl-04', image: img('eventsA', 5), caption: 'Hazara Tech Fiesta 2025, illustrative artwork' },
      { id: 'gl-05', image: img('eventsB', 5), caption: 'Hazara Tech Fiesta 2025, visual identity, illustrative artwork' },
    ],
  },
  {
    id: 'col-ecosystem',
    slug: 'ecosystem',
    title: 'Platform & Ecosystem',
    description: 'Visual moments reflecting student engagement, learning environments, campus networks, and regional participation.',
    coverImage: img('galleryA', 0),
    published: true,
    featured: false,
    displayOrder: 3,
    mediaItems: [
      { id: 'gl-06', image: img('galleryA', 0), caption: 'Ecosystem, illustrative artwork' },
      { id: 'gl-07', image: img('galleryA', 2), caption: 'Learning, illustrative artwork' },
      { id: 'gl-08', image: img('galleryA', 3), caption: 'Participation, illustrative artwork' },
      { id: 'gl-09', image: img('galleryA', 4), caption: 'Regional talent, illustrative artwork' },
      { id: 'gl-10', image: img('mediaA', 2), caption: 'Entrepreneurship, illustrative artwork' },
      { id: 'gl-11', image: img('mediaA', 4), caption: 'Campus networks, illustrative artwork' },
      { id: 'gl-12', image: img('eventsA', 3), caption: 'Education & industry, illustrative artwork' },
    ],
  },
];

/** Derived flat gallery list for backward compatibility across legacy calls. */
export const GALLERY: GalleryItem[] = GALLERY_COLLECTIONS.flatMap((col) =>
  col.mediaItems.map((item) => ({
    id: item.id,
    image: item.image,
    caption: item.caption,
    category: col.title,
    eventSlug: col.slug,
  })),
);

export const GALLERY_CATEGORIES = GALLERY_COLLECTIONS.map((c) => c.title);
