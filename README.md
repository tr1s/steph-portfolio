# steph-portfolio

> Stephanie Firka's portfolio website — [stephfirka.com](https://stephfirka.com)

Next.js 16 (App Router), React 19, Sass and Motion. Ported from Nuxt 2 / Vue 2
in August 2026; the old stack was pinned to Node 12, which has no Apple Silicon
build, so the project could no longer be run locally at all.

## Requirements

Node 24 (see `.nvmrc`).

```bash
nvm use
npm install
```

## Scripts

| Command                | What                                              |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload at `localhost:3000`    |
| `npm run build`        | Production build                                  |
| `npm start`            | Serve the production build                        |
| `npm run lint`         | ESLint, with `--max-warnings 0` (a warning fails) |
| `npm run lint:fix`     | ESLint with auto-fix                              |
| `npm run format`       | Prettier, writes changes                          |
| `npm run format:check` | Prettier, check only                              |

## Deployment

`master` is production. It deploys to Vercel and serves stephfirka.com, so
merging is shipping; there is no staging site. Pull requests get a Vercel
preview URL.

CI (`.github/workflows/ci.yml`) runs on every PR and on pushes to `master`:
Prettier check, ESLint, then a production build. It is the only automated gate —
Vercel's build does not run ESLint.

## Structure

| Path              | What                                                                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`        | One folder per route; each has `page.jsx` + its own `page.scss`. Also `layout.js`, `robots.js`, `sitemap.js` and the icons                                 |
| `src/components/` | `Shell` (layout), `Header`, `Footer`, `NavLink`, `ProjectPage`, `NextProject`, plus the reveal animations: `ProjectList`, `StaggerReveal`, `ProjectReveal` |
| `src/lib/`        | `site.config.js` (site identity + SEO defaults), `page-metadata.js`, `image-sizes.js`, `reveal.js` (animation timing)                                      |
| `src/styles/`     | `normalize` / `typography` / `global` / `components`, plus `abstracts/`                                                                                    |
| `src/images/`     | Project imagery, imported statically so `next/image` can optimize it                                                                                       |
| `src/fonts/`      | Vegawanty + Söhne, loaded via `next/font/local`                                                                                                            |
| `public/`         | Golden Girls audio, the default OG image, and `sw.js`                                                                                                      |

`public/sw.js` exists only to unregister the service worker the old Nuxt PWA
installed. It's served with `no-cache` (see `next.config.mjs`) and should stay.

### Styles

Sass variables, the `respond-to()` breakpoint mixin and the tint/shade helpers
are injected into every `.scss` file by `sassOptions.additionalData` in
`next.config.mjs` — the replacement for Nuxt's `@nuxtjs/style-resources`. Don't
import `abstracts` manually.

Page styles are plain global SCSS namespaced under a `.page-*` class rather than
CSS Modules, because `global.scss` targets this markup by name (`.me nav a`,
`.golden-girls footer a`, `.exact-active-link`, …). Hashed class names would
break those selectors. The `.page-*` wrapper reproduces the specificity bump
that Vue's `<style scoped>` used to provide.

### Animation

Page entrances use Motion plus Motion+'s `splitText`. Timing lives in
`src/lib/reveal.js`. The rules that keep the animations from shifting the
layout (`preserveHyphens: true`, animate `translate` rather than `y`) are in
`AGENTS.md`.

Motion+ comes from the public `motion-plus-dom` package, not the `motion-plus`
wrapper. The wrapper is only installable through a tokenised registry URL, and
installing it would write that licence token into `package.json` and the
lockfile of this public repo.

## Conventions

`AGENTS.md` holds the project's working rules: file header comments, the
required `sizes` prop on every `next/image`, the animation rules above, and how
to verify visual changes. `CLAUDE.md` just imports it.

The block at the top of `AGENTS.md` is written by `next dev` and gets re-added
if removed. Everything below it is ours. Set `agentRules: false` in
`next.config.mjs` to stop the generation.
