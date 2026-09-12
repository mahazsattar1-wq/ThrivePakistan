import type { Program } from '../types';
import { img } from '../media';

/**
 * FOCUS AREAS — what Thrive Pakistan works on.
 *
 * These six areas paraphrase the strategic goals and focus themes in the
 * official Thrive Pakistan Organizational Profile (2026). They describe
 * programme directions and priorities — they do NOT claim that specific
 * workshops, certificates or training series already exist.
 */
export const PROGRAMS: Program[] = [
  {
    id: 'pg-01',
    slug: 'technology-digital-skills',
    title: 'Technology & Digital Skills',
    category: 'Technology',
    icon: 'chip',
    description:
      'Practical exposure to artificial intelligence, cybersecurity, digital skills, technology careers and the changing nature of employment.',
    details:
      'Technology moves faster than curricula. This focus area brings learners face to face with applied AI, cybersecurity awareness, and digital work through demonstrations, labs, expert sessions, and conversations with people who build and secure real systems.',
    outcomes: [
      'Practical exposure to AI and emerging technology',
      'Cybersecurity, privacy and digital-trust awareness',
      'Technology career pathways and the changing nature of work',
    ],
    audience: ['Students & graduates', 'Early-career technologists', 'Educators', 'Curious first-time participants'],
    impact: 'A core pillar of FutureX 2026 and year-round platform design.',
    image: img('eventsA', 0),
    eventSlugs: ['futurex-2026'],
  },
  {
    id: 'pg-02',
    slug: 'entrepreneurship',
    title: 'Entrepreneurship',
    category: 'Entrepreneurship',
    icon: 'rocket',
    description:
      'Digital entrepreneurship, emerging income pathways and connections to founders and practitioners.',
    details:
      'Young people in regional cities need to see entrepreneurship as a real route and meet the people already walking it. This area focuses on digital entrepreneurship, emerging income pathways, startup showcases, and direct connection to founders and practitioners.',
    outcomes: [
      'Exposure to digital entrepreneurship and emerging income pathways',
      'Spaces to demonstrate, test and pitch ideas',
      'Connections to founders, practitioners and mentors',
    ],
    audience: ['Aspiring founders', 'Student innovators', 'Freelancers & remote workers', 'Early-stage startups'],
    impact: 'Delivered through platform programmes such as the FutureX innovation showcase.',
    image: img('mediaA', 2),
    eventSlugs: ['futurex-2026'],
  },
  {
    id: 'pg-03',
    slug: 'industry-exposure',
    title: 'Industry Exposure',
    category: 'Ecosystem',
    icon: 'map',
    description:
      'Connecting students and emerging professionals with practitioners, employers and industry networks.',
    details:
      'The exposure gap is the gap Thrive Pakistan was created to close: many students complete a degree without ever meeting a recruiter, seeing a live technology demonstration or speaking to a founder. This area puts employers, practitioners and industry networks in the same room as regional talent.',
    outcomes: [
      'Direct contact with practitioners, employers and industry',
      'Employer interaction and recruitment pathways',
      'Professional networks that continue beyond the event',
    ],
    audience: ['Students & fresh graduates', 'Jobseekers', 'Employers & recruiters', 'Industry practitioners'],
    impact: 'The operating model\u2019s first layer, exposure before everything else.',
    image: img('eventsA', 3),
    eventSlugs: ['futurex-2026'],
  },
  {
    id: 'pg-04',
    slug: 'education-campus-engagement',
    title: 'Education & Campus Engagement',
    category: 'Education',
    icon: 'campus',
    description:
      'Working with educational institutions to strengthen the connection between classroom learning and industry.',
    details:
      'Universities, companies and public departments often operate near one another without a sustained collaboration mechanism. Thrive Pakistan works with educational institutions, including colleges, universities, and campus societies, toward workshops, talent pipelines, challenges and applied collaboration that go beyond ceremonial partnership.',
    outcomes: [
      'Institutional collaborations and memoranda of collaboration',
      'Campus networks, societies and student organizing teams',
      'Stronger links between classroom learning and industry needs',
    ],
    audience: ['Universities & colleges', 'Student societies', 'Faculty & administrations', 'Campus organizers'],
    impact: 'Anchored by the Memorandum of Collaboration with Government Post Graduate College Mansehra.',
    image: img('eventsA', 5),
    eventSlugs: ['hazara-tech-fiesta-2025', 'futurex-2026'],
  },
  {
    id: 'pg-05',
    slug: 'youth-development',
    title: 'Youth Development',
    category: 'Youth',
    icon: 'spark',
    description:
      'Creating meaningful participation, learning and leadership opportunities for young people.',
    details:
      'Young people may have ability but lack a stage on which to test, present, and defend their ideas. This area creates meaningful participation, including volunteering, organizing, competing, and speaking, so that confidence and capability grow together with structured ownership and accountability.',
    outcomes: [
      'Volunteer, organizer and ambassador roles with real responsibility',
      'Leadership pathways with accountable ownership',
      'Participation that continues after the event ends',
    ],
    audience: ['Students', 'Young volunteers', 'Campus organizers', 'First-time participants'],
    impact: 'Youth-led by design, as the platform is built and run by young people.',
    image: img('galleryA', 1),
    eventSlugs: [],
  },
  {
    id: 'pg-06',
    slug: 'women-participation',
    title: 'Women & Female Participation',
    category: 'Inclusion',
    icon: 'women',
    description:
      'Increasing meaningful participation and leadership opportunities for women and female students.',
    details:
      'Inclusion is deliberate, not incidental. This focus area works on participation strategy and support so that women and female students can take part fully and move into visible leadership roles across every Thrive Pakistan platform.',
    outcomes: [
      'Women-focused engagement and participation strategy',
      'Support and representation across platforms',
      'Leadership opportunities for female students and young women',
    ],
    audience: ['Female students', 'Young women entering tech & enterprise', 'Educators & mentors', 'Allies & partners'],
    impact: 'A dedicated functional leadership role, Director Female Affairs, owns this area.',
    image: img('galleryA', 5),
    eventSlugs: ['futurex-2026'],
  },
];
