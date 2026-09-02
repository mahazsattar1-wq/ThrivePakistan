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
      { label: 'Upcoming Events', to: '/events?status=upcoming' },
      { label: 'Past Events', to: '/events?status=past' },
      { label: 'FutureX 2026', to: '/events/futurex-2026' },
    ],
  },
  {
    label: 'Programs',
    to: '/programs',
    children: [
      { label: 'Technology & Innovation', to: '/programs/technology-innovation' },
      { label: 'Leadership', to: '/programs/leadership-development' },
      { label: 'Youth Empowerment', to: '/programs/youth-empowerment' },
      { label: 'Women Empowerment', to: '/programs/women-empowerment' },
      { label: 'University Programs', to: '/programs/university-engagement' },
      { label: 'Workshops', to: '/programs/training-experiences' },
      { label: 'Training & Tours', to: '/programs/leadership-tours' },
    ],
  },
  { label: 'FutureX', to: '/futurex' },
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

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com' },
] as const;
