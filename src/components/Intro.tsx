import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { introPlays, markIntroSeen } from '../lib/intro';

/**
 * The curtain markup lives in index.html rather than here, so the name is on
 * screen at the first paint — before this bundle has been fetched and parsed.
 * This component only animates it away and takes it out of the document.
 */
export default function Intro() {
  useLayoutEffect(() => {
    const root = document.getElementById('boot');
    if (!root) return;

    if (!introPlays()) {
      root.remove();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          markIntroSeen();
          root.remove();
        },
      });

      tl.to('.intro__line i', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 0)
        .to('.intro__name span', { yPercent: -110, duration: 0.5, ease: 'power3.in' }, 0.78)
        .to('.intro__line', { opacity: 0, duration: 0.3 }, 0.78)
        .to(root, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.95);
    }, root);

    return () => ctx.revert();
  }, []);

  return null;
}
