<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

Content below this line is ours. `next dev` only rewrites the block above it.

## File header comments

Every file opens with a header block — components, stylesheets, config, scripts.
Title line first, then a divider, then what the file owns and anything worth
knowing before editing it.

```jsx
/*
 * Shared shell for the five project pages.
 * ------------------------------------------------------------------------------
 * Title, credits, the image column, then the next-project block. Reproduces the
 * markup of the old .vue pages exactly.
 *
 * `pageClass` namespaces each page's own stylesheet. It stands in for Vue's
 * `<style scoped>`, which raised specificity the same way.
 */
```

- **Above the divider** — what this file _is_, in one short phrase.
- **Below the divider** — what it owns, plus the gotchas a future editor needs.
  Prefer the non-obvious: why a component is a client component, which selector
  in `global.scss` reaches into this markup, what breaks if a value changes.
- A component and its `page.scss` share the title line, but each body describes
  its own concern — the stylesheet explains styling decisions, not the API.
- Keep headers current. If a file's job changes, update its header in the same
  edit.
- Wrap at 80 columns. The divider is 78 dashes; copy it from a neighbouring file.
- Don't restate the filename or narrate the code. If the header would only say
  "the Header component", it isn't earning its place.
- Files with a `'use client'` directive put the header **above** it. A leading
  comment does not break the directive prologue — verified in the built output.

Convention adopted from the DoReal codebase.

## Always give `next/image` a `sizes` prop

**Every `<Image>` added to this project must have a `sizes` prop**, built with
`sizesFor()` from `src/lib/image-sizes.js`:

```jsx
import { sizesFor } from '@/lib/image-sizes';

// max-width: 308px in the page's .scss
<Image src={photo} alt={alt} placeholder="blur" sizes={sizesFor(308)} />;
```

Pass the `max-width` that image gets in its page's stylesheet. If an image has
no `max-width` and is genuinely full-bleed, use `sizes="100vw"`.

**Why it matters here:** without `sizes`, next/image emits _no srcset at all_
and serves one oversized file to every device. Before this was fixed, a phone
downloaded the same `w=1920`/`w=3840` images as a desktop — 4.71 MB across the
five project pages at both 414px and 1440px. With `sizes` it is 1.30 MB on
mobile and 2.22 MB on desktop.

Also give every content image `placeholder="blur"`, which works because images
are imported statically from `src/images/`.

## Animation: splitText must not break the type

The homepage title reveal (`src/components/ProjectList.jsx`) uses Motion+'s
`splitText`. **Always pass `preserveHyphens: true`.**

`splitText` gives every fragment it creates `display: inline-block`, which ends
the text run — so kerning pairs and ligatures are lost across the split. Without
the flag it builds `.split-char` spans _even when you only animate `words`_, and
at 1440px that widened "Toronto Life" by 31px (the `To` kern plus a broken `fi`
ligature) and "Top Hat" by 22px. `preserveHyphens: true` makes it set each
word's `innerHTML` in one piece instead, and parity returns to 0px.

Animate `words`, never `chars`, for the same reason. And animate only `opacity`
and `transform`: `.wrapper` is a flex column with `justify-content:
space-between`, so anything affecting the list's height drags the footer with
it. Hide with `visibility`, never `display`.

## Animation: rise with `translate`, not Motion's `y`

Motion's `y` (and `x`, `scale`, …) are written into the element's `transform`,
which **replaces** whatever transform the stylesheet set. `canadian-business`
centres one absolutely-positioned spread with `transform: translateX(-50%)` at
`desktop-15`; animating `y` wiped that centring and pushed the page 71px wider
than production. The parity harness caught it as a SIZE MISMATCH.

Animate the standalone `translate` property instead — it composes with
`transform` rather than overwriting it, so the stylesheets stay free to use
transforms for layout:

```js
animate(el, { opacity: [0, 1], translate: ['0px 32px', '0px 0px'] }, SPRING);
```

Timing for every reveal lives in `src/lib/reveal.js` — change it there, not in a
component. Two knobs carry the pacing: `HOME_STAGGER` spaces the five homepage
titles, `GROUP_STAGGER` the sections on `/me` and the header on a project page.
They are separate because five items need a tighter gap than three to finish
arriving at the same felt pace.

`motion-plus-dom` is depended on directly rather than the `motion-plus` wrapper.
Both are published by Motion; the wrapper is only distributed through the
Motion+ token registry, and `npm i`-ing that URL writes the licence token into
`package.json` and the lockfile — which this repo, being public, would publish.

## Verifying visual changes

This site was ported from Nuxt 2 to be pixel-identical to the original, and a
screenshot-diff harness proved it. That harness is gone: it compared against the
live Nuxt site, and since 2026-08-19 this codebase _is_ the live site, so it had
nothing left to compare against.

So when changing anything that affects rendering, capture the page **before and
after your own change** and diff those, rather than eyeballing it. Two things
repeatedly caused false results:

- **Lazy loading.** Scroll the whole page and wait for `document.images` to all
  report `complete` before capturing, or the capture comes back short.
- **Device pixel ratio.** Capture at `deviceScaleFactor: 2`. Hairlines and
  antialiasing land differently at 1, and no real viewer is at 1.

## Testing interactive behaviour

Reproduce the path a user actually takes. `/golden-girls` autoplays audio, and
a cold `page.goto()` to it will always show as blocked because there has been
no user gesture — land on `/` and click through instead.
