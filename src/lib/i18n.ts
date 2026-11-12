export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return value === 'zh' || value === 'en';
}
export function localizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `/${locale}/${clean ? `${clean}/` : ''}`;
}
export function switchLocalePath(path: string, locale: Locale): string {
  const [, current, ...parts] = path.split('/');
  return localizedPath(locale, isLocale(current) ? parts.join('/') : '');
}
export const copy = {
  zh: {
    projects: '项目', about: '关于', experience: '经历', contact: '联系',
    viewProjects: '查看项目', viewCase: '阅读项目', allProjects: '全部项目',
    home: '首页', github: 'GitHub', skip: '跳到正文', menu: '菜单', close: '关闭',
    role: '我的角色', period: '时间', stack: '技术', source: '查看源代码',
    nextProject: '下一个项目', backProjects: '返回项目',
  },
  en: {
    projects: 'Work', about: 'About', experience: 'Experience', contact: 'Contact',
    viewProjects: 'Explore my work', viewCase: 'Read the case', allProjects: 'All projects',
    home: 'Home', github: 'GitHub', skip: 'Skip to content', menu: 'Menu', close: 'Close',
    role: 'My role', period: 'Period', stack: 'Built with', source: 'Source code',
    nextProject: 'Next project', backProjects: 'Back to work',
  },
} as const;
