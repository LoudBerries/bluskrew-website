export default function BluChekReviews({ onBack }) {
  const scorecard = [
    ["SONG", "Writing, structure, performance and replay value"],
    ["PRESENTATION", "Mix, master and overall listener experience"],
    ["MARKET", "Audience fit, identity and positioning"],
    ["ROLLOUT", "Visuals, content and release strategy"],
    ["NEXT MOVE", "The clearest action to strengthen the record"],
  ];

  return (
    <main className="review-page">
      <button className="review-back" onClick={onBack}>← Back</button>
      <section className="review-hero">
        <p>BLU CHEK</p>
        <h1>VALID OR NOT VALID?</h1>
        <h2>$50 PROFESSIONAL RECORD ASSESSMENT</h2>
        <p>Your record deserves more than a 🔥 emoji.</p>
        <p>Blu's Krew listens from a management, marketing and audience perspective, then gives you direct feedback you can actually use.</p>
        <strong>Your $50 pays for the assessment, not a positive review.</strong>
      </section>
      <section className="review-details">
        <h2>THE BLU CHEK</h2>
        <div className="review-details-grid">
          {scorecard.map(([title, copy]) => (
            <div key={title}><h3>✓ {title}</h3><p>{copy}</p></div>
          ))}
        </div>
        <p className="review-disclaimer">No guaranteed praise. No guaranteed placement. No pay-to-play promises. The point is useful information before you spend more money promoting the record.</p>
      </section>
      <section className="review-submit">
        <h2>SUBMIT YOUR RECORD</h2>
        <p>Send one song link and the information we need to match your submission.</p>
        <form name="blu-chek-review" method="POST" data-netlify="true" className="contact-form">
          <input type="hidden" name="form-name" value="blu-chek-review" />
          <input type="text" name="artist" placeholder="Artist Name" required />
          <input type="text" name="song" placeholder="Song Title" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="instagram" placeholder="Instagram @" />
          <input type="text" name="cashapp-name" placeholder="Cash App $Cashtag Used for Payment" required />
          <input type="url" name="song-link" placeholder="Private or Public Song Link" required />
          <textarea name="notes" placeholder="Anything we should know about the record?" rows="5" />
          <div className="review-payment">
            <h3>$50 REVIEW FEE</h3>
            <p>Send $50 via Cash App to <strong>$BlusKrew</strong>.</p>
            <p>Put your artist name and song title in the payment note so we can match it to your submission.</p>
            <p><strong>Your review begins after payment is confirmed.</strong></p>
            <a href="https://cash.app/$BlusKrew" target="_blank" rel="noopener noreferrer" className="review-pay-button">PAY $50 WITH CASH APP</a>
          </div>
          <button type="submit">SUBMIT RECORD</button>
        </form>
      </section>
    </main>
  );
}
