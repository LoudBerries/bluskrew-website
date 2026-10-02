import { getStore } from "@netlify/blobs";
import { reviewId } from "../../shared/review-links.mjs";
import { renderReview } from "../lib/review-html.mjs";

export async function articleResponse(request, store) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const url = new URL(request.url);
  const id = reviewId(url.searchParams.get("article") || url.pathname.split("/").filter(Boolean).pop());
  if (!id) return new Response("Review not found", { status: 404 });
  const item = await store.get(`reviews/${id}`, { type: "json", consistency: "strong" });
  if (!item) return new Response("Review not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  return new Response(request.method === "HEAD" ? null : renderReview(item), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

export default async (request) => {
  try { return await articleResponse(request, getStore("blu-chek-reviews")); }
  catch (error) {
    console.error("Blu Chek article error:", error);
    return new Response("Review temporarily unavailable. Please try again.", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
};
