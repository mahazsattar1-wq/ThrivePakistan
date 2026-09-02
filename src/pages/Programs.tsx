import { PROGRAMS } from '../data/programs';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { ProgramCard } from '../components/cards';
import { Button, Reveal } from '../components/ui';

export default function Programs() {
  useSeo({
    title: 'Programs & Initiatives',
    description: 'Thrive Pakistan programs: technology & innovation, leadership development, youth and women empowerment, university engagement, entrepreneurship, training and leadership tours.',
  });

  return (
    <>
      <PageHero
        eyebrow="Programs & initiatives"
        title="Eight engines of the ecosystem."
        lead="Every Thrive platform belongs to a program with its own outcomes, partners and community — explore each one."
        crumbs={[{ label: 'Programs' }]}
        meta={[
          { icon: 'spark', label: '8 active programs' },
          { icon: 'pin', label: 'Running in 10+ cities' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Want a program on your campus or in your city?</h2>
            <p style={{ marginTop: 10 }}>
              We co-design stops with universities, societies and city partners every season.
            </p>
            <div className="cta-band__ctas">
              <Button to="/contact" icon="arrow-right">Start a conversation</Button>
              <Button to="/become-a-partner" variant="outline-light">Become a partner</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
