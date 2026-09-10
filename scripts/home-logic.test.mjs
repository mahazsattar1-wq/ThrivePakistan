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
  import { LEADERSHIP_MESSAGES, getPublishedMessages } from '${join(root, 'src/data/leadershipMessages.ts')}';
  export { EVENTS, getFeaturedUpcomingEvent, LEADERSHIP_MESSAGES, getPublishedMessages };
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
});

const { EVENTS, getFeaturedUpcomingEvent, LEADERSHIP_MESSAGES, getPublishedMessages } =
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
console.log('\nScenario C — orders CEO=1, MD=2, COO=3');
const defaultOrder = getPublishedMessages();
check(
  'order is CEO → MD → COO',
  JSON.stringify(defaultOrder.map(slugOf)) ===
    JSON.stringify(['hassan-sajjad-khan', 'faraz-khan-sulemani', 'ibrahim-fiaz']),
  defaultOrder.map(slugOf).join(' → '),
);

/* ---------- Scenario D ---------- */
console.log('\nScenario D — reordered CEO=3, MD=1, COO=2 (data change only)');
const reordered = LEADERSHIP_MESSAGES.map((m) => ({
  ...m,
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
const withUnpublished = LEADERSHIP_MESSAGES.map((m) =>
  m.id === 'lm-md' ? { ...m, published: false } : m,
);
const filtered = getPublishedMessages(withUnpublished);
check('unpublished message hidden', filtered.length === 2 && !filtered.some((m) => m.id === 'lm-md'));
check('remaining order preserved', filtered.map((m) => m.displayOrder).join(',') === '1,3');

/* ---------- Scenario F ---------- */
console.log('\nScenario F — only one message exists');
const single = getPublishedMessages([LEADERSHIP_MESSAGES[0]]);
check('single message returned', single.length === 1);
check('single message is the CEO', slugOf(single[0]) === 'hassan-sajjad-khan');

/* ---------- Person resolution (single source of truth) ---------- */
console.log('\nPerson resolution — references team roster, no duplicate people');
const md = defaultOrder.find((m) => m.id === 'lm-md');
check(
  'MD name/role resolved from team data',
  md && slugOf(md) === 'faraz-khan-sulemani',
);

console.log(failures === 0 ? '\nAll homepage logic scenarios passed.\n' : `\n${failures} scenario(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
