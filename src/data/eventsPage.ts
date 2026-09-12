import { img } from '../media';

export interface ProcessStep {
  num: string;
  title: string;
  text: string;
}

export interface EventFormatItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface WhyEventsMatterPoint {
  icon: string;
  title: string;
  text: string;
}

export interface EventsPageConfig {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  categories: {
    upcoming: {
      kicker: string;
      title: string;
      description: string;
      ctaLabel: string;
      ctaTo: string;
      image: ReturnType<typeof img>;
    };
    past: {
      kicker: string;
      title: string;
      description: string;
      ctaLabel: string;
      ctaTo: string;
      image: ReturnType<typeof img>;
    };
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: ProcessStep[];
  };
  formats: {
    eyebrow: string;
    title: string;
    lead: string;
    items: EventFormatItem[];
  };
  whyEventsMatter: {
    eyebrow: string;
    title: string;
    lead: string;
    points: WhyEventsMatterPoint[];
  };
  previousWorkSection: {
    eyebrow: string;
    title: string;
    lead: string;
  };
}

export const EVENTS_PAGE_CONFIG: EventsPageConfig = {
  hero: {
    eyebrow: 'Thrive Pakistan Events',
    title: 'Events That Connect People With Opportunity',
    lead: 'Thrive Pakistan creates platforms, convenings, and experiences that bring young people closer to knowledge, technology, industry, leadership, entrepreneurship, practical exposure, and meaningful networks across Hazara and Khyber Pakhtunkhwa.',
  },
  categories: {
    upcoming: {
      kicker: 'Scheduled Platforms',
      title: 'Upcoming Events',
      description: 'Confirmed platforms, festivals, and convenings scheduled and open for interest.',
      ctaLabel: 'View Upcoming Events',
      ctaTo: '/events/upcoming',
      image: img('eventsA', 0),
    },
    past: {
      kicker: 'Documented Record',
      title: 'Past Events',
      description: 'Completed events and regional technology festivals delivered by Thrive Pakistan.',
      ctaLabel: 'Explore Past Events',
      ctaTo: '/events/past',
      image: img('eventsA', 5),
    },
  },
  process: {
    eyebrow: 'How We Conduct Our Events',
    title: 'More Than Just an Event',
    lead: 'How Thrive Pakistan approaches every platform to ensure meaningful engagement, practical learning, and lasting momentum.',
    steps: [
      {
        num: '01',
        title: 'UNDERSTAND',
        text: 'Identify the audience, topic, need, and opportunity before designing any session or stage.',
      },
      {
        num: '02',
        title: 'CONNECT',
        text: 'Bring together students, young professionals, institutions, industry, mentors, speakers, and relevant stakeholders.',
      },
      {
        num: '03',
        title: 'LEARN',
        text: 'Create opportunities for practical learning, technology exposure, leadership development, entrepreneurship, and future skills.',
      },
      {
        num: '04',
        title: 'EXPERIENCE',
        text: 'Use keynotes, panels, workshops, seminars, demonstrations, exhibitions, and hackathons depending on the event format.',
      },
      {
        num: '05',
        title: 'BUILD',
        text: 'Help participants build knowledge, confidence, connections, and professional momentum that continue beyond the event itself.',
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
      },
      {
        id: 'fmt-02',
        title: 'University & Campus Engagement',
        icon: 'campus',
        description: 'Institutional convenings, campus talks, and bridges linking academic study with industry needs.',
      },
      {
        id: 'fmt-03',
        title: 'Seminars & Masterclasses',
        icon: 'mic',
        description: 'Focused sessions delivered by experienced practitioners on technology, work, and leadership.',
      },
      {
        id: 'fmt-04',
        title: 'Workshops & Practical Labs',
        icon: 'tools',
        description: 'Hands-on learning environments with live demonstrations, practical exercises, and interactive tools.',
      },
      {
        id: 'fmt-05',
        title: 'Women Empowerment Initiatives',
        icon: 'women',
        description: 'Targeted participation and leadership initiatives for women in technology and enterprise.',
      },
      {
        id: 'fmt-06',
        title: 'Leadership & Skills Development',
        icon: 'spark',
        description: 'Sessions focused on communication, critical thinking, problem solving, and team execution.',
      },
      {
        id: 'fmt-07',
        title: 'Educational & Exposure Tours',
        icon: 'compass',
        description: 'Guided exposure visits connecting students with companies, technology hubs, and institutions.',
      },
      {
        id: 'fmt-08',
        title: 'Youth Development Experiences',
        icon: 'users',
        description: 'Youth-led gatherings building community, volunteer leadership, and responsible ownership.',
      },
      {
        id: 'fmt-09',
        title: 'Entrepreneurship & Digital Skills',
        icon: 'rocket',
        description: 'Startup showcases, pitch opportunities, freelancing pathways, and founder mentorship.',
      },
    ],
  },
  whyEventsMatter: {
    eyebrow: 'Why Events Matter',
    title: 'Creating Access Beyond the Event',
    lead: 'Gathering people in one room is only the start. The true purpose of our events is creating access that changes trajectories.',
    points: [
      {
        icon: 'spark',
        title: 'Discover Opportunities',
        text: 'Uncover emerging possibilities in AI, digital work, entrepreneurship, and modern careers.',
      },
      {
        icon: 'eye',
        title: 'Gain Exposure',
        text: 'See live demonstrations, real systems, and professional standards firsthand.',
      },
      {
        icon: 'users',
        title: 'Meet Relevant People',
        text: 'Connect with mentors, recruiters, founders, educators, and like-minded peers.',
      },
      {
        icon: 'mic',
        title: 'Learn from Practitioners',
        text: 'Hear directly from active professionals who build, hire, and lead in real industries.',
      },
      {
        icon: 'tools',
        title: 'Develop Practical Skills',
        text: 'Participate in hands-on workshops, hackathons, and applied learning sessions.',
      },
      {
        icon: 'badge',
        title: 'Build Confidence',
        text: 'Test ideas, present on stages, compete in challenges, and take on volunteer leadership.',
      },
      {
        icon: 'globe',
        title: 'Connect with Ecosystems',
        text: 'Bridge the gap between regional campus communities and national innovation networks.',
      },
    ],
  },
  previousWorkSection: {
    eyebrow: 'Documented Previous Work',
    title: 'Where the Journey Began',
    lead: 'Verified past work and ecosystem engagement documented in our organizational record.',
  },
};
