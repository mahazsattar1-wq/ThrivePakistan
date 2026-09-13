<<<<<<< HEAD
import type { GalleryCollection, GalleryItem } from '../types';
=======
import type { GalleryCollection, GalleryItem, GalleryMediaItem } from '../types';
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
import { img } from '../media';

/**
 * CENTRAL MAIN GALLERY COLLECTIONS — single source of truth for platform media.
 *
<<<<<<< HEAD
 * Each collection represents an event, platform, or activity category.
 * Media items are attached directly to their parent gallery collection.
 */
export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    id: 'col-futurex-2026',
    slug: 'futurex-2026',
=======
 * Each collection represents either an Event Gallery (linked to an event.id)
 * or an independent Random Clicks collection (eventId: null).
 *
 * Architecture:
 * - Event: source of event identity (ONE event = ONE record).
 * - Gallery Collection: references event.id via `eventId` when type === 'event_gallery'.
 * - Gallery Media: normalized media items referencing gallery.id.
 */

export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    id: 'gal-futurex-2026',
    slug: 'futurex-2026',
    type: 'event_gallery',
    eventId: 'ev-futurex-2026',
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
    title: 'FutureX 2026',
    description: 'A visual collection of moments, theme directions, and platform concepts for FutureX 2026.',
    coverImage: img('eventsA', 0),
    published: true,
    featured: true,
    displayOrder: 1,
<<<<<<< HEAD
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
=======
    createdAt: '2026-08-06T00:00:00Z',
  },
  {
    id: 'gal-hazara-tech-fiesta-2025',
    slug: 'hazara-tech-fiesta-2025',
    type: 'event_gallery',
    eventId: 'ev-hazara-tech-fiesta-2025',
    title: 'Hazara Tech Fiesta 2025',
    description: 'Platform artwork, highlights, and visual identity from the three-day regional technology festival in Mansehra.',
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
    coverImage: img('eventsA', 5),
    published: true,
    featured: true,
    displayOrder: 2,
<<<<<<< HEAD
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
=======
    createdAt: '2025-12-14T00:00:00Z',
  },
  {
    id: 'gal-random-clicks',
    slug: 'random-clicks',
    type: 'random_clicks',
    eventId: null,
    title: 'Random Clicks & Ecosystem',
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)
    description: 'Visual moments reflecting student engagement, learning environments, campus networks, and regional participation.',
    coverImage: img('galleryA', 0),
    published: true,
    featured: false,
    displayOrder: 3,
<<<<<<< HEAD
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
=======
    createdAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * NORMALIZED GALLERY MEDIA ITEMS — single source of truth for media items.
 *
 * - Images support imageSourceType: 'upload' (local/sprite) or 'youtube' (YouTube image source).
 * - Videos support type: 'video' with youtubeUrl (YouTube video only, no direct video uploads).
 */
