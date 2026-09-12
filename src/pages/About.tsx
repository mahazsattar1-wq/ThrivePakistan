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
      'Thrive Pakistan is a youth-led technology and ecosystem-development platform based in Hazara, Khyber Pakhtunkhwa, founded in 2025 to connect regional youth with technology, industry, entrepreneurship and opportunity.',
  });

  return (
    <>
      <PageHero
        center
        eyebrow="About Thrive Pakistan"
        title="Talent exists everywhere. Opportunity does not."
        lead={ORG.description}
        meta={[
          { icon: 'spark', label: `Youth-led platform · Founded ${ORG.founded}` },
          { icon: 'pin', label: 'Based in Hazara, Khyber Pakhtunkhwa' },
          { icon: 'globe', label: 'Regional roots, national outlook' },
        ]}
      />

      {/* Vision & Mission */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Vision & Mission"
              title="Built for impact, guided by purpose."
              lead="Thrive Pakistan exists to open pathways for young people in Hazara and Khyber Pakhtunkhwa through technology, leadership, and practical opportunities."
            />
          </Reveal>
          <div className="mission-grid">
            <Reveal style={{ height: '100%' }}>
              <div className="mission-card mission-card--dark">
                <span className="eyebrow">Our Vision</span>
                <h3>Regional Talent Leading the Digital Future</h3>
                <p>{ORG.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={100} style={{ height: '100%' }}>
              <div className="mission-card mission-card--green">
                <span className="eyebrow">Our Mission</span>
                <h3>Connecting Youth with Opportunity</h3>
                <p>{ORG.mission}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="event-block purpose-card" style={{ marginTop: 24 }}>
              <span className="eyebrow">Our Purpose</span>
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
              center
              eyebrow="Why We Exist"
              title="The problem we were created to solve."
              lead={ORG.whyWeExist}
            />
          </Reveal>
          <div className="grid grid--2">
            <Reveal style={{ height: '100%' }}>
              <div className="event-block">
                <h3>The distance we work to close</h3>
                <ul className="highlights-list" style={{ marginTop: 16 }}>
                  <li><Icon name="eye" size={16} /> <span><strong>Exposure gap</strong>: limited direct contact with founders, technologists, employers, investors, and policymakers</span></li>
                  <li><Icon name="tools" size={16} /> <span><strong>Skills gap</strong>: academic learning not matched by practical experience in AI, software, digital work, and entrepreneurship</span></li>
                  <li><Icon name="users" size={16} /> <span><strong>Network gap</strong>: fewer professional relationships through which information and opportunity travel</span></li>
                  <li><Icon name="spark" size={16} /> <span><strong>Confidence gap</strong>: ability without a stage on which to test, present, and defend ideas</span></li>
                  <li><Icon name="campus" size={16} /> <span><strong>Institutional gap</strong>: universities, companies, and public departments without a sustained collaboration mechanism</span></li>
                  <li><Icon name="clock" size={16} /> <span><strong>Continuity gap</strong>: one-off seminars create moments; ecosystems require repeated contact and follow-up</span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100} style={{ height: '100%' }}>
              <div className="event-block">
                <h3>What makes us different</h3>
                <ul className="highlights-list" style={{ marginTop: 16 }}>
                  <li><Icon name="pin" size={16} /> <span><strong>Regional ownership</strong>: designed with local institutions, not copied in from outside</span></li>
                  <li><Icon name="spark" size={16} /> <span><strong>Youth leadership</strong>: professionally accountable governance</span></li>
                  <li><Icon name="chip" size={16} /> <span><strong>Technology-first</strong>: practical programming over passive talk</span></li>
                  <li><Icon name="handshake" size={16} /> <span><strong>Academia–industry bridge</strong>: sustained collaboration mechanism</span></li>
                  <li><Icon name="target" size={16} /> <span><strong>Measurable execution</strong>: accountable metrics and continuous follow-up</span></li>
                </ul>
                <p style={{ marginTop: 18, color: 'var(--muted-text)', lineHeight: 1.7 }}>
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
              center
              eyebrow="Strategic Goals"
              title="What we are working toward."
              lead="The goal is not to host more events, but to make regional opportunity more normal, visible, and repeatable."
            />
          </Reveal>
          <div className="grid grid--2">
            {STRATEGIC_GOALS.map((g, i) => (
              <Reveal key={g.id} delay={(i % 2) * 80} style={{ height: '100%' }}>
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
              center
              eyebrow="What We Do"
              title="Our focus areas."
              lead="Core domain programs designed for youth, technology, entrepreneurship, and regional growth."
            />
          </Reveal>
          <div className="grid grid--3">
            {PROGRAMS.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 70} style={{ height: '100%' }}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
              <Button to="/programs" variant="ghost" icon="arrow-right">View All Focus Areas</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section className="section section--light">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader center eyebrow="Our Journey" title="How we got here." />
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
            <SectionHeader center eyebrow="Working Principles" title="How we work." />
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 60} style={{ height: '100%' }}>
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

      {/* CTA — Meet the Team only */}
      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>Our Leadership & Team</span>
            <h2 style={{ marginTop: 12 }}>Meet the people behind the platform.</h2>
            <p style={{ marginTop: 10 }}>
              A youth-led team with defined executive ownership, reporting and documentation.
            </p>
            <div className="cta-band__ctas" style={{ marginTop: 22 }}>
              <Button to="/team" size="lg" icon="arrow-right">
                Meet the Team
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
