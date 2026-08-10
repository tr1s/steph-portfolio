---
name: verify
description: How to build, run, and visually verify changes to the Stephanie Firka portfolio against production.
---

# Verifying changes in this repo

This site is a port of a Nuxt 2 site that is **still live at
https://stephfirka.com**. Production is the reference implementation: until the
DNS cutover, any rendering difference is a bug in this repo, not in production.

## Build / lint

- `npm run format:check` — Prettier. `npm run format` fixes.
- `npm run lint` — ESLint, `--max-warnings 0`. Warnings fail; that is deliberate,
  since the jsx-a11y and Next rules only ever report as warnings.
- `npm run build` — production build.

All three run in CI (`.github/workflows/ci.yml`) on every PR. Vercel does **not**
lint — Next 16 dropped build-time linting — so CI is the only gate.

## Run

- `npm run dev` for HMR, `npm run build && npm start` for the production server.
- Check whether one is already up before starting another:
  `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
- Requires Node 24 (`.nvmrc`, and `engines.node` in package.json). The old Nuxt
  site needed Node 12, which has no Apple Silicon build — if something demands
  Node 12 you are on the wrong branch.

## Visual parity (the important one)

`scripts/visual-parity/compare.mjs` screenshots every route locally and on
production and diffs them. Start the local server first, then:

```bash
npm i --no-save playwright pixelmatch pngjs && npx playwright install chromium
node scripts/visual-parity/compare.mjs
node scripts/visual-parity/compare.mjs --widths 1440,414 --routes /tmu/
```

Deps are intentionally not in package.json — this runs rarely and Playwright is
heavy. Routes and the production URL come from `src/lib/site.config.js`, so a new
page is picked up automatically.

Exits non-zero if anything differs. Diff images land in
`scripts/visual-parity/out/` (gitignored).

Node prints a `MODULE_TYPELESS_PACKAGE_JSON` warning when the script imports
`site.config.js`. Harmless — the package is not `"type": "module"`, and making it
one to silence a cosmetic warning in an occasional script isn't worth the blast
radius.

### Expected, non-zero differences

Since images gained `sizes` props, production and this site no longer fetch the
same files: production downscales one oversized original, this serves a
right-sized one. At 414px/DPR 2 that reads as up to ~0.2% differing pixels
(scattered inside photo areas, i.e. texture detail) and a 2px page-height delta
on `/top-hat` and `/canadian-business` from Next rounding resized dimensions to
integers. Layout, type and spacing are unaffected. Treat a change in _those_, or
any difference on the text-only routes (`/`, `/me`, `/golden-girls`), as a real
regression.

## Gotchas

These each produced a false result at least once. Trust them.

- **Diff at DPR 2** (the default). At DPR 1 production supersamples its
  oversized images while this site serves correctly-sized ones and draws them
  1:1, which reads as 0.1–0.6% noise plus a 1px page-height delta on two pages.
  Nobody views this at DPR 1 — every Retina display and phone is 2+.
- **Scroll before capturing.** Both sites lazy-load. Without walking the page and
  waiting for `document.images` to all report `complete`, the slower side reports
  a short height and you get a spurious SIZE MISMATCH. `compare.mjs` does this;
  ad-hoc scripts must too.
- **The widths are not arbitrary.** 320/375/414/768/1024/1280/1440/1792 are the
  exact breakpoints in `respond-to()` (`src/styles/abstracts/_mixins.scss`).
  Regressions hide at the boundaries, where project pages swap large
  `left`/`right` offsets for static positioning.
- **`/golden-girls` audio needs a click.** It autoplays a hidden `<audio>`. A
  cold `page.goto()` to that URL always shows `paused: true` because there has
  been no user gesture — that is browser policy, not a bug. Land on `/` and click
  the Golden Girls link, then assert. Production behaves identically.
- **`<head>` is not covered.** The parity script compares rendered pixels only.
  Metadata regressions are invisible to it — an entire set of `og:` tags was
  dropped during the port and went unnoticed for days. Check tags by hand:
  `curl -s localhost:3000/tmu/ | grep -oE '<meta property="og:[^>]*>'`

## Regenerating the OG image

`public/seo/og-default.jpg` is a capture of the site's own home page. If the home
page changes, regenerate it: screenshot `/` at **1600x840** with
`deviceScaleFactor: 2`, then downscale to 1200x630
(`sips -s format jpeg -s formatOptions 82 -z 630 1200 in.png --out out.jpg`).
Capturing at 1200x630 directly clips the last project name.
