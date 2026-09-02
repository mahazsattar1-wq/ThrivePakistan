import type { TeamMember } from '../types';
import { img } from '../media';

/**
 * MOCK DATA — fictional core team (mock names provided for the prototype).
 * These are NOT real Thrive Pakistan employees; replace via `/api/team.php`.
 */
export const TEAM: TeamMember[] = [
  {
    id: 'tm-01',
    slug: 'ahsan-malik',
    name: 'Ahsan Malik',
    role: 'Founder & CEO',
    focus: 'Vision, partnerships & national strategy',
    bio: 'Ahsan started Thrive Pakistan after a decade producing university events, convinced that Pakistan\'s young talent deserves platforms with international production standards.',
    portrait: img('portraitsB', 1),
  },
  {
    id: 'tm-02',
    slug: 'sarah-khan',
    name: 'Sarah Khan',
    role: 'Director Programs',
    focus: 'Program design & learning experiences',
    bio: 'Sarah architects the program portfolio — from leadership labs to campus tours — and guards the learning outcomes behind every Thrive format.',
    portrait: img('portraitsB', 7),
  },
  {
    id: 'tm-03',
    slug: 'hamza-ali',
    name: 'Hamza Ali',
    role: 'Partnerships Lead',
    focus: 'Corporate, technology & education partnerships',
    bio: 'Hamza builds the partner ecosystem, matching organizational goals with community impact so sponsorships become long-term collaborations.',
    portrait: img('portraitsB', 0),
  },
  {
    id: 'tm-04',
    slug: 'areeba-shah',
    name: 'Areeba Shah',
    role: 'Community Lead',
    focus: 'Volunteers, societies & city chapters',
    bio: 'Areeba grows and cares for the volunteer community — 300+ people who run registration desks, stages and social rooms at every Thrive event.',
    portrait: img('portraitsB', 3),
  },
  {
    id: 'tm-05',
    slug: 'bilal-ahmed',
    name: 'Bilal Ahmed',
    role: 'Events Director',
    focus: 'Production, logistics & on-ground experience',
    bio: 'Bilal has stage-managed 40+ conferences and believes the last 10% — signage, sound, queue design — is what people actually remember.',
    portrait: img('portraitsB', 6),
  },
  {
    id: 'tm-06',
    slug: 'hina-raza',
    name: 'Hina Raza',
    role: 'Communications Lead',
    focus: 'Brand, media & storytelling',
    bio: 'Hina leads the newsroom: stories, films and press that turn event moments into a year-round conversation about Pakistan\'s builders.',
    portrait: img('portraitsB', 2),
  },
];
