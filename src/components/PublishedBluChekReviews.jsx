import { useEffect, useState } from "react";

export default function PublishedBluChekReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch("/.netlify/functions/blu-chek-reviews", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Could not load reviews.");
        }

        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Reviews are temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  return (
    <section className="published-reviews">
      <div className="published-reviews-heading">
        <p>VALID OR NOT VALID?</p>
        <h2>BLU CHEK REVIEWS</h2>
      </div>

      {loading && <p>Loading reviews...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && reviews.length === 0 && (
        <p>No published reviews yet.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="published-reviews-list">
          {reviews.map((item) => (
            <details className="published-review-card published-review-collapsible" key={item.id}>
              <summary className="published-review-summary">
                {item.artworkUrl && (
                  <img
                    src={item.artworkUrl}
                    alt=""
                    className="published-review-summary-artwork"
                    aria-hidden="true"
                  />
                )}
                <span className="published-review-summary-text">
                  <span className="published-review-summary-artist">{item.artist}</span>
                  <span className="published-review-summary-title">{item.title}</span>
                </span>
                <span className="published-review-summary-arrow" aria-hidden="true">⌄</span>
              </summary>

              <div className="published-review-expanded">
                {item.artworkUrl && (
                  <img
                    src={item.artworkUrl}
                    alt={`${item.artist} ${item.title} cover artwork`}
                    className="published-review-artwork"
                  />
                )}

                <div className="published-review-content">
                  <p className="published-review-rating">
                    {"✓".repeat(Math.floor(Number(item.rating))) +
                      (Number(item.rating) % 1 ? "½" : "")}
                  </p>

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
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
