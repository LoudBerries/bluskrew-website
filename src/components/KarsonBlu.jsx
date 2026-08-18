import { useState } from "react";
import karsonGoto from "../assets/images/karson-goto.jpeg";
import mineyMoeCover from "../assets/images/miney-moe-cover.jpeg";
import shirtBlack from "../assets/images/karson-shirt-black.png";
import shirtGray from "../assets/images/karson-shirt-gray.png";
import shirtBlue from "../assets/images/karson-shirt-blue.jpeg";
import shirtWhite from "../assets/images/karson-shirt-white.png";
import scratchBlack from "../assets/images/scratch-black.png";
import scratchWhite from "../assets/images/scratch-white.png";
function KarsonBlu({ onBack }) {
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
        <h1>KARSON BLU</h1>

        <p>
          Built through pressure. Blooming anyway.
        </p>
      </section>

<img
  src={karsonGoto}
  alt="Karson Blu"
  className="karson-hero-photo"
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
  onClick={() => setActiveSection("shop")}
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
    <h2>KARSON BLU MUSIC</h2>
    <div className="music-card">
  <img
    src={mineyMoeCover}
    alt="Miney Moe by Karson Blu"
    className="music-cover"
  />

  <h3>MINEY MOE</h3>
  <p>Karson Blu</p>
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
{activeSection === "shop" && (
  <section className="karson-shop">
    <h2>KARSON BLU SHOP</h2>

    <div className="shop-product">
      <img
        src={selectedShirt}
        alt="Karson Blu Signature Tee"
        className="shop-product-image"
      />

      <h3>KARSON BLU SIGNATURE TEE</h3>
      <p>Available in Black, Gray, Blue & White</p>
      <div className="shirt-colors">
  <button
  className={selectedShirt === shirtBlack ? "selected" : ""}
  onClick={() => setSelectedShirt(shirtBlack)}
>
  BLACK
</button>

<button
  className={selectedShirt === shirtGray ? "selected" : ""}
  onClick={() => setSelectedShirt(shirtGray)}
>
  GRAY
</button>

<button
  className={selectedShirt === shirtBlue ? "selected" : ""}
  onClick={() => setSelectedShirt(shirtBlue)}
>
  BLUE
</button>

<button
  className={selectedShirt === shirtWhite ? "selected" : ""}
  onClick={() => setSelectedShirt(shirtWhite)}
>
  WHITE
</button>
</div>
<p className="shop-price">$30.00</p>

<p className="size-label">SELECT SIZE</p>

<div className="shirt-sizes">
  {["S", "M", "L", "XL", "2XL"].map((size) => (
    <button
      key={size}
      className={selectedSize === size ? "selected" : ""}
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </button>
  ))}
</div>

<button className="shop-now-button" type="button">
  SHOP NOW
</button>
    </div>

    <div className="shop-product">
  <img
    src={selectedScratch}
    alt="Scratch the MF'N Karson Blu Tee"
    className="shop-product-image"
  />

  <h3>SCRATCH THE MF'N TEE</h3>
  <p>Available in Black & White</p>

  <div className="shirt-colors">
    <button
      className={selectedScratch === scratchBlack ? "selected" : ""}
      onClick={() => setSelectedScratch(scratchBlack)}
    >
      BLACK
    </button>

    <button
      className={selectedScratch === scratchWhite ? "selected" : ""}
      onClick={() => setSelectedScratch(scratchWhite)}
    >
      WHITE
    </button>
  </div>

  <p className="shop-price">$30.00</p>

  <p className="size-label">SELECT SIZE</p>

  <div className="shirt-sizes">
    {["S", "M", "L", "XL", "2XL"].map((size) => (
      <button
        key={size}
        className={selectedSize === size ? "selected" : ""}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))}
  </div>

  <button className="shop-now-button" type="button">
    SHOP NOW
  </button>
</div>
  </section>
)}
 {activeSection === "booking" && (
  <section className="karson-booking">
    <h2>BOOK KARSON BLU</h2>
  <form
  className="booking-form"
  name="karson-booking"
  method="POST"
  data-netlify="true"
>
  <input type="hidden" name="form-name" value="karson-booking" />
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

export default KarsonBlu;