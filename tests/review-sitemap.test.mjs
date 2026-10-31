import test from "node:test";
import assert from "node:assert/strict";
import { sitemapResponse } from "../netlify/functions/review-sitemap.mjs";

const first = { id: "01234567-89ab-4cde-8fab-0123456789ab", artist: "Artist", title: "Song" };
const second = { ...first, id: "11234567-89ab-4cde-8fab-0123456789ab" };
const store = {
  async *list(options) {
    assert.deepEqual(options, { prefix: "reviews/", paginate: true });
    yield { blobs: [{ key: "first" }, { key: "deleted" }] };
    yield { blobs: [{ key: "second" }, { key: "first" }] };
  },
  get: async (key) => ({ first, second }[key] || null),
};

test("review sitemap covers every page of published reviews, skipping deleted entries and duplicates", async () => {
  const response = await sitemapResponse(new Request("https://bluskrew.media/review-sitemap.xml"), store);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/xml/);
  const xml = await response.text();
  assert.equal((xml.match(/<loc>/g) || []).length, 2);
  for (const item of [first, second]) assert.ok(xml.includes(`https://bluskrew.media/blu-chek-reviews/artist-song--${item.id}`));
});

test("HEAD returns headers without a body; writes are rejected", async () => {
  const head = await sitemapResponse(new Request("https://bluskrew.media/review-sitemap.xml", { method: "HEAD" }), store);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  assert.equal((await sitemapResponse(new Request("https://bluskrew.media/review-sitemap.xml", { method: "POST" }), store)).status, 405);
});
