import { FileDown, Phone } from 'lucide-react';
import { person } from '../lib/content';
import { useReveal } from '../lib/motion';
import ArrowLink from './ArrowLink';
import SectionHead from './SectionHead';

const ICON = { size: 15, strokeWidth: 1.8, 'aria-hidden': true } as const;

export default function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="sec sec--contact" id="contact" ref={ref}>
      <div className="shell">
        <SectionHead index="04" label="Contact" title="Open to work." />

        <p className="contact__status mono" data-anim>
          <i aria-hidden="true" />
          Available — Istanbul or remote
        </p>

        <a className="contact__mail" href={`mailto:${person.email}`} data-anim>
          {person.email}
        </a>

        <div className="contact__row" data-anim>
          <ArrowLink href={person.github}>GitHub</ArrowLink>
          <ArrowLink href={person.linkedin}>LinkedIn</ArrowLink>
          <ArrowLink
            href={`tel:${person.phone.replace(/\s/g, '')}`}
            external={false}
            icon={<Phone {...ICON} />}
          >
            {person.phone}
          </ArrowLink>
          <ArrowLink href={person.cv} icon={<FileDown {...ICON} />}>
            CV (PDF)
          </ArrowLink>
        </div>

        <footer className="foot" data-anim>
          <span className="mono">© 2026 {person.name}</span>
          <span className="mono">{person.location} · GMT+3</span>
          <span className="mono">React · Three.js · GSAP · Lenis</span>
        </footer>
      </div>
    </section>
  );
}
