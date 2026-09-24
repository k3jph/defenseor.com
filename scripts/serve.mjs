import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.xml':'application/xml', '.txt':'text/plain', '.bib':'application/x-bibtex', '.ris':'application/x-research-info-systems', '.json':'application/json' };
export async function serve(directory = 'dist', port = 0) {
  const root = path.resolve(directory);
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const decoded = decodeURIComponent(url.pathname);
      let file = path.resolve(root, '.' + decoded);
      if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
      if ((await stat(file).catch(() => null))?.isDirectory()) {
        if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' + url.search }); res.end(); return; }
        file = path.join(file, 'index.html');
      }
      const data = await readFile(file).catch(() => null);
      res.writeHead(data ? 200 : 404, { 'Content-Type': data ? mime[path.extname(file)] || 'application/octet-stream' : mime['.html'] });
      res.end(req.method === 'HEAD' ? '' : data || await readFile(path.join(root, '404.html')));
    } catch { res.writeHead(400); res.end('Bad request'); }
  });
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { base } = await serve(process.argv[2] || 'dist', Number(process.env.PORT || 4173));
  console.log(`Local review: ${base}`);
}
