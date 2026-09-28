import { getStore } from "@netlify/blobs";

const reviews = getStore({
  name: "blu-chek-reviews",
  consistency: "strong",
});

const artwork = getStore({
  name: "blu-chek-artwork",
  consistency: "strong",
});

export default async (request) => {
  if (request.method === "GET") {
    const url = new URL(request.url);
    const artworkKey = url.searchParams.get("artwork");

    if (artworkKey) {
      const image = await artwork.get(artworkKey, { type: "blob" });

      if (!image) {
        return new Response("Artwork not found", { status: 404 });
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
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );

    return Response.json(publishedReviews);
  }
if (request.method === "DELETE") {
  const suppliedKey = request.headers.get("x-blu-chek-key");
  const adminKey = process.env.BLU_CHEK_ADMIN_KEY;

  if (!adminKey || suppliedKey !== adminKey) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Review ID is required." },
      { status: 400 }
    );
  }

  await reviews.delete(`reviews/${id}`);

  return Response.json({ success: true });
}

  if (request.method === "POST") {
    const suppliedKey = request.headers.get("x-blu-chek-key");
    const adminKey = process.env.BLU_CHEK_ADMIN_KEY;

    if (!adminKey || suppliedKey !== adminKey) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const form = await request.formData();

    const artist = String(form.get("artist") || "").trim();
    const title = String(form.get("title") || "").trim();
    const review = String(form.get("review") || "").trim();
    const rating = String(form.get("rating") || "").trim();
    const mediaLink = String(form.get("mediaLink") || "").trim();
    const imageFile = form.get("artwork");

    if (!artist || !title || !review || !rating) {
      return Response.json(
        { error: "Artist, title, review and rating are required." },
        { status: 400 }
      );
    }

    let artworkUrl = "";

    if (imageFile instanceof File && imageFile.size > 0) {
      if (!imageFile.type.startsWith("image/")) {
        return Response.json(
          { error: "Artwork must be an image." },
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

    return Response.json(
      {
        success: true,
        review: publishedReview,
      },
      { status: 201 }
    );
  }

  return new Response("Method not allowed", {
    status: 405,
    headers: {
      Allow: "GET, POST",
    },
  });
};