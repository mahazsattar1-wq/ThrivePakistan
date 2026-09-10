import type { Expertise, Speaker } from '../types';

/**
 * SPEAKER DATA.
 *
 * No FutureX 2026 speakers have been confirmed yet, so the public directory
 * is intentionally empty. When speakers are officially announced they will be
 * added here (or served by `/api/speakers.php`) and the site will pick them
 * up automatically — no UI changes required.
 *
 * Never add a speaker who has not been publicly confirmed by Thrive Pakistan.
 */
export const SPEAKERS: Speaker[] = [];

/** Filter facets kept for the directory UI (used once speakers are announced). */
export const EXPERTISE_FILTERS: Expertise[] = [
  'Technology',
  'Entrepreneurship',
  'Leadership',
  'Education',
  'Women Empowerment',
  'Business',
  'Youth',
];
