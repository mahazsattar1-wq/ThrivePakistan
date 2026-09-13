import { Link } from 'react-router-dom';
import type { Award, AwardWinner, BlogPost, GalleryCollection, GalleryItem, Program, Speaker, TeamMember, ThriveEvent, VideoItem } from '../types';
import { dateParts, formatDate, formatViews } from '../utils';
import { Icon, Badge, SpriteBox, Button } from './ui';
import type { IconName } from './ui';
import { EVENTS_PAGE_CONFIG } from '../data/eventsPage';
import { GALLERY_PAGE_CONFIG } from '../data/galleryPage';
import { AWARDS_PAGE_CONFIG } from '../data/awardsPage';

/** Initials monogram for people without an approved photograph. */
function initialsOf(name: string): string {
  return name
    .replace(/^Dr\.\s*/, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function MonogramAvatar({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`avatar-mono ${className}`.trim()} role="img" aria-label={`${name}, official photograph to be added`}>
      {initialsOf(name)}
    </span>
  );
}

/* ================= Event card ================= */

export function EventCard({ event, dark }: { event: ThriveEvent; dark?: boolean }) {
  const d = dateParts(event.date);
  const labels = EVENTS_PAGE_CONFIG.cardLabels;
  const galleryTarget = `/gallery/${event.galleryId || event.gallerySlug || event.id}`;

  return (
    <article className={`event-card ${dark ? 'event-card--dark' : ''}`}>
      <div className="event-card__inner">
        <Link to={`/events/${event.slug}`} className="event-card__media-link" aria-label={`View event: ${event.title}`}>
          <div className="event-card__media">
            <SpriteBox image={event.image} label={`${event.title} event artwork`} className="event-card__img" />
            <span className="event-card__datechip" aria-hidden="true">
              <strong>{d.day}</strong>
              <span>{d.month}</span>
              <span>{d.year}</span>
            </span>
            <span className={`event-card__status event-card__status--${event.status}`}>
              {event.status === 'upcoming' ? labels.statusUpcoming : labels.statusPast}
            </span>
          </div>
        </Link>
        <div className="event-card__body">
          <span className="event-card__cat">{event.category}</span>
          <h3 className="event-card__title">
            <Link to={`/events/${event.slug}`}>{event.title}</Link>
          </h3>
          <ul className="event-card__meta">
            <li><Icon name="calendar" size={15} /> {event.dateLabel}</li>
            <li><Icon name="pin" size={15} /> {event.city}</li>
            <li><Icon name="clock" size={15} /> {event.time}</li>
          </ul>
          <p className="event-card__desc">{event.description}</p>
          <div className="event-card__actions" style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button to={`/events/${event.slug}`} size="sm" variant={dark ? 'primary' : 'primary'} icon="arrow-right">
              {labels.viewEvent}
            </Button>
            <Button to={galleryTarget} size="sm" variant={dark ? 'outline-light' : 'outline'} icon="eye">
              {labels.viewGallery}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ================= Speaker card ================= */

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <article className="speaker-card">
      <Link to={`/speakers/${speaker.slug}`} className="speaker-card__link" aria-label={`View speaker profile: ${speaker.name}`}>
        {speaker.portrait ? (
          <SpriteBox image={speaker.portrait} label={`Portrait of ${speaker.name}`} className="speaker-card__photo" />
        ) : (
          <MonogramAvatar name={speaker.name} className="speaker-card__photo" />
        )}
        <div className="speaker-card__body">
          <h3 className="speaker-card__name">{speaker.name}</h3>
          <p className="speaker-card__role">{speaker.title}</p>
          <p className="speaker-card__org">{speaker.organization}</p>
          <ul className="speaker-card__tags">
            {speaker.expertise.slice(0, 2).map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </Link>
      <div className="speaker-card__foot">
        <div className="speaker-card__socials">
          {speaker.socials.linkedin && (
            <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} on LinkedIn`}>
              <Icon name="linkedin" size={15} />
            </a>
          )}
          {speaker.socials.twitter && (
            <a href={speaker.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} on X`}>
              <Icon name="x" size={14} />
            </a>
          )}
          {speaker.socials.website && (
            <a href={speaker.socials.website} target="_blank" rel="noopener noreferrer" aria-label={`${speaker.name} website`}>
              <Icon name="globe" size={15} />
            </a>
          )}
        </div>
        <Link to={`/speakers/${speaker.slug}`} className="speaker-card__view">
          View profile <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </article>
  );
}

