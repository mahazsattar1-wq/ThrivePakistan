import { TIMELINE, VALUES } from '../data/stats';
import { PROGRAMS } from '../data/programs';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { ProgramCard } from '../components/cards';
import { Button, Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';

const APPROACH = [
  { title: 'Design for outcomes', text: 'Every format starts with the capability or connection a participant should leave with — then we build the stage around it.' },
  { title: 'Co-build with community', text: 'Societies, volunteers and partners shape programs with us, so platforms belong to the people they serve.' },
  { title: 'Produce to international standard', text: 'Sound, signage, schedule and safety: craft details are respect for the audience\'s time.' },
  { title: 'Publish what we learn', text: 'Playbooks, numbers and failures go public — the ecosystem grows faster when notes are shared.' },
];

export default function About() {
  useSeo({
    title: 'About',
    description: 'Who Thrive Pakistan is, our mission and vision, what we do, our approach, impact and values — the platform company behind FutureX and a national event ecosystem.',
  });

  return (
    <>
      <PageHero
        eyebrow="About Thrive Pakistan"
        title="We build the rooms where Pakistan's future gets decided."
        lead="Thrive Pakistan is an events, leadership and community organization creating platforms that connect young people, professionals, innovators, leaders and organizations."
        crumbs={[{ label: 'About' }]}
        meta={[
          { icon: 'spark', label: 'Founded as a community initiative' },
          { icon: 'users', label: 'Youth-led, practitioner-curated' },
          { icon: 'pin', label: 'National reach, city-level depth' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="mission-grid">
            <Reveal>
              <div className="mission-card mission-card--dark">
                <span className="eyebrow">Our mission</span>
                <p>
                  To create platforms that help Pakistan thrive — events, experiences, learning opportunities
                  and networks where talent meets opportunity, and ideas meet the people who can back them.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mission-card mission-card--green">
                <span className="eyebrow">Our vision</span>
                <p>
                  A Pakistan where every builder — in every city, campus and community — can find a room,
                  a mentor, a market and a movement without leaving home.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Who we are"
              title="A platform organization, not an event company."
              lead="Events are our medium, not our purpose. Each platform feeds a year-round ecosystem: communities that persist, programs that compound and relationships that outlast the closing keynote."
            />
          </Reveal>
          <div className="grid grid--2">
            <Reveal>
              <div className="event-block">
                <h3>What we do</h3>
                <ul className="highlights-list">
                  <li><Icon name="calendar" size={16} /> Produce national events: FutureX, summits, tours, workshops & meetups</li>
                  <li><Icon name="compass" size={16} /> Run leadership & skills programs with measurable outcomes</li>
                  <li><Icon name="users" size={16} /> Grow volunteer & university communities in 10+ cities</li>
                  <li><Icon name="handshake" size={16} /> Connect partners with audiences, talent and impact</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="event-block">
                <h3>Our approach</h3>
                <ol className="approach-list" style={{ gridTemplateColumns: '1fr' }}>
                  {APPROACH.map((a) => (
                    <li key={a.title}>
                      <strong>{a.title}</strong>
                      <p>{a.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="What we do"
              title="The program portfolio."
              action={<Button to="/programs" variant="ghost" icon="arrow-right">All programs</Button>}
            />
          </Reveal>
          <div className="grid grid--4">
            {PROGRAMS.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader dark center eyebrow="Our journey" title="How we got here." />
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader center eyebrow="Our values" title="Eight commitments we hire and program against." />
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 60}>
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

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Meet the people behind the platforms.</h2>
            <p style={{ marginTop: 10 }}>Six core team members, three hundred volunteers, one obsession.</p>
            <div className="cta-band__ctas">
              <Button to="/team" icon="arrow-right">Meet the team</Button>
              <Button to="/impact" variant="outline-light">See our impact</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
