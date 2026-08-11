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
 *
 * ProjectReveal renders the <section> and animates its contents in. It is the
 * only client component here, which is why it wraps just that subtree - this
 * file and NextProject stay on the server, and the DOM is unchanged either way.
 */

import NextProject from './NextProject';
import ProjectReveal from './ProjectReveal';

export default function ProjectPage({ pageClass, title, credits, children, next }) {
  return (
    <div className={pageClass}>
      <ProjectReveal>
        <h1 className="project-title">{title}</h1>
        <div className="project-credits">{credits}</div>
        <div className="content">{children}</div>
      </ProjectReveal>
      <NextProject {...next} />
    </div>
  );
}
