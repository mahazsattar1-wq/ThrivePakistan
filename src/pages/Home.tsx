import { useEffect, useState } from 'react';
import { BRAND } from '../brand';
import { HERO_IMAGE, spriteStyle } from '../media';
import { EVENTS } from '../data/events';
import { HOME_PAGE } from '../data/home';
import type { HomeCta } from '../data/home';
import { IMPACT_STATEMENTS } from '../data/stats';
import { ORG, PREVIOUS_WORK, PRIOR_ECOSYSTEM_NAMES, PRIOR_ECOSYSTEM_NOTE } from '../data/org';
import { getFeaturedUpcomingEvent } from '../data/home';
import { eventsService } from '../services/eventsService';
import { blogsService } from '../services/blogsService';
import { useSeo } from '../hooks';
import type { BlogPost, ThriveEvent } from '../types';
import { Button, Countdown, Icon, Reveal, SectionHeader, CardSkeleton } from '../components/ui';
import { BlogCard, EventCard, ProgramCard } from '../components/cards';
import { LeadershipMessages } from '../components/leadership';
import { PROGRAMS } from '../data/programs';

/** Render a data-defined CTA (label/link/variant all come from config). */
function Cta({ cta }: { cta: HomeCta }) {
  return (
    <Button
      to={cta.to}
      href={cta.href}
      variant={cta.variant}
      size={cta.size ?? 'md'}
      icon={cta.icon as never}
    >
      {cta.label}
    </Button>
  );
}

