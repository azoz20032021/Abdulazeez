import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToSection } from '../lib/motion';

/**
 * With no system scrollbar on the page there is no quick way back up, so this
 * appears once the hero is well out of sight.
 */
export default function TopButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 1.3);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`to-top ${shown ? 'is-shown' : ''}`}
      type="button"
      onClick={() => scrollToSection('#top')}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      <ArrowUp size={18} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
