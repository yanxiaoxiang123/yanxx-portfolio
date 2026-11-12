import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
const server = http.createServer((req, res) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    file = path.resolve(root, `.${pathname}`);
    if (path.relative(root, file).startsWith('..')) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  } catch { res.writeHead(400).end(); return; }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { file = path.join(root, '404.html'); res.statusCode = 404; }
  if (!fs.existsSync(file)) { res.writeHead(404).end('Not found'); return; }
  const size = fs.statSync(file).size;
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  res.setHeader('Accept-Ranges', 'bytes');
  const range = req.headers.range;
  if (range && path.extname(file) === '.mp4') {
    const match = /^bytes=(\d+)-(\d*)$/.exec(range);
    if (!match) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
    const start = Number(match[1]); const end = Math.min(match[2] ? Number(match[2]) : size - 1, size - 1);
    if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
    res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(file, { start, end }).pipe(res);
  } else {
    res.setHeader('Content-Length', size);
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
  }
});
server.listen(4173, '0.0.0.0', () => console.log('Portfolio production preview ready on http://localhost:4173'));
