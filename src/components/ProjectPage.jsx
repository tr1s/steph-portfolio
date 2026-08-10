import NextProject from './NextProject';

// Shared shell for the five project pages: title, credits, the image column,
// then the next-project block. Matches the markup of the old .vue pages exactly
// (<div> > <section.inner-wrapper.project> + <div.next-project>).
//
// `pageClass` namespaces each page's own stylesheet - it stands in for Vue's
// `<style scoped>`, which raised specificity the same way (class + attribute).
export default function ProjectPage({
  pageClass,
  title,
  credits,
  children,
  next
}) {
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
