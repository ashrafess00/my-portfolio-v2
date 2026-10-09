# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (eslint-config-next)
```

There is no test suite configured in this repo.

## Architecture

This is Achraf Essaoudi's personal portfolio site: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4, single-page layout with one secondary route.

### Page structure

All pages live under the `src/app/[locale]/` segment (locale-prefixed routing — see i18n section). Each route is a thin **server component** that exports `generateMetadata` (title/description/hreflang alternates) and renders a `"use client"` content component from `src/components/`:

- `src/app/[locale]/page.tsx` → renders `HomeContent.tsx` — the homepage stacks section components in order: `Navbar` → `IntroSection` → `AboutSection` → `ProjectsSection` → `SkillsSection` → `ContactSection` → `Footer`. Section anchors (`#about`, `#projects`, `#skills`, `#contact`) drive in-page nav scrolling.
- `src/app/[locale]/projects/page.tsx` → renders `ProjectsContent.tsx` — a standalone "archive" page (shares `Navbar`/`Footer` with the homepage) with category filter buttons (`web` / `42` / `automation`). Its project data comes from i18n translations (`ProjectsPage.projects` in `messages/*.json`), **not** from `src/data/projects.ts`.
- `Navbar`/`Footer` are route-aware through `SectionLink` (`src/components/notebook/SectionLink.tsx`): on the homepage they smooth-scroll to a section, elsewhere they link to `/#section`.
- This server-wrapper / client-content split exists specifically so each route can export per-page `metadata` (client components can't). When adding a page, follow the same pattern.
- There is no project detail page (`[id]`) — project links go straight to `websiteUrl`/`githubUrl`.
- `src/app/robots.ts` / `src/app/sitemap.ts` — static SEO routes, hardcoded to `https://achrafessaoudi.com`. The sitemap emits every page once per locale with hreflang `alternates`; update the `pages` array if routes change.

### Two separate project data sources — don't conflate them

- `src/data/projects.ts` — plain TS array, consumed by `ProjectsSection.tsx` (homepage showcase). Fields: `id, year, title, desc, tags, img, size, uri, websiteUrl, githubUrl, fullDesc`.
- `messages/{en,ar,fr}.json` under `ProjectsPage.projects` — used by `ProjectsContent.tsx` (the `/projects` page). Fields: `title, description, category, image, id, technologies, liveUrl, githubUrl`.

When adding/editing a project, update both sources if it should appear in both the homepage showcase and the `/projects` archive.

### Internationalization (next-intl, locale-prefixed URLs)

- **Routing is URL-based**, `localePrefix: "always"`: every page lives at `/{locale}/...` (e.g. `/en`, `/fr/projects`), and `/` 301-redirects to `/en`. This is what makes the non-English content crawlable/rankable. Config lives in `src/i18n/routing.ts` (the single source of truth for the locale list: `en`, `fr`, `ar`, default `en`).
- `src/i18n/navigation.ts` exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect` (from `createNavigation`). **In app code, import these from `@/i18n/navigation`, not `next/link` / `next/navigation`** — they take locale-free paths (`/projects`) and add the prefix automatically. `LanguageSwitcher.tsx` uses `router.replace(pathname, { locale })` to swap locale while staying on the same page.
- `src/middleware.ts` is just `createMiddleware(routing)` — it handles the redirect + locale detection. Its `matcher` excludes `/api`, `_next`, and any path with a file extension (so `/robots.txt`, `/sitemap.xml`, `/public` assets pass through).
- `src/i18n/request.ts` resolves the locale from the URL segment (`requestLocale`), not a cookie. It **merges each locale's messages over the English defaults** (`withFallback`) so a missing key/namespace falls back to English instead of throwing — important because `messages/fr.json` is incomplete (e.g. its `ProjectsPage` has only the UI strings, so the projects list itself falls back to English).
- Per-page SEO: `src/lib/seo.ts` `localeAlternates()` builds the canonical + hreflang (`en`/`fr`/`ar`/`x-default`) alternates each `generateMetadata` returns. `metadataBase` is set once in `[locale]/layout.tsx`, so alternate URLs can be relative.
- `ar` renders RTL (`dir="rtl"` set in `[locale]/layout.tsx` from the locale param).
- Translation JSON lives in `messages/{en,ar,fr}.json` — `en.json` is the most complete and acts as the fallback; keep the others in sync when adding keys. There's a `Metadata` namespace (`.home` / `.projects` → `title`/`description`) consumed by `generateMetadata`.

### Site config, theming, styling

- `src/lib/site.ts` — central constants: `PROFILE_IMAGE` (hero avatars, About polaroid, postcard stamp), `HERO_MOCKUP_IMAGE` (the "on my screen" polaroid in About), `SOCIALS`. The images are `string | null`; when `null`, the frames render empty instead of a `next/image`.
- **Design: a "notebook" look** — a sheet of ruled paper (`<main data-sheet class="sheet">` in `[locale]/layout.tsx`) lying on a grey grid desk (the `body` background). Everything on the sheet looks stuck on: washi tape, perforated stamps, polaroids, sticky notes, folder tabs, hand-drawn SVG doodles.
- Theme is light-only and forced: `ThemeProvider` uses `forcedTheme="light"`. `next-themes` is wired up but there is no dark mode.
- `src/app/globals.css` defines the tokens via Tailwind 4's `@theme inline`: palette `paper`, `paper-line`, `ink`/`ink-soft`/`ink-faint`, `desk`, and the sticker colours `sun`, `cream`, `leaf`, `mint`, `bubblegum`, `blush`, `cobalt`, `sky`, `tangerine` (use `bg-sun`, `text-ink`, … rather than raw Tailwind colours). Fonts: `font-sans` Inter (headlines/body), `font-hand` Gochi Hand (handwriting), `font-note` Caveat (small scribbles), `font-mono` Space Mono (typewriter labels), `font-pixel` Jersey 15 (the name). Under `[lang="ar"]` the stacks switch to IBM Plex Sans Arabic / Marhey / Aref Ruqaa, and letter-spacing is reset (it breaks Arabic joins). next/font variables are set on `<html>` so these stacks resolve.
- It also has component classes (`.sheet`, `.tape`, `.stamp`, `.polaroid`, `.sticky-note`, `.marker`, `.airmail`, `.ruled-field`, `.folder`/`.folder-tab`, `.wavy-rule`) and entrance animations (`.anim-pop`, `.anim-rise`, `.anim-draw` for SVG paths with `pathLength={1}`, staggered with a `--d` CSS variable).
- Reusable notebook pieces live in `src/components/notebook/`: `Doodles.tsx` (hand-drawn SVGs, googly eye, postmark…), `Tape`, `SectionHeading` (margin note + boxed label + headline), `SectionLink`, `withEmoji`.
- The ruled lines are `--rule: 32px` apart. `src/hooks/useRuleSnap.ts` pads a handwritten block so its baselines land on those lines (used by the About note); keep its `RULE` constant in sync.
- `package.json` has a `browserslist` matching Tailwind v4's minimum browsers. Without it Next's old default targets make Turbopack (dev) transpile logical properties and silently drop their responsive variants (`md:start-*`, `md:border-e-*`…), so dev and prod render differently.
- `components.json` configures shadcn/ui (style: `new-york`, base color `neutral`, icons via `lucide-react`). Generated primitives live in `src/components/ui/` (`badge`, `button`, `card`, `dropdown-menu`, `sonner`); their tokens are mapped onto the notebook palette.
- Animations: CSS `.anim-*` classes for the hero (they run before hydration); GSAP (`src/lib/gsap.ts`) for scroll reveals via `src/hooks/useReveal.ts`, which animates every `[data-reveal]` element inside a section. GSAP drives `transform`, so hover effects on revealed elements must transition `translate`/`rotate`/`scale` (Tailwind 4's individual properties), never `transform`/`all`. Respect `prefers-reduced-motion` (globals.css and both hooks already do).

### Contact form

- `src/app/api/contact/route.ts` — POST route that sends mail via `nodemailer` using Gmail SMTP with `EMAIL_USER`/`EMAIL_PASS` env vars. No input validation/sanitization currently exists in this route — be careful if extending it.

### Analytics

- `src/providers/PostHogProvider.tsx` initializes PostHog client-side, gated on `NEXT_PUBLIC_POSTHOG_KEY`/`NEXT_PUBLIC_POSTHOG_HOST` env vars being present.

### Dead / legacy files

Several files are unused leftovers from earlier redesigns (they still use classes from the old dark theme that no longer exist) — don't build on top of them without checking they're actually imported first: `src/components/Projects.tsx` + `SectionHeader.tsx` (superseded by `ProjectsSection.tsx`), `ClientsMarquee.tsx`, `ToolsAndTechnologies.tsx`, `theme-toggle.tsx`, `FloatingOrbs.tsx`, `GridBackground.tsx`, `src/assets/*` (superseded by `public/projects/*`, which is what components actually reference).

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`).
