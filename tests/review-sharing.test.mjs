import test from "node:test";
import assert from "node:assert/strict";
import { reviewPath, reviewId, httpUrl } from "../shared/review-links.mjs";
import { renderReview } from "../netlify/lib/review-html.mjs";
import { articleResponse } from "../netlify/functions/blu-chek-article.mjs";
import { readFile } from "node:fs/promises";

const item = {
  id: "01234567-89ab-4cde-8fab-0123456789ab",
  artist: "Jonray", title: "La La La", review: "Distinctive sound.\nCatchy hooks.",
  rating: "4", artworkUrl: "/.netlify/functions/blu-chek-reviews?artwork=cover",
  mediaLink: "https://www.youtube.com/watch?v=example", publishedAt: "2026-10-02T13:00:00Z",
};

test("existing reviews get readable, stable article URLs without a data migration", () => {
  const path = reviewPath(item);
  assert.equal(path, `/blu-chek-reviews/jonray-la-la-la--${item.id}`);
  assert.equal(reviewId(path.split("/").pop()), item.id);
  assert.equal(reviewId(item.id), item.id);
  assert.equal(reviewId("../../private"), "");
});

test("article HTML includes artwork, headline, excerpt and full review without JavaScript", async () => {
  let key;
  const store = { get: async (value) => { key = value; return item; } };
  const response = await articleResponse(new Request(`https://bluskrew.media${reviewPath(item)}`), store);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.equal(key, `reviews/${item.id}`);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.ok(html.includes('<meta property="og:type" content="article">'));
  assert.ok(html.includes('content="Jonray — La La La | Blu Chek Review"'));
  assert.ok(html.includes('content="https://bluskrew.media/.netlify/functions/blu-chek-reviews?artwork=cover"'));
  assert.ok(html.includes(item.review));
  assert.ok(html.includes('content="Distinctive sound. Catchy hooks."'));
  assert.ok(html.includes(encodeURIComponent("https://bluskrew.media" + reviewPath(item))));
});

test("Netlify rewrite query selects the same article", async () => {
  const request = new Request(`https://bluskrew.media/.netlify/functions/blu-chek-article?article=jonray-la-la-la--${item.id}`);
  assert.equal((await articleResponse(request, { get: async () => item })).status, 200);
  const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
  assert.ok(redirects.indexOf("/blu-chek-reviews/*") < redirects.indexOf("/*    /index.html"));
});

test("missing and deleted articles return 404; HEAD and disallowed methods behave correctly", async () => {
  const store = { get: async () => null };
  assert.equal((await articleResponse(new Request("https://bluskrew.media/blu-chek-reviews/bad-id"), store)).status, 404);
  assert.equal((await articleResponse(new Request(`https://bluskrew.media${reviewPath(item)}`), store)).status, 404);
  const head = await articleResponse(new Request(`https://bluskrew.media${reviewPath(item)}`, { method: "HEAD" }), { get: async () => item });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  assert.equal((await articleResponse(new Request(`https://bluskrew.media${reviewPath(item)}`, { method: "POST" }), store)).status, 405);
});

test("publisher content is escaped and unsafe image/media schemes are rejected", () => {
  const html = renderReview({ ...item, artist: '<script>alert("x")</script>', review: '<img src=x onerror=alert(1)>', artworkUrl: "javascript:alert(1)", mediaLink: "javascript:alert(2)" });
  assert.ok(!html.includes('<script>alert("x")</script>'));
  assert.ok(!html.includes('<img src=x'));
  assert.ok(!html.includes("javascript:"));
  assert.equal(httpUrl("data:text/html,attack"), "");
  assert.ok(html.includes("&lt;img src=x"));
});
