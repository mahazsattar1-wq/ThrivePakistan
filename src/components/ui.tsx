import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown, useCountUp, useInView } from '../hooks';
import { spriteStyle } from '../media';
import type { ImageRef, Partner, Statistic } from '../types';

/* ================= Icons ================= */

export type IconName =
  | 'arrow-right' | 'arrow-left' | 'calendar' | 'pin' | 'clock' | 'users' | 'mic' | 'search'
  | 'menu' | 'close' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'check' | 'mail'
  | 'phone' | 'play' | 'external' | 'globe' | 'spark' | 'chip' | 'compass' | 'women' | 'campus'
  | 'rocket' | 'tools' | 'map' | 'quote' | 'star' | 'trophy' | 'heart' | 'leaf' | 'shield'
  | 'bulb' | 'target' | 'handshake' | 'trend' | 'door' | 'eye' | 'badge' | 'briefcase' | 'send'
  | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'x';

const ICONS: Record<IconName, { fill?: boolean; node: ReactNode }> = {
  'arrow-right': { node: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></> },
  'arrow-left': { node: <><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></> },
  calendar: { node: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></> },
  pin: { node: <><path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11z" /><path d="M9.5 10a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /></> },
  clock: { node: <><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 7v5l3 3" /></> },
  users: { node: <><path d="M5.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" /><path d="M2.5 19a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" /><path d="M17.5 13.6a6.5 6.5 0 0 1 4 5.4" /></> },
  mic: { node: <><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></> },
  search: { node: <><path d="M4 11a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M20 20l-3.5-3.5" /></> },
  menu: { node: <path d="M4 7h16M4 12h16M4 17h16" /> },
  close: { node: <path d="M6 6l12 12M18 6L6 18" /> },
  'chevron-down': { node: <path d="M6 9l6 6 6-6" /> },
  'chevron-left': { node: <path d="M15 6l-6 6 6 6" /> },
  'chevron-right': { node: <path d="M9 6l6 6-6 6" /> },
  check: { node: <path d="M5 13l4 4L19 7" /> },
  mail: { node: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></> },
  phone: { node: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /> },
  play: { fill: true, node: <path d="M8 5v14l11-7z" /> },
  external: { node: <><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></> },
  globe: { node: <><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M3 12h18" /><path d="M12 3a13 13 0 0 1 0 18a13 13 0 0 1 0-18z" /></> },
  spark: { node: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /> },
  chip: { node: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></> },
  compass: { node: <><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M15 9l-2.5 5.5L7 17l2.5-5.5z" /></> },
  women: { node: <><path d="M7 9a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M12 14v8M8.5 18.5h7" /></> },
  campus: { node: <><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M9 21v-6h6v6" /><path d="M12 3v2" /></> },
  rocket: { node: <><path d="M12 2c3 2 5 6 5 10l3 3-3 1-1 3-2-2h-4l-2 2-1-3-3-1 3-3c0-4 2-8 5-10z" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></> },
  tools: { node: <path d="M21 7a5 5 0 0 1-7 4.6L7 18.6A2.4 2.4 0 0 1 3.6 15.2L10.4 8.4A5 5 0 0 1 17 3l-3 3 1 2 2 1z" /> },
  map: { node: <><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></> },
  quote: { node: <><path d="M8 12c-2 0-3-1.5-3-3s1.5-3 3-3 3 1.2 3 3c0 3-2 6-5 8" /><path d="M19 12c-2 0-3-1.5-3-3s1.5-3 3-3 3 1.2 3 3c0 3-2 6-5 8" /></> },
  star: { fill: true, node: <path d="M12 3l2.7 5.8 6.3.8-4.6 4.3 1.2 6.1-5.6-3-5.6 3 1.2-6.1L3 9.6l6.3-.8z" /> },
  trophy: { node: <><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 5H5a3 3 0 0 0 3 4" /><path d="M16 5h3a3 3 0 0 1-3 4" /><path d="M12 13v4M8 21h8M10 17h4v4h-4z" /></> },
  heart: { node: <path d="M12 20s-7-4.6-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.4-9 9-9 9z" /> },
  leaf: { node: <><path d="M4 20c8 0 16-6 16-16-10 0-16 8-16 16z" /><path d="M4 20c4-6 8-10 12-12" /></> },
  shield: { node: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /> },
  bulb: { node: <><path d="M12 3a6 6 0 0 1 4 10c-.8.7-1 1.5-1 2h-6c0-.5-.2-1.3-1-2a6 6 0 0 1 4-10z" /><path d="M9 18h6M10 21h4" /></> },
  target: { node: <><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M10.5 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" /></> },
  handshake: { node: <><path d="M3 11l4-4 5 4 5-4 4 4" /><path d="M7 15l3 3 2-2 2 2 3-3" /></> },
  trend: { node: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></> },
  door: { node: <><path d="M4 21h16" /><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" /><path d="M14 12h.01" /></> },
  eye: { node: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></> },
  badge: { node: <><path d="M7 9a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M9 13l-2 8 5-3 5 3-2-8" /></> },
  briefcase: { node: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></> },
  send: { node: <><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></> },
  facebook: { fill: true, node: <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.23H7.4V14h2.75v8z" /> },
  instagram: { node: <><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M17.2 6.8h.01" /></> },
  linkedin: { fill: true, node: <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v14.5h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1v8.4h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.48v8.66H8V8z" /> },
  youtube: { fill: true, node: <path d="M23 12s0-3.85-.5-5.7c-.28-1.03-1.1-1.85-2.13-2.13C18.55 3.5 12 3.5 12 3.5s-6.55 0-8.37.67C2.6 4.45 1.78 5.27 1.5 6.3 1 8.15 1 12 1 12s0 3.85.5 5.7c.28 1.03 1.1 1.85 2.13 2.13 1.82.67 8.37.67 8.37.67s6.55 0 8.37-.67c1.03-.28 1.85-1.1 2.13-2.13.5-1.85.5-5.7.5-5.7zM9.75 15.5v-7l6 3.5z" /> },
  tiktok: { fill: true, node: <path d="M16.6 5.82A4.8 4.8 0 0 1 15.4 3h-3.2v12.87a2.9 2.9 0 1 1-2.05-2.77V9.83a6.1 6.1 0 1 0 5.25 6.04V9.5a8 8 0 0 0 4.6 1.45V7.75a4.8 4.8 0 0 1-3.4-1.93z" /> },
  x: { fill: true, node: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.84-6.33L5.46 21H2.38l7.17-8.19L2 3h6.33l4.37 5.78zm-1.08 16.16h1.7L7.4 4.74H5.57z" /> },
};

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  const def = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={def.fill ? 'currentColor' : 'none'}
      stroke={def.fill ? 'none' : 'currentColor'}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {def.node}
    </svg>
  );
}

/* ================= Button ================= */

export type ButtonVariant = 'primary' | 'outline' | 'outline-light' | 'light' | 'ghost' | 'green-ghost';

interface ButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconLeft?: IconName;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function Button({
  to, href, onClick, type = 'button', variant = 'primary', size = 'md',
  icon, iconLeft, disabled, className = '', ariaLabel, children,
}: ButtonProps) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim();
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={size === 'sm' ? 15 : 17} className="btn__ic" />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={size === 'sm' ? 15 : 17} className="btn__ic" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/* ================= Badge / chips ================= */

export function Badge({ children, tone = 'green', className = '' }: { children: ReactNode; tone?: 'green' | 'dark' | 'light' | 'outline' | 'neon'; className?: string }) {
  return <span className={`badge badge--${tone} ${className}`.trim()}>{children}</span>;
}

/* ================= Section header ================= */

export function SectionHeader({
  eyebrow, title, lead, dark, center, action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className={`section-head ${dark ? 'section-head--dark' : ''} ${center ? 'section-head--center' : ''}`.trim()}>
      <div className="section-head__main">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {lead && <p className="section-head__lead">{lead}</p>}
      </div>
      {action && <div className="section-head__action">{action}</div>}
    </div>
  );
}

/* ================= Scroll reveal ================= */

export function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    <Tag ref={ref as never} className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

/* ================= Sprite image box ================= */

export function SpriteBox({
  image, label, className = '', style,
}: {
  image: ImageRef;
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`sprite ${className}`.trim()}
      style={{ ...spriteStyle(image), ...style }}
    />
  );
}

/* ================= Stat counter ================= */

export function StatCounter({ stat, dark }: { stat: Statistic; dark?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const value = useCountUp(stat.value, inView);
  return (
    <div ref={ref} className={`stat ${dark ? 'stat--dark' : ''}`.trim()}>
      <span className="stat__value">
        {value.toLocaleString('en-US')}
        <em>{stat.suffix}</em>
      </span>
      <span className="stat__label">{stat.label}</span>
      <span className="stat__desc">{stat.description}</span>
    </div>
  );
}

/* ================= Countdown ================= */

export function Countdown({ targetIso, compact }: { targetIso: string; compact?: boolean }) {
  const { days, hours, minutes, seconds, done } = useCountdown(targetIso);
  if (done) {
    return <p className="countdown__done">The event is live — see you inside!</p>;
  }
  const cells = [
    { v: days, l: 'Days' },
    { v: hours, l: 'Hours' },
    { v: minutes, l: 'Minutes' },
    { v: seconds, l: 'Seconds' },
  ];
  return (
    <div className={`countdown ${compact ? 'countdown--compact' : ''}`} role="timer" aria-label="Countdown to event start">
      {cells.map((c) => (
        <div className="countdown__cell" key={c.l}>
          <span className="countdown__num">{String(c.v).padStart(2, '0')}</span>
          <span className="countdown__label">{c.l}</span>
        </div>
      ))}
    </div>
  );
}

/* ================= Empty / skeleton states ================= */

export function EmptyState({
  title, message, actionLabel, onAction, icon = 'search',
}: {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: IconName;
}) {
  return (
    <div className="empty" role="status">
      <span className="empty__icon"><Icon name={icon} size={26} /></span>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function CardSkeleton({ dark }: { dark?: boolean }) {
  return (
    <div className={`skeleton-card ${dark ? 'skeleton-card--dark' : ''}`} aria-hidden="true">
      <Skeleton className="skeleton-card__media" />
      <div className="skeleton-card__body">
        <Skeleton className="skeleton-card__line skeleton-card__line--sm" />
        <Skeleton className="skeleton-card__line" />
        <Skeleton className="skeleton-card__line skeleton-card__line--md" />
      </div>
    </div>
  );
}

/* ================= Breadcrumbs ================= */

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`}>
            <span className="breadcrumbs__sep" aria-hidden="true">/</span>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ================= Pagination ================= */

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <Icon name="chevron-left" size={16} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          type="button"
          key={p}
          className={`pagination__btn ${p === page ? 'pagination__btn--active' : ''}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="pagination__btn"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <Icon name="chevron-right" size={16} />
      </button>
    </nav>
  );
}

/* ================= Partner mark (generated typographic logo) ================= */

const GLYPH_SHAPES = ['M12 3l8 18H4z', 'M12 3l9 9-9 9-9-9z', 'M4 4h16v16H4z', 'M12 2l8.66 5v10L12 22l-8.66-5V7z'];

export function PartnerMark({ partner, index, dark }: { partner: Partner; index: number; dark?: boolean }) {
  const initials = partner.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`partner-mark ${dark ? 'partner-mark--dark' : ''}`} title={`${partner.name} — ${partner.category} partner (mock)`}>
      <svg viewBox="0 0 24 24" className="partner-mark__glyph" aria-hidden="true">
        <path d={GLYPH_SHAPES[index % GLYPH_SHAPES.length]} />
        <text x="12" y="15.5" textAnchor="middle">{initials}</text>
      </svg>
      <span className="partner-mark__name">{partner.name}</span>
    </div>
  );
}
