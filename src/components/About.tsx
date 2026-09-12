import { about, experience } from '../lib/content';
import { useReveal } from '../lib/motion';
import SectionHead from './SectionHead';

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="sec" id="about" ref={ref}>
      <div className="shell">
        <SectionHead index="02" label="About" title="Where the trade-offs are." />

        <div className="about">
          <div className="about__text">
            {about.body.map((p) => (
              <p key={p} data-anim>
                {p}
              </p>
            ))}
          </div>

          <dl className="about__facts" data-anim>
            {about.facts.map((f) => (
              <div className="fact" key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
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
