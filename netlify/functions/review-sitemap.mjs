import { getStore } from "@netlify/blobs";
import { SITE_URL, reviewPath } from "../../shared/review-links.mjs";

const xmlEscape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");

export async function sitemapResponse(request, store) {
  if (!["GET", "HEAD"].includes(request.method)) {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const paths = new Set();
  // Paginate so publishing more reviews never silently drops older articles.
  for await (const { blobs } of store.list({ prefix: "reviews/", paginate: true })) {
    const reviews = await Promise.all(blobs.map(({ key }) => store.get(key, { type: "json", consistency: "strong" })));
    for (const item of reviews) {
      if (item?.id && item.artist && item.title) paths.add(SITE_URL + reviewPath(item));
    }
  }
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + [...paths].sort().map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`).join("\n")
    + "\n</urlset>\n";
  return new Response(request.method === "HEAD" ? null : xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}

export default async (request) => {
  try { return await sitemapResponse(request, getStore("blu-chek-reviews")); }
  catch (error) {
    console.error("Review sitemap error:", error);
    return new Response("Sitemap temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
};
