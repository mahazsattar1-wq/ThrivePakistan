/**
 * Tiny zero-dependency static server for the production build (`dist/`).
 * Mirrors the PHP-hosting behaviour of public/.htaccess:
 *   - /api/*.php  -> 501 JSON (PHP runtime lives on the real host)
 *   - existing files served with long-cache headers
 *   - everything else falls back to index.html (SPA routing)
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const PORT = Number(process.env.PORT || 4173);
const ROOT = resolve('dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const send = (res, code, body, headers = {}) => {
  res.writeHead(code, headers);
  res.end(body);
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  let pathname = decodeURIComponent(url.pathname);

  // PHP endpoints are not executable here — respond like a placeholder host.
  if (pathname.startsWith('/api/') && pathname.endsWith('.php')) {
    return send(res, 501, JSON.stringify({
      ok: false,
      source: 'placeholder',
      data: [],
      message: 'PHP runtime not available on this static preview — frontend mock data in use.',
    }), { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  }

  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(ROOT, safePath);
  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, 'Forbidden');
  }

  try {
    let info = await stat(filePath);
    if (info.isDirectory()) {
      filePath = join(filePath, 'index.html');
      info = await stat(filePath);
    }
    const ext = extname(filePath).toLowerCase();
    const body = await readFile(filePath);
    const cache = ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable';
    return send(res, 200, body, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': cache,
    });
  } catch {
    // SPA fallback
    try {
      const html = await readFile(join(ROOT, 'index.html'));
      return send(res, 200, html, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
    } catch {
      return send(res, 404, 'Not found — run `npm run build` first.');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Thrive Pakistan preview serving dist/ on http://0.0.0.0:${PORT}`);
});
