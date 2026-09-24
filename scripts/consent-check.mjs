// Exercise configured analytics with an intercepted, synthetic tag. No Google
// request leaves the browser. The production/default build keeps its blank ID.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { serve } from './serve.mjs';

await mkdir('artifacts', { recursive: true });
const id = 'G-TEST000001';
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs','build','--outDir','artifacts/consent-fixture'], {
  stdio: 'inherit', env: { ...process.env, PUBLIC_GA_ID: id, PREVIEW_BUILD: 'false' }
});
assert.equal(result.status, 0, 'Configured consent fixture must build');
const { server, base } = await serve('artifacts/consent-fixture');
const browser = await chromium.launch();
const report = { status: 'RUNNING', tests: [], tag: 'synthetic; network intercepted', limitations: ['HTTPS cookie and live-origin behavior require the gated post-launch check.'] };
const version = '1:' + id;
const cookie = (decision = 'accepted', extra = {}) => encodeURIComponent(JSON.stringify({ decision, version, expires: Date.now() + 86400000, ...extra }));
async function scenario(label, run, rawCookie, gpc = false) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 960 } });
  const requests = [], errors = [];
  await context.route('**/*', async route => {
    if (route.request().url().startsWith(base)) return route.continue();
    requests.push(route.request().url());
    if (route.request().url().startsWith('https://www.googletagmanager.com/gtag/js?')) return route.fulfill({ contentType: 'application/javascript', body: 'window.__testTagLoaded = true;' });
    await route.abort();
  });
  if (gpc) await context.addInitScript(() => Object.defineProperty(navigator, 'globalPrivacyControl', { value: true }));
  if (rawCookie) await context.addCookies([{ name: 'defenseor-consent', value: rawCookie, url: base, sameSite: 'Lax' }]);
  const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(base + '/chapters/?q=private-search#example');
    await page.waitForFunction(() => !document.querySelector('.filter-bar').hidden);
    await run({ page, context, requests });
    assert.deepEqual(errors, []);
    assert.ok(requests.every(url => url === 'https://www.googletagmanager.com/gtag/js?id=' + id), requests.join('\n'));
    report.tests.push({ name: label, status: 'PASS', tagRequests: requests.length });
  } finally { await context.close(); }
}
const accept = page => page.locator('#cookie-banner [data-cookie-accept]').click();
const reject = page => page.locator('#cookie-banner [data-cookie-reject]').click();
const settings = page => page.locator('footer [data-cookie-preferences]').click();
try {
  await scenario('no decision: no tag, no analytics storage', async ({ page, context, requests }) => {
    assert.ok(await page.locator('#cookie-banner').isVisible());
    await page.waitForTimeout(150); assert.equal(requests.length, 0);
    assert.equal((await context.cookies()).length, 0);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    assert.deepEqual(axe.violations, []);
  });
  await scenario('reject persists without a denial ping', async ({ page, context, requests }) => {
    await reject(page); await page.reload();
    assert.equal(await page.locator('#cookie-banner').isVisible(), false);
    assert.equal(requests.length, 0);
    const stored = (await context.cookies()).find(c => c.name === 'defenseor-consent');
    assert.equal(JSON.parse(decodeURIComponent(stored.value)).decision, 'rejected');
    assert.equal(stored.sameSite, 'Lax'); assert.equal(stored.path, '/');
  });
  await scenario('accept, withdraw, and accept again; sanitized page data', async ({ page, context, requests }) => {
    await accept(page); await page.waitForFunction(() => window.__testTagLoaded);
    assert.equal(requests.length, 1);
    const config = await page.evaluate(() => [...window.dataLayer].map(args => [...args]).find(row => row[0] === 'config')[2]);
    assert.equal(config.page_location, base + '/chapters/');
    assert.equal(config.allow_google_signals, false); assert.equal(config.allow_ad_personalization_signals, false);
    await context.addCookies([{ name: '_ga', value: 'test', url: base }, { name: '_ga_TEST', value: 'test', url: base }]);
    await settings(page);
    await Promise.all([page.waitForEvent('load'), page.locator('#cookie-settings [data-cookie-reject]').click()]);
    assert.equal(await page.locator('script[data-consent-analytics]').count(), 0);
    assert.equal(requests.length, 1);
    assert.ok((await context.cookies()).every(c => !c.name.startsWith('_ga')));
    await settings(page); await page.locator('#cookie-settings [data-cookie-accept]').click();
    await page.waitForFunction(() => window.__testTagLoaded);
    assert.equal(requests.length, 2);
  });
  await scenario('matching saved acceptance loads once', async ({ page, requests }) => {
    await page.waitForFunction(() => window.__testTagLoaded); assert.equal(requests.length, 1);
  }, cookie());
  for (const [label, raw] of [['malformed value', '%not-json'], ['expired choice', cookie('accepted', { expires: 0 })], ['old configuration', cookie('accepted', { version: '1:G-OTHER000001' })]]) {
    await scenario(label + ': fresh choice, no tag', async ({ page, requests }) => {
      assert.ok(await page.locator('#cookie-banner').isVisible()); assert.equal(requests.length, 0);
    }, raw);
  }
  await scenario('Global Privacy Control overrides saved acceptance', async ({ page, context, requests }) => {
    assert.equal(requests.length, 0); await settings(page);
    assert.ok(await page.locator('#cookie-settings [data-cookie-accept]').isDisabled());
    assert.ok((await page.locator('[data-cookie-state]').textContent()).includes('Global Privacy Control'));
    assert.equal(JSON.parse(decodeURIComponent((await context.cookies()).find(c => c.name === 'defenseor-consent').value)).decision, 'rejected');
  }, cookie(), true);
  await scenario('clipboard denied: useful manual-copy fallback', async ({ page }) => {
    await reject(page);
    await page.goto(base + '/chapters/2e/why-wont-they-use-our-model/');
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true }));
    await page.locator('[data-copy]').click();
    assert.ok((await page.locator('.citation-actions [role=status]').textContent()).includes('Select the citation'));
  });
  report.status = 'PASS';
} catch (error) { report.status = 'FAIL'; report.error = error.stack; throw error; }
finally { await writeFile('artifacts/consent-results.json', JSON.stringify(report, null, 2)); await browser.close(); server.close(); }
console.log(JSON.stringify(report, null, 2));
