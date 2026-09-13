import type { GalleryCollection, GalleryItem, GalleryMediaItem } from '../types';
import { img } from '../media';

/**
 * CENTRAL MAIN GALLERY COLLECTIONS — single source of truth for platform media.
 *
 * Each collection represents either an Event Gallery (linked to an event.id)
 * or an independent Random Gallery (eventId: null).
 *
 * Architecture:
 * - Event: source of event identity (ONE event = ONE record).
 * - Gallery Collection: references event.id via `eventId` when type === 'event'.
 * - Random Gallery: type === 'random' and eventId === null.
 * - Every Gallery has its own gallery-specific `aboutHeading` and `aboutDescription`.
 * - Gallery Media: normalized media items referencing gallery.id with individual captions.
 */

export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    id: 'gal-futurex-2026',
    slug: 'futurex-2026',
    type: 'event',
    eventId: 'ev-futurex-2026',
    title: 'FutureX 2026',
    description: 'A visual collection of moments, theme directions, and platform concepts for FutureX 2026.',
    aboutHeading: 'About Gallery',
    aboutDescription: 'FutureX 2026 brings together young people, technology conversations, industry exposure and meaningful connections in Mansehra.',
    coverImage: img('eventsA', 0),
    published: true,
    featured: true,
    displayOrder: 1,
    createdAt: '2026-08-06T00:00:00Z',
  },
  {
    id: 'gal-hazara-tech-fiesta-2025',
    slug: 'hazara-tech-fiesta-2025',
    type: 'event',
    eventId: 'ev-hazara-tech-fiesta-2025',
    title: 'Hazara Tech Fiesta 2025',
    description: 'Platform artwork, highlights, and visual identity from the three-day regional technology festival in Mansehra.',
    aboutHeading: 'About Gallery',
    aboutDescription: 'A multi-day showcase documenting student innovation, hackathons, AI demonstrations and regional industry participation at Hazara University.',
    coverImage: img('eventsA', 5),
    published: true,
    featured: true,
    displayOrder: 2,
    createdAt: '2025-12-14T00:00:00Z',
  },
  {
    id: 'gal-visit-university',
    slug: 'todays-visit-to-university',
    type: 'random',
    eventId: null,
    title: "Today's Visit to University",
    description: 'A collection of moments from Thrive Pakistan’s visit to a university, including meetings, discussions and interactions with students.',
    aboutHeading: 'About Gallery',
    aboutDescription: 'A collection of moments from Thrive Pakistan’s visit to a university campus, including administrative meetings, faculty discussions, and direct student interactions.',
    coverImage: img('galleryA', 0),
    published: true,
    featured: false,
    displayOrder: 3,
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'gal-random-clicks',
    slug: 'random-clicks-ecosystem',
    type: 'random',
    eventId: null,
    title: 'Random Clicks & Ecosystem',
    description: 'Visual moments reflecting student engagement, learning environments, campus networks, and regional participation.',
    aboutHeading: 'About Gallery',
    aboutDescription: 'Candid moments and ecosystem snapshots captured across various regional meetups, workshops, and community interactions.',
    coverImage: img('mediaA', 2),
    published: true,
    featured: false,
    displayOrder: 4,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * NORMALIZED GALLERY MEDIA ITEMS — single source of truth for media items.
 *
 * - Images support sourceType: 'direct' (upload/sprite) or 'youtube' (YouTube image source).
 * - Videos support type: 'video' with youtubeUrl (YouTube video only, no direct video uploads).
 * - Note: In mock data, youtubeUrl is set to null. Real YouTube URLs arrive from the database/admin panel.
 */
export const GALLERY_MEDIA: GalleryMediaItem[] = [
  // FutureX 2026 Gallery
  {
    id: 'media-fx-01',
    galleryId: 'gal-futurex-2026',
    type: 'image',
    sourceType: 'direct',
    image: img('eventsA', 0),
    title: 'FutureX 2026 Platform Artwork',
    caption: 'FutureX 2026 Main Stage platform visual theme',
    description: 'Main platform visual theme for FutureX 2026.',
    displayOrder: 1,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-fx-02',
    galleryId: 'gal-futurex-2026',
    type: 'image',
    sourceType: 'direct',
    image: img('eventsB', 0),
    title: 'AI Lab & Technology Direction',
    caption: 'Students engaging during the AI Lab concept session',
    description: 'Theme artwork representing AI Lab and technology pillars.',
    displayOrder: 2,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-fx-03',
    galleryId: 'gal-futurex-2026',
    type: 'video',
    youtubeUrl: null, // Null in mock state — real YouTube URL supplied by future database/admin
    thumb: img('mediaA', 0),
    title: 'FutureX 2026 Launch & Platform Keynote',
    caption: 'Conversation with university representatives at FutureX 2026',
    description: 'Official preview video introducing FutureX 2026 themes and campus engagement.',
    displayOrder: 3,
    isVisible: true,
    visibility: true,
  },

  // Hazara Tech Fiesta 2025 Gallery
  {
    id: 'media-htf-01',
    galleryId: 'gal-hazara-tech-fiesta-2025',
    type: 'image',
    sourceType: 'direct',
    image: img('eventsA', 5),
    title: 'Hazara Tech Fiesta Poster',
    caption: 'Official poster artwork for Hazara Tech Fiesta 2025',
    description: 'Official poster artwork for Hazara Tech Fiesta 2025.',
    displayOrder: 1,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-htf-02',
    galleryId: 'gal-hazara-tech-fiesta-2025',
    type: 'image',
    sourceType: 'direct',
    image: img('eventsB', 5),
    title: 'Regional Talent Showcase',
    caption: 'Students demonstrating innovation projects at Hazara University',
    description: 'Branding and regional talent showcase visuals.',
    displayOrder: 2,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-htf-03',
    galleryId: 'gal-hazara-tech-fiesta-2025',
    type: 'video',
    youtubeUrl: null, // Null in mock state — real YouTube URL supplied by future database/admin
    thumb: img('eventsA', 5),
    title: 'Hazara Tech Fiesta 2025 Official Film',
    caption: 'Three-day event recap film from Hazara University, Mansehra',
    description: 'Three-day recap film from Hazara University, Mansehra.',
    displayOrder: 3,
    isVisible: true,
    visibility: true,
  },

  // Today's Visit to University Gallery (Random)
  {
    id: 'media-vu-01',
    galleryId: 'gal-visit-university',
    type: 'image',
    sourceType: 'direct',
    image: img('galleryA', 0),
    title: 'Meeting with Administration',
    caption: 'Meeting with the university administration',
    description: 'Discussion on student engagement and regional collaboration.',
    displayOrder: 1,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-vu-02',
    galleryId: 'gal-visit-university',
    type: 'image',
    sourceType: 'direct',
    image: img('galleryA', 2),
    title: 'Discussion with Students',
    caption: 'Discussion with students during the campus tour',
    description: 'Interactive discussion with computer science students.',
    displayOrder: 2,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-vu-03',
    galleryId: 'gal-visit-university',
    type: 'image',
    sourceType: 'direct',
    image: img('galleryA', 3),
    title: 'Faculty Leadership Exchange',
    caption: 'Meeting with university faculty leadership',
    description: 'Exploring partnerships for upcoming innovation platforms.',
    displayOrder: 3,
    isVisible: true,
    visibility: true,
  },

  // Random Clicks & Ecosystem Gallery (Random)
  {
    id: 'media-rc-01',
    galleryId: 'gal-random-clicks',
    type: 'image',
    sourceType: 'direct',
    image: img('galleryA', 4),
    title: 'Emerging Tech Talent',
    caption: 'Emerging tech talent in Mansehra',
    description: 'Regional student talent showcase.',
    displayOrder: 1,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-rc-02',
    galleryId: 'gal-random-clicks',
    type: 'image',
    sourceType: 'direct',
    image: img('mediaA', 2),
    title: 'Startup Pitch Stage',
    caption: 'Startup pitch presentation stage',
    description: 'Young founders sharing their early prototypes.',
    displayOrder: 2,
    isVisible: true,
    visibility: true,
  },
  {
    id: 'media-rc-03',
    galleryId: 'gal-random-clicks',
    type: 'image',
    sourceType: 'direct',
    image: img('mediaA', 4),
    title: 'Campus Ambassador Network',
    caption: 'Student ambassador network meeting',
    description: 'Campus network representatives planning local outreach.',
    displayOrder: 3,
    isVisible: true,
    visibility: true,
  },
];

/** Derived flat gallery list for backwards compatibility across legacy components. */
export const GALLERY: GalleryItem[] = GALLERY_MEDIA.filter((m) => m.isVisible !== false).map((m) => {
  const col = GALLERY_COLLECTIONS.find((c) => c.id === m.galleryId);
  return {
    id: m.id,
    galleryId: m.galleryId,
    type: m.type,
    image: m.image,
    imageSource: m.imageUrl || m.imageSource,
    youtubeUrl: m.youtubeUrl,
    caption: m.caption || m.title,
    category: col ? col.title : 'Gallery',
    eventSlug: col ? col.slug : undefined,
  };
});

export const GALLERY_CATEGORIES = GALLERY_COLLECTIONS.map((c) => c.title);
