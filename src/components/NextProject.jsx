import Image from 'next/image';
import NavLink from './NavLink';

// The full-viewport "next project" block that closed every project page. It was
// duplicated verbatim in all five .vue project pages.
//
// `variant` carries the second class the markup had ("block" on four pages,
// "pavillion" on toronto-life). Nothing in the stylesheets targets either one -
// they're dead classes - but they're kept so the DOM matches the old site.
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
          treatment for a decorative image sitting behind a text link. */}
      <Image
        src={image}
        className="next-project-img"
        alt=""
        placeholder="blur"
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
