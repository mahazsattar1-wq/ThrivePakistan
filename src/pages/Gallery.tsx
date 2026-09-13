import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { galleryService } from '../services/galleryService';
import { eventsService } from '../services/eventsService';
import { useSeo } from '../hooks';
import type { GalleryCollection, GalleryMediaItem, ThriveEvent } from '../types';
import { spriteStyle } from '../media';
import { PageHero } from '../components/page-hero';
import { GalleryCollectionCard } from '../components/cards';
import { Badge, Button, EmptyState, Reveal, Skeleton } from '../components/ui';
import { Modal } from '../components/feedback';
import { GALLERY_PAGE_CONFIG } from '../data/galleryPage';

/** Derive YouTube thumbnail URL if a valid YouTube URL exists; otherwise returns null. */
export function getYouTubeThumbnailUrl(youtubeUrl?: string | null): string | null {
  if (!youtubeUrl) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = youtubeUrl.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}

export default function Gallery() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  // Active identifier can come from path `/gallery/:slug` or query parameter `?collection=slug`
  const activeIdentifier = slug || searchParams.get('collection') || null;

  const [collections, setCollections] = useState<GalleryCollection[] | null>(null);
  const [activeCollection, setActiveCollection] = useState<GalleryCollection | null | 'not_found'>(null);
  const [associatedEvent, setAssociatedEvent] = useState<ThriveEvent | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'event' | 'random'>('all');
  const [mediaTab, setMediaTab] = useState<'all' | 'images' | 'videos'>('all');
  const [openMediaIndex, setOpenIndex] = useState<number | null>(null);
  const [thumbnailErrors, setThumbnailErrors] = useState<Record<string, boolean>>({});

  const cfg = GALLERY_PAGE_CONFIG;

  useSeo({
    title:
      typeof activeCollection === 'object' && activeCollection
        ? `${activeCollection.title} · Central Gallery`
        : cfg.hero.title,
    description:
      typeof activeCollection === 'object' && activeCollection
        ? activeCollection.description
        : cfg.hero.lead,
  });

  useEffect(() => {
    let alive = true;
    galleryService.listCollections().then(async (list) => {
      if (!alive) return;
      setCollections(list);

      if (activeIdentifier) {
        const found = await galleryService.getCollectionById(activeIdentifier);
        if (!alive) return;
        if (found) {
          setActiveCollection(found);
          if (found.eventId) {
            const ev = await eventsService.getById(found.eventId);
            if (alive) setAssociatedEvent(ev ?? null);
          } else {
            setAssociatedEvent(null);
          }
        } else {
          setActiveCollection('not_found');
          setAssociatedEvent(null);
        }
      } else {
        setActiveCollection(null);
        setAssociatedEvent(null);
      }
    });
    return () => {
      alive = false;
    };
  }, [activeIdentifier]);

  const activeMediaList: GalleryMediaItem[] =
    typeof activeCollection === 'object' && activeCollection && activeCollection.mediaItems
      ? activeCollection.mediaItems.filter((m) => {
          if (mediaTab === 'images') return m.type === 'image';
          if (mediaTab === 'videos') return m.type === 'video';
          return true;
        })
      : [];

  const currentMedia =
    openMediaIndex !== null && activeMediaList[openMediaIndex] ? activeMediaList[openMediaIndex] : null;

  const handleMediaClick = (m: GalleryMediaItem, index: number) => {
    // Rule: When a real YouTube URL is present, open YouTube directly in a new tab.
    if (m.type === 'video' && m.youtubeUrl) {
      window.open(m.youtubeUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    // For images or mock videos (youtubeUrl is null/empty), open preview modal.
    setOpenIndex(index);
  };

  const stepMedia = (dir: 1 | -1) => {
    if (openMediaIndex === null || activeMediaList.length === 0) return;
    setOpenIndex((openMediaIndex + dir + activeMediaList.length) % activeMediaList.length);
  };

  useEffect(() => {
    if (openMediaIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepMedia(1);
      if (e.key === 'ArrowLeft') stepMedia(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMediaIndex, activeMediaList]);

  const clearSelection = () => {
    navigate('/gallery');
  };

  const filteredCollections =
    collections === null
      ? null
      : collections.filter((col) => {
          if (typeFilter === 'event') return col.type === 'event' || col.type === 'event_gallery';
          if (typeFilter === 'random') return col.type === 'random' || col.type === 'random_clicks';
          return true;
        });

  return (
    <>
      <PageHero
        eyebrow={activeCollection && activeCollection !== 'not_found' ? cfg.hero.collectionEyebrow : cfg.hero.eyebrow}
        title={
          typeof activeCollection === 'object' && activeCollection
            ? activeCollection.title
            : activeCollection === 'not_found'
            ? cfg.emptyStates.notFound.title
            : cfg.hero.title
        }
        lead={
          typeof activeCollection === 'object' && activeCollection
            ? activeCollection.description
            : activeCollection === 'not_found'
            ? cfg.emptyStates.notFound.message
            : cfg.hero.lead
        }
        meta={[
          {
            icon: 'eye',
            label:
              typeof activeCollection === 'object' && activeCollection
                ? cfg.cardLabels.itemsCount(activeCollection.mediaItems?.length ?? 0)
                : collections === null
                ? 'Loading collections…'
                : cfg.cardLabels.itemsCount(collections.length),
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          {/* Back button or Filter chips */}
          {activeCollection ? (
            <div className="listing-head" style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Button variant="outline" size="sm" iconLeft="chevron-left" onClick={clearSelection}>
                {cfg.cardLabels.allCollections}
              </Button>
              {typeof activeCollection === 'object' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <Badge tone={activeCollection.type === 'event' || activeCollection.type === 'event_gallery' ? 'green' : 'neon'}>
                    {activeCollection.type === 'event' || activeCollection.type === 'event_gallery' ? cfg.badges.eventGallery : cfg.badges.randomGallery}
                  </Badge>
                  {associatedEvent && (
                    <span style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      {cfg.cardLabels.associatedEvent}: <strong>{associatedEvent.title}</strong>
                      <Button to={`/events/${associatedEvent.slug}`} variant="green-ghost" size="sm" icon="arrow-right">
                        {cfg.cardLabels.viewEvent}
                      </Button>
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="filter-bar filter-bar--dark" style={{ marginBottom: 32 }}>
              <div className="filter-bar__chips" role="group" aria-label="Filter gallery collections">
                <button
                  type="button"
                  className={`chip ${typeFilter === 'all' ? 'chip--active' : ''}`}
                  onClick={() => setTypeFilter('all')}
                >
                  {cfg.filters.all}
                </button>
                <button
                  type="button"
                  className={`chip ${typeFilter === 'event' ? 'chip--active' : ''}`}
                  onClick={() => setTypeFilter('event')}
                >
                  {cfg.filters.eventGalleries}
                </button>
                <button
                  type="button"
                  className={`chip ${typeFilter === 'random' ? 'chip--active' : ''}`}
                  onClick={() => setTypeFilter('random')}
                >
                  {cfg.filters.randomGalleries}
                </button>
              </div>
            </div>
          )}

          {/* View Mode 1: Collection Not Found */}
          {activeCollection === 'not_found' ? (
            <EmptyState
              title={cfg.emptyStates.notFound.title}
              message={cfg.emptyStates.notFound.message}
              actionLabel={cfg.emptyStates.notFound.actionLabel}
              onAction={clearSelection}
              icon="search"
            />
          ) : typeof activeCollection === 'object' && activeCollection ? (
            /* View Mode 2: Collection Detail View */
            <div style={{ display: 'grid', gap: 32 }}>
              {/* Gallery Specific About Section */}
              <div
                className="event-block"
                style={{
                  background: 'var(--dark-2)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--r-lg)',
                  padding: '24px 28px',
                }}
              >
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
                  {activeCollection.aboutHeading || 'About Gallery'}
                </h2>
                <p style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65 }}>
                  {activeCollection.aboutDescription || activeCollection.description}
                </p>
              </div>

              {/* Media type tabs if collection has both images and videos */}
              {activeCollection.mediaItems && activeCollection.mediaItems.length > 0 && (
                <div className="tabs" role="tablist" style={{ marginBottom: 8 }}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaTab === 'all'}
                    className={`tab ${mediaTab === 'all' ? 'tab--active' : ''}`}
                    onClick={() => setMediaTab('all')}
                  >
                    {cfg.badges.allMedia} ({activeCollection.mediaItems.length})
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaTab === 'images'}
                    className={`tab ${mediaTab === 'images' ? 'tab--active' : ''}`}
                    onClick={() => setMediaTab('images')}
                  >
                    {cfg.badges.photos} ({activeCollection.mediaItems.filter((m) => m.type === 'image').length})
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaTab === 'videos'}
                    className={`tab ${mediaTab === 'videos' ? 'tab--active' : ''}`}
                    onClick={() => setMediaTab('videos')}
                  >
                    {cfg.badges.videos} ({activeCollection.mediaItems.filter((m) => m.type === 'video').length})
                  </button>
                </div>
              )}

              {activeMediaList.length === 0 ? (
                <EmptyState
                  title={cfg.emptyStates.noMedia.title}
                  message={cfg.emptyStates.noMedia.message}
                  actionLabel={cfg.emptyStates.noMedia.actionLabel}
                  onAction={clearSelection}
                  icon="eye"
                />
              ) : (
                <div className="gallery-grid">
                  {activeMediaList.map((m, i) => {
                    const ytThumb = getYouTubeThumbnailUrl(m.youtubeUrl);
                    const useYtThumb = ytThumb && !thumbnailErrors[m.id];
                    const itemCaption = m.caption || m.title;

                    return (
                      <button
                        key={m.id}
                        type="button"
                        className={`gallery-tile ${i % 5 === 0 ? 'gallery-tile--wide' : ''} ${i % 7 === 3 ? 'gallery-tile--tall' : ''}`.trim()}
                        onClick={() => handleMediaClick(m, i)}
                        aria-label={m.type === 'video' ? `Preview video: ${itemCaption}` : `Open photo: ${itemCaption}`}
                      >
                        {useYtThumb ? (
                          <img
                            src={ytThumb}
                            alt={itemCaption}
                            className="gallery-tile__img"
                            onError={() => setThumbnailErrors((prev) => ({ ...prev, [m.id]: true }))}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : m.image ? (
                          <div className="gallery-tile__img sprite" style={{ ...spriteStyle(m.image), position: 'absolute', inset: 0 }} />
                        ) : typeof m.thumb === 'object' && m.thumb ? (
                          <div className="gallery-tile__img sprite" style={{ ...spriteStyle(m.thumb), position: 'absolute', inset: 0 }} />
                        ) : typeof m.thumb === 'string' ? (
                          <img src={m.thumb} alt={itemCaption} className="gallery-tile__img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : typeof m.thumbnailUrl === 'object' && m.thumbnailUrl ? (
                          <div className="gallery-tile__img sprite" style={{ ...spriteStyle(m.thumbnailUrl), position: 'absolute', inset: 0 }} />
                        ) : typeof m.thumbnailUrl === 'string' ? (
                          <img src={m.thumbnailUrl} alt={itemCaption} className="gallery-tile__img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : m.imageUrl || m.imageSource ? (
                          <img src={m.imageUrl || m.imageSource || ''} alt={itemCaption} className="gallery-tile__img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--dark-3)' }} />
                        )}

                        <span className="gallery-tile__overlay">
                          {m.type === 'video' ? (
                            <span style={{ marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <Badge tone="neon">▶ Video Film</Badge>
                            </span>
                          ) : (
                            <span style={{ marginBottom: 4 }}>
                              <Badge tone="green">Photo</Badge>
                            </span>
                          )}
                          <span className="gallery-tile__cap">{itemCaption}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : /* View Mode 3: All Collections Grid */
          filteredCollections === null ? (
            <div className="grid grid--3">
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ height: 260, borderRadius: 'var(--r-xl)' }}>
                  <Skeleton className="skeleton-card__media" />
                </div>
              ))}
            </div>
          ) : filteredCollections.length === 0 ? (
            <EmptyState
              title={cfg.emptyStates.noCollections.title}
              message={cfg.emptyStates.noCollections.message}
              icon="eye"
            />
          ) : (
            <div className="grid grid--3" style={{ gap: '24px' }}>
              {filteredCollections.map((col, i) => (
                <Reveal key={col.id} delay={i * 80}>
                  <GalleryCollectionCard collection={col} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Mock Video Preview Modal */}
      <Modal open={currentMedia !== null} onClose={() => setOpenIndex(null)} label="Media preview" size="lg">
        {currentMedia && (
          <>
            {currentMedia.type === 'video' ? (
              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', borderRadius: 'var(--r-md)', overflow: 'hidden', backgroundColor: 'var(--dark-3)' }}>
                  {typeof currentMedia.thumb === 'object' && currentMedia.thumb ? (
                    <div className="sprite" style={{ ...spriteStyle(currentMedia.thumb), position: 'absolute', inset: 0 }} />
                  ) : currentMedia.image ? (
                    <div className="sprite" style={{ ...spriteStyle(currentMedia.image), position: 'absolute', inset: 0 }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--dark-3)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,11,11,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-green)', color: 'var(--dark)', boxShadow: '0 8px 24px rgba(67,183,73,0.5)' }}>
                      ▶
                    </span>
                  </div>
                </div>

                <div>
                  <Badge tone="neon">{cfg.videoNotice.badge}</Badge>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: 8, color: 'var(--white)' }}>
                    {currentMedia.caption || currentMedia.title}
                  </h3>
                  <p style={{ color: 'var(--muted-on-dark)', fontSize: '0.92rem', marginTop: 6, lineHeight: 1.6 }}>
                    {currentMedia.description || cfg.videoNotice.message}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#9aa59e', marginTop: 10, fontStyle: 'italic' }}>
                    {cfg.videoNotice.message}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                  {currentMedia.youtubeUrl ? (
                    <Button
                      href={currentMedia.youtubeUrl}
                      variant="primary"
                      size="sm"
                      icon="external"
                    >
                      {cfg.videoNotice.watchBtn}
                    </Button>
                  ) : (
                    <Button variant="outline-light" size="sm" disabled>
                      {cfg.videoNotice.comingSoonBtn}
                    </Button>
                  )}
                </div>
              </div>
            ) : currentMedia.image ? (
              <div
                className="lightbox__img sprite"
                style={{ ...spriteStyle(currentMedia.image), backgroundColor: 'var(--dark-3)' }}
                role="img"
                aria-label={currentMedia.caption || currentMedia.title}
              />
            ) : (
              <img src={currentMedia.imageUrl || currentMedia.imageSource || ''} alt={currentMedia.caption || currentMedia.title} className="lightbox__img" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
            )}

            {currentMedia.type !== 'video' && (
              <>
                <div className="lightbox__cap">
                  <strong>{currentMedia.caption || currentMedia.title}</strong>
                  {currentMedia.description && <span>{currentMedia.description}</span>}
                </div>

                <div className="lightbox__nav">
                  <Button variant="outline" size="sm" iconLeft="chevron-left" onClick={() => stepMedia(-1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" icon="chevron-right" onClick={() => stepMedia(1)}>
                    Next
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Modal>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>{cfg.ctaBand.title}</h2>
            <p style={{ marginTop: 10 }}>{cfg.ctaBand.lead}</p>
            <div className="cta-band__ctas">
              <Button to={cfg.ctaBand.primaryLink} icon="arrow-right">
                {cfg.ctaBand.primaryBtn}
              </Button>
              <Button to={cfg.ctaBand.secondaryLink} variant="outline-light">
                {cfg.ctaBand.secondaryBtn}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