export default function Home() {
  useSeo({
    description: ORG.shortDescription,
  });

  const [upcoming, setUpcoming] = useState<ThriveEvent[] | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    let alive = true;
    eventsService.list({ status: 'upcoming' }).then((list) => alive && setUpcoming(list));
    blogsService.list().then((list) => alive && setBlogs(list.slice(0, 3)));
    return () => {
      alive = false;
    };
  }, []);

  /**
   * CONDITIONAL FEATURED EVENT — data-driven business rule.
   * Only a published upcoming event with CONFIRMED date AND venue can be
   * featured. When none exists the section is not rendered at all: no empty
   * card, no placeholder, no blank space.
   */
  const featuredEvent = getFeaturedUpcomingEvent(EVENTS);

  /** Upcoming events section excludes the featured one (already showcased above). */
  const otherUpcoming = (upcoming ?? EVENTS).filter(
    (e) => e.status === 'upcoming' && e.slug !== featuredEvent?.slug,
  );
  const cfg = HOME_PAGE;

  return (
    <>
      {/* ============ 1 · CONDITIONAL FEATURED UPCOMING EVENT ============ */}
      {cfg.featuredEvent.visible && featuredEvent && (
        <FeaturedEventBanner event={featuredEvent} />
      )}

      {/* ============ 2 · MAIN INTRO / HERO ============ */}
      {cfg.hero.visible && (
        <section className="hero hero--intro" id={cfg.hero.id}>
          <div
            className="hero__bg"
            style={{
              backgroundImage: `image-set(url("/img/hero-futurex.avif") type("image/avif"), url("/img/hero-futurex.webp") type("image/webp"), url("${HERO_IMAGE}") type("image/jpeg"))`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
          <span className="hero__shape hero__shape--1" aria-hidden="true" />
          <span className="hero__shape hero__shape--2" aria-hidden="true" />
          <span className="hero__shape hero__shape--3" aria-hidden="true" />
          <div className="container hero__intro-inner">
            <div className="hero__copy hero__copy--center anim-fade-up">
              <span className="hero__eyebrow">
                <Icon name="spark" size={13} /> {cfg.hero.eyebrow}
              </span>
              <h1 className="hero__title">{cfg.hero.title}</h1>
              <p className="hero__lead">{cfg.hero.lead}</p>
              <div className="hero__ctas hero__ctas--center">
                {cfg.hero.ctas.map((c) => (
                  <Cta key={c.id} cta={c} />
                ))}
              </div>
              <ul className="hero__points hero__points--center">
                {cfg.hero.points.map((p) => (
                  <li key={p.label}>
                    <Icon name={p.icon as never} size={15} /> {p.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ============ 3 · LEADERSHIP MESSAGES ============ */}
      <LeadershipMessages config={cfg.leadership} />

      {/* ============ 4 · TALENT EXISTS EVERYWHERE ============ */}
      {cfg.talent.visible && (
        <section className="section section--tight talent" id={cfg.talent.id} aria-label={cfg.talent.title}>
          <div className="container container--narrow">
            <Reveal>
              <h2 className="talent__title">
                {cfg.talent.title}{' '}
                <em>{cfg.talent.titleEmphasis}</em>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="talent__body">{cfg.talent.body}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ 5 · VISION + MISSION (balanced cards) ============ */}
      {cfg.visionMission.visible && (
        <section className="section section--tight vm" id={cfg.visionMission.id} aria-label="Vision and mission">
          <div className="container">
            <div className="vm-grid">
              {cfg.visionMission.cards.map((card, i) => (
                <Reveal key={card.id} delay={i * 100}>
                  <div className={`vm-card vm-card--${card.tone}`}>
                    <span className="eyebrow">{card.eyebrow}</span>
                    <p>{card.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 6 · WHAT WE DO ============ */}
      {cfg.whatWeDo.visible && (
        <section className="section home-programs" id={cfg.whatWeDo.id} aria-label={cfg.whatWeDo.title}>
          <div className="container">
            <Reveal>
              <SectionHeader
                eyebrow={cfg.whatWeDo.eyebrow}
                title={cfg.whatWeDo.title}
                lead={cfg.whatWeDo.lead}
                action={cfg.whatWeDo.cta && <Cta cta={cfg.whatWeDo.cta} />}
              />
            </Reveal>
            <div className="grid grid--3">
              {PROGRAMS.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <ProgramCard program={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 7 · UPCOMING EVENTS (excludes featured; hidden when empty) ============ */}
      {cfg.upcomingEvents.visible && otherUpcoming.length > 0 && (
        <section className="section section--dark" id={cfg.upcomingEvents.id} aria-label={cfg.upcomingEvents.title}>
          <div className="container">
            <Reveal>
              <SectionHeader
                dark
                eyebrow={cfg.upcomingEvents.eyebrow}
                title={cfg.upcomingEvents.title}
                lead={cfg.upcomingEvents.lead}
                action={cfg.upcomingEvents.cta && <Cta cta={cfg.upcomingEvents.cta} />}
              />
            </Reveal>
            <div className="grid grid--3">
              {otherUpcoming.slice(0, 3).map((e, i) => (
                <Reveal key={e.id} delay={i * 90}>
                  <EventCard event={e} dark />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 8 · WHERE THE PLATFORM COMES FROM ============ */}
      {cfg.previousWork.visible && (
        <section className="section section--dark previous-work" id={cfg.previousWork.id} aria-label={cfg.previousWork.title}>
          <div className="container">
            <Reveal>
              <SectionHeader
                dark
                eyebrow={cfg.previousWork.eyebrow}
                title={cfg.previousWork.title}
                lead={cfg.previousWork.lead}
              />
            </Reveal>
            <div className="grid grid--3">
              {PREVIOUS_WORK.map((w, i) => (
                <Reveal key={w.id} delay={i * 90}>
                  <article className="event-block work-card">
                    <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                      {i === 0 ? '2025 · Hazara University, Mansehra' : i === 1 ? '2026 · Institutional collaboration' : 'Regional ecosystem'}
                    </span>
                    <h3 style={{ marginTop: 10 }}>{w.title}</h3>
                    <p style={{ marginTop: 8, color: 'var(--muted-on-dark)' }}>{w.detail}</p>
                    {w.id === 'hazara-tech-fiesta' && (
                      <ul className="highlights-list" style={{ marginTop: 14 }}>
                        <li><Icon name="users" size={16} /> 5,000+ attendees</li>
                        <li><Icon name="mic" size={16} /> 50+ speakers · 15+ exhibitors</li>
                        <li><Icon name="clock" size={16} /> 24-hour hackathon</li>
                        <li><Icon name="calendar" size={16} /> 12–14 December 2025</li>
                      </ul>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="home-eco__note">
                Ecosystem engagement has included {PRIOR_ECOSYSTEM_NAMES.slice(0, 5).join(', ')} and others. {PRIOR_ECOSYSTEM_NOTE}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="cta-band__ctas" style={{ marginTop: 22 }}>
                <Button to="/events/hazara-tech-fiesta-2025" variant="outline-light" icon="arrow-right">About Hazara Tech Fiesta</Button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ 9 · IMPACT (QUALITATIVE) ============ */}
      {cfg.impact.visible && (
        <section className="section" id={cfg.impact.id} aria-label={cfg.impact.title}>
          <div className="container">
            <Reveal>
              <SectionHeader
                center
                eyebrow={cfg.impact.eyebrow}
                title={cfg.impact.title}
                lead={cfg.impact.lead}
              />
            </Reveal>
            <div className="grid grid--4">
              {IMPACT_STATEMENTS.map((s, i) => (
                <Reveal key={s.id} delay={i * 70}>
                  <div className="value-card impact-card">
                    <span className="value-card__icon"><Icon name={s.icon as never} size={20} /></span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 10 · PARTNERSHIP ============ */}
      {cfg.partnership.visible && (
        <section className="section section--light" id={cfg.partnership.id} aria-label={cfg.partnership.title}>
          <div className="container container--narrow">
            <Reveal>
              <SectionHeader center eyebrow={cfg.partnership.eyebrow} title={cfg.partnership.title} />
            </Reveal>
            <Reveal delay={90}>
              <p className="home-intro__text">{cfg.partnership.body}</p>
            </Reveal>
            <Reveal delay={140}>
              <div className="cta-band__ctas" style={{ justifyContent: 'center', marginTop: 24 }}>
                {cfg.partnership.cta && <Cta cta={cfg.partnership.cta} />}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ 11 · NEWSROOM ============ */}
      {cfg.newsroom.visible && (
        <section className="section" id={cfg.newsroom.id} aria-label={cfg.newsroom.title}>
          <div className="container">
            <Reveal>
              <SectionHeader
                eyebrow={cfg.newsroom.eyebrow}
                title={cfg.newsroom.title}
                lead={cfg.newsroom.lead}
                action={cfg.newsroom.cta && <Cta cta={cfg.newsroom.cta} />}
              />
            </Reveal>
            <div className="grid grid--3">
              {blogs === null
                ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
                : blogs.map((b, i) => (
                    <Reveal key={b.id} delay={i * 90}>
                      <BlogCard post={b} />
                    </Reveal>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 12 · FINAL CTA ============ */}
      {cfg.finalCta.visible && (
        <section className="section cta-band" id={cfg.finalCta.id} aria-label={cfg.finalCta.title}>
          <span className="cta-band__glow" aria-hidden="true" />
          <div className="container cta-band__inner">
            <Reveal>
              <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>{cfg.finalCta.eyebrow}</span>
              <h2 style={{ marginTop: 12 }}>{cfg.finalCta.title}</h2>
              <p style={{ marginTop: 10 }}>{cfg.finalCta.body}</p>
              <div className="cta-band__ctas">
                {cfg.finalCta.ctas.map((c) => (
                  <Cta key={c.id} cta={c} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

/* ============================================================
   Featured upcoming event banner — premium, data-driven
   ============================================================ */

function FeaturedEventBanner({ event }: { event: ThriveEvent }) {
  const cfg = HOME_PAGE.featuredEvent;
  return (
    <section className="feat-ev" id={cfg.id} aria-label={`Featured platform: ${event.title}`}>
      <div className="feat-ev__bg" style={spriteStyle(event.image)} aria-hidden="true" />
      <span className="feat-ev__glow" aria-hidden="true" />
      <span className="feat-ev__glow feat-ev__glow--2" aria-hidden="true" />
      <div className="container feat-ev__inner">
        <div className="feat-ev__content anim-fade-up">
          <span className="feat-ev__kicker">
            <span className="feat-ev__pulse" aria-hidden="true" />
            {cfg.kicker} · {cfg.statusLabel}
          </span>
          <img className="feat-ev__logo" src={BRAND.futurexColor} alt={`${event.title} logo`} width={230} height={74} />
          <p className="feat-ev__pillars">{event.tags.join('  ·  ')}</p>
          <ul className="feat-ev__meta">
            <li><Icon name="calendar" size={16} /> {event.dateLabel} — confirmed</li>
            <li><Icon name="pin" size={16} /> {event.location}</li>
          </ul>
          <div className="feat-ev__ctas">
            {cfg.ctas.map((c) => (
              <Cta key={c.id} cta={c} />
            ))}
          </div>
        </div>
        <div className="feat-ev__count anim-fade-up" style={{ animationDelay: '160ms' }}>
          <h4>{cfg.countdownLabel}</h4>
          <Countdown targetIso={event.date} />
          <p className="feat-ev__note">{cfg.note}</p>
        </div>
      </div>
    </section>
  );
}
