/**
 * Thrive Pakistan — shared domain types.
 *
 * These interfaces define the contract between the frontend and the future
 * PHP/MySQL backend + admin dashboard. Mock data in `src/data/*` implements
 * these shapes today; tomorrow the same shapes arrive from `/api/*.php`.
 */

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

export interface GalleryItem {
  id: string;
  image: ImageRef;
  caption: string;
  category: string;
  eventSlug?: string;
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
