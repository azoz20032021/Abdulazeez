import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fieldState, isCompact, prefersReducedMotion } from '../lib/motion';

const HeroField = lazy(() => import('../three/HeroField'));

/**
 * The lattice stays fixed behind the whole page rather than living only in the
 * hero, so the 3D reads as one continuous space. It fades back while the page
 * is being read and lifts again at the contact section.
 */
export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // One timeline over the whole page: full strength in the hero, pulled back
      // while the work is being read, lifted again for the contact section.
      // Two separate scrubbed tweens on the same property fight over their
      // start values, which is why this is a single timeline.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
          defaults: { ease: 'none' },
        })
        .fromTo(el, { opacity: 1 }, { opacity: 0.24, duration: 0.22 })
        .to(el, { opacity: 0.24, duration: 0.56 })
        .to(el, { opacity: 0.62, duration: 0.22 });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // Phones stop animating the field once the hero has scrolled away: past that
  // point it is a faint texture, not something anyone is watching.
  useLayoutEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !isCompact()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        fieldState.paused = !entry.isIntersecting;
      },
      { rootMargin: '10% 0px' },
    );
    observer.observe(hero);

    return () => {
      observer.disconnect();
      fieldState.paused = false;
    };
  }, []);

  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <Suspense fallback={null}>
        <HeroField />
      </Suspense>
      <div className="backdrop__scrim" />
    </div>
  );
}
