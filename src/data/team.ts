import type { TeamMember } from '../types';

/**
 * LEADERSHIP — confirmed organizational roster.
 *
 * Names, roles and responsibilities are taken from the official Thrive
 * Pakistan Organizational Profile (2026). No photographs are attached:
 * until approved photographs are available, the UI renders a neutral
 * monogram avatar instead of any invented face.
 *
 * Function descriptions paraphrase the accountability areas listed in the
 * official organizational profile.
 */
export const TEAM: TeamMember[] = [
  {
    id: 'tm-01',
    slug: 'hassan-sajjad-khan',
    name: 'Hassan Sajjad Khan',
    role: 'Founder & Chief Executive Officer',
    focus: 'Organizational direction',
    bio: 'Leads organizational direction, executive approvals and high-level institutional representation.',
    group: 'executive',
  },
  {
    id: 'tm-02',
    slug: 'faraz-khan-sulemani',
    name: 'Faraz Khan Sulemani',
    role: 'Managing Director',
    focus: 'Execution & delivery',
    bio: 'Leads overall execution, cross-functional coordination, high-level stakeholders, timelines and delivery discipline.',
    group: 'executive',
  },
  {
    id: 'tm-03',
    slug: 'ibrahim-fiaz',
    name: 'Ibrahim Fiaz',
    role: 'Chief Operating Officer',
    focus: 'Operations',
    bio: 'Leads operational readiness, interdepartmental execution, logistics coordination and event-day command.',
    group: 'executive',
  },
  {
    id: 'tm-04',
    slug: 'syed-hussain-ali-shah',
    name: 'Syed Hussain Ali Shah',
    role: 'Chief Strategy Officer',
    focus: 'Strategy & partnerships',
    bio: 'Leads strategic positioning, partnerships, proposals, negotiations and post-program growth.',
    group: 'executive',
  },
  {
    id: 'tm-05',
    slug: 'abdul-malik-qureshi',
    name: 'Abdul Malik Qureshi',
    role: 'Chief Human Resource Officer',
    focus: 'People & HR',
    bio: 'Leads recruitment, onboarding, deployment, performance and volunteer systems.',
    group: 'functional',
  },
  {
    id: 'tm-06',
    slug: 'wahaj-saeed',
    name: 'Wahaj Saeed',
    role: 'Chief Event Organizer',
    focus: 'Events',
    bio: 'Leads run-of-show, participant flow, rehearsals, stage and event-day coordination.',
    group: 'functional',
  },
  {
    id: 'tm-07',
    slug: 'umar-hayyat-khan',
    name: 'Umar Hayyat Khan',
    role: 'Chief Logistic Officer',
    focus: 'Logistics',
    bio: 'Leads venue, infrastructure, equipment, transport, vendors and contingencies.',
    group: 'functional',
  },
  {
    id: 'tm-08',
    slug: 'jamal-afzal',
    name: 'Jamal Afzal',
    role: 'Director Outreach',
    focus: 'Outreach',
    bio: 'Leads institutions, societies, communities, registrations and campus networks.',
    group: 'functional',
  },
  {
    id: 'tm-09',
    slug: 'noor-ul-ain',
    name: 'Noor Ul Ain',
    role: 'Director Female Affairs',
    focus: 'Female participation',
    bio: 'Leads participation strategy, women-focused engagement, support and representation.',
    group: 'functional',
  },
  {
    id: 'tm-10',
    slug: 'aemin-dawood',
    name: 'Aemin Dawood',
    role: 'Public Relations Officer',
    focus: 'Public relations',
    bio: 'Leads institutional correspondence, invitations, government relations, protocol and press coordination.',
    group: 'functional',
  },
  {
    id: 'tm-11',
    slug: 'aajlan-sajjad',
    name: 'Aajlan Sajjad',
    role: 'Chief Marketing Officer',
    focus: 'Marketing',
    bio: 'Leads brand, campaigns, audience growth, sponsor visibility and performance tracking.',
    group: 'functional',
  },
  {
    id: 'tm-12',
    slug: 'ehtisham-dawood',
    name: 'Ehtisham Dawood',
    role: 'Chief Media Operations',
    focus: 'Media operations',
    bio: 'Leads production, coverage, interviews, archives and post-event content.',
    group: 'functional',
  },
  {
    id: 'tm-13',
    slug: 'attaullah-khiljee',
    name: 'Attaullah Khiljee',
    role: 'Director Internal Communications',
    focus: 'Internal communications',
    bio: 'Leads action records, calendars, decisions, official updates and reporting flow.',
    group: 'functional',
  },
];
