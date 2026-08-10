import './page.scss';

export const metadata = {
  title: 'Stephanie Firka - Golden Girls',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

// Ported exactly as it was: a hidden, autoplaying, looping <audio> element.
// Heads up - browsers have blocked autoplay-with-sound without a user gesture
// since well after this was written, so this almost certainly no longer plays
// on the live site either. Kept 1:1 on purpose; see the handoff notes.
export default function GoldenGirls() {
  return (
    <div className="page-golden-girls">
      <audio controls autoPlay loop>
        <source
          src="/audio/the-golden-girls-theme-song-extended.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
