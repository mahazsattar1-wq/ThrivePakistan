import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { EVENTS_PAGE_CONFIG } from '../data/eventsPage';
import { useSeo } from '../hooks';
import { eventsService } from '../services/eventsService';
import type { ThriveEvent } from '../types';
import { PageHero } from '../components/page-hero';
import { EventCard } from '../components/cards';
import { Button, CardSkeleton, EmptyState, Icon, Reveal, SectionHeader } from '../components/ui';

export type EventsMode = 'overview' | 'upcoming' | 'past';

export interface EventsProps {
  mode?: EventsMode;
}

export default function Events({ mode }: EventsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const activeMode: EventsMode = (() => {
    if (mode) return mode;
    const path = location.pathname;
    if (path.endsWith('/upcoming')) return 'upcoming';
    if (path.endsWith('/past')) return 'past';
    const statusParam = params.get('status') || params.get('type');
    if (statusParam === 'upcoming') return 'upcoming';
    if (statusParam === 'past') return 'past';
    return 'overview';
  })();

  const [upcomingEvents, setUpcomingEvents] = useState<ThriveEvent[] | null>(null);
  const [pastEvents, setPastEvents] = useState<ThriveEvent[] | null>(null);

  useEffect(() => {
    let alive = true;
    eventsService.list({ type: 'upcoming' }).then((list) => alive && setUpcomingEvents(list));
    eventsService.list({ type: 'past' }).then((list) => alive && setPastEvents(list));
    return () => {
      alive = false;
    };
  }, []);

  const cfg = EVENTS_PAGE_CONFIG;

  if (activeMode === 'upcoming') {
    return (
      <CategoryListingView
        cfg={cfg.upcomingView}
        events={upcomingEvents}
        onAction={() => navigate('/events/past')}
      />
    );
  }

  if (activeMode === 'past') {
    return (
      <CategoryListingView
        cfg={cfg.pastView}
        events={pastEvents}
        onAction={() => navigate('/events/upcoming')}
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
          { icon: 'calendar', label: cfg.hero.metaDate },
          { icon: 'pin', label: cfg.hero.metaLocation },
        ]}
      />

      {/* Two Primary Event Categories Entry Points */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow={cfg.categoriesSection.eyebrow}
              title={cfg.categoriesSection.title}
              lead={cfg.categoriesSection.lead}
            />
          </Reveal>
          <div className="grid grid--2" style={{ gap: '24px' }}>
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
                      {upcomingCount}{' '}
                      {upcomingCount === 1
                        ? cfg.categories.upcoming.countLabelSingular
                        : cfg.categories.upcoming.countLabelPlural}
                    </span>
                  </p>
                </div>
                <div style={{ marginTop: 22 }}>
                  <Button to={cfg.categories.upcoming.ctaTo} variant="primary" size="md" icon="arrow-right" className="btn--block">
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
                      {pastCount}{' '}
                      {pastCount === 1
                        ? cfg.categories.past.countLabelSingular
                        : cfg.categories.past.countLabelPlural}
                    </span>
                  </p>
                </div>
                <div style={{ marginTop: 22 }}>
                  <Button to={cfg.categories.past.ctaTo} variant="outline-light" size="md" icon="arrow-right" className="btn--block">
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
              <Reveal key={step.id} delay={i * 70}>
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
              <Reveal key={pt.id} delay={(i % 3) * 70}>
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
    </>
  );
}

/* ================= Category Listing View ================= */

function CategoryListingView({
  cfg,
  events,
  onAction,
}: {
  cfg: typeof EVENTS_PAGE_CONFIG['upcomingView'] | typeof EVENTS_PAGE_CONFIG['pastView'];
  events: ThriveEvent[] | null;
  onAction: () => void;
}) {
  useSeo({
    title: cfg.title,
    description: cfg.lead,
  });

  return (
    <>
      <PageHero
        eyebrow={cfg.eyebrow}
        title={cfg.title}
        lead={cfg.lead}
        meta={[
          {
            icon: 'calendar',
            label:
              events === null
                ? 'Loading platforms…'
                : `${events.length} ${events.length === 1 ? cfg.listingCountSingular : cfg.listingCountPlural}`,
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="listing-head" style={{ marginBottom: 24 }}>
            <p className="listing-count" role="status">
              {events === null
                ? 'Loading platforms…'
                : `${events.length} ${events.length === 1 ? cfg.listingCountSingular : cfg.listingCountPlural}`}
            </p>
            <Button variant="ghost" size="sm" to="/events">
              {cfg.overviewCtaLabel}
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
              title={cfg.emptyTitle}
              message={cfg.emptyMessage}
              actionLabel={cfg.emptyCtaLabel}
              onAction={onAction}
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
