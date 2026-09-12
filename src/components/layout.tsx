import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BRAND } from '../brand';
import { NAV_ITEMS, SOCIAL_LINKS } from '../nav';
import type { NavItem } from '../nav';
import { useBodyLock, useScrolled } from '../hooks';
import { submitForm, emailRule, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Icon, Button } from './ui';
import { useToast } from './feedback';
import { FieldShell, TextInput } from './forms';

/* ================= Scroll restoration ================= */

export function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);
  return null;
}

/* ================= Navbar ================= */

export function Navbar() {
  const scrolled = useScrolled(10);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  useBodyLock(mobileOpen);

  /** A dropdown parent is highlighted when one of its children matches the route. */
  const parentActive = (item: NavItem): boolean => {
    const path = location.pathname;
    return (item.children ?? []).some((c) => {
      const base = c.to.split('?')[0];
      return path === base || path.startsWith(`${base}/`);
    });
  };

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    setOpenDrop(null);
    closeMobile();
  }, [location.pathname, location.search, closeMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) {
          closeMobile();
          burgerRef.current?.focus();
        } else {
          setOpenDrop(null);
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.nav__item')) setOpenDrop(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [mobileOpen, closeMobile]);

  // Focus management for mobile drawer: focus close button on open, trap Tab
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    // Focus close button after animation
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 120);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener('keydown', onKeyDown as unknown as EventListener);
    return () => {
      clearTimeout(id);
      panel.removeEventListener('keydown', onKeyDown as unknown as EventListener);
    };
  }, [mobileOpen]);

  const toggleMobileSection = (label: string) => {
    setMobileSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner container container--wide">
          <Link to="/" className="nav__logo" aria-label="Thrive Pakistan — home">
            <img
              src={BRAND.logoWhite}
              alt="Thrive Pakistan"
              width={168}
              height={38}
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={`nav__item ${openDrop === item.label ? 'nav__item--open' : ''}`}
                  onMouseEnter={() => item.children && setOpenDrop(item.label)}
                  onMouseLeave={() => item.children && setOpenDrop(null)}
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className={`nav__link nav__link--parent ${parentActive(item) ? 'nav__link--active' : ''}`}
                        aria-expanded={openDrop === item.label}
                        aria-haspopup="true"
                        aria-controls={`drop-${item.label}`}
                        onClick={() => setOpenDrop(openDrop === item.label ? null : item.label)}
                      >
                        {item.label}
                        <Icon name="chevron-down" size={14} className="nav__caret" />
                      </button>
                      <div id={`drop-${item.label}`} className="nav__drop" role="menu" aria-label={`${item.label} submenu`}>
                        {item.to && (
                          <Link className="nav__drop-link nav__drop-link--head" to={item.to} role="menuitem">
                            All {item.label}
                          </Link>
                        )}
                        {item.children.map((child) => (
                          <Link key={child.to + child.label} className="nav__drop-link" to={child.to} role="menuitem">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.to ?? '/'}
                      className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                      end={item.to === '/'}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <Link to="/search" className="nav__search" aria-label="Search Thrive Pakistan">
              <Icon name="search" size={18} />
            </Link>
            <Button to="/become-a-partner" size="sm" className="nav__cta">Partner With Us</Button>
            <button
              ref={burgerRef}
              type="button"
              className={`nav__burger ${mobileOpen ? 'nav__burger--open' : ''}`}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — portal to body so position: fixed is unconstrained by header backdrop-filter */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!mobileOpen}>
            <div className="mobile-menu__scrim" onClick={closeMobile} aria-hidden="true" />
            <div
              ref={panelRef}
              id="mobile-drawer"
              className="mobile-menu__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="mobile-menu__head">
                <Link to="/" onClick={closeMobile} aria-label="Thrive Pakistan — home">
                  <img src={BRAND.logoWhite} alt="Thrive Pakistan" width={140} height={32} decoding="async" />
                </Link>
                <button ref={closeBtnRef} type="button" onClick={closeMobile} aria-label="Close navigation" className="mobile-menu__close">
                  <Icon name="close" size={22} />
                </button>
              </div>
              <div className="mobile-menu__cta-wrap">
                <Button to="/become-a-partner" variant="primary" size="md" className="btn--block mobile-menu__cta-btn" onClick={closeMobile}>
                  Partner With Us
                </Button>
              </div>
              <nav className="mobile-menu__nav" aria-label="Mobile">
                <ul>
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label} className="mnav__group">
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            className="mnav__parent"
                            aria-expanded={!!mobileSections[item.label]}
                            aria-controls={`mnav-${item.label}`}
                            onClick={() => toggleMobileSection(item.label)}
                          >
                            <span>{item.label}</span>
                            <Icon name="chevron-down" size={16} className={`mnav__caret ${mobileSections[item.label] ? 'mnav__caret--open' : ''}`} />
                          </button>
                          <div id={`mnav-${item.label}`} className={`mnav__children ${mobileSections[item.label] ? 'mnav__children--open' : ''}`}>
                            <div>
                              {item.to && (
                                <Link to={item.to} onClick={closeMobile} className="mnav__child-head">
                                  All {item.label}
                                </Link>
                              )}
                              {item.children.map((c) => (
                                <Link key={c.to + c.label} to={c.to} onClick={closeMobile}>
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link to={item.to ?? '/'} className="mnav__parent mnav__parent--link" onClick={closeMobile}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mobile-menu__foot">
                <Link to="/search" className="mobile-menu__search" onClick={closeMobile}>
                  <Icon name="search" size={16} /> Search events, speakers, stories…
                </Link>
                <div className="mobile-menu__foot-meta">
                  <a href="mailto:partnerships@thrivepakistan.com">
                    <Icon name="mail" size={14} /> partnerships@thrivepakistan.com
                  </a>
                  <span>
                    <Icon name="pin" size={14} /> Hazara, Khyber Pakhtunkhwa
                  </span>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/* ================= Footer ================= */

function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const { push } = useToast();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors: Errors = validate({ email }, { email: emailRule });
    setError(errors.email);
    if (errors.email) return;
    setState('loading');
    const res = await submitForm('newsletter', { email });
    setState('done');
    push({ title: 'Subscribed', message: res.message, tone: 'success' });
  };

  if (state === 'done') {
    return (
      <p className="footer__news-done">
        <Icon name="check" size={16} /> You're on the list — see you in your inbox.
      </p>
    );
  }
  return (
    <form className="footer__news" onSubmit={onSubmit} noValidate>
      <FieldShell id="footer-news-email" label="Newsletter" error={error}>
        <div className="footer__news-row">
          <TextInput
            id="footer-news-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            error={!!error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn--primary btn--sm" disabled={state === 'loading'} aria-label="Subscribe to newsletter">
            {state === 'loading' ? <span className="spinner" aria-hidden="true" /> : <Icon name="send" size={15} />}
          </button>
        </div>
      </FieldShell>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" aria-label="Thrive Pakistan — home">
              <img src={BRAND.logoWhite} alt="Thrive Pakistan" width={176} height={40} decoding="async" loading="lazy" />
            </Link>
            <p className="footer__tagline">{BRAND.tagline}</p>
            <ul className="footer__contact">
              <li>
                <a href="mailto:partnerships@thrivepakistan.com">
                  <Icon name="mail" size={15} /> partnerships@thrivepakistan.com
                </a>
              </li>
              <li>
                <a href="https://www.thrivepakistan.com" target="_blank" rel="noopener noreferrer">
                  <Icon name="globe" size={15} /> thrivepakistan.com
                </a>
              </li>
              <li>
                <span>
                  <Icon name="pin" size={15} /> Hazara, Khyber Pakhtunkhwa, Pakistan
                </span>
              </li>
            </ul>
            <ul className="footer__socials">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Thrive Pakistan on ${s.label}`}>
                    <Icon name={s.id as 'globe' | 'mail'} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <h4 className="footer__title">Explore</h4>
            <ul className="footer__links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/programs">Focus Areas</Link>
              </li>
              <li>
                <Link to="/speakers">Speakers</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Media">
            <h4 className="footer__title">Media</h4>
            <ul className="footer__links">
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/videos">Videos</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/impact">Impact</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Get involved">
            <h4 className="footer__title">Get Involved</h4>
            <ul className="footer__links">
              <li>
                <Link to="/become-a-partner">Become a Partner</Link>
              </li>
              <li>
                <Link to="/become-a-speaker">Become a Speaker</Link>
              </li>
              <li>
                <Link to="/volunteer">Become a Volunteer</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <div className="footer__col footer__col--news">
            <FooterNewsletter />
            <p className="footer__news-note">Event waves, volunteer calls and community updates. No spam, ever.</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Thrive Pakistan. All rights reserved.</p>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ================= Layout shell ================= */

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}