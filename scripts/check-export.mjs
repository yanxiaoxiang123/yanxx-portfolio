import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { isAllowedExportFile } from './export-policy.mjs';

const root = path.resolve('out');
const contentDir = path.resolve('src/content/projects');
const slugs = fs.readdirSync(contentDir)
  .map(name => /^(?:zh|en)-(.+)\.(?:zh|en)\.md$/.exec(name)?.[1])
  .filter(Boolean);
assert.ok(slugs.length > 0, 'No project content found');
const uniqueSlugs = [...new Set(slugs)];
const langs = ['zh', 'en'];
const routes = ['', ...langs, ...langs.flatMap(lang => ['about', 'projects', ...uniqueSlugs.map(slug => `projects/${slug}`)].map(route => `${lang}/${route}`))];

for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing route ${route}`);
  const body = fs.readFileSync(file, 'utf8');
  if (route.startsWith('en')) assert.match(body, /<html[^>]*lang="en"/, route);
  if (route.startsWith('zh')) assert.match(body, /<html[^>]*lang="zh-CN"/, route);
  const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]));
  for (const match of body.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (href.startsWith('#')) {
      assert.ok(ids.has(href.slice(1)), `Missing in-page target ${href} in ${route || '/'}`);
      continue;
    }
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = decodeURIComponent(new URL(href, 'http://portfolio.local').pathname);
    let target = path.join(root, pathname);
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert.ok(fs.existsSync(target), `Broken local resource in ${route}: ${href}`);
  }
}

function audit(dir) {
  let files = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { files += audit(file); continue; }
    const relative = path.relative(root, file).replaceAll('\\', '/');
    assert.ok(isAllowedExportFile(relative), `Unpublishable file in export: ${relative}`);
    files += 1;
  }
  return files;
}
const fileCount = audit(root);
const notFound = fs.readFileSync(path.join(root, '404.html'), 'utf8');
assert.match(notFound, /Lost the page\?/, '404 page is not the custom one');
assert.match(notFound, /这一页暂时找不到了/, '404 page is missing the Chinese message');
console.log(`PASS: ${routes.length} routes, language attributes, in-page targets, internal resources, ${fileCount} publishable files, custom 404.`);
