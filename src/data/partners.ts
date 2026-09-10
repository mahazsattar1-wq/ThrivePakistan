import type { Partner } from '../types';

/**
 * PARTNER DATA.
 *
 * Thrive Pakistan has no confirmed current partners to display, so the
 * partner wall is intentionally empty. Organizations named in the
 * organizational documents appear on the Partners page only as text
 * references to *previous* ecosystem engagement — never as logo marks or
 * current partnerships.
 *
 * Partnership models below describe how organizations CAN collaborate —
 * they are propositions drawn from the organizational profile, not
 * claimed existing agreements.
 */
export const PARTNERS: Partner[] = [];

/**
 * Ways organizations can engage with Thrive Pakistan — grounded in the
 * "why work with us: partners & sponsors" sections of the organizational
 * profile.
 */
export const ENGAGEMENT_MODELS = [
  {
    id: 'education',
    name: 'Education & Future Skills',
    text: 'Co-develop education and future-skills programming with institutions — from campus collaborations to practical learning experiences.',
  },
  {
    id: 'labs',
    name: 'Technology & Innovation Labs',
    text: 'Support AI, cybersecurity and innovation labs, demonstrations and challenges where technology meets learners.',
  },
  {
    id: 'careers',
    name: 'Careers & Recruitment',
    text: 'Connect with regional talent through career pathways, internships, employer interaction and portfolio exposure.',
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship & Mentors',
    text: 'Back founders and innovators with mentor support, startup showcases and practical entrepreneurship programming.',
  },
  {
    id: 'inclusion',
    name: 'Financial Literacy & Inclusion',
    text: 'Partner on financial literacy, fintech awareness and inclusion programming for young people entering the digital economy.',
  },
  {
    id: 'media',
    name: 'Media & Outreach',
    text: 'Collaborate on media, outreach, production and community initiatives that extend the reach of regional platforms.',
  },
] as const;

/**
 * What collaboration with Thrive Pakistan offers — paraphrased from the
 * organizational profile (partners & sponsors sections).
 */
export const COLLABORATION_VALUES = [
  {
    icon: 'users',
    title: 'A credible regional network',
    text: 'Reach a locally rooted youth and innovation network in Hazara and northern Pakistan.',
  },
  {
    icon: 'target',
    title: 'Purposeful activation',
    text: 'Every collaboration is designed to create a meaningful role, activation or outcome — not simply another logo.',
  },
  {
    icon: 'briefcase',
    title: 'Talent access',
    text: 'A trusted route to students, graduates and emerging professionals, ideas and communities.',
  },
  {
    icon: 'shield',
    title: 'Ownership & follow-through',
    text: 'Clearer coordination, documentation and post-programme follow-up, with accountable ownership.',
  },
] as const;
