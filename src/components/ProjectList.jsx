/*
 * The four project titles, revealed on a stagger.
 * ------------------------------------------------------------------------------
 * Each title is split into words by Motion+'s splitText, then animated up on a
 * spring. Two rhythms are nested: words cascade inside a title every
 * PART_STAGGER, and each whole title is pushed back by HOME_STAGGER via
 * stagger()'s `startDelay`. Both live in lib/reveal.js - tune the reveal there,
 * not here. HOME_STAGGER is quicker than the GROUP_STAGGER the other pages use,
 * because a run of titles at the same spacing takes too long to finish
 * arriving.
 *
 * Words, not characters, and that is not a style preference. splitText gives
 * every fragment `display: inline-block`, which ends the text run - so a
 * per-character split loses kerning pairs and ligatures. Measured at 1440px it
 * widened "Toronto Life" by 31px (the `To` kern plus a broken `fi` ligature)
 * and "Top Hat" by 22px, against a site whose whole brief is to stay
 * pixel-identical to production.
 *
 * `preserveHyphens: true` is what actually prevents that. Without it splitText
 * builds .split-char spans even when only `words` are animated, and the type
 * breaks anyway; the flag makes it set each word's innerHTML in one piece
 * instead. It is named for its other effect, but this is the one that matters
 * here. Leaving `chars` unused is deliberate - do not reach for it.
 *
 * Only `opacity` and `transform` are animated, and the list is hidden with
 * `visibility` rather than `display`. All three preserve layout, which matters
 * because .wrapper is a flex column with justify-content: space-between - any
 * change to this list's height would drag the footer with it, and the footer is
 * meant to sit exactly where it always has.
 *
 * `document.fonts.ready` is load-bearing, not defensive. fonts.js runs with
 * adjustFontFallback: false, so there is a real fallback -> Vegawanty swap; split
 * before it lands and every character is measured against the wrong metrics.
 * It resolves even when a font fails to load, so it cannot hang the reveal.
 *
 * No `will-change` on .split-char, deliberately - the Motion+ examples add it,
 * but that would promote ~60 compositor layers on a page that is otherwise
 * static. Add it only if profiling shows dropped frames.
 *
 * splitText sets aria-label on the <a> from its original text, so the accessible
 * name survives the split and screen readers do not spell the titles out.
 */

'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus-dom';
import NavLink from './NavLink';
import { HOME_STAGGER, PART_STAGGER, TRAVEL, SPRING, REDUCED_FADE } from '@/lib/reveal';

/* Stephanie's order, not alphabetical. This list is the site's running order:
 * the `next` block at the foot of each project page follows it and wraps from
 * the last title back to the first, so reordering here means rewiring those
 * too. */
const PROJECTS = [
  { href: '/toronto-life', label: 'Toronto Life' },
  { href: '/tmu', label: 'TMU' },
  { href: '/canadian-business', label: 'Canadian Business' },
  { href: '/top-hat', label: 'Top Hat' }
];

export default function ProjectList() {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let cancelled = false;
    const playing = [];

    document.fonts.ready.then(() => {
      // A fast click away from home can unmount this before the fonts resolve.
      if (cancelled || !list.isConnected) return;

      /* Reduced motion: no split at all. Per-character movement is precisely
       * what the preference exists to suppress, so this degrades to a plain
       * fade rather than to nothing - gentler, not zero. */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        playing.push(animate(list, { opacity: [0, 1] }, REDUCED_FADE));
        list.style.visibility = 'visible';
        return;
      }

      list.querySelectorAll('a').forEach((title, index) => {
        const { words } = splitText(title, { preserveHyphens: true });
        playing.push(
          animate(
            words,
            { opacity: [0, 1], y: [TRAVEL, 0] },
            { ...SPRING, delay: stagger(PART_STAGGER, { startDelay: index * HOME_STAGGER }) }
          )
        );
      });

      // After animate(), so the opacity: 0 keyframe is already applied and the
      // titles cannot flash at full opacity for a frame before starting.
      list.style.visibility = 'visible';
    });

    return () => {
      cancelled = true;
      playing.forEach((animation) => animation.stop());
    };
  }, []);

  return (
    <>
      <ul className="projects" ref={listRef}>
        {PROJECTS.map(({ href, label }) => (
          <li key={href}>
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>
      {/* Without JS nothing ever flips `visibility`, which would leave the
          homepage blank. An !important stylesheet rule outranks the inline
          style the effect sets, so this is safe to leave in place. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: '<style>.projects { visibility: visible !important; }</style>'
        }}
      />
    </>
  );
}
