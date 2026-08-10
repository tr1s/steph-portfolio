import NavLink from '@/components/NavLink';
import './page.scss';

export const metadata = {
  title: 'Stephanie Firka',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

// Note: pages/index.vue also rendered a bare <Footer /> tag, but the component
// was never registered (Nuxt 2.12 predates auto-imported components and
// nuxt.config.js set no `components` option), so Vue emitted an unknown, empty
// inline element that painted nothing. The real footer comes from the layout.
export default function Home() {
  return (
    <div className="page-home">
      <ul className="projects">
        <li>
          <NavLink href="/toronto-life">Toronto Life</NavLink>
        </li>
        <li>
          <NavLink href="/top-hat">Top Hat</NavLink>
        </li>
        <li>
          <NavLink href="/pavilion-project">Pavilion Project</NavLink>
        </li>
        <li>
          <NavLink href="/tmu">TMU</NavLink>
        </li>
        <li>
          <NavLink href="/canadian-business">Canadian Business</NavLink>
        </li>
      </ul>
    </div>
  );
}
