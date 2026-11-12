import { notFound } from 'next/navigation';
import { copy, isLocale } from '../../../../lib/i18n';
import { profile, github } from '../../../../data/profile';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; return { title: isLocale(lang) ? copy[lang].about : 'About' }; }
export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const p = profile[lang];
  return <main id="main" tabIndex={-1}>
    <header className="page-head">
      <h1>{p.aboutTitle}</h1>
      <p>{p.intro}</p>
    </header>
    <section className="section">
      <div className="about-card">
        <div className="about-text">
          <h3>{lang === 'zh' ? '你好，我是晏晓翔' : 'Hi, I’m Yan Xiaoxiang'}</h3>
          <p className="lede">{p.aboutText}</p>
          <p>{p.aboutDetail}</p>
          <p style={{ marginTop: 16 }}><a className="link" href={github}>{copy[lang].github} <span aria-hidden="true">↗</span></a></p>
        </div>
        <aside className="note" aria-label={lang === 'zh' ? '一句自述' : 'A short note'}>
          {p.aboutNote}
          <span className="who">— {p.name}</span>
        </aside>
      </div>
    </section>
    <section className="section" aria-labelledby="journey-heading">
      <h2 className="section-title" id="journey-heading">{p.educationTitle}</h2>
      <div className="journey-list">
        {[p.internship, ...p.education].map((item, index) => <article className="journey-card" key={item.date}>
          <span className="mark" aria-hidden="true">{index === 0 ? 'MD' : 'CZ'}</span>
          <div className="journey-main"><h3>{item.place}</h3><p className="role">{item.title}</p><p className="role">{item.text}</p></div>
          <div className="journey-meta"><span className="when">{item.date}</span></div>
        </article>)}
      </div>
    </section>
  </main>;
}
