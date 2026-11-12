import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, localizedPath } from '../../../lib/i18n';
import { getProjects } from '../../../lib/content';
import { profile } from '../../../data/profile';
import ProjectShowcase from '../../../components/ProjectShowcase';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? { title: profile[lang].title, description: profile[lang].intro } : {};
}

function Shimmer({ text, lang }: { text: string; lang: 'zh' | 'en' }) {
  const parts = lang === 'zh' ? text.split(/(?<=[，。、])/).filter(Boolean) : text.split(' ');
  return <>{parts.map((part, index) => <span key={`${part}-${index}`}><span className="shimmer-word">{part}</span>{lang === 'en' && index < parts.length - 1 ? ' ' : ''}</span>)}</>;
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const p = profile[lang];
  const projects = getProjects(lang).map(({ body, ...project }) => { void body; return project; });

  return <main id="main" tabIndex={-1}>
    <section className="hero" id="top" aria-labelledby="intro-title">
      <div className="ledger">
        <div className="ledger-row name" data-hero>
          <h1 id="intro-title">{p.name}</h1>
          <span className="name-alt" lang={lang === 'zh' ? 'en' : 'zh-CN'}>{lang === 'zh' ? 'Yan Xiaoxiang' : '晏晓翔'}</span>
        </div>
        {p.tagline.map(line => <p className="ledger-row" key={line} data-shimmer><span className="shimmer-line"><Shimmer text={line} lang={lang} /></span></p>)}
        <p className="ledger-row" data-reveal><span className="t">{p.nowLabel}</span><span className="slot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v18M3 12h18" /></svg>{p.nowValue}</span></p>
        <p className="ledger-row" data-reveal><span className="t">{p.currentlyLabel}</span><span className="plain">{p.currentlyValue}</span></p>
        <p className="ledger-row" data-reveal><span className="t">{p.prevLabel}</span><span className="plain">{p.prevValue}</span></p>
        <p className="ledger-row" data-reveal><span className="t">{p.builtLabel}</span><span className="plain">{p.builtValue}</span></p>
      </div>
      <img className="hero-device" src="/images/hero-device.webp" width="1100" height="825" alt={lang === 'zh' ? '一台复古电脑，屏幕上是折纸与网格的抽象画面' : 'A retro computer showing an abstract paper and grid image'} />
    </section>

    <section className="section" id="work" aria-labelledby="work-heading">
      <h2 className="section-title" id="work-heading" data-reveal>{p.workTitle}</h2>
      <p className="section-note" data-reveal>{p.workNote}</p>
      <ProjectShowcase lang={lang} projects={projects} />
    </section>

    <section className="section" id="practice" aria-labelledby="practice-heading">
      <h2 className="section-title" id="practice-heading" data-reveal>{p.practiceTitle}</h2>
      <p className="section-note" data-reveal>{p.practiceNote}</p>
      <div className="practice-grid">
        {p.research.map((item, index) => <a className="practice-card" key={item.url} href={item.url} data-reveal>
          <span className="num" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {lang === 'zh' ? '公开仓库' : 'Public repo'}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <span className="link">{lang === 'zh' ? '在 GitHub 查看' : 'View on GitHub'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg></span>
        </a>)}
      </div>
    </section>

    <section className="section" id="journey" aria-labelledby="journey-heading">
      <h2 className="section-title" id="journey-heading" data-reveal>{p.journeyTitle}</h2>
      <div className="journey-list">
        <article className="journey-card" data-reveal>
          <span className="mark" aria-hidden="true">MD</span>
          <div className="journey-main"><h3>{p.internship.place}</h3><p className="role"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" /></svg>{p.internship.title}</p></div>
          <div className="journey-meta"><span className="when">{p.internship.date}</span><span className="tag">{lang === 'zh' ? '实习' : 'Internship'}</span></div>
        </article>
        {p.education.map(item => <article className="journey-card" key={item.date} data-reveal>
          <span className="mark" aria-hidden="true">CZ</span>
          <div className="journey-main"><h3>{item.place}</h3><p className="role"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 9.5 12 4l9 5.5-9 5.5z" /><path d="M7 12v5.5c0 1.5 2.2 2.5 5 2.5s5-1 5-2.5V12" /></svg>{item.title}</p></div>
          <div className="journey-meta"><span className="when">{item.date}</span><span className="tag">{lang === 'zh' ? '学位' : 'Degree'}</span></div>
        </article>)}
      </div>
    </section>

    <section className="section" id="about" aria-labelledby="about-heading">
      <h2 className="section-title" id="about-heading" data-reveal>{p.aboutTitle}</h2>
      <div className="about-card" data-reveal>
        <div className="about-text">
          <h3>{lang === 'zh' ? '你好，我是晏晓翔' : 'Hi, I’m Yan Xiaoxiang'}</h3>
          <p className="lede">{p.aboutText}</p>
          <p>{p.aboutDetail}</p>
          <div className="facts">
            <span className="tag">{lang === 'zh' ? '常州大学' : 'Changzhou University'}</span>
            <span className="tag">{lang === 'zh' ? '2027 届' : 'Class of 2027'}</span>
            <span className="tag">{lang === 'zh' ? '数据 · 算法 · 工程' : 'Data · models · engineering'}</span>
          </div>
          <p style={{ marginTop: 24 }}><Link className="link" href={localizedPath(lang, 'about')}>{p.moreAbout} <span aria-hidden="true">→</span></Link></p>
        </div>
        <aside className="note" aria-label={lang === 'zh' ? '一句自述' : 'A short note'}>
          {p.aboutNote}
          <span className="who">— {p.name}</span>
        </aside>
      </div>
    </section>
  </main>;
}
