import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchAll } from '../services/searchService';
import { useDebouncedValue, useSeo } from '../hooks';
import type { SearchResults } from '../types';
import { Icon } from '../components/ui';
import type { IconName } from '../components/ui';
import { EmptyState } from '../components/ui';

type ResultKey = keyof Omit<SearchResults, 'query' | 'total'>;

export default function Search() {
  useSeo({
    title: 'Search',
    description: 'Search Thrive Pakistan — events, speakers, programs, articles and videos in one place.',
  });

  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  const debounced = useDebouncedValue(input, 250);
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    if (debounced !== q) {
      const next = new URLSearchParams(params);
      if (debounced) next.set('q', debounced);
      else next.delete('q');
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    let alive = true;
    searchAll(q).then((r) => alive && setResults(r));
    return () => {
      alive = false;
    };
  }, [q]);

  const groups: { key: ResultKey; label: string; icon: IconName }[] = [
    { key: 'events', label: 'Events', icon: 'calendar' },
    { key: 'speakers', label: 'Speakers', icon: 'mic' },
    { key: 'programs', label: 'Programs', icon: 'compass' },
    { key: 'blogs', label: 'Articles', icon: 'spark' },
    { key: 'videos', label: 'Videos', icon: 'play' },
  ];

  const toFor = (key: ResultKey, slug: string): string => {
    switch (key) {
      case 'events': return `/events/${slug}`;
      case 'speakers': return `/speakers/${slug}`;
      case 'programs': return `/programs/${slug}`;
      case 'blogs': return `/blog/${slug}`;
      case 'videos': return '/videos';
    }
  };

  const metaFor = (key: ResultKey, item: Record<string, unknown>): string => {
    switch (key) {
      case 'events': return `${item.category} · ${item.city}`;
      case 'speakers': return `${item.title} · ${item.organization}`;
      case 'programs': return String(item.category);
      case 'blogs': return `${item.category} · ${item.author}`;
      case 'videos': return `${item.category} · ${item.duration}`;
    }
  };

  return (
    <section className="section" style={{ paddingTop: 'clamp(48px, 7vw, 84px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', display: 'grid', gap: 10, justifyItems: 'center' }}>
          <span className="eyebrow">Global search</span>
          <h1>Find anything across Thrive Pakistan.</h1>
          <p style={{ color: 'var(--muted-text)', maxWidth: 520 }}>
            Events, speakers, programs, articles and videos — one query, categorized results.
          </p>
          <div className="searchbar search-page__input">
            <span className="searchbar__icon"><Icon name="search" size={18} /></span>
            <input
              className="searchbar__input"
              type="search"
              autoFocus
              placeholder="Try “FutureX”, “leadership”, “women”, “hackathon”…"
              value={input}
              aria-label="Search Thrive Pakistan"
              onChange={(e) => setInput(e.target.value)}
            />
            {input && (
              <button type="button" className="searchbar__clear" onClick={() => setInput('')} aria-label="Clear search">
                <Icon name="close" size={15} />
              </button>
            )}
          </div>
        </div>

        {results && q && (
          <p className="listing-count" style={{ textAlign: 'center', marginTop: 18 }} role="status">
            {results.total} result{results.total === 1 ? '' : 's'} for “{q}”
          </p>
        )}

        {results && q && results.total === 0 && (
          <div style={{ marginTop: 30 }}>
            <EmptyState
              title="Nothing matched that search."
              message="Try a broader term — or browse the directories directly."
              icon="search"
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
              <Link to="/events" className="btn btn--outline btn--sm">Events</Link>
              <Link to="/speakers" className="btn btn--outline btn--sm">Speakers</Link>
              <Link to="/blog" className="btn btn--outline btn--sm">Blog</Link>
            </div>
          </div>
        )}

        {groups.map((g) => {
          const items = results ? (results[g.key] as unknown as { slug?: string; title: string }[]) : [];
          if (!q || items.length === 0) return null;
          return (
            <div className="result-group" key={g.key}>
              <h2 className="result-group__title">
                <Icon name={g.icon} size={18} /> {g.label}
                <span className="badge badge--green">{items.length}</span>
              </h2>
              <div className="result-list">
                {items.map((item) => (
                  <Link
                    className="result-item"
                    key={item.title}
                    to={toFor(g.key, item.slug ?? '')}
                  >
                    <span className="result-item__icon"><Icon name={g.icon} size={18} /></span>
                    <span>
                      <span className="result-item__title">{item.title}</span>
                      <br />
                      <span className="result-item__meta">{metaFor(g.key, item as unknown as Record<string, unknown>)}</span>
                    </span>
                    <span className="result-item__go"><Icon name="arrow-right" size={16} /></span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {!q && (
          <div style={{ marginTop: 34, display: 'grid', gap: 12, justifyItems: 'center' }}>
            <p style={{ color: 'var(--muted-text)', fontSize: '0.92rem' }}>Popular searches:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['FutureX 2026', 'Leadership', 'Women Thrive', 'Hackathon', 'Campus', 'AI'].map((s) => (
                <button key={s} type="button" className="chip" onClick={() => setInput(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
