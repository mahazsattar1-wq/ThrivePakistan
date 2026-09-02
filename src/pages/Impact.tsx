import { STATS, TESTIMONIALS, TIMELINE, VALUES } from '../data/stats';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { StatCounter, Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';
import { TestimonialCard } from '../components/cards';

const AWARDS = [
  { icon: 'trophy' as IconName, title: 'National Youth Platform Recognition (mock)', desc: 'Illustrative recognition entry — placeholder for verified achievements in the production system.' },
  { icon: 'star' as IconName, title: 'Best Community Event Series (mock)', desc: 'Placeholder award slot demonstrating the achievements module of the impact page.' },
  { icon: 'badge' as IconName, title: 'Excellence in University Engagement (mock)', desc: 'Placeholder award slot demonstrating the achievements module of the impact page.' },
];

export default function Impact() {
  useSeo({
    title: 'Impact & Achievements',
    description: 'Thrive Pakistan impact: events produced, participants reached, speakers hosted, partners engaged, universities activated and cities covered — plus our journey and values.',
  });

  return (
    <>
      <PageHero
        eyebrow="Impact & achievements"
        title="Measured in people, not press releases."
        lead="The numbers below are frontend mock figures for the prototype; the production dashboard will publish verified impact data."
        crumbs={[{ label: 'Impact' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="stats-band">
            {STATS.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <StatCounter stat={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader dark center eyebrow="Our journey" title="Five years, one direction." />
          </Reveal>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 80} className="timeline__item">
                <span className="timeline__year">{t.year}</span>
                <div className="timeline__card">
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 22, fontSize: '0.8rem', color: 'var(--muted-on-dark)', textAlign: 'center' }}>
            Timeline entries are illustrative frontend content, not verified organizational history.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader center eyebrow="Recognition" title="Achievements module." />
          </Reveal>
          <ul className="award-list">
            {AWARDS.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 80}>
                <span className="award-list__icon"><Icon name={a.icon} size={22} /></span>
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader dark center eyebrow="Values" title="What we refuse to compromise." />
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 70}>
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

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader center eyebrow="Community voices" title="Impact, in their words." />
          </Reveal>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 80}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
