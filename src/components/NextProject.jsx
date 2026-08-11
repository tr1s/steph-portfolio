/*
 * Full-viewport "next project" block.
 * ------------------------------------------------------------------------------
 * Closes every project page: its own nav, a dimmed preview image, the big link
 * onward, and a second Golden Girls footer. This markup was duplicated verbatim
 * in all five .vue project pages.
 *
 * `variant` carries the second class the original markup had ("block" on four
 * pages, "pavillion" on toronto-life). Nothing in the stylesheets targets
 * either - they are dead classes - but they are kept so the DOM matches the old
 * site exactly.
 *
 * Styled by the `.next-project` rules in styles/global.scss.
 */

import Image from 'next/image';
import NavLink from './NavLink';
import { sizesFor } from '@/lib/image-sizes';

export default function NextProject({ href, label, image, variant }) {
  return (
    <div className={`next-project ${variant}`}>
      <nav>
        <NavLink href="/me">
          Stephanie <span>Firka</span>
        </NavLink>
        <div className="line"></div>
        <NavLink href="/">Projects</NavLink>
      </nav>
      {/* The original <img> had no alt at all; empty alt is the correct
          treatment for a decorative image sitting behind a text link.
          max-width: 800px comes from `.next-project .next-project-img`. */}
      <Image
        src={image}
        className="next-project-img"
        alt=""
        placeholder="blur"
        sizes={sizesFor(800)}
      />

      <NavLink href={href} className="next-project-link">
        {label}
      </NavLink>

      <footer className="footer">
        <NavLink href="/golden-girls">
          Golden <span>Girls</span>
        </NavLink>
      </footer>
    </div>
  );
}
