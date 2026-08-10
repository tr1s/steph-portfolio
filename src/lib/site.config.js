/*
 * Centralized site configuration.
 * ------------------------------------------------------------------------------
 * Single source of truth for site identity, contact details and SEO defaults.
 * Consumed by app/layout.js (metadata), app/sitemap.js and app/robots.js, so
 * those three can never disagree about the site's name or canonical domain.
 *
 * Pattern borrowed from the DoReal codebase (lib/site.config.ts).
 */

export const siteConfig = {
  name: 'Stephanie Firka',
  url: 'https://stephfirka.com',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.',
  locale: 'en_CA',

  author: {
    name: 'Stephanie Firka',
    jobTitle: 'Graphic Designer',
    location: { city: 'Toronto', country: 'CA' },
    email: 'stephfirka@gmail.com'
  },

  seo: {
    // 1200x630, generated from the site's own home page so the preview card
    // shows the real typography rather than a cropped project scan. Regenerate
    // it if the home page changes - see AGENTS.md.
    defaultImage: '/seo/og-default.jpg',
    defaultImageAlt:
      'Stephanie Firka - Graphic Designer based in Toronto, Canada.'
    // No `keywords`: the meta keywords tag has been ignored by every major
    // search engine for years. Deliberately omitted rather than forgotten.
  },

  // Every indexable route, in nav order. sitemap.js maps over this, so a new
  // page only needs adding here. Paths carry the trailing slash that
  // `trailingSlash: true` in next.config.mjs makes canonical.
  routes: [
    '/',
    '/toronto-life/',
    '/top-hat/',
    '/pavilion-project/',
    '/tmu/',
    '/canadian-business/',
    '/me/',
    '/golden-girls/'
  ]
};

/*
 * Canonical absolute base URL, used by metadataBase, og:url, the sitemap and
 * robots.txt so they all resolve to the same domain.
 *
 * Priority:
 *   1. NEXT_PUBLIC_SITE_URL          - manual override
 *   2. VERCEL_PROJECT_PRODUCTION_URL - the project's production domain, set by
 *      Vercel and stable across every deploy including previews
 *   3. siteConfig.url                - local dev fallback
 *
 * Deliberately NOT VERCEL_URL: that is the throwaway per-deployment hostname
 * (steph-portfolio-git-next-rebuild-....vercel.app), which would put the wrong
 * domain into og:url, the sitemap and robots.txt.
 */
export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : siteConfig.url)
  );
}
