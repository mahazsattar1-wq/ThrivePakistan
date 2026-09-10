/**
 * Brand assets — imported directly from the repository `assets/` folder so the
 * original files remain the single source of truth.
 *
 * Brand colours were sampled from the official logo artwork:
 *   Thrive green  #43B749   (the "V" + side dashes of the wordmark)
 *   FutureX green #36FF00   (the FutureX "X" accent — used sparingly)
 *   Ink black     #0A0B0B
 */
import logoBlack from '../assets/TP LOGO BLACK.png';
import logoWhite from '../assets/TP LOGO WHITE.png';
import futurexColor from '../assets/FutureX-Logo-colored.png';
import futurexBlack from '../assets/futureX logo black.png';

export const BRAND = {
  name: 'Thrive Pakistan',
  tagline: 'Build here. Think global. Together, we thrive.',
  logoBlack,
  logoWhite,
  futurexColor,
  futurexBlack,
} as const;
