import React from "react";
import roastFlyer from "../assets/images/roast-of-ak-flyer.jpg";
import jay2xFlyer from "../assets/images/jay2x-zeus-rebel-waters-acadia-2026.jpg";
import "./Events.css";

const events = [
  {
    id: "roast-of-ak-2026",
    title: "THE ROAST OF BIG HOMIE AK",
    kicker: "BLU'S KREW PRESENTS · LIVE AT THE CABOOZE",
    date: "2026-12-12T18:00:00-06:00",
    month: "DEC",
    day: "12",
    year: "2026",
    location: "The Cabooze",
    address: "913 Cedar Ave, Minneapolis, MN",
    doors: "6:00 PM",
    show: "7:00 PM",
    age: "21+",
    description:
      "One unforgettable night celebrating Big Homie AK: family, mentor, champion. The roast brings stories, laughs, and the community together, followed by a 90s dance party featuring DJ AK until close.",
    flyer: roastFlyer,
    ticketUrl: "https://www.etix.com/ticket/p/89115535/the-roast-of-big-homie-ak-minneapolis-the-cabooze",
    ticketLabel: "BUY TICKETS ON ETIX",
    extra: "Roast admission and dance party · Dance-party-only tickets also available",
    tags: ["LIVE ROAST", "90s DANCE PARTY", "DJ AK"],
    vendorApplications: true,
  },
  {
    id: "jay2x-zeus-rebel-waters-acadia-2026",
    title: "ZEUS REBEL WATERS · FEATURING JAY2X",
    kicker: "PINNACLE PROMOTIONS PRESENTS · LIVE AT ACADIA",
    date: "2026-12-12T21:00:00-06:00",
    month: "DEC",
    day: "12",
    year: "2026",
    location: "Acadia",
    address: "329 Cedar Ave, Minneapolis, MN 55454",
    show: "9:00 PM",
    age: "21+",
    description:
      "Catch Blu’s Krew artist Jay2X on the bill with Zeus Rebel Waters at Acadia. Presented by Pinnacle Promotions and hosted by Meiday612, with performances by Mr.LGII, Gunsmoke, UGZ Annunaki, Stamp3d3, Biggy Whyte, O Jilla, and more.",
    flyer: jay2xFlyer,
    extra: "$15 admission",
    tags: ["JAY2X LIVE", "ZEUS REBEL WATERS", "MINNEAPOLIS"],
  },
];

export default function Events({ onBack }) {
  const [unavailableFlyers, setUnavailableFlyers] = React.useState({});
  const upcoming = events.filter((event) => new Date(event.date).getTime() >= Date.now() - 86400000);
  const archived = events.filter((event) => new Date(event.date).getTime() < Date.now() - 86400000);

  return (
    <main className="bk-events-page">
      <header className="bk-events-topbar">
        <a href="/" onClick={(event) => { event.preventDefault(); onBack(); }} className="bk-events-brand">BLU'S KREW<span> / EVENTS</span></a>
        <button type="button" className="bk-events-back" onClick={onBack}>← BACK TO HOME</button>
      </header>
      <section className="bk-events-intro">
        <p className="bk-events-eyebrow">THE KREW BRINGS THE CULTURE</p>
        <h1>LIVE <span>EVENTS</span></h1>
        <p>Real people. Real rooms. Nights worth remembering. Find upcoming Blu's Krew experiences, artist performances, and official event details here.</p>
      </section>
      <section className="bk-events-list" aria-labelledby="upcoming-heading">
        <div className="bk-events-heading"><h2 id="upcoming-heading">UPCOMING EVENTS</h2><span>{upcoming.length} EVENT{upcoming.length === 1 ? "" : "S"}</span></div>
        {upcoming.length === 0 && <div className="bk-events-empty">New events are in the works. Check back for the next announcement.</div>}
        {upcoming.map((event) => (
          <article className="bk-event-card" key={event.id}>
            <div className="bk-event-art" aria-label={event.title}>
              <div className="bk-event-haze" aria-hidden="true" />
              {event.flyer && !unavailableFlyers[event.id] && <img className="bk-event-official-flyer" src={event.flyer} alt={`Official flyer for ${event.title}`} onError={() => setUnavailableFlyers((state) => ({ ...state, [event.id]: true }))} />}
              {event.id === "roast-of-ak-2026" ? <>
                <span className="bk-event-presented">BLU'S KREW PRESENTS</span>
                <span className="bk-event-art-small">A NIGHT FOR THE LEGEND</span>
                <strong>THE ROAST<br /><em>OF BIG HOMIE</em><br />AK</strong>
                <span className="bk-event-art-footer">FAMILY · MENTOR · CHAMPION</span>
              </> : <>
                <span className="bk-event-presented">PINNACLE PROMOTIONS PRESENTS</span>
                <strong>ZEUS<br />REBEL WATERS</strong>
                <span className="bk-event-art-footer">FEATURING JAY2X · LIVE AT ACADIA</span>
              </>}
              <div className="bk-event-date"><b>{event.month}</b><strong>{event.day}</strong><span>{event.year}</span></div>
            </div>
            <div className="bk-event-info">
              <p className="bk-event-kicker">{event.kicker}</p>
              <h3>{event.title}</h3>
              <div className="bk-event-tags">{event.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <p className="bk-event-description">{event.description}</p>
              <dl className="bk-event-details">
                <div><dt>WHEN</dt><dd>{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" })}</dd></div>
                <div><dt>VENUE</dt><dd>{event.location}<small>{event.address}</small></dd></div>
                <div><dt>TIME</dt><dd>{event.doors ? `Doors ${event.doors} · Show ${event.show}` : `Music at ${event.show}`}</dd></div>
                <div><dt>ADMISSION</dt><dd>{event.age} · {event.extra}</dd></div>
              </dl>
              <div className="bk-event-actions">
                {event.ticketUrl ? <a className="bk-event-ticket" href={event.ticketUrl} target="_blank" rel="noopener noreferrer" onClick={() => window.gtag?.("event", "select_content", { content_type: "event_ticket", item_id: event.id })}>{event.ticketLabel} ↗</a> : <span className="bk-event-coming">{event.extra}</span>}
                <a className="bk-event-contact" href="mailto:booking@bluskrew.media?subject=Event%20Inquiry">EVENT QUESTIONS</a>
              </div>
              {event.ticketUrl && <p className="bk-event-disclaimer">Ticket purchases are completed securely through the official ticketing provider. Ticket types and availability are shown on Etix.</p>}
              {event.vendorApplications && <div className="bk-event-vendors"><strong>WE AIN’T THEM.</strong><p>We’re curating the vendor lineup. Quality products, strong presentation, and a fit for the crowd.</p><a className="bk-event-contact" href="/vendors">VENDORS: APPLY FOR A TABLE →</a></div>}
            </div>
          </article>
        ))}
        {archived.length > 0 && <section className="bk-events-past"><h2>PAST EVENTS</h2>{archived.map(event => <p key={event.id}>{event.title} · {event.month} {event.day}, {event.year}</p>)}</section>}
      </section>
      <footer className="bk-events-footer"><strong>BRING YOUR EVENT TO LIFE.</strong><p>Booking, creative production, partnerships, and live experiences.</p><a href="mailto:booking@bluskrew.media?subject=Blu%27s%20Krew%20Event%20Partnership">PARTNER WITH BLU'S KREW ↗</a></footer>
    </main>
  );
}
