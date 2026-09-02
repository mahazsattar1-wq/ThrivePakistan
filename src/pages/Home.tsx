import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../brand';
import { HERO_IMAGE, spriteStyle } from '../media';
import { EVENTS } from '../data/events';
import { PARTNERS } from '../data/partners';
import { STATS, TESTIMONIALS } from '../data/stats';
import { eventsService } from '../services/eventsService';
import { speakersService } from '../services/speakersService';
import { blogsService } from '../services/blogsService';
import { useSeo } from '../hooks';
import type { BlogPost, Speaker, ThriveEvent } from '../types';
import { Button, Countdown, Icon, PartnerMark, Reveal, SectionHeader, StatCounter, CardSkeleton } from '../components/ui';
import { BlogCard, EventCard, ProgramCard, SpeakerCard, TestimonialCard } from '../components/cards';
import { PROGRAMS } from '../data/programs';

export default function Home() {
  useSeo({
    description:
      'Thrive Pakistan creates events, experiences, learning opportunities and networks connecting young people, professionals, innovators, leaders and organizations across Pakistan.',
  });

  const [upcoming, setUpcoming] = useState<ThriveEvent[] | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[] | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    let alive = true;
    eventsService.list({ status: 'upcoming' }).then((list) => alive && setUpcoming(list.slice(0, 3)));
    speakersService.featured(4).then((list) => alive && setSpeakers(list));
    blogsService.list().then((list) => alive && setBlogs(list.slice(0, 3)));
    return () => {
      alive = false;
    };
  }, []);

  const futurex = EVENTS.find((e) => e.slug === 'futurex-2026');

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-hidden="true" />
        <span className="hero__shape hero__shape--1" aria-hidden="true" />
        <span className="hero__shape hero__shape--2" aria-hidden="true" />
        <span className="hero__shape hero__shape--3" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy anim-fade-up">
            <img className="hero__logo" src={BRAND.logoWhite} alt="Thrive Pakistan" width={210} height={48} />
            <h1 className="hero__title">
              Creating Platforms That Help Pakistan <em>Thrive.</em>
            </h1>
            <p className="hero__lead">
              We design events, experiences, learning opportunities and networks that connect young people,
              professionals, innovators, leaders and organizations — turning energy into opportunity, nationwide.
            </p>
            <div className="hero__ctas">
              <Button to="/events" size="lg" icon="arrow-right">Explore Events</Button>
              <Button to="/become-a-partner" size="lg" variant="outline-light">Partner With Thrive</Button>
            </div>
            <ul className="hero__points">
              <li><Icon name="check" size={15} /> 50+ events produced</li>
              <li><Icon name="check" size={15} /> 10+ cities activated</li>
              <li><Icon name="check" size={15} /> 300+ volunteers strong</li>
            </ul>
          </div>

          {futurex && (
            <aside className="hero__card" aria-label="Featured event: FutureX 2026">
              <span className="hero__card-kicker">Featured Event</span>
              <img className="hero__card-logo" src={BRAND.futurexColor} alt="FutureX 2026 logo" width={190} height={56} />
              <h3>Where Ideas Meet Opportunity.</h3>
              <ul className="hero__card-meta">
                <li><Icon name="calendar" size={15} /> {futurex.dateLabel}</li>
                <li><Icon name="pin" size={15} /> {futurex.city}, Pakistan</li>
                <li><Icon name="users" size={15} /> {futurex.attendees}</li>
              </ul>
              <Button to="/futurex" icon="arrow-right">Explore FutureX</Button>
            </aside>
          )}
        </div>
      </section>

      {/* ============ WHAT WE DO PILLARS ============ */}
      <section className="pillar-strip" aria-label="What Thrive Pakistan does">
        <div className="container">
          <ul className="pillar-strip__list">
            {[
              { icon: 'calendar' as const, label: 'National Events', text: 'Conferences, summits & meetups' },
              { icon: 'compass' as const, label: 'Leadership Development', text: 'Summits, roundtables & playbooks' },
              { icon: 'spark' as const, label: 'Youth Empowerment', text: 'Skills labs & career clinics' },
              { icon: 'campus' as const, label: 'University Engagement', text: 'Campus tour & society grants' },
              { icon: 'chip' as const, label: 'Technology & Innovation', text: 'FutureX, hackathons & expos' },
              { icon: 'handshake' as const, label: 'Partnerships', text: 'Corporate & community alliances' },
            ].map((p, i) => (
              <Reveal as="li" key={p.label} delay={i * 60}>
                <span className="pillar-strip__icon"><Icon name={p.icon} size={19} /></span>
                <span>
                  <strong>{p.label}</strong>
                  <em>{p.text}</em>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ PARTNER MARQUEE ============ */}
      <div className="partners-strip">
        <p className="partners-strip__label">Trusted by partners across the ecosystem</p>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span className="marquee__item" key={`${p.id}-${i}`}>
                <PartnerMark partner={p} index={PARTNERS.findIndex((x) => x.id === p.id)} />
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">Partner organizations: {PARTNERS.map((p) => p.name).join(', ')}.</p>
      </div>

      {/* ============ IMPACT STATS ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Impact"
              title="A national platform, measured in people."
              lead="Every number below is a room full of decisions, prototypes, hires and friendships. (Frontend mock figures — live numbers arrive with the admin dashboard.)"
            />
          </Reveal>
          <div className="stats-band">
            {STATS.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <StatCounter stat={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FUTUREX FEATURE ============ */}
      {futurex && (
        <section className="section fx">
          <span className="fx__glow" aria-hidden="true" />
          <div className="container fx__grid">
            <Reveal className="fx__content">
              <img className="fx__logo" src={BRAND.futurexColor} alt="FutureX 2026" width={260} height={84} />
              <p className="fx__tagline">
                Where Ideas Meet <span>Opportunity.</span>
              </p>
              <p className="fx__desc">
                Two days of keynotes, product showcases, investor rooms, workshops and a 36-hour hack —
                Pakistan's boldest gathering of technologists, founders and students returns this October.
              </p>
              <ul className="fx__facts">
                <li><Icon name="calendar" size={16} /> {futurex.dateLabel} · {futurex.time}</li>
                <li><Icon name="pin" size={16} /> {futurex.location}</li>
                <li><Icon name="users" size={16} /> {futurex.attendees}</li>
                <li><Icon name="mic" size={16} /> 40+ speakers across 6 tracks</li>
              </ul>
              <div className="fx__ctas">
                <Button to="/futurex" icon="arrow-right">Explore FutureX</Button>
                <Button to="/events/futurex-2026" variant="green-ghost">Register Interest</Button>
              </div>
            </Reveal>
            <Reveal className="fx__side" delay={120}>
              <div className="fx__visual">
                <div className="fx__visual-img" style={spriteStyle(futurex.image)} role="img" aria-label="FutureX main stage artwork" />
              </div>
              <div className="fx__countdown-card">
                <h4>Countdown to doors</h4>
                <Countdown targetIso={futurex.date} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ PROGRAMS ============ */}
      <section className="section home-programs">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Programs"
              title="Eight ways we build the ecosystem."
              lead="From flagship technology convenings to leadership expeditions — every program is designed to leave participants more capable than we found them."
              action={<Button to="/programs" variant="ghost" icon="arrow-right">All programs</Button>}
            />
          </Reveal>
          <div className="grid grid--4">
            {PROGRAMS.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ UPCOMING EVENTS ============ */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Upcoming"
              title="The next rooms worth being in."
              lead="Conferences, summits, tours and meetups — pick your next opportunity."
              action={<Button to="/events" variant="outline-light" icon="arrow-right">All events</Button>}
            />
          </Reveal>
          <div className="grid grid--3">
            {upcoming === null
              ? [0, 1, 2].map((i) => <CardSkeleton key={i} dark />)
              : upcoming.map((e, i) => (
                  <Reveal key={e.id} delay={i * 90}>
                    <EventCard event={e} dark />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* ============ SPEAKERS ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Speakers"
              title="Voices that move rooms."
              lead="Founders, researchers, executives and creators who share practice, not theory."
              action={<Button to="/speakers" variant="ghost" icon="arrow-right">Speaker directory</Button>}
            />
          </Reveal>
          <div className="grid grid--4">
            {speakers === null
              ? [0, 1, 2, 3].map((i) => <CardSkeleton key={i} />)
              : speakers.map((s, i) => (
                  <Reveal key={s.id} delay={i * 80}>
                    <SpeakerCard speaker={s} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Community voices"
              title="What the community says."
            />
          </Reveal>
          <div className="testimonial-grid">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG ============ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Newsroom"
              title="Stories, playbooks & field notes."
              lead="Written by the people building the platforms — practitioners first, editors second."
              action={<Button to="/blog" variant="ghost" icon="arrow-right">Visit the blog</Button>}
            />
          </Reveal>
          <div className="grid grid--3">
            {blogs === null
              ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
              : blogs.map((b, i) => (
                  <Reveal key={b.id} delay={i * 90}>
                    <BlogCard post={b} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>Join Thrive</span>
            <h2 style={{ marginTop: 12 }}>Build the ecosystem with us.</h2>
            <p style={{ marginTop: 10 }}>
              Partner your organization, take a stage, or join the volunteer community that runs it all —
              there is a seat for you in this movement.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Become a Partner</Button>
              <Button to="/volunteer" variant="outline-light">Become a Volunteer</Button>
              <Link to="/become-a-speaker" className="btn btn--green-ghost">Become a Speaker</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
