import { useEffect, useState } from "react";

export default function PublishedBluChekReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch(
          "/.netlify/functions/blu-chek-reviews"
        );

        if (!response.ok) {
          throw new Error("Could not load reviews.");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section className="published-reviews">
        <h2>BLU CHEK REVIEWS</h2>
        <p>Loading reviews...</p>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="published-reviews">
      <div className="published-reviews-heading">
        <p>VALID OR NOT VALID?</p>
        <h2>BLU CHEK REVIEWS</h2>
      </div>

      <div className="published-reviews-grid">
        {reviews.map((item) => (
          <article className="published-review-card" key={item.id}>
            {item.artworkUrl && (
              <img
                src={item.artworkUrl}
                alt={`${item.artist} ${item.title} cover artwork`}
                className="published-review-artwork"
              />
            )}

            <div className="published-review-content">
              <p className="published-review-rating">
              {"✓".repeat(Math.floor(Number(item.rating))) + (Number(item.rating) % 1 ? "½" : "")}
              </p>

              <h3>{item.artist}</h3>
              <h4>{item.title}</h4>

              <p className="published-review-copy">
                {item.review}
              </p>

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
                {new Date(item.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}