import { useState } from "react";
import ajMain from "../assets/images/aj-main.jpeg";
function AJ({ onBack }) {
      const [openService, setOpenService] = useState(null);
  return (
    <main className="aj-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Blu's Krew
      </button>

      <section className="aj-hero">
        <div className="aj-hero-image">
          <img src={ajMain} alt="AJ Harris" />
        </div>

        <div className="aj-hero-copy">
          <p className="aj-eyebrow">FOUNDER • MANAGER • CREATIVE DIRECTOR</p>

          <h1>AJ HARRIS</h1>

          <h2>The guy behind Blu's Krew.</h2>

          <p className="aj-tagline">
            Somehow, this became my job.
          </p>
          <a
  href="https://www.instagram.com/loudberries_clothing/"
  target="_blank"
  rel="noopener noreferrer"
  className="artist-instagram"
>
  <svg
    className="instagram-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm.5 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
    />
  </svg>
  <span>@loudberries_clothing</span>
</a>
<a
  href="https://www.instagram.com/bluskrew/"
  target="_blank"
  rel="noopener noreferrer"
  className="artist-instagram"
>
  <svg
    className="instagram-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm.5 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
    />
  </svg>
  <span>@bluskrew</span>
</a>
        </div>
      </section>
      <section className="aj-about">
  <p className="aj-section-label">ABOUT AJ</p>

  <h2>Support is the business.</h2>

  <p>
    AJ Harris is the founder of Blu's Krew, a Minneapolis-based artist
    management, media and entertainment company built around a simple idea:
    talented people need more than representation. They need support.
  </p>

  <p>
    What started with helping artists navigate opportunities has grown into
    an ecosystem spanning artist development, booking, live events, original
    content, merchandise and independent media.
  </p>

  <p>
    AJ approaches management differently. The goal isn't simply to represent
    artists. It's to put the right people in the same car, make sure everybody
    brings something to the trip, and work toward the best possible destination
    together.
  </p>

  <p className="aj-about-close">
    He'd probably be uncomfortable with this entire page. That's precisely why
    Blu's Krew needs it.
  </p>
</section>
<section className="aj-services">
  <p className="aj-section-label">WHAT I DO</p>

  <div className="aj-services-grid">
   <div
  className={`aj-service-card ${openService === "artist" ? "open" : ""}`}
  onClick={() => setOpenService(openService === "artist" ? null : "artist")}
>
  <span>01</span>
  <h3>ARTIST DEVELOPMENT</h3>

  {openService === "artist" && (
    <p className="aj-service-description">
      Strategy, branding, release planning, performance development and
      building the infrastructure artists need around their careers.
    </p>
  )}
</div>

<div
  className={`aj-service-card ${openService === "management" ? "open" : ""}`}
  onClick={() => setOpenService(openService === "management" ? null : "management")}
>
  <span>02</span>
  <h3>MANAGEMENT</h3>
  {openService === "management" && (
    <p className="aj-service-description">
      Day-to-day guidance, career strategy, opportunity evaluation and
      helping artists make decisions that move the business forward.
    </p>
  )}
</div>

<div
  className={`aj-service-card ${openService === "booking" ? "open" : ""}`}
  onClick={() => setOpenService(openService === "booking" ? null : "booking")}
>
  <span>03</span>
  <h3>BOOKING & EVENTS</h3>
  {openService === "booking" && (
    <p className="aj-service-description">
      Performances, appearances, venue relationships, event development
      and creating opportunities for artists to reach new audiences.
    </p>
  )}
</div>

<div
  className={`aj-service-card ${openService === "media" ? "open" : ""}`}
  onClick={() => setOpenService(openService === "media" ? null : "media")}
>
  <span>04</span>
  <h3>MEDIA & CONTENT</h3>
  {openService === "media" && (
    <p className="aj-service-description">
      Visual content, interviews, promotional campaigns and original
      media designed to keep artists visible and their stories moving.
    </p>
  )}
</div>

<div
  className={`aj-service-card ${openService === "brand" ? "open" : ""}`}
  onClick={() => setOpenService(openService === "brand" ? null : "brand")}
>
  <span>05</span>
  <h3>BRAND DEVELOPMENT</h3>
  {openService === "brand" && (
    <p className="aj-service-description">
      Building identities that extend beyond the music through creative
      direction, merchandise, positioning and long-term brand strategy.
    </p>
  )}
</div>

<div
  className={`aj-service-card ${openService === "partnerships" ? "open" : ""}`}
  onClick={() => setOpenService(openService === "partnerships" ? null : "partnerships")}
>
  <span>06</span>
  <h3>PARTNERSHIPS</h3>
  {openService === "partnerships" && (
    <p className="aj-service-description">
      Connecting artists, brands, venues and creative partners when
      working together creates more value than working separately.
    </p>
  )}
</div>
  </div>
</section>
    </main>
  );
}

export default AJ;