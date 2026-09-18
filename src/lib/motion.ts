import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** Live scroll speed, shared with the WebGL field so the 3D reacts to scrolling. */
export const scrollState = { velocity: 0 };

/** Set while the field is far off screen, so phones stop animating it. */
export const fieldState = { paused: false };

export const isCompact = () => window.matchMedia('(max-width: 860px)').matches;
export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ duration: 1.05, wheelMultiplier: 0.9 });
  const instance = lenis;
  instance.on('scroll', ({ velocity }: { velocity: number }) => {
    scrollState.velocity = velocity;
    ScrollTrigger.update();
  });

  // Lenis owns the scroll position, so a native arrow-key step gets overwritten
  // on the next frame. With no scrollbar to drag, the keyboard has to work, so
  // the keys are mapped onto Lenis directly.
  const onKey = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;

    // Typing, and anything that answers to the key itself, is left alone.
    // The target is not always an element — a synthetic event can come off window.
    const el = event.target;
    if (el instanceof Element && el.closest('input, textarea, select, button, a, [contenteditable="true"]')) {
      return;
    }

    const page = window.innerHeight * 0.9;
    const step: Record<string, number> = {
      ArrowDown: 120,
      ArrowUp: -120,
      PageDown: page,
      PageUp: -page,
      ' ': event.shiftKey ? -page : page,
    };

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      instance.scrollTo(event.key === 'Home' ? 0 : instance.limit);
      return;
    }

    const move = step[event.key];
    if (move === undefined) return;

    event.preventDefault();
    instance.scrollTo(instance.targetScroll + move);
  };

  window.addEventListener('keydown', onKey);

  // Lenis runs on its own animation frame rather than gsap.ticker. GSAP parks its
  // ticker once nothing is tweening and it is the only listener on it, and a parked
  // ticker would leave the page unable to scroll at all.
  let frame = requestAnimationFrame(function tick(time) {
    instance.raf(time);
    frame = requestAnimationFrame(tick);
  });
  gsap.ticker.lagSmoothing(0);

  return () => {
    window.removeEventListener('keydown', onKey);
    cancelAnimationFrame(frame);
    instance.destroy();
    lenis = null;
    scrollState.velocity = 0;
  };
}

/**
 * Browsers replay the last scroll offset on reload, which drops a returning
 * visitor into the middle of the page behind the intro curtain. The site is a
 * single narrative, so it always opens at the hero unless a section was linked.
 */
export function openAtTop() {
  if (window.location.hash) return;

  // ScrollTrigger snapshots history.scrollRestoration when it registers and
  // writes that snapshot back on every refresh, so setting the history property
  // directly gets undone — it has to be told through its own API.
  ScrollTrigger.clearScrollMemory('manual');
  window.scrollTo(0, 0);
  window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
}

export function setScrollLock(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : '';
  // Anything floating over the page hides while an overlay owns the screen.
  document.documentElement.classList.toggle('is-locked', locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/** Matches the scroll-margin-top on sections, for the no-Lenis fallback. */
const NAV_OFFSET = 84;

export function scrollToSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  // Sections carry scroll-margin-top, and Lenis reads that itself — which is why
  // no offset is passed here, and why a plain #hash link lands in the same place.
  if (lenis) {
    lenis.scrollTo(target);
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
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

/**
 * Wraps each word in a masked span so it can be swept up into place.
 * Returns the inner spans, or null when the element has already been split.
 */
function splitWords(el: HTMLElement) {
  if (el.dataset.split === 'done') return null;

  const words = (el.textContent ?? '').split(/\s+/).filter(Boolean);
  if (!words.length) return null;

  el.textContent = '';
  const inners: HTMLElement[] = [];

  words.forEach((word, i) => {
    const mask = document.createElement('span');
    mask.className = 'word';
    const inner = document.createElement('span');
    inner.textContent = i < words.length - 1 ? `${word} ` : word;
    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  });

  el.dataset.split = 'done';
  return inners;
}

/** Reveals every `[data-anim]` descendant once the section enters the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('[data-split]').forEach((heading) => {
        const inners = splitWords(heading);
        if (!inners) return;
        gsap.from(inners, {
          yPercent: 110,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.055,
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
        });
      });

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

/** Tilts an element toward the pointer. Ignored on touch, where there is none. */
export function useTilt<T extends HTMLElement>(strength = 6) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !canHover()) return;

    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rotX(((e.clientY - r.top) / r.height - 0.5) * -strength);
      rotY(((e.clientX - r.left) / r.width - 0.5) * strength);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [strength]);

  return ref;
}

/** Pulls an element a little toward the pointer while it is hovered. */
export function useMagnetic<T extends HTMLElement>(pull = 0.28) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !canHover()) return;

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      moveX((e.clientX - (r.left + r.width / 2)) * pull);
      moveY((e.clientY - (r.top + r.height / 2)) * pull);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [pull]);

  return ref;
}
