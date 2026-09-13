import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { eventsService } from '../services/eventsService';
import { speakersService } from '../services/speakersService';
import { galleryService } from '../services/galleryService';
import { partnersService } from '../services/partnersService';
import { useSeo } from '../hooks';
import type { Faq, GalleryItem, Partner, Speaker, ThriveEvent } from '../types';
import { formatDateLong } from '../utils';
import { spriteStyle } from '../media';
import { PageHero } from '../components/page-hero';
import { EventCard, GalleryTile, SpeakerCard, MonogramAvatar } from '../components/cards';
import { Badge, Button, Countdown, EmptyState, Icon, PartnerMark, Reveal, SectionHeader, Skeleton } from '../components/ui';
import { Modal } from '../components/feedback';
import { RegisterModal } from '../components/register-modal';

const TABS = ['Overview', 'Agenda', 'Speakers', 'Gallery', 'FAQs'] as const;
type Tab = (typeof TABS)[number];

export default function EventDetail() {
  const { slug = '' } = useParams();
  const [event, setEvent] = useState<ThriveEvent | null | undefined>(undefined);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [sponsors, setSponsors] = useState<Partner[]>([]);
  const [related, setRelated] = useState<ThriveEvent[]>([]);
  const [tab, setTab] = useState<Tab>('Overview');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);

  useSeo({
    title: event ? `${event.title} · ${event.tagline || 'Thrive Pakistan Event'}` : 'Event Details',
    description: event?.description,
    jsonLd: event
      ? {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.title,
          description: event.description,
          startDate: event.date,
          eventStatus: event.status === 'upcoming' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventPast',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: { '@type': 'Place', name: event.location, address: event.city + ', Pakistan' },
          organizer: { '@type': 'Organization', name: 'Thrive Pakistan' },
          isAccessibleForFree: false,
        }
      : null,
  });

  useEffect(() => {
    let alive = true;
    setEvent(undefined);
    setTab('Overview');
    eventsService.getBySlug(slug).then(async (ev) => {
      if (!alive) return;
      setEvent(ev ?? null);
      if (!ev) return;

      const speakerSlugsToFetch = ev.speakerIds && ev.speakerIds.length > 0 ? ev.speakerIds : ev.speakerSlugs;

      const [sp, gl, spn, rel] = await Promise.all([
        speakersService.bySlugs(speakerSlugsToFetch),
        galleryService.forEvent(ev.id),
        partnersService.byIds(ev.sponsorIds),
        eventsService.related(ev.slug),
      ]);
      if (!alive) return;
      setSpeakers(sp);
      setGallery(gl);
      setSponsors(spn);
      setRelated(rel);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (event === undefined) {
    return (
      <>
        <PageHero title="Loading event details…" crumbs={[{ label: 'Events', to: '/events' }, { label: '…' }]} />
        <section className="section">
          <div className="container grid grid--2">
            <Skeleton className="skeleton-card__media" />
            <Skeleton className="skeleton-card__media" />
          </div>
        </section>
      </>
    );
  }

  if (event === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title="Event not found."
            message="This event may have been unpublished or the link is incorrect."
            icon="calendar"
          />
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/events" className="btn btn--primary">Browse all events</Link>
          </p>
        </div>
      </section>
    );
  }

  const isPast = event.status === 'past';
  const galleryTarget = `/gallery/${event.gallerySlug || event.galleryId || event.id}`;

  /* ================= PAST EVENT CASE STUDY VIEW ================= */
  if (isPast) {
    return (
      <>
        {/* 1. Hero Banner */}
        <PageHero
          image={event.image}
          crumbs={[{ label: 'Events', to: '/events' }, { label: event.title }]}
          eyebrow={event.category}
          title={event.title}
          lead={event.tagline || event.description}
          meta={[
            { icon: 'calendar', label: `${formatDateLong(event.date)}` },
            { icon: 'pin', label: `${event.location}, ${event.city}` },
            ...(event.attendees ? [{ icon: 'users' as const, label: event.attendees }] : []),
          ]}
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            <Badge tone="light">Past Event</Badge>
            {event.tags.map((t) => (
              <Badge key={t} tone="light">{t}</Badge>
            ))}
          </div>
        </PageHero>

        {/* 2. At-a-Glance Flexible Metrics */}
        {event.metrics && event.metrics.length > 0 && (
          <section className="section section--tight" style={{ paddingTop: 32, paddingBottom: 16 }}>
            <div className="container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  padding: '24px 28px',
                  background: 'var(--dark-2)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--r-xl)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {event.metrics
                  .filter((m) => m.isVisible !== false)
                  .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                  .map((m) => (
                    <div key={m.id} style={{ textAlign: 'left' }}>
                      <div
                        style={{
                          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                          fontWeight: 800,
                          color: 'var(--primary-green)',
                          lineHeight: 1.2,
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          color: 'var(--muted-on-dark)',
                          marginTop: 4,
                          fontWeight: 500,
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        <section className="section section--tight">
          <div className="container" style={{ display: 'grid', gap: 48 }}>

            {/* 3. Media / Visual Proof (Photo Preview + Central Gallery Link) */}
            {gallery.length > 0 && (
              <div className="event-block">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)' }}>Visual Proof & Moments</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-on-dark)', marginTop: 4 }}>
                      Documented moments from the central media archive.
                    </p>
                  </div>
                  <Button to={galleryTarget} variant="outline-light" size="sm" icon="eye">
                    View Central Gallery
                  </Button>
                </div>

                <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                  {gallery.slice(0, 6).map((item, idx) => (
                    <button
                      key={item.id || idx}
                      type="button"
                      className="gallery-tile"
                      onClick={() => {
                        if (item.type === 'video' && item.youtubeUrl) {
                          window.open(item.youtubeUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          setLightbox(item);
                        }
                      }}
                      aria-label={item.caption || 'Open event image'}
                      style={{ height: 180 }}
                    >
                      {item.image ? (
                        <div className="gallery-tile__img sprite" style={{ ...spriteStyle(item.image), position: 'absolute', inset: 0 }} />
                      ) : item.imageSource ? (
                        <img src={item.imageSource} alt={item.caption} className="gallery-tile__img" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--dark-3)' }} />
                      )}
                      <span className="gallery-tile__overlay">
                        {item.type === 'video' && (
                          <span style={{ marginBottom: 4 }}>
                            <Badge tone="neon">▶ Watch on YouTube</Badge>
                          </span>
                        )}
                        <span className="gallery-tile__cap">{item.caption}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. About the Event */}
            <div
              className="event-block"
              style={{
                background: 'var(--dark-2)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--r-lg)',
                padding: '28px clamp(20px, 4vw, 36px)',
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>
                About the Event
              </h2>
              {event.about && event.about.length > 0 ? (
                event.about.map((p, i) => (
                  <p key={i} style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: i < event.about.length - 1 ? 12 : 0 }}>
                    {p}
                  </p>
                ))
              ) : (
                <p style={{ color: '#d4dddc', fontSize: '0.96rem', lineHeight: 1.65 }}>
                  {event.description}
                </p>
              )}
            </div>

            {/* 5. Event Focus Areas */}
            {event.focusAreas && event.focusAreas.length > 0 && (
              <div className="event-block">
                <SectionHeader title="Event Focus Areas" lead="Key technical and development pillars addressed during the platform." />
                <div className="grid grid--2" style={{ gap: 20 }}>
                  {event.focusAreas
                    .filter((fa) => fa.isVisible !== false)
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((fa) => (
                      <div
                        key={fa.id}
                        style={{
                          padding: 20,
                          background: 'var(--dark-2)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: 'var(--r-md)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <Icon name={(fa.icon as any) || 'spark'} size={20} className="icon-neon" />
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)' }}>{fa.title}</h3>
                        </div>
                        {fa.description && (
                          <p style={{ fontSize: '0.9rem', color: 'var(--muted-on-dark)', lineHeight: 1.55 }}>
                            {fa.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 6. Tracks / Agenda */}
            {((event.tracks && event.tracks.length > 0) || event.agenda.length > 0) && (
              <div
                className="event-block"
                style={{
                  background: 'var(--dark-2)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--r-lg)',
                  padding: '28px clamp(20px, 4vw, 36px)',
                }}
              >
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)', marginBottom: 16 }}>
                  Programme Tracks & Agenda
                </h2>
                {event.tracks && event.tracks.length > 0 ? (
                  <div style={{ display: 'grid', gap: 24 }}>
                    {event.tracks
                      .filter((tr) => tr.isVisible !== false)
                      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                      .map((tr) => (
                        <div key={tr.id} style={{ borderLeft: '3px solid var(--primary-green)', paddingLeft: 16 }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--white)' }}>{tr.title}</h3>
                          {tr.description && (
                            <p style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)', marginTop: 4 }}>{tr.description}</p>
                          )}
                          {tr.sessions && tr.sessions.length > 0 && (
                            <ol className="agenda-list" style={{ marginTop: 12 }}>
                              {tr.sessions.map((s, idx) => (
                                <li key={s.id || idx}>
                                  {s.time && <time>{s.time}</time>}
                                  <div>
                                    <strong>{s.title}</strong>
                                    {s.description && <span>{s.description}</span>}
                                  </div>
                                </li>
                              ))}
                            </ol>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
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
                )}
              </div>
            )}

            {/* 7. Speakers & Mentors */}
            {speakers.length > 0 && (
              <div className="event-block">
                <SectionHeader title="Speakers & Mentors" lead="Industry leaders and subject experts on stage." />
                <div className="grid grid--3" style={{ gap: 24 }}>
                  {speakers.map((s) => (
                    <SpeakerCard key={s.id} speaker={s} />
                  ))}
                </div>
              </div>
            )}

            {/* 8. Chief Guests & Community Partners */}
            {((event.chiefGuests && event.chiefGuests.length > 0) || sponsors.length > 0) && (
              <div className="event-block">
                <SectionHeader title="Chief Guests & Partners" lead="Ecosystem supporters and institutional leaders." />
                {event.chiefGuests && event.chiefGuests.length > 0 && (
                  <div className="grid grid--2" style={{ gap: 20, marginBottom: 24 }}>
                    {event.chiefGuests
                      .filter((g) => g.isVisible !== false)
                      .map((g) => (
                        <div key={g.id} className="team-card">
                          <MonogramAvatar name={g.name} className="team-card__photo team-card__photo--mono" />
                          <div className="team-card__body">
                            <h3>{g.name}</h3>
                            <p className="team-card__role">{g.role}</p>
                            <p className="team-card__focus">{g.organization}</p>
                            {g.bio && <p className="team-card__bio">{g.bio}</p>}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                {sponsors.length > 0 && (
                  <div className="sponsors-row">
                    {sponsors.map((p, i) => (
                      <PartnerMark key={p.id} partner={p} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 9. Impact & Verified Outcomes */}
            {event.impactItems && event.impactItems.length > 0 && (
              <div className="event-block">
                <SectionHeader title="Verified Impact & Outcomes" lead="Measurable deliverables from this platform." />
                <div className="grid grid--3" style={{ gap: 20 }}>
                  {event.impactItems
                    .filter((imp) => imp.isVisible !== false)
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((imp) => (
                      <div
                        key={imp.id}
                        style={{
                          padding: 20,
                          background: 'var(--dark-2)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: 'var(--r-md)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <Icon name={(imp.icon as any) || 'check'} size={18} className="icon-neon" />
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>{imp.title}</h3>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)', lineHeight: 1.55 }}>
                          {imp.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 10. Testimonials (Attendee & Speaker Voices) */}
            {event.testimonials && event.testimonials.length > 0 && (
              <div className="event-block">
                <SectionHeader title="Attendee & Speaker Voices" lead="Perspectives from platform participants." />
                <div className="grid grid--2" style={{ gap: 24 }}>
                  {event.testimonials
                    .filter((t) => t.isVisible !== false)
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((t) => (
                      <div
                        key={t.id}
                        style={{
                          padding: 24,
                          background: 'var(--dark-2)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: 'var(--r-lg)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                        }}
                      >
                        <p style={{ fontSize: '0.94rem', color: '#e0e8e6', fontStyle: 'italic', lineHeight: 1.6 }}>
                          "{t.quote}"
                        </p>
                        <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--border-dark)' }}>
                          <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--white)' }}>{t.name}</strong>
                          <span style={{ fontSize: '0.82rem', color: 'var(--muted-on-dark)' }}>{t.role} · {t.organization}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 11. Press & Media Coverage */}
            {event.pressCoverage && event.pressCoverage.length > 0 && (
              <div className="event-block">
                <SectionHeader title="Press & Media Coverage" lead="Published coverage and media features." />
                <div className="grid grid--2" style={{ gap: 20 }}>
                  {event.pressCoverage
                    .filter((pr) => pr.isVisible !== false)
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((pr) => (
                      <div
                        key={pr.id}
                        style={{
                          padding: 20,
                          background: 'var(--dark-2)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: 'var(--r-md)',
                        }}
                      >
                        <Badge tone="green">{pr.publication}</Badge>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)', marginTop: 8 }}>{pr.title}</h3>
                        {pr.description && <p style={{ fontSize: '0.86rem', color: 'var(--muted-on-dark)', marginTop: 6, lineHeight: 1.5 }}>{pr.description}</p>}
                        {pr.date && <p style={{ fontSize: '0.78rem', color: '#9aa59e', marginTop: 8 }}>{pr.date}</p>}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 12. Optional Event Report Download CTA */}
            {event.reportUrl && (
              <div
                style={{
                  padding: '24px 28px',
                  background: 'linear-gradient(135deg, var(--dark-2) 0%, rgba(67,183,73,0.1) 100%)',
                  border: '1px solid var(--primary-green)',
                  borderRadius: 'var(--r-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--white)' }}>
                    Event Report & Document
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)', marginTop: 4 }}>
                    Official documented summary report for this platform.
                  </p>
                </div>
                <Button href={event.reportUrl} variant="primary" size="sm" icon="external">
                  {event.reportLabel || 'Download Event Report'}
                </Button>
              </div>
            )}

          </div>
        </section>

        {/* 13. Future Engagement CTA Band */}
        <section className="section cta-band">
          <span className="cta-band__glow" aria-hidden="true" />
          <div className="container cta-band__inner">
            <Reveal>
              <h2>{event.cta?.heading || "Missed this event? Stay connected with Thrive Pakistan for what's next."}</h2>
              <p style={{ marginTop: 10 }}>
                {event.cta?.description || 'Explore upcoming flagship platforms, university workshops, and regional convenings.'}
              </p>
              <div className="cta-band__ctas">
                <Button to={event.cta?.primaryBtnLink || '/events/futurex-2026'} icon="arrow-right">
                  {event.cta?.primaryBtnText || 'Explore FutureX 2026'}
                </Button>
                <Button to={event.cta?.secondaryBtnLink || '/become-a-partner'} variant="outline-light">
                  {event.cta?.secondaryBtnText || 'Partner With Us'}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Lightbox Modal */}
        <Modal open={lightbox !== null} onClose={() => setLightbox(null)} label="Event image" size="lg">
          {lightbox && (
            <>
              {lightbox.image ? (
                <div className="lightbox__img sprite" style={spriteStyle(lightbox.image)} role="img" aria-label={lightbox.caption} />
              ) : lightbox.imageSource ? (
                <img src={lightbox.imageSource} alt={lightbox.caption} className="lightbox__img" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
              ) : null}
              <div className="lightbox__cap">
                <strong>{lightbox.caption}</strong>
                <span>{lightbox.category}</span>
              </div>
            </>
          )}
        </Modal>
      </>
    );
  }

  /* ================= UPCOMING EVENT VIEW ================= */
  const visibleTabs = TABS.filter((t) => {
    if (t === 'Agenda') return event.agenda.length > 0 || (event.programmeComponents?.length ?? 0) > 0;
    if (t === 'Speakers') return speakers.length > 0;
    if (t === 'Gallery') return gallery.length > 0;
    if (t === 'FAQs') return event.faqs.length > 0;
    return true;
  });

  return (
    <>
      <PageHero
        image={event.image}
        crumbs={[{ label: 'Events', to: '/events' }, { label: event.title }]}
        eyebrow={event.category}
        title={event.title}
        lead={event.description}
        meta={[
          { icon: 'calendar', label: `${formatDateLong(event.date)} · ${event.time}` },
          { icon: 'pin', label: event.location },
          ...(event.attendees ? [{ icon: 'users' as const, label: event.attendees }] : []),
        ]}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
          <Badge tone="green">Upcoming</Badge>
          {event.tags.map((t) => (
            <Badge key={t} tone="light">{t}</Badge>
          ))}
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container event-layout">
          <div className="event-main">
            <div className="tabs" role="tablist" aria-label="Event sections">
              {visibleTabs.map((t) => (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={tab === t}
                  className={`tab ${tab === t ? 'tab--active' : ''}`}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 'Overview' && (
              <div className="event-main" role="tabpanel">
                <div className="event-block event-about">
                  <h3>About this event</h3>
                  {event.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="event-block">
                  <h3>Highlights</h3>
                  <ul className="highlights-list">
                    {event.highlights.map((h) => (
                      <li key={h}><Icon name="check" size={17} /> {h}</li>
                    ))}
                  </ul>
                </div>
                {sponsors.length > 0 && (
                  <div className="event-block">
                    <h3>Partners & sponsors</h3>
                    <div className="sponsors-row">
                      {sponsors.map((p, i) => (
                        <PartnerMark key={p.id} partner={p} index={i} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'Agenda' && (
              <div className="event-block" role="tabpanel">
                <h3>Programme</h3>
                {event.agenda.length > 0 ? (
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
                ) : (
                  <>
                    <p className="muted" style={{ marginBottom: 14 }}>
                      The final agenda has not been confirmed. Below are the programme components being
                      developed, subject to confirmation.
                    </p>
                    <ul className="highlights-list">
                      {(event.programmeComponents ?? []).map((c) => (
                        <li key={c}><Icon name="check" size={17} /> {c}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {tab === 'Speakers' && (
              <div className="event-block" role="tabpanel">
                <h3>Who's on stage</h3>
                <div className="grid grid--3">
                  {speakers.map((s) => (
                    <SpeakerCard key={s.id} speaker={s} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'Gallery' && (
              <div className="event-block" role="tabpanel">
                <h3>Moments</h3>
                <div className="event-gallery">
                  {gallery.map((g) => (
                    <GalleryTile key={g.id} item={g} onOpen={setLightbox} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'FAQs' && (
              <div className="event-block" role="tabpanel">
                <h3>Good to know</h3>
                <FaqList faqs={event.faqs} />
              </div>
            )}
          </div>

          {/* ---------- Sticky aside ---------- */}
          <aside className="event-aside">
            <div className="aside-card aside-card--dark">
              <h4>Event details</h4>
              <ul className="aside-card__rows">
                <li><Icon name="calendar" size={16} /><span>{event.dateLabel}<br /><span className="muted">{event.time}</span></span></li>
                <li><Icon name="pin" size={16} /><span>{event.location}</span></li>
                {event.attendees && <li><Icon name="users" size={16} /><span>{event.attendees}</span></li>}
              </ul>
              <Countdown targetIso={event.date} compact />
              <Button className="btn--block" onClick={() => setRegisterOpen(true)} icon="arrow-right">
                Register Interest
              </Button>
            </div>
            <div className="aside-card">
              <h4>Share & explore</h4>
              <ul className="aside-card__rows">
                <li><Icon name="spark" size={16} /><span>Category: {event.category}</span></li>
                <li><Icon name="pin" size={16} /><span>City: {event.city}</span></li>
              </ul>
              <Button className="btn--block" variant="outline" size="sm" to="/events">More events</Button>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <Reveal>
              <SectionHeader eyebrow="Keep exploring" title="Related events" />
            </Reveal>
            <div className="grid grid--3">
              {related.map((e, i) => (
                <Reveal key={e.id} delay={i * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky register bar */}
      <div className="sticky-register sticky-register--show">
        <div className="sticky-register__info">
          <strong>{event.title}</strong>
          <span>{event.dateLabel} · {event.city}</span>
        </div>
        <Button size="sm" onClick={() => setRegisterOpen(true)}>Register</Button>
      </div>

      <Modal open={lightbox !== null} onClose={() => setLightbox(null)} label="Event image" size="lg">
        {lightbox && (
          <>
            {lightbox.image ? (
              <div className="lightbox__img sprite" style={spriteStyle(lightbox.image)} role="img" aria-label={lightbox.caption} />
            ) : lightbox.imageSource ? (
              <img src={lightbox.imageSource} alt={lightbox.caption} className="lightbox__img" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
            ) : null}
            <div className="lightbox__cap">
              <strong>{lightbox.caption}</strong>
              <span>{lightbox.category}</span>
            </div>
          </>
        )}
      </Modal>

      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} eventName={event.title} />
    </>
  );
}

/* Local FAQ accordion (also used by FutureX page) */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <div key={f.q} className={`faq-item ${open === i ? 'faq-item--open' : ''}`}>
          <button
            type="button"
            className="faq-item__q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {f.q}
            <Icon name="chevron-down" size={17} />
          </button>
          <div className="faq-item__a">
            <div>
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
