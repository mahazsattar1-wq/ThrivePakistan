import type { Partner, PartnerTier } from '../types';

/**
 * MOCK DATA — fictional partner brands (no real company logos or marks).
 * Partner "logos" are rendered as generated typographic marks in the UI.
 */
export const PARTNERS: Partner[] = [
  { id: 'novatech', name: 'NovaTech', category: 'Technology', tier: 'Ecosystem Partner', blurb: 'Platform engineering & cloud infrastructure' },
  { id: 'vertex-labs', name: 'Vertex Labs', category: 'Technology', tier: 'Strategic Partner', blurb: 'Systems research & developer tools' },
  { id: 'greengrid', name: 'GreenGrid', category: 'Technology', tier: 'Community Partner', blurb: 'Climate tech & smart energy systems' },
  { id: 'orbitpay', name: 'OrbitPay', category: 'Corporate', tier: 'Strategic Partner', blurb: 'Digital payments & financial inclusion' },
  { id: 'futureworks', name: 'FutureWorks', category: 'Corporate', tier: 'Ecosystem Partner', blurb: 'Early-stage venture capital' },
  { id: 'edusphere', name: 'EduSphere', category: 'Education', tier: 'Ecosystem Partner', blurb: 'University network & learning platforms' },
  { id: 'campuslink', name: 'CampusLink', category: 'Education', tier: 'Community Partner', blurb: 'Student society & campus event platform' },
  { id: 'mediapulse', name: 'MediaPulse', category: 'Media', tier: 'Strategic Partner', blurb: 'Digital media & event broadcasting' },
  { id: 'daily-spark', name: 'The Daily Spark', category: 'Media', tier: 'Community Partner', blurb: 'Independent technology journalism' },
  { id: 'roshan-communities', name: 'Roshan Communities', category: 'Community', tier: 'Community Partner', blurb: 'Neighbourhood development networks' },
  { id: 'youthcircle', name: 'YouthCircle', category: 'Community', tier: 'Strategic Partner', blurb: 'National youth volunteering network' },
  { id: 'skyline-mobility', name: 'Skyline Mobility', category: 'Corporate', tier: 'Community Partner', blurb: 'Inter-city travel & event logistics' },
];

export const PARTNER_CATEGORIES = ['Technology', 'Education', 'Media', 'Corporate', 'Community'] as const;

/** Mock partnership tiers — no pricing published by design. */
export const PARTNER_TIERS: PartnerTier[] = [
  {
    id: 'community',
    name: 'Community Partner',
    description: 'For organizations embedding themselves in the community layer: societies, city chapters and cause networks.',
    benefits: ['Logo on event community wall', 'Volunteer pipeline access', 'Co-hosted city activities', 'Newsletter mentions'],
  },
  {
    id: 'strategic',
    name: 'Strategic Partner',
    description: 'For brands seeking sustained visibility and talent access across a season of Thrive platforms.',
    benefits: [
      'Branding across a season of events',
      'Speaking & panel slots',
      'Booth at flagship events',
      'Talent & internship desk access',
      'Co-branded content series',
    ],
    highlight: true,
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem Partner',
    description: 'For institutions co-building the ecosystem itself — programs, research, capital and national initiatives.',
    benefits: [
      'Named program partnership',
      'Advisory seat on program design',
      'Year-round executive access',
      'First look at new city launches',
      'Impact reporting & CSR narrative',
    ],
  },
];

export const PARTNER_BENEFITS = [
  { icon: 'eye', title: 'Brand Visibility', text: 'Stage, screen, signage and digital placement across a national event calendar.' },
  { icon: 'users', title: 'Audience Access', text: 'Direct, consented access to students, professionals and founders who show up.' },
  { icon: 'mic', title: 'Speaking Opportunities', text: 'Keynotes, panels and workshops that position your leaders as practitioners.' },
  { icon: 'badge', title: 'Event Branding', text: 'Category ownership — power a track, a lab or an award in your name.' },
  { icon: 'globe', title: 'Digital Exposure', text: 'Newsletter, video channel and social reach beyond the event floor.' },
  { icon: 'heart', title: 'Community Engagement', text: 'Volunteer programs and city chapters that carry your brand into communities.' },
  { icon: 'briefcase', title: 'Talent Access', text: 'Internship desks, hackathon hiring floors and portfolio clinics.' },
  { icon: 'bulb', title: 'Thought Leadership', text: 'Co-published research, playbooks and opinion platforms.' },
  { icon: 'leaf', title: 'CSR & Impact', text: 'Measurable impact stories for sustainability and CSR reporting.' },
] as const;
