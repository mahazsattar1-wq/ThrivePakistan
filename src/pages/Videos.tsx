import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EVENTS } from '../data/events';
import { VIDEO_CATEGORIES } from '../data/videos';
import { videosService } from '../services/videosService';
import { useDebouncedValue, useSeo } from '../hooks';
import type { VideoItem } from '../types';
import { formatViews, formatDate } from '../utils';
import { spriteStyle } from '../media';
import { PageHero } from '../components/page-hero';
import { VideoCard } from '../components/cards';
import { CardSkeleton, EmptyState, Icon, Reveal } from '../components/ui';
import { Modal } from '../components/feedback';

export default function Videos() {
  useSeo({
    title: 'Videos',
    description: 'The Thrive Pakistan video channel — announcement films, keynotes, panels, workshops, event highlights and community stories.',
  });

  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'all';
  const event = params.get('event') ?? 'all';
  const [query, setQuery] = useState(params.get('q') ?? '');
  const debounced = useDebouncedValue(query, 250);

  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [featured, setFeatured] = useState<VideoItem | null>(null);
  const [preview, setPreview] = useState<VideoItem | null>(null);

  const filters = useMemo(() => ({ category, event, query: debounced }), [category, event, debounced]);

  useEffect(() => {
    let alive = true;
    setVideos(null);
    videosService.list(filters).then((list) => alive && setVideos(list));
    return () => {
      alive = false;
    };
  }, [filters]);

  useEffect(() => {
    let alive = true;
    videosService.featured().then((v) => alive && setFeatured(v ?? null));
    return () => {
      alive = false;
    };
  }, []);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHero
        eyebrow="Video channel"
        title="Watch the ecosystem think out loud."
        lead="Keynotes, panels, workshops, highlight films and community stories — recorded at Thrive platforms across the country."
        crumbs={[{ label: 'Videos' }]}
        meta={[
          { icon: 'play', label: '10 published films & sessions' },
          { icon: 'eye', label: '170K+ total views' },
        ]}
      />

      <section className="section section--dark section--tight">
        <div className="container">
          {featured && (
            <Reveal>
              <div className="video-feature">
                <div className="video-feature__media">
                  <div className="video-feature__thumb" style={spriteStyle(featured.thumb)} role="img" aria-label={`Thumbnail: ${featured.title}`} />
                  <button type="button" className="video-feature__play" onClick={() => setPreview(featured)} aria-label={`Play featured video: ${featured.title}`}>
                    <Icon name="play" size={26} />
                  </button>
                </div>
                <div className="video-feature__body">
                  <span className="badge badge--neon">Featured</span>
                  <h3>{featured.title}</h3>
                  <p>{featured.description}</p>
                  <span className="video-feature__meta">
                    {featured.duration} · {formatViews(featured.views)} views · {formatDate(featured.date)}
                  </span>
                </div>
              </div>
            </Reveal>
          )}

          <div className="filter-bar filter-bar--dark" role="group" aria-label="Video filters">
            <div className="searchbar searchbar--dark" style={{ maxWidth: 420 }}>
              <span className="searchbar__icon"><Icon name="search" size={17} /></span>
              <input
                className="searchbar__input"
                type="search"
                placeholder="Search videos…"
                value={query}
                aria-label="Search videos"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setParam('q', e.target.value);
                }}
              />
            </div>
            <div className="filter-bar__chips">
              <button
                type="button"
                className={`chip ${category === 'all' ? 'chip--active' : ''}`}
                onClick={() => setParam('category', 'all')}
                aria-pressed={category === 'all'}
              >
                All categories
              </button>
              {VIDEO_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${category === c ? 'chip--active' : ''}`}
                  onClick={() => setParam('category', c)}
                  aria-pressed={category === c}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="filter-bar__selects">
              <select className="filter-select" value={event} onChange={(e) => setParam('event', e.target.value)} aria-label="Filter by event">
                <option value="all">All events</option>
                {EVENTS.filter((e) => e.slug).map((e) => (
                  <option key={e.slug} value={e.slug}>{e.title}</option>
                ))}
              </select>
            </div>
          </div>

          {videos === null ? (
            <div className="grid grid--3">
              {[0, 1, 2].map((i) => (
                <CardSkeleton key={i} dark />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <EmptyState
              title="No videos match your filters."
              message="Try another category or event — new films land after every flagship."
              actionLabel="Clear filters"
              onAction={() => setParams(new URLSearchParams(), { replace: true })}
              icon="play"
            />
          ) : (
            <div className="grid grid--3">
              {videos.map((v, i) => (
                <Reveal key={v.id} delay={(i % 3) * 80}>
                  <VideoCard video={v} onPlay={setPreview} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal open={preview !== null} onClose={() => setPreview(null)} label={preview ? `Video preview: ${preview.title}` : 'Video preview'} size="lg">
        {preview && (
          <>
            <div className="video-modal__thumb sprite" style={spriteStyle(preview.thumb)} role="img" aria-label={`Thumbnail: ${preview.title}`} />
            <div className="lightbox__cap">
              <strong>{preview.title}</strong>
              <span>{preview.category} · {preview.duration} · {formatViews(preview.views)} views</span>
            </div>
            <p className="video-modal__note">
              <Icon name="play" size={16} />
              Streaming placeholder: on the production deployment this card opens the hosted video player.
              No third-party videos are embedded on this prototype.
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
