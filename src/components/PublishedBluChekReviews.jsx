import { useEffect, useState } from "react";

const permanentReviews = [
  {
    id: "fatboi-skrap-eat-2-live",
    artist: "FAT BOI SKRAP",
    title: "EAT 2 LIVE",
    review: "GROWN MAN MUSIC. Standouts: Came From Pain, Fly Shit Only, Hate On Me, Flowers For Kyia, and All On Me. Bragging Rights received the VALID stamp. Good album. One valid track.",
    verdict: "BRAGGING RIGHTS — VALID",
    publishedAt: "2026-09-20T12:00:00.000Z",
  },
];

export default function PublishedBluChekReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch("/.netlify/functions/blu-chek-reviews");
        if (!response.ok) throw new Error("Could not load reviews.");
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  const dynamicReviews = reviews.filter(
    (item) =>
      !(
        String(item.artist || "").toLowerCase().includes("skrap") &&
        String(item.title || "").toLowerCase() === "eat 2 live"
      )
  );

  const allReviews = [...permanentReviews, ...dynamicReviews];

  return (
    <section className="published-reviews">
      <div className="published-reviews-heading">
        <p>VALID OR NOT VALID?</p>
        <h2>BLU CHEK REVIEWS</h2>
      </div>

      <div className="published-reviews-grid">
        {allReviews.map((item) => (
          <article className="published-review-card" key={item.id}>
            {item.artworkUrl && (
              <img
                src={item.artworkUrl}
                alt={`${item.artist} ${item.title} cover artwork`}
                className="published-review-artwork"
              />
            )}

            <div className="published-review-content">
              {item.rating && (
                <p className="published-review-rating">
                  {"✓".repeat(Math.floor(Number(item.rating))) +
                    (Number(item.rating) % 1 ? "½" : "")}
                </p>
              )}

              {item.verdict && (
                <p className="published-review-rating">{item.verdict}</p>
              )}

              <h3>{item.artist}</h3>
              <h4>{item.title}</h4>

              <p className="published-review-copy">{item.review}</p>

              {item.mediaLink && (
                <a
                  href={item.mediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="published-review-link"
                >
                  LISTEN / WATCH
                </a>
              )}

              <p className="published-review-date">
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </article>
        ))}
      </div>

      {loading && <p>Checking for newer reviews...</p>}
    </section>
  );
}
