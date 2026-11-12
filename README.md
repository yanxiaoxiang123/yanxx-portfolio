# yanxx portfolio

晏晓翔的中英双语个人主页。个人介绍、项目案例、教育与实习经历，以及研究代码入口。

Built with Next.js 16 App Router, React, TypeScript and GSAP. Static export; no backend, database, CMS or runtime secrets.

## Local use

```bash
npm ci
```

```bash
npm run dev
```

Chinese: http://localhost:3000/zh/ — English: http://localhost:3000/en/

## Production preview

```bash
npm run build
```

```bash
npm run preview
```

Open http://localhost:4173/zh/ . Build output is `out/`. The build normalizes nested Next segment payload names to dotted aliases, so client navigation also works on ordinary static hosts when built on Windows. No server rewrite is needed for those payloads.

## Update content

- `src/data/profile.ts`: introductions, education, internship, research and contact email in both languages.
- `src/content/projects/*.zh.md` and `*.en.md`: project metadata and Markdown case studies. Keep `translationKey`, `slug`, image and factual details aligned across languages.
- `public/images/*.webp`: optimized artwork.
- Current routes: `/zh/`, `/en/`, localized `/about/`, `/projects/`, and `/projects/{backing,patent,logistics}/`.
- Technical or personal writing can be added when real content is available. No empty blog or photo placeholders are published.

## Motion and artwork

The current version uses native scrolling, a scroll-linked expanding image window and an interactive project index. `prefers-reduced-motion` shows the ordinary static composition. No wheel capture or mandatory intro playback.

Paper imagery was generated with Magpie. The paper plane comes from 翔 in the owner's name; concept covers are not product screenshots. `motion/hero/` records the Oil Motion concept, budget and status. **There is no generated paper-unfolding video in this release:** the configured video provider rejected generation for account-plan limits, and the owner chose to proceed with the front-end scroll version.

Erode by Indian Type Foundry, served through the official [Fontshare](https://www.fontshare.com/fonts/erode) CSS API rather than bundling font binaries in this public repository. Native Chinese serif fallbacks cover Chinese glyphs and the page remains readable if the font CDN is unavailable.

## Checks

```bash
npm test
```

```bash
npm run typecheck
```

```bash
npm run lint
```

```bash
npm run build
```

```bash
npm run check:export
```

Source metrics are attributed to project/resume records, not independently reproduced here. Research links retain their reproducibility and clinical-validation limitations.

## Publication boundary

Original resume PDFs under `docs/简历/` remain local and are ignored by Git and never copied into `out/`. No phone number or WeChat identifier is published until the owner supplies the exact public choice. Large artwork masters, local QA output, credentials and dependencies are excluded from version control.

This stage provides local preview and a public source repository. No domain, HTTPS, GitHub Pages or remote server deployment has been configured.
