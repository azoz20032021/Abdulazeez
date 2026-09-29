import { ArrowUp } from 'lucide-react';
import { person } from '../lib/content';
import { scrollToSection } from '../lib/motion';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__top">
          <div>
            <p className="foot__name">{person.name}</p>
            <p className="foot__role">
              {person.role} · {person.location}
            </p>
          </div>

          <nav className="foot__nav mono" aria-label="Footer">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(l.href);
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <nav className="foot__nav mono" aria-label="Elsewhere">
            <a href={person.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={person.cv} target="_blank" rel="noreferrer">
              CV
            </a>
            <a href={`mailto:${person.email}`}>Email</a>
          </nav>
        </div>

        <div className="foot__bottom mono">
          <span>© 2026 {person.name}</span>
          <span>React · Three.js · GSAP · Lenis</span>
          <button type="button" onClick={() => scrollToSection('#top')}>
            Back to top
            <ArrowUp size={13} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
