'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { copy, localizedPath, switchLocalePath, type Locale } from '../lib/i18n';
export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname() || localizedPath(lang);
  const t = copy[lang];
  const other = lang === 'zh' ? 'en' : 'zh';
  return <header className="site-header">
    <Link className="wordmark" href={localizedPath(lang)} aria-label={lang === 'zh' ? 'yanxx 首页' : 'yanxx home'}>yanxx<span aria-hidden="true">.</span></Link>
    <nav aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}>
      <Link href={localizedPath(lang, 'projects')} aria-current={pathname.includes('/projects') ? 'page' : undefined}>{t.projects}</Link>
      <Link href={localizedPath(lang, 'about')} aria-current={pathname.includes('/about') ? 'page' : undefined}>{t.about}</Link>
      <a href={`${localizedPath(lang)}#contact`}>{t.contact}</a>
      <Link className="language-link" href={switchLocalePath(pathname, other)} hrefLang={other} lang={other} aria-label={lang === 'zh' ? 'Switch to English' : '切换至中文'}>{lang === 'zh' ? 'English' : '中文'}</Link>
    </nav>
  </header>;
}
