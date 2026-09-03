import { useState } from "react";
import jay2xMain from "../assets/images/jay2x-main.jpeg";
import mineyMoeCover from "../assets/images/miney-moe-cover.jpeg";
import shirtBlack from "../assets/images/karson-shirt-black.png";
import shirtGray from "../assets/images/karson-shirt-gray.png";
import shirtBlue from "../assets/images/karson-shirt-blue.jpeg";
import shirtWhite from "../assets/images/karson-shirt-white.png";
import scratchBlack from "../assets/images/scratch-black.png";
import scratchWhite from "../assets/images/scratch-white.png";
function Jay2X({ onBack, onShop }) {
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

      <section className="karson-hero">
        <h1>JAY2X</h1>

        <p>
          You gotta listen to me twice.
        </p>
        <a
  href="https://www.instagram.com/weluvjay2xx/"
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
  <span>@weluvjay2xx</span>
</a>
        <div className="karson-bio">
  <h2>ABOUT JAY2X</h2>

<p>
  Jay2X, born Jayden King in Inglewood, California, and raised in
  Minnesota, brings a laid-back personality and a focused approach
  to his music. Born in May and influenced by artists like Polo G,
  Jay2X has developed a style rooted in melody, emotion, and his
  own perspective.
</p>

<p>
  Naturally quiet and a little reserved, Jay tends to observe
  before opening up, but once he gets comfortable, his personality
  comes through. Outside of music, he's an avid gamer with a
  competitive streak. Put a controller in his hand and he's more
  than willing to prove himself in NBA 2K or Madden.
</p>

<p>
  Whether behind the mic, on camera, or on the sticks, Jay2X is
  still revealing different sides of himself. You might have to
  pay attention the first time. You gotta listen to him twice.
</p>
</div>
      </section>

<img
  src={jay2xMain}
  alt="Jay2X"
  className="karson-hero-photo jay2x-hero-photo"
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
    <h2>JAY2X MUSIC</h2>

    <div className="music-card">
      <h3>JAY2X</h3>

      <div className="music-players">
        <iframe
          title="Jay2X on Spotify"
          src="https://open.spotify.com/embed/track/7t9ba4OVXjHTH3nECrIfe6"
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
    <h2>JAY2X ON BLU CHEK</h2>

    <div className="jay2x-video">
      <iframe
        src="https://www.youtube.com/embed/Q9mamcAbZuQ"
        title="Jay2X on Blu Chek"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </section>
)}


    
 {activeSection === "booking" && (
  <section className="jay2x-booking">
  <h2>BOOK JAY2X</h2>
  <form onSubmit={handleBookingSubmit}
  className="booking-form"
  name="jay2x-booking"
  method="POST"
  data-netlify="true"
>
  <input type="hidden" name="form-name" value="jay2x-booking" />
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

export default Jay2X;