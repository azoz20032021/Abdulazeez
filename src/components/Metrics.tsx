import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { metrics } from '../lib/content';
import { prefersReducedMotion } from '../lib/motion';

export default function Metrics() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
        const end = Number(node.dataset.count);
        const counter = { value: 0 };
        node.textContent = '0';
        gsap.to(counter, {
          value: end,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            node.textContent = Math.round(counter.value).toString();
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      gsap.from(el.querySelectorAll('.metric'), {
        y: 22,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section className="metrics" aria-label="Selected numbers">
      <div className="shell metrics__row" ref={root}>
        {metrics.map((m) => (
          <div className="metric" key={m.label}>
            <p className="metric__value">
              <span data-count={m.value}>{m.value}</span>
              {m.suffix}
            </p>
            <p className="metric__label mono">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
