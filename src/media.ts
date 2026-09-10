import type { CSSProperties } from 'react';
import type { ImageRef, SheetId } from './types';

/**
 * Central image registry.
 *
 * Photography-style artwork is stored as sprite sheets (one request per sheet
 * instead of one per card) plus a single cinematic hero image. The percentage
 * background-position technique displays any cell of a sheet crisply.
 *
 * Note: people-portrait sheets were removed — Thrive Pakistan does not display
 * AI-generated or fictional faces for real people. Team/leadership entries use
 * neutral monogram avatars until approved photographs are available.
 */
export const SHEETS: Record<SheetId, { src: string; cols: number; rows: number }> = {
  eventsA: { src: '/img/sprites/events-a.jpg', cols: 3, rows: 2 },
  eventsB: { src: '/img/sprites/events-b.jpg', cols: 3, rows: 2 },
  galleryA: { src: '/img/sprites/gallery-a.jpg', cols: 3, rows: 3 },
  mediaA: { src: '/img/sprites/media-a.jpg', cols: 3, rows: 2 },
  hero: { src: '/img/hero-futurex.jpg', cols: 1, rows: 1 },
};

export const HERO_IMAGE = '/img/hero-futurex.jpg';

export const img = (sheet: SheetId, cell: number): ImageRef => ({ sheet, cell });

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