export const GALLERY_MEDIA: GalleryMediaItem[] = [
  // FutureX 2026
  {
    id: 'media-fx-01',
    galleryId: 'gal-futurex-2026',
    type: 'image',
    imageSourceType: 'upload',
    image: img('eventsA', 0),
    title: 'FutureX 2026, illustrative platform artwork',
    description: 'Main platform visual theme for FutureX 2026.',
    displayOrder: 1,
    visibility: true,
  },
  {
    id: 'media-fx-02',
    galleryId: 'gal-futurex-2026',
    type: 'image',
    imageSourceType: 'youtube',
    imageSource: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    image: img('eventsB', 0),
    title: 'FutureX 2026, visual direction & AI theme artwork',
    description: 'Theme artwork representing AI Lab and technology pillars.',
    displayOrder: 2,
    visibility: true,
  },
  {
    id: 'media-fx-03',
    galleryId: 'gal-futurex-2026',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumb: img('mediaA', 0),
    title: 'FutureX 2026 Launch & Platform Keynote',
    description: 'Official preview video introducing FutureX 2026 themes and campus engagement.',
    displayOrder: 3,
    visibility: true,
  },

  // Hazara Tech Fiesta 2025
  {
    id: 'media-htf-01',
    galleryId: 'gal-hazara-tech-fiesta-2025',
    type: 'image',
    imageSourceType: 'upload',
    image: img('eventsA', 5),
    title: 'Hazara Tech Fiesta 2025, illustrative artwork',
    description: 'Official poster artwork for Hazara Tech Fiesta 2025.',
    displayOrder: 1,
    visibility: true,
  },
  {
    id: 'media-htf-02',
    galleryId: 'gal-hazara-tech-fiesta-2025',
    type: 'image',
    imageSourceType: 'upload',
    image: img('eventsB', 5),
    title: 'Hazara Tech Fiesta 2025, visual identity',
    description: 'Branding and regional talent showcase visuals.',
    displayOrder: 2,
    visibility: true,
  },
  {
    id: 'media-htf-03',
    galleryId: 'gal-hazara-tech-fiesta-2025',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumb: img('eventsA', 5),
    title: 'Hazara Tech Fiesta 2025 Official Film',
    description: 'Three-day recap film from Hazara University, Mansehra.',
    displayOrder: 3,
    visibility: true,
  },

  // Random Clicks & Ecosystem
  {
    id: 'media-rc-01',
    galleryId: 'gal-random-clicks',
    type: 'image',
    imageSourceType: 'upload',
    image: img('galleryA', 0),
    title: 'Ecosystem, illustrative artwork',
    description: 'Random capture of student interaction.',
    displayOrder: 1,
    visibility: true,
  },
  {
    id: 'media-rc-02',
    galleryId: 'gal-random-clicks',
    type: 'image',
    imageSourceType: 'upload',
    image: img('galleryA', 2),
    title: 'Learning, illustrative artwork',
    description: 'Interactive learning session moment.',
    displayOrder: 2,
    visibility: true,
  },
  {
    id: 'media-rc-03',
    galleryId: 'gal-random-clicks',
    type: 'image',
    imageSourceType: 'upload',
    image: img('galleryA', 3),
    title: 'Participation, illustrative artwork',
    description: 'Youth participation at regional meetup.',
    displayOrder: 3,
    visibility: true,
  },
  {
    id: 'media-rc-04',
    galleryId: 'gal-random-clicks',
    type: 'image',
    imageSourceType: 'upload',
    image: img('galleryA', 4),
    title: 'Regional talent, illustrative artwork',
    description: 'Emerging tech talent in Mansehra.',
    displayOrder: 4,
    visibility: true,
  },
  {
    id: 'media-rc-05',
    galleryId: 'gal-random-clicks',
    type: 'image',
    imageSourceType: 'upload',
    image: img('mediaA', 2),
    title: 'Entrepreneurship, illustrative artwork',
    description: 'Startup pitch presentation stage.',
    displayOrder: 5,
    visibility: true,
  },
  {
    id: 'media-rc-06',
    galleryId: 'gal-random-clicks',
    type: 'image',
    imageSourceType: 'upload',
    image: img('mediaA', 4),
    title: 'Campus networks, illustrative artwork',
    description: 'Student ambassador campus network.',
    displayOrder: 6,
    visibility: true,
  },
];

/** Derived flat gallery list for backwards compatibility across legacy components. */
export const GALLERY: GalleryItem[] = GALLERY_MEDIA.filter((m) => m.visibility).map((m) => {
  const col = GALLERY_COLLECTIONS.find((c) => c.id === m.galleryId);
  return {
    id: m.id,
    galleryId: m.galleryId,
    type: m.type,
    image: m.image,
    imageSource: m.imageSource,
    youtubeUrl: m.youtubeUrl,
    caption: m.title,
    category: col ? col.title : 'Gallery',
    eventSlug: col ? col.slug : undefined,
  };
});
>>>>>>> b7c016b (feat(arch): complete event + central gallery architecture rebuild with normalized database models)

export const GALLERY_CATEGORIES = GALLERY_COLLECTIONS.map((c) => c.title);
