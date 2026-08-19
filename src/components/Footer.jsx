/*
 * Site footer.
 * ------------------------------------------------------------------------------
 * The Golden Girls easter-egg link. Rendered by Shell on `/`, `/me` and
 * `/golden-girls` only; project pages carry their own copy inside NextProject.
 *
 * Styling lives in styles/components.scss, anchored to `.wrapper > div > footer`
 * so it cannot match that nested copy.
 */

import NavLink from './NavLink';

export default function Footer() {
  return (
    <footer>
      <NavLink href="/golden-girls">
        Golden <span>Girls</span>
      </NavLink>
    </footer>
  );
}
