/*
 * Home - the project index.
 * ------------------------------------------------------------------------------
 * The five project names, set large, and nothing else. The header and footer
 * come from Shell; `body.home` in global.scss paints the cream background.
 *
 * The list itself lives in ProjectList, which is a client component because it
 * animates on mount. Keeping it separate leaves this file a server component so
 * the `metadata` export below still works.
 *
 * pages/index.vue also rendered a bare <Footer /> tag, but the component was
 * never registered - Nuxt 2.12 predates auto-imported components and
 * nuxt.config.js set no `components` option - so Vue emitted an unknown, empty
 * inline element that painted nothing. Not reproduced here.
 *
 * No `title` in the metadata: home is the one route that wants the bare site
 * name, which is `title.default` in app/layout.js.
 */

import ProjectList from '@/components/ProjectList';
import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({ path: '/' });

export default function Home() {
  return (
    <div className="page-home">
      <ProjectList />
    </div>
  );
}
