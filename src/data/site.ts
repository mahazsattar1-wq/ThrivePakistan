/** Site-wide mock content: volunteer roles, contact details, FAQ defaults. */

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
  { icon: 'badge', title: 'Certified Experience', text: 'Verified volunteer certificates and reference letters for every event cycle.' },
  { icon: 'users', title: 'National Network', text: '300+ volunteers across 10 cities — friends, mentors and future colleagues.' },
  { icon: 'trend', title: 'Skill Growth', text: 'Real operations, media and community roles with practitioner feedback.' },
  { icon: 'door', title: 'First Access', text: 'Early passes, backstage access and priority for paid event roles.' },
] as const;

export const CONTACT_INFO = {
  email: 'hello@thrivepakistan.example',
  phone: '+92 300 000 0000',
  address: 'Thrive Pakistan House, Street 12, F-7 Markaz, Islamabad, Pakistan',
  hours: 'Monday – Saturday, 10:00 – 18:00 (PKT)',
} as const;

export const SPEAKING_INTERESTS = [
  'FutureX 2026',
  'Thrive Leadership Summit 2026',
  'Women Thrive 2026',
  'Campus Innovation Tour',
  'Youth Skills Workshop',
  'Any Thrive platform',
] as const;

export const PARTNERSHIP_INTERESTS = [
  'Community Partner',
  'Strategic Partner',
  'Ecosystem Partner',
  'Not sure yet — let\'s talk',
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
