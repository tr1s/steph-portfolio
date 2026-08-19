/*
 * Link that knows when it points at the current page.
 * ------------------------------------------------------------------------------
 * Reproduces Nuxt's router.linkExactActiveClass: 'exact-active-link'. next/link
 * has no equivalent, and the class name has to stay global (unhashed) because
 * global.scss targets it under .me and .golden-girls.
 *
 * Both sides of the comparison are normalised: `trailingSlash: true` means
 * usePathname() returns "/me/" while hrefs are written "/me".
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const normalise = (path) => path.replace(/(.)\/$/, '$1');

export default function NavLink({ href, className, children }) {
  const isExactActive = normalise(usePathname()) === normalise(href);
  const classes = [className, isExactActive && 'exact-active-link'].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes || undefined}>
      {children}
    </Link>
  );
}
