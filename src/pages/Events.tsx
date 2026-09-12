import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { EVENTS_PAGE_CONFIG } from '../data/eventsPage';
import { PREVIOUS_WORK, PRIOR_ECOSYSTEM_NAMES, PRIOR_ECOSYSTEM_NOTE } from '../data/org';
import { useSeo } from '../hooks';
import { eventsService } from '../services/eventsService';
import type { ThriveEvent } from '../types';
import { PageHero } from '../components/page-hero';
import { EventCard } from '../components/cards';
import { Button, CardSkeleton, EmptyState, Icon, Reveal, SectionHeader } from '../components/ui';

export interface EventsProps {
  mode?: 'overview' | 'upcoming' | 'past';
}

export default function Events({ mode }: EventsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const activeMode = (() => {
    if (mode) return mode;
    if (location.pathname.endsWith('/upcoming')) return 'upcoming';
    if (location.pathname.endsWith('/past')) return 'past';
    const statusParam = params.get('status');
    if (statusParam === 'upcoming') return 'upcoming';
    if (statusParam === 'past') return 'past';
    return 'overview';
  })();

  const [upcomingEvents, setUpcomingEvents] = useState<ThriveEvent[] | null>(null);
  const [pastEvents, setPastEvents] = useState<ThriveEvent[] | null>(null);

  useEffect(() => {
    let alive = true;
    eventsService.list({ status: 'upcoming' }).then((list) => {
      if (alive) setUpcomingEvents(list);
    });
    eventsService.list({ status: 'past' }).then((list) => {
      if (alive) setPastEvents(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const cfg = EVENTS_PAGE_CONFIG;

  if (activeMode === 'upcoming') {
    return (
      <UpcomingEventsView
        events={upcomingEvents}
        onExplorePast={() => navigate('/events/past')}
      />
    );
  }

  if (activeMode === 'past') {
    return (
      <PastEventsView
        events={pastEvents}
        onExploreUpcoming={() => navigate('/events/upcoming')}
      />
    );
  }

  return (
    <EventsOverviewView
      cfg={cfg}
      upcomingCount={upcomingEvents ? upcomingEvents.length : 0}
      pastCount={pastEvents ? pastEvents.length : 0}
    />
  );
}

/* ================= Main Events Landing Overview ================= */

function EventsOverviewView({
  cfg,
  upcomingCount,
  pastCount,
}: {
  cfg: typeof EVENTS_PAGE_CONFIG;
  upcomingCount: number;
  pastCount: number;
}) {
  useSeo({
    title: 'Events',
    description: cfg.hero.lead,
  });

  return (
    <>
      <PageHero
        eyebrow={cfg.hero.eyebrow}
        title={cfg.hero.title}
        lead={cfg.hero.lead}
        meta={[
          { icon: 'calendar', label: 'FutureX 2026 · 24 September 2026' },
          { icon: 'pin', label: 'Mansehra, Khyber Pakhtunkhwa' },
        ]}
      />

      {/* Two Primary Event Categories Entry Points */}
      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--2">
            <Reveal>
              <div className="event-cat-card">
                <div>
                  <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                    {cfg.categories.upcoming.kicker}
                  </span>
                  <h3 className="event-cat-card__title">{cfg.categories.upcoming.title}</h3>
                  <p className="event-cat-card__desc">{cfg.categories.upcoming.description}</p>
                  <p className="event-cat-card__count">
                    <Icon name="calendar" size={15} />
                    <span>
                      {upcomingCount} scheduled platform{upcomingCount === 1 ? '' : 's'}
                    </span>
                  </p>
                </div>
                <div style={{ marginTop: 22 }}>
                  <Button to={cfg.categories.upcoming.ctaTo} variant="primary" icon="arrow-right">
                    {cfg.categories.upcoming.ctaLabel}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="event-cat-card event-cat-card--dark">
                <div>
                  <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                    {cfg.categories.past.kicker}
                  </span>
                  <h3 className="event-cat-card__title">{cfg.categories.past.title}</h3>
                  <p className="event-cat-card__desc">{cfg.categories.past.description}</p>
                  <p className="event-cat-card__count">
                    <Icon name="check" size={15} />
                    <span>
                      {pastCount} documented past platform{pastCount === 1 ? '' : 's'}
                    </span>
                  </p>
                </div>
                <div style={{ marginTop: 22 }}>
                  <Button to={cfg.categories.past.ctaTo} variant="outline-light" icon="arrow-right">
                    {cfg.categories.past.ctaLabel}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW WE CONDUCT OUR EVENTS */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow={cfg.process.eyebrow}
              title={cfg.process.title}
              lead={cfg.process.lead}
            />
          </Reveal>
          <div className="grid grid--3" style={{ gap: '20px' }}>
            {cfg.process.steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 70}>
                <div className="event-process-card">
                  <span className="event-process-card__num">{step.num}</span>
                  <h3 className="event-process-card__title">{step.title}</h3>
                  <p className="event-process-card__text">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT FORMATS */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow={cfg.formats.eyebrow}
              title={cfg.formats.title}
              lead={cfg.formats.lead}
            />
          </Reveal>
          <div className="grid grid--3">
            {cfg.formats.items.map((fmt, i) => (
              <Reveal key={fmt.id} delay={(i % 3) * 70}>
                <div className="event-format-card">
                  <span className="event-format-card__icon">
                    <Icon name={fmt.icon as never} size={20} />
                  </span>
                  <h3>{fmt.title}</h3>
                  <p>{fmt.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY EVENTS MATTER */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              center
              eyebrow={cfg.whyEventsMatter.eyebrow}
              title={cfg.whyEventsMatter.title}
              lead={cfg.whyEventsMatter.lead}
            />
          </Reveal>
          <div className="grid grid--3">
            {cfg.whyEventsMatter.points.map((pt, i) => (
              <Reveal key={pt.title} delay={(i % 3) * 70}>
                <div className="value-card" style={{ height: '100%' }}>
                  <span className="value-card__icon">
                    <Icon name={pt.icon as never} size={20} />
                  </span>
                  <h3>{pt.title}</h3>
                  <p>{pt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIOUS WORK / EVENT JOURNEY */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow={cfg.previousWorkSection.eyebrow}
              title={cfg.previousWorkSection.title}
              lead={cfg.previousWorkSection.lead}
            />
          </Reveal>
          <div className="grid grid--3">
            {PREVIOUS_WORK.map((w, i) => (
              <Reveal key={w.id} delay={i * 90}>
                <article className="event-block work-card">
                  <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                    {i === 0
                      ? '2025 · Hazara University, Mansehra'
                      : i === 1
                      ? '2026 · Institutional collaboration'
                      : 'Regional ecosystem'}
                  </span>
                  <h3 style={{ marginTop: 10 }}>{w.title}</h3>
                  <p style={{ marginTop: 8, color: 'var(--muted-on-dark)' }}>{w.detail}</p>
                  {w.id === 'hazara-tech-fiesta' && (
                    <ul className="highlights-list" style={{ marginTop: 14 }}>
                      <li>
                        <Icon name="users" size={16} /> 5,000+ attendees
                      </li>
                      <li>
                        <Icon name="mic" size={16} /> 50+ speakers · 15+ exhibitors
                      </li>
                      <li>
                        <Icon name="clock" size={16} /> 24-hour hackathon
                      </li>
                      <li>
                        <Icon name="calendar" size={16} /> 12–14 December 2025
                      </li>
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="home-eco__note">
              Ecosystem engagement has included {PRIOR_ECOSYSTEM_NAMES.slice(0, 5).join(', ')} and
              others. {PRIOR_ECOSYSTEM_NOTE}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ================= Upcoming Events View ================= */

function UpcomingEventsView({
  events,
  onExplorePast,
}: {
  events: ThriveEvent[] | null;
  onExplorePast: () => void;
}) {
  useSeo({
    title: 'Upcoming Events',
    description:
      'Upcoming Thrive Pakistan events: confirmed platforms and convenings scheduled in Hazara and Khyber Pakhtunkhwa.',
  });

  return (
    <>
      <PageHero
        eyebrow="Scheduled Platforms"
        title="Upcoming Events"
        lead="Confirmed platforms and convenings scheduled and open for interest. Details are published as confirmed."
        meta={[
          {
            icon: 'calendar',
            label:
              events === null
                ? 'Loading upcoming events…'
                : `${events.length} upcoming platform${events.length === 1 ? '' : 's'}`,
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="listing-head" style={{ marginBottom: 24 }}>
            <p className="listing-count" role="status">
              {events === null
                ? 'Loading upcoming events…'
                : `${events.length} upcoming event${events.length === 1 ? '' : 's'} scheduled`}
            </p>
            <Button variant="ghost" size="sm" to="/events">
              All Events Overview
            </Button>
          </div>

          {events === null ? (
            <div className="grid grid--3">
              {[0, 1].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <EmptyState
<<<<<<< HEAD
              title={
                status === 'upcoming' && category === 'all' && city === 'all'
                  ? 'No upcoming events at the moment.'
                  : status === 'past' && category === 'all' && city === 'all'
                  ? 'No past events available yet.'
                  : 'No events match your filters.'
              }
              message={
                status === 'upcoming' && category === 'all' && city === 'all'
                  ? 'Check back soon for new platform announcements, or explore our past events.'
                  : status === 'past' && category === 'all' && city === 'all'
                  ? 'Our documented public journey is just beginning.'
                  : 'Try adjusting your category or city filters.'
              }
              actionLabel={status !== 'all' || category !== 'all' || city !== 'all' ? 'Reset filters' : undefined}
              onAction={reset}
=======
              title="No upcoming events at the moment."
              message="New platform dates and convenings will be announced here as details are confirmed. Explore our past events in the interim."
              actionLabel="Explore Past Events"
              onAction={onExplorePast}
>>>>>>> d651877 (feat: complete Phase 14 typography cleanup and Phase 15 Thrive Pakistan Events Hub)
              icon="calendar"
            />
          ) : (
            <div className="grid grid--3">
              {events.map((e, i) => (
                <Reveal key={e.id} delay={i * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ================= Past Events View ================= */

function PastEventsView({
  events,
  onExploreUpcoming,
}: {
  events: ThriveEvent[] | null;
  onExploreUpcoming: () => void;
}) {
  useSeo({
    title: 'Past Events',
    description:
      'Documented record of past Thrive Pakistan events, technology festivals, and institutional convenings.',
  });

  return (
    <>
      <PageHero
        eyebrow="Documented Record"
        title="Past Events"
        lead="Completed events and regional technology festivals delivered by Thrive Pakistan. Our documented record reflects real experience and verified outcomes."
        meta={[
          {
            icon: 'calendar',
            label:
              events === null
                ? 'Loading past events…'
                : `${events.length} documented past platform${events.length === 1 ? '' : 's'}`,
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="listing-head" style={{ marginBottom: 24 }}>
            <p className="listing-count" role="status">
              {events === null
                ? 'Loading past events…'
                : `${events.length} past event${events.length === 1 ? '' : 's'} documented`}
            </p>
            <Button variant="ghost" size="sm" to="/events">
              All Events Overview
            </Button>
          </div>

          {events === null ? (
            <div className="grid grid--3">
              {[0, 1].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <EmptyState
              title="No past events documented yet."
              message="Our documented public record will expand as new platforms are delivered."
              actionLabel="View Upcoming Events"
              onAction={onExploreUpcoming}
              icon="calendar"
            />
          ) : (
            <div className="grid grid--3">
              {events.map((e, i) => (
                <Reveal key={e.id} delay={i * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
