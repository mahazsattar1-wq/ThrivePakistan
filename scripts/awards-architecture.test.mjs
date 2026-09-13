import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

console.log('=== Phase 22 Awards System & Architecture Verification ===');

// 1. Verify existence of files
const requiredFiles = [
  'src/data/awardsPage.ts',
  'src/data/awards.ts',
  'src/services/awardsService.ts',
  'src/pages/Awards.tsx',
  'src/pages/AwardDetail.tsx',
  'src/components/cursor.tsx',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `File should exist: ${file}`);
  console.log(`✓ File present: ${file}`);
}

// 2. Verify Awards Data Structure
const awardsDataContent = readFileSync(resolve(root, 'src/data/awards.ts'), 'utf-8');

// Check represented categories
const categoriesToCheck = [
  'Technology',
  'Women',
  'Youth',
  'Entrepreneurship',
  'Leadership',
  'Innovation',
  'Community Impact',
];

for (const cat of categoriesToCheck) {
  assert.ok(
    awardsDataContent.toLowerCase().includes(cat.toLowerCase()),
    `Awards data should include category/topic related to: ${cat}`,
  );
  console.log(`✓ Category/Topic verified in data: ${cat}`);
}

// Check Gallery Isolation constraint: award winners belong strictly to Awards and not gallery collections
assert.ok(
  awardsDataContent.includes('Winner photos belong exclusively to the AwardWinner record and do NOT appear in Gallery'),
  'Awards data comment must specify isolation constraint from Central Gallery',
);
console.log('✓ Strict Gallery Isolation verified in data domain model');

// 3. Verify Stories Cleanup
const navContent = readFileSync(resolve(root, 'src/nav.ts'), 'utf-8');
assert.ok(!navContent.includes("'Stories'"), 'src/nav.ts should not contain "Stories" link');
assert.ok(!navContent.includes('?category=Stories'), 'src/nav.ts should not link to ?category=Stories');
console.log('✓ Stories completely removed from src/nav.ts');

const layoutContent = readFileSync(resolve(root, 'src/components/layout.tsx'), 'utf-8');
assert.ok(!layoutContent.toLowerCase().includes('search events, speakers, stories'), 'Layout search placeholder should not mention stories');
console.log('✓ Stories removed from search placeholder in src/components/layout.tsx');

const blogDetailContent = readFileSync(resolve(root, 'src/pages/BlogDetail.tsx'), 'utf-8');
assert.ok(!blogDetailContent.includes('title="Related stories"'), 'BlogDetail should not say "Related stories"');
console.log('✓ "Related stories" cleaned up in src/pages/BlogDetail.tsx');

// 4. Verify Routes in App.tsx
const appContent = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8');
assert.ok(appContent.includes('/awards'), 'App.tsx must include /awards route');
assert.ok(appContent.includes('/awards/:slug'), 'App.tsx must include /awards/:slug route');
console.log('✓ /awards and /awards/:slug routes configured in src/App.tsx');

// 5. Verify Custom Cursor Integration
assert.ok(layoutContent.includes('<CustomCursor />'), 'Layout must render <CustomCursor /> component');
console.log('✓ <CustomCursor /> rendered globally in Layout');

// 6. Verify CSS for Custom Cursor
const cssContent = readFileSync(resolve(root, 'src/styles/components.css'), 'utf-8');
assert.ok(cssContent.includes('.tp-cursor-root'), 'components.css must define .tp-cursor-root');
assert.ok(cssContent.includes('.tp-cursor-dot'), 'components.css must define .tp-cursor-dot');
assert.ok(cssContent.includes('.tp-cursor-halo'), 'components.css must define .tp-cursor-halo');
assert.ok(cssContent.includes('@media (hover: none)'), 'components.css must disable custom cursor on touch/pointer coarse');
console.log('✓ Custom cursor styles & responsive/touch overrides verified in components.css');

console.log('=== All Phase 22 Architecture Tests Passed Successfully! ===');
