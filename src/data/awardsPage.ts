/**
 * AWARDS PAGE CONFIGURATION — 100% database/admin-ready content configuration.
 *
 * All page headings, hero leads, category section headers, button copy,
 * empty states, and CTA band copy live here.
 */

export const AWARDS_PAGE_CONFIG = {
  hero: {
    eyebrow: 'Recognition & Impact',
    title: 'Thrive Pakistan Awards',
    lead: 'Recognizing emerging innovators, leaders, founders, and contributors driving technological, social, and economic progress across Pakistan.',
  },
  badges: {
    openNominations: 'Open for Nominations',
    annualRecognition: 'Annual Recognition',
    winner: 'Award Winner',
  },
  cardLabels: {
    viewAward: 'View Award Details',
    exploreCategory: 'Explore Category',
    winnersCount: (count: number) => `${count} winners recognized`,
    categoryAwardsCount: (count: number) => `${count} awards in category`,
    allCategories: 'All Award Categories',
  },
  sections: {
    aboutHeadingDefault: 'About the Award',
    eligibilityHeadingDefault: 'Who is Eligible?',
    highlightsHeadingDefault: 'What We Recognize',
    winnersHeadingDefault: 'Previous Winners',
  },
  filters: {
    allCategories: 'All Categories',
    allYears: 'All Years',
  },
  adminWorkflowMock: {
    addCategoryTitle: 'Add Award Category',
    addAwardTitle: 'Add Award',
    addWinnerTitle: 'Add Winner',
    selectCategoryLabel: 'Select Category',
    selectAwardLabel: 'Select Award',
    selectYearLabel: 'Select Year',
    winnerPhotoLabel: 'Winner Photo (Separate from Gallery)',
  },
  emptyStates: {
    noAwards: {
      title: 'No Awards Found',
      message: 'No award entries are currently published for this category.',
    },
    noWinners: {
      title: 'No Winners Published Yet',
      message: 'Winners for this award have not been published yet. Official announcements and selection criteria will be updated as nominations conclude.',
    },
  },
  ctaBand: {
    title: 'Know an innovator who deserves recognition?',
    lead: 'Submit a nomination or connect our awards committee with emerging leaders in your institution or region.',
    primaryBtn: 'Nominate an Innovator',
    primaryLink: '/contact',
    secondaryBtn: 'Explore Focus Areas',
    secondaryLink: '/programs',
  },
};
