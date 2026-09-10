# Thrive Pakistan — Frontend Platform

> **Talent exists everywhere. Opportunity does not.**
> Frontend platform for Thrive Pakistan — a youth-led technology and
> ecosystem-development platform based in Hazara, Khyber Pakhtunkhwa
> (founded 2025). Built to be replaced piece-by-piece by a PHP + MySQL
> backend and admin dashboard without redesigning the UI.

## Content accuracy

All organizational content (description, mission, vision, leadership roster,
previous work, FutureX 2026 details, contact channels) is grounded in the
official Thrive Pakistan Organizational Profile (August 2026) and the
FutureX 2026 documents — see `src/data/org.ts` as the single source of
verified facts.

Rules enforced across the codebase:

- **No invented facts.** Statistics, speakers, sponsors, partners, venues,
  dates and achievements appear only when confirmed by official documents.
- **FutureX 2026** is published as confirmed for 24 September 2026 at
  Government Post Graduate College Mansehra (MoC signed 6 August 2026).
  Its final agenda, speakers, sponsors, ticketing and registration are
  labelled as *developing / subject to confirmation* until announced.
- **No AI-generated people.** Portrait sprite sheets were removed. Only
  verified photographs of real people are shown — currently the CEO and
  Managing Director portraits, imported from `assets/` and registered in
  `src/media.ts` (`PORTRAITS`); everyone else still uses a neutral monogram
  avatar until an approved photograph exists.
- Speakers, videos and partners sections ship with professional empty
  states and populate automatically from `/api/*.php` once the backend
  provides confirmed data.

## Stack

- **Vite + React 18 + TypeScript** (strict) with **React Router** clean URLs
- **Modular CSS** design system (`src/styles/*`) with centralized brand tokens
- **Zero runtime UI dependencies** — animations are CSS + IntersectionObserver
- **PHP placeholder API** (`public/api/*.php`) + Apache config (`public/.htaccess`)

## Brand

Real brand assets are imported from the repository `assets/` folder
(`src/brand.ts`): Thrive Pakistan wordmarks (black/white) and FutureX logos.
Brand colours were sampled from the official logo artwork:

| Token             | Value     | Source                          |
| ----------------- | --------- | ------------------------------- |
| `--primary-green` | `#43B749` | Thrive wordmark "V" + dashes    |
| `--green-bright`  | `#36FF00` | FutureX "X" accent (used rarely)|
| `--dark`          | `#0A0B0B` | FutureX black logo base         |

Illustrative artwork (event covers, gallery, hero) lives in `public/img/` as
sprite sheets — one request per sheet, displayed per-card via CSS
background-position. People-portrait sheets were intentionally removed.
Approved photographs of real people are imported from `assets/` and resolved
through the media registry (`src/media.ts`), never hardcoded in components.

## Mock data & future backend

All content implements the interfaces in `src/types.ts` and lives in
`src/data/*` (org facts, events, speakers, team, programs, partners, blogs,
videos, gallery, stats, site). Services in `src/services/*` are the only
layer that reads data:

```
Frontend (React)
   ↓  src/services/*  (apiGet/apiPost → /api/*.php)
PHP API (public/api/*.php)
   ↓  TODO(MySQL phase)
MySQL
   ↓
Admin dashboard (future)
```

Today the PHP endpoints are **safe placeholders**: GET endpoints answer
`{ ok:false, source:"placeholder" }` so services fall back to bundled mock
data; POST endpoints validate and acknowledge submissions. When DB credentials
exist in server env vars (`TP_DB_HOST/NAME/USER/PASS`), `lib.php::tp_db_ready()`
flips and the TODO sections become the only code to implement.

> Speakers, videos and partners collections are intentionally empty until
> officially confirmed content exists; the UI ships honest empty states for
> each. Events currently list only the documented record: FutureX 2026
> (upcoming) and Hazara Tech Fiesta 2025 (past).

## Routes

