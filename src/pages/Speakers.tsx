import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EVENTS } from '../data/events';
import { EXPERTISE_FILTERS } from '../data/speakers';
import { speakersService } from '../services/speakersService';
import { useDebouncedValue, useSeo } from '../hooks';
import type { Speaker } from '../types';
import { PageHero } from '../components/page-hero';
import { SpeakerCard } from '../components/cards';
import { Button, CardSkeleton, EmptyState, Icon, Reveal } from '../components/ui';

export default function Speakers() {
  useSeo({
    title: 'Speakers',
    description:
      'Thrive Pakistan speaker announcements — confirmed FutureX speakers and practitioners will be announced here as the programme is confirmed.',
  });

  const [params, setParams] = useSearchParams();
  const expertise = params.get('expertise') ?? 'all';
  const event = params.get('event') ?? 'all';
  const queryParam = params.get('q') ?? '';
  const [query, setQuery] = useState(queryParam);
  const debounced = useDebouncedValue(query, 250);

  const [speakers, setSpeakers] = useState<Speaker[] | null>(null);

  const filters = useMemo(() => ({ expertise, event, query: debounced }), [expertise, event, debounced]);

  useEffect(() => {
    let alive = true;
    setSpeakers(null);
    speakersService.list(filters).then((list) => alive && setSpeakers(list));
    return () => {
      alive = false;
    };
  }, [filters]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const reset = () => {
    setParams(new URLSearchParams(), { replace: true });
    setQuery('');
  };

  return (
    <>
      <PageHero
        eyebrow="Speakers"
        title="Practitioners over personalities."
        lead="We prioritize people who build, hire, research, lead and solve. Confirmed speakers will be announced here as the FutureX programme is finalized."
        crumbs={[{ label: 'Speakers' }]}
        meta={[
          { icon: 'mic', label: 'Announcements to come' },
          { icon: 'spark', label: 'FutureX 2026 · 24 September 2026' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Speaker filters">
            <div className="searchbar" style={{ maxWidth: 460 }}>
              <span className="searchbar__icon"><Icon name="search" size={17} /></span>
              <input
                className="searchbar__input"
                type="search"
                placeholder="Search speakers, topics, organizations…"
                value={query}
                aria-label="Search speakers"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setParam('q', e.target.value);
                }}
              />
            </div>
            <div className="filter-bar__chips">
              <button
                type="button"
                className={`chip ${expertise === 'all' ? 'chip--active' : ''}`}
                onClick={() => setParam('expertise', 'all')}
                aria-pressed={expertise === 'all'}
              >
                All expertise
              </button>
              {EXPERTISE_FILTERS.map((x) => (
                <button
                  key={x}
                  type="button"
                  className={`chip ${expertise === x ? 'chip--active' : ''}`}
                  onClick={() => setParam('expertise', x)}
                  aria-pressed={expertise === x}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className="filter-bar__selects">
              <select
                className="filter-select"
                value={event}
                onChange={(e) => setParam('event', e.target.value)}
                aria-label="Filter by event"
              >
                <option value="all">All events</option>
                {EVENTS.map((e) => (
                  <option key={e.slug} value={e.slug}>{e.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="listing-head">
            <p className="listing-count" role="status">
              {speakers === null ? 'Loading speakers…' : `${speakers.length} speaker${speakers.length === 1 ? '' : 's'}`}
            </p>
            <Button variant="ghost" size="sm" to="/become-a-speaker">Become a speaker</Button>
          </div>

          {speakers === null ? (
            <div className="grid grid--4">
              {[0, 1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : speakers.length === 0 ? (
            <EmptyState
              title="No speakers announced yet."
              message="Speaker announcements will be shared as the FutureX programme is confirmed. No unconfirmed names are published here."
              actionLabel={query || expertise !== 'all' || event !== 'all' ? 'Clear all filters' : undefined}
              onAction={query || expertise !== 'all' || event !== 'all' ? reset : undefined}
              icon="mic"
            />
          ) : (
            <div className="grid grid--4">
              {speakers.map((s, i) => (
                <Reveal key={s.id} delay={(i % 4) * 70}>
                  <SpeakerCard speaker={s} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
