export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

/** Primary navigation architecture (desktop dropdowns + mobile accordion). */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Events',
    to: '/events',
    children: [
      { label: 'Upcoming Events', to: '/events/upcoming' },
      { label: 'Past Events', to: '/events/past' },
    ],
  },
  { label: 'FutureX', to: '/futurex' },
  {
    label: 'Focus Areas',
    to: '/programs',
    children: [
      { label: 'Technology & Digital Skills', to: '/programs/technology-digital-skills' },
      { label: 'Entrepreneurship', to: '/programs/entrepreneurship' },
      { label: 'Industry Exposure', to: '/programs/industry-exposure' },
      { label: 'Education & Campus Engagement', to: '/programs/education-campus-engagement' },
      { label: 'Youth Development', to: '/programs/youth-development' },
      { label: 'Women & Female Participation', to: '/programs/women-participation' },
    ],
  },
  { label: 'Speakers', to: '/speakers' },
  {
    label: 'Media',
    children: [
      { label: 'Gallery', to: '/gallery' },
      { label: 'Videos', to: '/videos' },
      { label: 'Blog', to: '/blog' },
      { label: 'Stories', to: '/blog?category=Stories' },
    ],
  },
  {
    label: 'More',
    children: [
      { label: 'Team', to: '/team' },
      { label: 'Partners', to: '/partners' },
      { label: 'Volunteers', to: '/volunteer' },
      { label: 'Impact & Achievements', to: '/impact' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

/**
 * Official online presence. Social handles are NOT invented: only the
 * website and the handle printed in the organizational documents
 * (@ThrivePakistan) are listed.
 */
export const SOCIAL_LINKS = [
  { id: 'globe', label: 'Website', href: 'https://www.thrivepakistan.com' },
  { id: 'mail', label: 'Email', href: 'mailto:partnerships@thrivepakistan.com' },
] as const;
