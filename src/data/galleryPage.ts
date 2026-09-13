/**
 * GALLERY PAGE CONFIGURATION — 100% database/admin-ready content configuration.
 *
 * All page headings, section headers, badges, button copy, empty states,
 * and CTA band copy live here. When a backend/admin panel is attached,
 * these fields map directly to `site_settings` / `gallery_page_copy` tables.
 */

export const GALLERY_PAGE_CONFIG = {
  hero: {
    eyebrow: 'Central Main Gallery',
    title: 'Platform Media Archive',
    lead: 'Explore visual moments, photo collections, and video films across Thrive Pakistan flagship platforms, tech festivals, and community convenings.',
    collectionEyebrow: 'Gallery Collection',
  },
  badges: {
    eventGallery: 'Event Gallery',
    randomGallery: 'Random Gallery',
    allMedia: 'All Media',
    photos: 'Photos',
    videos: 'Videos',
    videoFilm: 'Video Film',
  },
  cardLabels: {
    viewGallery: 'View Gallery',
    photosCount: (count: number) => `${count} photos`,
    videosCount: (count: number) => `${count} videos`,
    itemsCount: (count: number) => `${count} items`,
    associatedEvent: 'Associated Event',
    viewEvent: 'View Event',
    allCollections: 'All Gallery Collections',
  },
  filters: {
    all: 'All Collections',
    eventGalleries: 'Event Galleries',
    randomGalleries: 'Random Galleries',
  },
  videoNotice: {
    badge: 'Video Film',
    title: 'Official Video Film Preview',
    message: 'Official video films are published on YouTube as platform media is finalized. When a YouTube link is attached, clicking takes you directly to YouTube.',
    watchBtn: 'Watch on YouTube',
    comingSoonBtn: 'YouTube Link Coming Soon',
  },
  adminWorkflowMock: {
    addGalleryTitle: 'Add Gallery',
    typeSelectLabel: 'Gallery Type',
    typeEventOption: 'Event Gallery',
    typeRandomOption: 'Random Gallery',
    selectEventLabel: 'Select Event',
    aboutHeadingLabel: 'About Gallery Heading',
    aboutDescriptionLabel: 'About Gallery Description',
  },
  emptyStates: {
    noCollections: {
      title: 'No gallery collections available yet.',
      message: 'New photo and video collections will appear as upcoming platforms are delivered.',
    },
    noMedia: {
      title: 'No media items in this collection yet.',
      message: 'Photos and video films are added as event media is processed by our communications team.',
      actionLabel: 'All Gallery Collections',
    },
    notFound: {
      title: 'Gallery Collection Not Found',
      message: 'The requested gallery collection could not be found or may have been moved.',
      actionLabel: 'Back to Central Gallery',
    },
    noEventGallery: {
      title: 'No Gallery for this Event Yet',
      message: 'Media for this event will be published after processing. Explore our central gallery in the meantime.',
      actionLabel: 'Browse All Galleries',
    },
  },
  ctaBand: {
    title: 'Want your lens on our stages?',
    lead: 'The media volunteer team shoots every flagship platform and convening across the region.',
    primaryBtn: 'Volunteer with Media',
    primaryLink: '/volunteer',
    secondaryBtn: 'Watch Video Films',
    secondaryLink: '/videos',
  },
};
