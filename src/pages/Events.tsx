import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
<<<<<<< HEAD
import { EVENTS_PAGE_CONFIG, CategoryCardConfig } from '../data/eventsPage';
=======
import { EVENTS_PAGE_CONFIG } from '../data/eventsPage';
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
import { useSeo } from '../hooks';
import { eventsService } from '../services/eventsService';
import type { ThriveEvent } from '../types';
import { PageHero } from '../components/page-hero';
import { EventCard } from '../components/cards';
import { Button, CardSkeleton, EmptyState, Icon, Reveal, SectionHeader } from '../components/ui';

<<<<<<< HEAD
export type EventsMode = 'overview' | 'upcoming' | 'past' | 'seminars' | 'workshops' | 'tours-trips';
=======
export type EventsMode = 'overview' | 'upcoming' | 'past';
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)

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
<<<<<<< HEAD
    if (path.endsWith('/seminars')) return 'seminars';
    if (path.endsWith('/workshops')) return 'workshops';
    if (path.endsWith('/tours-trips') || path.endsWith('/tours')) return 'tours-trips';
    const typeParam = params.get('type') || params.get('category') || params.get('status');
    if (typeParam === 'upcoming') return 'upcoming';
    if (typeParam === 'past') return 'past';
    if (typeParam === 'seminars') return 'seminars';
    if (typeParam === 'workshops') return 'workshops';
    if (typeParam === 'tours-trips' || typeParam === 'tours') return 'tours-trips';
=======
    const statusParam = params.get('status') || params.get('type');
    if (statusParam === 'upcoming') return 'upcoming';
    if (statusParam === 'past') return 'past';
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
    return 'overview';
  })();

  const [upcomingEvents, setUpcomingEvents] = useState<ThriveEvent[] | null>(null);
  const [pastEvents, setPastEvents] = useState<ThriveEvent[] | null>(null);
<<<<<<< HEAD
  const [seminarEvents, setSeminarEvents] = useState<ThriveEvent[] | null>(null);
  const [workshopEvents, setWorkshopEvents] = useState<ThriveEvent[] | null>(null);
  const [tourEvents, setTourEvents] = useState<ThriveEvent[] | null>(null);
=======
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)

  useEffect(() => {
    let alive = true;
    eventsService.list({ type: 'upcoming' }).then((list) => alive && setUpcomingEvents(list));
    eventsService.list({ type: 'past' }).then((list) => alive && setPastEvents(list));
<<<<<<< HEAD
    eventsService.list({ type: 'seminars' }).then((list) => alive && setSeminarEvents(list));
    eventsService.list({ type: 'workshops' }).then((list) => alive && setWorkshopEvents(list));
    eventsService.list({ type: 'tours-trips' }).then((list) => alive && setTourEvents(list));
=======
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
    return () => {
      alive = false;
    };
  }, []);

  const cfg = EVENTS_PAGE_CONFIG;

  if (activeMode === 'upcoming') {
    return (
      <CategoryListingView
<<<<<<< HEAD
        title="Upcoming Events"
        eyebrow="Scheduled Platforms"
        lead="Confirmed platforms and convenings scheduled and open for interest. Details are published as confirmed."
        events={upcomingEvents}
        emptyTitle="No upcoming events at the moment."
        emptyMessage="New platform dates and convenings will be announced here as details are confirmed. Explore our past events in the interim."
        onExplorePast={() => navigate('/events/past')}
=======
        cfg={cfg.upcomingView}
        events={upcomingEvents}
        onAction={() => navigate('/events/past')}
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
      />
    );
  }

  if (activeMode === 'past') {
    return (
      <CategoryListingView
<<<<<<< HEAD
        title="Past Events"
        eyebrow="Documented Record"
        lead="Completed events and regional technology festivals delivered by Thrive Pakistan. Our documented record reflects real experience and verified outcomes."
        events={pastEvents}
        emptyTitle="No past events documented yet."
        emptyMessage="Our documented public record will expand as new platforms are delivered."
        onExplorePast={() => navigate('/events/upcoming')}
      />
    );
  }

  if (activeMode === 'seminars') {
    return (
      <CategoryListingView
        title="Seminars & Masterclasses"
        eyebrow="Subject-Matter Sessions"
        lead="Focused seminar convenings, expert talks, and masterclasses addressing AI, technology, career pathways, digital trust, and leadership."
        events={seminarEvents}
        emptyTitle="No seminars scheduled at the moment."
        emptyMessage="Upcoming seminars and masterclasses will be published here as session topics, speakers, and dates are finalized."
        onExplorePast={() => navigate('/events')}
      />
    );
  }

  if (activeMode === 'workshops') {
    return (
      <CategoryListingView
        title="Workshops & Practical Labs"
        eyebrow="Applied Learning"
        lead="Hands-on learning environments, live demonstrations, and interactive technical skill-building labs."
        events={workshopEvents}
        emptyTitle="No workshops scheduled at the moment."
        emptyMessage="Practical workshops and skill-building labs will be announced here as schedule details are confirmed."
        onExplorePast={() => navigate('/events')}
      />
    );
  }

  if (activeMode === 'tours-trips') {
    return (
      <CategoryListingView
        title="Educational & Exposure Tours"
        eyebrow="Industry Exposure"
        lead="Guided exposure visits connecting students and emerging talent with companies, technology hubs, and academic institutions."
        events={tourEvents}
        emptyTitle="No educational or exposure tours scheduled at the moment."
        emptyMessage="Industry exposure and learning visits will be posted here as details are finalized."
        onExplorePast={() => navigate('/events')}
=======
        cfg={cfg.pastView}
        events={pastEvents}
        onAction={() => navigate('/events/upcoming')}
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
      />
    );
  }

  return (
    <EventsOverviewView
      cfg={cfg}
      upcomingCount={upcomingEvents ? upcomingEvents.length : 0}
      pastCount={pastEvents ? pastEvents.length : 0}
<<<<<<< HEAD
      seminarsCount={seminarEvents ? seminarEvents.length : 0}
      workshopsCount={workshopEvents ? workshopEvents.length : 0}
      toursCount={tourEvents ? tourEvents.length : 0}
      allEvents={[...(upcomingEvents ?? []), ...(pastEvents ?? [])]}
=======
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
    />
  );
}

