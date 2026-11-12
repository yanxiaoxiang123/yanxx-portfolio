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
      gsap.fromTo('[data-hero]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
    });
    return () => ctx.revert();
  }, [pathname]);
  return null;
}
