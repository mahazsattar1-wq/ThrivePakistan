import type { ThriveEvent } from '../types';

/**
 * HOMEPAGE CONTENT CONFIGURATION.
 *
 * Every meaningful string, CTA, flag and section setting used by the
 * homepage lives here (or in the dedicated data modules it references).
 * The homepage component consumes this config — later the same shapes can
 * be served by PHP/MySQL from the admin panel without a frontend rewrite.
 *
 * Sections are gated by `visible`; content copy is never hardcoded in JSX.
 */

/* ---------- CTA + section primitives ---------- */

export interface HomeCta {
  id: string;
  label: string;
  to?: string;
  href?: string;
  variant: 'primary' | 'outline' | 'outline-light' | 'light' | 'ghost' | 'green-ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

export interface HomeSectionConfig {
  /** Section anchor id. */
  id: string;
  /** Master switch — the admin panel can hide any section. */
  visible: boolean;
  eyebrow?: string;
  title?: string;
  lead?: string;
}

/* ---------- Helper: conditional featured upcoming event ---------- */

/**
 * Business rule: an event may only be featured on the homepage when it is
 * published as upcoming AND its date AND venue are confirmed. Returns the
 * earliest such event, or `undefined` — in which case the homepage renders
 * NO event section at all (no placeholders, no blank space).
 */
export function getFeaturedUpcomingEvent(events: ThriveEvent[]): ThriveEvent | undefined {
  return events
    .filter((e) => e.status === 'upcoming' && e.dateConfirmed && e.venueConfirmed)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
}

/* ---------- Section: featured upcoming event ---------- */

export interface FeaturedEventSectionConfig extends HomeSectionConfig {
  kicker: string;
  statusLabel: string;
  countdownLabel: string;
  note: string;
  ctas: HomeCta[];
}

/* ---------- Section: main intro / hero ---------- */

export interface HeroSectionConfig extends HomeSectionConfig {
  points: { icon: string; label: string }[];
  ctas: HomeCta[];
}

/* ---------- Section: leadership messages ---------- */

export interface LeadershipSectionConfig extends HomeSectionConfig {
  footnote: string;
}

/* ---------- Section: talent statement ---------- */

export interface TalentSectionConfig extends HomeSectionConfig {
  titleEmphasis: string;
  body: string;
}

/* ---------- Section: vision & mission ---------- */

export interface VisionMissionSectionConfig extends HomeSectionConfig {
  cards: { id: string; tone: 'dark' | 'green'; eyebrow: string; text: string }[];
}

/* ---------- Section: card-grid section config (what we do, events, newsroom) ---------- */

export interface CardGridSectionConfig extends HomeSectionConfig {
  cta?: HomeCta;
  /** Behaviour when the list is empty: 'hide' removes the section entirely. */
  emptyBehavior?: 'hide' | 'empty-state';
  emptyState?: { title: string; message: string };
}

/* ---------- Section: closing CTA ---------- */

export interface FinalCtaSectionConfig extends HomeSectionConfig {
  body: string;
  ctas: HomeCta[];
}

/* ============================================================
   CONFIGURATION
   ============================================================ */

export const HOME_PAGE = {
  featuredEvent: {
    id: 'featured-event',
    visible: true,
    kicker: 'Featured Platform',
    statusLabel: 'Confirmed',
    countdownLabel: '24 September 2026 · Mansehra',
    note: 'Final agenda, speakers and registration details will be announced as confirmed.',
    ctas: [
      { id: 'fe-explore', label: 'Explore FutureX', to: '/futurex', variant: 'primary', size: 'lg', icon: 'arrow-right' },
      { id: 'fe-register', label: 'Register Interest', to: '/events/futurex-2026', variant: 'outline-light', size: 'lg' },
    ] as HomeCta[],
  } satisfies FeaturedEventSectionConfig,

  hero: {
    id: 'intro',
    visible: true,
    eyebrow: 'Thrive Pakistan — Youth-led · Founded 2025',
    title: 'Connecting Young Talent With Knowledge, Industry & Opportunity',
    lead: 'A youth-centered platform that brings students and emerging talent closer to practical learning, technology, entrepreneurship, industry exposure and meaningful opportunities — with particular relevance to Hazara and Khyber Pakhtunkhwa.',
    points: [
      { icon: 'spark', label: 'Youth-led, professionally accountable' },
      { icon: 'pin', label: 'Rooted in Hazara, Khyber Pakhtunkhwa' },
      { icon: 'users', label: 'Students · Institutions · Practitioners · Communities' },
    ],
    ctas: [
      { id: 'hero-focus', label: 'Explore Focus Areas', to: '/programs', variant: 'primary', size: 'lg', icon: 'arrow-right' },
      { id: 'hero-partner', label: 'Partner With Thrive', to: '/become-a-partner', variant: 'outline-light', size: 'lg' },
    ] as HomeCta[],
  } satisfies HeroSectionConfig,

  leadership: {
    id: 'leadership',
    visible: true,
    eyebrow: 'Leadership',
    title: 'Messages from Thrive Pakistan Leadership',
    lead: 'The people accountable for the platform — on what Thrive Pakistan is building and why.',
    footnote: 'Leadership messages are published as they are approved by Thrive Pakistan.',
  } satisfies LeadershipSectionConfig,

  talent: {
    id: 'talent',
    visible: true,
    title: 'Talent exists everywhere.',
    titleEmphasis: 'Opportunity does not.',
    body: 'Many students can complete a degree without ever speaking to a founder, seeing a live technology demonstration, meeting a recruiter or pitching an idea. The issue was never a lack of ambition — it was a lack of proximity. Thrive Pakistan exists to narrow that distance.',
  } satisfies TalentSectionConfig,

  visionMission: {
    id: 'vision-mission',
    visible: true,
    cards: [
      {
        id: 'vision',
        tone: 'green' as const,
        eyebrow: 'Our vision',
        text: 'A Pakistan where a young person\u2019s location does not determine the quality of opportunity, exposure or professional network available to them.',
      },
      {
        id: 'mission',
        tone: 'dark' as const,
        eyebrow: 'Our mission',
        text: 'To connect regional youth with technology, industry, entrepreneurship, finance, leadership and public institutions through platforms that produce practical learning and lasting relationships.',
      },
    ],
  } satisfies VisionMissionSectionConfig,

  whatWeDo: {
    id: 'what-we-do',
    visible: true,
    eyebrow: 'What we do',
    title: 'Six areas where we open access.',
    lead: 'Programme directions rooted in our strategic goals — technology, entrepreneurship, industry, education, youth and women\u2019s participation.',
    cta: { id: 'wwd-all', label: 'All focus areas', to: '/programs', variant: 'ghost', icon: 'arrow-right' },
  } satisfies CardGridSectionConfig,

  upcomingEvents: {
    id: 'upcoming-events',
    visible: true,
    eyebrow: 'Upcoming',
    title: 'The next rooms worth being in.',
    lead: 'Confirmed platforms open for interest — published only when details are confirmed.',
    cta: { id: 'ue-all', label: 'All events', to: '/events', variant: 'outline-light', icon: 'arrow-right' },
    emptyBehavior: 'hide' as const,
  } satisfies CardGridSectionConfig,

  previousWork: {
    id: 'previous-work',
    visible: true,
    eyebrow: 'Previous referenced work',
    title: 'Where the platform comes from.',
    lead: 'Our documented public journey began in Hazara — with a festival, an institutional collaboration and a region ready for credible programming.',
  } satisfies HomeSectionConfig,

  impact: {
    id: 'impact',
    visible: true,
    eyebrow: 'Impact',
    title: 'Access with structure.',
    lead: 'What our platforms are built to produce — measured in opportunities created, not vanity numbers.',
  } satisfies HomeSectionConfig,

  partnership: {
    id: 'partnership',
    visible: true,
    eyebrow: 'Built through collaboration',
    title: 'No platform is built alone.',
    lead: '',
    body: 'Thrive Pakistan works to develop relationships across educational institutions, industry, government, technology practitioners, founders, community organizations and professional networks. Every collaboration is designed to create a meaningful role, activation or outcome — not simply another logo.',
    cta: { id: 'p-explore', label: 'Explore Partnership Opportunities', to: '/become-a-partner', variant: 'primary', size: 'lg', icon: 'arrow-right' },
  } satisfies HomeSectionConfig & { body: string; cta: HomeCta },

  newsroom: {
    id: 'newsroom',
    visible: true,
    eyebrow: 'Newsroom',
    title: 'Notes from the build.',
    lead: 'Organizational notes and perspectives — grounded in what we actually know and do.',
    cta: { id: 'n-all', label: 'Visit the blog', to: '/blog', variant: 'ghost', icon: 'arrow-right' },
  } satisfies CardGridSectionConfig,

  finalCta: {
    id: 'connect',
    visible: true,
    eyebrow: 'Connect with Thrive Pakistan',
    title: 'Bring opportunity closer to the people who need it.',
    body: 'Partner your organization, take a stage, volunteer with the team or bring Thrive Pakistan to your institution — there is a role for you in this ecosystem.',
    ctas: [
      { id: 'fc-partner', label: 'Email Partnerships', href: 'mailto:partnerships@thrivepakistan.com', variant: 'primary', icon: 'arrow-right' },
      { id: 'fc-volunteer', label: 'Become a Volunteer', to: '/volunteer', variant: 'outline-light' },
      { id: 'fc-speaker', label: 'Become a Speaker', to: '/become-a-speaker', variant: 'green-ghost' },
    ] as HomeCta[],
  } satisfies FinalCtaSectionConfig,
} as const;
