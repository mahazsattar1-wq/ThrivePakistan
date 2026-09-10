import { useState } from 'react';
import { BRAND } from '../brand';
import { EVENTS } from '../data/events';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { Badge, Button, Countdown, Icon, Reveal, SectionHeader } from '../components/ui';
import { RegisterModal } from '../components/register-modal';
import { FaqList } from './EventDetail';

/**
 * FutureX 2026 — Thrive Pakistan's developing flagship platform.
 *
 * CONFIRMED (per official documents): 24 September 2026, Government Post
 * Graduate College Mansehra, MoC signed 6 August 2026, four content pillars.
 * NOT CONFIRMED (and therefore not shown as facts): final agenda, speakers,
 * guests, sponsors, ticketing and registration links. Programme components
 * are always labelled as planned directions.
 */

const PILLARS = [
  {
    title: 'AI',
    text: 'Generative AI, responsible use, AI careers, productivity, entrepreneurship and emerging technology.',
  },
  {
    title: 'Work',
    text: 'Digital careers, freelancing, remote work, employability, portfolios, recruitment and future skills.',
  },
  {
    title: 'Finance',
    text: 'Financial literacy, fintech, payments, entrepreneurship finance, inclusion and smarter decision-making.',
  },
  {
    title: 'Leadership',
    text: 'Communication, decision-making, personal brand, networking and leadership in an AI-shaped economy.',
  },
];

/** Verified FutureX session directions (organizational documents). */
const THEMES = [
  'AI and the future of work',
  'Human judgement in an automated world',
  'Cybersecurity, privacy and digital trust',
  'Gender, opportunity and technology',
  'Social consequences of AI and algorithmic decision-making',
  'Digital entrepreneurship and freelancing',
  'Regional talent and innovation ecosystems',
  'The gap between classroom education and industry needs',
];

