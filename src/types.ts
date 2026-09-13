export type EventStatus = 'upcoming' | 'past';

/** Sprite-sheet / image identifiers available in `public/img`. */
export type SheetId = 'eventsA' | 'eventsB' | 'galleryA' | 'mediaA' | 'hero';

/** A reference to one cell of a sprite sheet (or a standalone image). */
export interface ImageRef {
  sheet: SheetId;
  cell: number;
}

/**
 * Identifiers for approved standalone photographs of real people.
 *
 * These are real images shipped in the repository `assets/` folder and
 * registered in `src/media.ts` (PORTRAITS). Add an id there — never inline an
 * image path in a component — so the future admin panel can swap a photograph
 * by changing a single data value.
 */
export type PortraitId = 'hassan-sajjad' | 'faraz-khan-sulemani' | 'ibrahim-fiaz';

/** A reference to an approved standalone photograph (not a sprite cell). */
export interface PhotoRef {
  photo: PortraitId;
}

/** Anything the UI can render as an image: a sprite cell or an approved photo. */
export type AnyImageRef = ImageRef | PhotoRef;

export interface AgendaItem {
  time: string;
  title: string;
  detail?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export type GalleryType = 'event_gallery' | 'random_clicks';
export type MediaType = 'image' | 'video';
export type ImageSourceType = 'youtube' | 'upload';

export interface GalleryMediaItem {
  id: string;
  galleryId: string;
  type: MediaType;
  title: string;
  description?: string;
  displayOrder: number;
  visibility: boolean;
  /** Image source configuration for type === 'image' */
  imageSourceType?: ImageSourceType;
  imageSource?: string;
  image?: ImageRef;
  /** Video configuration for type === 'video' (YouTube URL only, no direct video uploads) */
  youtubeUrl?: string;
  thumb?: ImageRef | string;
  caption?: string; // Backwards compatible alias for title
}

export interface GalleryCollection {
  id: string;
  slug: string;
  type: GalleryType;
  /** Stable reference to the event.id if type === 'event_gallery'. null for 'random_clicks' */
  eventId?: string | null;
  title: string;
  description: string;
  coverImage: ImageRef;
  mediaItems?: GalleryMediaItem[];
  published: boolean;
  featured?: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Flat item structure used for lightboxes or legacy components */
export interface GalleryItem {
  id: string;
  image?: ImageRef;
  imageSource?: string;
  youtubeUrl?: string;
  caption: string;
  category: string;
  eventSlug?: string;
  galleryId?: string;
  type?: MediaType;
}

export interface ThriveEvent {
  id: string;
  slug: string;
  title: string;
  category: string;
  /** ISO date of the first day. */
  date: string;
  /** Optional ISO date of the last day (for multi-day events). */
  endDate?: string;
  dateLabel: string;
  time: string;
  location: string;
  city: string;
  description: string;
  about: string[];
  image: ImageRef;
  featured?: boolean;
  /** Dynamically derived from event end date vs current time. */
  status?: EventStatus;
  /** Stable reference to the linked gallery collection (gallery.id). */
  galleryId?: string | null;
  /** Associated central gallery collection slug (if available). */
  gallerySlug?: string;
  /** Visibility flag for future admin panel toggles. */
  visibility?: boolean;
  /** Display order for future admin panel reordering. */
  displayOrder?: number;
  /** True only when the date is officially confirmed by the organization. */
  dateConfirmed: boolean;
  /** True only when the venue is officially confirmed by the organization. */
  venueConfirmed: boolean;
  attendees?: string;
  tags: string[];
  speakerSlugs: string[];
  agenda: AgendaItem[];
  /**
   * Programme directions being developed for the event. These are NOT
   * confirmed final sessions and must be labelled as such in the UI.
   */
  programmeComponents?: string[];
  highlights: string[];
  sponsorIds: string[];
  faqs: Faq[];
}

export type Expertise =
  | 'Technology'
  | 'Entrepreneurship'
  | 'Leadership'
  | 'Education'
  | 'Women Empowerment'
  | 'Business'
  | 'Youth';

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Speaker {
  id: string;
  slug: string;
  name: string;
  title: string;
  organization: string;
  expertise: Expertise[];
  eventSlugs: string[];
  /** Optional — no invented portraits. Render a neutral monogram when absent. */
  portrait?: ImageRef;
  bio: string;
  topics: string[];
  socials: SocialLinks;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  /** Optional — no invented portraits. Render a neutral monogram when absent. */
  portrait?: ImageRef;
  /** 'executive' | 'functional' grouping used on the team page. */
  group?: 'executive' | 'functional';
}

export type ProgramIcon =
  | 'chip'
  | 'compass'
  | 'spark'
  | 'women'
  | 'campus'
  | 'rocket'
  | 'tools'
  | 'map';

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  icon: ProgramIcon;
  description: string;
  details: string;
  /** Objectives — what the program sets out to achieve. */
  outcomes: string[];
  /** Who the program is designed for. */
  audience: string[];
  /** One-line impact statement (mock, backend-swappable). */
  impact: string;
  image: ImageRef;
  eventSlugs: string[];
}

export type PartnerCategory =
  | 'Technology'
  | 'Education'
  | 'Media'
  | 'Corporate'
  | 'Community';

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  tier: 'Community Partner' | 'Strategic Partner' | 'Ecosystem Partner';
  blurb: string;
}

export interface PartnerTier {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  highlight?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  views: number;
  image: ImageRef;
  featured?: boolean;
  published?: boolean;
  displayOrder?: number;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  eventSlug?: string;
  duration: string;
  views: number;
  date: string;
  thumb: ImageRef;
  description: string;
}

/** Qualitative impact statement (replaces fabricated numeric statistics). */
export interface ImpactStatement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

/** Grouped search results across all content types. */
export interface SearchResults {
  query: string;
  events: ThriveEvent[];
  speakers: Speaker[];
  programs: Program[];
  blogs: BlogPost[];
  videos: VideoItem[];
  total: number;
}

/** Envelope returned by future PHP list endpoints. */
export interface ApiListResponse<T> {
  ok: boolean;
  source: 'mysql' | 'placeholder';
  data: T[];
}

/** Envelope returned by future PHP form endpoints. */
export interface ApiFormResponse {
  ok: boolean;
  message: string;
}
