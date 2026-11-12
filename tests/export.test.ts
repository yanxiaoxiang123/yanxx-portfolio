import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { normalizeExport } from '../scripts/normalize-export.mjs';

test('exported nested segment payload is available at the client-requested dotted path', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'yanxx-export-'));
  try {
    const dir = path.join(root, 'zh/projects/backing/__next.!hash/$d$lang/projects/$d$slug');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, '__PAGE__.txt'), 'actual-flight-payload');
    normalizeExport(root);
    const alias = path.join(root, 'zh/projects/backing/__next.!hash.$d$lang.projects.$d$slug.__PAGE__.txt');
    assert.equal(fs.existsSync(alias), true);
    assert.equal(fs.readFileSync(alias, 'utf8'), 'actual-flight-payload');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('normalization preserves existing flat files and never aliases ordinary content', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'yanxx-flat-'));
  try {
    fs.writeFileSync(path.join(root, '__next._tree.txt'), 'tree');
    fs.mkdirSync(path.join(root, 'notes'));
    fs.writeFileSync(path.join(root, 'notes/readme.txt'), 'notes');
    assert.equal(normalizeExport(root), 0);
    assert.equal(fs.readFileSync(path.join(root, '__next._tree.txt'), 'utf8'), 'tree');
    assert.equal(fs.existsSync(path.join(root, 'notes.readme.txt')), false);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
