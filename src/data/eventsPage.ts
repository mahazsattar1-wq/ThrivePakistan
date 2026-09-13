import { img } from '../media';
import type { ImageRef } from '../types';

export interface ProcessStepConfig {
  id: string;
  num: string;
  title: string;
  text: string;
  displayOrder: number;
}

export interface EventFormatItemConfig {
  id: string;
  title: string;
  icon: string;
  description: string;
  displayOrder: number;
}

export interface WhyEventsMatterPointConfig {
  id: string;
  icon: string;
  title: string;
  text: string;
  displayOrder: number;
}

export interface CategoryCardConfig {
  id: string;
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
  countLabelSingular: string;
  countLabelPlural: string;
  image: ImageRef;
}

export interface EventsPageConfig {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    metaDate: string;
    metaLocation: string;
  };
  categoriesSection: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  categories: {
    upcoming: CategoryCardConfig;
    past: CategoryCardConfig;
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: ProcessStepConfig[];
  };
  formats: {
    eyebrow: string;
    title: string;
    lead: string;
    items: EventFormatItemConfig[];
  };
  whyEventsMatter: {
    eyebrow: string;
    title: string;
    lead: string;
    points: WhyEventsMatterPointConfig[];
  };
  upcomingView: {
    eyebrow: string;
    title: string;
    lead: string;
    overviewCtaLabel: string;
    listingCountSingular: string;
    listingCountPlural: string;
    emptyTitle: string;
    emptyMessage: string;
    emptyCtaLabel: string;
  };
  pastView: {
    eyebrow: string;
    title: string;
    lead: string;
    overviewCtaLabel: string;
    listingCountSingular: string;
    listingCountPlural: string;
    emptyTitle: string;
    emptyMessage: string;
    emptyCtaLabel: string;
  };
  cardLabels: {
    viewEvent: string;
    viewGallery: string;
    statusUpcoming: string;
    statusPast: string;
  };
}

