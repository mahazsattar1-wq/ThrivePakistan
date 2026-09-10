import { IMPACT_STATEMENTS, STRATEGIC_GOALS, TIMELINE, VALUES } from '../data/stats';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';

/**
 * IMPACT — qualitative statements and documented record only.
 * No invented statistics: the only published figures are the documented
 * Hazara Tech Fiesta 2025 outcomes.
 */
export default function Impact() {
  useSeo({
    title: 'Impact',
    description:
      'Thrive Pakistan impact — qualitative outcomes in connecting, learning, collaboration and opportunity, plus the documented record of Hazara Tech Fiesta 2025.',
  });

  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Access with structure."
        lead="We measure our work in opportunities created — people connected, capabilities built, collaborations formed — not in vanity numbers."
        crumbs={[{ label: 'Impact' }]}
        meta={[{ icon: 'shield', label: 'Published figures come from our documented record only' }]}
      />

      {/* Qualitative impact */}
      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--4">
            {IMPACT_STATEMENTS.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <div className="value-card impact-card">
                  <span className="value-card__icon"><Icon name={s.icon as IconName} size={20} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documented record */}
      <section className="section section--dark">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Documented record"
              title="Hazara Tech Fiesta 2025."
              lead="Our first documented large-scale platform — 12–14 December 2025 at Hazara University, Mansehra."
            />
          </Reveal>
          <div className="stats-band band--4">
            {[
              { v: '5,000+', l: 'Attendees' },
              { v: '50+', l: 'Speakers' },
              { v: '15+', l: 'Exhibitors' },
              { v: '24h', l: 'Hackathon' },
            ].map((f, i) => (
              <Reveal key={f.l} delay={i * 70}>
                <div className="stat stat--dark">
                  <span className="stat__value">{f.v}</span>
                  <span className="stat__label">{f.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p style={{ marginTop: 20, color: 'var(--muted-on-dark)', lineHeight: 1.7, textAlign: 'center' }}>
              The platform demonstrated the ability to coordinate students, academia, technology
              professionals, startups, government and industry within a single regional platform — and
              proved that a regional audience responds when credible, future-focused programming is
              brought closer to them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader center eyebrow="Our journey" title="How we got here." />
          </Reveal>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <Reveal key={`${t.year}-${t.title}`} delay={i * 80} className="timeline__item">
                <span className="timeline__year">{t.year}</span>
                <div className="timeline__card">
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader center eyebrow="Direction" title="What we are building toward." />
          </Reveal>
          <div className="grid grid--2">
            {STRATEGIC_GOALS.slice(0, 6).map((g, i) => (
              <Reveal key={g.id} delay={(i % 2) * 80}>
                <div className="event-block goal-card">
                  <span className="goal-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <p style={{ marginTop: 6, color: 'var(--muted-text)', lineHeight: 1.65 }}>{g.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader dark center eyebrow="Values" title="What we refuse to compromise." />
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 70}>
                <div className="value-card">
                  <span className="value-card__icon"><Icon name={v.icon as IconName} size={20} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
