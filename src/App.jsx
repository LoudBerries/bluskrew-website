import React from "react";
import Hero from "./components/Hero";
import KarsonBlu from "./components/KarsonBlu";
import KTMello from "./components/KTMello";
import Jay2X from "./components/Jay2X";
import J74L from "./components/J74L";
import AJ from "./components/aj";
import "./App.css";
import karsonLogo from './assets/images/karson-blu-logo.jpg.jpeg'
import karsonPhoto from "./assets/images/karson-photo.png";
import ktMelloLogo from './assets/images/Grunge style KT Mello logo.png'
import ktMelloPhoto from "./assets/images/kt-mello-photo.png";
import jay2xLogo from "./assets/images/jay2x-logo.jpeg.jpeg";
import jay2xPhoto from "./assets/images/jay2x-photo.png";
import j74lLogo from "./assets/images/j74l-scales-logo.jpeg.jpeg";
import karsonProfile from "./assets/images/karson-profile-blue.jpeg";
import j74lPhoto from "./assets/images/j74l-photo.png";
import Shop from "./components/Shop";
import urbanDripLogo from "./assets/images/urban-drip-logo.jpeg";
import loudberriesLogo from "./assets/images/loudberries-logo.jpeg";
import lonnie808Photo from "./assets/images/lonnie808-main.jpeg";
import frlQuonPhoto from "./assets/images/frl-quon-main.jpeg";
const sponsors = [
  {
    name: "Urban Drip",
    link: "https://www.instagram.com/urbandripbp/",
    logo: urbanDripLogo,
  },
  {
    name: "LoudBerries",
    link: "https://www.instagram.com/loudberries_clothing/",
    logo: loudberriesLogo,
  },
];
export default function App() {
  const [page, setPage] = React.useState("home");
  const [shopReturnPage, setShopReturnPage] = React.useState("home");
  const [showMusicVideos, setShowMusicVideos] = React.useState(false);
if (page === "shop") return <Shop onBack={() => setPage(shopReturnPage)} />;
  if (page === "karson") {
return <KarsonBlu onBack={() => setPage("home")} onShop={() => { setShopReturnPage("karson"); setPage("shop"); }} />;
}
 if (page === "ktmello") {
return <KTMello onBack={() => setPage("home")} onShop={() => { setShopReturnPage("ktmello"); setPage("shop"); }} />;
}
if (page === "jay2x") {
  return <Jay2X onBack={() => setPage("home")} onShop={() => { setShopReturnPage("jay2x"); setPage("shop"); }} />;
}
if (page === "j74l") {
  return <J74L onBack={() => setPage("home")} onShop={() => { setShopReturnPage("j74l"); setPage("shop"); }} />;
}
if (page === "aj") {
  return <AJ onBack={() => setPage("home")} />;
}
if (page === "contact") {
  return (
    <main
      style={{
        backgroundColor: "#07111f",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => setPage("home")}
        style={{
          margin: "24px",
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        ← Back
      </button>

      <section className="contact-section">
        <h2>CONTACT</h2>
        <p className="contact-intro">Let's build something.</p>

        <form
          name="general-contact"
          method="POST"
          data-netlify="true"
          className="contact-form"
        >
          <input type="hidden" name="form-name" value="general-contact" />

          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="tel" name="phone" placeholder="Phone" />

          <select name="inquiry" defaultValue="" required>
            <option value="" disabled>I'm contacting about...</option>
            <option value="business">Business / Sponsorship</option>
            <option value="artist">Artist Opportunity</option>
            <option value="production">Production / Content</option>
            <option value="events">Events</option>
            <option value="other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Tell us what you're working on..."
            rows="5"
            required
          />

          <button type="submit">SEND</button>
        </form>
      </section>
    </main>
  );
}
return (
    <main
      style={{
        backgroundColor: "#07111f",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 20px",
boxSizing: "border-box",
        }}
      >
        <nav
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#4da6ff",
            }}
          >
            Blu's Krew
          </h1>

          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "1rem",
            }}
          >
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</span>
<span onClick={() => document.getElementById("artists")?.scrollIntoView({ behavior: "smooth" })}>Artists</span>
<span onClick={() => document.getElementById("media")?.scrollIntoView({ behavior: "smooth" })}>Media</span>
<span onClick={() => document.getElementById("developing")?.scrollIntoView({ behavior: "smooth" })}>
  Developing
</span>
<span onClick={() => setPage("contact")}>Contact</span>
          </div>
        </nav>
     <Hero />
     <section className="sponsors-section">
  <p className="sponsors-label">SPONSORED BY</p>

  <div className="sponsors-grid">
    {sponsors.map((sponsor) => (
      <a
        key={sponsor.name}
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor-card"
      >
        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className={`sponsor-logo ${
            sponsor.name === "Urban Drip" ? "urban-drip-logo" : ""
          }`}
        />
        <span>{sponsor.name}</span>
      </a>
    ))}
  </div>
</section>
     <section id="artists">
     <h2>Meet the Krew</h2>
     <div className="artist-grid">
<div
  className="artist-card karson-card"
  onClick={() => {
  window.gtag?.("event", "page_view", {
    page_title: "Karson Blu",
    page_path: "/karson-blu",
  });
  setPage("karson");
}}
>
  <img
    src={karsonLogo}
    alt="Karson Blu"
    className="artist-logo karson-logo"
  />

  <img
    src={karsonPhoto}
    alt="Karson Blu"
    className="artist-photo karson-photo"
  />
</div>
<div
  className="artist-card kt-card"
  onClick={() => {
    window.gtag?.("event", "page_view", {
      page_title: "KT Mello",
      page_path: "/kt-mello",
    });
    setPage("ktmello");
  }}
>
  <img
  src={ktMelloLogo}
  alt="KT Mello"
  className="artist-logo kt-logo"
/>
  <img
  src={ktMelloPhoto}
  alt="KT Mello"
  className="artist-photo kt-photo"
/>
</div>
<div
  className="artist-card jay-card"
  onClick={() => {
    window.gtag?.("event", "page_view", {
      page_title: "Jay2X",
      page_path: "/jay2x",
    });
    setPage("jay2x");
  }}
>
 <img
  src={jay2xLogo}
  alt="Jay2X"
  className="artist-logo jay-logo"
/>
  <img
  src={jay2xPhoto}
  alt="Jay2X"
  className="artist-photo jay-photo"
/>
</div>

<div
  className="artist-card j74l-card"
  onClick={() => {
    window.gtag?.("event", "page_view", {
      page_title: "J74L",
      page_path: "/j74l",
    });
    setPage("j74l");
  }}
>
  <img
    src={j74lLogo}
    alt="J74L"
    className="artist-logo j74l-logo"
  />

  <img
    src={j74lPhoto}
    alt="J74L"
    className="artist-photo j74l-photo"
  />
</div>
</div>

     </section>
     <section className="krew-section">
  <h2>MEET THE KREW</h2>

  <div className="krew-grid">
   <div
  className="krew-card"
  onClick={() => {
    window.gtag?.("event", "page_view", {
      page_title: "AJ Harris",
      page_path: "/aj-harris",
    });
    setPage("aj");
  }}
>
      <h3>AJ HARRIS</h3>
      <p>Founder • Manager • Creative Director</p>
      <span>The guy behind Blu's Krew.</span>
    </div>
  </div>
</section>
 <section id="developing" className="developing-section">
  <h2>DEVELOPING</h2>

  <div className="developing-grid">
    <a
      href="https://www.instagram.com/gotdamnlonnie/"
      target="_blank"
      rel="noopener noreferrer"
      className="developing-card"
    >
      <img src={lonnie808Photo} alt="Lonnie808" />
      <h3>LONNIE808</h3>
      <p>@gotdamnlonnie</p>
    </a>
    <a
  href="https://www.instagram.com/frl.quon/"
  target="_blank"
  rel="noopener noreferrer"
  className="developing-card"
>
  <img src={frlQuonPhoto} alt="FRL Quon" />
  <h3>FRL QUON</h3>
  <p>@frl.quon</p>
</a>
  </div>
</section>    
     
     <section id="media">
  <h2>Media</h2>
<div className="media-grid">
  <a
  href="https://www.youtube.com/@bluskrewtv"
  target="_blank"
  rel="noopener noreferrer"
  className="media-card media-link"
>
  <h3>Blu's Krew TV</h3>
  <p>Original shows, interviews, behind-the-scenes and exclusive content.</p>
</a>

    <div
  className="media-card"
  onClick={() => setShowMusicVideos(!showMusicVideos)}
  style={{ cursor: "pointer" }}
>
      <h3>Music Videos</h3>
      <p>Watch the latest visuals from Blu's Krew artists.</p>
      {showMusicVideos && (
      <div className="vertical-video">
        <div className="vertical-video">
  <iframe
    src="https://www.youtube.com/embed/DSS3FlJ0AT4"
    title="Blu's Krew Music Video 2"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>
  <iframe
    src="https://www.youtube.com/embed/N1Z7tCPLWVc"
    title="Blu's Krew Music Video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>
)}
    </div>

    <div className="media-card">
      <h3>Blu Chek</h3>
      <p>Culture. Music. Street interviews. Are you VALID?</p>
    </div>
  </div>
</section>


     
      </div>
    </main>
  );
}
