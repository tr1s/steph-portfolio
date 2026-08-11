/*
 * Shared shell for the five project pages.
 * ------------------------------------------------------------------------------
 * Title, credits, the image column, then the next-project block. Reproduces the
 * markup of the old .vue pages exactly:
 * <div> > <section.inner-wrapper.project> + <div.next-project>.
 *
 * `pageClass` namespaces each page's own stylesheet. It stands in for Vue's
 * `<style scoped>`, which raised specificity the same way (class + attribute) -
 * that is what lets a page override `.project-title` or `.project-credits` from
 * global.scss.
 *
 * The image column is deliberately left to `children`: the layout of each
 * project's spreads is bespoke and lives in that page's own page.scss.
 */

import NextProject from './NextProject';

export default function ProjectPage({ pageClass, title, credits, children, next }) {
  return (
    <div className={pageClass}>
      <section className="inner-wrapper project">
        <h1 className="project-title">{title}</h1>
        <div className="project-credits">{credits}</div>
        <div className="content">{children}</div>
      </section>
      <NextProject {...next} />
    </div>
  );
}
