'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Project } from '../lib/content';
import { copy, localizedPath, type Locale } from '../lib/i18n';
type Summary = Omit<Project, 'body'>;
export default function ProjectShowcase({ lang, projects }: { lang: Locale; projects: Summary[] }) {
  const [active, setActive] = useState(projects[0]?.slug);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive((visible.target as HTMLElement).id.replace('project-', ''));
    }, { rootMargin: '-15% 0px -25% 0px', threshold: [0.1, 0.4, 0.7] });
    root.current?.querySelectorAll('[data-project]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="project-showcase" ref={root}>
    <nav className="project-index" aria-label={lang === 'zh' ? '选择项目' : 'Choose a project'}>
      {projects.map(project => <a key={project.slug} className={active === project.slug ? 'is-active' : ''} href={`#project-${project.slug}`} aria-current={active === project.slug ? 'true' : undefined} onClick={() => setActive(project.slug)}><span>{project.title}</span><span className="project-kind">{project.kind}</span></a>)}
    </nav>
    <div className="project-visuals">{projects.map(project => <article data-project data-reveal className="project-feature" id={`project-${project.slug}`} key={project.slug}>
      <Link className="project-image-link" href={localizedPath(lang, `projects/${project.slug}`)} tabIndex={-1} aria-hidden="true"><img src={`/images/${project.image}.webp`} width="1440" height="960" alt={lang === 'zh' ? `${project.title}的纸艺概念插画` : `Paper still life concept for ${project.title}`} loading="lazy" /></Link>
      <div className="project-description"><div><h3><Link href={localizedPath(lang, `projects/${project.slug}`)}>{project.title}</Link></h3><p>{project.subtitle}</p><p className="secondary">{project.role}</p></div><Link className="text-link" href={localizedPath(lang, `projects/${project.slug}`)} aria-label={`${copy[lang].viewCase}: ${project.title}`}>{copy[lang].viewCase}</Link></div>
    </article>)}</div>
  </div>;
}
