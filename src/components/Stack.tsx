import { stack } from '../lib/content';
import { useReveal } from '../lib/motion';
import SectionHead from './SectionHead';

export default function Stack() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="sec" id="stack" ref={ref}>
      <div className="shell">
        <SectionHead index="03" label="Stack" title="What I work with." />

        <div className="spec">
          {stack.map((row) => (
            <div className="spec__row" key={row.group} data-anim>
              <p className="spec__label mono">{row.group}</p>
              <div className="spec__items">
                {row.items.map((item) => (
                  <span className="chip mono" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
