/*
 * Me - the about page.
 * ------------------------------------------------------------------------------
 * Intro copy, contact email, and the credit link. The root element keeps its
 * `me` class alongside `page-me`, because `body.me .me` in global.scss is what
 * turns the type white against the blue background.
 *
 * StaggerReveal renders that root and reveals the three sections in order on
 * mount. It is a client component, but the markup stays here and is passed
 * through as children, so this file remains a server component and keeps its
 * `metadata` export. The `groups` selector names what counts as a section -
 * change the markup and change it too.
 */

import StaggerReveal from '@/components/StaggerReveal';
import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Me',
  path: '/me/'
});

export default function Me() {
  return (
    <StaggerReveal className="page-me me" groups=".intro, .email, .developer">
      <div className="intro">
        <p>
          Graphic Designer &amp; <span>Number One Golden Girls Fan.</span>
        </p>
        <p>Based in Toronto, Canada.</p>
        <p>
          Stay in touch if you have a project, want to collaborate, or simply want to exchange
          perspectives.
        </p>
      </div>
      <a className="email" href="mailto:stephfirka@gmail.com">
        stephfirka@gmail.com
      </a>

      <div className="developer">
        <p>Coded by</p>
        <a href="https://tris.codes" target="_blank" className="email">
          tris.codes
        </a>
      </div>
    </StaggerReveal>
  );
}
