/** Site-wide content: volunteer options, contact details, form option lists. */

import { CONTACT_EMAILS, CONTACT_PHONES, ORG } from './org';

export const VOLUNTEER_AREAS = [
  'Event Management',
  'Marketing',
  'Photography',
  'Social Media',
  'Community Management',
  'Registration Desk',
  'Technical Support',
] as const;

export const VOLUNTEER_BENEFITS = [
  { icon: 'badge', title: 'Hands-on Experience', text: 'Work inside live platforms — stages, registration, media, outreach and operations.' },
  { icon: 'users', title: 'Real Networks', text: 'Work alongside organizers, institutions, practitioners and peers from across the region.' },
  { icon: 'trend', title: 'Skill Growth', text: 'Operations, media and community roles with feedback from functional leads.' },
  { icon: 'door', title: 'Growth Pathways', text: 'Volunteer roles can progress into team leadership and longer-term responsibilities.' },
] as const;

/** Official contact channels — verified against the organizational documents. */
export const CONTACT_INFO = {
  email: CONTACT_EMAILS.partnerships,
  emailMarketing: CONTACT_EMAILS.marketing,
  emailMd: CONTACT_EMAILS.managingDirector,
  emailCeo: CONTACT_EMAILS.ceo,
  phoneMd: CONTACT_PHONES.managingDirector,
  phoneCeo: CONTACT_PHONES.ceo,
  website: ORG.website,
  social: ORG.socialHandle,
  base: 'Hazara, Khyber Pakhtunkhwa, Pakistan',
} as const;

export const SPEAKING_INTERESTS = [
  'AI and the future of work',
  'Cybersecurity, privacy and digital trust',
  'Digital entrepreneurship and freelancing',
  'Gender, opportunity and technology',
  'Education and industry collaboration',
  'Any FutureX 2026 platform',
] as const;

export const PARTNERSHIP_INTERESTS = [
  'Education & future-skills programming',
  'Technology, AI & innovation labs',
  'Career, recruitment & internship pathways',
  'Entrepreneurship & mentor support',
  'Media, outreach & production',
  'Not sure yet — let\u2019s talk',
] as const;

export const ORGANIZATION_TYPES = [
  'Technology Company',
  'University / Education',
  'Media Organization',
  'Corporate / Enterprise',
  'NGO / Social Sector',
  'Government / Public Sector',
  'Other',
] as const;
