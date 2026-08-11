/*
 * Web fonts.
 * ------------------------------------------------------------------------------
 * Replaces the @font-face blocks that used to live in styles/typography.scss.
 * next/font/local fingerprints each file and emits a preload link; the CSS
 * variables it exposes are applied to <html> in app/layout.js and read by
 * $font-heading / $font-body in styles/abstracts/_variables.scss.
 *
 * The weight/style descriptors mirror the original @font-face declarations
 * exactly (Vegawanty italic/400, Söhne normal/600) so font matching and any
 * synthetic obliquing behave as they did on the Nuxt site.
 *
 * adjustFontFallback is off on purpose. Left on, next/font appends a
 * metric-adjusted local fallback ("heading Fallback") to the family, ahead of
 * the serif / -apple-system fallbacks these fonts were designed against.
 * Vegawanty has no comma, period or @ glyph, so production renders those
 * characters in plain `serif`; with the injected fallback they render in
 * size-adjusted Times and land a pixel off. Caught by a screenshot diff of /me.
 */

import localFont from 'next/font/local';

export const heading = localFont({
  src: './vegawanty-regular.woff2',
  weight: '400',
  style: 'italic',
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-heading'
});

export const body = localFont({
  src: './soehne-breit-kraeftig.woff2',
  weight: '600',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-body'
});
