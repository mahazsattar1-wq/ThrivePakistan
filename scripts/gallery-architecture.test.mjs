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
  export { EVENTS, GALLERY_COLLECTIONS, GALLERY_MEDIA, GALLERY_PAGE_CONFIG, eventsService, galleryService };
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

const { EVENTS, GALLERY_COLLECTIONS, GALLERY_MEDIA, GALLERY_PAGE_CONFIG, eventsService, galleryService } =
  await import(pathToFileURL(outFile));

let failures = 0;
const check = (name, cond, detail = '') => {
  console.log(`${cond ? '  PASS' : '✗ FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures += 1;
};

console.log('\n--- Phase 19 Event & Gallery Architecture Tests ---\n');

// Part 1: Event Identity & Single Source of Truth
console.log('1. Event Identity & Single Source of Truth');
check('All events have stable string IDs', EVENTS.every((e) => typeof e.id === 'string' && e.id.length > 0));
const eventIds = EVENTS.map((e) => e.id);
const uniqueEventIds = new Set(eventIds);
check('ONE EVENT = ONE EVENT RECORD (no duplicate IDs)', eventIds.length === uniqueEventIds.size);

// Part 2: Upcoming & Past Events
console.log('\n2. Upcoming and Past Events Architecture');
const upcomingEvents = await eventsService.upcoming();
const pastEvents = await eventsService.past();
check('Upcoming events returned dynamically', upcomingEvents.length > 0);
check('Past events returned dynamically', pastEvents.length > 0);
check('FutureX 2026 is an upcoming event', upcomingEvents.some((e) => e.slug === 'futurex-2026'));

// Part 3 & 7: Event -> Gallery Relationship via Stable ID
console.log('\n3. Event -> Gallery Relationship via Stable ID');
const futurexEvent = EVENTS.find((e) => e.slug === 'futurex-2026');
check('FutureX 2026 event has galleryId assigned', futurexEvent?.galleryId === 'gal-futurex-2026');

const futurexGallery = await eventsService.getGalleryForEvent(futurexEvent.id);
check('eventsService.getGalleryForEvent resolves gallery by ID', futurexGallery?.id === 'gal-futurex-2026');
check('Gallery links back to event via eventId', futurexGallery?.eventId === futurexEvent.id);

// Part 4, 5, 6, 8: Central Gallery Collections & Types
console.log('\n4. Central Gallery Collections & Type Architecture');
const collections = await galleryService.listCollections();
check('Gallery collections loaded from single source of truth', collections.length >= 3);

const eventGalleries = collections.filter((c) => c.type === 'event_gallery');
check('Event galleries exist and reference event.id', eventGalleries.every((c) => Boolean(c.eventId)));

const randomClicksGallery = collections.find((c) => c.type === 'random_clicks');
check('Random Clicks gallery exists', randomClicksGallery !== undefined);
check('Random Clicks has NO event relationship (eventId is null)', randomClicksGallery?.eventId === null);

// Part 9, 10, 11: Gallery Media Sources (Upload vs YouTube image & YouTube video)
console.log('\n5. Gallery Media & Source Options');
check('Media items exist in GALLERY_MEDIA', GALLERY_MEDIA.length > 0);

const imageMediaUpload = GALLERY_MEDIA.find((m) => m.type === 'image' && m.imageSourceType === 'upload');
check('Image media supports direct upload / sprite reference', imageMediaUpload !== undefined && Boolean(imageMediaUpload.image));

const imageMediaYoutube = GALLERY_MEDIA.find((m) => m.type === 'image' && m.imageSourceType === 'youtube');
check('Image media supports YouTube image source', imageMediaYoutube !== undefined && Boolean(imageMediaYoutube.imageSource));

const videoMedia = GALLERY_MEDIA.find((m) => m.type === 'video');
check('Video media uses YouTube URL', videoMedia !== undefined && typeof videoMedia.youtubeUrl === 'string' && videoMedia.youtubeUrl.includes('youtube'));

// Part 12, 13, 14: Visibility, Display Order & Dynamic Resolution
console.log('\n6. Dynamic Resolution, Display Order & Visibility');
const fxMedia = await galleryService.getMediaForCollection('gal-futurex-2026');
check('getMediaForCollection returns media items sorted by displayOrder', fxMedia.length > 0);
const isSorted = fxMedia.every((m, idx) => idx === 0 || m.displayOrder >= fxMedia[idx - 1].displayOrder);
check('Media items respect displayOrder', isSorted);

// Part 18: Database Copy Configuration
console.log('\n7. Database/Admin Copy Readiness');
check('GALLERY_PAGE_CONFIG hero title exists', typeof GALLERY_PAGE_CONFIG.hero.title === 'string');
check('GALLERY_PAGE_CONFIG empty states exist', typeof GALLERY_PAGE_CONFIG.emptyStates.notFound.title === 'string');

console.log(failures === 0 ? '\nAll Phase 19 Event & Gallery tests passed cleanly!\n' : `\n${failures} test(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
