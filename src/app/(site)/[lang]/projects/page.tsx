import { notFound } from 'next/navigation';
import { getProjects } from '../../../../lib/content';
import { copy, isLocale } from '../../../../lib/i18n';
import { profile } from '../../../../data/profile';
import ProjectShowcase from '../../../../components/ProjectShowcase';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; return { title: isLocale(lang) ? copy[lang].projects : 'Work' }; }
export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const projects = getProjects(lang).map(({ body, ...project }) => { void body; return project; });
  return <main id="main" tabIndex={-1}>
    <header className="page-head">
      <h1>{copy[lang].projects}</h1>
      <p>{profile[lang].projectIntro}</p>
    </header>
    <section className="section" aria-label={copy[lang].projects}>
      <ProjectShowcase lang={lang} projects={projects} heading="h2" />
    </section>
  </main>;
}