/* ================= Main Events Landing Overview ================= */

function EventsOverviewView({
  cfg,
  upcomingCount,
  pastCount,
<<<<<<< HEAD
  seminarsCount,
  workshopsCount,
  toursCount,
  allEvents,
=======
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
}: {
  cfg: typeof EVENTS_PAGE_CONFIG;
  upcomingCount: number;
  pastCount: number;
<<<<<<< HEAD
  seminarsCount: number;
  workshopsCount: number;
  toursCount: number;
  allEvents: ThriveEvent[];
=======
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
}) {
  useSeo({
    title: 'Events',
    description: cfg.hero.lead,
  });
<<<<<<< HEAD

  const categoriesList: { key: string; config: CategoryCardConfig; count: number }[] = [
    { key: 'upcoming', config: cfg.categories.upcoming, count: upcomingCount },
    { key: 'past', config: cfg.categories.past, count: pastCount },
    { key: 'seminars', config: cfg.categories.seminars, count: seminarsCount },
    { key: 'workshops', config: cfg.categories.workshops, count: workshopsCount },
    { key: 'toursTrips', config: cfg.categories.toursTrips, count: toursCount },
  ];
=======
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)

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

      {/* 5 Primary Event Categories Entry Points */}
      <section className="section section--tight">
        <div className="container">
<<<<<<< HEAD
          <Reveal>
            <SectionHeader
              eyebrow="Event Ecosystem"
              title="Explore Event Categories"
              lead="Browse Thrive Pakistan's event convenings by format and purpose."
            />
          </Reveal>
          <div className="grid grid--3" style={{ gap: '20px' }}>
            {categoriesList.map((cat, i) => (
              <Reveal key={cat.key} delay={(i % 3) * 70}>
                <div className="event-cat-card">
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                      {cat.config.kicker}
                    </span>
                    <h3 className="event-cat-card__title">{cat.config.title}</h3>
                    <p className="event-cat-card__desc">{cat.config.description}</p>
                    <p className="event-cat-card__count">
                      <Icon name="calendar" size={15} />
                      <span>
                        {cat.count} published {cat.count === 1 ? 'item' : 'items'}
                      </span>
                    </p>
                  </div>
                  <div style={{ marginTop: 22 }}>
                    <Button to={cat.config.ctaTo} variant="primary" size="sm" icon="arrow-right" className="btn--block">
                      {cat.config.ctaLabel}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED & DOCUMENTED PLATFORMS */}
      {allEvents.length > 0 && (
        <section className="section section--dark">
          <div className="container">
            <Reveal>
              <SectionHeader
                dark
                eyebrow="Featured Platforms"
                title="Active & Documented Convenings"
                lead="Each event features a short summary and direct connection to its central media gallery collection."
              />
            </Reveal>
            <div className="grid grid--2" style={{ gap: '24px' }}>
              {allEvents.map((e, i) => (
                <Reveal key={e.id} delay={i * 90}>
                  <EventCard event={e} dark />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW WE CONDUCT OUR EVENTS */}
      <section className="section">
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
    </>
  );
}

/* ================= Category Listing View ================= */

function CategoryListingView({
  title,
  eyebrow,
  lead,
  events,
  emptyTitle,
  emptyMessage,
  onExplorePast,
}: {
  title: string;
  eyebrow: string;
  lead: string;
  events: ThriveEvent[] | null;
  emptyTitle: string;
  emptyMessage: string;
  onExplorePast: () => void;
}) {
  useSeo({
    title,
    description: lead,
  });

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        meta={[
          {
            icon: 'calendar',
            label:
              events === null
                ? 'Loading platform items…'
                : `${events.length} item${events.length === 1 ? '' : 's'} available`,
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="listing-head" style={{ marginBottom: 24 }}>
            <p className="listing-count" role="status">
              {events === null
                ? 'Loading items…'
                : `${events.length} ${title.toLowerCase()} item${events.length === 1 ? '' : 's'} published`}
            </p>
            <Button variant="ghost" size="sm" to="/events">
              All Events Overview
=======
          <div className="listing-head" style={{ marginBottom: 24 }}>
            <p className="listing-count" role="status">
              {events === null
                ? 'Loading platforms…'
                : `${events.length} ${events.length === 1 ? cfg.listingCountSingular : cfg.listingCountPlural}`}
            </p>
            <Button variant="ghost" size="sm" to="/events">
              {cfg.overviewCtaLabel}
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
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
              title={emptyTitle}
              message={emptyMessage}
              actionLabel="All Events Overview"
              onAction={onExplorePast}
=======
              title={cfg.emptyTitle}
              message={cfg.emptyMessage}
              actionLabel={cfg.emptyCtaLabel}
              onAction={onAction}
>>>>>>> 5f69977 (feat: complete Phase 17 events section cleanup, text visibility, and strict database-ready architecture)
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
