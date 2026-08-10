/*
 * Sitemap - served at /sitemap.xml via the Next.js metadata file convention.
 * ------------------------------------------------------------------------------
 * Built from siteConfig.routes so adding a page means editing one list, not
 * two. Home gets priority 1; the project pages and /me sit at 0.8; the Golden
 * Girls easter egg is listed but ranked lowest since it holds no real content.
 *
 * The Nuxt site served no sitemap at all, so this is new rather than ported.
 */

import { siteConfig, getBaseUrl } from '@/lib/site.config';

export default function sitemap() {
  const base = getBaseUrl();
  const lastModified = new Date();

  return siteConfig.routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: 'yearly',
    priority: route === '/' ? 1 : route === '/golden-girls/' ? 0.3 : 0.8
  }));
}
