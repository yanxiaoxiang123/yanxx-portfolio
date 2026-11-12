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
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const p = getProject(lang, slug);
  if (!p) notFound();
  const body = await renderMarkdown(p.body);
  const t = copy[lang];
  return <main id="main" tabIndex={-1}>
    <article>
      <header className="page-head">
        <Link className="tag" href={localizedPath(lang, 'projects')}>{t.backProjects}</Link>
        <h1>{p.title}</h1>
        <p>{p.subtitle}</p>
      </header>
      <div className="case">
        <dl className="case-facts">
          <div className="fact"><dt>{t.role}</dt><dd>{p.role}</dd></div>
          <div className="fact"><dt>{t.period}</dt><dd>{p.period}</dd></div>
          <div className="fact"><dt>{t.stack}</dt><dd>{p.stack.join(' · ')}</dd></div>
          <div className="fact"><dt>{lang === 'zh' ? '类型' : 'Type'}</dt><dd>{p.kind}</dd></div>
        </dl>
        <figure className="case-image">
          <img src={`/images/work-${p.image}.webp`} width="1200" height="800" alt={lang === 'zh' ? `${p.title}的界面概念示意` : `Concept interface sketch for ${p.title}`} />
          <figcaption>{lang === 'zh' ? '界面概念示意，非产品截图' : 'Interface concept sketch, not a product screenshot'}</figcaption>
        </figure>
        <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="case-bottom">
          {p.repo && <a className="contact-link dark" href={p.repo}>{t.source}<span aria-hidden="true">↗</span></a>}
          <Link href={localizedPath(lang, 'projects')}>{t.allProjects}</Link>
        </div>
      </div>
    </article>
  </main>;
}
