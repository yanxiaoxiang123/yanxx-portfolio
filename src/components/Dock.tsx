'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedPath, switchLocalePath, type Locale } from '../lib/i18n';

const icons = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />,
  work: <><rect x="3.5" y="4.5" width="17" height="6" rx="2" /><rect x="3.5" y="13.5" width="7.5" height="6.5" rx="2" /><rect x="13.5" y="13.5" width="7" height="6.5" rx="2" /></>,
  practice: <><path d="M9 3.5h6M10 3.5v6L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5v-6" /><path d="M7.5 15h9" /></>,
  journey: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20.5a7 7 0 0 1 14 0" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7.5 8 5.5 8-5.5" /></>,
};

export default function Dock({ lang }: { lang: Locale }) {
  const pathname = usePathname() || localizedPath(lang);
  const [active, setActive] = useState('top');
  const base = localizedPath(lang);
  const other: Locale = lang === 'zh' ? 'en' : 'zh';
  const items = [
    { id: 'top', href: '#top', label: lang === 'zh' ? '首页' : 'Home', icon: icons.home },
    { id: 'work', href: '#work', label: lang === 'zh' ? '项目' : 'Work', icon: icons.work },
    { id: 'practice', href: '#practice', label: lang === 'zh' ? '实验' : 'Practice', icon: icons.practice },
    { id: 'journey', href: '#journey', label: lang === 'zh' ? '经历' : 'Journey', icon: icons.journey },
    { id: 'contact', href: '#contact', label: lang === 'zh' ? '联系' : 'Contact', icon: icons.mail },
  ];
  useEffect(() => {
    if (pathname !== base) return;
    const ids = items.map(item => item.id);
    const sections = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, lang]);
  return <nav className="dock" aria-label={lang === 'zh' ? '站点导航' : 'Site navigation'}>
    {items.map(item => <a key={item.id} className={`dock-item${active === item.id && pathname === base ? ' is-active' : ''}`} href={`${base}${item.href}`} aria-current={active === item.id && pathname === base ? 'true' : undefined}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.icon}</svg>
      <span className="dock-label">{item.label}</span>
      <span className="visually-hidden">{item.label}</span>
    </a>)}
    <span className="dock-sep" aria-hidden="true" />
    <Link className="dock-lang" href={switchLocalePath(pathname, other)} hrefLang={other} lang={other} aria-label={lang === 'zh' ? 'Switch to English' : '切换至中文'}>{other === 'en' ? 'EN' : '中'}</Link>
  </nav>;
}
