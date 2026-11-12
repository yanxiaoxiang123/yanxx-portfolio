import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, copy } from '../../../lib/i18n';
import Header from '../../../components/Header';
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
  return <html lang={lang === 'zh' ? 'zh-CN' : 'en'}><head><link rel="preconnect" href="https://api.fontshare.com" /><link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=erode@400,500,600&display=swap" /></head><body>
    <a className="skip-link" href="#main">{copy[lang].skip}</a>
    <Header lang={lang} />{children}<Footer lang={lang} /><PageMotion />
  </body></html>;
}
