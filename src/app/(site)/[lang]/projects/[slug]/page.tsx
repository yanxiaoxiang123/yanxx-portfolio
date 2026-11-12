import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjects, getProject, renderMarkdown } from '../../../../../lib/content';
import { copy, isLocale, locales, localizedPath } from '../../../../../lib/i18n';
export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap(lang => getProjects(lang).map(p => ({ lang, slug: p.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params; const project = isLocale(lang) ? getProject(lang, slug) : undefined;
  return project ? { title: project.title, description: project.subtitle } : {};
}
export default async function CaseStudy({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params; if (!isLocale(lang)) notFound();
  const p = getProject(lang, slug); if (!p) notFound();
  const body = await renderMarkdown(p.body); const t = copy[lang];
  return <main id="main" className="case-main"><article>
    <header className="case-heading"><Link className="text-link" href={localizedPath(lang, 'projects')}>{t.backProjects}</Link><h1>{p.title}</h1><p className="case-subtitle">{p.subtitle}</p><dl className="case-facts"><div><dt>{t.role}</dt><dd>{p.role}</dd></div><div><dt>{t.period}</dt><dd>{p.period}</dd></div><div><dt>{t.stack}</dt><dd>{p.stack.join(', ')}</dd></div></dl></header>
    <figure className="case-image"><img src={`/images/${p.image}.webp`} width="1440" height="960" alt={lang === 'zh' ? `${p.title}概念插画` : `Concept artwork for ${p.title}`} /><figcaption>{lang === 'zh' ? '项目概念插画' : 'Project concept artwork'}</figcaption></figure>
    <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
    <div className="case-bottom">{p.repo && <a className="button" href={p.repo}>{t.source}</a>}<Link className="text-link" href={localizedPath(lang, 'projects')}>{t.allProjects}</Link></div>
  </article></main>;
}
