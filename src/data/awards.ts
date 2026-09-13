import type { Award, AwardCategory, AwardWinner } from '../types';
import { img } from '../media';

/**
 * AWARDS DATA — 100% dynamic, database/admin-ready award records.
 *
 * Categories, individual awards, eligibility criteria, and winner records live here.
 * Note: Real award names and winners are being finalized by the organization.
 * The entries below represent temporary demo categories and mock winners to demonstrate
 * the frontend architecture.
 *
 * Winner photos belong exclusively to the AwardWinner record and do NOT appear in Gallery.
 */

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: 'cat-tech',
    slug: 'technology',
    name: 'Technology',
    description: 'Recognizing emerging software engineers, AI practitioners, cybersecurity contributors, and digital builders.',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'cat-women',
    slug: 'women',
    name: 'Women in Tech & Leadership',
    description: 'Celebrating women leaders, founders, researchers, and mentors driving technological and social impact.',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'cat-youth',
    slug: 'youth',
    name: 'Youth & Campus Leadership',
    description: 'Honoring student leaders, campus ambassadors, and young innovators fostering regional tech communities.',
    displayOrder: 3,
    isVisible: true,
  },
  {
    id: 'cat-entrepreneurship',
    slug: 'entrepreneurship',
    name: 'Entrepreneurship',
    description: 'Recognizing early-stage founders, startup creators, and business catalysts building scalable ventures.',
    displayOrder: 4,
    isVisible: true,
  },
  {
    id: 'cat-innovation',
    slug: 'innovation',
    name: 'Applied Innovation',
    description: 'Celebrating research, open-source projects, applied AI, and technical problem-solving for regional needs.',
    displayOrder: 5,
    isVisible: true,
  },
  {
    id: 'cat-community',
    slug: 'community-impact',
    name: 'Community Impact',
    description: 'Honoring ecosystem builders, volunteers, and public sector partners supporting digital talent growth.',
    displayOrder: 6,
    isVisible: true,
  },
];

export const AWARDS: Award[] = [
  // Technology
  {
    id: 'award-emerging-tech-leader',
    categoryId: 'cat-tech',
    slug: 'emerging-technology-leader-award',
    title: 'Emerging Technology Leader Award (Demo)',
    categoryName: 'Technology',
    description: 'Recognizing outstanding early-career software engineers, system architects, and technical contributors driving digital transformation.',
    coverImage: img('mediaA', 0),
    aboutHeading: 'About the Award',
    aboutDescription: [
      'The Emerging Technology Leader Award recognizes young developers, engineers, and technical creators across Pakistan who demonstrate exceptional technical competence, leadership, and contribution to software development, artificial intelligence, or infrastructure.',
      'Thrive Pakistan celebrates individuals who not only build technical solutions but actively share knowledge, mentor peers, and contribute to open technology ecosystems.',
    ],
    eligibility: {
      heading: 'Who is Eligible?',
      description: 'Eligible for young technology professionals, engineers, researchers, and open-source contributors based in or originating from Pakistan.',
      criteria: [
        'Demonstrated technical achievement in software, AI, cybersecurity, or cloud infrastructure',
        'Fewer than 10 years of professional technology experience',
        'Proven track record of knowledge sharing, open-source contributions, or community mentoring',
        'Active participation in regional or national technology initiatives',
      ],
    },
    highlights: [
      'Excellence in applied engineering and technical execution',
      'Knowledge sharing and peer technical mentorship',
      'Positive contribution to Pakistan’s digital ecosystem',
    ],
    status: 'Annual Recognition',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'award-digital-innovation',
    categoryId: 'cat-tech',
    slug: 'digital-innovation-award',
    title: 'Digital Innovation Award (Demo)',
    categoryName: 'Technology',
    description: 'Honoring breakthrough digital products, applications, and platforms addressing practical regional challenges.',
    coverImage: img('eventsA', 0),
    aboutHeading: 'About the Award',
    aboutDescription: 'Celebrating creators of digital products and platforms that demonstrate tangible innovation, user accessibility, and measurable regional impact.',
    eligibility: {
      heading: 'Who is Eligible?',
      description: 'Eligible for product creators, software teams, and tech founders who have launched digital solutions serving Pakistani users or industries.',
      criteria: [
        'Original digital product, application, or platform',
        'Demonstrated user adoption and practical problem-solving capability',
        'High standards of software design, accessibility, and reliability',
      ],
    },
    highlights: [
      'Originality and technical architecture',
      'Practical utility for Pakistani institutions and communities',
    ],
    status: 'Annual Recognition',
    displayOrder: 2,
    isVisible: true,
  },

  // Women
  {
    id: 'award-women-tech-leader',
    categoryId: 'cat-women',
    slug: 'women-in-technology-award',
    title: 'Women in Technology Award (Demo)',
    categoryName: 'Women in Tech & Leadership',
    description: 'Celebrating women software engineers, researchers, founders, and tech leaders creating career pathways and inspiring female participation.',
    coverImage: img('galleryA', 2),
    aboutHeading: 'About the Award',
    aboutDescription: 'The Women in Technology Award honors female technologists and leaders who excel in technical fields while actively expanding opportunities for women in STEM across Pakistan.',
    eligibility: {
      heading: 'Who is Eligible?',
      description: 'Eligible for female developers, data scientists, researchers, product managers, and technology founders.',
      criteria: [
        'Significant professional achievement in technology or engineering',
        'Advocacy for female inclusion in STEM and digital careers',
        'Mentorship of emerging female tech talent in universities or industry',
      ],
    },
    highlights: [
      'Technical leadership and innovation',
      'Mentorship and pathway creation for women in technology',
    ],
    status: 'Annual Recognition',
    displayOrder: 1,
    isVisible: true,
  },

  // Youth
  {
    id: 'award-youth-innovation',
    categoryId: 'cat-youth',
    slug: 'youth-campus-innovation-award',
    title: 'Youth Campus Innovation Award (Demo)',
    categoryName: 'Youth & Campus Leadership',
    description: 'Honoring university students and campus leaders organizing hackathons, tech clubs, and peer learning networks.',
    coverImage: img('eventsA', 5),
    aboutHeading: 'About the Award',
    aboutDescription: 'Recognizing student catalysts who build thriving technology communities on university campuses across Khyber Pakhtunkhwa and broader regions.',
    eligibility: {
      heading: 'Who is Eligible?',
      description: 'Eligible for currently enrolled university students or recent graduates who lead campus technology initiatives.',
      criteria: [
        'Active leadership of a student tech society, coding club, or ambassador network',
        'Successful execution of campus workshops, hackathons, or learning drives',
        'Demonstrated commitment to peer empowerment',
      ],
    },
    highlights: [
      'Campus leadership and community building',
      'Peer mentorship and technical workshop organizing',
    ],
    status: 'Annual Recognition',
    displayOrder: 1,
    isVisible: true,
  },

  // Entrepreneurship
  {
    id: 'award-startup-catalyst',
    categoryId: 'cat-entrepreneurship',
    slug: 'startup-catalyst-award',
    title: 'Startup Catalyst Award (Demo)',
    categoryName: 'Entrepreneurship',
    description: 'Celebrating early-stage founders and incubator leaders building resilient tech ventures in regional hubs.',
    coverImage: img('mediaA', 2),
    aboutHeading: 'About the Award',
    aboutDescription: 'Honoring founders and ecosystem enablers who build sustainable business models and generate employment for local tech talent.',
    eligibility: {
      heading: 'Who is Eligible?',
      description: 'Eligible for early-stage startup founders, incubator directors, and angel mentors based in Pakistan.',
      criteria: [
        'Founder or key executive of a technology-driven startup venture',
        'Demonstrated market traction, revenue growth, or investment capital',
        'Local job creation and technical skill development',
      ],
    },
    highlights: [
      'Entrepreneurial resilience and execution',
      'Ecosystem impact and local talent hiring',
    ],
    status: 'Annual Recognition',
    displayOrder: 1,
    isVisible: true,
  },
];

