import type { BlogPost } from '../types';
import { img } from '../media';

/**
 * NEWSROOM — organizational notes and perspectives.
 *
 * Articles are organizational editorials grounded in the official Thrive
 * Pakistan / FutureX 2026 documents. They contain no invented statistics,
 * speakers, sponsors or events. Attributed to the organization rather than
 * to individuals.
 */
export const BLOGS: BlogPost[] = [
  {
    id: 'bl-01',
    slug: 'why-thrive-pakistan-exists',
    title: 'Talent Exists Everywhere. Opportunity Does Not.',
    category: 'Organization',
    excerpt:
      'The problem Thrive Pakistan was created to solve is not a lack of ambition — it is a lack of proximity.',
    content: [
      'Thrive Pakistan\u2019s documented public journey began in 2025, in Hazara — a region where talent is abundant but access to national industry networks, technology companies, investors, experienced mentors and large-scale professional platforms is still uneven.',
      'The issue was never a lack of ambition. It was a lack of proximity. Many students could complete a degree without ever speaking to a founder, seeing a live technology demonstration, meeting a recruiter, pitching an idea or understanding how digital work is changing their field.',
      'We describe the distance in six gaps: exposure, skills, networks, confidence, institutions and continuity. One-off seminars create moments; ecosystems require repeated contact, follow-up and accountable ownership.',
      'Thrive Pakistan was not created to bring \u201Cmotivation\u201D to young people. It was created to bring them closer to real people, real systems and real opportunity — through programmes, convenings, collaborations, skills initiatives and long-term ecosystem building.',
    ],
    author: 'Thrive Pakistan',
    authorRole: 'Organizational editorial',
    date: '2026-08-01',
    readingTime: 4,
    views: 0,
    image: img('galleryA', 1),
    featured: true,
    tags: ['Organization', 'Mission', 'Hazara'],
  },
  {
    id: 'bl-02',
    slug: 'futurex-2026-ai-work-finance-leadership',
    title: 'FutureX 2026: AI, Work, Finance, Leadership',
    category: 'FutureX',
    excerpt:
      'What Thrive Pakistan\u2019s flagship platform is building — and what is confirmed so far.',
    content: [
      'FutureX 2026 is Thrive Pakistan\u2019s current flagship platform: a youth, technology and innovation gathering planned for 24 September 2026 at Government Post Graduate College, Mansehra.',
      'The platform is organized around one practical question: what does a young person need to understand, build and access in order to succeed in the next economy? Its four content pillars — AI, Work, Finance and Leadership — frame that question from different directions.',
      'Programme development is in progress. Planned components include Main Stage keynotes, FutureX Talks and focused panels, an AI Lab with practical demonstrations, a Career Hub for employer interaction, a Startup Zone, a Finance Lab, a Networking Zone, a Learning Lab and the FutureX Challenge for applied student innovation. These components are directions being built — not a confirmed final agenda.',
      'What is confirmed: the date, the host institution and a Memorandum of Collaboration with Government Post Graduate College Mansehra signed on 6 August 2026. What is not yet confirmed: speakers, final sessions, sponsors, ticketing and registration. Those will be announced as they are confirmed.',
    ],
    author: 'Thrive Pakistan',
    authorRole: 'Organizational editorial',
    date: '2026-08-10',
    readingTime: 4,
    views: 0,
    image: img('eventsA', 0),
    featured: true,
    tags: ['FutureX', 'AI', 'Future of Work'],
  },
  {
    id: 'bl-03',
    slug: 'classroom-industry-gap',
    title: 'The Gap Between Classroom and Industry',
    category: 'Perspectives',
    excerpt:
      'Why academic learning is often not matched by practical experience — and what closing that gap actually requires.',
    content: [
      'Academic learning is often not matched by practical experience in AI, software, digital work, entrepreneurship and communication. The result is a skills gap that no single seminar can close.',
      'Universities, companies and public departments often operate near one another without a sustained collaboration mechanism. Ceremonial partnerships produce photographs; ecosystems produce workshops, talent pipelines, challenges and applied collaboration.',
      'Closing the distance takes repetition: exposure that leads to skills, skills that build networks, networks that convert into internships, jobs, freelance work, mentorship and startup support — and a structure that keeps the network active between events.',
      'That is the model Thrive Pakistan is building in Hazara and Khyber Pakhtunkhwa: five layers — exposure, skills, network, opportunity, ecosystem — each moving participants closer to a usable outcome.',
    ],
    author: 'Thrive Pakistan',
    authorRole: 'Organizational editorial',
    date: '2026-08-05',
    readingTime: 3,
    views: 0,
    image: img('eventsA', 3),
    tags: ['Education', 'Industry', 'Ecosystem'],
  },
  {
    id: 'bl-04',
    slug: 'hazara-tech-fiesta-2025-recap',
    title: 'Where It Started: Hazara Tech Fiesta 2025',
    category: 'Previous Work',
    excerpt:
      'Three days at Hazara University, Mansehra — the platform that turned a regional idea into a working organization.',
    content: [
      'Hazara Tech Fiesta 2025 ran from 12–14 December 2025 at Hazara University, Mansehra. It was the moment Thrive Pakistan\u2019s youth-led team moved from conversations about the opportunity gap to visible ecosystem building.',
      'The documented numbers: 5,000+ attendees, 50+ speakers, 15+ exhibitors and a 24-hour hackathon. The programme spanned AI, cybersecurity, entrepreneurship, digital careers, exhibitions, expert sessions and applied competition.',
      'What the platform demonstrated matters more than the figures: the ability to coordinate students, academia, technology professionals, startups, government and industry within a single regional platform — and to mobilize volunteers, manage speaker relationships and operate a multi-day event environment.',
      'Most importantly, it proved that a regional audience is ready for credible, future-focused programming when access is brought closer to them. FutureX 2026 is the next chapter of that work.',
    ],
    author: 'Thrive Pakistan',
    authorRole: 'Organizational editorial',
    date: '2026-07-20',
    readingTime: 3,
    views: 0,
    image: img('eventsA', 5),
    tags: ['Hazara Tech Fiesta', 'Previous Work', 'Mansehra'],
  },
];

export const BLOG_CATEGORIES = ['Organization', 'FutureX', 'Perspectives', 'Previous Work'] as const;
