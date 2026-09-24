import { chapters, contributors, pathways } from '../data/catalogue.mjs';
export function GET() {
  const paths = ['/', '/chapters/', '/contributors/', '/reading-room/', '/book/', '/book/first-edition/', '/notices/', ...chapters.map(c => c.url), ...contributors.map(p => `/contributors/${p.slug}/`), ...pathways.map(p => `/reading-room/${p.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>https://defenseor.com${path}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