export const AWARD_WINNERS: AwardWinner[] = [
  // Emerging Technology Leader Award winners
  {
    id: 'winner-2026-tech-01',
    awardId: 'award-emerging-tech-leader',
    year: 2026,
    name: 'Demo Technology Innovator A',
    designation: 'Lead AI Engineer',
    organization: 'Regional Tech Lab (Demo)',
    bio: 'Recognized for pioneering applied computer vision research and open-source machine learning models for local agricultural monitoring.',
    photo: img('galleryA', 0),
    caption: 'Demo Winner — 2026 Emerging Technology Leader Award',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'winner-2026-tech-02',
    awardId: 'award-emerging-tech-leader',
    year: 2026,
    name: 'Demo Systems Engineer B',
    designation: 'Senior Infrastructure Architect',
    organization: 'FinTech Solutions (Demo)',
    bio: 'Recognized for engineering high-concurrency payment gateway infrastructure supporting regional small businesses.',
    photo: img('galleryA', 3),
    caption: 'Demo Co-Winner — 2026 Emerging Technology Leader Award',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'winner-2025-tech-01',
    awardId: 'award-emerging-tech-leader',
    year: 2025,
    name: 'Demo Software Developer C',
    designation: 'Full Stack Engineer',
    organization: 'Digital Services (Demo)',
    bio: 'Recognized for launching open-source web frameworks adopted by over 2,000 regional university students.',
    photo: img('mediaA', 4),
    caption: 'Demo Winner — 2025 Emerging Technology Leader Award',
    displayOrder: 1,
    isVisible: true,
  },

  // Women in Technology Award winners
  {
    id: 'winner-2026-women-01',
    awardId: 'award-women-tech-leader',
    year: 2026,
    name: 'Ayesha Khan (Demo Winner)',
    designation: 'Director of Engineering',
    organization: 'Women in Code Network (Demo)',
    bio: 'Recognized for establishing coding bootcamps that trained over 500 female computer science students across Khyber Pakhtunkhwa.',
    photo: img('galleryA', 2),
    caption: 'Demo Winner — 2026 Women in Technology Award',
    displayOrder: 1,
    isVisible: true,
  },

  // Youth Campus Innovation Award winners
  {
    id: 'winner-2026-youth-01',
    awardId: 'award-youth-innovation',
    year: 2026,
    name: 'Demo Student Leader D',
    designation: 'President, Computer Society',
    organization: 'Hazara University (Demo)',
    bio: 'Recognized for organizing Hazara Tech Fiesta student hackathons and technical bootcamps for 1,000+ attendees.',
    photo: img('eventsA', 5),
    caption: 'Demo Winner — 2026 Youth Campus Innovation Award',
    displayOrder: 1,
    isVisible: true,
  },
];
