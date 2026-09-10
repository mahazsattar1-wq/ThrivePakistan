import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { programsService } from '../services/programsService';
import { useSeo } from '../hooks';
import type { Program, ThriveEvent } from '../types';
import { EVENTS } from '../data/events';
import { PROGRAMS } from '../data/programs';
import { PageHero } from '../components/page-hero';
import { EventCard, ProgramCard } from '../components/cards';
import { Button, EmptyState, Icon, Reveal, SectionHeader, SpriteBox } from '../components/ui';

export default function ProgramDetail() {
  const { slug = '' } = useParams();
  const [program, setProgram] = useState<Program | null | undefined>(undefined);

  useSeo({
    title: program ? program.title : 'Program',
    description: program?.description,
  });

  useEffect(() => {
    let alive = true;
    setProgram(undefined);
    programsService.getBySlug(slug).then((p) => alive && setProgram(p ?? null));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (program === undefined) {
    return <PageHero title="Loading program…" crumbs={[{ label: 'Programs', to: '/programs' }, { label: '…' }]} />;
  }

  if (program === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState title="Focus area not found." message="The area may have been renamed or the link is incorrect." icon="compass" />
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/programs" className="btn btn--primary">All programs</Link>
          </p>
        </div>
      </section>
    );
  }

  const events: ThriveEvent[] = EVENTS.filter((e) => program.eventSlugs.includes(e.slug));
  const others = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={program.image}
        crumbs={[{ label: 'Programs', to: '/programs' }, { label: program.title }]}
        eyebrow={program.category}
        title={program.title}
        lead={program.description}
        meta={[
          { icon: 'spark', label: 'Focus area' },
          { icon: 'calendar', label: events.length > 0 ? `${events.length} linked platform${events.length === 1 ? '' : 's'}` : 'Platform programme directions' },
        ]}
      />

      <section className="section section--tight">
        <div className="container grid grid--2" style={{ alignItems: 'start', gap: 'clamp(26px,4vw,54px)' }}>
          <Reveal>
            <div className="event-block">
              <h3>What this area covers</h3>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.8 }}>{program.details}</p>
              <div style={{ marginTop: 20, position: 'relative', borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '16/9' }}>
                <SpriteBox image={program.image} label={`${program.title} artwork`} style={{ position: 'absolute', inset: 0 }} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="event-block">
              <h3>Focus areas</h3>
              <ul className="highlights-list">
                {program.outcomes.map((o) => (
                  <li key={o}><Icon name="check" size={17} /> {o}</li>
                ))}
              </ul>

              <h3 style={{ marginTop: 26 }}>Who it's for</h3>
              <ul className="role-chips">
                {program.audience.map((a) => (
                  <li key={a}><Icon name="users" size={15} /> {a}</li>
                ))}
              </ul>

              <div className="impact-quote" style={{ marginTop: 26 }}>
                <Icon name="trend" size={20} />
                <div>
                  <strong>Why it matters</strong>
                  <p>{program.impact}</p>
                </div>
              </div>

              <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button to="/events" icon="arrow-right">See related events</Button>
                <Button to="/contact" variant="outline">Collaborate with us</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {events.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <Reveal>
              <SectionHeader eyebrow="Linked platforms" title="Where this area shows up." />
            </Reveal>
            <div className="grid grid--3">
              {events.map((e, i) => (
                <Reveal key={e.id} delay={i * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Keep exploring" title="Other focus areas" />
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
