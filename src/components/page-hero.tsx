import type { ReactNode } from 'react';
import { spriteStyle } from '../media';
import type { ImageRef } from '../types';
import { Icon } from './ui';
import type { IconName } from './ui';
import { Breadcrumbs } from './ui';

export interface PageHeroMeta {
  icon: IconName;
  label: string;
}

/** Shared interior-page hero: dark canvas, optional artwork, crumbs + meta. */
export function PageHero({
  eyebrow, title, lead, meta = [], crumbs = [], image, children, center,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  meta?: PageHeroMeta[];
  crumbs?: { label: string; to?: string }[];
  image?: ImageRef;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <section className="page-hero">
      {image && <div className="page-hero__bg" style={spriteStyle(image)} aria-hidden="true" />}
      <div className="page-hero__glow" aria-hidden="true" />
      <div className={`container page-hero__inner ${center ? 'page-hero--center' : ''}`.trim()}>
        {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && <h1>{title}</h1>}
        {lead && <p className="page-hero__lead">{lead}</p>}
        {meta.length > 0 && (
          <ul className="page-hero__meta">
            {meta.map((m) => (
              <li key={m.label}>
                <Icon name={m.icon} size={15} />
                {m.label}
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </section>
  );
}
