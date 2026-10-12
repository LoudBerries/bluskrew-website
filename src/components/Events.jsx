import React from "react";
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
    flyer: "/images/roast-of-ak-flyer.jpg",
    ticketUrl: "https://www.etix.com/ticket/p/89115535/the-roast-of-big-homie-ak-minneapolis-the-cabooze",
    ticketLabel: "BUY TICKETS ON ETIX",
    extra: "Roast admission and dance party · Dance-party-only tickets also available",
    tags: ["LIVE ROAST", "90s DANCE PARTY", "DJ AK"],
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
        <p>Real people. Real rooms. Nights worth remembering. Find upcoming Blu's Krew experiences and get official tickets here.</p>
      </section>
      <section className="bk-events-list" aria-labelledby="upcoming-heading">
        <div className="bk-events-heading"><h2 id="upcoming-heading">UPCOMING EVENTS</h2><span>{upcoming.length} EVENT{upcoming.length === 1 ? "" : "S"}</span></div>
        {upcoming.length === 0 && <div className="bk-events-empty">New events are in the works. Check back for the next announcement.</div>}
        {upcoming.map((event) => (
          <article className="bk-event-card" key={event.id}>
            <div className="bk-event-art" aria-label={event.title}>
              <div className="bk-event-haze" aria-hidden="true" />
              {event.flyer && !unavailableFlyers[event.id] && <img className="bk-event-official-flyer" src={event.flyer} alt={`Official flyer for ${event.title}`} onError={() => setUnavailableFlyers((state) => ({ ...state, [event.id]: true }))} />}
              <span className="bk-event-presented">BLU'S KREW PRESENTS</span>
              <span className="bk-event-art-small">A NIGHT FOR THE LEGEND</span>
              <strong>THE ROAST<br /><em>OF BIG HOMIE</em><br />AK</strong>
              <span className="bk-event-art-footer">FAMILY · MENTOR · CHAMPION</span>
              <div className="bk-event-date"><b>{event.month}</b><strong>{event.day}</strong><span>{event.year}</span></div>
            </div>
            <div className="bk-event-info">
              <p className="bk-event-kicker">{event.kicker}</p>
              <h3>{event.title}</h3>
              <div className="bk-event-tags">{event.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <p className="bk-event-description">{event.description}</p>
              <dl className="bk-event-details">
                <div><dt>WHEN</dt><dd>Saturday, December 12, 2026</dd></div>
                <div><dt>VENUE</dt><dd>{event.location}<small>{event.address}</small></dd></div>
                <div><dt>TIME</dt><dd>Doors {event.doors} · Show {event.show}</dd></div>
                <div><dt>ADMISSION</dt><dd>{event.age} · {event.extra}</dd></div>
              </dl>
              <div className="bk-event-actions">
                {event.ticketUrl ? <a className="bk-event-ticket" href={event.ticketUrl} target="_blank" rel="noopener noreferrer" onClick={() => window.gtag?.("event", "select_content", { content_type: "event_ticket", item_id: event.id })}>{event.ticketLabel} ↗</a> : <span className="bk-event-coming">TICKETS COMING SOON</span>}
                <a className="bk-event-contact" href="mailto:booking@bluskrew.media?subject=Event%20Inquiry">EVENT QUESTIONS</a>
              </div>
              <p className="bk-event-disclaimer">Ticket purchases are completed securely through the official ticketing provider. Ticket types and availability are shown on Etix.</p>
            </div>
          </article>
        ))}
        {archived.length > 0 && <section className="bk-events-past"><h2>PAST EVENTS</h2>{archived.map(event => <p key={event.id}>{event.title} · {event.month} {event.day}, {event.year}</p>)}</section>}
      </section>
      <footer className="bk-events-footer"><strong>BRING YOUR EVENT TO LIFE.</strong><p>Booking, creative production, partnerships, and live experiences.</p><a href="mailto:booking@bluskrew.media?subject=Blu%27s%20Krew%20Event%20Partnership">PARTNER WITH BLU'S KREW ↗</a></footer>
    </main>
  );
}
