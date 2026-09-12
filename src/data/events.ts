import type { ThriveEvent } from '../types';
import { img } from '../media';
import { getEventStatus } from '../utils';

/**
 * EVENT DATA — verified organizational record.
 *
 * Only events documented in the official Thrive Pakistan / FutureX 2026
 * materials appear here. FutureX 2026's date and venue are confirmed in the
 * organizational documents (24 September 2026 · Government Post Graduate
 * College Mansehra, backed by a Memorandum of Collaboration signed on
 * 6 August 2026). Its final agenda, speakers, sponsors, ticketing and
 * registration details are NOT yet confirmed, so none are published.
 *
 * Do not add events, dates, venues, attendance figures, speakers or sponsors
 * that are not confirmed by official Thrive Pakistan material.
 */

/** Raw event data — verified organizational record. */
const RAW_EVENTS: Omit<ThriveEvent, 'status'>[] = [
  {
    id: 'ev-futurex-2026',
    slug: 'futurex-2026',
    title: 'FutureX 2026',
    category: 'Flagship Platform',
    date: '2026-09-24',
    endDate: '2026-09-24',
    dateLabel: '24 September 2026',
    time: 'Full day, schedule to be announced',
    location: 'Government Post Graduate College, Mansehra',
    city: 'Mansehra',
    description:
      'Thrive Pakistan\u2019s flagship youth, technology, and innovation platform, bringing students, emerging talent, practitioners, and institutions into conversations on AI, work, finance, and leadership.',
    about: [
      'FutureX 2026 is Thrive Pakistan\u2019s current flagship platform. It brings students, professionals, employers, founders, educators, speakers and public stakeholders together around one practical question: what does a young person need to understand, build and access in order to succeed in the next economy?',
      'The event is organized with Government Post Graduate College Mansehra under a Memorandum of Collaboration signed on 6 August 2026. Programme curation, partnerships, and campus outreach are currently in progress, and final agenda, speakers, and registration details will be announced as they are confirmed.',
    ],
    image: img('eventsA', 0),
    gallerySlug: 'futurex-2026',
    featured: true,
    dateConfirmed: true,
    venueConfirmed: true,
    tags: ['AI', 'Work', 'Finance', 'Leadership'],
    speakerSlugs: [],
    agenda: [],
    programmeComponents: [
      'Main Stage keynotes and major conversations',
      'FutureX Talks and focused panels',
      'AI Lab with practical demonstrations',
      'Career Hub and employer interaction',
      'Startup Zone and innovation showcase',
      'Finance Lab and financial education',
      'Networking Zone and structured introductions',
      'Learning Lab, workshops and masterclasses',
      'FutureX Challenge for applied student innovation',
    ],
    highlights: [
      'Four content pillars: AI · Work · Finance · Leadership',
      'Hosted with Government Post Graduate College Mansehra',
      'Student participation, exhibitions and applied innovation',
    ],
    sponsorIds: [],
    faqs: [
      {
        q: 'When and where is FutureX 2026?',
        a: 'FutureX 2026 is planned for 24 September 2026 at Government Post Graduate College, Mansehra, Khyber Pakhtunkhwa, organized in collaboration with the institution.',
      },
      {
        q: 'Is the full programme announced?',
        a: 'Not yet. Sessions, speakers and scheduling are being developed and will be announced as they are confirmed. The themes above reflect the platform\u2019s intended programme directions.',
      },
      {
        q: 'How do I register?',
        a: 'Registration details have not been announced yet. You can register your interest now and we will contact you as details are confirmed.',
      },
      {
        q: 'Can our organization take part?',
        a: 'Yes: institutions, employers and technology practitioners can explore partnership and participation through the Become a Partner page or partnerships@thrivepakistan.com.',
      },
    ],
  },
  {
    id: 'ev-hazara-tech-fiesta-2025',
    slug: 'hazara-tech-fiesta-2025',
    title: 'Hazara Tech Fiesta 2025',
    category: 'Tech Festival',
    date: '2025-12-12',
    endDate: '2025-12-14',
    dateLabel: '12–14 December 2025',
    time: 'Three days',
    location: 'Hazara University, Mansehra',
    city: 'Mansehra',
    description:
      'The three-day regional technology festival where Thrive Pakistan\u2019s documented public journey began, spanning AI, cybersecurity, entrepreneurship, digital careers, exhibitions, and applied competition.',
    about: [
      'Hazara Tech Fiesta 2025 was Thrive Pakistan\u2019s first documented large-scale platform: a three-day festival at Hazara University, Mansehra that brought together students, academia, technology professionals, startups, government and industry within a single regional platform.',
      'The programme spanned artificial intelligence, cybersecurity, entrepreneurship, digital careers, exhibitions, expert sessions, and applied competition, demonstrating that a regional audience responds when credible, future-focused programming is brought closer to them.',
    ],
    image: img('eventsA', 5),
    gallerySlug: 'hazara-tech-fiesta-2025',
    dateConfirmed: true,
    venueConfirmed: true,
    attendees: '5,000+ attendees',
    tags: ['AI', 'Cybersecurity', 'Entrepreneurship', 'Exhibitions'],
    speakerSlugs: [],
    agenda: [],
    highlights: [
      '5,000+ attendees',
      '50+ speakers',
      '15+ exhibitors',
      '24-hour hackathon',
      'Multi-day event operations with volunteers, partners and speaker programming',
    ],
    sponsorIds: [],
    faqs: [],
  },
];

/**
 * Single source of truth for all events.
 * The `status` property is dynamically computed on access from the event date.
 */
export const EVENTS: ThriveEvent[] = RAW_EVENTS.map((e) => ({
  ...e,
  get status() {
    return getEventStatus(e);
  },
}));

export const EVENT_CATEGORIES = ['Flagship Platform', 'Tech Festival'] as const;

export const EVENT_CITIES = ['Mansehra'] as const;
