import { STRATEGIC_GOALS, TIMELINE, VALUES } from '../data/stats';
import { PROGRAMS } from '../data/programs';
import { ORG } from '../data/org';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { ProgramCard } from '../components/cards';
import { Button, Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';

export default function About() {
  useSeo({
    title: 'About',
    description:
      'Thrive Pakistan is a youth-led technology and ecosystem-development platform based in Hazara, Khyber Pakhtunkhwa — founded in 2025 to connect regional youth with technology, industry, entrepreneurship and opportunity.',
  });

  return (
    <>
      <PageHero
        eyebrow="About Thrive Pakistan"
        title="Talent exists everywhere. Opportunity does not."
        lead={ORG.description}
        crumbs={[{ label: 'About' }]}
        meta={[
          { icon: 'spark', label: `Youth-led platform · Founded ${ORG.founded}` },
          { icon: 'pin', label: 'Based in Hazara, Khyber Pakhtunkhwa' },
          { icon: 'globe', label: 'Regional roots, national outlook' },
        ]}
      />

      {/* Identity */}
      <section className="section section--tight">
        <div className="container">
          <div className="mission-grid">
            <Reveal>
              <div className="mission-card mission-card--dark">
                <span className="eyebrow">Our vision</span>
                <p>{ORG.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mission-card mission-card--green">
                <span className="eyebrow">Our mission</span>
                <p>{ORG.mission}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="event-block" style={{ marginTop: 24 }}>
              <span className="eyebrow">Our purpose</span>
              <p style={{ marginTop: 10, lineHeight: 1.7 }}>
                {ORG.purpose} Our core promise: <strong>{ORG.corePromise}</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Origin */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Why we exist"
              title="The problem we were created to solve."
              lead={ORG.whyWeExist}
            />
          </Reveal>
          <div className="grid grid--2">
            <Reveal>
              <div className="event-block">
                <h3>The distance we work to close</h3>
                <ul className="highlights-list">
                  <li><Icon name="eye" size={16} /> <strong>Exposure gap</strong> — limited direct contact with founders, technologists, employers, investors and policymakers</li>
                  <li><Icon name="tools" size={16} /> <strong>Skills gap</strong> — academic learning not matched by practical experience in AI, software, digital work and entrepreneurship</li>
                  <li><Icon name="users" size={16} /> <strong>Network gap</strong> — fewer professional relationships through which information and opportunity travel</li>
                  <li><Icon name="spark" size={16} /> <strong>Confidence gap</strong> — ability without a stage on which to test, present and defend ideas</li>
                  <li><Icon name="campus" size={16} /> <strong>Institutional gap</strong> — universities, companies and public departments without a sustained collaboration mechanism</li>
                  <li><Icon name="clock" size={16} /> <strong>Continuity gap</strong> — one-off seminars create moments; ecosystems require repeated contact and follow-up</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="event-block">
                <h3>What makes us different</h3>
                <ul className="highlights-list">
                  <li><Icon name="pin" size={16} /> Regional ownership — designed with local institutions, not copied in from outside</li>
                  <li><Icon name="spark" size={16} /> Youth leadership, professionally accountable</li>
                  <li><Icon name="chip" size={16} /> Technology-first programming</li>
                  <li><Icon name="handshake" size={16} /> Academia–industry connection</li>
                  <li><Icon name="target" size={16} /> Measurable execution with accountable ownership</li>
                </ul>
                <p style={{ marginTop: 16, color: 'var(--muted-text)', lineHeight: 1.7 }}>
                  Thrive Pakistan was not created to bring “motivation” to young people. It was created to
                  bring them closer to real people, real systems and real opportunity.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Strategic goals */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Strategic goals"
              title="What we are working toward."
              lead="The goal is not to host more events — it is to make regional opportunity more normal, visible and repeatable."
            />
          </Reveal>
          <div className="grid grid--2">
            {STRATEGIC_GOALS.map((g, i) => (
              <Reveal key={g.id} delay={(i % 2) * 80}>
                <div className="event-block goal-card">
                  <span className="goal-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <p style={{ marginTop: 6, color: 'var(--muted-on-dark)', lineHeight: 1.65 }}>{g.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="What we do"
              title="Our focus areas."
              action={<Button to="/programs" variant="ghost" icon="arrow-right">All focus areas</Button>}
            />
          </Reveal>
          <div className="grid grid--3">
            {PROGRAMS.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 70}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section section--light">
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

      {/* Principles */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader center eyebrow="Working principles" title="How we work." />
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 60}>
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

      {/* CTA */}
      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Meet the people behind the platform.</h2>
            <p style={{ marginTop: 10 }}>
              A youth-led team with defined executive ownership, reporting and documentation.
            </p>
            <div className="cta-band__ctas">
              <Button to="/team" icon="arrow-right">Meet the team</Button>
              <Button to="/futurex" variant="outline-light">Explore FutureX 2026</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
