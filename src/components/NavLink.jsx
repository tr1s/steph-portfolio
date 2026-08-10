'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const normalise = (path) => path.replace(/(.)\/$/, '$1');

// Reproduces Nuxt's router.linkExactActiveClass: 'exact-active-link'.
// next/link has no active-class equivalent, and the class name has to stay
// global (unhashed) because global.scss targets it under .me and .golden-girls.
export default function NavLink({ href, className, children }) {
  const isExactActive = normalise(usePathname()) === normalise(href);
  const classes = [className, isExactActive && 'exact-active-link'].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes || undefined}>
      {children}
    </Link>
  );
}
