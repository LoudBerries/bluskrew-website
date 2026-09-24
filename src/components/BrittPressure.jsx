import brittPressureHero from "../assets/images/britt-pressure-hero.png";
import "./BrittPressure.css";

export default function BrittPressure({ onBack, onBook }) {
  return (
    <main className="artist-profile britt-pressure-profile">
      <button className="artist-back" onClick={onBack}>← Back</button>
      <section className="artist-profile-hero">
        <img src={brittPressureHero} alt="Britt Pressure" className="artist-profile-hero-image" />
        <div className="artist-profile-copy">
          <p className="artist-eyebrow">ARTIST DEVELOPMENT</p>
          <h1>BRITT PRESSURE</h1>
          <p className="artist-role">R&B Artist • Signed Artist Development</p>
          <a className="artist-instagram" href="https://www.instagram.com/bigbrittpressure/" target="_blank" rel="noopener noreferrer">@BIGBRITTPRESSURE</a>
          <p className="artist-bio">
            Britt Pressure is an emerging R&B artist building her catalog around
            honest songwriting, emotion, resilience, and growth. Her artist
            development with Blu's Krew is focused on sharpening the music,
            visuals, rollout, and live presentation while keeping her identity
            at the center of the work.
          </p>
        </div>
      </section>
      <section className="artist-profile-section">
        <p className="artist-eyebrow">LATEST RELEASE</p>
        <h2>FOUND ME</h2>
        <p>Listen to Britt Pressure's latest release without leaving Blu's Krew.</p>
        <iframe
          title="Britt Pressure - Found Me on Apple Music"
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          frameBorder="0"
          height="175"
          style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/us/album/found-me/6804337202?i=6804337203"
        />
      </section>
      <section className="artist-profile-section">
        <p className="artist-eyebrow">BOOKING</p>
        <button type="button" className="artist-profile-button" onClick={onBook}>BOOK BRITT PRESSURE</button>
      </section>
      <section className="artist-profile-section britt-video-section">
        <p className="artist-eyebrow">OFFICIAL VIDEO</p>
        <h2>VISUAL COMING SOON</h2>
        <p>The official video will appear here when it is released.</p>
      </section>
    </main>
  );
}
