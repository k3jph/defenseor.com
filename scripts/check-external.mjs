// Read-only, bounded link audit. Access-limited URLs are not labelled healthy.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
const urls = new Set();
async function scan(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) await scan(p);
    else if (p.endsWith('.html')) for (const match of (await readFile(p,'utf8')).matchAll(/href="(https?:[^"<>]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'));
      if (url.hostname !== 'defenseor.com') { url.hash = ''; urls.add(url.href); }
    }
  }
}
await scan('dist'); await mkdir('artifacts', { recursive: true });
const results = [], pending = [...urls];
async function check() {
  while (pending.length) {
    const url = pending.shift();
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'DefenseOR-publication-link-audit/1.0' } });
      const status = response.status;
      await response.body?.cancel();
      results.push({ url, status, destination: response.url, outcome: status >= 200 && status < 400 ? 'reachable' : [404,410].includes(status) ? 'broken' : 'access-limited' });
    } catch (error) { results.push({ url, outcome: 'access-limited', error: error.message }); }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
}
await Promise.all([check(), check(), check()]);
results.sort((a,b) => a.url.localeCompare(b.url));
const report = { checkedAt: new Date().toISOString(), links: results.length, reachable: results.filter(r => r.outcome==='reachable').length, broken: results.filter(r => r.outcome==='broken').length, accessLimited: results.filter(r => r.outcome==='access-limited').length, results };
await writeFile('artifacts/external-links.json', JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if (report.broken) process.exitCode = 1;
