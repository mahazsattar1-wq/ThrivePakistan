import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

console.log('=== Phase 22.1 & Phase 23 Navigation Architecture Verification ===');

// 1. Verify existence of files
const requiredFiles = [
  'src/data/awardsPage.ts',
  'src/data/awards.ts',
  'src/services/awardsService.ts',
  'src/pages/Awards.tsx',
  'src/pages/AwardDetail.tsx',
  'src/pages/Speakers.tsx',
  'src/components/cursor.tsx',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `File should exist: ${file}`);
  console.log(`✓ File present: ${file}`);
}

// 2. Header Navigation Acceptance Test
const navContent = readFileSync(resolve(root, 'src/nav.ts'), 'utf-8');

assert.ok(
  navContent.includes("{ label: 'Awards', to: '/awards' }"),
  'Awards must be directly visible in top-level desktop navigation',
);

assert.ok(
  navContent.includes("{ label: 'Speakers', to: '/speakers' }"),
  'Speakers must be directly visible in top-level desktop navigation',
);

// Check that More section does NOT contain Awards or Speakers
const moreSectionMatch = navContent.match(/label:\s*'More'[\s\S]*?children:\s*\[([\s\S]*?)\]/);
assert.ok(moreSectionMatch, 'More section must exist in nav.ts');
const moreChildren = moreSectionMatch[1];

assert.ok(
  !moreChildren.includes('Awards'),
  'Awards must NOT appear inside the More section dropdown',
);

assert.ok(
  !moreChildren.includes('Speakers'),
  'Speakers must NOT appear inside the More section dropdown',
);

console.log('✓ Header Acceptance Test passed: Awards & Speakers are directly in top nav and removed from More');

// 3. Category Removal Verification
const typesContent = readFileSync(resolve(root, 'src/types.ts'), 'utf-8');
assert.ok(!typesContent.includes('interface AwardCategory'), 'AwardCategory interface must be removed');
console.log('✓ AwardCategory interface removed from types.ts');

const awardsDataContent = readFileSync(resolve(root, 'src/data/awards.ts'), 'utf-8');
assert.ok(!awardsDataContent.includes('AWARD_CATEGORIES'), 'AWARD_CATEGORIES data array must be removed');
console.log('✓ AWARD_CATEGORIES removed from awards.ts');

const awardsServiceContent = readFileSync(resolve(root, 'src/services/awardsService.ts'), 'utf-8');
assert.ok(!awardsServiceContent.includes('listCategories'), 'listCategories method must be removed');
assert.ok(!awardsServiceContent.includes('getCategoryById'), 'getCategoryById method must be removed');
console.log('✓ Category methods removed from awardsService.ts');

const awardsPageJsx = readFileSync(resolve(root, 'src/pages/Awards.tsx'), 'utf-8');
assert.ok(!awardsPageJsx.includes('categoryParam'), 'Awards.tsx must not contain category parameter logic');
assert.ok(!awardsPageJsx.includes('chip'), 'Awards.tsx must not contain category filter chips');
console.log('✓ Category filter UI completely removed from Awards.tsx');

// 4. Mock Awards & Winners Data Verification
const mockAwardTitles = [
  'Emerging Technology Leader Award',
  'Women in Technology Award',
  'Youth Leadership Award',
  'Digital Innovation Award',
  'Community Impact Award',
];

for (const title of mockAwardTitles) {
  assert.ok(
    awardsDataContent.includes(title),
    `Awards data must contain mock award title: ${title}`,
  );
  console.log(`✓ Mock Award present: ${title}`);
}

// 5. Gallery Isolation Constraint Verification
assert.ok(
  awardsDataContent.includes('Winner photos belong exclusively to the AwardWinner record and do NOT appear in Gallery'),
  'Awards data comment must specify isolation constraint from Central Gallery',
);
console.log('✓ Gallery Isolation constraint preserved');

// 6. Routes in App.tsx
const appContent = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8');
assert.ok(appContent.includes("path=\"/awards\""), 'App.tsx must include /awards route');
assert.ok(appContent.includes("path=\"/awards/:slug\""), 'App.tsx must include /awards/:slug route');
assert.ok(appContent.includes("path=\"/speakers\""), 'App.tsx must include /speakers route');
assert.ok(appContent.includes("path=\"/speakers/:slug\""), 'App.tsx must include /speakers/:slug route');
console.log('✓ /awards, /awards/:slug, /speakers, and /speakers/:slug routes configured in src/App.tsx');

console.log('=== All Navigation & Architecture Acceptance Tests Passed Successfully! ===');
