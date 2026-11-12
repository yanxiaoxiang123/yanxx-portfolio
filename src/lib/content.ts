import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Locale } from './i18n';

export type Project = {
  lang: Locale; translationKey: string; slug: string; title: string; subtitle: string;
  role: string; period: string; year: string; kind: string; stack: string[];
  repo?: string; image: string; order: number; body: string;
};
const directory = path.join(process.cwd(), 'src/content/projects');
export function getProjects(locale: Locale): Project[] {
  return fs.readdirSync(directory).filter(name => name.endsWith(`.${locale}.md`)).map(name => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, name), 'utf8'));
    if (!/^[a-z0-9-]+$/.test(data.slug) || data.lang !== locale) throw new Error(`Invalid project: ${name}`);
    return { ...data, body: content } as Project;
  }).sort((a, b) => a.order - b.order);
}
export function getProject(locale: Locale, slug: string): Project | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  return getProjects(locale).find(project => project.slug === slug);
}
export async function renderMarkdown(body: string): Promise<string> {
  return String(await remark().use(html, { sanitize: true }).process(body));
}
