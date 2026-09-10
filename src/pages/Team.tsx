import { TEAM } from '../data/team';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { TeamCard } from '../components/cards';
import { Button, Reveal, SectionHeader } from '../components/ui';

export default function Team() {
  useSeo({
    title: 'Leadership',
    description:
      'The confirmed Thrive Pakistan leadership roster — executive and functional leads accountable for direction, execution, partnerships, events, outreach, inclusion and operations.',
  });

  const executive = TEAM.filter((m) => m.group === 'executive');
  const functional = TEAM.filter((m) => m.group !== 'executive');

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Youth-led, professionally accountable."
        lead="Thrive Pakistan combines the energy of student and community teams with defined executive ownership, reporting and documentation — every major task has one accountable owner."
        crumbs={[{ label: 'Team' }]}
        meta={[
          { icon: 'users', label: '4 executive leads' },
          { icon: 'shield', label: '9 functional leads' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Executive leadership" title="Direction & delivery." />
          </Reveal>
          <div className="grid grid--4">
            {executive.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 80}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Functional leadership" title="The people who run the platform." />
          </Reveal>
          <div className="grid grid--3">
            {functional.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 70}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 26, fontSize: '0.84rem', color: 'var(--muted-text)', maxWidth: '78ch' }}>
            Official photographs of the leadership team will be published as they become available. Until
            then, initials are shown instead of any substitute imagery.
          </p>
        </div>
      </section>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Work with this team.</h2>
            <p style={{ marginTop: 10 }}>
              Institutions, partners, speakers and volunteers collaborate with the leadership on every
              platform Thrive Pakistan builds.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Partner With Us</Button>
              <Button to="/volunteer" variant="outline-light">Join as a volunteer</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
