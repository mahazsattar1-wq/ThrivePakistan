import { COLLABORATION_VALUES, ENGAGEMENT_MODELS } from '../data/partners';
import { PRIOR_ECOSYSTEM_NAMES, PRIOR_ECOSYSTEM_NOTE } from '../data/org';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { Button, Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';

export default function Partners() {
  useSeo({
    title: 'Partners & Collaboration',
    description:
      'Thrive Pakistan works to develop collaboration across educational institutions, industry, government, technology practitioners, founders and community organizations.',
  });

  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Built through collaboration."
        lead="Partnership with Thrive Pakistan means co-building access — not attaching a name to an activity after the important decisions are made."
        crumbs={[{ label: 'Partners' }]}
        meta={[
          { icon: 'handshake', label: 'Institutions · Industry · Government · Communities' },
          { icon: 'shield', label: 'Purposeful activation, not logo placement' },
        ]}
      />

      {/* Why collaborate */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Why collaborate"
              title="What partnership creates."
              lead="Thrive Pakistan has no partner logo wall to show yet — because we only display collaborations that are real. Here is what working together is designed to produce."
            />
          </Reveal>
          <div className="grid grid--4">
            {COLLABORATION_VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="value-card" style={{ height: '100%' }}>
                  <span className="value-card__icon"><Icon name={v.icon as IconName} size={20} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to engage */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Ways to engage"
              title="Where organizations plug in."
              lead="Engagement models shaped by the focus areas of our platforms — each collaboration is scoped around a meaningful role and outcome."
            />
          </Reveal>
          <div className="grid grid--3">
            {ENGAGEMENT_MODELS.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 80}>
                <article className="event-block" style={{ height: '100%' }}>
                  <h3>{m.name}</h3>
                  <p style={{ marginTop: 8, color: 'var(--muted-on-dark)', lineHeight: 1.65 }}>{m.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prior engagement */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Previous ecosystem engagement"
              title="Organizations we have worked alongside."
              lead="Participation, collaboration or support named in our organizational record from Hazara Tech Fiesta 2025 and related work."
            />
          </Reveal>
          <Reveal delay={90}>
            <ul className="track-chips" style={{ justifyContent: 'center', marginTop: 8 }}>
              {PRIOR_ECOSYSTEM_NAMES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={130}>
            <p style={{ marginTop: 18, fontSize: '0.8rem', color: 'var(--muted-text)', textAlign: 'center' }}>
              {PRIOR_ECOSYSTEM_NOTE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Explore partnership opportunities.</h2>
            <p style={{ marginTop: 10 }}>
              Educational institutions, companies, public departments, media and community organizations —
              tell us what you want to build, and we will scope a meaningful role together.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Become a Partner</Button>
              <Button href="mailto:partnerships@thrivepakistan.com" variant="outline-light">Email the Partnerships Team</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
