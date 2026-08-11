/*
 * Home - the project index.
 * ------------------------------------------------------------------------------
 * The five project names, set large, and nothing else. The header and footer
 * come from Shell; `body.home` in global.scss paints the cream background.
 *
 * pages/index.vue also rendered a bare <Footer /> tag, but the component was
 * never registered - Nuxt 2.12 predates auto-imported components and
 * nuxt.config.js set no `components` option - so Vue emitted an unknown, empty
 * inline element that painted nothing. Not reproduced here.
 *
 * No `title` in the metadata: home is the one route that wants the bare site
 * name, which is `title.default` in app/layout.js.
 */

import NavLink from '@/components/NavLink';
import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({ path: '/' });

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
