import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('out');
const paths = ['', 'zh', 'en', ...['zh','en'].flatMap(lang => ['about','projects',...['backing','patent','logistics'].map(p => `projects/${p}`)].map(p => `${lang}/${p}`))];
for (const route of paths) {
  const file = path.join(root, route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing route ${route}`);
  const body = fs.readFileSync(file, 'utf8');
  if (route.startsWith('en')) assert.match(body, /<html[^>]*lang="en"/, route);
  if (route.startsWith('zh')) assert.match(body, /<html[^>]*lang="zh-CN"/, route);
  for (const match of body.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = decodeURIComponent(new URL(href, 'http://portfolio.local').pathname);
    let target = path.join(root, pathname);
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert.ok(fs.existsSync(target), `Broken local resource in ${route}: ${href}`);
  }
}
function audit(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) audit(file);
    else assert.ok(!/\.pdf$|^\.env|\.pem$|\.key$/i.test(entry.name), `Private file in export: ${file}`);
  }
}
audit(root);
assert.ok(fs.existsSync(path.join(root, '404.html')), 'Missing custom 404');
console.log(`PASS: ${paths.length} routes, language attributes, internal resources, 404 and private-file exclusion.`);
