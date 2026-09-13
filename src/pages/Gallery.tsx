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

function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : url;
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
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
  const [typeFilter, setTypeFilter] = useState<'all' | 'event_gallery' | 'random_clicks'>('all');
  const [mediaTab, setMediaTab] = useState<'all' | 'images' | 'videos'>('all');
  const [openMediaIndex, setOpenIndex] = useState<number | null>(null);

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
          if (typeFilter === 'event_gallery') return col.type === 'event_gallery';
          if (typeFilter === 'random_clicks') return col.type === 'random_clicks';
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
              {typeof activeCollection === 'object' && associatedEvent && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)' }}>
                    {cfg.cardLabels.associatedEvent}: <strong>{associatedEvent.title}</strong>
                  </span>
                  <Button to={`/events/${associatedEvent.slug}`} variant="green-ghost" size="sm" icon="arrow-right">
                    {cfg.cardLabels.viewEvent}
                  </Button>
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
                  className={`chip ${typeFilter === 'event_gallery' ? 'chip--active' : ''}`}
                  onClick={() => setTypeFilter('event_gallery')}
                >
                  {cfg.filters.eventGalleries}
                </button>
                <button
                  type="button"
                  className={`chip ${typeFilter === 'random_clicks' ? 'chip--active' : ''}`}
                  onClick={() => setTypeFilter('random_clicks')}
                >
                  {cfg.filters.randomClicks}
                </button>
              </div>
            </div>
          )}

          {/* View Mode 1: Collection Not Found or Empty Event Gallery */}
          {activeCollection === 'not_found' ? (
            <EmptyState
              title={cfg.emptyStates.notFound.title}
              message={cfg.emptyStates.notFound.message}
              actionLabel={cfg.emptyStates.notFound.actionLabel}
              onAction={clearSelection}
              icon="search"
            />
          ) : typeof activeCollection === 'object' && activeCollection ? (
            /* View Mode 2: Collection Media Grid */
            <div>
              {/* Media type tabs if collection has both images and videos */}
              {activeCollection.mediaItems && activeCollection.mediaItems.length > 0 && (
                <div className="tabs" role="tablist" style={{ marginBottom: 24 }}>
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
                  {activeMediaList.map((m, i) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`gallery-tile ${i % 5 === 0 ? 'gallery-tile--wide' : ''} ${i % 7 === 3 ? 'gallery-tile--tall' : ''}`.trim()}
                      onClick={() => setOpenIndex(i)}
                      aria-label={`Open media: ${m.title}`}
                    >
                      {m.image ? (
                        <div className="gallery-tile__img sprite" style={{ ...spriteStyle(m.image), position: 'absolute', inset: 0 }} />
                      ) : m.imageSource ? (
                        <img src={m.imageSource} alt={m.title} className="gallery-tile__img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--dark-3)' }} />
                      )}
                      <span className="gallery-tile__overlay">
                        {m.type === 'video' ? (
                          <span style={{ marginBottom: 4 }}>
                            <Badge tone="neon">Video Film</Badge>
                          </span>
                        ) : (
                          <span style={{ marginBottom: 4 }}>
                            <Badge tone="green">Photo</Badge>
                          </span>
                        )}
                        <span className="gallery-tile__cap">{m.title}</span>
                      </span>
                    </button>
                  ))}
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

      {/* Lightbox / Video Player Modal */}
      <Modal open={currentMedia !== null} onClose={() => setOpenIndex(null)} label="Media preview" size="lg">
        {currentMedia && (
          <>
            {currentMedia.type === 'video' && currentMedia.youtubeUrl ? (
              <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', borderRadius: 'var(--r-md)', overflow: 'hidden', backgroundColor: '#000' }}>
                <iframe
                  src={getYouTubeEmbedUrl(currentMedia.youtubeUrl)}
                  title={currentMedia.title}
                  style={{ width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : currentMedia.image ? (
              <div
                className="lightbox__img sprite"
                style={{ ...spriteStyle(currentMedia.image), backgroundColor: 'var(--dark-3)' }}
                role="img"
                aria-label={currentMedia.title}
              />
            ) : (
              <img src={currentMedia.imageSource} alt={currentMedia.title} className="lightbox__img" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
            )}

            <div className="lightbox__cap">
              <strong>{currentMedia.title}</strong>
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
