import { chromium, firefox } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises';
import { chapters, pathways, editors } from '../src/data/catalogue.mjs';
import { citationEntries, bibtex, ris } from '../src/data/citations.mjs';
import { serve } from './serve.mjs';

await mkdir('artifacts', { recursive: true });
const { server, base } = await serve();
const routes = [];
async function scan(dir = 'dist') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await scan(p);
    else if (entry.name.endsWith('.html')) routes.push(p.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
}
await scan();
const engines = (process.env.BROWSERS || 'chromium,firefox').split(',');
const report = { status: 'RUNNING', routes: routes.length, browsers: {}, limitations: ['Automated accessibility and keyboard checks do not replace a full assistive-technology audit.', 'Production DNS, redirect, certificate, and real-origin checks run only after launch approval.'] };
const chapter = id => chapters.find(c => c.id === id);
try {
  for (const engine of engines) {
    const browser = await ({ chromium, firefox })[engine].launch(engine === 'chromium' && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] } : {});
    try {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
      const page = await context.newPage();
      const errors = [], thirdParty = [], accessibility = [];
      page.on('pageerror', e => errors.push(e.message));
      context.on('request', req => { if (!req.url().startsWith(base) && !req.url().startsWith('data:')) thirdParty.push(req.url()); });
      for (const route of routes) {
        assert.equal((await page.goto(base + route)).status(), 200, route);
        assert.equal(await page.locator('h1').count(), 1, route);
        assert.ok((await page.locator('meta[name=description]').getAttribute('content')).length > 35, route);
        assert.ok((await page.locator('link[rel=canonical]').getAttribute('href')).startsWith('https://defenseor.com/'), route);
        if (engine === 'chromium') {
          const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
          if (result.violations.length) accessibility.push({ route, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
        }
      }
      await writeFile(`artifacts/accessibility-${engine}.json`, JSON.stringify(accessibility, null, 2));
      assert.equal(accessibility.length, 0, JSON.stringify(accessibility).slice(0, 6000));
      assert.equal((await page.goto(base + '/missing-review-route/')).status(), 404);
      assert.ok((await page.locator('h1').textContent()).length > 0);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex,follow');
      for (const url of ['/chapters/', '/chapters/1e/']) {
        await page.goto(base + url);
        await page.locator('input[type=search]').waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-search]:visible').count(), 20);
        await page.locator('input[type=search]').fill('zzzznoresults');
        assert.equal(await page.locator('[data-search]:visible').count(), 0);
        assert.ok(await page.locator('[data-empty]').isVisible());
        await page.locator('[data-clear]').click();
        await page.locator('select').selectOption('1');
        assert.equal(await page.locator('[data-search]:visible').count(), url.includes('1e') ? 2 : 4);
      }
      await page.goto(base + '/chapters/?part=0&q=Hill');
      assert.equal(await page.locator('[data-search]:visible').count(), 3);
      await page.goto(base + '/chapters/1e/?q=Military%20Decision%20Analysis');
      assert.equal(await page.locator('[data-search]:visible').count(), 1);
      assert.ok((await page.locator('[data-search]:visible').textContent()).includes('Multiattribute'));
      await page.goto(base + chapter('1e-03').url);
      assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), 'https://defenseor.com/assets/covers/first-edition.webp');
      assert.ok((await page.locator('.topic-links a').first().getAttribute('href')).startsWith('/chapters/1e/'));
      await page.locator('.topic-links a').first().click();
      assert.ok(page.url().includes('/chapters/1e/?q='));
      await page.goto(base + '/contributors/?q=Howard');
      assert.equal(await page.locator('[data-search]:visible').count(), 1);
      await page.goto(base + '/');
      assert.equal(await page.locator('.joint-images a').first().getAttribute('aria-label'), `${editors[0].display}'s website`);
      // Keyboard skip link and visible focus.
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.className), 'skip');
      assert.notEqual(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'none');
      await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
      const settings = page.locator('footer [data-cookie-preferences]');
      await settings.focus(); await page.keyboard.press('Enter');
      assert.ok(await page.locator('#cookie-settings').isVisible());
      assert.ok((await page.locator('#cookie-settings').textContent()).includes('not enabled'));
      for (let i = 0; i < 5; i++) { await page.keyboard.press('Tab'); assert.ok(await page.evaluate(() => Boolean(document.activeElement.closest('dialog')))); }
      if (engine === 'chromium') {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
        assert.equal(result.violations.length, 0, JSON.stringify(result.violations));
      }
      await page.keyboard.press('Escape');
      assert.ok(await settings.evaluate(el => el === document.activeElement));
      assert.equal(await page.locator('#cookie-banner').isVisible(), false);
      assert.equal((await context.cookies()).length, 0);
      assert.equal(await page.evaluate(() => localStorage.length), 0);
      // Fetch all 84 actual static downloads and compare bytes with their generators.
      for (const c of citationEntries) for (const format of ['bib','ris']) {
        const response = await fetch(`${base}/citations/${c.id}.${format}`);
        assert.equal(response.status, 200);
        assert.equal(await response.text(), format === 'bib' ? bibtex(c) : ris(c));
      }
      await page.goto(base + chapter('2e-19').url);
      const downloadPromise = page.waitForEvent('download');
      await page.locator('a[download][href$=".bib"]').click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), '2e-19.bib');
      assert.equal(await readFile(await download.path(), 'utf8'), bibtex(chapter('2e-19')));
      if (engine === 'chromium') {
        await context.grantPermissions(['clipboard-read','clipboard-write']);
        await page.locator('[data-copy]').click();
        const copied = await page.evaluate(() => navigator.clipboard.readText());
        assert.ok(copied.includes(chapter('2e-19').doi));
        assert.ok(copied.includes('Price; Walt DeGrange'));
      }
      const sampleRoutes = ['/', '/chapters/', '/chapters/1e/', '/contributors/', '/about/', '/contact/', '/notices/', '/book/', '/book/first-edition/', chapter('2e-18').url, chapter('1e-13').url, ...pathways.map(p => '/reading-room/' + p.slug + '/')];
      for (const width of [320,375,768,1024,1440]) for (const route of sampleRoutes) {
        await page.setViewportSize({ width, height: 900 }); await page.goto(base + route);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${engine}: ${width}px overflow ${route}`);
      }
      await page.setViewportSize({ width: 1280, height: 960 });
      for (const route of ['/chapters/', '/about/', chapter('2e-18').url]) {
        await page.goto(base + route); await page.evaluate(() => document.documentElement.style.fontSize = '200%');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `200% text ${route}`);
      }
      const nojs = await browser.newContext({ javaScriptEnabled: false }); const staticPage = await nojs.newPage();
      for (const route of ['/chapters/','/chapters/1e/']) { await staticPage.goto(base + route); assert.equal(await staticPage.locator('[data-search]:visible').count(), 20); assert.equal(await staticPage.locator('.filter-bar:visible').count(), 0); }
      await staticPage.goto(base + '/notices/'); assert.equal(await staticPage.locator('script[src*="googletag"]').count(), 0);
      await nojs.close();
      const reduced = await browser.newContext({ reducedMotion: 'reduce' }); const motionPage = await reduced.newPage(); await motionPage.goto(base);
      assert.equal(await motionPage.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto'); await reduced.close();
      if (engine === 'chromium') {
        for (const [name, route, width] of [['home-desktop','/',1440],['home-mobile','/',375],['chapter',chapter('2e-19').url,1440],['chapter-mobile',chapter('2e-18').url,375],['archive','/chapters/1e/',1440],['about','/about/',1440]]) {
          await page.setViewportSize({ width, height: 1000 }); await page.goto(base + route);
          await page.locator('footer').scrollIntoViewIfNeeded(); await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
          await page.evaluate(() => scrollTo(0,0)); await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
        }
        await page.goto(base + '/'); await page.locator('footer [data-cookie-preferences]').click();
        await page.screenshot({ path: 'artifacts/cookie-settings.png', fullPage: false });
        for (const p of pathways) {
          await page.goto(base + '/reading-room/' + p.slug + '/'); await page.emulateMedia({ media: 'print' });
          assert.ok(await page.locator('.print-source').isVisible());
          await page.pdf({ path: `artifacts/${p.slug}.pdf`, format: 'A4', printBackground: false });
        }
      }
      assert.equal(errors.length, 0, errors.join('\n'));
      assert.equal(thirdParty.length, 0, thirdParty.join('\n'));
      report.browsers[engine] = { status:'PASS', routes:routes.length, axePages:engine === 'chromium' ? routes.length + 1 : 0, realClipboard:engine === 'chromium', downloads:84, thirdPartyRequests:0, widths:[320,375,768,1024,1440], enlargedText:'200%', keyboard:true, noJavaScript:true, reducedMotion:true };
    } finally { await browser.close(); }
  }
  report.status = 'PASS';
} catch (error) { report.status = 'FAIL'; report.error = error.stack; throw error; }
finally { await writeFile('artifacts/browser-results.json', JSON.stringify(report,null,2)); server.close(); }
console.log(JSON.stringify(report, null, 2));
