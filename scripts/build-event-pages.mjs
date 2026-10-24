import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { join } from "node:path";

// Generate a real HTML entry point with the same Vite bundle and all existing forms.
// Facebook and other link scrapers read the metadata without executing JavaScript.
const dist = "dist";
const home = await readFile(join(dist, "index.html"), "utf8");
const meta = `
  <title>The Roast of Big Homie AK | Blu's Krew Events</title>
  <meta name="description" content="The Roast of Big Homie AK, Dec 12, 2026 at The Cabooze in Minneapolis. Doors 6 PM, show 7 PM. 21+. 90s dance party featuring DJ AK." />
  <link rel="canonical" href="https://bluskrew.media/events" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Blu's Krew" />
  <meta property="og:title" content="The Roast of Big Homie AK | Dec 12 at The Cabooze" />
  <meta property="og:description" content="Blu's Krew presents The Roast of Big Homie AK. December 12, 2026. Doors 6 PM, show 7 PM. 90s Dance Party featuring DJ AK. 21+. Get tickets through Etix." />
  <meta property="og:url" content="https://bluskrew.media/events" />
  <meta property="og:image" content="https://bluskrew.media/images/roast-of-ak-flyer.jpg" />
  <meta property="og:image:secure_url" content="https://bluskrew.media/images/roast-of-ak-flyer.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content="Official flyer for The Roast of Big Homie AK at The Cabooze on December 12, 2026" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="The Roast of Big Homie AK | Blu's Krew" />
  <meta name="twitter:description" content="December 12 at The Cabooze. Doors 6 PM, show 7 PM. 21+. With 90s Dance Party featuring DJ AK." />
  <meta name="twitter:image" content="https://bluskrew.media/images/roast-of-ak-flyer.jpg" />
`;
const eventStructuredData = `
  <script type="application/ld+json">${JSON.stringify({ "@context":"https://schema.org","@type":"Event",name:"The Roast of Big Homie AK",startDate:"2026-12-12T19:00:00-06:00",eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",eventStatus:"https://schema.org/EventScheduled",location:{"@type":"Place",name:"The Cabooze",address:{"@type":"PostalAddress",streetAddress:"913 Cedar Ave",addressLocality:"Minneapolis",addressRegion:"MN",addressCountry:"US"}},image:["https://bluskrew.media/images/roast-of-ak-flyer.jpg"],description:"Blu's Krew presents The Roast of Big Homie AK, followed by a 90s dance party featuring DJ AK. Doors at 6 PM, show at 7 PM. Ages 21+.",organizer:{"@type":"Organization",name:"Blu's Krew",url:"https://bluskrew.media"},offers:{"@type":"Offer",url:"https://www.etix.com/ticket/p/89115535/the-roast-of-big-homie-ak-minneapolis-the-cabooze"}})}</script>
`;
const eventHtml = home
  .replace(/<title>[^<]*<\/title>/, "")
  .replace(/<meta name="description"[^>]*\/>/g, "")
  .replace(/<meta property="og:[^>]*\/>/g, "")
  .replace(/<meta name="twitter:[^>]*\/>/g, "")
  .replace(/<link rel="canonical"[^>]*\/>/g, "")
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
  .replace("</head>", `${meta}${eventStructuredData}</head>`);
await mkdir(join(dist, "events"), { recursive: true });
await writeFile(join(dist, "events", "index.html"), eventHtml, "utf8");
console.log("Built /events social preview HTML.");

// Artist links need their own server-readable identity, including canonical URL.
// Reuse the existing public artist photo without changing the React page or forms.
await mkdir(join(dist, "images"), { recursive: true });
await copyFile("src/assets/images/karson-goto.jpeg", join(dist, "images", "karson-blu-epk.jpeg"));
const karsonMeta = `
  <title>Karson Blu | Official EPK & Booking | Blu's Krew</title>
  <meta name="description" content="Karson Blu, Minneapolis artist and 2026 TrapRite Female Artist of the Year. Explore her music, videos, artist bio and booking information." />
  <link rel="canonical" href="https://bluskrew.media/karsonblu" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Blu's Krew" />
  <meta property="og:title" content="Karson Blu | Official EPK & Booking" />
  <meta property="og:description" content="2026 TrapRite Female Artist of the Year. Music, videos, artist bio and booking information for Minneapolis artist Karson Blu." />
  <meta property="og:url" content="https://bluskrew.media/karsonblu" />
  <meta property="og:image" content="https://bluskrew.media/images/karson-blu-epk.jpeg" />
  <meta property="og:image:secure_url" content="https://bluskrew.media/images/karson-blu-epk.jpeg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content="Karson Blu — official artist portrait" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Karson Blu | Official EPK & Booking" />
  <meta name="twitter:description" content="2026 TrapRite Female Artist of the Year. Explore Karson Blu's music, videos and booking information." />
  <meta name="twitter:image" content="https://bluskrew.media/images/karson-blu-epk.jpeg" />
  <meta name="twitter:image:alt" content="Karson Blu — official artist portrait" />
`;
const karsonHtml = home
  .replace(/<title>[^<]*<\/title>/, "")
  .replace(/<meta name="description"[^>]*\/>/g, "")
  .replace(/<meta property="og:[^>]*\/>/g, "")
  .replace(/<meta name="twitter:[^>]*\/>/g, "")
  .replace(/<link rel="canonical"[^>]*\/>/g, "")
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
  .replace("</head>", `${karsonMeta}</head>`);
for (const path of ["karsonblu", "karson-blu"]) {
  await mkdir(join(dist, path), { recursive: true });
  await writeFile(join(dist, path, "index.html"), karsonHtml, "utf8");
}
console.log("Built Karson Blu EPK social preview HTML.");

// Keep the vendor invitation distinct when shared and provide a real POST landing page.
for (const [path, title, description] of [
  ["vendors", "Vendor Application | The Roast of AK Bloccboss | Blu’s Krew", "We ain’t them. Show us what makes you different. Apply for the curated vendor lineup at The Roast of AK Bloccboss, December 12, 2026 at The Cabooze. Approval required."],
  ["vendor-application-received", "Vendor Application Received | Blu’s Krew", "Your vendor application has been submitted for review. Applying does not confirm a table."],
]) {
  const vendorMeta = `
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://bluskrew.media/${path}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Blu’s Krew" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://bluskrew.media/${path}" />
  <meta property="og:image" content="https://bluskrew.media/images/roast-of-ak-flyer.jpg" />
  <meta property="og:image:alt" content="The Roast of Big Homie AK at The Cabooze" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://bluskrew.media/images/roast-of-ak-flyer.jpg" />
  ${path === "vendor-application-received" ? '<meta name="robots" content="noindex" />' : ""}`;
  const html = home
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta name="description"[^>]*\/>/g, "")
    .replace(/<meta property="og:[^>]*\/>/g, "")
    .replace(/<meta name="twitter:[^>]*\/>/g, "")
    .replace(/<link rel="canonical"[^>]*\/>/g, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .replace("</head>", `${vendorMeta}</head>`);
  await mkdir(join(dist, path), { recursive: true });
  await writeFile(join(dist, path, "index.html"), html, "utf8");
}
console.log("Built vendor application and acknowledgment HTML.");
