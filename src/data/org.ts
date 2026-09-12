/**
 * ORGANIZATIONAL FACTS — verified source of truth.
 *
 * Everything in this file comes from the official Thrive Pakistan
 * Organizational Profile (August 2026) and the FutureX 2026 documents
 * provided by the organization. Do NOT add facts here that are not
 * confirmed by official Thrive Pakistan material.
 *
 * Rule: never fill a factual gap with an invented detail.
 */

export const ORG = {
  name: 'Thrive Pakistan',
  tagline: 'Talent exists everywhere. Opportunity does not.',
  motto: 'Build here. Think global. Together, we thrive.',
  founded: '2025',
  /** Verified organizational positioning (Organizational Profile, 2026). */
  description:
    'Thrive Pakistan is a youth-led technology and ecosystem-development platform based in Hazara, Khyber Pakhtunkhwa. It connects young people with the people, institutions and opportunities shaping Pakistan\u2019s digital economy.',
  shortDescription:
    'A youth-centered platform founded in 2025 that connects students and emerging talent with practical learning, technology, entrepreneurship, industry exposure, and meaningful opportunities, with particular relevance to Hazara and Khyber Pakhtunkhwa.',
  vision:
    'A Pakistan where a young person\u2019s location does not determine the quality of opportunity, exposure or professional network available to them.',
  mission:
    'To connect regional youth with technology, industry, entrepreneurship, finance, leadership and public institutions through platforms that produce practical learning and lasting relationships.',
  purpose:
    'To turn local potential into visible capability, and visible capability into education, employment, enterprise, leadership, and public value.',
  corePromise:
    'We create access with structure: the right people in the same room, the right experiences around them, and a pathway that continues after the event.',
  whyWeExist:
    'Students and early-career professionals in regional cities can have ambition and ability without regular access to mentors, employers, innovators, decision-makers and professional environments. Thrive Pakistan exists to help narrow that distance through programmes, convenings, collaborations, skills initiatives, and long-term ecosystem building.',
  website: 'https://www.thrivepakistan.com',
  socialHandle: '@ThrivePakistan',
} as const;

/** Official contact channels (Organizational Profile & FutureX documents). */
export const CONTACT_EMAILS = {
  partnerships: 'partnerships@thrivepakistan.com',
  marketing: 'marketing@thrivepakistan.com',
  managingDirector: 'faraz@thrivepakistan.com',
  ceo: 'hassan@thrivepakistan.com',
} as const;

/** Phone numbers printed in the official organizational documents. */
export const CONTACT_PHONES = {
  managingDirector: '+92 310 9453804',
  ceo: '+92 308 8489030',
} as const;

/**
 * Previous referenced work and ecosystem engagement. The organizational
 * profile presents these as examples of prior engagement — they are NOT
 * current partners and their inclusion implies no endorsement.
 */
export const PREVIOUS_WORK = [
  {
    id: 'hazara-tech-fiesta',
    title: 'Hazara Tech Fiesta 2025',
    detail:
      'Thrive Pakistan\u2019s documented public journey began with Hazara Tech Fiesta 2025 \u2014 a three-day regional technology festival.',
  },
  {
    id: 'gpgc-mansehra',
    title: 'Government Post Graduate College Mansehra',
    detail:
      'On 6 August 2026, Thrive Pakistan and Government Post Graduate College Mansehra signed a Memorandum of Collaboration, creating an institutional foundation for joint programming and the delivery of FutureX 2026.',
  },
  {
    id: 'metrix-youth-summit',
    title: 'Metrix Youth Summit (8th edition, Battagram)',
    detail:
      'The region\u2019s wider youth-platform ecosystem referenced in the organizational record includes the 8th edition of the Metrix Youth Summit in Battagram.',
  },
] as const;

/**
 * Ecosystem relationships and contributors named in the Organizational
 * Profile as examples of prior participation, collaboration or support.
 */
export const PRIOR_ECOSYSTEM_NAMES = [
  'Resecurity Pakistan',
  'Metrix Pakistan',
  'Innovista',
  'iSkills',
  'IT Team Pakistan',
  'Hazara University',
  'Government Post Graduate College Mansehra',
] as const;

export const PRIOR_ECOSYSTEM_NOTE =
  'Names are presented as examples of prior ecosystem engagement. Their inclusion does not imply a current endorsement of every Thrive Pakistan program.';
