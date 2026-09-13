import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

console.log('=== Phase 25 Focus Areas Refinement & Complete Structure Verification ===');

// 1. Verify files exist
const requiredFiles = [
  'src/types.ts',
  'src/data/programs.ts',
  'src/pages/Programs.tsx',
  'src/pages/ProgramDetail.tsx',
  'src/services/programsService.ts',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `File should exist: ${file}`);
  console.log(`✓ File present: ${file}`);
}

// 2. Verify Removal of "Collaborate With Us" & "Linked Platforms" from Focus Areas
const programDetailJsx = readFileSync(resolve(root, 'src/pages/ProgramDetail.tsx'), 'utf-8');
const programsJsx = readFileSync(resolve(root, 'src/pages/Programs.tsx'), 'utf-8');

assert.ok(
  !programDetailJsx.toLowerCase().includes('collaborate with us'),
  'ProgramDetail.tsx must NOT contain "Collaborate with us" CTA',
);

assert.ok(
  !programsJsx.toLowerCase().includes('collaborate with us'),
  'Programs.tsx must NOT contain "Collaborate with us" CTA',
);

assert.ok(
  !programDetailJsx.toLowerCase().includes('linked platforms'),
  'ProgramDetail.tsx must NOT contain "Linked platforms" section',
);

console.log('✓ Removal of "Collaborate with us" & "Linked Platforms" from Focus Areas verified.');

// 3. Verify "Related Events" Section
assert.ok(
  programDetailJsx.includes('Related Events'),
  'ProgramDetail.tsx must contain "Related Events" section header',
);

console.log('✓ "Related Events" section verified on Focus Area Detail Page.');

// 4. Verify Complete Focus Area Sections
const requiredSections = [
  'Why This Matters',
  'What We Focus On',
  'Opportunities & Access',
  'How Thrive Pakistan Contributes',
];

for (const sec of requiredSections) {
  assert.ok(
    programDetailJsx.includes(sec),
    `ProgramDetail.tsx must render section: ${sec}`,
  );
  console.log(`✓ Section verified: ${sec}`);
}

// 5. Verify Data-Driven Focus Area Extensions in data/programs.ts
const programsDataContent = readFileSync(resolve(root, 'src/data/programs.ts'), 'utf-8');

const requiredDataKeys = [
  'whyThisMatters:',
  'focusPoints:',
  'opportunities:',
  'howThriveContributes:',
  'relatedEventIds:',
];

for (const key of requiredDataKeys) {
  assert.ok(
    programsDataContent.includes(key),
    `programs.ts must contain property: ${key}`,
  );
  console.log(`✓ Data property verified in programs.ts: ${key}`);
}

console.log('=== All Phase 25 Focus Areas Architecture Tests Passed Successfully! ===');
