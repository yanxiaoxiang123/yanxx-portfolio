import { notFound } from 'next/navigation';
import { copy, isLocale } from '../../../../lib/i18n';
import { profile, github } from '../../../../data/profile';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; return { title: isLocale(lang) ? copy[lang].about : 'About' }; }
export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLocale(lang)) notFound(); const p = profile[lang];
  return <main id="main" className="about-main"><section className="section"><div className="page-heading"><h1>{p.aboutTitle}</h1><p>{p.intro}</p></div><div className="about-section"><div className="about-facts"><p>{p.name}<br />{lang === 'zh' ? '硕士，预计 2027 年毕业' : 'MSc, graduating in 2027'}</p><a className="text-link" href={github}>GitHub</a></div><div className="about-prose"><p className="statement">{p.aboutText}</p><p>{p.aboutDetail}</p></div></div></section><section className="section"><h2>{p.educationTitle}</h2><div className="about-timeline">{[p.internship, ...p.education].map(item => <article key={item.date}><p className="secondary">{item.date}</p><div><h3>{item.title}</h3><p>{item.place}</p><p>{item.text}</p></div></article>)}</div></section></main>;
}
