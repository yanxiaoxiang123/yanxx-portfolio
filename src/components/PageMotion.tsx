'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const hero = gsap.utils.toArray<HTMLElement>('[data-hero]');
      if (hero.length) gsap.fromTo(hero, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-shimmer]').forEach(el => {
        const words = el.querySelectorAll('.shimmer-word');
        if (!words.length) return;
        gsap.fromTo(words, { opacity: 0.3 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'bottom 55%', scrub: 0.6 } });
      });
    });
    return () => ctx.revert();
  }, [pathname]);
  return null;
}
