import React from "react";
import "./VendorApplication.css";

export default function VendorApplication({ received = false }) {
  const [submitting, setSubmitting] = React.useState(false);

  return (
    <main className="bk-vendors">
      <header className="bk-vendor-nav">
        <a href="/">BLU’S KREW</a>
        <a href="/events">← THE EVENT</a>
      </header>
      {received ? (
        <section className="bk-vendor-received">
          <p className="bk-vendor-eyebrow">THE ROAST OF AK BLOCCBOSS</p>
          <h1>APPLICATION<br /><span>RECEIVED.</span></h1>
          <p>Thanks for showing us your brand. Blu’s Krew will review your application and contact you by email about next steps.</p>
          <p>This is an application acknowledgment, not a table confirmation. A table is only confirmed after written approval and completion of the terms provided with your offer.</p>
          <a className="bk-vendor-button" href="/events">BACK TO THE EVENT</a>
        </section>
      ) : (
        <>
          <section className="bk-vendor-hero">
            <div>
              <p className="bk-vendor-eyebrow">THE ROAST OF AK BLOCCBOSS · VENDOR APPLICATION</p>
              <h1>WE AIN’T<br /><span>THEM.</span></h1>
              <p className="bk-vendor-lead">Show us what makes you different.</p>
              <p>We’re curating the vendor lineup for a night that celebrates AK and the culture he helped build. Bring quality products, a table that represents your brand, and something this crowd will want to take home.</p>
              <a className="bk-vendor-button" href="#apply">APPLY FOR A TABLE ↓</a>
            </div>
            <aside className="bk-vendor-event" aria-label="Event details">
              <p className="bk-vendor-eyebrow">BLU’S KREW PRESENTS</p>
              <h2>THE ROAST OF<br />AK BLOCCBOSS</h2>
              <strong>12.12.26</strong>
              <p>The Cabooze<br />913 Cedar Ave · Minneapolis, MN</p>
              <p>Doors 6 PM · Roast 7 PM<br />90’s dance party follows · 21+</p>
              <span>CURATED VENDORS. APPROVAL REQUIRED.</span>
            </aside>
          </section>

          <section className="bk-vendor-standards" aria-labelledby="standards-heading">
            <p className="bk-vendor-eyebrow">EVERY TABLE ADDS TO THE NIGHT</p>
            <h2 id="standards-heading">A lineup with intention.</h2>
            <div className="bk-vendor-criteria">
              <div><span>01 / PRODUCT</span><h3>Bring the quality.</h3><p>Tell us what you sell, what it costs, and what makes it worth a closer look.</p></div>
              <div><span>02 / PRESENTATION</span><h3>Show up like a brand.</h3><p>Share product photos and, if you have one, a previous table setup. Help us picture your presence in the room.</p></div>
              <div><span>03 / FIT</span><h3>Add to the experience.</h3><p>We’ll review audience fit and the overall mix of vendors, alongside quality and presentation.</p></div>
            </div>
            <p className="bk-vendor-note">Applications are reviewed individually. Applying does not reserve a table or guarantee acceptance. Table fees, space details, and setup instructions will be provided with any offer before you commit. No payment is collected with this application.</p>
          </section>

          <section id="apply" className="bk-vendor-application" aria-labelledby="application-heading">
            <div className="bk-vendor-form-intro">
              <p className="bk-vendor-eyebrow">LET’S SEE WHAT YOU BRING</p>
              <h2 id="application-heading">Make your case.</h2>
              <p>Use links we can open without requesting access. All fields are required unless marked optional.</p>
            </div>
            <form name="ak-roast-vendor-application" method="POST" action="/vendor-application-received" data-netlify="true" netlify-honeypot="bot-field" onSubmit={() => setSubmitting(true)}>
              <input type="hidden" name="form-name" value="ak-roast-vendor-application" />
              <p hidden><label>Leave this empty <input name="bot-field" tabIndex="-1" autoComplete="off" /></label></p>
              <fieldset>
                <legend>01 / YOUR BUSINESS</legend>
                <div className="bk-vendor-fields">
                  <label>Business / brand name<input name="business-name" autoComplete="organization" maxLength="160" required /></label>
                  <label>Contact name<input name="contact-name" autoComplete="name" maxLength="160" required /></label>
                  <label>Email<input name="email" type="email" autoComplete="email" maxLength="254" required /></label>
                  <label>Phone<input name="phone" type="tel" autoComplete="tel" maxLength="40" required /></label>
                  <label className="bk-vendor-wide">Website or social profile URL<input name="brand-link" type="url" placeholder="https://instagram.com/yourbrand" maxLength="2000" required /></label>
                </div>
              </fieldset>
              <fieldset>
                <legend>02 / YOUR PRODUCTS & PRESENTATION</legend>
                <div className="bk-vendor-fields">
                  <label>Product category<select name="category" defaultValue="" required><option value="" disabled>Select a category</option><option>Clothing / accessories</option><option>Art / prints / handmade goods</option><option>Beauty / personal care</option><option>Food / beverage (venue approval required)</option><option>Other — describe below</option></select></label>
                  <label>Typical price range<input name="price-range" placeholder="Example: $15–$60" maxLength="100" required /></label>
                  <label className="bk-vendor-wide">What do you plan to sell?<textarea name="products" rows="3" maxLength="3000" required /></label>
                  <label className="bk-vendor-wide">Link to product photos<input name="product-photos" type="url" placeholder="https://…" maxLength="2000" required /><small>A public gallery, shop page, or social post showing your products.</small></label>
                  <label className="bk-vendor-wide">Link to a previous table setup (optional)<input name="setup-photos" type="url" placeholder="https://…" maxLength="2000" /></label>
                  <label className="bk-vendor-wide">What makes your brand a fit for this night?<textarea name="brand-fit" rows="4" placeholder="Tell us what sets you apart and what you’ll bring to the experience." maxLength="3000" required /></label>
                </div>
              </fieldset>
              <fieldset>
                <legend>03 / YOUR SETUP</legend>
                <div className="bk-vendor-fields">
                  <label className="bk-vendor-wide">Space, equipment & access needs<textarea name="setup-needs" rows="3" placeholder="Describe your display size, whether you need a table or power, and any other requirements. Write ‘none’ if no special requirements." maxLength="2000" required /><small>Requests are subject to review. Equipment and power are not guaranteed.</small></label>
                  <label className="bk-vendor-wide">Anything else? (optional)<textarea name="notes" rows="2" maxLength="2000" /></label>
                </div>
              </fieldset>
              <div className="bk-vendor-consents">
                <label><input name="age-confirmation" type="checkbox" value="yes" required /><span>I confirm that I and anyone staffing my table will be 21 or older.</span></label>
                <label><input name="review-acknowledgment" type="checkbox" value="yes" required /><span>I understand this is an application, not a reservation. Participation requires written approval and completion of the terms provided with an offer.</span></label>
              </div>
              <p className="bk-vendor-note">Blu’s Krew will use these details to review your application and contact you about this event. Submitting does not subscribe you to promotional messages.</p>
              <button className="bk-vendor-button" type="submit" disabled={submitting}>{submitting ? "SUBMITTING…" : "SUBMIT MY APPLICATION →"}</button>
            </form>
          </section>
        </>
      )}
      <footer className="bk-vendor-footer">BLU’S KREW · BUILT WITH INTENTION. <a href="/contact">Questions? Get in touch ↗</a></footer>
    </main>
  );
}
