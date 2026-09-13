import { PROGRAMS } from '../data/programs';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { ProgramCard } from '../components/cards';
import { Button, Reveal } from '../components/ui';

export default function Programs() {
  useSeo({
    title: 'Focus Areas',
    description: 'What Thrive Pakistan works on: technology & digital skills, entrepreneurship, industry exposure, education & campus engagement, youth development, and women\u2019s participation.',
  });

  return (
    <>
      <PageHero
        eyebrow="Focus Areas"
        title="Six areas where we open access."
        lead="Programme directions rooted in our strategic goals, shaping the platforms we build and the collaborations we pursue."
        crumbs={[{ label: 'Focus Areas' }]}
        meta={[
          { icon: 'spark', label: '6 Focus Areas' },
          { icon: 'pin', label: 'Hazara · Khyber Pakhtunkhwa' },
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
            <h2>Partner with Thrive Pakistan across our focus areas</h2>
            <p style={{ marginTop: 10 }}>
              We work with universities, colleges, institutions and community organizations across Hazara and Khyber Pakhtunkhwa.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Become a Partner</Button>
              <Button to="/events" variant="outline-light">Explore Events</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
