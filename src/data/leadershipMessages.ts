import type { ImageRef } from '../types';
import { TEAM } from './team';

/**
 * LEADERSHIP MESSAGES — homepage message system.
 *
 * DATA-DRIVEN: the homepage renders these entries sorted by `displayOrder`
 * and filtered by `published`. Order of objects in this file is irrelevant —
 * the future admin panel only needs to change `displayOrder` / `published`
 * and the homepage updates automatically.
 *
 * IMPORTANT — COPY STATUS: the organisational documents verified to date do
 * not contain approved personal statements from individual leaders. The
 * `message` texts below are PLACEHOLDER copy paraphrasing verified
 * organisational statements (see `isPlaceholderCopy: true`). They are
 * presented as organisational messages, never as verbatim personal
 * quotations. Replace each message with approved copy via the admin panel
 * when available and set `isPlaceholderCopy: false`.
 *
 * Person identity (name, role) comes from the single leadership roster in
 * `src/data/team.ts` via `personId` — never duplicate a person here.
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
  message: string;
  /** Approved photograph (media registry reference). `null/undefined` → monogram fallback. */
  image?: ImageRef | null;
  imageAlt?: string;
  /** Render position — the ONLY thing that controls order. */
  displayOrder: number;
  published: boolean;
  featured?: boolean;
  /** True until approved personal copy replaces the placeholder text. */
  isPlaceholderCopy?: boolean;
  ctaLabel?: string;
  ctaTo?: string;
}

export const LEADERSHIP_MESSAGES: LeadershipMessage[] = [
  {
    id: 'lm-ceo',
    personId: 'hassan-sajjad-khan',
    label: 'Message from the CEO',
    message:
      'Regional talent does not need sympathy — it needs access, trust, standards and room to perform. Our work is to bring those conditions together, so a young person in Hazara, or anywhere in Khyber Pakhtunkhwa, does not have to wait for opportunity to reach them.',
    image: null,
    imageAlt: 'Official photograph of the Chief Executive Officer — to be published',
    displayOrder: 1,
    published: true,
    featured: true,
    isPlaceholderCopy: true,
    ctaLabel: 'Meet the leadership',
    ctaTo: '/team',
  },
  {
    id: 'lm-md',
    personId: 'faraz-khan-sulemani',
    label: 'Message from the Managing Director',
    message:
      'Our focus is execution: platforms that produce practical learning and lasting relationships, delivered with accountable ownership from first plan to event day. Every programme is measured by one question — did participants leave closer to knowledge, people or opportunity?',
    image: null,
    imageAlt: 'Official photograph of the Managing Director — to be published',
    displayOrder: 2,
    published: true,
    isPlaceholderCopy: true,
  },
  {
    id: 'lm-coo',
    personId: 'ibrahim-fiaz',
    label: 'Message from the COO',
    message:
      'From operational readiness to event-day command, our teams run regional platforms to a professional standard. Disciplined coordination and careful logistics are how access with structure becomes real for every participant who walks in.',
    image: null,
    imageAlt: 'Official photograph of the Chief Operating Officer — to be published',
    displayOrder: 3,
    published: true,
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
