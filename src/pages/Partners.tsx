import { useEffect, useState } from 'react';
import { PARTNER_CATEGORIES } from '../data/partners';
import { useSeo } from '../hooks';
import type { Partner } from '../types';
import { partnersService } from '../services/partnersService';
import { PageHero } from '../components/page-hero';
import { Button, PartnerMark, Reveal } from '../components/ui';

export default function Partners() {
  useSeo({
    title: 'Partners & Sponsors',
    description: 'The organizations powering Thrive Pakistan platforms — technology, education, media, corporate and community partners. (Mock brands on this prototype.)',
  });

  const [category, setCategory] = useState('all');
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    let alive = true;
    setPartners(null);
    partnersService.list(category).then((p) => alive && setPartners(p));
    return () => {
      alive = false;
    };
  }, [category]);

  return (
    <>
      <PageHero
        eyebrow="Partners & sponsors"
        title="The ecosystem backs the ecosystem."
        lead="Technology, education, media, corporate and community organizations co-build every Thrive platform. (All partner brands here are fictional mock data.)"
        crumbs={[{ label: 'Partners' }]}
        meta={[
          { icon: 'handshake', label: '30+ partner organizations' },
          { icon: 'trend', label: '3 partnership tiers' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Partner categories">
            <div className="filter-bar__chips">
              <button
                type="button"
                className={`chip ${category === 'all' ? 'chip--active' : ''}`}
                onClick={() => setCategory('all')}
                aria-pressed={category === 'all'}
              >
                All partners
              </button>
              {PARTNER_CATEGORIES.map((c) => (
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

          <div className="partner-grid">
            {(partners ?? []).map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <div className="partner-tile">
                  <PartnerMark partner={p} index={i} />
                  <span className="partner-tile__cat">{p.category}</span>
                  <span className="partner-tile__tier">{p.tier}</span>
                  <span className="partner-tile__blurb">{p.blurb}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Your organization belongs on this wall.</h2>
            <p style={{ marginTop: 10 }}>
              Explore what partnership includes — visibility, talent, thought leadership and measurable impact.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Become a Strategic Partner</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
