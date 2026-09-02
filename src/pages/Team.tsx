import { TEAM } from '../data/team';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { TeamCard } from '../components/cards';
import { Button, Reveal } from '../components/ui';

export default function Team() {
  useSeo({
    title: 'Team',
    description: 'Meet the Thrive Pakistan core team — the people behind the events, programs and community platforms. (Prototype mock profiles.)',
  });

  return (
    <>
      <PageHero
        eyebrow="The core team"
        title="Small team. National platforms."
        lead="Six people design the systems; three hundred volunteers run them; thousands of partners, speakers and communities make them matter."
        crumbs={[{ label: 'Team' }]}
        meta={[
          { icon: 'users', label: '6 core roles' },
          { icon: 'heart', label: '300+ volunteer community' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            {TEAM.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 90}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 26, fontSize: '0.84rem', color: 'var(--muted-text)' }}>
            Note: team profiles on this prototype are fictional mock profiles for frontend development and do
            not represent actual Thrive Pakistan employees.
          </p>
        </div>
      </section>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Work with this team.</h2>
            <p style={{ marginTop: 10 }}>
              Partners, speakers and volunteers collaborate with the core team on every platform we build.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Partner With Us</Button>
              <Button to="/volunteer" variant="outline-light">Join as volunteer</Button>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
