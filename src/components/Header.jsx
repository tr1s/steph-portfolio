/*
 * Site header.
 * ------------------------------------------------------------------------------
 * The name / Projects pair at the top of every route. Both links go through
 * NavLink so whichever is current picks up `exact-active-link`. The rule between
 * them is `.line`, drawn by a ::before in global.scss rather than an asset.
 *
 * Styling lives in styles/components.scss, anchored to `header` so it cannot
 * leak into the identical <nav> that NextProject renders.
 */

import NavLink from './NavLink';

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink href="/me">
          Stephanie <span>Firka</span>
        </NavLink>
        <div className="line"></div>
        <NavLink href="/">Projects</NavLink>
      </nav>
    </header>
  );
}
