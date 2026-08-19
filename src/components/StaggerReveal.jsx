/*
 * Wrapper that reveals a page's sections on a stagger.
 * ------------------------------------------------------------------------------
 * Renders the page's own root element and animates the sections named by
 * `groups` - a CSS selector list - up into place, one group after the next. Each
 * group's element children cascade inside it; a group with no element children
 * animates as a single piece. Timing comes from lib/reveal.js, shared with the
 * homepage.
 *
 * Only *direct* children of the root are considered, which is what makes a
 * selector like ".email" safe: on /me that class is on both the mailto link and
 * the tris.codes link nested inside .developer, and a plain querySelectorAll
 * would return the nested one as a fourth group and animate it twice.
 *
 * Nothing here touches the text. ProjectList splits its titles with Motion+'s
 * splitText because they are short single lines, but /me's intro is a wrapping
 * paragraph, and turning its words into inline-blocks risks a different line
 * break - which changes the page height, which moves the footer, since .wrapper
 * is a flex column with justify-content: space-between. Animating the blocks
 * that already exist gets the same reveal with no such risk.
 *
 * The root ships `visibility: hidden` in the SSR HTML and the effect flips it
 * once the animation's first keyframe is applied, so the sections cannot flash
 * at full opacity before they start. `visibility` and not `display`, because it
 * has to keep its box or the footer moves.
 *
 * `document.fonts.ready` is not needed for measurement here - unlike on home -
 * but it keeps the webfont swap from landing in the middle of the reveal.
 */

'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'motion';
import { GROUP_STAGGER, PART_STAGGER, TRAVEL, SPRING, REDUCED_FADE } from '@/lib/reveal';

export default function StaggerReveal({ className, groups, children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    const playing = [];

    document.fonts.ready.then(() => {
      // A fast click away can unmount this before the fonts resolve.
      if (cancelled || !root.isConnected) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        playing.push(animate(root, { opacity: [0, 1] }, REDUCED_FADE));
        root.style.visibility = 'visible';
        return;
      }

      [...root.children]
        .filter((el) => el.matches(groups))
        .forEach((group, index) => {
          // An <a> section has text but no element children - animate it whole.
          const parts = group.children.length ? [...group.children] : [group];
          playing.push(
            animate(
              parts,
              { opacity: [0, 1], y: [TRAVEL, 0] },
              { ...SPRING, delay: stagger(PART_STAGGER, { startDelay: index * GROUP_STAGGER }) }
            )
          );
        });

      root.style.visibility = 'visible';
    });

    return () => {
      cancelled = true;
      playing.forEach((animation) => animation.stop());
    };
  }, [groups]);

  return (
    <div className={className} ref={rootRef} data-reveal style={{ visibility: 'hidden' }}>
      {children}
      {/* Without JS nothing flips `visibility` and the page would be blank. An
          !important rule outranks the inline style above. It sits inside the
          root, not beside it, so it can never become an extra flex item of
          .wrapper and disturb the space-between distribution. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: '<style>[data-reveal] { visibility: visible !important; }</style>'
        }}
      />
    </div>
  );
}
