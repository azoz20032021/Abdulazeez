import { useState } from 'react';
import { Check, Copy, FileDown, Phone, Send } from 'lucide-react';
import { about, person, sectionCopy } from '../lib/content';
import { useReveal } from '../lib/motion';
import ArrowLink from './ArrowLink';
import SectionHead from './SectionHead';

const ICON = { size: 15, strokeWidth: 1.8, 'aria-hidden': true } as const;

const TOPICS = ['A full-time role', 'A contract', 'A project', 'Just saying hi'];

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [topic, setTopic] = useState(TOPICS[0]);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard can be blocked; the address is on screen and in the link. */
    }
  };

  // There is no backend behind this site, so the form hands the message to the
  // visitor's own mail app rather than posting it somewhere it could be lost.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const from = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const body = [message, '', name && `— ${name}`, from && `Reply to: ${from}`]
      .filter((line, i) => i === 1 || line)
      .join('\n');
    const subject = `${topic} — ${name || 'via your portfolio'}`;

    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="sec sec--contact" id="contact" ref={ref}>
      <div className="shell">
        <SectionHead index="05" label="Contact" title="Open to work." lede={sectionCopy.contact} />

        <div className="contact">
          <div className="contact__lead">
            <p className="contact__status mono" data-anim>
              <i aria-hidden="true" />
              Available — Istanbul or remote
            </p>

            <a className="contact__mail" href={`mailto:${person.email}`} data-anim>
              {person.email}
            </a>

            <button className="contact__copy mono" type="button" onClick={copy} data-anim>
              {copied ? <Check {...ICON} /> : <Copy {...ICON} />}
              {copied ? 'Copied to clipboard' : 'Copy address'}
            </button>

            <dl className="about__facts contact__facts" data-anim>
              {[about.facts[0], about.facts[2]].map((f) => (
                <div className="fact" key={f.label}>
                  <dt className="mono">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
              <div className="fact">
                <dt className="mono">Working</dt>
                <dd>On-site in Istanbul or fully remote</dd>
              </div>
            </dl>

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
          </div>

          <form className="composer" onSubmit={onSubmit} data-anim data-spot>
            <p className="composer__title mono">Write to me</p>

            <div className="composer__topics" role="group" aria-label="What is this about">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`switcher__btn mono ${t === topic ? 'is-active' : ''}`}
                  aria-pressed={t === topic}
                  onClick={() => setTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="composer__pair">
              <label className="field">
                <span className="mono">Name</span>
                <input name="name" type="text" autoComplete="name" placeholder="Your name" />
              </label>
              <label className="field">
                <span className="mono">Your email</span>
                <input name="email" type="email" autoComplete="email" placeholder="you@company.com" />
              </label>
            </div>

            <label className="field">
              <span className="mono">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="What are you building, and where could I help?"
              />
            </label>

            <div className="composer__foot">
              <button className="btn btn--solid" type="submit">
                Send message
                <Send size={15} strokeWidth={1.9} aria-hidden="true" />
              </button>
              <p className="composer__hint mono" aria-live="polite">
                {sent ? 'Your mail app should open — or copy the address.' : 'Opens in your mail app.'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
