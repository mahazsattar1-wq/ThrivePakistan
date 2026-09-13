import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { programsService } from '../services/programsService';
import { eventsService } from '../services/eventsService';
import { useSeo } from '../hooks';
import type { Program, ThriveEvent } from '../types';
import { PROGRAMS } from '../data/programs';
import { PageHero } from '../components/page-hero';
import { EventCard, ProgramCard } from '../components/cards';
import { EmptyState, Icon, Reveal, SectionHeader, SpriteBox } from '../components/ui';

export default function ProgramDetail() {
  const { slug = '' } = useParams();
  const [program, setProgram] = useState<Program | null | undefined>(undefined);
  const [relatedEvents, setRelatedEvents] = useState<ThriveEvent[]>([]);

  useSeo({
    title: program ? `${program.title} · Focus Areas` : 'Focus Area',
    description: program?.description,
  });

  useEffect(() => {
    let alive = true;
    setProgram(undefined);
    setRelatedEvents([]);

    programsService.getBySlug(slug).then(async (p) => {
      if (!alive) return;
      setProgram(p ?? null);
      if (!p) return;

      // Fetch related events using stable event IDs or slugs
      const eventList = await eventsService.list();
      if (!alive) return;

      const targetIdsOrSlugs = p.relatedEventIds && p.relatedEventIds.length > 0 ? p.relatedEventIds : p.eventSlugs;
      const matched = eventList.filter(
        (e) => targetIdsOrSlugs.includes(e.id) || targetIdsOrSlugs.includes(e.slug),
      );
      setRelatedEvents(matched);
    });

    return () => {
      alive = false;
    };
  }, [slug]);

  if (program === undefined) {
    return <PageHero title="Loading focus area…" crumbs={[{ label: 'Focus Areas', to: '/programs' }, { label: '…' }]} />;
  }

  if (program === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState title="Focus area not found." message="The area may have been renamed or the link is incorrect." icon="compass" />
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/programs" className="btn btn--primary">All Focus Areas</Link>
          </p>
        </div>
      </section>
    );
  }

  const others = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={program.image}
        crumbs={[{ label: 'Focus Areas', to: '/programs' }, { label: program.title }]}
        eyebrow={program.category}
        title={program.title}
        lead={program.description}
        meta={[
          { icon: 'spark', label: 'Thrive Focus Area' },
          { icon: 'calendar', label: relatedEvents.length > 0 ? `${relatedEvents.length} related event${relatedEvents.length === 1 ? '' : 's'}` : 'Platform programme directions' },
        ]}
      />

      <section className="section section--tight">
        <div className="container" style={{ display: 'grid', gap: 48 }}>

          {/* 1. Why This Matters */}
          <Reveal>
            <div
              className="event-block"
              style={{
                background: 'linear-gradient(135deg, var(--dark-2) 0%, rgba(67,183,73,0.08) 100%)',
                border: '1px solid var(--primary-green)',
                borderRadius: 'var(--r-xl)',
                padding: '28px clamp(20px, 4vw, 36px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Icon name="spark" size={22} className="icon-neon" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--white)' }}>Why This Matters</h2>
              </div>
              <p style={{ color: '#d4dddc', fontSize: '1rem', lineHeight: 1.7 }}>
                {program.whyThisMatters || program.details}
              </p>
            </div>
          </Reveal>

          {/* 2. What We Focus On */}
          {program.focusPoints && program.focusPoints.length > 0 && (
            <div>
              <SectionHeader title="What We Focus On" lead="Core subject pillars and practical themes within this area." />
              <div className="grid grid--3" style={{ gap: 20 }}>
                {program.focusPoints.map((fp, i) => (
                  <Reveal key={fp.title} delay={i * 80}>
                    <div
                      style={{
                        padding: 24,
                        background: 'var(--dark-2)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: 'var(--r-lg)',
                        height: '100%',
                      }}
                    >
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
                        {fp.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)', lineHeight: 1.6 }}>
                        {fp.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* 3. Opportunities & Outcomes */}
          <div className="grid grid--2" style={{ gap: 24, alignItems: 'stretch' }}>
            {program.opportunities && program.opportunities.length > 0 && (
              <Reveal>
                <div
                  className="event-block"
                  style={{
                    background: 'var(--dark-2)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--r-lg)',
                    padding: '24px 28px',
                    height: '100%',
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: 14 }}>
                    Opportunities & Access
                  </h3>
                  <div style={{ display: 'grid', gap: 14 }}>
                    {program.opportunities.map((opp) => (
                      <div key={opp.title}>
                        <strong style={{ color: 'var(--primary-green)', fontSize: '0.96rem', display: 'block', marginBottom: 4 }}>
                          {opp.title}
                        </strong>
                        <span style={{ fontSize: '0.88rem', color: '#d4dddc', lineHeight: 1.5 }}>
                          {opp.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={100}>
              <div
                className="event-block"
                style={{
                  background: 'var(--dark-2)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--r-lg)',
                  padding: '24px 28px',
                  height: '100%',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: 14 }}>
                  Expected Outcomes
                </h3>
                <ul className="highlights-list">
                  {program.outcomes.map((o) => (
                    <li key={o}><Icon name="check" size={17} /> {o}</li>
                  ))}
                </ul>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginTop: 22, marginBottom: 10 }}>
                  Who It’s For
                </h3>
                <ul className="role-chips">
                  {program.audience.map((a) => (
                    <li key={a}><Icon name="users" size={15} /> {a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* 4. How Thrive Contributes */}
          <Reveal>
            <div
              className="event-block"
              style={{
                background: 'var(--dark-2)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--r-lg)',
                padding: '24px 28px',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)', marginBottom: 10 }}>
                How Thrive Pakistan Contributes
              </h2>
              <p style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65 }}>
                {program.howThriveContributes || program.details}
              </p>
              <div style={{ marginTop: 20, position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '21/9' }}>
                <SpriteBox image={program.image} label={`${program.title} illustration`} style={{ position: 'absolute', inset: 0 }} />
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 5. Related Events */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Convenings & Platforms" title="Related Events" lead="Events and platforms connected to this focus area." />
          </Reveal>
          {relatedEvents.length === 0 ? (
            <EmptyState
              title="No related events listed yet."
              message="Events related to this focus area will appear here as the programme grows."
              icon="calendar"
            />
          ) : (
            <div className="grid grid--3">
              {relatedEvents.map((e, i) => (
                <Reveal key={e.id} delay={i * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Explore Other Focus Areas */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Keep exploring" title="Other Focus Areas" />
          </Reveal>
          <div className="grid grid--3">
            {others.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
