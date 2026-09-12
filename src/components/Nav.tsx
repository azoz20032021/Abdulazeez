import { useEffect, useState } from 'react';
import { person } from '../lib/content';
import { scrollToSection, setScrollLock } from '../lib/motion';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setSolid(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setScrollLock(open);
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // The sheet only exists below 861px — leaving it "open" past that width
    // would keep the page scroll-locked with nothing on screen.
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Let the overlay unlock scrolling before Lenis takes over the jump.
    requestAnimationFrame(() => scrollToSection(href));
  };

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar shell">
        <a className="nav__brand" href="#top" onClick={(e) => go(e, '#top')}>
          <span className="nav__mark" aria-hidden="true" />
          {person.name}
        </a>

        <nav className="nav__links" aria-label="Sections">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className={active === l.href ? 'is-active' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a className="nav__cta mono" href={`mailto:${person.email}`}>
          Get in touch
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} />

      <div className="nav__sheet" id="nav-sheet" hidden={!open}>
        <nav className="nav__sheet-links" aria-label="Sections">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__sheet-foot">
          <a className="link-arrow" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <div className="nav__sheet-social">
            <a className="mono" href={person.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="mono" href={person.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
