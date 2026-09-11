import type { AnyImageRef } from '../types';
import { TEAM } from './team';

/**
 * LEADERSHIP MESSAGES — homepage message system.
 *
 * DATA-DRIVEN: the homepage renders these entries sorted by `displayOrder`
 * and filtered by `published`. Order of objects in this file is irrelevant —
 * the future admin panel only needs to change `displayOrder` / `published`
 * and the homepage updates automatically. Nothing in the React component
 * depends on the order or content written here.
 *
 * COPY STATUS: the CEO and Managing Director entries carry approved personal
 * statements supplied by Thrive Pakistan (`isPlaceholderCopy: false`). They
 * are reproduced verbatim, including the signature lines — never rewrite,
 * shorten, paraphrase or "improve" them.
 *
 * Person identity (name, role) comes from the single leadership roster in
 * `src/data/team.ts` via `personId` — never duplicate a person here. `name` /
 * `role` are optional display overrides for this section only.
 *
 * PHOTOGRAPHS: `image` points into the media registry (`src/media.ts`
 * PORTRAITS) — real photographs from the repository `assets/` folder. No
 * generated, stock or illustrative faces are ever used for a real person.
 */
export interface LeadershipMessage {
  id: string;
  /** Reference to a person in `src/data/team.ts` (TeamMember.slug). */
  personId: string;
  /** Optional overrides — resolved from the team roster when omitted. */
  name?: string;
  role?: string;
  /** Small label above the name, e.g. "Message from the CEO". */
  label: string;
  /** Approved message text, verbatim. Blank lines separate paragraphs. */
  message: string;
  /** Approved photograph (media registry reference). `null/undefined` → monogram fallback. */
  image?: AnyImageRef | null;
  imageAlt?: string;
  /** Render position — the ONLY thing that controls order. */
  displayOrder: number;
  published: boolean;
  featured?: boolean;
  /** False once approved personal copy is published (see COPY STATUS above). */
  isPlaceholderCopy?: boolean;
  ctaLabel?: string;
  ctaTo?: string;
}

/* ------------------------------------------------------------------ *
 * Approved messages — verbatim copy. Do not edit the wording.
 * ------------------------------------------------------------------ */

/** Hassan Sajjad — CEO, Thrive Pakistan. Approved message (verbatim). */
const CEO_MESSAGE = [
  'Thrive Pakistan was built on a simple belief that young people should not have to leave their region to find serious opportunities.',
  'We are creating platforms that bring industry, technology, leadership, and real-world exposure closer to the people who are ready to grow. Our work is about opening doors, building stronger networks, and giving regional talent a place in conversations that usually happen somewhere else.',
  'We want the next generation to think bigger, move faster, and build with confidence.',
  'Hassan Sajjad',
  'CEO, Thrive Pakistan',
].join('\n\n');

/** Faraz Khan Sulemani — Managing Director, Thrive Pakistan. Approved message (verbatim). */
const MD_MESSAGE = [
  'At Thrive Pakistan, we believe talent should never be limited by geography.',
  'Our mission is to connect young people with the ideas, networks, technology, and opportunities they need to move forward. Through platforms like FutureX 2026, we are bringing national and global conversations closer to Hazara and Khyber Pakhtunkhwa.',
  'We are not just organizing events. We are building access, connections, and momentum for the next generation.',
  'Faraz Khan Sulemani',
  'Managing Director, Thrive Pakistan',
].join('\n\n');

export const LEADERSHIP_MESSAGES: LeadershipMessage[] = [
  {
    id: 'lm-ceo',
    personId: 'hassan-sajjad-khan',
    name: 'Hassan Sajjad',
    role: 'CEO, Thrive Pakistan',
    label: 'Message from the CEO',
    message: CEO_MESSAGE,
    image: { photo: 'hassan-sajjad' },
    imageAlt: 'Hassan Sajjad, CEO of Thrive Pakistan',
    displayOrder: 1,
    published: true,
    featured: true,
    isPlaceholderCopy: false,
  },
  {
    id: 'lm-md',
    personId: 'faraz-khan-sulemani',
    name: 'Faraz Khan Sulemani',
    role: 'Managing Director, Thrive Pakistan',
    label: 'Message from the Managing Director',
    message: MD_MESSAGE,
    image: { photo: 'faraz-khan-sulemani' },
    imageAlt: 'Faraz Khan Sulemani, Managing Director of Thrive Pakistan',
    displayOrder: 2,
    published: true,
    featured: true,
    isPlaceholderCopy: false,
  },
  {
    // No approved personal statement for this role yet. Kept unpublished so
    // placeholder copy is never shown on the homepage; the future admin panel
    // publishes it by adding approved copy and setting `published: true`.
    id: 'lm-coo',
    personId: 'ibrahim-fiaz',
    label: 'Message from the COO',
    message: '',
    image: null,
    imageAlt: 'Official photograph of the Chief Operating Officer — to be published',
    displayOrder: 3,
    published: false,
    isPlaceholderCopy: true,
  },
];

/** Published messages, ordered by `displayOrder` (order in the file is irrelevant). */
export function getPublishedMessages(
  list: LeadershipMessage[] = LEADERSHIP_MESSAGES,
): LeadershipMessage[] {
  return list.filter((m) => m.published).sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Resolve a message's person from the leadership roster (single source of truth). */
export function resolveMessagePerson(message: LeadershipMessage): { name: string; role: string } {
  const member = TEAM.find((t) => t.slug === message.personId);
  return {
    name: message.name ?? member?.name ?? message.personId,
    role: message.role ?? member?.role ?? '',
  };
}

/* ------------------------------------------------------------------ *
 * Message formatting (presentation only — the text is never altered)
 * ------------------------------------------------------------------ */

export type MessageBlockType = 'paragraph' | 'signature-name' | 'signature-role';

export interface MessageBlock {
  type: MessageBlockType;
  text: string;
}

/**
 * Split a message into render blocks.
 *
 * Words, order and punctuation are preserved exactly: blank lines become
 * paragraph breaks, and a trailing two-line sign-off (name + designation,
 * i.e. short lines without sentence-ending punctuation) is marked as a
 * signature so it can be typeset without touching the copy itself.
 */
export function parseMessage(message: string): MessageBlock[] {
  const blocks = message
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  let signatureStart = blocks.length;
  while (signatureStart > 0 && isSignatureLine(blocks[signatureStart - 1])) signatureStart -= 1;

  const signature = blocks.slice(signatureStart);
  if (signature.length !== 2) {
    return blocks.map((text) => ({ type: 'paragraph' as const, text }));
  }

  return [
    ...blocks.slice(0, signatureStart).map((text) => ({ type: 'paragraph' as const, text })),
    { type: 'signature-name' as const, text: signature[0] },
    { type: 'signature-role' as const, text: signature[1] },
  ];
}

/** Short trailing line without sentence-ending punctuation → part of a sign-off. */
function isSignatureLine(line: string): boolean {
  return line.length > 0 && line.length <= 64 && !/[.!?,;:]$/.test(line);
}
