import { build } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const entry = `
  import { EVENTS } from '${join(root, 'src/data/events.ts')}';
  import { isEventUpcoming, getEventStatus, getEventEndDate } from '${join(root, 'src/utils.ts')}';
  import { NAV_ITEMS } from '${join(root, 'src/nav.ts')}';
  import { eventsService } from '${join(root, 'src/services/eventsService.ts')}';
  export { EVENTS, isEventUpcoming, getEventStatus, getEventEndDate, NAV_ITEMS, eventsService };
`;

const outDir = mkdtempSync(join(tmpdir(), 'tp-events-test-'));
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

const { EVENTS, isEventUpcoming, getEventStatus, getEventEndDate, NAV_ITEMS, eventsService } =
  await import(pathToFileURL(outFile));

let failures = 0;
const check = (name, cond, detail = '') => {
  console.log(`${cond ? '  PASS' : '✗ FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures += 1;
};

console.log('\n--- Phase 7 Events Architecture Tests ---');

// 1. Navigation structure
console.log('\n1. Header Navigation');
const futurexTopNav = NAV_ITEMS.find((item) => item.label === 'FutureX');
check('Top-level FutureX nav item removed', futurexTopNav === undefined);

const eventsNav = NAV_ITEMS.find((item) => item.label === 'Events');
const eventsSubmenu = eventsNav?.children ?? [];
check(
  'Events dropdown has exactly Upcoming and Past',
  JSON.stringify(eventsSubmenu.map((c) => c.label)) === JSON.stringify(['Upcoming Events', 'Past Events']),
  eventsSubmenu.map((c) => c.label).join(', '),
);
const futurexSubNav = eventsSubmenu.find((c) => c.label.includes('FutureX'));
check('No standalone FutureX subnav link', futurexSubNav === undefined);

// 2. Data single source of truth
console.log('\n2. Single Event Data Source');
const futureXEvents = EVENTS.filter((e) => e.slug === 'futurex-2026');
check('Exactly one FutureX 2026 event in data', futureXEvents.length === 1);
const futureX = futureXEvents[0];
check('FutureX 2026 preserves title and date', futureX?.title === 'FutureX 2026' && futureX?.date === '2026-09-24');
check('FutureX 2026 venue is confirmed', futureX?.location === 'Government Post Graduate College, Mansehra');

// 3. Dynamic Date Logic (Before Event)
console.log('\n3. Automatic Status — Before Event Date (e.g. 2026-09-11)');
const simulatedNowBefore = new Date('2026-09-11T12:00:00Z');
check('FutureX 2026 is UPCOMING before event date', isEventUpcoming(futureX, simulatedNowBefore) === true);
check('FutureX 2026 getEventStatus returns upcoming', getEventStatus(futureX, simulatedNowBefore) === 'upcoming');

// 4. Dynamic Date Logic (After Event)
console.log('\n4. Automatic Status — After Event Date (e.g. 2026-09-25)');
const simulatedNowAfter = new Date('2026-09-25T00:00:01Z');
check('FutureX 2026 is NOT upcoming after event date', isEventUpcoming(futureX, simulatedNowAfter) === false);
check('FutureX 2026 getEventStatus returns past', getEventStatus(futureX, simulatedNowAfter) === 'past');

// 5. Multi-day event handling
console.log('\n5. Multi-day Event Handling (Hazara Tech Fiesta 2025)');
const htf = EVENTS.find((e) => e.slug === 'hazara-tech-fiesta-2025');
check('HTF 2025 has end date 2025-12-14', htf?.endDate === '2025-12-14');
const htfDuring = new Date('2025-12-13T15:00:00Z');
check('HTF 2025 is UPCOMING during event window (Dec 13)', isEventUpcoming(htf, htfDuring) === true);
const htfAfter = new Date('2025-12-15T01:00:00Z');
check('HTF 2025 is PAST after end date (Dec 15)', isEventUpcoming(htf, htfAfter) === false);

// 6. Ordering logic
console.log('\n6. Event Ordering Logic');
const upcomingList = await eventsService.list({ status: 'upcoming' });
check('Upcoming events returned', upcomingList.length > 0);
const isAscending = upcomingList.every((ev, idx) => {
  if (idx === 0) return true;
  return +new Date(ev.date) >= +new Date(upcomingList[idx - 1].date);
});
check('Upcoming events sorted by nearest date first', isAscending);

const pastList = await eventsService.list({ status: 'past' });
check('Past events returned', pastList.length > 0);
const isDescending = pastList.every((ev, idx) => {
  if (idx === 0) return true;
  return +getEventEndDate(ev) <= +getEventEndDate(pastList[idx - 1]);
});
check('Past events sorted by most recently completed first', isDescending);

console.log(failures === 0 ? '\nAll Phase 7 events logic tests passed cleanly!\n' : `\n${failures} test(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
