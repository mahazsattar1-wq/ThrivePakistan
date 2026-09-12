import type { ImpactStatement, TimelineEntry, ValueItem } from '../types';

/**
 * IMPACT — qualitative statements only.
 *
 * Thrive Pakistan does not publish verified lifetime statistics beyond the
 * documented Hazara Tech Fiesta 2025 figures, so this section uses
 * qualitative impact statements instead of invented numbers. Do NOT add
 * numeric statistics that the organizational documents do not confirm.
 */
export const IMPACT_STATEMENTS: ImpactStatement[] = [
  {
    id: 'im-connect',
    icon: 'users',
    title: 'Connecting',
    description: 'Students with practitioners, employers and networks.',
  },
  {
    id: 'im-learn',
    icon: 'bulb',
    title: 'Learning',
    description: 'Creating access to practical conversations around technology and opportunity.',
  },
  {
    id: 'im-collab',
    icon: 'handshake',
    title: 'Collaboration',
    description: 'Bringing education, industry, government and communities together.',
  },
  {
    id: 'im-opportunity',
    icon: 'door',
    title: 'Opportunity',
    description: 'Creating pathways toward meaningful professional exposure.',
  },
];

/**
 * ORGANIZATIONAL TIMELINE — verified milestones only.
 * Sources: Thrive Pakistan Organizational Profile (August 2026).
 */
export const TIMELINE: TimelineEntry[] = [
  {
    year: '2025',
    title: 'Thrive Pakistan begins',
    description:
      'A youth-led team moves from conversations about the opportunity gap to visible ecosystem building, rooted in Hazara, where talent is abundant but access to industry networks is uneven.',
  },
  {
    year: '2025',
    title: 'Hazara Tech Fiesta 2025',
    description:
      'The documented public journey begins with a three-day regional technology festival at Hazara University, Mansehra: 5,000+ attendees, 50+ speakers, 15+ exhibitors, and a 24-hour hackathon.',
  },
  {
    year: '2026',
    title: 'Institutional foundation with GPGC Mansehra',
    description:
      'On 6 August 2026, Thrive Pakistan and Government Post Graduate College Mansehra sign a Memorandum of Collaboration, creating the institutional foundation for joint programming and the delivery of FutureX 2026.',
  },
  {
    year: '2026',
    title: 'FutureX 2026',
    description:
      'Thrive Pakistan\u2019s flagship youth, technology and innovation platform is planned for 24 September 2026 at Government Post Graduate College, Mansehra, focused on AI, work, finance, and leadership.',
  },
];

/**
 * WORKING PRINCIPLES — the six principles stated in the organizational
 * profile's "Identity & Direction" section.
 */
export const VALUES: ValueItem[] = [
  {
    icon: 'door',
    title: 'Access before applause',
    description: 'A program is useful only when participants leave closer to knowledge, people or opportunity.',
  },
  {
    icon: 'mic',
    title: 'Practitioners over personalities',
    description: 'We prioritize people who build, hire, research, lead and solve, not only those with public visibility.',
  },
  {
    icon: 'map',
    title: 'Regional ownership',
    description: 'Programs are designed with local institutions and communities, not copied into the region as an outside campaign.',
  },
  {
    icon: 'women',
    title: 'Inclusion by design',
    description: 'Women, students from less-connected institutions and first-time participants are supported deliberately.',
  },
  {
    icon: 'handshake',
    title: 'Partnership with purpose',
    description: 'Every collaboration should create a meaningful role, activation, or outcome, not simply another logo.',
  },
  {
    icon: 'shield',
    title: 'Execution with accountability',
    description: 'Every major task has one accountable owner, a deadline, a status and a reporting line.',
  },
];

/**
 * STRATEGIC GOALS — the eight goals listed in the organizational profile.
 */
export const STRATEGIC_GOALS = [
  {
    id: 'sg-01',
    title: 'Democratize access',
    text: 'Bring national-level experts, employers, founders and institutions closer to regional youth.',
  },
  {
    id: 'sg-02',
    title: 'Build future-ready capability',
    text: 'Create practical exposure to AI, digital work, cybersecurity, entrepreneurship, finance, communication and leadership.',
  },
  {
    id: 'sg-03',
    title: 'Strengthen academia–industry links',
    text: 'Help educational institutions move beyond ceremonial partnerships toward workshops, talent pipelines, challenges and applied collaboration.',
  },
  {
    id: 'sg-04',
    title: 'Create pathways to work',
    text: 'Support internships, entry-level hiring, freelancing, remote work, mentorship and portfolio development.',
  },
  {
    id: 'sg-05',
    title: 'Support founders and innovators',
    text: 'Give students and early-stage entrepreneurs places to demonstrate, test, pitch and improve ideas.',
  },
  {
    id: 'sg-06',
    title: 'Grow inclusive leadership',
    text: 'Increase meaningful participation by women and by young people who have not previously had access to such platforms.',
  },
  {
    id: 'sg-07',
    title: 'Build a durable ecosystem',
    text: 'Connect events, campus teams, digital communities, partners and follow-up programs into one continuing network.',
  },
  {
    id: 'sg-08',
    title: 'Represent regional talent nationally',
    text: 'Position Hazara and northern Pakistan as a source of technology, creativity, enterprise, and leadership, not merely as an audience market.',
  },
] as const;
