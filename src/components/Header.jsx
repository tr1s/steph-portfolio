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
