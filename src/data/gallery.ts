import type { GalleryItem } from '../types';
import { img } from '../media';

/**
 * GALLERY — illustrative platform visuals.
 *
 * These tiles are illustrative artwork for Thrive Pakistan's platforms, not
 * photographs of real events — captions say so honestly. Genuine event
 * photography from FutureX 2026 and Hazara Tech Fiesta will replace these
 * as it becomes available.
 */
export const GALLERY: GalleryItem[] = [
  { id: 'gl-01', image: img('eventsA', 0), caption: 'FutureX 2026 — illustrative platform artwork', category: 'FutureX', eventSlug: 'futurex-2026' },
  { id: 'gl-02', image: img('eventsB', 0), caption: 'FutureX 2026 — visual direction, illustrative artwork', category: 'FutureX', eventSlug: 'futurex-2026' },
  { id: 'gl-03', image: img('mediaA', 0), caption: 'FutureX 2026 — AI Lab concept artwork', category: 'FutureX', eventSlug: 'futurex-2026' },
  { id: 'gl-04', image: img('eventsA', 5), caption: 'Hazara Tech Fiesta 2025 — illustrative artwork', category: 'Previous Work', eventSlug: 'hazara-tech-fiesta-2025' },
  { id: 'gl-05', image: img('eventsB', 5), caption: 'Hazara Tech Fiesta 2025 — visual identity, illustrative artwork', category: 'Previous Work', eventSlug: 'hazara-tech-fiesta-2025' },
  { id: 'gl-06', image: img('galleryA', 0), caption: 'Ecosystem — illustrative artwork', category: 'Ecosystem' },
  { id: 'gl-07', image: img('galleryA', 2), caption: 'Learning — illustrative artwork', category: 'Ecosystem' },
  { id: 'gl-08', image: img('galleryA', 3), caption: 'Participation — illustrative artwork', category: 'Ecosystem' },
  { id: 'gl-09', image: img('galleryA', 4), caption: 'Regional talent — illustrative artwork', category: 'Ecosystem' },
  { id: 'gl-10', image: img('mediaA', 2), caption: 'Entrepreneurship — illustrative artwork', category: 'Ecosystem' },
  { id: 'gl-11', image: img('mediaA', 4), caption: 'Campus networks — illustrative artwork', category: 'Ecosystem' },
  { id: 'gl-12', image: img('eventsA', 3), caption: 'Education & industry — illustrative artwork', category: 'Ecosystem' },
];

export const GALLERY_CATEGORIES = ['FutureX', 'Previous Work', 'Ecosystem'] as const;
