/*
 * Document chrome shared by every route.
 * ------------------------------------------------------------------------------
 * Replaces layouts/default.vue. Owns <body>, the .wrapper flex column, the
 * header, and the footer on the three routes that get one.
 *
 * Two things force this to be a client component:
 *   1. The old site set a body class per route via Nuxt's `bodyAttrs`
 *      (body.home / body.me / body.golden-girls). Those rules paint the page
 *      background, and a background only reaches the viewport canvas from
 *      <body> or <html> - on an inner div the overscroll area would stay white.
 *   2. The footer was rendered by the layout for three routes only, as a
 *      sibling of the page. `.wrapper` is a flex column with
 *      justify-content: space-between, so moving the footer inside the page
 *      would change spacing on every one of those routes.
 *
 * usePathname() resolves during SSR, so the class ships in the served HTML -
 * no flash of the wrong background on first paint.
 */

'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const BODY_CLASS = {
  '/': 'home',
  '/me': 'me',
  '/golden-girls': 'golden-girls'
};

export default function Shell({ children }) {
  // trailingSlash: true means pathname arrives as "/me/" - normalise it.
  const pathname = usePathname().replace(/(.)\/$/, '$1');
  const bodyClass = BODY_CLASS[pathname];

  return (
    <body className={bodyClass}>
      <div className="wrapper">
        <Header />
        {children}
        {bodyClass && (
          <div>
            <Footer />
          </div>
        )}
      </div>
    </body>
  );
}
