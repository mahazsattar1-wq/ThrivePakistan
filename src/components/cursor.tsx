import { useEffect, useState } from 'react';

/**
 * Premium Custom Mouse Cursor — Thrive Green interaction halo.
 *
 * Performance features:
 * - Direct rAF position interpolation (no state churn during mouse move)
 * - pointer-events: none (zero interaction blocking)
 * - Disabled on touch/mobile viewports (@media pointer: coarse)
 * - Respects prefers-reduced-motion
 */

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const touchDevice = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchDevice || reducedMotion) return;

    let dotX = -100;
    let dotY = -100;
    let haloX = -100;
    let haloY = -100;
    let animId: number;

    const dotEl = document.getElementById('tp-cursor-dot');
    const haloEl = document.getElementById('tp-cursor-halo');

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest('a, button, input, select, textarea, .btn, .chip, .gallery-tile, .event-card, [role="button"]'),
      );
      setHovered(isInteractive);
    };

    const render = () => {
      // Smooth lerp for halo
      haloX += (dotX - haloX) * 0.22;
      haloY += (dotY - haloY) * 0.22;

      if (dotEl) {
        dotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (haloEl) {
        haloEl.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHoverTarget, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHoverTarget);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  return (
    <div
      className={`tp-cursor-root ${visible ? 'is-visible' : ''} ${hovered ? 'is-hovered' : ''}`}
      aria-hidden="true"
    >
      <div id="tp-cursor-dot" className="tp-cursor-dot" />
      <div id="tp-cursor-halo" className="tp-cursor-halo" />
    </div>
  );
}
