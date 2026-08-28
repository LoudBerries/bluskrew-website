import React from "react";
import Hero from "./components/Hero";
import KarsonBlu from "./components/KarsonBlu";
import KTMello from "./components/KTMello";
import Jay2X from "./components/Jay2X";
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
            <span>Home</span>
            <span>Artists</span>
            <span>Media</span>
            <span>Booking</span>
            <span>Contact</span>
          </div>
        </nav>
     <Hero />
     <section id="artists">
     <h2>Meet the Krew</h2>
     <div className="artist-grid">
<div
  className="artist-card karson-card"
  onClick={() => setPage("karson")}
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
<div className="artist-card kt-card" onClick={() => setPage("ktmello")}>
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
<div className="artist-card jay-card" onClick={() => setPage("jay2x")}>
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

<div className="artist-card j74l-card">
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
