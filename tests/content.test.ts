import test from 'node:test';
import assert from 'node:assert/strict';
import { isLocale, localizedPath, switchLocalePath } from '../src/lib/i18n';
import { getProjects, getProject } from '../src/lib/content';

test('locale detection rejects unrecognized route values', () => {
  assert.equal(isLocale('zh'), true);
  assert.equal(isLocale('en'), true);
  assert.equal(isLocale('fr'), false);
  assert.equal(isLocale('../en'), false);
});

test('localized paths are directory-style and preserve project identity', () => {
  assert.equal(localizedPath('zh'), '/zh/');
  assert.equal(localizedPath('en', 'projects/backing'), '/en/projects/backing/');
  assert.equal(switchLocalePath('/zh/projects/patent/', 'en'), '/en/projects/patent/');
  assert.equal(switchLocalePath('/zh/about/', 'en'), '/en/about/');
});

test('both languages have the same real projects and stable identifiers', () => {
  const zh = getProjects('zh');
  const en = getProjects('en');
  assert.equal(zh.length, 3);
  assert.deepEqual(zh.map(p => p.slug), en.map(p => p.slug));
  assert.equal(new Set(zh.map(p => p.translationKey)).size, 3);
  assert.ok(zh.every(p => p.body.length > 100 && p.title && p.role));
  assert.ok(en.every(p => p.body.length > 100 && p.title && p.role));
});

test('unknown and traversal slugs cannot select a project', () => {
  assert.equal(getProject('zh', 'does-not-exist'), undefined);
  assert.equal(getProject('en', '../../docs'), undefined);
  assert.equal(getProject('zh', 'backing')?.repo, 'https://github.com/yanxiaoxiang123/backing');
});
