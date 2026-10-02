import { SITE_URL, reviewPath, httpUrl } from "../../shared/review-links.mjs";

const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function renderReview(item) {
  const headline = `${item.artist} — ${item.title} | Blu Chek Review`;
  const description = String(item.review || "").replace(/\s+/g, " ").trim().slice(0, 200);
  const canonical = SITE_URL + reviewPath(item);
  const image = httpUrl(item.artworkUrl);
  const media = httpUrl(item.mediaLink);
  const rating = Math.max(0, Math.min(5, Number(item.rating) || 0));
  const published = new Date(item.publishedAt);
  const date = Number.isNaN(published.getTime()) ? "" : published.toLocaleDateString("en-US", { timeZone: "America/Chicago", year: "numeric", month: "long", day: "numeric" });
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(headline)}</title>
<link rel="icon" href="/favicon.svg"><link rel="canonical" href="${escape(canonical)}">
<meta name="description" content="${escape(description)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Blu's Krew">
<meta property="og:title" content="${escape(headline)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(canonical)}">
${image ? `<meta property="og:image" content="${escape(image)}"><meta property="og:image:alt" content="${escape(item.artist)} — ${escape(item.title)} artwork">` : ""}
<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${escape(headline)}"><meta name="twitter:description" content="${escape(description)}">
${image ? `<meta name="twitter:image" content="${escape(image)}">` : ""}
<style>
*{box-sizing:border-box}body{margin:0;background:#07111f;color:#f4f7fa;font-family:Arial,sans-serif}main{max-width:880px;margin:auto;padding:28px 20px 64px}nav{display:flex;justify-content:space-between;gap:16px;margin-bottom:40px}a{color:#4da6ff}nav a{text-decoration:none}.eyebrow{color:#4da6ff;letter-spacing:3px;font-size:14px;font-weight:bold}article{background:#07182b;border:1px solid #4da6ff4d;border-radius:16px;overflow:hidden}.artwork{display:block;width:100%;max-height:660px;object-fit:contain;background:#03101f}.content{padding:clamp(20px,5vw,40px)}h1{font-size:clamp(28px,6vw,44px);margin:8px 0;overflow-wrap:anywhere}h2{color:#a9b8c9;font-size:22px;margin:8px 0 24px}.rating{color:#4da6ff;font-size:24px;letter-spacing:4px}.copy{white-space:pre-wrap;line-height:1.8;overflow-wrap:anywhere}.date{color:#a9b8c9;font-size:14px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.actions a,.actions button{display:inline-block;background:#4da6ff;color:#03101f;border:0;border-radius:8px;padding:12px 18px;font:bold 14px Arial;text-decoration:none;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid white;outline-offset:4px}#share-status{line-height:1.5;overflow-wrap:anywhere}
</style></head><body><main>
<nav><a href="/">Blu's Krew</a><a href="/blu-chek-reviews">← All reviews</a></nav>
<p class="eyebrow">BLU CHEK · RECORD REVIEW</p>
<article>${image ? `<img class="artwork" src="${escape(image)}" alt="${escape(item.artist)} — ${escape(item.title)} artwork">` : ""}
<div class="content"><h1>${escape(item.artist)}</h1><h2>${escape(item.title)}</h2>
<p class="rating" aria-label="${rating} out of 5">${"✓".repeat(Math.floor(rating))}${rating % 1 ? "½" : ""}</p>
<p class="copy">${escape(item.review)}</p><p class="date">${escape(date)}</p>
<div class="actions">${media ? `<a href="${escape(media)}" target="_blank" rel="noopener noreferrer">LISTEN / WATCH</a>` : ""}
<a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}" target="_blank" rel="noopener noreferrer">SHARE TO FACEBOOK</a>
<button id="copy-link" type="button">COPY ARTICLE LINK</button></div>
<p id="share-status" role="status"></p></div></article></main>
<script>
document.getElementById('copy-link').addEventListener('click', async function () {
  const link = document.querySelector('link[rel="canonical"]').href;
  const status = document.getElementById('share-status');
  try { await navigator.clipboard.writeText(link); status.textContent = 'Article link copied.'; }
  catch { status.textContent = 'Copy this article link: ' + link; }
});
</script></body></html>`;
}
