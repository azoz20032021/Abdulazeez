import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// three + drei ship in their own chunk, so the headline paints before WebGL loads.
const HeroField = lazy(() => import('../three/HeroField'));
const HeroShards = lazy(() => import('../three/HeroShards'));
import { intro, person } from '../lib/content';
import { prefersReducedMotion, scrollToSection } from '../lib/motion';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__eyebrow', { y: 14, opacity: 0, duration: 0.7 }, 0.15)
        .from('.hero__line span', { yPercent: 108, duration: 1.05, stagger: 0.09 }, 0.2)
        .from('.hero__lede', { y: 18, opacity: 0, duration: 0.8 }, 0.75)
        .from('.hero__actions > *', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.9)
        .from('.hero__canvas', { opacity: 0, duration: 1.4 }, 0)
        .from('.hero__cue', { opacity: 0, duration: 0.8 }, 1.3);

      gsap.to('.hero__inner', {
        y: 90,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__canvas hero__canvas--back" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroField />
        </Suspense>
      </div>

      <div className="hero__inner shell">
        <p className="hero__eyebrow mono">
          {person.role}
          <span className="hero__eyebrow-loc"> — {person.location}</span>
        </p>

        <h1 className="hero__title">
          {intro.headline.map((line) => (
            <span className="hero__line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__lede">{intro.lede}</p>

        <div className="hero__actions">
          <a
            className="btn btn--solid"
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#work');
            }}
          >
            View selected work
          </a>
          <a className="btn btn--ghost" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </div>
      </div>

      <div className="hero__canvas hero__canvas--front" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroShards />
        </Suspense>
      </div>

      <div className="hero__cue mono" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
