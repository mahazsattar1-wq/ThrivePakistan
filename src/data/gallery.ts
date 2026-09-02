import type { GalleryItem } from '../types';
import { img } from '../media';

/** MOCK DATA — gallery moments (illustrated placeholders, safe to replace). */
export const GALLERY: GalleryItem[] = [
  { id: 'gl-01', image: img('eventsA', 0), caption: 'Main stage lights up for the opening keynote', category: 'FutureX 2026', eventSlug: 'futurex-2026' },
  { id: 'gl-02', image: img('galleryA', 0), caption: 'Confetti drop at the community night finale', category: 'FutureX 2026', eventSlug: 'futurex-2026' },
  { id: 'gl-03', image: img('galleryA', 3), caption: 'Audience phone lights during the evening session', category: 'FutureX 2026', eventSlug: 'futurex-2026' },
  { id: 'gl-04', image: img('eventsA', 1), caption: 'Keynote spotlight, Leadership Summit', category: 'Leadership Summit', eventSlug: 'thrive-leadership-summit-2026' },
  { id: 'gl-05', image: img('galleryA', 2), caption: 'Open mic: roundtable reports back to the hall', category: 'Leadership Summit', eventSlug: 'thrive-leadership-summit-2026' },
  { id: 'gl-06', image: img('eventsB', 0), caption: 'Leadership Playbook launch & recognition moment', category: 'Leadership Summit', eventSlug: 'thrive-leadership-summit-2025' },
  { id: 'gl-07', image: img('eventsA', 3), caption: 'Campus Innovation Tour arrives on campus', category: 'University Events', eventSlug: 'campus-innovation-tour-fall-2026' },
  { id: 'gl-08', image: img('eventsB', 3), caption: 'Career clinic in session between classes', category: 'University Events', eventSlug: 'campus-innovation-tour-spring-2026' },
  { id: 'gl-09', image: img('galleryA', 5), caption: 'Graduation season society celebration', category: 'University Events' },
  { id: 'gl-10', image: img('eventsA', 2), caption: 'Women Thrive opening panel', category: 'Women Thrive', eventSlug: 'women-thrive-2026' },
  { id: 'gl-11', image: img('mediaA', 4), caption: 'Mentorship circles connect 700+ women', category: 'Women Thrive', eventSlug: 'women-thrive-2025' },
  { id: 'gl-12', image: img('galleryA', 8), caption: 'Partnership handshake on the summit stage', category: 'Women Thrive', eventSlug: 'women-thrive-2026' },
  { id: 'gl-13', image: img('eventsA', 4), caption: 'Skills lab: laptops open, mentors circulating', category: 'Workshops', eventSlug: 'youth-skills-workshop-2026' },
  { id: 'gl-14', image: img('galleryA', 4), caption: 'Workshop wall: ideas, votes and next steps', category: 'Workshops', eventSlug: 'youth-skills-workshop-2026' },
  { id: 'gl-15', image: img('eventsB', 2), caption: 'Leadership tour expedition day one', category: 'Community Tours' },
  { id: 'gl-16', image: img('galleryA', 6), caption: 'Volunteer march opening the community drive', category: 'Community Tours' },
  { id: 'gl-17', image: img('galleryA', 7), caption: 'Media team capturing the main stage', category: 'Community Tours' },
  { id: 'gl-18', image: img('galleryA', 1), caption: 'Team huddle before doors open', category: 'Community Tours' },
];

export const GALLERY_CATEGORIES = [
  'FutureX 2026',
  'Leadership Summit',
  'University Events',
  'Women Thrive',
  'Workshops',
  'Community Tours',
] as const;
