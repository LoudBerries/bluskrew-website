import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { socialFooter, socialFooterRow, socialFooterStyles } from '../shared/social-footer.mjs';

// React pages share SocialFooter in main.jsx. Standalone articles need the same row.
async function addFooters(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await addFooters(path);
    } else if (entry.name.endsWith('.html')) {
      let html = await readFile(path, 'utf8');
      if (html.includes('id="root"') || html.includes('class="bk-social-row"')) continue;
      html = html.replace('</head>', `<style>${socialFooterStyles}</style></head>`);
      html = html.includes('</footer>')
        ? html.replace('</footer>', `${socialFooterRow}</footer>`)
        : html.replace('</body>', `${socialFooter}</body>`);
      await writeFile(path, html);
    }
  }
}
await addFooters('dist');
console.log('Added social links to standalone pages.');
