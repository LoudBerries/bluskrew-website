export const SITE_URL = "https://bluskrew.media";

export function reviewPath(item) {
  const slug = `${item.artist} ${item.title}`.normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
  return `/blu-chek-reviews/${slug || "review"}--${encodeURIComponent(item.id)}`;
}

export function reviewId(value) {
  const match = String(value).match(/(?:^|--)([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\/?$/i);
  return match?.[1] || "";
}

export function httpUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value, SITE_URL);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}
