/*
 * Robots - served at /robots.txt via the Next.js metadata file convention.
 * ------------------------------------------------------------------------------
 * Allow-all plus a sitemap reference. The site has no private routes; every
 * page is meant to be found.
 *
 * The Nuxt site served no robots.txt at all, so this is new rather than ported.
 */

import { getBaseUrl } from '@/lib/site.config';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${getBaseUrl()}/sitemap.xml`
  };
}
