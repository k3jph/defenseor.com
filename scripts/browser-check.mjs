import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chapters, contributors } from '../src/data/catalogue.mjs';
const base = 'http://127.0.0.1:4173';
const server = spawn('python3', ['-m', 'http.server', '4173', '--directory', 'dist', '--bind', '127.0.0.1'], {stdio:'ignore'});
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert.ok(ready, 'Static preview server did not start');
  await mkdir('artifacts', {recursive:true});
  browser = await chromium.launch();
  const context = await browser.newContext({viewport:{width:1440,height:1000}});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`${response.status()} ${response.url()}`); });
  const routes = ['/', '/chapters/', '/contributors/', '/book/', '/book/first-edition/', '/reading-room/', '/notices/', ...chapters.map(c => c.url), ...contributors.map(p => `/contributors/${p.slug}/`)];
  for (const route of routes) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator('h1').count(), 1, `one h1: ${route}`);
    assert.ok(await page.locator('title').textContent(), route);
  }
  await page.goto(base + '/chapters/');
  assert.equal(await page.locator('[data-search]:visible').count(), 20);
  await page.locator('input[type=search]').fill('Hill');
  assert.equal(await page.locator('[data-search]:visible').count(), 3);
  assert.ok(page.url().includes('q=Hill'));
  await page.locator('[data-clear]').click();
  await page.locator('select').selectOption('1');
  assert.equal(await page.locator('[data-search]:visible').count(), 4);
  await page.locator('input[type=search]').fill('zzzznoresults');
  assert.equal(await page.locator('[data-search]:visible').count(), 0);
  assert.ok(await page.locator('[data-empty]').isVisible());
  await page.goto(base + '/chapters/?part=0&q=Hill');
  assert.equal(await page.locator('[data-search]:visible').count(), 3);
  await page.goto(base + '/contributors/?q=Howard');
  assert.equal(await page.locator('[data-search]:visible').count(), 1);
  await page.goto(base + '/book/');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {value:{writeText:async text => {window.copiedCitation = text;}}}));
  await page.locator('[data-copy]').click();
  assert.ok((await page.evaluate(() => window.copiedCitation)).includes('Scala'));
  assert.equal((await context.cookies()).length, 0);
  assert.equal(await page.evaluate(() => localStorage.length), 0);
  const snapshots = [
    ['home-desktop','/',1440,1000],
    ['chapter-desktop',chapters.find(c => c.edition === '2e' && c.number === 19).url,1440,1000],
    ['contributors-desktop','/contributors/',1440,1000],
    ['home-mobile','/',375,812],
    ['chapters-mobile','/chapters/',375,812],
  ];
  for (const [name, route, width, height] of snapshots) {
    await page.setViewportSize({width,height});
    await page.goto(base + route);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
    await page.evaluate(() => window.scrollTo(0,0));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `horizontal overflow ${name}`);
    await page.screenshot({path:`artifacts/${name}.png`,fullPage:true});
  }
  for (const width of [320,768,1024]) {
    await page.setViewportSize({width,height:900});
    for (const route of ['/', '/chapters/', '/contributors/', '/book/', chapters.find(c => c.edition === '2e' && c.number === 18).url]) {
      await page.goto(base + route);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}px overflow ${route}`);
    }
  }
  const noJs = await browser.newContext({javaScriptEnabled:false});
  const staticPage = await noJs.newPage();
  await staticPage.goto(base + '/chapters/');
  assert.equal(await staticPage.locator('[data-search]').count(),20);
  assert.equal(await staticPage.locator('[data-search]:visible').count(),20);
  assert.equal(errors.length, 0, errors.join('\n'));
  const result = {status:'PASS', routesChecked:routes.length, responsiveWidths:[320,375,768,1024,1440], checks:['route status','single h1','local assets','live search','part filter','empty state','URL restoration','contributor search','citation copy','no application cookies or local storage','no JavaScript browse','responsive overflow','five screenshots'], consoleErrors:errors};
  await writeFile('artifacts/browser-results.json', JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
} finally { if (browser) await browser.close(); server.kill(); }
