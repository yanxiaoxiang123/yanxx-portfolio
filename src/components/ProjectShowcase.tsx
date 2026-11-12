import Link from 'next/link';
import type { Project } from '../lib/content';
import { copy, localizedPath, type Locale } from '../lib/i18n';

type Summary = Omit<Project, 'body'>;

export default function ProjectShowcase({ lang, projects, heading = 'h3' }: { lang: Locale; projects: Summary[]; heading?: 'h2' | 'h3' }) {
  const Heading = heading;
  void copy;
  return <div className="project-list">
    {projects.map(project => <Link className="project-card" key={project.slug} href={localizedPath(lang, `projects/${project.slug}`)} data-reveal>
      <Heading className="card-title">{project.title}</Heading>
      <p className="blurb">{project.subtitle}</p>
      <ul className="tags">{project.stack.slice(0, 3).map(item => <li className="tag" key={item}>{item}</li>)}</ul>
      <div className="pic"><img src={`/images/work-${project.image}.webp`} width="1200" height="800" alt={lang === 'zh' ? `${project.title}的界面概念示意` : `Concept interface sketch for ${project.title}`} loading="lazy" /></div>
      <span className="visually-hidden">{copy[lang].viewCase} · {project.kind} · {project.period}</span>
    </Link>)}
  </div>;
}
