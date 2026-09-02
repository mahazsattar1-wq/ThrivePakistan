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
import { EventCard, GalleryTile, SpeakerCard } from '../components/cards';
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
    title: event ? event.title : 'Event',
    description: event?.description,
  });

  useEffect(() => {
    let alive = true;
    setEvent(undefined);
    setTab('Overview');
    eventsService.getBySlug(slug).then(async (ev) => {
      if (!alive) return;
      setEvent(ev ?? null);
      if (!ev) return;
      const [sp, gl, spn, rel] = await Promise.all([
        speakersService.bySlugs(ev.speakerSlugs),
        galleryService.forEvent(ev.slug),
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
        <PageHero title="Loading event…" crumbs={[{ label: 'Events', to: '/events' }, { label: '…' }]} />
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

  const upcoming = event.status === 'upcoming';
  const visibleTabs = TABS.filter((t) => {
    if (t === 'Agenda') return event.agenda.length > 0;
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
          <Badge tone={upcoming ? 'green' : 'light'}>{upcoming ? 'Upcoming' : 'Past event'}</Badge>
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
              <h4>{upcoming ? 'Reserve your seat' : 'Event recap'}</h4>
              <ul className="aside-card__rows">
                <li><Icon name="calendar" size={16} /><span>{event.dateLabel}<br /><span className="muted">{event.time}</span></span></li>
                <li><Icon name="pin" size={16} /><span>{event.location}</span></li>
                {event.attendees && <li><Icon name="users" size={16} /><span>{event.attendees}</span></li>}
              </ul>
              {upcoming && <Countdown targetIso={event.date} compact />}
              {upcoming ? (
                <Button className="btn--block" onClick={() => setRegisterOpen(true)} icon="arrow-right">
                  Register Interest
                </Button>
              ) : (
                <Button className="btn--block" to="/gallery" variant="outline-light">View gallery</Button>
              )}
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
      {upcoming && (
        <div className="sticky-register sticky-register--show">
          <div className="sticky-register__info">
            <strong>{event.title}</strong>
            <span>{event.dateLabel} · {event.city}</span>
          </div>
          <Button size="sm" onClick={() => setRegisterOpen(true)}>Register</Button>
        </div>
      )}

      <Modal open={lightbox !== null} onClose={() => setLightbox(null)} label="Event image" size="lg">
        {lightbox && (
          <>
            <div className="lightbox__img sprite" style={spriteStyle(lightbox.image)} role="img" aria-label={lightbox.caption} />
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
