import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ duration: 1.05, wheelMultiplier: 0.9 });
  const instance = lenis;
  instance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    instance.destroy();
    lenis = null;
  };
}

export function setScrollLock(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : '';
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/** Clears the fixed header so the section title is not hidden under it. */
const NAV_OFFSET = -84;

export function scrollToSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: NAV_OFFSET });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * Trigger positions are measured before webfonts and lazy images settle, which
 * can leave a reveal stuck at its "from" state. Re-measure whenever that happens.
 */
export function keepTriggersFresh() {
  const refresh = () => ScrollTrigger.refresh();

  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);

  const images = Array.from(document.images);
  images.forEach((img) => {
    if (!img.complete) img.addEventListener('load', refresh, { once: true });
  });

  return () => window.removeEventListener('load', refresh);
}

/** Reveals every `[data-anim]` descendant once the section enters the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('[data-anim]');
      if (!targets.length) return;
      gsap.from(targets, {
        y: 26,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