`/` `/about` `/events` `/events/:slug` `/programs` `/programs/:slug`
`/futurex` `/speakers` `/speakers/:slug` `/team` `/partners`
`/become-a-partner` `/become-a-speaker` `/volunteer` `/gallery` `/videos`
`/blog` `/blog/:slug` `/impact` `/contact` `/search` `/privacy-policy`
`/terms` + premium 404.

## Commands

```bash
npm install        # dependencies
npm run dev        # dev server
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ with SPA + /api fallback (static preview)
npm run typecheck  # strict TS check
```

## Deploying to PHP hosting

1. `npm run build`
2. Upload the **contents of `dist/`** to the web root (the bundled
   `.htaccess` handles SPA rewrites, lets `/api/*.php` execute, and sets
   cache headers).
3. Set DB env vars on the host when the MySQL phase begins; implement the
   marked TODOs in `public/api/lib.php`.

## Dark theme (visual refinement pass)

The whole site runs on one continuous dark environment — BLACK + Thrive GREEN + subtle BLUE atmosphere:

- **Environment:** `--dark #0A0B0B` body; sections layer CSS-only radial gradients (blue depth `#07111A–#0B1D2A`, green glow) — no large white backgrounds anywhere, no alternating black/white rhythm.
- **Surfaces:** cards `#111719` / `#111A1D` / `#0E1518` with `rgba(255,255,255,.10)` borders, hover lift + green accents.
- **Content:** white headings; body `rgba(255,255,255,.72)`; muted `.62`; faint `.50` — all ≥ 4.5:1 on dark (≈10:1 / 7.3:1 / 5:1).
- **Brand:** `#43B749` green is accent-only (CTAs, active states, numbers, icons, borders); `--green-deep #86db8c` is the bright green text token for on-dark labels (≈11.8:1). FutureX uses neon `#36FF00` + grid/glow, never replacing primary green.
- **Override layer:** `src/styles/dark-theme.css` is imported last in `main.tsx` and recolors buttons, chips, selects, inputs, modals (dark glass + blur), pagination, and text on top of untouched component structure — no architecture/routing/data changes.
- Intentionally white: event date chips, outline-button hover, dark text on green badges/flags.

## Final QA & audit pass

- **Contrast system:** brand green `#43B749` carries near-black text (8:1) on
  buttons/badges/pills; small green text on light surfaces uses
  `--green-deep` (8:1); dark surfaces use `--primary-green` (7.6:1). Focus
  outlines switch per surface to always meet WCAG 3:1 for non-text contrast.
- **Structured data:** static Organization JSON-LD in `index.html`; per-route
  `Event`, `BlogPosting` and `Person` JSON-LD via `useSeo({ jsonLd })`, each
  carrying an explicit mock/demo note.
- **Accessibility:** modal focus restore on close, lightbox arrow-key
  navigation, ESC handling, scroll locking, skip link, reduced-motion support.
- **Responsive:** 4-column bands use the responsive `.band--4` modifier
  (4 → 2 → 1) instead of inline grids; audited down to 320px.
- **Homepage storytelling:** hero + six-pillar "what we do" strip + partner
  marquee communicate the organization's scope in the first scroll.
- **Enriched pages:** program details (objectives, audience, impact),
  partnership proposition (reach stats, six opportunity models, thought
  leadership / community impact / strategic collaboration), speaker
  invitation (who we invite, what we ask), volunteer responsibilities.
- **Honesty guards:** team/impact/program mock content is labelled as demo
  data in-page and in structured data.
- **PHP hardening:** `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, method guards, 422 validation responses; no credentials
  anywhere (env-var driven when MySQL arrives).

## QA notes

- Every card navigates; filters/search/pagination/lightbox/countdown/counters
  all run on mock data.
- Forms validate client-side, POST to `/api/*.php`, and show professional
  success states (with graceful fallback when PHP is absent).
- SEO: per-page titles, descriptions, Open Graph, Twitter cards, canonical.
- Accessibility: semantic landmarks, focus states, ARIA on dialogs/menus,
  skip link, reduced-motion support.
