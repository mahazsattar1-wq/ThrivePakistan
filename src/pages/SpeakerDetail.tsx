import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { speakersService } from '../services/speakersService';
import { useSeo } from '../hooks';
import type { Speaker, ThriveEvent } from '../types';
import { EVENTS } from '../data/events';
import { PageHero } from '../components/page-hero';
import { Badge, Button, EmptyState, Icon, Reveal, SectionHeader, SpriteBox } from '../components/ui';
import { EventCard } from '../components/cards';

export default function SpeakerDetail() {
  const { slug = '' } = useParams();
  const [speaker, setSpeaker] = useState<Speaker | null | undefined>(undefined);

  useSeo({
    title: speaker ? speaker.name : 'Speaker',
    description: speaker?.bio,
    jsonLd: speaker
      ? {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: speaker.name,
          jobTitle: speaker.title,
          worksFor: { '@type': 'Organization', name: speaker.organization },
          knowsAbout: speaker.topics,
          description: speaker.bio,
          additionalNote: 'Fictional mock profile for frontend prototype.',
        }
      : null,
  });

  useEffect(() => {
    let alive = true;
    setSpeaker(undefined);
    speakersService.getBySlug(slug).then((s) => alive && setSpeaker(s ?? null));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (speaker === undefined) {
    return <PageHero title="Loading speaker…" crumbs={[{ label: 'Speakers', to: '/speakers' }, { label: '…' }]} />;
  }

  if (speaker === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState title="Speaker not found." message="The profile may have been removed or the link is incorrect." icon="mic" />
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/speakers" className="btn btn--primary">Back to speakers</Link>
          </p>
        </div>
      </section>
    );
  }

  const events: ThriveEvent[] = EVENTS.filter((e) => speaker.eventSlugs.includes(e.slug));

  return (
    <>
      <PageHero crumbs={[{ label: 'Speakers', to: '/speakers' }, { label: speaker.name }]}>
        <div className="person-hero__grid">
          <SpriteBox image={speaker.portrait} label={`Illustrated portrait of ${speaker.name}`} className="person-hero__photo" />
          <div className="person-hero__info">
            <span className="eyebrow">Speaker</span>
            <h1>{speaker.name}</h1>
            <p className="person-hero__role">{speaker.title}</p>
            <p className="person-hero__org">{speaker.organization}</p>
            <div className="person__chips">
              {speaker.expertise.map((x) => (
                <Badge key={x} tone="green">{x}</Badge>
              ))}
            </div>
            <div className="person__socials">
              {speaker.socials.linkedin && (
                <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} on LinkedIn`}>
                  <Icon name="linkedin" size={17} />
                </a>
              )}
              {speaker.socials.twitter && (
                <a href={speaker.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} on X`}>
                  <Icon name="x" size={15} />
                </a>
              )}
              {speaker.socials.website && (
                <a href={speaker.socials.website} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} website`}>
                  <Icon name="globe" size={17} />
                </a>
              )}
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container grid grid--2" style={{ alignItems: 'start' }}>
          <Reveal>
            <div className="event-block">
              <h3>Biography</h3>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.8 }}>{speaker.bio}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="event-block">
              <h3>Talking points</h3>
              <ul className="highlights-list">
                {speaker.topics.map((t) => (
                  <li key={t}><Icon name="spark" size={16} /> {t}</li>
                ))}
              </ul>
              <div style={{ marginTop: 18 }}>
                <Button to="/become-a-speaker" variant="outline" size="sm" icon="arrow-right">Join the speaker bench</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {events.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <Reveal>
              <SectionHeader eyebrow="On stage at" title={`${speaker.name.split(' ')[0]}'s Thrive sessions.`} />
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
    </>
  );
}
