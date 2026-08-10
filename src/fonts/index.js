import localFont from 'next/font/local';

// Descriptors mirror the original @font-face blocks in styles/typography.scss
// exactly (Vegawanty was declared italic/400, Söhne normal/600) so font
// matching and any synthetic obliquing behave the same as the Nuxt site.

// adjustFontFallback is off on purpose. Left on, next/font appends a
// metric-adjusted local fallback ("heading Fallback") to the family, ahead of
// the serif / -apple-system fallbacks these fonts were designed against.
// Vegawanty has no comma, period or @ glyph, so on the live site those
// characters render in plain `serif`; with the injected fallback they render
// in size-adjusted Times instead and land a pixel off. Verified via a
// screenshot diff of /me against production.

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
