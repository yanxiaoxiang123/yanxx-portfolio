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
- `public/images/*.webp`: optimized concept renders (transparent WebP, no text baked in).
- Current routes: `/zh/`, `/en/`, localized `/about/`, `/projects/`, and `/projects/{backing,patent,logistics}/`.
- Technical or personal writing can be added when real content is available. No empty blog or photo placeholders are published.

## Motion and artwork

The page is one calm column: a fixed icon rail on desktop, a sticky record-style hero, white project cards, a journey list and a dark contact card. Motion is limited to scroll reveals, a word-by-word tagline reveal and hover lifts; `prefers-reduced-motion` renders the static composition. No wheel capture, no mandatory intro playback.

The visual system was rebuilt from a live study of [xiaoyanghu.com](https://xiaoyanghu.com/) with REA/Chrome DevTools capture: measured column width (900px), card radius (24px), type scale (24px section titles, 22px card titles, 16px body), `#f8fafc` page background, hairline row rules and the floating rail. Content and wording remain this site's own.

Every device image is a generated concept render, not a product screenshot: the retro computer in the hero, the laptop/phone pair for Backing, the tablet for the patent review tool and the laptop for logistics. Chinese and English text is never baked into an image. The generated PNG masters are not committed; only optimized WebP files live in `public/images/`.

Erode, the earlier display face, is gone. Inter (Latin) and Noto Sans SC (Chinese) load from the official Google Fonts CSS API, with Mynerve for the sticky note; system UI fonts cover the page if the CDN is unavailable.

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