export default function FutureX() {
  useSeo({
    title: 'FutureX 2026',
    description:
      'FutureX 2026 — a youth, technology and innovation platform by Thrive Pakistan. 24 September 2026 at Government Post Graduate College, Mansehra. AI · Work · Finance · Leadership.',
  });

  const event = EVENTS.find((e) => e.slug === 'futurex-2026');
  const [registerOpen, setRegisterOpen] = useState(false);

  if (!event) return null;

  return (
    <>
      <PageHero center image={event.image} crumbs={[{ label: 'FutureX 2026' }]}>
        <div className="fxpage-hero" style={{ display: 'grid', gap: 18, justifyItems: 'center' }}>
          <h1 className="sr-only">FutureX 2026 — AI · Work · Finance · Leadership</h1>
          <img className="fxpage-logo" src={BRAND.futurexColor} alt="FutureX 2026" width={320} height={130} />
          <Badge tone="neon">Developing flagship platform · Thrive Pakistan</Badge>
          <p className="page-hero__lead" style={{ textAlign: 'center', maxWidth: '70ch' }}>
            A youth, technology and innovation platform bringing students, emerging talent, industry
            practitioners and institutions into meaningful conversations about AI, future-ready skills,
            entrepreneurship, cybersecurity and the opportunities shaping tomorrow&apos;s workforce.
          </p>
          <ul className="page-hero__meta" style={{ justifyContent: 'center' }}>
            <li><Icon name="calendar" size={15} /> {event.dateLabel} — confirmed</li>
            <li><Icon name="pin" size={15} /> {event.location}</li>
          </ul>
          <Countdown targetIso={event.date} />
          <div className="hero__ctas" style={{ justifyContent: 'center' }}>
            <Button size="lg" onClick={() => setRegisterOpen(true)} icon="arrow-right">Register Interest</Button>
            <Button size="lg" variant="outline-light" to="/become-a-partner">Partner With FutureX</Button>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-on-dark)', textAlign: 'center', maxWidth: '62ch' }}>
            Final agenda, speakers, guests, sponsors and registration details are being developed and will
            be announced as confirmed.
          </p>
        </div>
      </PageHero>

      {/* The practical question */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              center
              eyebrow="The platform"
              title="One practical question drives FutureX."
            />
          </Reveal>
          <Reveal delay={90}>
            <p className="home-intro__text">
              What does a young person need to understand, build and access in order to succeed in the next
              economy? FutureX brings students, professionals, employers, founders, educators, speakers and
              public stakeholders together around that question — through four content pillars.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Four pillars */}
      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="value-card pillar-card">
                  <span className="pillar-tag">{p.title}</span>
                  <h3 className="sr-only">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              center
              eyebrow="Session directions"
              title="The conversations FutureX is building toward."
              lead="Themes under development for the programme — session titles and formats will be confirmed as the agenda is finalized."
            />
          </Reveal>
          <ul className="track-chips">
            {THEMES.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 50}>{t}</Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Planned programme components */}
      <section className="section section--light">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Potential programme"
              title="What FutureX is being built to include."
              lead="Planned programme components — subject to confirmation as the agenda is finalized."
            />
          </Reveal>
          <Reveal delay={90}>
            <ul className="highlights-list" style={{ marginTop: 18 }}>
              {(event.programmeComponents ?? []).map((c) => (
                <li key={c}><Icon name="check" size={16} /> {c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Speakers — future state */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader center eyebrow="Speakers" title="Announcements to come." />
          </Reveal>
          <Reveal delay={90}>
            <div className="empty" role="status">
              <span className="empty__icon"><Icon name="mic" size={26} /></span>
              <h3>No speakers have been announced yet.</h3>
              <p>
                Speaker announcements will be shared as the FutureX programme is confirmed. Practitioners
                who want to contribute can express interest below.
              </p>
              <Button to="/become-a-speaker" variant="outline" size="sm">Express interest as a speaker</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Venue */}
      <section className="section section--dark">
        <div className="container">
          <div className="venue-card">
            <div className="venue-card__img">
              <div className="sprite" style={{ backgroundImage: 'url(/img/hero-futurex.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} role="img" aria-label="FutureX stage visualization" />
            </div>
            <Reveal className="venue-card__body">
              <span className="eyebrow">The venue — confirmed</span>
              <h2 style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)' }}>{event.location}</h2>
              <p>
                FutureX 2026 will be delivered with Government Post Graduate College Mansehra under a
                Memorandum of Collaboration signed on 6 August 2026 — an institutional foundation for joint
                programming in Mansehra, Khyber Pakhtunkhwa.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="For partners & sponsors"
              title="Help shape the platform."
              lead="FutureX is being developed with institutions, employers and technology practitioners. Sponsorship and partnership structures will be finalized with participating organizations."
            />
          </Reveal>
          <div className="grid grid--3">
            {[
              { icon: 'campus' as const, title: 'Institutions', text: 'Co-programme sessions, campus delegations and student participation.' },
              { icon: 'briefcase' as const, title: 'Employers & industry', text: 'Career Hub interaction, demonstrations and talent engagement.' },
              { icon: 'chip' as const, title: 'Technology partners', text: 'Labs, demonstrations and practical learning activations.' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="event-block" style={{ height: '100%' }}>
                  <span className="eyebrow" style={{ color: 'var(--primary-green)' }}><Icon name={c.icon} size={15} /> {c.title}</span>
                  <p style={{ marginTop: 10, color: 'var(--muted-text)', lineHeight: 1.65 }}>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section section--light">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader center eyebrow="Questions" title="FutureX FAQs." />
          </Reveal>
          <FaqList faqs={event.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <img src={BRAND.futurexColor} alt="FutureX 2026" width={200} height={66} style={{ margin: '0 auto' }} />
            <h2 style={{ marginTop: 14 }}>Follow the platform as it takes shape.</h2>
            <p style={{ marginTop: 10 }}>
              Register your interest and we will share confirmed programme, speaker and registration news
              as it is announced.
            </p>
            <div className="cta-band__ctas">
              <Button onClick={() => setRegisterOpen(true)} icon="arrow-right">Register Interest</Button>
              <Button to="/events" variant="outline-light">See all events</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} eventName="FutureX 2026" />
    </>
  );
}
