'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '../lib/i18n';
/** Image-only version approved after the configured video plan rejected generation. */
export default function ScrollFilm({ lang, title, text }: { lang: Locale; title: readonly string[]; text: string }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      section.classList.add('is-live');
      const picture = section.querySelector('.film-visual');
      const context = gsap.context(() => {
        gsap.fromTo(picture, { scale: 0.82, clipPath: 'inset(5% 5% 5% 5%)' }, {
          scale: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        });
      }, section);
      ScrollTrigger.refresh();
      return () => { context.revert(); section.classList.remove('is-live'); };
    });
    return () => media.revert();
  }, []);
  return <section ref={root} className="film-scene scene" data-scene="paper-window" aria-labelledby="film-heading">
    <div className="film-stage scene-stage"><div className="film-copy"><h2 id="film-heading">{title.map((line, i) => <span key={line}>{line}{i < title.length - 1 && <br />}</span>)}</h2><p>{text}</p></div>
      <div className="film-visual"><img src="/images/hero.webp" width="1440" height="810" alt={lang === 'zh' ? '由名字里的“翔”引出的纸飞机概念插画' : 'A paper airplane, inspired by the character 翔 in my name'} loading="lazy" /></div>
    </div>
  </section>;
}
