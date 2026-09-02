import type { Statistic, Testimonial, TimelineEntry, ValueItem } from '../types';

/**
 * MOCK DATA — impact figures for the frontend prototype. Values are
 * illustrative placeholders; the admin dashboard will own real numbers later.
 */
export const STATS: Statistic[] = [
  { id: 'st-01', label: 'Events Produced', value: 50, suffix: '+', description: 'Conferences, summits, tours, workshops & meetups' },
  { id: 'st-02', label: 'Participants', value: 15000, suffix: '+', description: 'Attendees across campuses, cities & stages' },
  { id: 'st-03', label: 'Speakers Hosted', value: 100, suffix: '+', description: 'Founders, executives, researchers & creators' },
  { id: 'st-04', label: 'Partner Organizations', value: 30, suffix: '+', description: 'Technology, education, media & corporate allies' },
  { id: 'st-05', label: 'Universities Reached', value: 25, suffix: '+', description: 'Through the Campus Innovation Tour & societies' },
  { id: 'st-06', label: 'Cities Activated', value: 10, suffix: '+', description: 'From Karachi to the northern valleys' },
];

/** MOCK DATA — community voices (fictional quotes for prototype). */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ts-01',
    quote: 'I came to a Thrive meetup with a half-built idea and left with a mentor, two hires and a deadline. Eighteen months later we are a funded company.',
    name: 'Fatima Noor',
    role: 'Co-founder, logistics startup',
    event: 'Tech & Entrepreneurship Meetup',
  },
  {
    id: 'ts-02',
    quote: 'The roundtables are the only leadership room I have been in where people brought real decisions instead of slides. I use the playbook weekly.',
    name: 'Danish Iqbal',
    role: 'Engineering Manager',
    event: 'Thrive Leadership Summit 2025',
  },
  {
    id: 'ts-03',
    quote: 'As a student from Faisalabad I assumed the ecosystem happened somewhere else. The Tour proved it can happen in our own hall.',
    name: 'Hassan Raza',
    role: 'Final-year student, GCU Faisalabad',
    event: 'Campus Innovation Tour',
  },
  {
    id: 'ts-04',
    quote: 'The mentorship circle matched me with two mentors and eleven peers who still meet monthly. That is the real product of Women Thrive.',
    name: 'Kinza Waheed',
    role: 'Product Designer',
    event: 'Women Thrive 2025',
  },
  {
    id: 'ts-05',
    quote: 'We sponsored expecting logo placement. We stayed for the talent desk — four of our best engineers came through a Thrive hackathon.',
    name: 'Partner Lead',
    role: 'Technology partner (name withheld in mock data)',
    event: 'ThriveHack 2025',
  },
  {
    id: 'ts-06',
    quote: 'Volunteering at the registration desk taught me more about operations than my degree. Now I run the desk.',
    name: 'Abdullah Sheikh',
    role: 'Volunteer City Chapter Lead',
    event: 'Volunteer Community',
  },
];

/**
 * MOCK TIMELINE — illustrative journey for the prototype. These dates are
 * frontend content, not verified organizational history.
 */
export const TIMELINE: TimelineEntry[] = [
  { year: '2022', title: 'Thrive Pakistan begins', description: 'A small team produces its first university events with one belief: Pakistani youth deserve world-class platforms.' },
  { year: '2023', title: 'University outreach expands', description: 'The Campus Innovation Tour format is born, connecting student societies with mentors and sponsors.' },
  { year: '2024', title: 'Leadership programs grow', description: 'The first Leadership Summit and hosted roundtables establish the "practical craft" format.' },
  { year: '2025', title: 'National partnerships', description: 'Technology, education and media partners join a season-long ecosystem model; Women Thrive launches.' },
  { year: '2026', title: 'FutureX launches', description: 'The flagship technology & innovation experience debuts — Pakistan\'s boldest gathering of builders.' },
];

export const VALUES: ValueItem[] = [
  { icon: 'bulb', title: 'Innovation', description: 'We back builders and reward evidence over polish.' },
  { icon: 'compass', title: 'Leadership', description: 'Leadership is practice, not position — we create rooms to practice in.' },
  { icon: 'users', title: 'Inclusion', description: 'Every city, campus and background belongs in the room.' },
  { icon: 'handshake', title: 'Collaboration', description: 'Partners, societies and volunteers co-build every platform.' },
  { icon: 'trend', title: 'Growth', description: 'Every experience must leave you more capable than it found you.' },
  { icon: 'target', title: 'Impact', description: 'We measure placements, prototypes and policy — not attendance alone.' },
  { icon: 'shield', title: 'Integrity', description: 'Honest numbers, honest stages, honest conversations.' },
  { icon: 'door', title: 'Opportunity', description: 'We open doors that stay open after the event ends.' },
];