/* ================= Team card ================= */

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="team-card">
      {member.portrait ? (
        <SpriteBox image={member.portrait} label={`Portrait of ${member.name}`} className="team-card__photo" />
      ) : (
        <MonogramAvatar name={member.name} className="team-card__photo team-card__photo--mono" />
      )}
      <div className="team-card__body">
        <h3>{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p className="team-card__focus">{member.focus}</p>
        <p className="team-card__bio">{member.bio}</p>
      </div>
    </article>
  );
}

/* ================= Program card ================= */

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="program-card">
      <Link to={`/programs/${program.slug}`} className="program-card__link" aria-label={`Explore program: ${program.title}`}>
        <SpriteBox image={program.image} label={`${program.title} artwork`} className="program-card__media" />
        <div className="program-card__body">
          <span className="program-card__icon">
            <Icon name={program.icon as IconName} size={20} />
          </span>
          <div>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
          </div>
        </div>
        <span className="program-card__cta">
          Explore <Icon name="arrow-right" size={15} />
        </span>
      </Link>
    </article>
  );
}

/* ================= Blog card ================= */

export function BlogCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`blog-card ${featured ? 'blog-card--featured' : ''}`}>
      <Link to={`/blog/${post.slug}`} className="blog-card__link" aria-label={`Read article: ${post.title}`}>
        <div className="blog-card__media">
          <SpriteBox image={post.image} label={`Illustration for article: ${post.title}`} className="blog-card__img" />
          <Badge tone="green" className="blog-card__cat">{post.category}</Badge>
        </div>
        <div className="blog-card__body">
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__foot">
            <span className="blog-card__author">{post.author}</span>
            <span className="blog-card__meta">
              {formatDate(post.date)} · {post.readingTime} min read{post.views > 0 ? ` · ${formatViews(post.views)} views` : ''}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ================= Video card ================= */

export function VideoCard({ video, onPlay }: { video: VideoItem; onPlay: (v: VideoItem) => void }) {
  return (
    <article className="video-card">
      <button type="button" className="video-card__btn" onClick={() => onPlay(video)} aria-label={`Preview video: ${video.title}`}>
        <div className="video-card__media">
          <SpriteBox image={video.thumb} label={`Thumbnail for video: ${video.title}`} className="video-card__thumb" />
          <span className="video-card__play" aria-hidden="true"><Icon name="play" size={20} /></span>
          <span className="video-card__duration">{video.duration}</span>
        </div>
        <div className="video-card__body">
          <span className="video-card__cat">{video.category}</span>
          <h3>{video.title}</h3>
          <span className="video-card__meta">{formatViews(video.views)} views · {formatDate(video.date)}</span>
        </div>
        </button>
    </article>
  );
}

/* ================= Gallery tile ================= */

export function GalleryTile({
  item, onOpen, tall, wide,
}: {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
  tall?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      className={`gallery-tile ${tall ? 'gallery-tile--tall' : ''} ${wide ? 'gallery-tile--wide' : ''}`.trim()}
      onClick={() => onOpen(item)}
      aria-label={`Open image: ${item.caption}`}
    >
      {item.image ? (
        <SpriteBox image={item.image} label={item.caption} className="gallery-tile__img" />
      ) : (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--dark-3)' }} />
      )}
      <span className="gallery-tile__overlay">
        {item.type === 'video' && (
          <span style={{ marginBottom: 4 }}>
            <Badge tone="neon">Video Film</Badge>
          </span>
        )}
        <span className="gallery-tile__cat">{item.category}</span>
        <span className="gallery-tile__cap">{item.caption}</span>
      </span>
    </button>
  );
}

