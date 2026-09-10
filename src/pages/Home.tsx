import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../brand';
import { HERO_IMAGE, spriteStyle } from '../media';
import { EVENTS } from '../data/events';
import { IMPACT_STATEMENTS } from '../data/stats';
import { ORG, PREVIOUS_WORK, PRIOR_ECOSYSTEM_NAMES, PRIOR_ECOSYSTEM_NOTE } from '../data/org';
import { eventsService } from '../services/eventsService';
import { blogsService } from '../services/blogsService';
import { useSeo } from '../hooks';
import type { BlogPost, ThriveEvent } from '../types';
import { Button, Countdown, Icon, Reveal, SectionHeader, CardSkeleton } from '../components/ui';
import { BlogCard, ProgramCard } from '../components/cards';
import { PROGRAMS } from '../data/programs';

export default function Home() {
  useSeo({
    description: ORG.shortDescription,
  });

  const [upcoming, setUpcoming] = useState<ThriveEvent[] | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    let alive = true;
    eventsService.list({ status: 'upcoming' }).then((list) => alive && setUpcoming(list));
    blogsService.list().then((list) => alive && setBlogs(list.slice(0, 3)));
    return () => {
      alive = false;
    };
  }, []);

  /**
   * Featured upcoming event: only a confirmed upcoming event earns the hero
   * card. When none exists the event block disappears entirely and the
   * introduction owns the space.
   */
  const featuredEvent = (upcoming ?? EVENTS).find((e) => e.status === 'upcoming' && e.featured && e.dateConfirmed && e.venueConfirmed);
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
            <h1 className="hero__title">
              Connecting Young Talent With Knowledge, Industry &amp; <em>Opportunity</em>
            </h1>
            <p className="hero__lead">
              Thrive Pakistan is a youth-centered platform founded in 2025 that brings students and emerging
              talent closer to practical learning, technology, entrepreneurship, industry exposure and
              meaningful opportunities — with particular relevance to Hazara and Khyber Pakhtunkhwa.
            </p>
            <div className="hero__ctas">
              <Button to="/futurex" size="lg" icon="arrow-right">Explore FutureX 2026</Button>
              <Button to="/become-a-partner" size="lg" variant="outline-light">Partner With Thrive</Button>
            </div>
            <ul className="hero__points">
              <li><Icon name="spark" size={15} /> Youth-led · Founded 2025</li>
              <li><Icon name="pin" size={15} /> Rooted in Hazara, Khyber Pakhtunkhwa</li>
              <li><Icon name="users" size={15} /> Students, institutions, practitioners &amp; communities</li>
            </ul>
          </div>

          {/* Featured upcoming event — shown only when a confirmed event exists */}
          {featuredEvent && (
            <aside className="hero__card" aria-label={`Featured event: ${featuredEvent.title}`}>
              <span className="hero__card-kicker">Featured Platform</span>
              <img className="hero__card-logo" src={BRAND.futurexColor} alt="FutureX 2026 logo" width={190} height={56} />
              <h3>A youth, technology &amp; innovation platform.</h3>
              <ul className="hero__card-meta">
                <li><Icon name="calendar" size={15} /> {featuredEvent.dateLabel}</li>
                <li><Icon name="pin" size={15} /> {featuredEvent.location}</li>
              </ul>
              <Button to="/futurex" icon="arrow-right">Explore FutureX</Button>
            </aside>
          )}
        </div>
      </section>

      {/* ============ INTRODUCTION — WHY WE EXIST ============ */}
      <section className="section" aria-label="Why Thrive Pakistan exists">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Why we exist"
              title="Talent exists everywhere. Opportunity does not."
            />
          </Reveal>
          <Reveal delay={90}>
            <p className="home-intro__text">
              Students and early-career professionals in regional cities can have ambition and ability
              without regular access to mentors, employers, innovators, decision-makers and professional
              environments. Thrive Pakistan exists to help narrow that distance — through programmes,
              convenings, collaborations, skills initiatives and long-term ecosystem building, so a young
              person no longer has to leave their region — or already know the right people — to discover
              a career, test an idea or meet a mentor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="section section--tight" aria-label="Mission and vision">
        <div className="container">
          <div className="mission-grid">
            <Reveal>
              <div className="mission-card mission-card--dark">
                <span className="eyebrow">Our mission</span>
                <p>
                  To connect regional youth with technology, industry, entrepreneurship, finance, leadership
                  and public institutions through platforms that produce practical learning and lasting
                  relationships.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mission-card mission-card--green">
                <span className="eyebrow">Our vision</span>
                <p>
                  A Pakistan where a young person&apos;s access to knowledge, networks, mentors and
                  opportunity is not determined by whether they live in a major metropolitan centre.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="section home-programs" aria-label="What Thrive Pakistan does">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="What we do"
              title="Six areas where we open access."
              lead="Programme directions rooted in our strategic goals — technology, entrepreneurship, industry, education, youth and women's participation."
              action={<Button to="/programs" variant="ghost" icon="arrow-right">All focus areas</Button>}
            />
          </Reveal>
          <div className="grid grid--3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FUTUREX 2026 ============ */}
      {futurex && (
        <section className="section fx" aria-label="FutureX 2026">
          <span className="fx__glow" aria-hidden="true" />
          <div className="container fx__grid">
            <Reveal className="fx__content">
              <img className="fx__logo" src={BRAND.futurexColor} alt="FutureX 2026" width={260} height={84} />
              <p className="fx__tagline">
                AI · Work · Finance · <span>Leadership</span>
              </p>
              <p className="fx__desc">
                A youth, technology and innovation platform by Thrive Pakistan — bringing students, emerging
                talent, industry practitioners and institutions into meaningful conversations about AI,
                future-ready skills, entrepreneurship, cybersecurity and the opportunities shaping
                tomorrow&apos;s workforce.
              </p>
              <ul className="fx__facts">
                <li><Icon name="calendar" size={16} /> {futurex.dateLabel} — confirmed</li>
                <li><Icon name="pin" size={16} /> {futurex.location}</li>
                <li><Icon name="campus" size={16} /> Hosted under a Memorandum of Collaboration with GPGC Mansehra</li>
              </ul>
              <div className="fx__ctas">
                <Button to="/futurex" icon="arrow-right">Explore FutureX</Button>
                <Button to="/become-a-partner" variant="green-ghost">Partner With FutureX</Button>
              </div>
            </Reveal>
            <Reveal className="fx__side" delay={120}>
              <div className="fx__visual">
                <div className="fx__visual-img" style={spriteStyle(futurex.image)} role="img" aria-label="FutureX platform artwork" />
              </div>
              <div className="fx__countdown-card">
                <h4>24 September 2026 · Mansehra</h4>
                <Countdown targetIso={futurex.date} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ PREVIOUS WORK ============ */}
      <section className="section section--dark" aria-label="Previous work">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Previous referenced work"
              title="Where the platform comes from."
              lead="Our documented public journey began in Hazara — with a festival, an institutional collaboration and a region ready for credible programming."
            />
          </Reveal>
          <div className="grid grid--3">
            {PREVIOUS_WORK.map((w, i) => (
              <Reveal key={w.id} delay={i * 90}>
                <article className="event-block work-card">
                  <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>{i === 0 ? '2025 · Hazara University, Mansehra' : i === 1 ? '2026 · Institutional collaboration' : 'Regional ecosystem'}</span>
                  <h3 style={{ marginTop: 10 }}>{w.title}</h3>
                  <p style={{ marginTop: 8, color: 'var(--muted-on-dark)' }}>{w.detail}</p>
                  {w.id === 'hazara-tech-fiesta' && (
                    <ul className="highlights-list" style={{ marginTop: 14 }}>
                      <li><Icon name="users" size={16} /> 5,000+ attendees</li>
                      <li><Icon name="mic" size={16} /> 50+ speakers · 15+ exhibitors</li>
                      <li><Icon name="clock" size={16} /> 24-hour hackathon</li>
                      <li><Icon name="calendar" size={16} /> 12–14 December 2025</li>
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="home-eco__note">
              Ecosystem engagement has included {PRIOR_ECOSYSTEM_NAMES.slice(0, 5).join(', ')} and others. {PRIOR_ECOSYSTEM_NOTE}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="cta-band__ctas" style={{ marginTop: 22 }}>
              <Button to="/events/hazara-tech-fiesta-2025" variant="outline-light" icon="arrow-right">About Hazara Tech Fiesta</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ IMPACT (QUALITATIVE) ============ */}
      <section className="section" aria-label="Impact">
        <div className="container">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Impact"
              title="Access with structure."
              lead="What our platforms are built to produce — measured in opportunities created, not vanity numbers."
            />
          </Reveal>
          <div className="grid grid--4">
            {IMPACT_STATEMENTS.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <div className="value-card impact-card">
                  <span className="value-card__icon"><Icon name={s.icon as never} size={20} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTNERSHIP ============ */}
      <section className="section section--light" aria-label="Partnership">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Built through collaboration"
              title="No platform is built alone."
            />
          </Reveal>
          <Reveal delay={90}>
            <p className="home-intro__text">
              Thrive Pakistan works to develop relationships across educational institutions, industry,
              government, technology practitioners, founders, community organizations and professional
              networks. Every collaboration is designed to create a meaningful role, activation or
              outcome — not simply another logo.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="cta-band__ctas" style={{ justifyContent: 'center', marginTop: 24 }}>
              <Button to="/become-a-partner" size="lg" icon="arrow-right">Explore Partnership Opportunities</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ NEWSROOM ============ */}
      <section className="section" aria-label="Newsroom">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Newsroom"
              title="Notes from the build."
              lead="Organizational notes and perspectives — grounded in what we actually know and do."
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
            <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>Connect with Thrive Pakistan</span>
            <h2 style={{ marginTop: 12 }}>Bring opportunity closer to the people who need it.</h2>
            <p style={{ marginTop: 10 }}>
              Partner your organization, take a stage, volunteer with the team or bring Thrive Pakistan to
              your institution — there is a role for you in this ecosystem.
            </p>
            <div className="cta-band__ctas">
              <Button href="mailto:partnerships@thrivepakistan.com" icon="arrow-right">Email Partnerships</Button>
              <Button to="/volunteer" variant="outline-light">Become a Volunteer</Button>
              <Link to="/become-a-speaker" className="btn btn--green-ghost">Become a Speaker</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
