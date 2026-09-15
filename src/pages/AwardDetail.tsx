import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { awardsService } from '../services/awardsService';
import { useSeo } from '../hooks';
import type { Award, AwardWinner } from '../types';
import { PageHero } from '../components/page-hero';
import { AwardWinnerCard } from '../components/cards';
import { Badge, Button, EmptyState, Icon, Reveal, SectionHeader, Skeleton } from '../components/ui';
import { AWARDS_PAGE_CONFIG } from '../data/awardsPage';
import { NominationModal } from '../components/nomination-modal';

export default function AwardDetail() {
  const { slug = '' } = useParams();
  const [award, setAward] = useState<Award | null | undefined>(undefined);
  const [winners, setWinners] = useState<AwardWinner[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [nominateOpen, setNominateOpen] = useState(false);

  const cfg = AWARDS_PAGE_CONFIG;

  useSeo({
    title: award ? `${award.title} · Awards` : 'Award Details',
    description: award?.description,
  });

  useEffect(() => {
    let alive = true;
    setAward(undefined);
    awardsService.getAwardById(slug).then(async (found) => {
      if (!alive) return;
      setAward(found ?? null);
      if (!found) return;

      const [wns, yrs] = await Promise.all([
        awardsService.getWinnersForAward(found.id, selectedYear),
        awardsService.getYearsForAward(found.id),
      ]);
      if (!alive) return;
      setWinners(wns);
      setYears(yrs);
    });
    return () => {
      alive = false;
    };
  }, [slug, selectedYear]);

  if (award === undefined) {
    return (
      <>
        <PageHero title="Loading award details…" crumbs={[{ label: 'Awards', to: '/awards' }, { label: '…' }]} />
        <section className="section">
          <div className="container grid grid--2">
            <Skeleton className="skeleton-card__media" />
            <Skeleton className="skeleton-card__media" />
          </div>
        </section>
      </>
    );
  }

  if (award === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title={cfg.emptyStates.noAwards.title}
            message={cfg.emptyStates.noAwards.message}
            icon="spark"
          />
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/awards" className="btn btn--primary">{cfg.cardLabels.allAwards}</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        image={award.coverImage}
        crumbs={[{ label: 'Awards', to: '/awards' }, { label: award.title }]}
        eyebrow={cfg.hero.eyebrow}
        title={award.title}
        lead={award.description}
        meta={[
          { icon: 'spark', label: cfg.hero.title },
          ...(award.status ? [{ icon: 'check' as const, label: award.status }] : []),
        ]}
      />

      <section className="section section--tight">
        <div className="container" style={{ display: 'grid', gap: 36 }}>
          {/* Header Action / Back Link */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Button to="/awards" variant="outline" size="sm" iconLeft="chevron-left">
              {cfg.cardLabels.allAwards}
            </Button>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Button size="sm" variant="primary" icon="send" onClick={() => setNominateOpen(true)}>
                Nominate for this Award
              </Button>
              {award.status && <Badge tone="green">{award.status}</Badge>}
            </div>
          </div>

          {/* About Award Section */}
          <div
            className="event-block"
            style={{
              background: 'var(--dark-2)',
              border: '1px solid var(--border-dark)',
              borderRadius: 'var(--r-lg)',
              padding: '28px clamp(20px, 4vw, 36px)',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
              {award.aboutHeading || cfg.sections.aboutHeadingDefault}
            </h2>
            {Array.isArray(award.aboutDescription) ? (
              award.aboutDescription.map((p, i) => (
                <p key={i} style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: i < award.aboutDescription.length - 1 ? 12 : 0 }}>
                  {p}
                </p>
              ))
            ) : (
              <p style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65 }}>
                {award.aboutDescription}
              </p>
            )}
          </div>

          {/* Eligibility Section */}
          <div
            className="event-block"
            style={{
              background: 'var(--dark-2)',
              border: '1px solid var(--border-dark)',
              borderRadius: 'var(--r-lg)',
              padding: '28px clamp(20px, 4vw, 36px)',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
              {award.eligibility.heading || cfg.sections.eligibilityHeadingDefault}
            </h2>
            <p style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: 16 }}>
              {award.eligibility.description}
            </p>
            {award.eligibility.criteria && award.eligibility.criteria.length > 0 && (
              <ul className="highlights-list">
                {award.eligibility.criteria.map((item, idx) => (
                  <li key={idx}>
                    <Icon name="check" size={18} /> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Highlights / Award Criteria */}
          {award.highlights && award.highlights.length > 0 && (
            <div
              className="event-block"
              style={{
                background: 'var(--dark-2)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--r-lg)',
                padding: '28px clamp(20px, 4vw, 36px)',
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
                {cfg.sections.highlightsHeadingDefault}
              </h2>
              <ul className="highlights-list">
                {award.highlights.map((item, idx) => (
                  <li key={idx}>
                    <Icon name="spark" size={18} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Award Winners Section */}
          <div>
            <SectionHeader
              title={cfg.sections.winnersHeadingDefault}
              lead="Celebrating individuals recognized for exemplary contributions."
            />

            {/* Year Filter Tabs if multiple years exist */}
            {years.length > 1 && (
              <div className="tabs" role="tablist" style={{ marginBottom: 24 }}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedYear === 'all'}
                  className={`tab ${selectedYear === 'all' ? 'tab--active' : ''}`}
                  onClick={() => setSelectedYear('all')}
                >
                  {cfg.filters.allYears}
                </button>
                {years.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    role="tab"
                    aria-selected={selectedYear === yr}
                    className={`tab ${selectedYear === yr ? 'tab--active' : ''}`}
                    onClick={() => setSelectedYear(yr)}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}

            {winners.length === 0 ? (
              <EmptyState
                title={cfg.emptyStates.noWinners.title}
                message={cfg.emptyStates.noWinners.message}
                icon="spark"
              />
            ) : (
              <div className="grid grid--3" style={{ gap: '24px' }}>
                {winners.map((winner, i) => (
                  <Reveal key={winner.id} delay={i * 80}>
                    <AwardWinnerCard winner={winner} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <NominationModal
        open={nominateOpen}
        onClose={() => setNominateOpen(false)}
        defaultAwardSlug={award.slug}
      />
    </>
  );
}
