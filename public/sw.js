/*
 * Self-destructing service worker.
 *
 * The Nuxt site shipped @nuxtjs/pwa, which registered a Workbox service worker
 * at this exact path with root scope. It is still installed and actively
 * caching in the browser of everyone who has ever visited stephfirka.com.
 *
 * A service worker is not removed by deploying a site that no longer registers
 * one - it keeps controlling the scope and can keep serving its precached
 * shell, so returning visitors would see the old Nuxt site indefinitely.
 *
 * Replacing the script at the same URL is the supported way out: browsers
 * re-fetch the worker script on navigation (bypassing the HTTP cache), see
 * that the bytes changed, and install this one. It then tears itself down.
 *
 * Keep this file until it is safe to assume every returning visitor has hit
 * the site once post-launch. Deleting it early would 404 the script, which
 * also unregisters the worker in modern browsers - but only after the browser
 * happens to check, and it would not clear the caches it left behind.
 */

self.addEventListener('install', () => {
  // Don't wait for existing tabs to close before taking over.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Drop every cache the old Workbox worker precached.
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      // Stop controlling this scope for good.
      await self.registration.unregister();

      // Reload open tabs so they load the real site instead of whatever this
      // worker was still serving them.
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
