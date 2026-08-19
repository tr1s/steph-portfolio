/*
 * Next.js build and runtime configuration.
 * ------------------------------------------------------------------------------
 * Owns four things the rest of the app depends on: the trailing-slash URL
 * shape inherited from the Nuxt site, the Sass globals that replace
 * @nuxtjs/style-resources, the no-cache header that lets public/sw.js retire
 * the old service worker, and the redirect for the one project page that has
 * been taken down.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The old Nuxt site served every route with a trailing slash (Netlify 301'd
  // /tmu -> /tmu/). Keep that so existing links and bookmarks don't break.
  trailingSlash: true,
  sassOptions: {
    // Replaces @nuxtjs/style-resources: makes $variables, respond-to() and the
    // tint/shade functions available in every .scss file without importing.
    // loadPaths is the modern Dart Sass successor to node-sass includePaths;
    // the "@/" jsconfig alias is JS-only and does not resolve in Sass.
    loadPaths: ['./src'],
    additionalData: `@use "styles/abstracts" as *;`
  },
  async redirects() {
    return [
      {
        // /pavilion-project/ was live on the Nuxt site for years and is still
        // indexed and linked. Stephanie retired the project in August 2026, so
        // send the URL to the project index rather than let it 404. 308 (the
        // method-preserving permanent redirect Next uses in place of 301) tells
        // search engines the page is gone for good.
        //
        // Source is written without the trailing slash - `trailingSlash: true`
        // rejects a source that has one. Inbound links use the canonical
        // /pavilion-project/ and land on home in a single hop; the bare
        // /pavilion-project takes two, picking up the trailing-slash 308 first.
        // Verified against `npm start`.
        source: '/pavilion-project',
        destination: '/',
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        // public/sw.js exists only to unregister the old @nuxtjs/pwa Workbox
        // worker. It must never be cached, or a stale copy could delay the
        // teardown for visitors who still have the old worker installed.
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