/* ================= Gallery Collection Card ================= */

export function GalleryCollectionCard({ collection }: { collection: GalleryCollection }) {
  const cfg = GALLERY_PAGE_CONFIG;
  const count = collection.mediaItems?.length ?? 0;
  const coverMedia = collection.mediaItems?.[0];

  return (
    <article className="event-card event-card--dark" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/gallery/${collection.slug || collection.id}`} className="event-card__media-link" aria-label={`View gallery collection: ${collection.title}`}>
        <div className="event-card__media" style={{ aspectRatio: '16 / 9' }}>
          {coverMedia?.image ? (
            <SpriteBox image={coverMedia.image} label={`${collection.title} cover`} className="event-card__img" />
          ) : (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--dark-3)' }} />
          )}
          <span className="event-card__status event-card__status--upcoming" style={{ background: 'rgba(10,11,11,0.85)', color: 'var(--white)' }}>
            {collection.type === 'event' || collection.type === 'event_gallery' ? cfg.badges.eventGallery : cfg.badges.randomGallery}
          </span>
        </div>
      </Link>
      <div className="event-card__body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="event-card__title">
          <Link to={`/gallery/${collection.slug || collection.id}`}>{collection.title}</Link>
        </h3>
        <p className="event-card__desc" style={{ flex: 1 }}>{collection.description}</p>
        <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted-on-dark)' }}>{cfg.cardLabels.itemsCount(count)}</span>
          <Button to={`/gallery/${collection.slug || collection.id}`} size="sm" variant="primary" icon="arrow-right">
            {cfg.cardLabels.viewGallery}
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ================= Award Card ================= */

export function AwardCard({ award }: { award: Award }) {
  const cfg = AWARDS_PAGE_CONFIG;

  return (
    <article className="event-block" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
      {award.coverImage && (
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--dark-3)',
          }}
        >
          <SpriteBox image={award.coverImage} label={`${award.title} cover`} style={{ position: 'absolute', inset: 0 }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(10,11,11,0.85))',
            }}
          />
          {award.status && (
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <Badge tone="green">{award.status}</Badge>
            </div>
          )}
        </div>
      )}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8, color: 'var(--white)' }}>
          <Link to={`/awards/${award.slug}`} style={{ color: 'inherit' }}>{award.title}</Link>
        </h3>
        <p style={{ color: 'var(--muted-on-dark)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          {award.description}
        </p>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 8 }}>
        <Button
          to={`/awards/${award.slug}`}
          variant="primary"
          size="sm"
          icon="arrow-right"
          className="btn--block"
        >
          {cfg.cardLabels.viewAward}
        </Button>
      </div>
    </article>
  );
}

/* ================= Award Winner Card ================= */

export function AwardWinnerCard({ winner }: { winner: AwardWinner }) {
  return (
    <article className="speaker-card" style={{ height: '100%' }}>
      {winner.photo ? (
        <SpriteBox image={winner.photo} label={`Photo of ${winner.name}`} className="speaker-card__photo" />
      ) : (
        <MonogramAvatar name={winner.name} className="speaker-card__photo" />
      )}
      <div className="speaker-card__body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Badge tone="green">{winner.year} Winner</Badge>
        </div>
        <h3 className="speaker-card__name">{winner.name}</h3>
        {winner.designation && <p className="speaker-card__role">{winner.designation}</p>}
        {winner.organization && <p className="speaker-card__org">{winner.organization}</p>}
        {winner.bio && (
          <p style={{ fontSize: '0.86rem', color: 'var(--muted-on-dark)', marginTop: 8, lineHeight: 1.5 }}>
            {winner.bio}
          </p>
        )}
        {winner.caption && (
          <p style={{ fontSize: '0.78rem', color: 'var(--primary-green)', marginTop: 8, fontWeight: 600 }}>
            {winner.caption}
          </p>
        )}
      </div>
    </article>
  );
}
