import { FileDown } from 'lucide-react';
import { about, experience, person, sectionCopy } from '../lib/content';
import { useReveal } from '../lib/motion';
import ArrowLink from './ArrowLink';
import SectionHead from './SectionHead';

export default function About() {
  const ref = useReveal<HTMLElement>();
  const [lead, ...rest] = about.body;

  return (
    <section className="sec" id="about" ref={ref}>
      <div className="shell">
        <SectionHead index="03" label="About" title="Where the trade-offs are." lede={sectionCopy.about} />

        <div className="about">
          <div className="about__text">
            <p className="about__lead" data-anim>
              {lead}
            </p>
            {rest.map((p) => (
              <p key={p} data-anim>
                {p}
              </p>
            ))}
          </div>

          <div className="about__side" data-anim>
            <dl className="about__facts">
              {about.facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt className="mono">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <ArrowLink href={person.cv} icon={<FileDown size={15} strokeWidth={1.8} aria-hidden="true" />}>
              Download the CV
            </ArrowLink>
          </div>
        </div>

        <div className="xp">
          {experience.map((x) => (
            <article className="xp__item" key={x.org} data-anim>
              <header className="xp__head">
                <h3>{x.role}</h3>
                <p className="xp__org">{x.org}</p>
                <p className="xp__period mono">{x.period}</p>
              </header>
              <ul className="xp__bullets">
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
