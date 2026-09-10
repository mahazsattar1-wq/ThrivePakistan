import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getPublishedMessages,
  parseMessage,
  resolveMessagePerson,
} from '../data/leadershipMessages';
import type { LeadershipMessage } from '../data/leadershipMessages';
import type { LeadershipSectionConfig } from '../data/home';
import { imageSrc, isPhotoRef, spriteStyle } from '../media';
import { MonogramAvatar } from './cards';
import { Button, Icon, Reveal, SectionHeader } from './ui';

/**
 * LEADERSHIP MESSAGES — editorial horizontal message experience.
 *
 * Fully data-driven: order comes from `displayOrder`, visibility from
 * `published` (see src/data/leadershipMessages.ts). The component never
 * depends on file order and needs no changes when the admin panel alters
 * order, publication or copy.
 *
 * Interaction: native horizontal scroll + CSS scroll-snap (touch/trackpad
 * friendly, zero dependencies), with keyboard-accessible prev/next buttons
 * and dots. Controls hide entirely when there is only one message. No
 * auto-advance — the user stays in control.
 */
export function LeadershipMessages({ config }: { config: LeadershipSectionConfig }) {
  const messages = getPublishedMessages();
  if (messages.length === 0 || !config.visible) return null;

  return (
    <section className="section msg-section" id={config.id} aria-label={config.title ?? 'Leadership messages'}>
      <div className="container container--wide">
        <Reveal>
          <SectionHeader center eyebrow={config.eyebrow} title={config.title ?? ''} lead={config.lead} />
        </Reveal>

        <Reveal delay={90}>
          <MessageTrack messages={messages} />
        </Reveal>

        <Reveal delay={140}>
          <p className="msg-footnote">{config.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}

function MessageTrack({ messages }: { messages: LeadershipMessage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const single = messages.length <= 1;

  /** Nearest slide to the viewport-left of the scroll container. */
  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>('.msg-slide'));
    const trackLeft = track.getBoundingClientRect().left;
    let nearest = 0;
    let min = Number.POSITIVE_INFINITY;
    slides.forEach((s, i) => {
      const d = Math.abs(s.getBoundingClientRect().left - trackLeft);
      if (d < min) {
        min = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncActive);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [syncActive]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>('.msg-slide');
    const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="msg-experience">
      {!single && (
        <div className="msg-controls">
          <span className="msg-counter" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(messages.length).padStart(2, '0')}
          </span>
          <div className="msg-controls__btns">
            <button
              type="button"
              className="msg-arrow"
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous leadership message"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              type="button"
              className="msg-arrow"
              onClick={() => scrollTo(active + 1)}
              disabled={active === messages.length - 1}
              aria-label="Next leadership message"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className="msg-track"
        tabIndex={0}
        role="region"
        aria-label="Leadership messages — scroll horizontally"
        onScroll={syncActive}
      >
        {messages.map((m, i) => (
          <MessageSlide key={m.id} message={m} index={i} count={messages.length} />
        ))}
      </div>

      {!single && (
        <div className="msg-dots" role="group" aria-label="Choose leadership message">
          {messages.map((m, i) => (
            <button
              key={m.id}
              type="button"
              className={`msg-dot ${i === active ? 'msg-dot--active' : ''}`}
              aria-label={`Go to message ${i + 1} of ${messages.length}`}
              aria-current={i === active}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MessageSlide({ message: m, index, count }: { message: LeadershipMessage; index: number; count: number }) {
  const person = resolveMessagePerson(m);
  const blocks = parseMessage(m.message);
  return (
    <article
      className="msg-slide"
      role="group"
      aria-roledescription="message"
      aria-label={`Message ${index + 1} of ${count}: ${m.label}`}
    >
      <div className="msg-slide__content">
        <span className="eyebrow">{m.label}</span>
        <h3 className="msg-slide__name">{person.name}</h3>
        <p className="msg-slide__role">{person.role}</p>
        <div className="msg-slide__text">
          {blocks.map((block, i) => (
            <p
              key={i}
              className={
                block.type === 'paragraph'
                  ? undefined
                  : block.type === 'signature-name'
                    ? 'msg-signature__name'
                    : 'msg-signature__role'
              }
            >
              {block.text}
            </p>
          ))}
        </div>
        {m.ctaLabel && m.ctaTo && (
          <Button to={m.ctaTo} variant="green-ghost" size="sm" icon="arrow-right">
            {m.ctaLabel}
          </Button>
        )}
      </div>
      <div className="msg-slide__visual" aria-hidden={false}>
        <div className="msg-frame">
          {/* Approved photograph of the real person, resolved via the media registry. */}
          {m.image && isPhotoRef(m.image) ? (
            <img
              className="msg-frame__img msg-frame__img--photo"
              src={imageSrc(m.image)}
              alt={m.imageAlt ?? `${person.name}, ${person.role}`}
              loading="lazy"
              decoding="async"
            />
          ) : m.image ? (
            <div
              className="msg-frame__img sprite"
              style={spriteStyle(m.image)}
              role="img"
              aria-label={m.imageAlt ?? person.name}
            />
          ) : (
            /* No approved photograph for this entry — neutral monogram identity treatment. */
            <MonogramAvatar name={person.name} className="msg-frame__mono" />
          )}
          <span className="msg-frame__corner msg-frame__corner--tl" aria-hidden="true" />
          <span className="msg-frame__corner msg-frame__corner--br" aria-hidden="true" />
          <span className="msg-frame__glow" aria-hidden="true" />
        </div>
        {!m.image && (
          <span className="msg-frame__caption">
            <Icon name="badge" size={13} /> Official photograph to be published
          </span>
        )}
      </div>
    </article>
  );
}
