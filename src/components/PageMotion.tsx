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
      if (hero.length) gsap.fromTo(hero, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out' });
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      reveals.forEach(el => {
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
    });
    return () => ctx.revert();
  }, [pathname]);
  return null;
}
