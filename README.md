# Bryce Newell — Portfolio

The portfolio website of **Bryce Newell**, software engineer and game developer.

Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**, **TypeScript 5** and **ESLint 9**, and
exported as fully static HTML and hosted on **Cloudflare** (Workers static assets) at
**https://brycenewell.co.uk**.

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

## Deployment (Cloudflare)

The site is served by a Cloudflare Worker with static assets (`wrangler.jsonc`), which uploads the exported `out/`
folder and attaches the custom domain `brycenewell.co.uk`. There is no server code to run.

| File                | Purpose                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `wrangler.jsonc`    | Worker name (must match the Worker's name in the dashboard), assets directory (`./out`), 404 handling and the custom domain |
| `public/_headers`   | Security headers and long-lived caching for fingerprinted assets and images                                                 |
| `public/_redirects` | 301s from the old `*.html` URLs to the new routes                                                                           |

### One-time setup

1. **Domain on Cloudflare.** Add `brycenewell.co.uk` to your Cloudflare account (Websites → Add a site) and point the
   domain's nameservers at Cloudflare at your registrar. The custom domain in `wrangler.jsonc` only works for zones
   that are on your account.
2. **Connect the repository (recommended).** Workers & Pages → Create → Import a repository → pick this repo, then:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Production branch: `master` (this repository's default branch)

   Every push to `master` then builds and deploys automatically, and other branches get preview builds. Cloudflare reads
   the Node version from `.node-version`.

3. **Redirect `www` to the apex (optional).** Add a DNS record for `www` (proxied, any placeholder IP such as
   `192.0.2.1`) and a Redirect Rule: _If hostname equals `www.brycenewell.co.uk` → Dynamic redirect to
   `concat("https://brycenewell.co.uk", http.request.uri.path)`, 301, preserve query string._

### Troubleshooting: pushes are not building

1. **Worker name must match.** `name` in `wrangler.jsonc` (currently `bryce-newell-portfolio`) has to equal the Worker's
   name in the dashboard, or the deploy step fails.
2. **Git connection.** Workers & Pages → your Worker → Settings → Builds should show this repository as connected.
3. **Branch control.** In the same panel, the production branch must be `master`. Pushes to other branches only build
   if "Builds for non-production branches" is on.
4. **GitHub access.** GitHub → Settings → Applications → _Cloudflare Workers and Pages_ → Configure, and make sure this
   repository is in its repository access list.
5. **Build log.** Your Worker → Deployments (or Builds) shows each build and its log. Build command `npm run build`,
   deploy command `npx wrangler deploy`, root directory `/`.

### Deploying by hand

```bash
npx wrangler login        # once
npm run deploy            # builds, then wrangler deploy
```

### Previewing locally in the Workers runtime

```bash
npm run preview           # builds, then wrangler dev at http://localhost:8787
```

`npm start` serves `out/` with a plain static server if you just want to look at the build.

### Legacy URLs

The previous site's pages (`kachiku.html`, `SEA.html`, `Library.html`, …) are 301-redirected to their new routes by
`public/_redirects`. `/privacy-policy.html` keeps working too: it is redirected to `/privacy-policy`.

### Preview domains

Canonical URLs, the sitemap and social cards use `https://brycenewell.co.uk`. For a preview build on another
domain, set `NEXT_PUBLIC_SITE_URL` at build time.

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
  _headers, _redirects Cloudflare headers and legacy redirects
wrangler.jsonc         Cloudflare Worker (static assets) config
```
