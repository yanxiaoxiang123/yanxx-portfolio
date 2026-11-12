import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
/** Next segment-cache requests use dotted names; some Windows exports emit nested paths. */
export function normalizeExport(root) {
  let count = 0;
  function walk(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) { walk(file); continue; }
      if (!item.name.endsWith('.txt')) continue;
      const parts = path.relative(root, file).split(path.sep);
      const marker = parts.findIndex(part => part.startsWith('__next.'));
      if (marker < 0 || marker === parts.length - 1) continue;
      const alias = path.join(root, ...parts.slice(0, marker), parts.slice(marker).join('.'));
      if (alias !== file) { fs.copyFileSync(file, alias); count++; }
    }
  }
  walk(root);
  return count;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(`Static segment aliases: ${normalizeExport(path.resolve('out'))}`);
}
