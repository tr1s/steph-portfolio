/**
 * Builds the `sizes` attribute for a project image.
 *
 * next/image cannot see the stylesheet. Without `sizes` it emits no srcset at
 * all and serves one oversized file to every device - a phone was downloading
 * the same w=1920/w=3840 image as a desktop. `sizes` tells the browser how
 * wide the image will actually render so it can pick a matching candidate.
 *
 * Every image on the project pages is `width: 100%` capped by a `max-width` in
 * that page's stylesheet, inside a container with 25px of padding per side
 * (`section.project { padding: 0 2.5rem }`, and the equivalent border on
 * `.next-project`). So the rendered width is:
 *
 *     min(maxWidth, viewport - 50)
 *
 * which means the cap only applies once the viewport exceeds maxWidth + 50.
 * Below that the image is effectively full-bleed, so 100vw is the honest
 * answer - and it errs slightly large, which costs a few KB rather than
 * rendering something soft.
 *
 * @param {number} maxWidth - the `max-width` in px from the page's SCSS.
 */
export function sizesFor(maxWidth) {
  return `(max-width: ${maxWidth + 50}px) 100vw, ${maxWidth}px`;
}
