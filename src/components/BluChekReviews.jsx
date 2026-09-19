export default function BluChekReviews({ onBack }) {
  return (
    <main className="review-page">
      <button className="review-back" onClick={onBack}>
        ← Back
      </button>

      <section className="review-hero">
        <p>BLU CHEK</p>

        <h1>RECORD REVIEW</h1>

        <h2>$50 RECORD ASSESSMENT</h2>

        <p>
          Your record deserves more than a 🔥 emoji.
        </p>

        <p>
          Blu's Krew will listen to your record and give you a direct
          assessment of how it presents from a management, marketing,
          and audience perspective.
        </p>

        <strong>
          Your $50 covers the work, not a positive review.
        </strong>
      </section>
      <section className="review-details">
  <h2>WHAT YOU GET</h2>

  <div className="review-details-grid">
    <div>
      <h3>THE RECORD</h3>
      <p>
        An assessment of the song itself, including first impression,
        strengths, weaknesses, and overall presentation.
      </p>
    </div>

    <div>
      <h3>THE MARKET</h3>
      <p>
        Feedback on audience fit, marketability, and how the record
        may position in today's music landscape.
      </p>
    </div>

    <div>
      <h3>THE ROLLOUT</h3>
      <p>
        Practical observations about release and marketing potential,
        including areas worth strengthening before spending more money.
      </p>
    </div>

    <div>
      <h3>THE NEXT MOVE</h3>
      <p>
        Direct recommendations for what we believe makes sense to do
        next with the record.
      </p>
    </div>
  </div>

  <p className="review-disclaimer">
    No guaranteed praise. No guaranteed placement. No pay-to-play promises.
    The goal is to give you useful information before you spend more money
    promoting the record.
  </p>
</section>
<section className="review-submit">
  <h2>SUBMIT YOUR RECORD</h2>

  <p>
    Ready for the Blu Chek? Send us the record and the information
    we need to review it.
  </p>

  <form
    name="blu-chek-review"
    method="POST"
    data-netlify="true"
    className="contact-form"
  >
    <input
      type="hidden"
      name="form-name"
      value="blu-chek-review"
    />

    <input
      type="text"
      name="artist"
      placeholder="Artist Name"
      required
    />

    <input
      type="text"
      name="song"
      placeholder="Song Title"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      required
    />

    <input
      type="text"
      name="instagram"
      placeholder="Instagram @"
    />
<input
  type="text"
  name="cashapp-name"
  placeholder="Cash App $Cashtag Used for Payment"
  required
/>
    <input
      type="url"
      name="song-link"
      placeholder="Private or Public Song Link"
      required
    />

    <textarea
      name="notes"
      placeholder="Anything we should know about the record?"
      rows="5"
    />

    
<div className="review-payment">
  <h3>$50 REVIEW FEE</h3>

  <p>
    Send $50 via Cash App to <strong>$BlusKrew</strong>.
  </p>

  <p>
    Put your artist name and song title in the Cash App note so we
    can match your payment to your submission.
  </p>

  <p>
    <strong>Your review begins after payment is confirmed.</strong>
  </p>

  <a
    href="https://cash.app/$BlusKrew"
    target="_blank"
    rel="noopener noreferrer"
    className="review-pay-button"
  >
    PAY $50 WITH CASH APP
  </a>
</div>

<button type="submit">
  SUBMIT RECORD
</button>

  
  </form>
</section>
    </main>
  );
}