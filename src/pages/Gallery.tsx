import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { galleryService } from '../services/galleryService';
import { useSeo } from '../hooks';
import type { GalleryCollection, GalleryItem } from '../types';
import { spriteStyle } from '../media';
import { PageHero } from '../components/page-hero';
import { GalleryTile } from '../components/cards';
import { Badge, Button, EmptyState, Reveal, Skeleton } from '../components/ui';
import { Modal } from '../components/feedback';

export default function Gallery() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  // Active collection slug can come from route `/gallery/:slug` or query parameter `?collection=slug`
  const activeSlug = slug || searchParams.get('collection') || null;

  const [collections, setCollections] = useState<GalleryCollection[] | null>(null);
  const [activeCollection, setActiveCollection] = useState<GalleryCollection | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useSeo({
    title: activeCollection ? `${activeCollection.title} · Gallery` : 'Central Gallery',
    description: activeCollection
      ? activeCollection.description
      : 'Thrive Pakistan central media archive: explore visual moments and photo collections across flagship platforms and convenings.',
  });

  useEffect(() => {
    let alive = true;
    galleryService.listCollections().then((list) => {
      if (!alive) return;
      setCollections(list);
      if (activeSlug) {
        const found = list.find((c) => c.slug === activeSlug);
        setActiveCollection(found ?? null);
      } else {
        setActiveCollection(null);
      }
    });
    return () => {
      alive = false;
    };
  }, [activeSlug]);

  const mediaItems: GalleryItem[] = activeCollection
    ? activeCollection.mediaItems.map((m) => ({
        id: m.id,
        image: m.image,
        caption: m.caption,
        category: activeCollection.title,
        eventSlug: activeCollection.slug,
      }))
    : [];

  const currentMedia = openIndex !== null && mediaItems[openIndex] ? mediaItems[openIndex] : null;

  const step = (dir: 1 | -1) => {
    if (openIndex === null || mediaItems.length === 0) return;
    setOpenIndex((openIndex + dir + mediaItems.length) % mediaItems.length);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, mediaItems]);

  const selectCollection = (colSlug: string) => {
    navigate(`/gallery?collection=${colSlug}`);
  };

  const clearSelection = () => {
    navigate('/gallery');
  };

  return (
    <>
      <PageHero
        eyebrow={activeCollection ? 'Gallery Collection' : 'Central Main Gallery'}
        title={activeCollection ? activeCollection.title : 'Platform Media Archive'}
        lead={
          activeCollection
            ? activeCollection.description
            : 'Explore visual moments and verified photo collections across Thrive Pakistan flagship platforms, tech festivals, and community convenings.'
        }
        meta={[
          {
            icon: 'eye',
            label: activeCollection
              ? `${activeCollection.mediaItems.length} photos`
              : collections === null
              ? 'Loading collections…'
              : `${collections.length} media collections`,
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          {/* Active collection view header with back button */}
          {activeCollection ? (
            <div className="listing-head" style={{ marginBottom: 28 }}>
              <Button variant="outline" size="sm" iconLeft="chevron-left" onClick={clearSelection}>
                All Gallery Collections
              </Button>
              <span className="listing-count">
                Showing {activeCollection.mediaItems.length} photos in {activeCollection.title}
              </span>
            </div>
          ) : (
            <div className="listing-head" style={{ marginBottom: 28 }}>
              <p className="listing-count" role="status">
                {collections === null
                  ? 'Loading gallery collections…'
                  : `${collections.length} verified gallery collections available`}
              </p>
            </div>
          )}

          {/* Collection Detail View: Photo Grid */}
          {activeCollection ? (
            mediaItems.length === 0 ? (
              <EmptyState
                title="No images in this collection yet."
                message="Photos are added as event media is processed by our communications team."
                actionLabel="All collections"
                onAction={clearSelection}
                icon="eye"
              />
            ) : (
              <div className="gallery-grid">
                {mediaItems.map((g, i) => (
                  <GalleryTile
                    key={g.id}
                    item={g}
                    onOpen={() => setOpenIndex(i)}
                    wide={i % 5 === 0}
                    tall={i % 7 === 3}
                  />
                ))}
              </div>
            )
          ) : /* All Collections Grid */
          collections === null ? (
            <div className="grid grid--3">
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ height: 260, borderRadius: 'var(--r-xl)' }}>
                  <Skeleton className="skeleton-card__media" />
                </div>
              ))}
            </div>
          ) : collections.length === 0 ? (
            <EmptyState
              title="No gallery collections available yet."
              message="New photo collections will appear as upcoming platforms are delivered."
              icon="eye"
            />
          ) : (
            <div className="grid grid--3" style={{ gap: '24px' }}>
              {collections.map((col, i) => (
                <Reveal key={col.id} delay={i * 80}>
                  <article className="event-block" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16 / 10',
                        borderRadius: 'var(--r-md)',
                        overflow: 'hidden',
                        backgroundColor: 'var(--dark-3)',
                      }}
                    >
                      <div className="sprite" style={{ ...spriteStyle(col.coverImage), position: 'absolute', inset: 0 }} aria-hidden="true" />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, transparent 40%, rgba(10,11,11,0.85))',
                        }}
                      />
                      <span style={{ position: 'absolute', top: 12, right: 12 }}>
                        <Badge tone="green">{col.mediaItems.length} photos</Badge>
                      </span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, color: 'var(--white)' }}>
                        {col.title}
                      </h3>
                      <p style={{ color: 'var(--muted-on-dark)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {col.description}
                      </p>
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                      <Button
                        variant="primary"
                        size="sm"
                        icon="arrow-right"
                        className="btn--block"
                        onClick={() => selectCollection(col.slug)}
                      >
                        View Gallery
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal open={currentMedia !== null} onClose={() => setOpenIndex(null)} label="Gallery lightbox" size="lg">
        {currentMedia && (
          <>
            <div
              className="lightbox__img sprite"
              style={{ ...spriteStyle(currentMedia.image), backgroundColor: 'var(--dark-3)' }}
              role="img"
              aria-label={currentMedia.caption}
            />
            <div className="lightbox__cap">
              <strong>{currentMedia.caption}</strong>
              <span>{currentMedia.category}</span>
            </div>
            <div className="lightbox__nav">
              <Button variant="outline" size="sm" iconLeft="chevron-left" onClick={() => step(-1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" icon="chevron-right" onClick={() => step(1)}>
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
            <h2>Want your lens on our stages?</h2>
            <p style={{ marginTop: 10 }}>The media volunteer team shoots every flagship, so join as a photographer.</p>
            <div className="cta-band__ctas">
              <Button to="/volunteer" icon="arrow-right">
                Volunteer with media
              </Button>
              <Button to="/videos" variant="outline-light">
                Watch the films
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
