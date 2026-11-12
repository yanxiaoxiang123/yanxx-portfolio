import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, copy, localizedPath } from '../../../lib/i18n';
import { getProjects } from '../../../lib/content';
import { profile } from '../../../data/profile';
import ProjectShowcase from '../../../components/ProjectShowcase';
import ScrollFilm from '../../../components/ScrollFilm';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? { title: profile[lang].title, description: profile[lang].intro } : {};
}
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLocale(lang)) notFound();
  const p = profile[lang]; const t = copy[lang];
  const projects = getProjects(lang).map(({ body, ...project }) => { void body; return project; });
  return <main id="main">
    <section className={`hero hero-${lang}`} aria-labelledby="intro-title">
      <h1 id="intro-title" data-hero><span className="name-primary">{p.name}</span><span className="name-secondary">{lang === 'zh' ? 'Yan Xiaoxiang' : '晏晓翔'}</span></h1>
      <div className="hero-intro"><p className="hero-lead" data-hero>{p.intro}</p><Link className="button" data-hero href="#work">{t.viewProjects}<span aria-hidden="true">↗</span></Link></div>
      <div className="hero-bottom" data-hero><p>{p.note}</p><span>{lang === 'zh' ? '数据、算法与工程实践' : 'Data, models and systems'}</span></div>
    </section>
    <ScrollFilm lang={lang} title={p.filmTitle} text={p.filmText} />
    <section className="work-section section" id="work" aria-labelledby="work-heading">
      <div className="section-opening"><h2 id="work-heading" data-reveal>{t.projects}</h2><p data-reveal>{p.projectIntro}</p></div>
      <ProjectShowcase lang={lang} projects={projects} />
    </section>
    <section className="about-section section" id="about" aria-labelledby="about-heading">
      <div className="about-facts" data-reveal><h2 id="about-heading">{p.aboutTitle}</h2><p>{lang === 'zh' ? '常州大学' : 'Changzhou University'}<br />{lang === 'zh' ? '计算机科学与技术' : 'Computer science'}<br />{lang === 'zh' ? '硕士，预计 2027 年毕业' : 'MSc, graduating in 2027'}</p><Link className="text-link" href={localizedPath(lang, 'about')}>{p.moreAbout}</Link></div>
      <div className="about-prose"><p className="statement" data-reveal>{p.aboutText}</p><p data-reveal>{p.aboutDetail}</p></div>
    </section>
    <section className="experience-section section" id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading" data-reveal>{p.experienceTitle}</h2>
      <div className="experience-columns"><article className="internship" data-reveal><p className="secondary">{p.internship.date}</p><h3>{p.internship.title}</h3><p>{p.internship.place}</p><p>{p.internship.text}</p></article>
      {p.education.map(item => <article key={item.date} data-reveal><p className="secondary">{item.date}</p><h3>{item.title}</h3><p>{item.place}</p><p>{item.text}</p></article>)}</div>
    </section>
    <section className="research-section section" aria-labelledby="research-heading"><div className="section-opening"><h2 id="research-heading" data-reveal>{p.researchTitle}</h2><p data-reveal>{p.researchIntro}</p></div><div className="research-list">{p.research.map(item => <article key={item.url} data-reveal><h3><a href={item.url}>{item.title}</a></h3><p>{item.text}</p><a className="text-link" href={item.url} aria-label={`${t.github}: ${item.title}`}>{t.github}</a></article>)}</div></section>
  </main>;
}
