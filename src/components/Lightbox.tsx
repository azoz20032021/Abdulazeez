import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { setScrollLock } from '../lib/motion';

type Props = {
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
};

/**
 * Full-size view of a case screenshot. Rendered into the body because the case
 * media sets a perspective, and that makes it the containing block for anything
 * fixed inside it.
 */
export default function Lightbox({ src, alt, caption, onClose }: Props) {
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    setScrollLock(true);
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLock(false);
      returnTo?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button
        className="lightbox__close"
        type="button"
        ref={closeBtn}
        onClick={onClose}
        aria-label="Close"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
        <figcaption className="mono">{caption}</figcaption>
      </figure>
    </div>,
    document.body,
  );
}
