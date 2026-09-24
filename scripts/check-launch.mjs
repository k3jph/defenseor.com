// Passive acceptance check for the real domain after an approved deployment.
// A 200 holding page is not a successful publication.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const origin = 'https://defenseor.com';
if (!process.argv.includes('--live')) throw new Error('Run explicitly with --live only after the approved production deployment.');
const report = { origin, checkedAt:new Date().toISOString(), status:'RUNNING', checks:[] };
async function get(path, status = 200) {
  const response = await fetch(origin + path, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status,status,path);
  assert.ok(response.url.startsWith(origin + '/'), path + ' preferred HTTPS host');
  report.checks.push({ path, status:response.status, final:response.url });
  return response.text();
}
try {
  for (const address of ['http://defenseor.com/', 'http://www.defenseor.com/', 'https://www.defenseor.com/']) {
    const redirect = await fetch(address, { redirect:'manual', signal:AbortSignal.timeout(30000) });
    assert.ok([301,302,307,308].includes(redirect.status), address + ' must redirect');
    const final = await fetch(address, { signal:AbortSignal.timeout(30000) });
    assert.equal(new URL(final.url).origin, origin); report.checks.push({ address, redirect:redirect.status, final:final.url });
  }
  const home = await get('/');
  assert.ok(home.includes('A website of')); assert.ok(home.includes('Natalie Scala')); assert.ok(home.includes('/chapters/'));
  assert.ok(!/COMING SOON/i.test(home)); assert.ok(!/name="robots"[^>]*noindex/.test(home));
  assert.ok(home.includes('https://defenseor.com/'));
  for (const path of ['/about/','/contact/','/chapters/1e/','/chapters/2e/why-wont-they-use-our-model/','/reading-room/from-data-to-a-model/']) assert.ok((await get(path)).includes('id="main"'));
  assert.ok((await get('/citations/2e-19.bib')).includes('10.1201/9781003396307-22'));
  assert.ok((await get('/sitemap.xml')).includes('https://defenseor.com/about/'));
  assert.ok((await get('/robots.txt')).includes('Sitemap: https://defenseor.com/sitemap.xml'));
  assert.ok((await get('/missing-production-acceptance-route/',404)).includes('noindex'));
  report.status='PASS';
} catch(error) { report.status='FAIL';report.error=error.stack;throw error; }
finally { await mkdir('artifacts',{recursive:true}); await writeFile('artifacts/launch-results.json',JSON.stringify(report,null,2)); }
console.log(JSON.stringify(report,null,2));
