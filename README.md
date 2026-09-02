# Thrive Pakistan — Frontend Platform

> **Connect. Learn. Lead. Thrive.**
> Complete frontend prototype for Thrive Pakistan — an events, leadership,
> technology, youth-development, education, networking and community
> organization. Built to be replaced piece-by-piece by a PHP + MySQL backend
> and admin dashboard without redesigning the UI.

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

Illustrative artwork (event covers, portraits, gallery, hero) lives in
`public/img/` as sprite sheets — one request per sheet, displayed per-card via
CSS background-position.

## Mock data & future backend

All content implements the interfaces in `src/types.ts` and lives in
`src/data/*` (events, speakers, team, programs, partners, blogs, videos,
gallery, testimonials, stats, site). Services in `src/services/*` are the only
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

> All people, partners, statistics, dates and articles are **fictional mock
> data** for the prototype unless verified by the organization.

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

## QA notes

- Every card navigates; filters/search/pagination/lightbox/countdown/counters
  all run on mock data.
- Forms validate client-side, POST to `/api/*.php`, and show professional
  success states (with graceful fallback when PHP is absent).
- SEO: per-page titles, descriptions, Open Graph, Twitter cards, canonical.
- Accessibility: semantic landmarks, focus states, ARIA on dialogs/menus,
  skip link, reduced-motion support.
