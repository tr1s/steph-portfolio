/*
 * Golden Girls - the easter egg.
 * ------------------------------------------------------------------------------
 * A full-bleed background image (set by `body.golden-girls` in global.scss) and
 * a hidden, autoplaying, looping <audio> element. That is the whole page.
 *
 * The audio does play. Reaching this route means clicking the Golden Girls
 * link, and that click is the user gesture browsers require before
 * autoplay-with-sound is allowed; navigating away unmounts the element and the
 * track stops. The one case it stays silent is a cold load straight to this
 * URL, which matches production exactly - so do not "fix" it on the strength of
 * a headless page.goto() test.
 */

import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Golden Girls',
  path: '/golden-girls/'
});

export default function GoldenGirls() {
  return (
    <div className="page-golden-girls">
      <audio controls autoPlay loop>
        <source src="/audio/the-golden-girls-theme-song-extended.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
