import { useState } from 'react';
import type { Project } from '../lib/content';
import { projects } from '../lib/content';
import { isCompact, useReveal, useTilt } from '../lib/motion';
import Lightbox from './Lightbox';
import SectionHead from './SectionHead';

function Case({ project, index }: { project: Project; index: number }) {
  // On a phone, the phone screenshot is the one worth opening on.
  const [activeId, setActiveId] = useState(() => {
    const phone = project.views.find((v) => v.kind === 'phone');
    return phone && isCompact() ? phone.id : project.views[0].id;
  });
  const view = project.views.find((v) => v.id === activeId) ?? project.views[0];
  const stage = useTilt<HTMLDivElement>(5);
  const [zoomed, setZoomed] = useState(false);

  return (
    <article className={`case ${index % 2 === 1 ? 'case--flip' : ''}`} data-anim>
      <div className="case__media">
        <div className={`stage ${view.kind === 'phone' ? 'stage--phone' : ''}`} ref={stage}>
          {view.kind === 'code' ? (
            <div className="frame frame--code" key={view.id}>
              <div className="frame__bar">
                <i />
                <i />
                <i />
                <span className="mono">{view.bar}</span>
              </div>
              <pre className="codeblock mono">
                {view.lines.map((line, i) => (
                  <span className={line.tone ? `codeblock__${line.tone}` : undefined} key={i}>
                    {line.text || ' '}
                    {'\n'}
                  </span>
                ))}
              </pre>
            </div>
          ) : view.kind === 'phone' ? (
            <div className="phone" key={view.id}>
              <div className="phone__screen">
                <span className="phone__island" aria-hidden="true" />
                <img src={view.src} alt={view.alt} loading="lazy" />
              </div>
              <span className="phone__button" aria-hidden="true" />
            </div>
          ) : (
            <div className="frame" key={view.id}>
              <div className="frame__bar">
                <i />
                <i />
                <i />
                <span className="mono">{view.bar}</span>
              </div>
              <div className="frame__shot">
                <img src={view.src} alt={view.alt} loading="lazy" />
              </div>
            </div>
          )}

          {view.kind !== 'code' && (
            <button
              className="stage__open"
              type="button"
              onClick={() => setZoomed(true)}
              aria-label={`Open the ${view.label} screen full size`}
            >
              <span className="mono">Full size</span>
            </button>
          )}
        </div>

        {view.kind !== 'code' && zoomed && (
          <Lightbox
            src={view.src}
            alt={view.alt}
            caption={`${project.title} — ${view.caption}`}
            onClose={() => setZoomed(false)}
          />
        )}

        {project.views.length > 1 && (
          <div className="switcher" role="group" aria-label={`${project.title} views`}>
            {project.views.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`switcher__btn mono ${v.id === activeId ? 'is-active' : ''}`}
                aria-pressed={v.id === activeId}
                onClick={() => setActiveId(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <p className="case__caption mono">{view.caption}</p>
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
