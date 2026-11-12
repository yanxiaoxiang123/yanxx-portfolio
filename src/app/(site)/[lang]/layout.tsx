import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, copy } from '../../../lib/i18n';
import Dock from '../../../components/Dock';
import SiteBar from '../../../components/SiteBar';
import Footer from '../../../components/Footer';
import PageMotion from '../../../components/PageMotion';
import '../../../styles/global.css';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map(lang => ({ lang })); }
export const metadata: Metadata = {
  title: { default: 'yanxx — 晏晓翔', template: '%s | yanxx' },
  description: '晏晓翔的个人主页。计算机硕士，数据、算法与系统实践。Yan Xiaoxiang, computer science, data and software.',
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website' },
};
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang === 'zh' ? 'zh-CN' : 'en'}><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout: this stylesheet applies to every page in the segment. */}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Mynerve&family=Noto+Sans+SC:wght@400;500&display=swap" />
  </head><body>
    <a className="skip-link" href="#main">{copy[lang].skip}</a>
    <SiteBar lang={lang} />
    <Dock lang={lang} />
    {children}
    <Footer lang={lang} />
    <PageMotion />
  </body></html>;
}
