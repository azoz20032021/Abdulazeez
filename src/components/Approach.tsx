import { approach, sectionCopy } from '../lib/content';
import { useReveal } from '../lib/motion';
import SectionHead from './SectionHead';

export default function Approach() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="sec" id="approach" ref={ref}>
      <div className="shell">
        <SectionHead
          index="02"
          label="Approach"
          title="How I build things."
          lede={sectionCopy.approach}
        />

        <div className="approach">
          {approach.map((a, i) => (
            <article className="principle" key={a.title} data-anim data-spot>
              <div className="principle__top">
                <span className="principle__no mono">{String(i + 1).padStart(2, '0')}</span>
                <p className="principle__proof">
                  <strong>{a.proof}</strong>
                  <span className="mono">{a.proofLabel}</span>
                </p>
              </div>
              <h3 className="principle__title">{a.title}</h3>
              <p className="principle__body">{a.body}</p>
              <p className="principle__seen mono">Seen in · {a.seen}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
