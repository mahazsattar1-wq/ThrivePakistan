import type { CSSProperties } from 'react';
import type { AnyImageRef, ImageRef, PhotoRef, PortraitId, SheetId } from './types';
import hassanSajjadPortrait from '../assets/hassan ceo.jpeg';
import farazKhanSulemaniPortrait from '../assets/faraz khan md.jpeg';

/**
 * Central image registry.
 *
 * Photography-style artwork is stored as sprite sheets (one request per sheet
 * instead of one per card) plus a single cinematic hero image. The percentage
 * background-position technique displays any cell of a sheet crisply.
 *
 * Note: people-portrait sheets were removed — Thrive Pakistan does not display
 * AI-generated or fictional faces for real people. Only verified photographs
 * of real people, imported from the repository `assets/` folder (see
 * `PORTRAITS` below), are ever shown alongside a named person; entries without
 * an approved photograph still fall back to a neutral monogram avatar.
 */
export const SHEETS: Record<SheetId, { src: string; cols: number; rows: number }> = {
  eventsA: { src: '/img/sprites/events-a.jpg', cols: 3, rows: 2 },
  eventsB: { src: '/img/sprites/events-b.jpg', cols: 3, rows: 2 },
  galleryA: { src: '/img/sprites/gallery-a.jpg', cols: 3, rows: 3 },
  mediaA: { src: '/img/sprites/media-a.jpg', cols: 3, rows: 2 },
  hero: { src: '/img/hero-futurex.jpg', cols: 1, rows: 1 },
};

export const HERO_IMAGE = '/img/hero-futurex.jpg';

/**
 * Approved photographs of real people — the ONLY images allowed next to a
 * named person. Both files are real photographs already present in the
 * repository `assets/` folder; they are imported (never downloaded, generated
 * or stock-sourced) so the originals stay the single source of truth, the same
 * pattern used for brand assets in `src/brand.ts`.
 *
 *   'hassan-sajjad'         → assets/hassan ceo.jpeg      (Hassan Sajjad, CEO)
 *   'faraz-khan-sulemani'   → assets/faraz khan md.jpeg   (Faraz Khan Sulemani, MD)
 *
 * A future admin panel replaces these by writing a new id/path here or by
 * serving the same shape from the API — no component changes required.
 */
export const PORTRAITS: Record<PortraitId, string> = {
  'hassan-sajjad': hassanSajjadPortrait,
  'faraz-khan-sulemani': farazKhanSulemaniPortrait,
};

export const img = (sheet: SheetId, cell: number): ImageRef => ({ sheet, cell });

/** Narrow an image reference to a standalone approved photograph. */
export function isPhotoRef(ref: AnyImageRef): ref is PhotoRef {
  return typeof (ref as PhotoRef).photo === 'string';
}

/** Resolvable `src` for any image reference — photograph asset or sprite sheet. */
export function imageSrc(ref: AnyImageRef): string {
  return isPhotoRef(ref) ? PORTRAITS[ref.photo] : SHEETS[ref.sheet].src;
}

/** CSS for rendering one sprite cell as a background. */
export function spriteStyle(ref: ImageRef): CSSProperties {
  const sheet = SHEETS[ref.sheet];
  const col = ref.cell % sheet.cols;
  const row = Math.floor(ref.cell / sheet.cols);
  const x = sheet.cols === 1 ? 0 : (col / (sheet.cols - 1)) * 100;
  const y = sheet.rows === 1 ? 0 : (row / (sheet.rows - 1)) * 100;
  return {
    backgroundImage: `url(${sheet.src})`,
    backgroundSize: `${sheet.cols * 100}% ${sheet.rows * 100}%`,
    backgroundPosition: `${x}% ${y}%`,
  };
}
