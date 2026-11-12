'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { copy, localizedPath, switchLocalePath, type Locale } from '../lib/i18n';

export default function SiteBar({ lang }: { lang: Locale }) {
  const pathname = usePathname() || localizedPath(lang);
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const other: Locale = lang === 'zh' ? 'en' : 'zh';
  const base = localizedPath(lang);
  const items = [
    { href: `${base}#top`, label: lang === 'zh' ? '首页' : 'Home', note: lang === 'zh' ? 'Introduction' : '介绍' },
    { href: `${base}#work`, label: lang === 'zh' ? '项目' : 'Work', note: lang === 'zh' ? 'Selected work' : '精选' },
    { href: `${base}#practice`, label: lang === 'zh' ? '实验' : 'Practice', note: lang === 'zh' ? 'Experiments' : '实验' },
    { href: `${base}#journey`, label: lang === 'zh' ? '经历' : 'Journey', note: lang === 'zh' ? 'Education' : '教育' },
    { href: `${base}#contact`, label: t.contact, note: lang === 'zh' ? 'Get in touch' : '联系' },
  ];
  return <>
    <header className="site-bar">
      <Link className="wordmark" href={base} aria-label={lang === 'zh' ? 'yanxx 首页' : 'yanxx home'}>yanxx.</Link>
      <div className="bar-actions">
        <Link className="bar-link" href={switchLocalePath(pathname, other)} hrefLang={other} lang={other} aria-label={lang === 'zh' ? 'Switch to English' : '切换至中文'}>{other === 'en' ? 'EN' : '中文'}</Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-menu" aria-label={open ? t.close : t.menu} onClick={() => setOpen(value => !value)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            {open ? <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
          </svg>
        </button>
      </div>
    </header>
    <div className="menu-panel" id="site-menu" hidden={!open}>
      <div className="menu-head">
        <span className="wordmark">yanxx.</span>
        <button className="menu-toggle" type="button" aria-label={t.close} onClick={() => setOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12" /><path d="m18 6-12 12" /></svg>
        </button>
      </div>
      {items.map(item => <a key={item.href} className="menu-item" href={item.href} onClick={() => setOpen(false)}>{item.label}<span>{item.note}</span></a>)}
      <Link className="menu-item" href={localizedPath(lang, 'about')} onClick={() => setOpen(false)}>{t.about}<span>{lang === 'zh' ? 'About me' : '关于'}</span></Link>
    </div>
  </>;
}
