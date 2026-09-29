import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { canHover, prefersReducedMotion } from '../lib/motion';

const INTERACTIVE = 'a, button, input, textarea, [data-cursor]';

/**
 * A ring that trails the pointer and swells over anything clickable. The system
 * cursor stays — this is an accent on top of it, so nothing is lost on a page
 * where the ring has not caught up yet.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || prefersReducedMotion() || !canHover()) return;

    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        // First move: land on the pointer instead of sweeping in from the corner.
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add('is-on');
      }
      x(e.clientX);
      y(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      el.classList.toggle('is-hot', !!target?.closest(INTERACTIVE));
    };
    const onLeave = () => el.classList.remove('is-on');
    const onEnter = () => shown && el.classList.add('is-on');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return <div className="cursor" ref={ring} aria-hidden="true" />;
}