export const EVENTS_PAGE_CONFIG: EventsPageConfig = {
  hero: {
    eyebrow: 'Thrive Pakistan Events',
    title: 'Events That Connect People With Opportunity',
    lead: 'Thrive Pakistan creates platforms, convenings, and experiences that bring young people closer to knowledge, technology, industry, leadership, entrepreneurship, practical exposure, and meaningful networks across Hazara and Khyber Pakhtunkhwa.',
    metaDate: 'FutureX 2026 · 24 September 2026',
    metaLocation: 'Mansehra, Khyber Pakhtunkhwa',
  },
  categoriesSection: {
    eyebrow: 'Event Ecosystem',
    title: 'Explore Event Categories',
    lead: 'Browse Thrive Pakistan convenings through our scheduled platforms and documented past record.',
  },
  categories: {
    upcoming: {
      id: 'cat-upcoming',
      kicker: 'Scheduled Platforms',
      title: 'Upcoming Events',
      description: 'Confirmed platforms, festivals, and convenings scheduled and open for interest.',
      ctaLabel: 'View Upcoming Events',
      ctaTo: '/events/upcoming',
      countLabelSingular: 'scheduled platform',
      countLabelPlural: 'scheduled platforms',
      image: img('eventsA', 0),
    },
    past: {
      id: 'cat-past',
      kicker: 'Documented Record',
      title: 'Past Events',
      description: 'Completed events and regional technology festivals delivered by Thrive Pakistan.',
      ctaLabel: 'Explore Past Events',
      ctaTo: '/events/past',
      countLabelSingular: 'documented past platform',
      countLabelPlural: 'documented past platforms',
      image: img('eventsA', 5),
    },
  },
  process: {
    eyebrow: 'How We Conduct Our Events',
    title: 'More Than Just an Event',
    lead: 'How Thrive Pakistan approaches every platform to ensure meaningful engagement, practical learning, and lasting momentum.',
    steps: [
      {
        id: 'proc-01',
        num: '01',
        title: 'UNDERSTAND',
        text: 'Identify the audience, topic, need, and opportunity before designing any session or stage.',
        displayOrder: 1,
      },
      {
        id: 'proc-02',
        num: '02',
        title: 'CONNECT',
        text: 'Bring together students, young professionals, institutions, industry, mentors, speakers, and relevant stakeholders.',
        displayOrder: 2,
      },
      {
        id: 'proc-03',
        num: '03',
        title: 'LEARN',
        text: 'Create opportunities for practical learning, technology exposure, leadership development, entrepreneurship, and future skills.',
        displayOrder: 3,
      },
      {
        id: 'proc-04',
        num: '04',
        title: 'EXPERIENCE',
        text: 'Use keynotes, panels, workshops, seminars, demonstrations, exhibitions, and hackathons depending on the event format.',
        displayOrder: 4,
      },
      {
        id: 'proc-05',
        num: '05',
        title: 'BUILD',
        text: 'Help participants build knowledge, confidence, connections, and professional momentum that continue beyond the event itself.',
        displayOrder: 5,
      },
    ],
  },
  formats: {
    eyebrow: 'What We Organize',
    title: 'Event Formats & Experiences',
    lead: 'The range of platforms and convening formats Thrive Pakistan organizes across Hazara and northern Pakistan.',
    items: [
      {
        id: 'fmt-01',
        title: 'Technology Events',
        icon: 'chip',
        description: 'Platforms focusing on AI, software, cybersecurity, digital tools, and practical technical skills.',
        displayOrder: 1,
      },
      {
        id: 'fmt-02',
        title: 'University & Campus Engagement',
        icon: 'campus',
        description: 'Institutional convenings, campus talks, and bridges linking academic study with industry needs.',
        displayOrder: 2,
      },
      {
        id: 'fmt-03',
        title: 'Seminars & Masterclasses',
        icon: 'mic',
        description: 'Focused sessions delivered by experienced practitioners on technology, work, and leadership.',
        displayOrder: 3,
      },
      {
        id: 'fmt-04',
        title: 'Workshops & Practical Labs',
        icon: 'tools',
        description: 'Hands-on learning environments with live demonstrations, practical exercises, and interactive tools.',
        displayOrder: 4,
      },
      {
        id: 'fmt-05',
        title: 'Women Empowerment Initiatives',
        icon: 'women',
        description: 'Targeted participation and leadership initiatives for women in technology and enterprise.',
        displayOrder: 5,
      },
      {
        id: 'fmt-06',
        title: 'Leadership & Skills Development',
        icon: 'spark',
        description: 'Sessions focused on communication, critical thinking, problem solving, and team execution.',
        displayOrder: 6,
      },
      {
        id: 'fmt-07',
        title: 'Educational & Exposure Tours',
        icon: 'compass',
        description: 'Guided exposure visits connecting students with companies, technology hubs, and institutions.',
        displayOrder: 7,
      },
      {
        id: 'fmt-08',
        title: 'Youth Development Experiences',
        icon: 'users',
        description: 'Youth-led gatherings building community, volunteer leadership, and responsible ownership.',
        displayOrder: 8,
      },
      {
        id: 'fmt-09',
        title: 'Entrepreneurship & Digital Skills',
        icon: 'rocket',
        description: 'Startup showcases, pitch opportunities, freelancing pathways, and founder mentorship.',
        displayOrder: 9,
      },
    ],
  },
  whyEventsMatter: {
    eyebrow: 'Why Events Matter',
    title: 'Creating Access Beyond the Event',
    lead: 'Gathering people in one room is only the start. The true purpose of our events is creating access that changes trajectories.',
    points: [
      {
        id: 'point-01',
        icon: 'spark',
        title: 'Discover Opportunities',
        text: 'Uncover emerging possibilities in AI, digital work, entrepreneurship, and modern careers.',
        displayOrder: 1,
      },
      {
        id: 'point-02',
        icon: 'eye',
        title: 'Gain Exposure',
        text: 'See live demonstrations, real systems, and professional standards firsthand.',
        displayOrder: 2,
      },
      {
        id: 'point-03',
        icon: 'users',
        title: 'Meet Relevant People',
        text: 'Connect with mentors, recruiters, founders, educators, and like-minded peers.',
        displayOrder: 3,
      },
      {
        id: 'point-04',
        icon: 'mic',
        title: 'Learn from Practitioners',
        text: 'Hear directly from active professionals who build, hire, and lead in real industries.',
        displayOrder: 4,
      },
      {
        id: 'point-05',
        icon: 'tools',
        title: 'Develop Practical Skills',
        text: 'Participate in hands-on workshops, hackathons, and applied learning sessions.',
        displayOrder: 5,
      },
      {
        id: 'point-06',
        icon: 'badge',
        title: 'Build Confidence',
        text: 'Test ideas, present on stages, compete in challenges, and take on volunteer leadership.',
        displayOrder: 6,
      },
      {
        id: 'point-07',
        icon: 'globe',
        title: 'Connect with Ecosystems',
        text: 'Bridge the gap between regional campus communities and national innovation networks.',
        displayOrder: 7,
      },
    ],
  },
  upcomingView: {
    eyebrow: 'Scheduled Platforms',
    title: 'Upcoming Events',
    lead: 'Confirmed platforms and convenings scheduled and open for interest. Details are published as confirmed.',
    overviewCtaLabel: 'All Events Overview',
    listingCountSingular: 'upcoming platform scheduled',
    listingCountPlural: 'upcoming platforms scheduled',
    emptyTitle: 'No upcoming events at the moment.',
    emptyMessage: 'New platform dates and convenings will be announced here as details are confirmed. Explore our past events in the interim.',
    emptyCtaLabel: 'Explore Past Events',
  },
  pastView: {
    eyebrow: 'Documented Record',
    title: 'Past Events',
    lead: 'Completed events and regional technology festivals delivered by Thrive Pakistan. Our documented record reflects real experience and verified outcomes.',
    overviewCtaLabel: 'All Events Overview',
    listingCountSingular: 'past platform documented',
    listingCountPlural: 'past platforms documented',
    emptyTitle: 'No past events documented yet.',
    emptyMessage: 'Our documented public record will expand as new platforms are delivered.',
    emptyCtaLabel: 'View Upcoming Events',
  },
  cardLabels: {
    viewEvent: 'View Event',
    viewGallery: 'View Gallery',
    statusUpcoming: 'Upcoming',
    statusPast: 'Past',
  },
};
