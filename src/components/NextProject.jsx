/*
 * Full-viewport "next project" block.
 * ------------------------------------------------------------------------------
 * Closes every project page: its own nav, a dimmed preview image, the big link
 * onward, and a second Golden Girls footer. This markup was duplicated verbatim
 * in every .vue project page.
 *
 * `href`/`label`/`image` come from the page above; the running order they
 * follow is the PROJECTS list in components/ProjectList.jsx, and the last page
 * wraps back to the first.
 *
 * The original markup carried a second class here ("block" on most pages,
 * "pavillion" on toronto-life). No stylesheet in either codebase ever targeted
 * them; they were kept only so the DOM matched the old site during the port.
 * That site is retired, so they are gone.
 *
 * Styled by the `.next-project` rules in styles/global.scss.
 */

import Image from 'next/image';
import NavLink from './NavLink';
import { sizesFor } from '@/lib/image-sizes';

export default function NextProject({ href, label, image }) {
  return (
    <div className="next-project">
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
