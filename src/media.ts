import type { CSSProperties } from 'react';
import type { AnyImageRef, ImageRef, PhotoRef, PortraitId, SheetId } from './types';

/**
 * Central image registry.
 *
 * Photography-style artwork is stored as sprite sheets (one request per sheet
 * instead of one per card) plus a single cinematic hero image. The percentage
 * background-position technique displays any cell of a sheet crisply.
 *
 * Performance: every large photographic asset now ships as AVIF → WebP → JPEG
 * with responsive widths. Original high-quality JPGs remain in the repository
 * (`assets/` / `public/img/`) as the single source of truth; optimized
 * derivatives are generated at build time (webp 75q, avif 50q) and referenced
 * via `image-set` / `<picture>` / `srcSet`. This cuts ~50-70% off the
 * 171-323KB originals for slow connections while keeping a JPEG fallback.
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

/** Responsive hero variants — 640w / 1024w / 1280w / 1672w, AVIF/WebP/JPG */
export const HERO_RESPONSIVE = {
  avifSrcSet: '/img/hero-futurex-640.avif 640w, /img/hero-futurex-1024.avif 1024w, /img/hero-futurex-1280.avif 1280w, /img/hero-futurex.avif 1672w',
  webpSrcSet: '/img/hero-futurex-640.webp 640w, /img/hero-futurex-1024.webp 1024w, /img/hero-futurex-1280.webp 1280w, /img/hero-futurex.webp 1672w',
  jpgSrcSet: '/img/hero-futurex-640.jpg 640w, /img/hero-futurex-1024.jpg 1024w, /img/hero-futurex-1280.jpg 1280w, /img/hero-futurex.jpg 1672w',
  sizes: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px',
  fallback: '/img/hero-futurex.jpg',
} as const;

/**
 * Approved photographs of real people — the ONLY images allowed next to a
 * named person. Originals remain in `assets/hassan ceo.jpeg` + `assets/faraz
 * khan md.jpeg` (never deleted, verifiable source). Runtime serving uses the
 * optimized public derivatives in `/public/img/portraits/` (400w/800w/1200w
 * AVIF/WebP/JPG) to avoid shipping the 60-85KB originals inside the JS
 * bundle; `imageSrc()` therefore returns a public URL, not a bundler hash.
 *
 *   'hassan-sajjad'         → assets/hassan ceo.jpeg      (Hassan Sajjad, CEO)
 *   'faraz-khan-sulemani'   → assets/faraz khan md.jpeg   (Faraz Khan Sulemani, MD)
 *
 * Responsive derivatives live in `/public/img/portraits/` (400w, 800w, 1200w)
 * in AVIF/WebP/JPG for `srcSet` — originals are never deleted.
 *
 * A future admin panel replaces these by writing a new id/path here or by
 * serving the same shape from the API — no component changes required.
 */
export const PORTRAITS: Record<PortraitId, string> = {
  'hassan-sajjad': '/img/portraits/hassan-1200.jpg',
  'faraz-khan-sulemani': '/img/portraits/faraz-1200.jpg',
};

/** Responsive portrait srcSets — public optimized variants */
export const PORTRAIT_RESPONSIVE: Record<PortraitId, { avifSrcSet: string; webpSrcSet: string; jpgSrcSet: string; sizes: string; fallback: string }> = {
  'hassan-sajjad': {
    avifSrcSet: '/img/portraits/hassan-400.avif 400w, /img/portraits/hassan-800.avif 800w, /img/portraits/hassan-1200.avif 1200w',
    webpSrcSet: '/img/portraits/hassan-400.webp 400w, /img/portraits/hassan-800.webp 800w, /img/portraits/hassan-1200.webp 1200w',
    jpgSrcSet: '/img/portraits/hassan-400.jpg 400w, /img/portraits/hassan-800.jpg 800w, /img/portraits/hassan-1200.jpg 1200w',
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 400px',
    fallback: '/img/portraits/hassan-1200.jpg',
  },
  'faraz-khan-sulemani': {
    avifSrcSet: '/img/portraits/faraz-400.avif 400w, /img/portraits/faraz-800.avif 800w, /img/portraits/faraz-1200.avif 1200w',
    webpSrcSet: '/img/portraits/faraz-400.webp 400w, /img/portraits/faraz-800.webp 800w, /img/portraits/faraz-1200.webp 1200w',
    jpgSrcSet: '/img/portraits/faraz-400.jpg 400w, /img/portraits/faraz-800.jpg 800w, /img/portraits/faraz-1200.jpg 1200w',
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 400px',
    fallback: '/img/portraits/faraz-1200.jpg',
  },
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

/**
 * CSS for rendering one sprite cell as a background with modern image-set.
 * Prefers AVIF → WebP → JPEG via `image-set(type(...))` for ~50% savings;
 * falls back gracefully to JPEG on browsers without image-set support (the
 * `backgroundColor` on cards hides the flash).
 */
export function spriteStyle(ref: ImageRef): CSSProperties {
  const sheet = SHEETS[ref.sheet];
  const col = ref.cell % sheet.cols;
  const row = Math.floor(ref.cell / sheet.cols);
  const x = sheet.cols === 1 ? 0 : (col / (sheet.cols - 1)) * 100;
  const y = sheet.rows === 1 ? 0 : (row / (sheet.rows - 1)) * 100;
  const jpg = sheet.src;
  const webp = jpg.replace('.jpg', '.webp');
  const avif = jpg.replace('.jpg', '.avif');
  return {
    // Modern browsers pick the first supported type; older browsers ignore image-set and use the fallback color.
    backgroundImage: `image-set(url("${avif}") type("image/avif"), url("${webp}") type("image/webp"), url("${jpg}") type("image/jpeg"))`,
    backgroundSize: `${sheet.cols * 100}% ${sheet.rows * 100}%`,
    backgroundPosition: `${x}% ${y}%`,
  } as CSSProperties;
}

/** Legacy fallback (pure JPEG) if image-set is not desired for a specific surface */
export function spriteStyleFallback(ref: ImageRef): CSSProperties {
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
