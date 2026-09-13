import { person } from '../lib/content';
import { useReveal } from '../lib/motion';
import SectionHead from './SectionHead';

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
          <a className="link-arrow" href={person.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="link-arrow" href={person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="link-arrow" href={`tel:${person.phone.replace(/\s/g, '')}`}>
            {person.phone}
          </a>
          <a className="link-arrow" href={person.cv} target="_blank" rel="noreferrer">
            CV (PDF)
          </a>
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
