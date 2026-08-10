<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

Content below this line is ours. `next dev` only rewrites the block above it.

## Always give `next/image` a `sizes` prop

**Every `<Image>` added to this project must have a `sizes` prop**, built with
`sizesFor()` from `src/lib/image-sizes.js`:

```jsx
import { sizesFor } from '@/lib/image-sizes';

// max-width: 308px in the page's .scss
<Image src={photo} alt={alt} placeholder="blur" sizes={sizesFor(308)} />
```

Pass the `max-width` that image gets in its page's stylesheet. If an image has
no `max-width` and is genuinely full-bleed, use `sizes="100vw"`.

**Why it matters here:** without `sizes`, next/image emits *no srcset at all*
and serves one oversized file to every device. Before this was fixed, a phone
downloaded the same `w=1920`/`w=3840` images as a desktop — 4.71 MB across the
five project pages at both 414px and 1440px. With `sizes` it is 1.30 MB on
mobile and 2.22 MB on desktop.

Also give every content image `placeholder="blur"`, which works because images
are imported statically from `src/images/`.

## Verifying visual changes

This site was ported from Nuxt 2 to be pixel-identical to production. When
changing anything that affects rendering, screenshot against
`https://stephfirka.com` and diff, rather than eyeballing it.

Two things that repeatedly caused false results:

- **Lazy loading.** Scroll the whole page and wait for `document.images` to all
  report `complete` before capturing, or the live site reports a short height.
- **Device pixel ratio.** Diff at `deviceScaleFactor: 2`. At DPR 1 the live
  site supersamples oversized images while this one renders correctly-sized
  ones 1:1, which shows up as sub-1% noise that no real viewer sees.

## Testing interactive behaviour

Reproduce the path a user actually takes. `/golden-girls` autoplays audio, and
a cold `page.goto()` to it will always show as blocked because there has been
no user gesture — land on `/` and click through instead.
