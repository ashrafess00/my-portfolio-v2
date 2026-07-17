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

- `src/app/page.tsx` — the entire homepage is one client component that stacks section components in order: `Navbar` → `IntroSection` → `AboutSection` → `ProjectsSection` → `SkillsSection` → `ContactSection` → `Footer`. Section anchors (`#about`, `#projects`, `#skills`, `#contact`) are used for in-page nav scrolling.
- `src/app/projects/page.tsx` — a standalone "archive" page with sidebar category filters (`web` / `42` / `automation`). Its project data comes from i18n translations (`ProjectsPage.projects` in `messages/*.json`), **not** from `src/data/projects.ts`.
- There is no `src/app/projects/[id]/page.tsx` (removed) — individual project detail pages don't currently exist; project links go straight to `websiteUrl`/`githubUrl`.
- `src/app/robots.ts` / `src/app/sitemap.ts` — static SEO routes, hardcoded to `https://achrafessaoudi.com`. Update both if routes change.

### Two separate project data sources — don't conflate them

- `src/data/projects.ts` — plain TS array, consumed by `ProjectsSection.tsx` (homepage showcase). Fields: `id, year, title, desc, tags, img, size, uri, websiteUrl, githubUrl, fullDesc`.
- `messages/{en,ar,fr}.json` under `ProjectsPage.projects` — used by `src/app/projects/page.tsx`. Fields: `title, description, category, image, id, technologies, liveUrl, githubUrl`.

When adding/editing a project, update both sources if it should appear in both the homepage showcase and the `/projects` archive.

### Internationalization (next-intl)

- Supported locales: `en`, `ar`, `fr` (see `src/i18n/request.ts` and `src/app/layout.tsx`, both hardcode this list). Note: `src/middleware.ts` allows a broader set (`en, es, fr, de, ar`) for the initial `Accept-Language` cookie guess, but only `en`/`ar`/`fr` are actually supported downstream — anything else falls back to `en`.
- Locale is stored in a `lang` cookie, read server-side via `next-intl`'s `getRequestConfig` and set client-side via the server actions in `src/lib/actions.ts` (`setCookie`/`getCookie`).
- `LanguageSwitcher.tsx` still references a `dr` locale code in its TS union that isn't in `next-intl`'s actual locale list — treat `en`/`ar`/`fr` as the real supported set.
- `ar` renders RTL (`dir="rtl"` set in `layout.tsx` based on locale).
- Translation JSON lives in `messages/en.json`, `messages/ar.json`, `messages/fr.json` — keep all three in sync when adding new translation keys.

### Site config, theming, styling

- `src/lib/site.ts` — central constants: `PROFILE_IMAGE`, `HERO_MOCKUP_IMAGE`, `SOCIALS`. `PROFILE_IMAGE`/`HERO_MOCKUP_IMAGE` are `string | null`; when `null`, components render a hand-built placeholder instead of an `<img>`/`next/image`.
- Theme is dark-only and forced: `ThemeProvider` in `layout.tsx` uses `forcedTheme="dark"`, `enableSystem={false}`. `next-themes` is wired up but light mode is not currently reachable in the UI.
- `src/app/globals.css` defines the design system as CSS custom properties consumed via Tailwind 4's `@theme inline` block (colors like `--color-accent`, `--color-surface`, `--color-hairline`; fonts `--font-serif`/`--font-display` → Fraunces, `--font-sans`/`--font-body` → Inter, `--font-mono` → Geist Mono). Prefer these semantic tokens (`bg-surface`, `text-accent`, `border-hairline`, etc.) over raw Tailwind color utilities to stay consistent with the rest of the UI.
- `components.json` configures shadcn/ui (style: `new-york`, base color `neutral`, icons via `lucide-react`). Generated primitives live in `src/components/ui/` (`badge`, `button`, `card`, `dropdown-menu`, `sonner`).
- Animations are done with GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`) — see `src/lib/gsap.ts` and per-section `useEffect(() => gsap.context(...))` patterns in components like `ProjectsSection.tsx`. `motion` (Framer Motion) is also a dependency and may be used in some components.

### Contact form

- `src/app/api/contact/route.ts` — POST route that sends mail via `nodemailer` using Gmail SMTP with `EMAIL_USER`/`EMAIL_PASS` env vars. No input validation/sanitization currently exists in this route — be careful if extending it.

### Analytics

- `src/providers/PostHogProvider.tsx` initializes PostHog client-side, gated on `NEXT_PUBLIC_POSTHOG_KEY`/`NEXT_PUBLIC_POSTHOG_HOST` env vars being present.

### Dead / legacy files

Several files are unused leftovers from earlier redesigns — don't build on top of them without checking they're actually imported first: `src/components/tobedeleted_*.tsx`, `src/components/LanguageSwitcher_old.tsx`, `src/components/Projects.tsx` (superseded by `ProjectsSection.tsx`), `src/components/FloatingOrbs.tsx`, `src/components/GridBackground.tsx` (both commented out in `page.tsx`), `src/assets/*` (superseded by `public/projects/*`, which is what components actually reference).

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`).
