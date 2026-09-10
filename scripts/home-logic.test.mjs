/**
 * Homepage dynamic-logic tests — scenarios A–F from the Phase 5 brief.
 *
 * Runs the real data modules (not copies) through esbuild and asserts the
 * business rules in Node. Zero new dependencies (esbuild ships with vite).
 *
 *   node scripts/home-logic.test.mjs
 */
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// esbuild resolves plain absolute fs paths (file:// URLs are not module specifiers)
const entry = `
  import { EVENTS } from '${join(root, 'src/data/events.ts')}';
  import { getFeaturedUpcomingEvent } from '${join(root, 'src/data/home.ts')}';
  import { LEADERSHIP_MESSAGES, getPublishedMessages, parseMessage } from '${join(root, 'src/data/leadershipMessages.ts')}';
  export { EVENTS, getFeaturedUpcomingEvent, LEADERSHIP_MESSAGES, getPublishedMessages, parseMessage };
`;

const outDir = mkdtempSync(join(tmpdir(), 'tp-home-test-'));
const outFile = join(outDir, 'bundle.mjs');
await build({
  stdin: { contents: entry, resolveDir: root, loader: 'ts' },
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: outFile,
  logLevel: 'silent',
  // Image assets (real photographs / brand files) are bundled by Vite, not by
  // this test — stub them so the pure logic modules can run in Node.
  loader: { '.jpeg': 'empty', '.jpg': 'empty', '.png': 'empty' },
});

const { EVENTS, getFeaturedUpcomingEvent, LEADERSHIP_MESSAGES, getPublishedMessages, parseMessage } =
  await import(pathToFileURL(outFile));

