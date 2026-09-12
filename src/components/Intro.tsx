import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { person } from '../lib/content';
import { introPlays, markIntroSeen } from '../lib/intro';

/**
 * A short curtain over the first paint. The hero animates behind it, so the
 * page is already alive by the time the curtain clears.
 */
export default function Intro() {
  const [done, setDone] = useState(() => !introPlays());
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (done) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          markIntroSeen();
          setDone(true);
        },
      });

      tl.to('.intro__line i', { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0)
        .from('.intro__name span', { yPercent: 110, duration: 0.65, ease: 'power3.out' }, 0.05)
        .to('.intro__name span', { yPercent: -110, duration: 0.45, ease: 'power3.in' }, 0.72)
        .to('.intro__line', { opacity: 0, duration: 0.3 }, 0.72)
        .to(root.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 0.9);
    }, root);

    return () => ctx.revert();
  }, [done]);

  if (done) return null;

  return (
    <div className="intro" ref={root}>
      <p className="intro__name">
        <span>{person.name}</span>
      </p>
      <p className="intro__line">
        <i />
      </p>
    </div>
  );
}
