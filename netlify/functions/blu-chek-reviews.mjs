import { getStore } from "@netlify/blobs";

function json(data, init = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });
}

export default async (request) => {
  try {
    const reviews = getStore("blu-chek-reviews");
    const artwork = getStore("blu-chek-artwork");

    if (request.method === "GET") {
      const url = new URL(request.url);
      const artworkKey = url.searchParams.get("artwork");

      if (artworkKey) {
        const image = await artwork.get(artworkKey, {
          type: "blob",
          consistency: "strong",
        });

        if (!image) {
          return new Response("Artwork not found", {
            status: 404,
            headers: { "Cache-Control": "no-store" },
          });
        }

        return new Response(image, {
          headers: {
            "Content-Type": image.type || "image/jpeg",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }

      const { blobs } = await reviews.list({ prefix: "reviews/" });

      const publishedReviews = (
        await Promise.all(
          blobs.map((blob) =>
            reviews.get(blob.key, {
              type: "json",
              consistency: "strong",
            })
          )
        )
      )
        .filter(Boolean)
        .sort(
          (a, b) =>
            new Date(b.publishedAt || 0).getTime() -
            new Date(a.publishedAt || 0).getTime()
        );

      return json(publishedReviews);
    }

    if (request.method === "POST") {
      const suppliedKey = request.headers.get("x-blu-chek-key");
      const adminKey = process.env.BLU_CHEK_ADMIN_KEY;

      if (!adminKey) {
        return json(
          { error: "Publisher key is not configured on Netlify." },
          { status: 500 }
        );
      }

      if (suppliedKey !== adminKey) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const form = await request.formData();

      const artist = String(form.get("artist") || "").trim();
      const title = String(form.get("title") || "").trim();
      const review = String(form.get("review") || "").trim();
      const rating = String(form.get("rating") || "").trim();
      const mediaLink = String(form.get("mediaLink") || "").trim();
      const imageFile = form.get("artwork");

      if (!artist || !title || !review || !rating) {
        return json(
          { error: "Artist, title, review and rating are required." },
          { status: 400 }
        );
      }

      let artworkUrl = "";

      if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
        if (!String(imageFile.type || "").startsWith("image/")) {
          return json(
            { error: "Artwork must be an image." },
            { status: 400 }
          );
        }

        if (imageFile.size > 3.5 * 1024 * 1024) {
          return json(
            { error: "Artwork is too large. Please use an image under 3.5 MB." },
            { status: 400 }
          );
        }

        const artworkKey = crypto.randomUUID();

        await artwork.set(artworkKey, imageFile, {
          metadata: {
            contentType: imageFile.type,
            filename: imageFile.name,
          },
        });

        artworkUrl =
          `/.netlify/functions/blu-chek-reviews?artwork=${encodeURIComponent(
            artworkKey
          )}`;
      }

      const id = crypto.randomUUID();
      const publishedReview = {
        id,
        artist,
        title,
        review,
        rating,
        mediaLink,
        artworkUrl,
        publishedAt: new Date().toISOString(),
      };

      await reviews.setJSON(`reviews/${id}`, publishedReview);

      const savedReview = await reviews.get(`reviews/${id}`, {
        type: "json",
        consistency: "strong",
      });

      if (!savedReview) {
        throw new Error("Review was not readable after saving.");
      }

      return json(
        {
          success: true,
          review: savedReview,
        },
        { status: 201 }
      );
    }

    if (request.method === "DELETE") {
      const suppliedKey = request.headers.get("x-blu-chek-key");
      const adminKey = process.env.BLU_CHEK_ADMIN_KEY;

      if (!adminKey) {
        return json(
          { error: "Publisher key is not configured on Netlify." },
          { status: 500 }
        );
      }

      if (suppliedKey !== adminKey) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      const url = new URL(request.url);
      const id = url.searchParams.get("id");

      if (!id) {
        return json(
          { error: "Review ID is required." },
          { status: 400 }
        );
      }

      await reviews.delete(`reviews/${id}`);

      return json({ success: true });
    }

    return json(
      { error: "Method not allowed" },
      {
        status: 405,
        headers: { Allow: "GET, POST, DELETE" },
      }
    );
  } catch (error) {
    console.error("Blu Chek review function error:", error);
    return json(
      {
        error: "Blu Chek storage error.",
        detail: error?.message || "Unknown storage error",
      },
      { status: 500 }
    );
  }
};
