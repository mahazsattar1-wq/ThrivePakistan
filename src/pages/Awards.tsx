import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { awardsService } from '../services/awardsService';
import { useSeo } from '../hooks';
import type { Award, AwardCategory } from '../types';
import { PageHero } from '../components/page-hero';
import { AwardCard } from '../components/cards';
import { Button, EmptyState, Reveal, Skeleton } from '../components/ui';
import { AWARDS_PAGE_CONFIG } from '../data/awardsPage';

export default function Awards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [categories, setCategories] = useState<AwardCategory[] | null>(null);
  const [awards, setAwards] = useState<Award[] | null>(null);

  const cfg = AWARDS_PAGE_CONFIG;

  useSeo({
    title: `${cfg.hero.title} · Recognition & Impact`,
    description: cfg.hero.lead,
  });

  useEffect(() => {
    let alive = true;
    Promise.all([
      awardsService.listCategories(),
      awardsService.listAwards(categoryParam),
    ]).then(([cats, awds]) => {
      if (!alive) return;
      setCategories(cats);
      setAwards(awds);
    });
    return () => {
      alive = false;
    };
  }, [categoryParam]);

  const selectCategory = (slug: string) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <>
      <PageHero
        eyebrow={cfg.hero.eyebrow}
        title={cfg.hero.title}
        lead={cfg.hero.lead}
        meta={[
          {
            icon: 'spark',
            label:
              awards === null
                ? 'Loading awards…'
                : `${awards.length} active award programs`,
          },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          {/* Category Filter Chips */}
          <div className="filter-bar filter-bar--dark" style={{ marginBottom: 32 }}>
            <div className="filter-bar__chips" role="group" aria-label="Filter awards by category">
              <button
                type="button"
                className={`chip ${categoryParam === 'all' ? 'chip--active' : ''}`}
                onClick={() => selectCategory('all')}
              >
                {cfg.filters.allCategories}
              </button>
              {categories &&
                categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`chip ${categoryParam === cat.slug || categoryParam === cat.id ? 'chip--active' : ''}`}
                    onClick={() => selectCategory(cat.slug)}
                  >
                    {cat.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Awards Grid */}
          {awards === null ? (
            <div className="grid grid--3">
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ height: 280, borderRadius: 'var(--r-xl)' }}>
                  <Skeleton className="skeleton-card__media" />
                </div>
              ))}
            </div>
          ) : awards.length === 0 ? (
            <EmptyState
              title={cfg.emptyStates.noAwards.title}
              message={cfg.emptyStates.noAwards.message}
              icon="spark"
            />
          ) : (
            <div className="grid grid--3" style={{ gap: '24px' }}>
              {awards.map((award, i) => (
                <Reveal key={award.id} delay={i * 80}>
                  <AwardCard award={award} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

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
