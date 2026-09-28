import { useEffect, useState } from "react";

export default function BluChekPublisher({ onBack }) {
  const [status, setStatus] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishedReviews, setPublishedReviews] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    loadPublishedReviews();
  }, []);

  async function loadPublishedReviews() {
    try {
      const response = await fetch("/.netlify/functions/blu-chek-reviews", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.error || "Could not load reviews.");
      }

      setPublishedReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus(error.message || "Could not load published reviews.");
      setPublishedReviews([]);
    }
  }

  async function handleDelete(id) {
    const adminKey = document.querySelector('input[name="adminKey"]')?.value;

    if (!adminKey) {
      setStatus("Enter your private publishing key first.");
      return;
    }

    setStatus("Deleting...");

    try {
      const response = await fetch(
        `/.netlify/functions/blu-chek-reviews?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            "x-blu-chek-key": adminKey,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || result.error || "Delete failed.");
      }

      setStatus("✓ REVIEW DELETED");
      setDeleteConfirmId(null);
      await loadPublishedReviews();
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const artwork = form.artwork.files[0];

    if (artwork && artwork.size > 3.5 * 1024 * 1024) {
      setStatus("Artwork is too large. Please use an image under 3.5 MB.");
      return;
    }

    setPublishing(true);
    setStatus("Publishing...");

    const data = new FormData();
    data.append("artist", form.artist.value.trim());
    data.append("title", form.title.value.trim());
    data.append("review", form.review.value.trim());
    data.append("rating", form.rating.value);
    data.append("mediaLink", form.mediaLink.value.trim());

    if (artwork) {
      data.append("artwork", artwork);
    }

    try {
      const response = await fetch(
        "/.netlify/functions/blu-chek-reviews",
        {
          method: "POST",
          headers: {
            "x-blu-chek-key": form.adminKey.value,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || result.error || "Publishing failed.");
      }

      setStatus("✓ REVIEW PUBLISHED");
      form.reset();
      await loadPublishedReviews();
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <main className="review-page publisher-page">
      <button className="review-back" onClick={onBack}>
        ← Back
      </button>

      <section className="review-hero">
        <p>BLU CHEK</p>
        <h1>REVIEW PUBLISHER</h1>
        <h2>PRIVATE PUBLISHING CONTROL</h2>
        <p>Write it. Rate it. Publish it.</p>
      </section>

      <section className="review-submit publisher-panel">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            PRIVATE PUBLISHING KEY
            <input
              type="password"
              name="adminKey"
              autoComplete="current-password"
              required
            />
          </label>

          <label>
            ARTIST
            <input
              type="text"
              name="artist"
              placeholder="Artist Name"
              required
            />
          </label>

          <label>
            SONG / PROJECT
            <input
              type="text"
              name="title"
              placeholder="Song or Project Title"
              required
            />
          </label>

          <label>
            COVER ARTWORK
            <input
              type="file"
              name="artwork"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>

          <label>
            BLU CHEK RATING
            <select name="rating" required defaultValue="">
              <option value="" disabled>Select Rating</option>
              <option value="1">✓</option>
              <option value="2">✓✓</option>
              <option value="3">✓✓✓</option>
              <option value="3.5">✓✓✓½</option>
              <option value="4">✓✓✓✓</option>
              <option value="4.5">✓✓✓✓½</option>
              <option value="5">✓✓✓✓✓</option>
            </select>
          </label>

          <label>
            FULL REVIEW
            <textarea
              name="review"
              rows="12"
              placeholder="Write the Blu Chek review..."
              required
            />
          </label>

          <label>
            MUSIC / VIDEO LINK
            <input
              type="url"
              name="mediaLink"
              placeholder="Spotify, Apple Music, YouTube, etc."
            />
          </label>

          <button type="submit" disabled={publishing}>
            {publishing ? "PUBLISHING..." : "PUBLISH REVIEW"}
          </button>

          {status && (
            <p className="publisher-status" role="status">
              {status}
            </p>
          )}
        </form>
      </section>

      <section className="publisher-manage">
        <h2>PUBLISHED REVIEWS</h2>

        {publishedReviews.length === 0 ? (
          <p>No published reviews.</p>
        ) : (
          publishedReviews.map((item) => (
            <div className="publisher-review-item" key={item.id}>
              <div>
                <strong>{item.artist}</strong>
                <p>{item.title}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  deleteConfirmId === item.id
                    ? handleDelete(item.id)
                    : setDeleteConfirmId(item.id)
                }
              >
                {deleteConfirmId === item.id
                  ? "CONFIRM DELETE"
                  : "DELETE REVIEW"}
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
