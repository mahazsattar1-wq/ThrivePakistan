import type { Program } from '../types';
import { img } from '../media';

/**
 * FOCUS AREAS — what Thrive Pakistan works on.
 *
 * Each focus area includes a detailed explanation of why it matters,
 * key focus points, youth opportunities & outcomes, Thrive Pakistan's contributions,
 * and stable event IDs linking to related convenings.
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
    eventSlugs: ['futurex-2026', 'hazara-tech-fiesta-2025', 'digital-skills-symposium-2025'],
    relatedEventIds: ['ev-futurex-2026', 'ev-hazara-tech-fiesta-2025', 'ev-digital-skills-symposium-2025'],

    whyThisMatters:
      'In an economy shaped by artificial intelligence, cloud computing, and cybersecurity, technical literacy is essential. Young people in regional cities need practical exposure to emerging software tools, ethical AI workflows, and systems engineering to remain competitive in national and global talent markets.',
    focusPoints: [
      {
        title: 'Applied Artificial Intelligence',
        description: 'Understanding generative AI models, machine learning fundamentals, and practical workflow integration.',
      },
      {
        title: 'Cybersecurity & Digital Trust',
        description: 'Promoting threat awareness, network security basics, and privacy engineering.',
      },
      {
        title: 'Modern Software Engineering',
        description: 'Cloud infrastructure, full-stack frameworks, and scalable development best practices.',
      },
    ],
    opportunities: [
      {
        title: 'Hands-On Technical Exposure',
        description: 'Gain direct experience through technical demonstrations, interactive labs, and masterclasses.',
      },
      {
        title: 'Career Roadmap Awareness',
        description: 'Learn about emerging remote engineering roles, technical interview standards, and career pathways.',
      },
    ],
    howThriveContributes:
      'Thrive Pakistan organizes technical workshops, AI labs, and developer convenings across Khyber Pakhtunkhwa, putting young builders directly in touch with practicing software engineers.',
    displayOrder: 1,
    isVisible: true,
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
    eventSlugs: ['futurex-2026', 'hazara-tech-fiesta-2025'],
    relatedEventIds: ['ev-futurex-2026', 'ev-hazara-tech-fiesta-2025'],

    whyThisMatters:
      'Regional talent possesses immense creative potential but often lacks access to startup mentorship, pitch exposure, and business validation. Fostering digital entrepreneurship and freelancing pathways empowers young founders to build viable ventures and local job opportunities.',
    focusPoints: [
      {
        title: 'Digital Venture Creation',
        description: 'Transitioning from software project ideas to scalable digital business models.',
      },
      {
        title: 'Freelancing & Remote Work',
        description: 'Client acquisition, portfolio presentation, and international remote contracting.',
      },
      {
        title: 'Pitch Readiness & Mentorship',
        description: 'Structuring business decks, financial forecasting, and pitch presentations.',
      },
    ],
    opportunities: [
      {
        title: 'Founder Mentorship',
        description: 'Connect with active startup founders, venture advisors, and industry mentors.',
      },
      {
        title: 'Stage & Showcase Access',
        description: 'Test, refine, and present startup prototypes in front of ecosystem audiences.',
      },
    ],
    howThriveContributes:
      'Thrive Pakistan creates startup zones, hackathons, and pitch platforms at flagship convenings, giving student entrepreneurs a stage to showcase working prototypes.',
    displayOrder: 2,
    isVisible: true,
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
    eventSlugs: ['futurex-2026', 'hazara-tech-fiesta-2025'],
    relatedEventIds: ['ev-futurex-2026', 'ev-hazara-tech-fiesta-2025'],

    whyThisMatters:
      'A major hurdle for regional graduates is the exposure gap—completing academic programs without ever meeting recruiters or practicing professionals. Direct industry exposure bridges classroom theory with real-world expectations and professional networks.',
    focusPoints: [
      {
        title: 'Recruiter & Employer Dialogue',
        description: 'Direct conversations with technology hiring managers and talent leads.',
      },
      {
        title: 'Live System Demonstrations',
        description: 'Seeing production architecture, devops pipelines, and real industry tools in action.',
      },
      {
        title: 'Professional Network Building',
        description: 'Building long-term professional connections beyond academic campuses.',
      },
    ],
    opportunities: [
      {
        title: 'Employer Connections',
        description: 'Interact directly with talent teams seeking technical and creative skills.',
      },
      {
        title: 'Real-World Expectations',
        description: 'Understand industry standards, communication requirements, and hiring criteria.',
      },
    ],
    howThriveContributes:
      'Thrive Pakistan brings employers, founders, and technical leads onto campus stages and career hubs, facilitating structured introductions.',
    displayOrder: 3,
    isVisible: true,
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
    relatedEventIds: ['ev-hazara-tech-fiesta-2025', 'ev-futurex-2026'],

    whyThisMatters:
      'Academic institutions are the heartbeat of regional youth talent. Connecting campus societies, faculty, and student organizers with industry initiatives creates sustainable talent pipelines and active learning communities.',
    focusPoints: [
      {
        title: 'Institutional Collaborations',
        description: 'Formal partnerships with colleges and universities to host joint technical convenings.',
      },
      {
        title: 'Campus Society Empowerment',
        description: 'Supporting student-led computer societies and organizing committees.',
      },
      {
        title: 'Applied Learning Drives',
        description: 'Bridging university curricula with practical coding challenges and hackathons.',
      },
    ],
    opportunities: [
      {
        title: 'Campus Organizer Leadership',
        description: 'Lead student tech societies, coordinate regional hackathons, and build campus networks.',
      },
      {
        title: 'Academic-Industry Bridge',
        description: 'Participate in university-hosted technology festivals and institutional challenges.',
      },
    ],
    howThriveContributes:
      'Thrive Pakistan works directly under formal Memoranda of Collaboration with regional educational institutions, empowering student committees to run campus platforms.',
    displayOrder: 4,
    isVisible: true,
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
    eventSlugs: ['futurex-2026', 'hazara-tech-fiesta-2025'],
    relatedEventIds: ['ev-futurex-2026', 'ev-hazara-tech-fiesta-2025'],

    whyThisMatters:
      'Capability develops through structured responsibility. Providing young people with genuine organizing roles, volunteer leadership, and platform responsibilities builds confidence, critical thinking, and civic ownership.',
    focusPoints: [
      {
        title: 'Volunteer Leadership Roles',
        description: 'Managing event operations, media production, delegate registration, and stage logistics.',
      },
      {
        title: 'Team Execution & Ownership',
        description: 'Learning project management, problem-solving, and communication under real deadlines.',
      },
      {
        title: 'Community & Peer Support',
        description: 'Fostering collaborative spirit and peer mentoring across regional youth networks.',
      },
    ],
    opportunities: [
      {
        title: 'Practical Leadership Experience',
        description: 'Take on real operational roles in multi-day regional convenings and platforms.',
      },
      {
        title: 'Personal & Professional Growth',
        description: 'Develop communication skills, public presentation experience, and team accountability.',
      },
    ],
    howThriveContributes:
      'Thrive Pakistan is youth-led by design, entrusting student organizing committees and volunteer teams with major operational responsibilities.',
    displayOrder: 5,
    isVisible: true,
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
    relatedEventIds: ['ev-futurex-2026'],

    whyThisMatters:
      'Meaningful inclusion requires intentional strategy and dedicated leadership pathways. Expanding access for female students and emerging women technologists enriches the entire regional innovation ecosystem.',
    focusPoints: [
      {
        title: 'Female Tech Leadership',
        description: 'Highlighting female engineers, researchers, and directors as stage speakers and role models.',
      },
      {
        title: 'Targeted Skill Workshops',
        description: 'Organizing supportive learning environments for female students in software and STEM.',
      },
      {
        title: 'Mentorship & Career Pathways',
        description: 'Connecting young women with experienced female practitioners and industry allies.',
      },
    ],
    opportunities: [
      {
        title: 'Visible Role Models & Mentors',
        description: 'Hear from and connect with successful female technology directors and founders.',
      },
      {
        title: 'Leadership Representation',
        description: 'Step into active leadership roles in platform planning and campus outreach.',
      },
    ],
    howThriveContributes:
      'Thrive Pakistan maintains a dedicated functional leadership role, Director Female Affairs, ensuring female participation and leadership across all platforms.',
    displayOrder: 6,
    isVisible: true,
  },
];
