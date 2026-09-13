import type { GalleryCollection, GalleryItem, GalleryMediaItem } from '../types';
import { img } from '../media';

/**
 * CENTRAL MAIN GALLERY COLLECTIONS — single source of truth for platform media.
 *
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
    title: 'FutureX 2026',
    description: 'A visual collection of moments, theme directions, and platform concepts for FutureX 2026.',
    coverImage: img('eventsA', 0),
    published: true,
    featured: true,
    displayOrder: 1,
    createdAt: '2026-08-06T00:00:00Z',
  },
  {
    id: 'gal-hazara-tech-fiesta-2025',
    slug: 'hazara-tech-fiesta-2025',
    type: 'event_gallery',
    eventId: 'ev-hazara-tech-fiesta-2025',
    title: 'Hazara Tech Fiesta 2025',
    description: 'Platform artwork, highlights, and visual identity from the three-day regional technology festival in Mansehra.',
    coverImage: img('eventsA', 5),
    published: true,
    featured: true,
    displayOrder: 2,
    createdAt: '2025-12-14T00:00:00Z',
  },
  {
    id: 'gal-random-clicks',
    slug: 'random-clicks',
    type: 'random_clicks',
    eventId: null,
    title: 'Random Clicks & Ecosystem',
    description: 'Visual moments reflecting student engagement, learning environments, campus networks, and regional participation.',
    coverImage: img('galleryA', 0),
    published: true,
    featured: false,
    displayOrder: 3,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * NORMALIZED GALLERY MEDIA ITEMS — single source of truth for media items.
 *
 * - Images support imageSourceType: 'upload' (local/sprite) or 'youtube' (YouTube image source).
 * - Videos support type: 'video' with youtubeUrl (YouTube video only, no direct video uploads).
 * - Note: In mock data, youtubeUrl is set to null. Real YouTube URLs arrive from the database/admin panel.
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
    imageSourceType: 'upload',
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
    youtubeUrl: null, // Null in mock state — real YouTube URL supplied by future database/admin
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
    youtubeUrl: null, // Null in mock state — real YouTube URL supplied by future database/admin
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

export const GALLERY_CATEGORIES = GALLERY_COLLECTIONS.map((c) => c.title);
