/*
 * Reveals a project page: header on mount, spreads on scroll.
 * ------------------------------------------------------------------------------
 * Renders the project pages' existing <section.inner-wrapper.project> and adds
 * nothing to the DOM, which is the point - it exists so ProjectPage and
 * NextProject can stay server components while this subtree gets a ref.
 *
 * Two separate behaviours. The title and credits rise together on mount, one
 * GROUP_STAGGER after the other, like the sections on /me. Each image in
 * .content waits for Motion's inView instead, so a spread animates as it
 * arrives rather than playing to an empty room while it is still below the
 * fold.
 *
 * The images do not wait on document.fonts.ready and the header does. Fonts
 * cannot shift an image, but a slow webfont could let the first spread scroll
 * past before its observer was ever attached, so the observers go up
 * immediately and only the type waits.
 *
 * Start states are `opacity: 0` in global.scss rather than `visibility`,
 * because an image is revealed *by* animating opacity and a hidden element
 * cannot be faded in. Neither property affects layout, which matters as much
 * here as anywhere: .project-title is `position: sticky; z-index: -1` and the
 * spreads scroll over it, so anything that changed its box would be obvious.
 *
 * The rise uses the standalone `translate` property, not Motion's `y`. `y` is
 * written into `transform`, which *replaces* whatever transform the stylesheet
 * already set - and canadian-business centres one absolutely-positioned spread
 * with `transform: translateX(-50%)` at the desktop-15 breakpoint. Animating
 * `y` wiped that centring and pushed the page 71px wider than production.
 * `translate` is its own property and composes with `transform` instead of
 * overwriting it, so a stylesheet is free to keep using transforms for layout.
 *
 * The <noscript> rule must list the same selectors as the global.scss block.
 * Change one and change the other, or a visitor without JS gets a blank page.
 */

'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, inView } from 'motion';
import { GROUP_STAGGER, TRAVEL, SPRING, SCROLL_TRAVEL, SCROLL_AMOUNT } from '@/lib/reveal';

const HIDDEN = '.project-title, .project-credits, .content img';

export default function ProjectReveal({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = ['.project-title', '.project-credits']
      .map((selector) => section.querySelector(selector))
      .filter(Boolean);
    const images = [...section.querySelectorAll('.content img')];

    /* Reduced motion: show everything at once. A scroll-triggered fade is still
     * motion tied to scrolling, which is the thing the preference is asking us
     * not to do, so this drops the reveal rather than softening it. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [...header, ...images].forEach((el) => {
        el.style.opacity = '1';
      });
      return;
    }

    let cancelled = false;
    const playing = [];
    const stops = [];

    images.forEach((image) => {
      stops.push(
        inView(
          image,
          () => {
            playing.push(
              animate(
                image,
                { opacity: [0, 1], translate: [`0px ${SCROLL_TRAVEL}px`, '0px 0px'] },
                SPRING
              )
            );
          },
          { amount: SCROLL_AMOUNT }
        )
      );
    });

    document.fonts.ready.then(() => {
      if (cancelled || !section.isConnected) return;
      playing.push(
        animate(
          header,
          { opacity: [0, 1], translate: [`0px ${TRAVEL}px`, '0px 0px'] },
          { ...SPRING, delay: stagger(GROUP_STAGGER) }
        )
      );
    });

    return () => {
      cancelled = true;
      playing.forEach((animation) => animation.stop());
      stops.forEach((stop) => stop());
    };
  }, []);

  return (
    <section className="inner-wrapper project" ref={sectionRef} data-project-reveal>
      {children}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>${HIDDEN.split(', ')
            .map((selector) => `[data-project-reveal] ${selector}`)
            .join(',')}{opacity:1!important}</style>`
        }}
      />
    </section>
  );
}