let failures = 0;
const check = (name, cond, detail = '') => {
  console.log(`${cond ? '  PASS' : '✗ FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures += 1;
};

const slugOf = (m) => m.personId;

/* ---------- Scenario A ---------- */
console.log('\nScenario A — one confirmed upcoming FutureX event exists');
const featured = getFeaturedUpcomingEvent(EVENTS);
check('featured event appears', !!featured && featured.slug === 'futurex-2026', featured?.slug);
check('date is the verified date', featured?.date === '2026-09-24', featured?.date);
check('venue confirmed flag set', featured?.venueConfirmed === true);

/* ---------- Scenario B ---------- */
console.log('\nScenario B — no confirmed upcoming event');
const unpublishedDate = EVENTS.map((e) =>
  e.slug === 'futurex-2026' ? { ...e, dateConfirmed: false } : e,
);
check('no event is featured', getFeaturedUpcomingEvent(unpublishedDate) === undefined);
check('no event from empty list', getFeaturedUpcomingEvent([]) === undefined);
const pastOnly = EVENTS.map((e) => ({ ...e, status: 'past' }));
check('no event when all past', getFeaturedUpcomingEvent(pastOnly) === undefined);

/* ---------- Scenario C ---------- */
console.log('\nScenario C — orders CEO=1, MD=2 (COO has no approved copy yet)');
const defaultOrder = getPublishedMessages();
check(
  'order is CEO → MD',
  JSON.stringify(defaultOrder.map(slugOf)) ===
    JSON.stringify(['hassan-sajjad-khan', 'faraz-khan-sulemani']),
  defaultOrder.map(slugOf).join(' → '),
);
check('displayOrder drives the order', defaultOrder.map((m) => m.displayOrder).join(',') === '1,2');
check('COO (no approved copy) is hidden', !defaultOrder.some((m) => m.id === 'lm-coo'));

/* ---------- Scenario D ---------- */
console.log('\nScenario D — reordered CEO=3, MD=1, COO=2 (data change only)');
const reordered = LEADERSHIP_MESSAGES.map((m) => ({
  ...m,
  published: true,
  displayOrder: { lmceo: 3, lmmd: 1, lmcoo: 2 }[m.id.replace('-', '')] ?? m.displayOrder,
}));
const newOrder = getPublishedMessages(reordered);
check(
  'order becomes MD → COO → CEO',
  JSON.stringify(newOrder.map(slugOf)) ===
    JSON.stringify(['faraz-khan-sulemani', 'ibrahim-fiaz', 'hassan-sajjad-khan']),
  newOrder.map(slugOf).join(' → '),
);

/* ---------- Scenario E ---------- */
console.log('\nScenario E — one message unpublished');
const withUnpublished = LEADERSHIP_MESSAGES.map((m) => ({
  ...m,
  published: m.id === 'lm-md' ? false : true,
}));
const filtered = getPublishedMessages(withUnpublished);
check('unpublished message hidden', filtered.length === 2 && !filtered.some((m) => m.id === 'lm-md'));
check('remaining order preserved', filtered.map((m) => m.displayOrder).join(',') === '1,3');

/* ---------- Scenario F ---------- */
console.log('\nScenario F — only one message exists');
const single = getPublishedMessages([LEADERSHIP_MESSAGES[0]]);
check('single message returned', single.length === 1);
check('single message is the CEO', slugOf(single[0]) === 'hassan-sajjad-khan');

/* ---------- Scenario G — approved CEO/MD copy, photographs, uniqueness ---------- */
console.log('\nScenario G — approved CEO/MD messages and real photographs');

// Verbatim copy supplied by Thrive Pakistan — the test guards it word for word.
const EXPECTED_CEO_MESSAGE = [
  'Thrive Pakistan was built on a simple belief: young people should not have to leave their region to find serious opportunities.',
  'We are creating platforms that bring industry, technology, leadership, and real-world exposure closer to the people who are ready to grow. Our work is about opening doors, building stronger networks, and giving regional talent a place in conversations that usually happen somewhere else.',
  'We want the next generation to think bigger, move faster, and build with confidence.',
  'Hassan Sajjad',
  'CEO, Thrive Pakistan',
].join('\n\n');

const EXPECTED_MD_MESSAGE = [
  'At Thrive Pakistan, we believe talent should never be limited by geography.',
  'Our mission is to connect young people with the ideas, networks, technology, and opportunities they need to move forward. Through platforms like FutureX 2026, we are bringing national and global conversations closer to Hazara and Khyber Pakhtunkhwa.',
  'We are not just organizing events. We are building access, connections, and momentum for the next generation.',
  'Faraz Khan Sulemani',
  'Managing Director, Thrive Pakistan',
].join('\n\n');

const ceoEntries = LEADERSHIP_MESSAGES.filter((m) => m.personId === 'hassan-sajjad-khan');
const mdEntries = LEADERSHIP_MESSAGES.filter((m) => m.personId === 'faraz-khan-sulemani');
const ceoEntry = ceoEntries[0];
const mdEntry = mdEntries[0];

check('exactly one CEO entry', ceoEntries.length === 1, `${ceoEntries.length} found`);
check('exactly one MD entry', mdEntries.length === 1, `${mdEntries.length} found`);
check('CEO displayOrder is 1', ceoEntry?.displayOrder === 1);
check('MD displayOrder is 2', mdEntry?.displayOrder === 2);
check('CEO is published', ceoEntry?.published === true);
check('MD is published', mdEntry?.published === true);
check('CEO copy is approved (not placeholder)', ceoEntry?.isPlaceholderCopy === false);
check('MD copy is approved (not placeholder)', mdEntry?.isPlaceholderCopy === false);
check('no placeholder copy is published', defaultOrder.every((m) => m.isPlaceholderCopy !== true));

check('CEO message is verbatim', ceoEntry?.message === EXPECTED_CEO_MESSAGE);
check('MD message is verbatim', mdEntry?.message === EXPECTED_MD_MESSAGE);
check(
  'CEO formatting preserves the text',
  parseMessage(ceoEntry?.message ?? '')
    .map((b) => b.text)
    .join('\n\n') === EXPECTED_CEO_MESSAGE,
);
check(
  'MD formatting preserves the text',
  parseMessage(mdEntry?.message ?? '')
    .map((b) => b.text)
    .join('\n\n') === EXPECTED_MD_MESSAGE,
);

check('CEO name/role as specified', ceoEntry?.name === 'Hassan Sajjad' && ceoEntry?.role === 'CEO, Thrive Pakistan');
check(
  'MD name/role as specified',
  mdEntry?.name === 'Faraz Khan Sulemani' && mdEntry?.role === 'Managing Director, Thrive Pakistan',
);
check('CEO uses the real repository photograph', ceoEntry?.image?.photo === 'hassan-sajjad');
check('MD uses the real repository photograph', mdEntry?.image?.photo === 'faraz-khan-sulemani');
check('photographs are not swapped', ceoEntry?.image?.photo !== mdEntry?.image?.photo);
check('CEO alt text', ceoEntry?.imageAlt === 'Hassan Sajjad, CEO of Thrive Pakistan');
check(
  'MD alt text',
  mdEntry?.imageAlt === 'Faraz Khan Sulemani, Managing Director of Thrive Pakistan',
);

/* ---------- Person resolution (single source of truth) ---------- */
console.log('\nPerson resolution — references team roster, no duplicate people');
const md = defaultOrder.find((m) => m.id === 'lm-md');
check(
  'MD name/role resolved from team data',
  md && slugOf(md) === 'faraz-khan-sulemani',
);

console.log(failures === 0 ? '\nAll homepage logic scenarios passed.\n' : `\n${failures} scenario(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
