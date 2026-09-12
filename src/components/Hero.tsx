import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// three + drei ship in their own chunk, so the headline paints before WebGL loads.
const HeroShards = lazy(() => import('../three/HeroShards'));
import { intro, person } from '../lib/content';
import { introPlays } from '../lib/intro';
import { prefersReducedMotion, scrollToSection, useMagnetic } from '../lib/motion';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const cta = useMagnetic<HTMLAnchorElement>(0.22);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Starts under the intro curtain, so the hero is already moving when it lifts.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: introPlays() ? 0.6 : 0.1 });
      tl.from('.hero__eyebrow', { y: 14, opacity: 0, duration: 0.7 }, 0.1)
        .from('.hero__line span', { yPercent: 108, duration: 1.15, stagger: 0.1 }, 0.15)
        .from('.hero__lede', { y: 18, opacity: 0, duration: 0.8 }, 0.7)
        .from('.hero__actions > *', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.85)
        .from('.hero__cue', { opacity: 0, duration: 0.8 }, 1.2);

      gsap.to('.hero__inner', {
        y: 90,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero__canvas--front', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
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
            ref={cta}
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
