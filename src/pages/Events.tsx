import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EVENT_CATEGORIES, EVENT_CITIES } from '../data/events';
import { eventsService } from '../services/eventsService';
import type { EventFilters } from '../services/eventsService';
import { useSeo } from '../hooks';
import type { ThriveEvent } from '../types';
import { PageHero } from '../components/page-hero';
import { EventCard } from '../components/cards';
import { Button, CardSkeleton, EmptyState, Reveal } from '../components/ui';

const STATUS_OPTIONS = [
  { id: 'all', label: 'All Events' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
] as const;

export default function Events() {
  useSeo({
    title: 'Events',
    description: 'Thrive Pakistan events — FutureX 2026 and the documented record of Hazara Tech Fiesta 2025. Only confirmed events are published here.',
  });

  const [params, setParams] = useSearchParams();
  const status = (params.get('status') as EventFilters['status']) ?? 'all';
  const category = params.get('category') ?? 'all';
  const city = params.get('city') ?? 'all';

  const [events, setEvents] = useState<ThriveEvent[] | null>(null);

  const filters = useMemo<EventFilters>(() => ({ status, category, city }), [status, category, city]);

  useEffect(() => {
    let alive = true;
    setEvents(null);
    eventsService.list(filters).then((list) => alive && setEvents(list));
    return () => {
      alive = false;
    };
  }, [filters]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Platforms, festivals and convenings."
        lead="Only events confirmed in our organizational record are published here — with details as confirmed, and nothing invented."
        crumbs={[{ label: 'Events' }]}
        meta={[
          { icon: 'calendar', label: 'FutureX 2026 · 24 September 2026' },
          { icon: 'pin', label: 'Mansehra, Khyber Pakhtunkhwa' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Event filters">
            <div className="filter-bar__chips">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`chip ${status === s.id ? 'chip--active' : ''}`}
                  onClick={() => setParam('status', s.id)}
                  aria-pressed={status === s.id}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="filter-bar__selects">
              <select
                className="filter-select"
                value={category}
                onChange={(e) => setParam('category', e.target.value)}
                aria-label="Filter by category"
              >
                <option value="all">All categories</option>
                {EVENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                className="filter-select"
                value={city}
                onChange={(e) => setParam('city', e.target.value)}
                aria-label="Filter by city"
              >
                <option value="all">All cities</option>
                {EVENT_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="listing-head">
            <p className="listing-count" role="status">
              {events === null ? 'Loading events…' : `${events.length} event${events.length === 1 ? '' : 's'} found`}
            </p>
            {(status !== 'all' || category !== 'all' || city !== 'all') && (
              <Button variant="ghost" size="sm" onClick={reset}>Clear filters</Button>
            )}
          </div>

          {events === null ? (
            <div className="grid grid--3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <EmptyState
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
              icon="calendar"
            />
          ) : (
            <div className="grid grid--3">
              {events.map((e, i) => (
                <Reveal key={e.id} delay={(i % 3) * 80}>
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
