import { useState } from "react";
import j74lMain from "../assets/images/j74l-main.jpeg";
import anthem from "../assets/audio/Anthem.mp3";
import anthemCover from "../assets/images/j74l-anthem.png";
import mineyMoeCover from "../assets/images/miney-moe-cover.jpeg";
import shirtBlack from "../assets/images/karson-shirt-black.png";
import shirtGray from "../assets/images/karson-shirt-gray.png";
import shirtBlue from "../assets/images/karson-shirt-blue.jpeg";
import shirtWhite from "../assets/images/karson-shirt-white.png";
import scratchBlack from "../assets/images/scratch-black.png";
import scratchWhite from "../assets/images/scratch-white.png";
function J74L({ onBack, onShop }) {
  const handleBookingSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  });

  alert("Booking request sent!");
  form.reset();
};
  const [activeSection, setActiveSection] = useState(null);
  const [selectedShirt, setSelectedShirt] = useState(shirtBlack);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedScratch, setSelectedScratch] = useState(scratchBlack);
  return (
  
    <div className="karson-page">

<button type="button" className="karson-back" onClick={onBack}>
  ← Back to Blu's Krew
</button>

      <section className="karson-hero j74l-hero">
        <h1>J74L</h1>

        <p>
          Get In Your Stee
        </p>
        <div className="karson-bio">
  <h2>ABOUT JAY2X</h2>

<div className="karson-bio">
  <h2>ABOUT J74L</h2>

  <p>
    Born Antoine King on August 26, 2001, in Maplewood, Minnesota,
    and raised in Chicago, J74L's connection to music started before
    he ever stepped into a studio. At four years old, his mother gave
    him his first notepad and told him to simply write how he felt.
    That early lesson became the foundation for the way he approaches
    music today.
  </p>

  <p>
    Growing up inspired by artists like Scarface, 50 Cent, Tupac,
    Nas, and Young Buck, J74L developed an appreciation for music
    that carries real emotion, experience, and meaning.
  </p>

  <p>
    For J74L, the name represents more than an artist. J74L is a
    lifestyle: fun, great music, good vibes, and the freedom to turn
    real life into art. Through his music, he transforms Pain,
    Passion, and Perseverance into something people can feel,
    especially those looking for something deeper than just another
    song.
  </p>

  <p>
    Pain. Passion. Perseverance. J74L.
  </p>
</div>
  
</div>
      </section>

<img
  src={j74lMain}
  alt="J74L"
  className="karson-hero-photo j74l-hero-photo"
/>
      <section className="karson-options">

       <button
  className="karson-option"
  onClick={() => setActiveSection("music")}
>
  MUSIC
</button>

        <button
  className="karson-option"
  onClick={() => setActiveSection("videos")}
>
  VIDEOS
</button>

        <button
  className="karson-option"
 onClick={onShop}
>
          SHOP
        </button>

       <button
  className="karson-option"
  onClick={() => setActiveSection("booking")}
>
  BOOKING
</button>
</section>
 {activeSection === "music" && (
  <section className="karson-music j74l-music">
    <h2>J74L MUSIC</h2>
    <p className="j74l-music-subtitle">UNRELEASED / EXCLUSIVE</p>

    <div className="j74l-track-card">

      <img
        src={anthemCover}
        alt="J74L Anthem cover"
        className="j74l-track-cover"
      />

      <div className="j74l-track-info">
        <h3>ANTHEM</h3>
        <h4>J74L</h4>

        <span className="j74l-exclusive-badge">
          BLU'S KREW EXCLUSIVE
        </span>

        <p className="j74l-unreleased">UNRELEASED</p>

        <audio
  className="j74l-anthem-player"
  controls
  controlsList="nodownload"
>
          <source src={anthem} type="audio/mpeg" />
          Your browser does not support the audio player.
        </audio>
      </div>

    </div>
  </section>
)}
{activeSection === "videos" && (
  <section className="karson-videos">
    <h2>J74L Live at Red Sea</h2>

  <div className="j74l-video">
  <iframe
    src="https://www.youtube.com/embed/NTFXkZTSd3M"
    title="J74L Live Performance"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>
  </section>
)}


    
 {activeSection === "booking" && (
  <section className="j74l-booking">
  <h2>BOOK J74L</h2>
  <form onSubmit={handleBookingSubmit}
  className="booking-form"
  name="j74l-booking"
  method="POST"
  data-netlify="true"
>
  <input type="hidden" name="form-name" value="j74l-booking" />
  <input
  type="text"
  name="name"
  placeholder="YOUR NAME"
  required
/>
  <input
  type="email"
  name="email"
  placeholder="EMAIL"
  required
/>
  <input
  type="tel"
  name="phone"
  placeholder="PHONE"
/>
  <input
  type="text"
  name="cityState"
  placeholder="CITY / STATE"
/>
  <input
  type="date"
  name="eventDate"
/>
<input
  type="text"
  name="venue"
  placeholder="VENUE"
/>
<input
  type="text"
  name="eventType"
  placeholder="EVENT TYPE"
/>
<input
  type="text"
  name="budget"
  placeholder="BUDGET"
/>
<textarea
  name="eventDetails"
  placeholder="TELL US ABOUT THE EVENT"
></textarea>

<button type="submit" className="booking-submit">
  SUBMIT BOOKING REQUEST
</button>
</form>
  </section>
)}
    </div>
  );
}

export default J74L;