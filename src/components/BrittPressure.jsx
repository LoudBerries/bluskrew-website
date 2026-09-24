import brittPressureHero from "../assets/images/britt-pressure-hero.png";

export default function BrittPressure({ onBack }) {
  return (
    <main className="artist-profile britt-pressure-profile">
      <button className="artist-back" onClick={onBack}>← Back</button>
      <section className="artist-profile-hero">
        <img src={brittPressureHero} alt="Britt Pressure" className="artist-profile-hero-image" />
        <div className="artist-profile-copy">
          <p className="artist-eyebrow">ARTIST DEVELOPMENT</p>
          <h1>BRITT PRESSURE</h1>
          <p className="artist-role">R&B Artist • Signed Artist Development</p>
          <p>
            Britt Pressure is an emerging R&B artist building her catalog around
            honest songwriting, emotion, resilience, and growth. Her artist
            development with Blu's Krew is focused on sharpening the music,
            visuals, rollout, and live presentation while keeping her identity
            at the center of the work.
          </p>
          <a className="artist-profile-button" href="https://www.instagram.com/bigbrittpressure/" target="_blank" rel="noopener noreferrer">@BIGBRITTPRESSURE</a>
        </div>
      </section>
      <section className="artist-profile-section">
        <p className="artist-eyebrow">LATEST RELEASE</p>
        <h2>FOUND ME</h2>
        <p>Listen to Britt Pressure's latest release.</p>
        <p className="artist-link-pending">Official streaming link will be connected here.</p>
      </section>
      <section className="artist-profile-section">
        <p className="artist-eyebrow">BOOKING</p>
        <a className="artist-profile-button" href="mailto:booking@bluskrew.media">BOOK BRITT PRESSURE</a>
      </section>
      <section className="artist-profile-section britt-video-section">
        <p className="artist-eyebrow">OFFICIAL VIDEO</p>
        <h2>VISUAL COMING SOON</h2>
        <p>The official video will appear here when it is released.</p>
      </section>
    </main>
  );
}
