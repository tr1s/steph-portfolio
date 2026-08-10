/*
 * Per-page metadata builder.
 * ------------------------------------------------------------------------------
 * Two things about Next's metadata merging drive the shape of this file.
 *
 * 1. Nothing is derived per route. `alternates.canonical` and `openGraph.url`
 *    inherit the layout's literal value, so without this helper every page
 *    declares itself a duplicate of the home page - worse for search than
 *    having no canonical at all - and every shared link resolves back to home.
 *
 * 2. `openGraph` and `twitter` are REPLACED, not deep-merged. A page that sets
 *    only `openGraph.url` loses the layout's og:image, og:type, og:site_name
 *    and og:locale entirely. Verified by inspecting the built HTML, not
 *    assumed. So these blocks are emitted complete, every time.
 *
 * `description` is the exception - it is a top-level field, so Next fills
 * og:description and twitter:description from the layout automatically.
 */

import { siteConfig } from './site.config';

export function pageMetadata({ title, path }) {
  // Mirrors the `template` in app/layout.js so <title> and og:title agree.
  const fullTitle = title ? `${siteConfig.name} - ${title}` : siteConfig.name;

  const image = {
    url: siteConfig.seo.defaultImage,
    width: 1200,
    height: 630,
    alt: siteConfig.seo.defaultImageAlt
  };

  return {
    ...(title ? { title } : {}),
    alternates: { canonical: path },

    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description: siteConfig.description,
      url: path,
      images: [image]
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: siteConfig.description,
      images: [image]
    }
  };
}
