import { build } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const entry = `
  import { EVENTS } from '${join(root, 'src/data/events.ts')}';
  import { GALLERY_COLLECTIONS, GALLERY_MEDIA } from '${join(root, 'src/data/gallery.ts')}';
  import { GALLERY_PAGE_CONFIG } from '${join(root, 'src/data/galleryPage.ts')}';
  import { eventsService } from '${join(root, 'src/services/eventsService.ts')}';
  import { galleryService } from '${join(root, 'src/services/galleryService.ts')}';
  import { getYouTubeThumbnailUrl } from '${join(root, 'src/pages/Gallery.tsx')}';
  export { EVENTS, GALLERY_COLLECTIONS, GALLERY_MEDIA, GALLERY_PAGE_CONFIG, eventsService, galleryService, getYouTubeThumbnailUrl };
`;

const outDir = mkdtempSync(join(tmpdir(), 'tp-gallery-test-'));
const outFile = join(outDir, 'bundle.mjs');
await build({
  stdin: { contents: entry, resolveDir: root, loader: 'ts' },
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: outFile,
  logLevel: 'silent',
  loader: { '.jpeg': 'empty', '.jpg': 'empty', '.png': 'empty', '.avif': 'empty', '.webp': 'empty' },
});

const { EVENTS, GALLERY_COLLECTIONS, GALLERY_MEDIA, GALLERY_PAGE_CONFIG, eventsService, galleryService, getYouTubeThumbnailUrl } =
  await import(pathToFileURL(outFile));

let failures = 0;
const check = (name, cond, detail = '') => {
  console.log(`${cond ? '  PASS' : '✗ FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures += 1;
};

console.log('\n--- Phase 21 Final Gallery Album & Event Architecture Tests ---\n');

// 1. Event Identity & Single Source of Truth
console.log('1. Event Identity & Single Source of Truth');
check('All events have stable string IDs', EVENTS.every((e) => typeof e.id === 'string' && e.id.length > 0));
const eventIds = EVENTS.map((e) => e.id);
const uniqueEventIds = new Set(eventIds);
check('ONE EVENT = ONE EVENT RECORD (no duplicate IDs)', eventIds.length === uniqueEventIds.size);

// 2. Upcoming and Past Events Architecture
console.log('\n2. Upcoming and Past Events Architecture');
const upcomingEvents = await eventsService.upcoming();
const pastEvents = await eventsService.past();
check('Upcoming events returned dynamically', upcomingEvents.length > 0);
check('Past events returned dynamically', pastEvents.length > 0);
check('FutureX 2026 is an upcoming event', upcomingEvents.some((e) => e.slug === 'futurex-2026'));

// 3. Event -> Gallery Relationship via Stable ID
console.log('\n3. Event -> Gallery Relationship via Stable ID');
const futurexEvent = EVENTS.find((e) => e.slug === 'futurex-2026');
check('FutureX 2026 event has galleryId assigned', futurexEvent?.galleryId === 'gal-futurex-2026');

const futurexGallery = await eventsService.getGalleryForEvent(futurexEvent.id);
check('eventsService.getGalleryForEvent resolves gallery by ID', futurexGallery?.id === 'gal-futurex-2026');
check('Gallery links back to event via eventId', futurexGallery?.eventId === futurexEvent.id);

// 4. Central Gallery Collections & Unlimited Random Albums
console.log('\n4. Central Gallery Collections & Unlimited Random Albums');
const collections = await galleryService.listCollections();
check('Gallery collections loaded from single source of truth', collections.length >= 4);

const eventGalleries = collections.filter((c) => c.type === 'event' || c.type === 'event_gallery');
check('Event galleries exist and reference event.id', eventGalleries.every((c) => Boolean(c.eventId)));

const randomGalleries = collections.filter((c) => c.type === 'random' || c.type === 'random_clicks');
check('Multiple independent random galleries exist', randomGalleries.length >= 2);
check('All random galleries have NO event relationship (eventId is null)', randomGalleries.every((c) => c.eventId === null));

// 5. Gallery Specific About Section
console.log('\n5. Gallery Specific About Section');
check('Every gallery has its own aboutHeading', collections.every((c) => typeof c.aboutHeading === 'string' && c.aboutHeading.length > 0));
check('Every gallery has its own aboutDescription', collections.every((c) => typeof c.aboutDescription === 'string' && c.aboutDescription.length > 0));

// 6. Media Items & Captions
console.log('\n6. Gallery Media & Captions');
check('Media items exist in GALLERY_MEDIA', GALLERY_MEDIA.length > 0);
check('Every media item possesses an individual caption string', GALLERY_MEDIA.every((m) => typeof m.caption === 'string' && m.caption.length > 0));

// 7. Video Rules (No real YouTube URLs in mock data)
console.log('\n7. Video Rules & Mock State');
const realYouTubeLinks = GALLERY_MEDIA.filter(
  (m) => typeof m.youtubeUrl === 'string' && m.youtubeUrl.length > 0,
);
check('No real YouTube video URLs in mock data', realYouTubeLinks.length === 0);

const videoMedia = GALLERY_MEDIA.filter((m) => m.type === 'video');
check('Mock video items have youtubeUrl === null (or empty)', videoMedia.every((m) => m.youtubeUrl === null || m.youtubeUrl === undefined));

// 8. YouTube Thumbnail Helper
console.log('\n8. YouTube Thumbnail Helper');
check('getYouTubeThumbnailUrl derives correct thumbnail', getYouTubeThumbnailUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ') === 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
check('getYouTubeThumbnailUrl handles null', getYouTubeThumbnailUrl(null) === null);

// 9. Database Copy Readiness
console.log('\n9. Database Copy Readiness');
check('GALLERY_PAGE_CONFIG videoNotice exists', typeof GALLERY_PAGE_CONFIG.videoNotice.title === 'string');
check('GALLERY_PAGE_CONFIG adminWorkflowMock exists', typeof GALLERY_PAGE_CONFIG.adminWorkflowMock.addGalleryTitle === 'string');

console.log(failures === 0 ? '\nAll Phase 21 Event & Gallery architecture tests passed cleanly!\n' : `\n${failures} test(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
