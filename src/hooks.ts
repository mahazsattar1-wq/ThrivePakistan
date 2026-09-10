import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_DESCRIPTION =
  'Thrive Pakistan is a youth-centered platform founded in 2025 that connects students and emerging talent with practical learning, technology, entrepreneurship, industry exposure and meaningful opportunities — with particular relevance to Hazara and Khyber Pakhtunkhwa.';

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  /** JSON-LD structured data for this route (Event, Article, Person…). */
  jsonLd?: Record<string, unknown> | null;
}

/** Per-page SEO: title, description, Open Graph, Twitter card, canonical, JSON-LD. */
export function useSeo({ title, description, image, type, jsonLd }: SeoOptions = {}): void {
  const { pathname } = useLocation();
  const ld = jsonLd ? JSON.stringify(jsonLd) : null;
  useEffect(() => {
    const full = title ? `${title} | Thrive Pakistan` : 'Thrive Pakistan — Build here. Think global. Together, we thrive.';
    const desc = description ?? DEFAULT_DESCRIPTION;
    const img = image ?? '/img/hero-futurex.jpg';
    document.title = full;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', type ?? 'website');
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:url', window.location.origin + pathname);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = window.location.origin + pathname;

    const LD_ID = 'tp-jsonld';
    let script = document.getElementById(LD_ID) as HTMLScriptElement | null;
    if (ld) {
      if (!script) {
        script = document.createElement('script');
        script.id = LD_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, type, ld, pathname]);
}

/** Observe when an element enters the viewport (once). */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Eased number counter used by the impact statistics band. */
export function useCountUp(target: number, active: boolean, duration = 1600): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

/** Live countdown to an ISO date (FutureX 2026 and other upcoming events). */
export function useCountdown(targetIso: string): Countdown {
  const compute = (): Countdown => {
    const diff = new Date(targetIso).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor(diff / 3_600_000) % 24,
      minutes: Math.floor(diff / 60_000) % 60,
      seconds: Math.floor(diff / 1_000) % 60,
      done: false,
    };
  };
  const [state, setState] = useState<Countdown>(compute);
  useEffect(() => {
    const id = window.setInterval(() => setState(compute()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);
  return state;
}

export function useDebouncedValue<T>(value: T, ms = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

/** Lock body scroll while drawers/modals are open. */
export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/** True once the window has scrolled past `offset` pixels. */
export function useScrolled(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}
