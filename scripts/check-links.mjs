import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const htmlFiles = [];
async function walk(dir) { for (const entry of await readdir(dir, {withFileTypes:true})) { const full = path.join(dir, entry.name); if (entry.isDirectory()) await walk(full); else if (entry.name.endsWith('.html')) htmlFiles.push(full); } }
await walk(root);
const errors = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const base = 'https://defenseor.com/' + path.relative(root, file).replace(/index\.html$/, '');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replace(/&amp;/g, '&');
    if (!raw || /^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const url = new URL(raw, base);
    if (url.origin !== 'https://defenseor.com') continue;
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    try {
      await access(target);
      if (url.hash && target.endsWith('.html')) {
        const contents = target === file ? html : await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!contents.includes(`id="${id}"`)) throw new Error(`missing fragment ${id}`);
      }
      checked++;
    } catch (error) { errors.push(`${path.relative(root, file)} -> ${raw} (${error.message})`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${htmlFiles.length} HTML pages, ${checked} internal links/assets/fragments checked.`);
