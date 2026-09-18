import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { setScrollLock } from '../lib/motion';

export type Shot = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  label: string;
};

type Props = {
  title: string;
  shots: Shot[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
};

/**
 * Full-size view of a case screenshot, with the rest of that project's screens
 * a key away. Rendered into the body because the case media sets a perspective,
 * which makes it the containing block for anything fixed inside it.
 */
export default function Lightbox({ title, shots, index, onIndex, onClose }: Props) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const shot = shots[index];
  const many = shots.length > 1;

  // Read through a ref so the key handler is bound once, not on every step.
  const state = useRef({ index, onIndex, onClose, count: shots.length });
  state.current = { index, onIndex, onClose, count: shots.length };

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    setScrollLock(true);
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      const { index: i, count, onIndex: go, onClose: close } = state.current;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight' && count > 1) go((i + 1) % count);
      else if (e.key === 'ArrowLeft' && count > 1) go((i - 1 + count) % count);
      else return;
      e.preventDefault();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLock(false);
      returnTo?.focus?.();
    };
  }, []);

  const step = (by: number) => onIndex((index + by + shots.length) % shots.length);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.alt} onClick={onClose}>
      <button
        className="lightbox__close"
        type="button"
        ref={closeBtn}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={19} strokeWidth={1.6} aria-hidden="true" />
      </button>

      {many && (
        <button
          className="lightbox__step lightbox__step--prev"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
          aria-label="Previous screen"
        >
          <ChevronLeft size={22} strokeWidth={1.6} aria-hidden="true" />
        </button>
      )}

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.alt} key={shot.id} />
        <figcaption>
          <span className="mono lightbox__caption">
            {title} — {shot.caption}
          </span>
          {many && (
            <span className="mono lightbox__count">
              {shot.label} · {index + 1}/{shots.length}
            </span>
          )}
        </figcaption>
      </figure>

      {many && (
        <button
          className="lightbox__step lightbox__step--next"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
          aria-label="Next screen"
        >
          <ChevronRight size={22} strokeWidth={1.6} aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body,
  );
}
