'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

// Replaces layouts/default.vue.
//
// Two things forced this to be a client component:
//   1. The old site set a body class per route via Nuxt's `bodyAttrs`
//      (body.home / body.me / body.golden-girls). Those rules paint the page
//      background, and a background only reaches the viewport canvas when it
//      sits on <body> or <html> - putting it on an inner div would leave the
//      overscroll area white.
//   2. The footer was rendered by the layout for three routes only, as a
//      sibling of the page. `.wrapper` is a flex column with
//      justify-content: space-between, so moving the footer inside the page
//      would change the spacing on every one of those routes.
//
// usePathname() resolves during SSR, so the class is present in the served
// HTML - no flash of the wrong background on first paint.

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
