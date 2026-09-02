import type { Program } from '../types';
import { img } from '../media';

/** MOCK DATA — Thrive Pakistan program portfolio (backend-swappable). */
export const PROGRAMS: Program[] = [
  {
    id: 'pg-01',
    slug: 'technology-innovation',
    title: 'Technology & Innovation',
    category: 'Technology',
    icon: 'chip',
    description: 'Technology-focused events, hackathons and innovation experiences that put Pakistani builders on a global-standard stage.',
    details:
      'From FutureX to ThriveHack, this portfolio creates the rooms where engineers, researchers and founders meet: expo floors, pitch stages, research-to-product tracks and overnight build sprints with senior mentor benches.',
    outcomes: ['Flagship tech convenings', 'Hackathons with mentor benches', 'Product showcase floors'],
    image: img('eventsA', 0),
    eventSlugs: ['futurex-2026', 'thrivehack-2025'],
  },
  {
    id: 'pg-02',
    slug: 'leadership-development',
    title: 'Leadership Development',
    category: 'Leadership',
    icon: 'compass',
    description: 'Leadership workshops, summits and roundtables that trade motivational fluff for practical leadership craft.',
    details:
      'The Leadership Summit, hosted roundtables and the open Leadership Playbook give young managers access to the decision-making experience of executives — structured, candid and repeatable.',
    outcomes: ['Annual Leadership Summit', 'Hosted executive roundtables', 'Open leadership playbook'],
    image: img('eventsA', 1),
    eventSlugs: ['thrive-leadership-summit-2026', 'thrive-leadership-summit-2025'],
  },
  {
    id: 'pg-03',
    slug: 'youth-empowerment',
    title: 'Youth Empowerment',
    category: 'Youth',
    icon: 'spark',
    description: 'Programs designed to equip young people with skills, confidence and networks that outlast a single event day.',
    details:
      'Skills workshops, career clinics and mentor circles target the gap between campus and career: communication, applied AI tools, portfolio craft and first-job readiness.',
    outcomes: ['Skills workshops', 'Career & portfolio clinics', 'Mentor circles'],
    image: img('eventsA', 4),
    eventSlugs: ['youth-skills-workshop-2026'],
  },
  {
    id: 'pg-04',
    slug: 'women-empowerment',
    title: 'Women Empowerment',
    category: 'Women',
    icon: 'women',
    description: 'Workshops, summits and opportunity pipelines for women leading Pakistan\'s digital and economic future.',
    details:
      'Women Thrive combines summit-stage visibility with real mechanisms: pre-matched mentorship circles, grant and capital access sessions and a founders\' marketplace with buying partners.',
    outcomes: ['Women Thrive summit', 'Mentorship circles', 'Capital access sessions'],
    image: img('eventsA', 2),
    eventSlugs: ['women-thrive-2026', 'women-thrive-2025'],
  },
  {
    id: 'pg-05',
    slug: 'university-engagement',
    title: 'University Engagement',
    category: 'Education',
    icon: 'campus',
    description: 'Events and activities for universities and colleges — bringing the national ecosystem to campus doors.',
    details:
      'The Campus Innovation Tour visits eight cities a season with demo floors, hack sprints, society partnerships and on-site internship desks, plus year-round society support grants.',
    outcomes: ['Campus Innovation Tour', 'Society partnership grants', 'On-campus internship desks'],
    image: img('eventsA', 3),
    eventSlugs: ['campus-innovation-tour-fall-2026', 'campus-innovation-tour-spring-2026'],
  },
  {
    id: 'pg-06',
    slug: 'entrepreneurship',
    title: 'Entrepreneurship',
    category: 'Business',
    icon: 'rocket',
    description: 'Startup, business and entrepreneurship programs connecting founders with capital, mentors and first customers.',
    details:
      'Meetups, investor rooms and founder firesides create a continuous pipeline: pitch practice today, investor introductions next quarter, and a peer network that survives the hard months.',
    outcomes: ['Founder meetups', 'Investor rooms', 'Pitch practice labs'],
    image: img('mediaA', 2),
    eventSlugs: ['tech-entrepreneurship-meetup-2026'],
  },
  {
    id: 'pg-07',
    slug: 'training-experiences',
    title: 'Training Experiences',
    category: 'Skills',
    icon: 'tools',
    description: 'Skill-building workshops and immersive learning experiences led by practitioners, not lecturers.',
    details:
      'Every training format ends with reviewed work: lab outputs, portfolio critiques or certified assessments — so participants leave with evidence, not just attendance.',
    outcomes: ['Practitioner-led labs', 'Certified assessments', 'Portfolio reviews'],
    image: img('eventsB', 3),
    eventSlugs: ['youth-skills-workshop-2026'],
  },
  {
    id: 'pg-08',
    slug: 'leadership-tours',
    title: 'Leadership Tours',
    category: 'Experiences',
    icon: 'map',
    description: 'Educational and leadership-oriented tours that move learning out of conference halls and into the field.',
    details:
      'From northern-valley leadership expeditions to institutional study visits, tours pair challenging environments with facilitated reflection and team missions.',
    outcomes: ['Leadership expeditions', 'Institutional study visits', 'Field team missions'],
    image: img('eventsB', 2),
    eventSlugs: [],
  },
];
