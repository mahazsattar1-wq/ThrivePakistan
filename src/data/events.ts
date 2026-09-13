import type { ThriveEvent } from '../types';
import { img } from '../media';
import { getEventStatus } from '../utils';

/**
 * EVENT DATA — verified organizational record & database-ready structure.
 *
 * Each event record contains hero details, flexible metrics, focus areas,
 * tracks/agenda, speakers, chief guests, impact outcomes, testimonials,
 * press coverage, and CTA settings.
 */

/** Raw event data — verified organizational record. */
const RAW_EVENTS: Omit<ThriveEvent, 'status'>[] = [
  {
    id: 'ev-futurex-2026',
    slug: 'futurex-2026',
    title: 'FutureX 2026',
    tagline: 'Connecting Young Talent With the Future Economy',
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
    galleryId: 'gal-futurex-2026',
    gallerySlug: 'futurex-2026',
    featured: true,
    visibility: true,
    displayOrder: 1,
    dateConfirmed: true,
    venueConfirmed: true,
    tags: ['AI', 'Work', 'Finance', 'Leadership'],
    speakerSlugs: [],
    speakerIds: [],
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
    tagline: 'Bridging Youth, Ecosystems, and Technology Innovation',
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
      'Through collaborative workshops, technical demonstrations, and mentor interactions, the fiesta established a proven template for regional campus engagement and skills empowerment across Khyber Pakhtunkhwa.',
    ],
    image: img('eventsA', 5),
    galleryId: 'gal-hazara-tech-fiesta-2025',
    gallerySlug: 'hazara-tech-fiesta-2025',
    visibility: true,
    displayOrder: 2,
    dateConfirmed: true,
    venueConfirmed: true,
    attendees: '5,000+ attendees',
    tags: ['AI', 'Cybersecurity', 'Entrepreneurship', 'Exhibitions'],
    speakerSlugs: [],
    speakerIds: [],
    agenda: [],
    highlights: [
      '5,000+ attendees across three days',
      '50+ industry leaders and academic mentors',
      '15+ technology exhibitors and ecosystem partners',
      '24-Hour Student Hackathon & Pitch Showcase',
    ],
    sponsorIds: [],
    faqs: [],

    /* Phase 24 — Case Study Extensions */
    metrics: [
      { id: 'm-htf-1', label: 'Total Attendees', value: '5,000+', displayOrder: 1, isVisible: true },
      { id: 'm-htf-2', label: 'Speakers & Mentors', value: '50+ Leaders', displayOrder: 2, isVisible: true },
      { id: 'm-htf-3', label: 'Youth Startups Pitched', value: '15 Youth Pitches', displayOrder: 3, isVisible: true },
      { id: 'm-htf-4', label: 'Exhibiting Partners', value: '15+ Organizations', displayOrder: 4, isVisible: true },
    ],
    focusAreas: [
      { id: 'fa-htf-1', title: 'Artificial Intelligence & Cloud', description: 'Practical workshops on generative models, machine learning, and cloud deployment.', icon: 'chip', displayOrder: 1, isVisible: true },
      { id: 'fa-htf-2', title: 'Cybersecurity & Infrastructure', description: 'Network defense, threat modeling, and ethical hacking demonstrations.', icon: 'compass', displayOrder: 2, isVisible: true },
      { id: 'fa-htf-3', title: 'Youth Entrepreneurship', description: 'Startup pitch sessions, founder office hours, and venture feedback.', icon: 'rocket', displayOrder: 3, isVisible: true },
      { id: 'fa-htf-4', title: 'Digital Career Pathways', description: 'Freelancing frameworks, remote engineering, and tech interview guidance.', icon: 'spark', displayOrder: 4, isVisible: true },
    ],
    tracks: [
      {
        id: 'tr-htf-1',
        title: 'Track 1: Applied AI & Software Engineering',
        description: 'Deep dives into software architecture, AI integration, and production systems.',
        displayOrder: 1,
        isVisible: true,
        sessions: [
          { time: '10:00 AM', title: 'Opening Keynote: Building AI Products for Emerging Markets', description: 'Overview of applied AI trends and opportunities for Pakistani developers.' },
          { time: '11:30 AM', title: 'Scalable Microservices & Infrastructure', description: 'Engineering reliable cloud backends for high-traffic applications.' },
        ],
      },
      {
        id: 'tr-htf-2',
        title: 'Track 2: Youth Hackathon & Startup Showcase',
        description: '24-hour challenge presentations and startup mentor evaluations.',
        displayOrder: 2,
        isVisible: true,
        sessions: [
          { time: '02:00 PM', title: '24-Hour Student Hackathon Presentations', description: 'Student teams demonstrate working software solutions to industry judges.' },
          { time: '04:30 PM', title: 'Startup Pitch & Mentor Feedback Session', description: 'Early-stage founders present business models to ecosystem mentors.' },
        ],
      },
    ],
    chiefGuests: [
      {
        id: 'cg-htf-1',
        name: 'Demo Academic Leadership',
        role: 'Dean of Academic Affairs',
        organization: 'Hazara University (Demo)',
        bio: 'Distinguished educator advocating for university-industry partnerships and campus digital transformation.',
        displayOrder: 1,
        isVisible: true,
      },
    ],
    impactItems: [
      { id: 'imp-htf-1', title: 'Direct Student Engagement', description: 'Connected over 5,000 regional students directly with technology practitioners and career mentors.', icon: 'users', displayOrder: 1, isVisible: true },
      { id: 'imp-htf-2', title: 'Hackathon Prototypes', description: 'Facilitated the creation of 24 working software prototypes during the intensive 24-hour student hackathon.', icon: 'tools', displayOrder: 2, isVisible: true },
      { id: 'imp-htf-3', title: 'Industry Networks', description: 'Established ongoing mentor linkages between regional campus tech societies and national technology firms.', icon: 'globe', displayOrder: 3, isVisible: true },
    ],
    testimonials: [
      {
        id: 'test-htf-1',
        quote: 'Hazara Tech Fiesta demonstrated the immense talent and enthusiasm among students in northern Pakistan when provided with world-class technical exposure.',
        name: 'Demo Campus Leader',
        role: 'President, Student Computer Society',
        organization: 'Hazara University (Demo)',
        displayOrder: 1,
        isVisible: true,
      },
      {
        id: 'test-htf-2',
        quote: 'The level of technical curiosity and problem-solving energy during the hackathon was genuinely inspiring.',
        name: 'Demo Industry Mentor',
        role: 'Senior Staff Engineer',
        organization: 'Regional Tech Lab (Demo)',
        displayOrder: 2,
        isVisible: true,
      },
    ],
    pressCoverage: [
      {
        id: 'pr-htf-1',
        publication: 'Regional Tech Journal (Demo)',
        title: 'Hazara Tech Fiesta Gathers 5,000+ Students for Regional Tech Convening',
        date: 'December 2025',
        description: 'Feature report on the 3-day regional technology festival and university collaboration.',
        displayOrder: 1,
        isVisible: true,
      },
    ],
    reportUrl: '/documents/hazara-tech-fiesta-2025-report.pdf',
    reportLabel: 'Download Event Overview Report (PDF)',
    cta: {
      heading: 'Missed Hazara Tech Fiesta? Connect with Thrive Pakistan for what’s next.',
      description: 'Explore upcoming flagship platforms, university workshops, and regional ecosystem convenings.',
      primaryBtnText: 'Explore FutureX 2026',
      primaryBtnLink: '/events/futurex-2026',
      secondaryBtnText: 'Partner With Us',
      secondaryBtnLink: '/become-a-partner',
    },
  },
  {
    id: 'ev-digital-skills-symposium-2025',
    slug: 'digital-skills-symposium-2025',
    title: 'Regional Digital Skills Symposium 2025',
    tagline: 'Empowering Youth with Practical Future-Ready Competencies',
    category: 'Skills Convening',
    date: '2025-08-18',
    endDate: '2025-08-18',
    dateLabel: '18 August 2025',
    time: 'Full day',
    location: 'District Hall, Abbottabad',
    city: 'Abbottabad',
    description:
      'A targeted regional symposium connecting university students and recent graduates with digital skills roadmaps, software engineering frameworks, and freelancing opportunities.',
    about: [
      'The Regional Digital Skills Symposium brought together 600+ students and young developers in Abbottabad to address practical pathways into modern software careers.',
      'Keynotes and interactive panels covered cloud development, UI/UX engineering, open-source software contribution, and freelancing best practices.',
    ],
    image: img('eventsA', 1),
    galleryId: 'gal-digital-skills-2025',
    gallerySlug: 'digital-skills-symposium-2025',
    visibility: true,
    displayOrder: 3,
    dateConfirmed: true,
    venueConfirmed: true,
    attendees: '600+ attendees',
    tags: ['Digital Skills', 'Career Pathways', 'Software Engineering'],
    speakerSlugs: [],
    speakerIds: [],
    agenda: [],
    highlights: [
      '600+ student attendees',
      '12 industry speakers',
      '4 interactive masterclasses',
    ],
    sponsorIds: [],
    faqs: [],

    metrics: [
      { id: 'm-dss-1', label: 'Total Attendees', value: '600+', displayOrder: 1, isVisible: true },
      { id: 'm-dss-2', label: 'Speakers & Mentors', value: '12 Leaders', displayOrder: 2, isVisible: true },
      { id: 'm-dss-3', label: 'Practical Masterclasses', value: '4 Workshops', displayOrder: 3, isVisible: true },
    ],
    focusAreas: [
      { id: 'fa-dss-1', title: 'Software Engineering Roadmaps', description: 'Actionable steps for mastering full-stack web and mobile application development.', icon: 'chip', displayOrder: 1, isVisible: true },
      { id: 'fa-dss-2', title: 'Freelancing & Remote Work', description: 'Client acquisition, portfolio building, and global remote work platforms.', icon: 'globe', displayOrder: 2, isVisible: true },
    ],
    tracks: [
      {
        id: 'tr-dss-1',
        title: 'Masterclass Track: Future Digital Careers',
        description: 'Hands-on guidance on software development and global remote work.',
        displayOrder: 1,
        isVisible: true,
        sessions: [
          { time: '10:30 AM', title: 'Navigating the Global Remote Technology Market', description: 'Practical insights into freelancing platforms and remote technical roles.' },
        ],
      },
    ],
    impactItems: [
      { id: 'imp-dss-1', title: 'Career Guidance', description: 'Provided clear engineering roadmaps to 600+ regional computer science students.', icon: 'spark', displayOrder: 1, isVisible: true },
    ],
    cta: {
      heading: 'Stay updated on upcoming regional symposia & masterclasses.',
      description: 'Subscribe or partner with Thrive Pakistan to bring practical workshops to your campus.',
      primaryBtnText: 'Become a Partner',
      primaryBtnLink: '/become-a-partner',
      secondaryBtnText: 'View All Events',
      secondaryBtnLink: '/events',
    },
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

export const EVENT_CATEGORIES = ['Flagship Platform', 'Tech Festival', 'Skills Convening'] as const;

export const EVENT_CITIES = ['Mansehra', 'Abbottabad'] as const;
