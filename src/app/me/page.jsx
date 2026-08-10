import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Me',
  path: '/me/'
});

export default function Me() {
  return (
    <div className="page-me me">
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
    </div>
  );
}
