import { useState } from "react";
import ktMelloMain from "../assets/images/kt-mello-main.jpeg";
import mineyMoeCover from "../assets/images/miney-moe-cover.jpeg";
import shirtBlack from "../assets/images/karson-shirt-black.png";
import shirtGray from "../assets/images/karson-shirt-gray.png";
import shirtBlue from "../assets/images/karson-shirt-blue.jpeg";
import shirtWhite from "../assets/images/karson-shirt-white.png";
import scratchBlack from "../assets/images/scratch-black.png";
import scratchWhite from "../assets/images/scratch-white.png";
function KTMello({ onBack, onShop }) {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedShirt, setSelectedShirt] = useState(shirtBlack);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedScratch, setSelectedScratch] = useState(scratchBlack);
  return (
  
    <div className="karson-page">

<button type="button" className="karson-back" onClick={onBack}>
  ← Back to Blu's Krew
</button>

      <section className="karson-hero">
        <h1>KT MELLO</h1>

        <p>
          This the one right here!
        </p>
        <div className="karson-bio">
  <h2>ABOUT KT MELLO</h2>

 <p>
  KT Mello, born Kevin Smith in Chicago, Illinois, built his name
  from two parts of his story. “Mello” started as a childhood
  nickname that stuck, while “KT” stands for Keep Thriving, a
  mindset that reflects his drive to keep working, growing, and
  becoming the best artist and content creator he can be.
</p>

<p>
  Born January 30, KT Mello brings that same mindset into
  everything he creates. His music is rooted in ambition,
  persistence, and self-belief, with a focus on leveling up
  without losing who he is along the way.
</p>
</div>
      </section>

<img
  src={ktMelloMain}
  alt="KT Mello"
  className="karson-hero-photo kt-mello-hero-photo"
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
  <section className="karson-music">
    <h2>KT MELLO MUSIC</h2>

    <div className="music-card">
      <h3>KT MELLO</h3>

      <div className="music-players">
        <iframe
          title="KT Mello on Spotify"
          src="https://open.spotify.com/embed/track/4UO8a4zsIgOX4kOywLYYxC"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
  title="KT Mello second song on Spotify"
  src="https://open.spotify.com/embed/track/64wLGNjZCnBAjWoSLOp7sT"
  width="100%"
  height="152"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
></iframe>
      </div>
    </div>
  </section>
)}
{activeSection === "videos" && (
  <section className="karson-videos">
    <h2>KARSON BLU VIDEOS</h2>
    <iframe
  width="100%"
  height="500"
  src="https://www.youtube.com/embed/8vCJNNzUpjg"
  title="Karson Blu - Miney Moe"
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
></iframe>
  </section>
)}


    
 {activeSection === "booking" && (
  <section className="karson-booking">
  <h2>BOOK KT MELLO</h2>
  <form
  className="booking-form"
  name="kt-mello-booking"
  method="POST"
  data-netlify="true"
>
  <input type="hidden" name="form-name" value="kt-mello-booking" />
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

export default KTMello;