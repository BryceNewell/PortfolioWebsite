# Bryce Newell — Portfolio

The portfolio website of **Bryce Newell**, software engineer and game developer.

Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**, **TypeScript 5** and **ESLint 9**, and
exported as fully static HTML so it can be hosted anywhere (it deploys to GitHub Pages).

## Highlights

- **Procedural hero.** A live seascape drawn to a 2D canvas: a ten-octave Gerstner ocean with per-line LOD and
  FBM-carved islands, all derived from one seed. Visitors can re-roll the world. It pauses off screen, adapts quality
  to the device and renders a still frame under `prefers-reduced-motion`.
- **Seven case-study pages** (`/projects/[slug]`) generated from typed data, with a keyboard-accessible image
  lightbox and a click-to-load YouTube embed (no third-party requests until asked).
- **Accessible by default.** Semantic landmarks, skip link, focus styles, zero axe-core violations (WCAG 2.1 AA) on the home, project and policy pages, full
  content without JavaScript, reduced-motion support.
- **Fast.** No client-side data fetching, self-hosted variable fonts, pre-optimised WebP images (17 MB → 1.8 MB).
- **SEO ready.** Per-page metadata, Open Graph / Twitter cards, JSON-LD `Person`, sitemap and robots.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Static export to `out/`                      |
| `npm start`         | Serve the exported `out/` folder locally     |
| `npm run lint`      | ESLint 9 (flat config, `eslint-config-next`) |
| `npm run typecheck` | TypeScript 5 in strict mode                  |
| `npm run format`    | Prettier                                     |

## Editing content

All copy lives in typed data files, so no component edits are needed for routine updates:

| File                                | Content                                                 |
| ----------------------------------- | ------------------------------------------------------- |
| `src/lib/site.ts`                   | Name, contact details, social links, navigation         |
| `src/data/projects.ts`              | Every project / case study (text, images, facts, links) |
| `src/data/experience.ts`            | The experience timeline                                 |
| `src/data/skills.ts`                | Skill groups and ways of working                        |
| `src/data/privacy-policy.json`      | Holi-Track privacy policy (structured blocks)           |
| `src/components/sections/Stats.tsx` | The "by the numbers" strip                              |

To add a project: add an entry to `projects` in `src/data/projects.ts`, drop optimised images into `public/images/`
and register their size in `src/data/image-meta.json`. The page, card, sitemap entry and prev/next links appear
automatically. A project can also carry `links` (e.g. a GitHub repository) which are shown on its page.

## Design system

Design tokens are defined once in `src/app/globals.css` (`@theme`): an ink palette, the **ember** orange taken from the
original logo, a **tide** teal accent, Bricolage Grotesque (display), Hanken Grotesk (text) and JetBrains Mono
(labels). Reusable classes (`.btn`, `.chip`, `.spotlight`, `.frame`, `.prose-site`, `.eyebrow`) sit in the
components layer.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` lints, type-checks, builds and publishes `out/` on every push to `main`.

1. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
2. Push to `main`. The workflow works out the base path automatically (`/<repo>` for project sites, empty for
   `<user>.github.io`).
3. Using a custom domain? Set the repository variable `SITE_URL` (for example `https://example.com`) and leave
   `BASE_PATH` empty.

For a manual build under a sub-path:

```bash
NEXT_PUBLIC_BASE_PATH=/PortfolioWebsite NEXT_PUBLIC_SITE_URL=https://brycenewell.github.io/PortfolioWebsite npm run build
```

### Legacy URLs

The previous site's pages (`kachiku.html`, `SEA.html`, `Library.html`, …) are kept as tiny redirect stubs in
`public/` so old links and bookmarks keep working. `privacy-policy.html` keeps the same URL because the route is
exported as `privacy-policy.html`.

## Project structure

```
src/
  app/                 routes: /, /projects/[slug], /privacy-policy, 404, sitemap, robots
  components/
    hero/              procedural scene renderer (scene.ts) and its React wrapper
    sections/          home page sections
  data/                typed content
  lib/site.ts          site constants and helpers
public/
  images/              optimised WebP project imagery
  brand/               original logo
```
