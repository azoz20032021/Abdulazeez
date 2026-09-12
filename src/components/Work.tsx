import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { projects } from '../lib/content';
import { prefersReducedMotion, useReveal } from '../lib/motion';
import SectionHead from './SectionHead';

function useMediaParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('img'),
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

function Case({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const media = useMediaParallax();

  return (
    <article className={`case ${index % 2 === 1 ? 'case--flip' : ''}`} data-anim>
      <div className="case__media">
        <div className="frame" ref={media}>
          <div className="frame__bar">
            <i />
            <i />
            <i />
            <span className="mono">{project.shot.bar}</span>
          </div>
          <div className="frame__shot">
            <img
              src={project.shot.src}
              alt={project.shot.alt}
              loading="lazy"
              width={1440}
              height={900}
            />
          </div>
        </div>

        <p className="case__caption mono">{project.shot.caption}</p>

        {project.gallery && (
          <div className="gallery">
            <p className="gallery__label mono">{project.gallery.label}</p>
            <div className="gallery__row">
              {project.gallery.items.map((item) =>
                item.kind === 'phone' ? (
                  <div className="phone" key={item.src}>
                    <div className="phone__screen">
                      <span className="phone__island" aria-hidden="true" />
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                    <span className="phone__button" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="gallery__item" key={item.src}>
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <div className="case__body">
        <p className="case__index mono">
          <span>{String(index + 1).padStart(2, '0')}</span> {project.kind}
        </p>

        <div className="case__title-row">
          <h3 className="case__title">{project.title}</h3>
          <span className="case__year mono">{project.year}</span>
        </div>

        <p className="case__summary">{project.summary}</p>

        {project.highlights.length > 0 && (
          <ul className="case__highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <div className="chips">
          {project.stack.map((s) => (
            <span className="chip mono" key={s}>
              {s}
            </span>
          ))}
        </div>

        <div className="case__links">
          {project.live && (
            <a className="link-arrow" href={project.live.href} target="_blank" rel="noreferrer">
              Open live
            </a>
          )}
          {project.source && (
            <a className="link-arrow" href={project.source.href} target="_blank" rel="noreferrer">
              Source
            </a>
          )}
          {project.note && <span className="case__note mono">{project.note}</span>}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="sec" id="work" ref={ref}>
      <div className="shell">
        <SectionHead index="01" label="Selected work" title="Things that run in production." />

        <div className="cases">
          {projects.map((p, i) => (
            <Case key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
