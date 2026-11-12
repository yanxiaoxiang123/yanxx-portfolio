# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline. Steps use checkbox syntax.

**Goal:** Build yanxx's bilingual Next.js portfolio with a scroll-driven paper-unfolding film and publish source to GitHub.

**Architecture:** Next App Router statically exports Chinese and English pages. Markdown stores projects; limited client islands handle media and project interaction. Build locally, deploy later.

**Tech Stack:** Next.js, React, TypeScript, CSS, GSAP/ScrollTrigger, gray-matter, remark, Oil Motion and Magpie assets.

**Spec:** The approved design is recorded in `../specs/2026-11-12-portfolio.md`.

## Global Constraints

- Core content Chinese and English; no CMS, database, server actions or runtime secrets.
- Original resume PDFs stay local and outside Git history and build output.
- Native scrolling; static readable fallback; reduced-motion support.
- Name-derived paper-plane unfolding is conceptual artwork, not a claimed personal hobby.
- Only verified source facts; user-authorized resume metrics remain attributed and not independently reproduced.
- Local preview and public GitHub source; no server login, domain or production deployment.

## Review Focus

- Missing/unknown language and content slugs must not produce invalid navigation.
- Language switching must preserve the current project.
- Media failure and reduced motion must leave content readable without excessive blank scroll.
- Fast reverse scroll and React remount must not leave stale seek jobs/listeners.
- Original PDFs, secrets and large media masters must not enter source commits or export.

## Task 1: Bilingual static content and routes

**Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `src/lib/i18n.ts`, `src/lib/content.ts`, `src/content/projects/*.md`, `tests/content.test.ts`.
**Interfaces:** `Locale = 'zh' | 'en'`; `isLocale(value: string): value is Locale`; `localizedPath(locale: Locale, path?: string): string`; `getProjects(locale: Locale): Project[]`; `getProject(locale: Locale, slug: string): Project | undefined`.

- [ ] Write behavior tests for language paths, unknown languages and bilingual project correspondence.
- [ ] Run `npm test`: observe missing/incorrect behavior before implementation.
- [ ] Implement content parsing, safe paths, types and static route enumeration.
- [ ] Run `npm test` and `npm run typecheck`: both pass.

## Task 2: Complete the static visual experience

**Files:** `src/app/`, `src/components/Header.tsx`, `Footer.tsx`, `ProjectShowcase.tsx`, `src/styles/global.css`, `public/images/`.
**Consumes:** Task 1 content and path interfaces.
**Produces:** Fully readable localized home, about, project list/details, root entry and branded 404.

- [ ] Record material inventory, claims, copy deck and direction draw.
- [ ] Reuse inspected existing concept images; generate missing hero artwork using Magpie.
- [ ] Implement home first, then project and about routes, with direct links and semantic HTML.
- [ ] Verify actual desktop and mobile rendering, keyboard operation and language-preserving navigation.

## Task 3: Paper motion and focused project interaction

**Files:** `motion/hero/source/`, `motion/hero/build/`, `public/media/hero/`, `src/components/ScrollFilm.tsx`, `src/components/PageMotion.tsx`.
**Consumes:** Local page geometry, selected imagery and oil-motion controller.
**Produces:** Local scroll progress controls a single baked film; static poster remains the fallback.

- [ ] Write contract and brief using actual CSS size/DPR, budget before generation.
- [ ] Generate and inspect start/end intent frames, then a single short Pilot.
- [ ] Compile full-keyframe video and timeline from actual media.
- [ ] Integrate controlled latest-target seeking and lifecycle cleanup; check reverse, pause and failure.
- [ ] Verify reduced-motion renders readable static composition and ordinary page height.

## Task 4: Production verification and GitHub

**Files:** `.claude/launch.json`, `scripts/check-export.mjs`, `README.md`, source control metadata.

- [ ] Run `npm test`, typecheck, lint, production build and static export integrity check.
- [ ] Inspect production pages at 1440, 768 and 390 and all scroll progress contact sheets, fix measured failures.
- [ ] Fresh whole-change review; fix important findings and rerun relevant checks.
- [ ] Audit staged files and `out/` for original PDFs and secrets.
- [ ] Verify GitHub identity and destination; create public repository only if absent, never overwrite.
- [ ] Commit with required attribution and push; report actual URLs and verification limits.
