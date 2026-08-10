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
