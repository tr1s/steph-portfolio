/*
 * Visual parity check against production.
 * ------------------------------------------------------------------------------
 * Screenshots every route on a local server and on the live site, then diffs
 * them pixel by pixel. This site was ported from Nuxt 2 to be pixel-identical to
 * production, and this is the tool that proved it — 8 routes x 8 viewport widths
 * at 0 pixels differing. Keep using it for anything that touches rendering.
 *
 * Usage (from the repo root, with `npm start` already running):
 *
 *   node scripts/visual-parity/compare.mjs
 *   node scripts/visual-parity/compare.mjs --widths 1440,414 --routes /tmu/
 *   node scripts/visual-parity/compare.mjs --dpr 1 --keep
 *
 * Dependencies are deliberately NOT in package.json — this runs rarely and
 * Playwright is heavy. Install them for the session only:
 *
 *   npm i --no-save playwright pixelmatch pngjs && npx playwright install chromium
 *
 * Reading the output:
 *   0 px                 identical.
 *   a few hundred px     usually antialiasing on punctuation; investigate.
 *   SIZE MISMATCH        a layout change — a page got taller or shorter.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { siteConfig } from '../../src/lib/site.config.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
};

const LOCAL = arg('local', 'http://localhost:3000');
const LIVE = arg('live', siteConfig.url);
const WIDTHS = arg('widths', '320,375,414,768,1024,1280,1440,1792').split(',').map(Number);
const ROUTES = arg('routes', siteConfig.routes.join(',')).split(',');
/* DPR 2 by default. At DPR 1 production supersamples its oversized images while
 * this site renders correctly-sized ones 1:1, which shows up as sub-1% noise
 * that no real viewer sees — every Retina display and every phone is DPR 2+. */
const DPR = Number(arg('dpr', 2));
/* Loose enough to ignore JPEG/WebP recompression, tight enough to catch a
 * layout shift. */
const THRESHOLD = 0.25;

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'out');
fs.mkdirSync(outDir, { recursive: true });

/* Both sites lazy-load images. Without walking the full page first, whichever
 * one is slower reports a short scrollHeight and the diff is meaningless — this
 * produced several false failures before it was added. */
async function settle(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 500);
        }
      };
      step();
    });
  });
  await page
    .waitForFunction(() => Array.from(document.images).every((i) => i.complete), {
      timeout: 20000
    })
    .catch(() => {});
  /* The homepage titles animate in on a stagger that finishes around 2.3s.
   * Without this the screenshot lands mid-reveal and every run reports a
   * difference that isn't real. Motion compiles its springs to a linear()
   * easing and hands them to WAAPI, so getAnimations() sees them. */
  await page
    .waitForFunction(
      () =>
        document.getAnimations().every((a) => a.playState === 'finished' || a.playState === 'idle'),
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.waitForTimeout(700);
}

const browser = await chromium.launch();
let failures = 0;

for (const width of WIDTHS) {
  for (const route of ROUTES) {
    const name = (route.replaceAll('/', '') || 'home') + `-${width}`;
    const files = {};

    for (const [label, base] of [
      ['live', LIVE],
      ['local', LOCAL]
    ]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        deviceScaleFactor: DPR
      });
      await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
      await settle(page);
      files[label] = path.join(outDir, `${name}-${label}.png`);
      await page.screenshot({ path: files[label], fullPage: true });
      await page.close();
    }

    const a = PNG.sync.read(fs.readFileSync(files.live));
    const b = PNG.sync.read(fs.readFileSync(files.local));

    if (a.width !== b.width || a.height !== b.height) {
      console.log(
        `${name.padEnd(28)} SIZE MISMATCH  live ${a.width}x${a.height}  local ${b.width}x${b.height}`
      );
      failures++;
      continue;
    }

    const diff = new PNG({ width: a.width, height: a.height });
    const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
      threshold: THRESHOLD,
      includeAA: false
    });
    const pct = ((n / (a.width * a.height)) * 100).toFixed(3);

    if (n > 0) {
      fs.writeFileSync(path.join(outDir, `${name}-diff.png`), PNG.sync.write(diff));
      failures++;
    } else if (process.argv.indexOf('--keep') === -1) {
      fs.unlinkSync(files.live);
      fs.unlinkSync(files.local);
    }
    console.log(`${name.padEnd(28)} ${pct}% (${n} px) of ${a.width}x${a.height}`);
  }
}

await browser.close();
console.log(
  `\nDPR ${DPR}. ${failures === 0 ? 'All routes identical.' : `${failures} route(s) differ — see ${outDir}`}`
);
process.exit(failures === 0 ? 0 : 1);
