import './page.scss';

export const metadata = {
  title: 'Stephanie Firka - Me',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

export default function Me() {
  return (
    <div className="page-me me">
      <div className="intro">
        <p>
          Graphic Designer &amp; <span>Number One Golden Girls Fan.</span>
        </p>
        <p>Based in Toronto, Canada.</p>
        <p>
          Stay in touch if you have a project, want to collaborate, or simply
          want to exchange perspectives.
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
