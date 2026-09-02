import { useEffect, useState } from 'react';
import { BRAND } from '../brand';
import { EVENTS } from '../data/events';
import { speakersService } from '../services/speakersService';
import { partnersService } from '../services/partnersService';
import { useSeo } from '../hooks';
import type { Partner, Speaker } from '../types';
import { PageHero } from '../components/page-hero';
import { SpeakerCard } from '../components/cards';
import { Badge, Button, Countdown, Icon, PartnerMark, Reveal, SectionHeader, CardSkeleton } from '../components/ui';
import { RegisterModal } from '../components/register-modal';
import { FaqList } from './EventDetail';

const TRACKS = [
  'Applied AI & Machine Learning',
  'Climate & Energy Tech',
  'Fintech & Digital Economy',
  'Product Design & UX',
  'Entrepreneurship & Capital',
  'Campus Innovation',
];

export default function FutureX() {
  useSeo({
    title: 'FutureX 2026',
    description: 'FutureX 2026 — Where Ideas Meet Opportunity. Pakistan\'s boldest technology & innovation gathering. 24–25 October 2026, Islamabad.',
  });

  const event = EVENTS.find((e) => e.slug === 'futurex-2026');
  const [speakers, setSpeakers] = useState<Speaker[] | null>(null);
  const [sponsors, setSponsors] = useState<Partner[]>([]);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    if (event) {
      speakersService.bySlugs(event.speakerSlugs).then((s) => alive && setSpeakers(s));
      partnersService.byIds(event.sponsorIds).then((p) => alive && setSponsors(p));
    }
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!event) return null;

  return (
    <>
      <PageHero center image={event.image} crumbs={[{ label: 'FutureX 2026' }]}>
        <div className="fxpage-hero" style={{ display: 'grid', gap: 18, justifyItems: 'center' }}>
          <h1 className="sr-only">FutureX 2026 — Where Ideas Meet Opportunity</h1>
          <img className="fxpage-logo" src={BRAND.futurexColor} alt="FutureX 2026" width={320} height={130} />
          <Badge tone="neon">Flagship · Technology & Innovation</Badge>
          <p className="page-hero__lead" style={{ textAlign: 'center' }}>
            Where ideas meet opportunity. Two days of keynotes, showcases, investor rooms,
            workshops and a 36-hour hack — built for the people shipping Pakistan's next decade.
          </p>
          <ul className="page-hero__meta" style={{ justifyContent: 'center' }}>
            <li><Icon name="calendar" size={15} /> {event.dateLabel}</li>
            <li><Icon name="pin" size={15} /> {event.location}</li>
            <li><Icon name="users" size={15} /> {event.attendees}</li>
          </ul>
          <Countdown targetIso={event.date} />
          <div className="hero__ctas" style={{ justifyContent: 'center' }}>
            <Button size="lg" onClick={() => setRegisterOpen(true)} icon="arrow-right">Register Interest</Button>
            <Button size="lg" variant="outline-light" to="/events/futurex-2026">Full event details</Button>
          </div>
        </div>
      </PageHero>

      {/* Facts band */}
      <section className="section section--tight">
        <div className="container">
          <div className="stats-band band--4">
            {[
              { v: '5,000+', l: 'Expected attendees' },
              { v: '40+', l: 'Speakers & mentors' },
              { v: '60', l: 'Expo booths' },
              { v: '36h', l: 'FutureHack sprint' },
            ].map((f, i) => (
              <Reveal key={f.l} delay={i * 70}>
                <div className="stat">
                  <span className="stat__value">{f.v}</span>
                  <span className="stat__label">{f.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              center
              eyebrow="Six tracks"
              title="One floor. Every future that matters."
              lead="Each track is curated by a practitioner chair — sessions are chosen for evidence and craft, not sponsorship."
            />
          </Reveal>
          <ul className="track-chips">
            {TRACKS.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 60}>{t}</Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Speakers */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="First wave"
              title="Speakers announced so far."
              lead="More names land every week — newsletter subscribers hear first."
              action={<Button to="/speakers" variant="ghost" icon="arrow-right">All speakers</Button>}
            />
          </Reveal>
          <div className="grid grid--3">
            {speakers === null
              ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
              : speakers.slice(0, 6).map((s, i) => (
                  <Reveal key={s.id} delay={(i % 3) * 80}>
                    <SpeakerCard speaker={s} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* Agenda preview */}
      <section className="section section--light">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader center eyebrow="Day one preview" title="How the first day flows." />
          </Reveal>
          <ol className="agenda-list">
            {event.agenda.map((a) => (
              <li key={a.time + a.title}>
                <time>{a.time}</time>
                <div>
                  <strong>{a.title}</strong>
                  {a.detail && <span>{a.detail}</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Venue */}
      <section className="section">
        <div className="container">
          <div className="venue-card">
            <div className="venue-card__img">
              <div className="sprite" style={{ backgroundImage: 'url(/img/hero-futurex.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} role="img" aria-label="FutureX stage visualization" />
            </div>
            <Reveal className="venue-card__body">
              <span className="eyebrow">The venue</span>
              <h2 style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)' }}>{event.location}</h2>
              <p>
                Three halls, one expo floor and an outdoor lawn for community night — minutes from
                Islamabad's sector corridors, with partner shuttle routes from Rawalpindi and the university enclaves.
              </p>
              <ul className="fx__facts" style={{ gridTemplateColumns: '1fr' }}>
                <li><Icon name="pin" size={16} /> Accessible entrances & prayer rooms on every floor</li>
                <li><Icon name="users" size={16} /> Volunteer help desks at every gate</li>
                <li><Icon name="spark" size={16} /> Dedicated media & creator studio space</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Backing the flagship"
              title="Partners powering FutureX 2026."
              action={<Button to="/become-a-partner" variant="outline-light" icon="arrow-right">Join them</Button>}
            />
          </Reveal>
          <div className="sponsors-row">
            {sponsors.map((p, i) => (
              <PartnerMark key={p.id} partner={p} index={i} dark />
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
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
            <h2 style={{ marginTop: 14 }}>Be in the room when it happens.</h2>
            <p style={{ marginTop: 10 }}>Wave-one registration codes go to newsletter subscribers and partner communities first.</p>
            <div className="cta-band__ctas">
              <Button onClick={() => setRegisterOpen(true)} icon="arrow-right">Register Interest</Button>
              <Button to="/become-a-partner" variant="outline-light">Sponsor FutureX</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} eventName="FutureX 2026" />
    </>
  );
}
