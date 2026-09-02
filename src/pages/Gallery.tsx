import { useEffect, useState } from 'react';
import { GALLERY_CATEGORIES } from '../data/gallery';
import { galleryService } from '../services/galleryService';
import { useSeo } from '../hooks';
import type { GalleryItem } from '../types';
import { spriteStyle } from '../media';
import { PageHero } from '../components/page-hero';
import { GalleryTile } from '../components/cards';
import { Button, EmptyState, Reveal, Skeleton } from '../components/ui';
import { Modal } from '../components/feedback';

export default function Gallery() {
  useSeo({
    title: 'Gallery',
    description: 'Event gallery — moments from FutureX, leadership summits, university events, Women Thrive, workshops and community tours across Pakistan.',
  });

  const [category, setCategory] = useState('all');
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    setItems(null);
    galleryService.list(category).then((list) => alive && setItems(list));
    return () => {
      alive = false;
    };
  }, [category]);

  const current = openIndex !== null && items ? items[openIndex] : null;
  const step = (dir: 1 | -1) => {
    if (openIndex === null || !items) return;
    setOpenIndex((openIndex + dir + items.length) % items.length);
  };

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The moments behind the movement."
        lead="Stages, desks, expeditions and confetti — browse by event family. Click any frame for the lightbox."
        crumbs={[{ label: 'Gallery' }]}
        meta={[
          { icon: 'eye', label: '18 curated moments' },
          { icon: 'pin', label: '6 event families' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Gallery filters">
            <div className="filter-bar__chips">
              <button
                type="button"
                className={`chip ${category === 'all' ? 'chip--active' : ''}`}
                onClick={() => setCategory('all')}
                aria-pressed={category === 'all'}
              >
                All moments
              </button>
              {GALLERY_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${category === c ? 'chip--active' : ''}`}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {items === null ? (
            <div className="gallery-grid">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className={i % 5 === 0 ? 'gallery-tile gallery-tile--wide' : 'gallery-tile'} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="No images in this category yet."
              message="Our media team uploads after every event — try another category."
              actionLabel="Show all moments"
              onAction={() => setCategory('all')}
              icon="eye"
            />
          ) : (
            <div className="gallery-grid">
              {items.map((g, i) => (
                <GalleryTile key={g.id} item={g} onOpen={() => setOpenIndex(i)} wide={i % 5 === 0} tall={i % 7 === 3} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal open={current !== null} onClose={() => setOpenIndex(null)} label="Gallery lightbox" size="lg">
        {current && (
          <>
            <div className="lightbox__img sprite" style={spriteStyle(current.image)} role="img" aria-label={current.caption} />
            <div className="lightbox__cap">
              <strong>{current.caption}</strong>
              <span>{current.category}</span>
            </div>
            <div className="lightbox__nav">
              <Button variant="outline" size="sm" iconLeft="chevron-left" onClick={() => step(-1)}>Previous</Button>
              <Button variant="outline" size="sm" icon="chevron-right" onClick={() => step(1)}>Next</Button>
            </div>
          </>
        )}
      </Modal>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Want your lens on our stages?</h2>
            <p style={{ marginTop: 10 }}>The media volunteer team shoots every flagship — join as a photographer.</p>
            <div className="cta-band__ctas">
              <Button to="/volunteer" icon="arrow-right">Volunteer with media</Button>
              <Button to="/videos" variant="outline-light">Watch the films</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
