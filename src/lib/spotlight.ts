/**
 * Any element marked `data-spot` gets --mx / --my set to the pointer position
 * inside it, which the stylesheet turns into a soft light that follows the
 * cursor. One delegated listener covers every card instead of one per card.
 */
export function trackSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};

  let frame = 0;
  const onMove = (e: PointerEvent) => {
    if (frame) return;
    const target = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-spot]') : null;
    if (!target) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const r = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${e.clientX - r.left}px`);
      target.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onMove);
  };
}
