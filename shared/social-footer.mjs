export const socialLinks = [
  ['Instagram', 'https://instagram.com/bluskrew'],
  ['YouTube', 'https://www.youtube.com/@bluskrewtv'],
  ['Facebook', 'https://www.facebook.com/people/Blus-Krew/61585760019342/'],
  ['TikTok', 'https://www.tiktok.com/@bluskrew'],
];

export const socialFooterRow = `<div class="bk-social-row"><span>Follow Blu's Krew</span><div class="bk-social-links">${socialLinks.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Blu's Krew on ${label}">${label}</a>`).join('')}</div></div>`;
export const socialFooter = `<footer class="bk-social-footer">${socialFooterRow}</footer>`;
export const socialFooterStyles = `.bk-social-footer{box-sizing:border-box;width:100%;max-width:none;margin:0;padding:0;background:#07151d;color:#d7d5d4;border:0}.bk-social-row{box-sizing:border-box;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:16px 24px;width:100%;padding:24px;background:#07151d;color:#d7d5d4;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;letter-spacing:normal;text-align:center}.bk-social-links{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:12px 24px}.bk-social-row .bk-social-links a{color:#d7d5d4;font:inherit;text-transform:none;letter-spacing:normal;text-decoration:none;text-underline-offset:4px}.bk-social-row .bk-social-links a:hover,.bk-social-row .bk-social-links a:focus-visible{color:#56a1ce;text-decoration:underline}.bk-social-row .bk-social-links a:focus-visible{outline:2px solid #56a1ce;outline-offset:4px}`;
