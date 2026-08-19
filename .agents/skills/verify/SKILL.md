---
name: verify
description: How to build, run, and visually verify changes to the Stephanie Firka portfolio.
---

# Verifying changes in this repo

`master` is production. It deploys to Vercel and serves
**https://stephfirka.com** — so merging is shipping, and there is no staging
copy standing behind it.

There used to be a second reference: the site is a port of a Nuxt 2 original,
and while that original was still live, every change could be checked by
screenshotting both and diffing. That ended on 2026-08-19, when this codebase
took the domain over. **The old site is gone, and with it the only external
definition of "correct" this repo ever had.** What follows is what replaced it.

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
- Kill a stale server by PID first. A squatted `:3000` will happily serve an old
  build and make a verification run look like it passed.
- Requires Node 24 (`.nvmrc`, and `engines.node` in package.json).

## Visual checks

There is no baseline to diff against any more, so the comparison has to be one
you make yourself: **capture the page before your change and after it, and diff
those two.** Same server, same viewport, same DPR. `git stash` is usually the
cheapest way to get the "before".

Worth capturing at the `respond-to()` breakpoints rather than one convenient
width — 320 / 375 / 414 / 768 / 1024 / 1280 / 1440 / 1792
(`src/styles/abstracts/_mixins.scss`). Regressions hide at the boundaries, where
the project pages swap large `left`/`right` offsets for static positioning.

When capturing, two things reliably produce false results:

- **Scroll the page first.** Images lazy-load. Without walking the page and
  waiting for every `document.images` entry to report `complete`, the capture
  comes back short and you get a height difference that isn't real.
- **Capture at `deviceScaleFactor: 2`.** Every Retina display and every phone is
  2+, and hairline borders and antialiasing land differently at 1.

## What pixels never cover

- **`<head>`.** A screenshot cannot see metadata. An entire set of `og:` tags was
  dropped during the port and went unnoticed for days. Check by hand:
  `curl -s localhost:3000/tmu/ | grep -oE '<meta property="og:[^>]*>'`
- **The next-project chain.** Each project page names its successor by hand in
  its `next` prop; nothing derives it from the running order in `PROJECTS`
  (`components/ProjectList.jsx`), and the last page wraps back to the first.
  After any reorder, click the whole loop in a browser. A wrong hop leaves a
  project unreachable from the page before it, and **no build, lint or
  screenshot step catches that.**
- **`/golden-girls` audio.** It autoplays a hidden `<audio>`. A cold
  `page.goto()` to that URL always reports `paused: true` because there has been
  no user gesture — browser policy, not a bug. Land on `/` and click through.

## Regenerating the OG image

`public/seo/og-default.jpg` is a capture of the site's own home page — so it
lists the project names, and goes stale the moment that list changes. It was
last regenerated when Pavilion Project came out. If the home page changes,
regenerate it: screenshot `/` at **1600x840** with `deviceScaleFactor: 2`, then
downscale to 1200x630
(`sips -s format jpeg -s formatOptions 82 -z 630 1200 in.png --out out.jpg`).
Capturing at 1200x630 directly clips the lowest project name.

`og:image` is an absolute URL on `stephfirka.com`, so a newly regenerated card
only appears once the change is deployed — not on a preview build.
