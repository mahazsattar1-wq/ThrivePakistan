import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

console.log('=== Phase 24 Past Event Detail / Case Study System Verification ===');

// 1. Verify files exist
const requiredFiles = [
  'src/types.ts',
  'src/data/events.ts',
  'src/pages/EventDetail.tsx',
  'src/services/eventsService.ts',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `File should exist: ${file}`);
  console.log(`✓ File present: ${file}`);
}

// 2. NON-NEGOTIABLE: Verify complete absence of Women Participation Percentage Metric
const eventsDataContent = readFileSync(resolve(root, 'src/data/events.ts'), 'utf-8');
const eventDetailJsx = readFileSync(resolve(root, 'src/pages/EventDetail.tsx'), 'utf-8');

assert.ok(
  !eventsDataContent.toLowerCase().includes('% women representation') &&
    !eventsDataContent.toLowerCase().includes('45% women') &&
    !eventsDataContent.toLowerCase().includes('women representation'),
  'events.ts must NOT contain any Women Participation percentage metric',
);

assert.ok(
  !eventDetailJsx.toLowerCase().includes('% women representation') &&
    !eventDetailJsx.toLowerCase().includes('women representation'),
  'EventDetail.tsx must NOT contain any Women Participation percentage metric',
);

console.log('✓ NON-NEGOTIABLE VERIFIED: Women participation percentage metric is completely absent.');

// 3. Verify Flexible Metrics Architecture in Data & Components
assert.ok(
  eventsDataContent.includes('metrics:'),
  'Past event data must support flexible metrics array',
);

assert.ok(
  eventDetailJsx.includes('event.metrics'),
  'EventDetail.tsx must render dynamic metrics from event.metrics',
);

console.log('✓ Flexible metrics array verified in data and component layer');

// 4. Verify Past Event Case Study Sections
const requiredSectionKeys = [
  'focusAreas',
  'tracks',
  'chiefGuests',
  'impactItems',
  'testimonials',
  'pressCoverage',
  'reportUrl',
  'cta',
];

for (const key of requiredSectionKeys) {
  assert.ok(
    eventsDataContent.includes(`${key}:`),
    `events.ts should contain field: ${key}`,
  );
  assert.ok(
    eventDetailJsx.includes(`event.${key}`),
    `EventDetail.tsx should render section: event.${key}`,
  );
  console.log(`✓ Section key verified: ${key}`);
}

// 5. Verify Central Gallery Integration & Video Rule
assert.ok(
  eventDetailJsx.includes('galleryTarget'),
  'EventDetail.tsx must link to Central Gallery for event media',
);

assert.ok(
  !eventDetailJsx.includes('<iframe'),
  'EventDetail.tsx must NOT contain any YouTube iframe',
);

console.log('✓ Central Gallery link verified & YouTube iframe absence confirmed');

// 6. Verify Upcoming vs Past Event Logic
assert.ok(
  eventDetailJsx.includes("event.status === 'past'"),
  'EventDetail.tsx must check event.status === "past" for Case Study System',
);

assert.ok(
  eventDetailJsx.includes('Countdown'),
  'Upcoming Event view must retain countdown timer',
);

console.log('✓ Past Event Case Study vs Upcoming Event view logic verified');

console.log('=== All Phase 24 Case Study Architecture Tests Passed Successfully! ===');
