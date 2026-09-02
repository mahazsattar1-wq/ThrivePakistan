import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BRAND } from '../brand';
import { NAV_ITEMS, SOCIAL_LINKS } from '../nav';
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
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const location = useLocation();
  useBodyLock(mobileOpen);

  useEffect(() => {
    setOpenDrop(null);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDrop(null);
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
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container container--wide">
        <Link to="/" className="nav__logo" aria-label="Thrive Pakistan — home">
          <img src={BRAND.logoWhite} alt="Thrive Pakistan" width={168} height={38} />
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
                      className="nav__link nav__link--parent"
                      aria-expanded={openDrop === item.label}
                      aria-haspopup="true"
                      onClick={() => setOpenDrop(openDrop === item.label ? null : item.label)}
                    >
                      {item.label}
                      <Icon name="chevron-down" size={14} className="nav__caret" />
                    </button>
                    <div className="nav__drop" role="menu" aria-label={`${item.label} submenu`}>
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
            type="button"
            className="nav__burger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu__scrim" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__head">
            <img src={BRAND.logoWhite} alt="Thrive Pakistan" width={140} height={32} />
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <Icon name="close" size={22} />
            </button>
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
                        aria-expanded={mobileSection === item.label}
                        onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                      >
                        {item.label}
                        <Icon name="chevron-down" size={16} className={`mnav__caret ${mobileSection === item.label ? 'mnav__caret--open' : ''}`} />
                      </button>
                      <div className={`mnav__children ${mobileSection === item.label ? 'mnav__children--open' : ''}`}>
                        <div>
                          {item.to && <Link to={item.to}>All {item.label}</Link>}
                          {item.children.map((c) => (
                            <Link key={c.to + c.label} to={c.to}>{c.label}</Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={item.to ?? '/'} className="mnav__parent mnav__parent--link">{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot">
            <Button to="/become-a-partner" className="btn--block">Partner With Us</Button>
            <Link to="/search" className="mobile-menu__search">
              <Icon name="search" size={16} /> Search events, speakers, stories…
            </Link>
          </div>
        </div>
      </div>
    </header>
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
              <img src={BRAND.logoWhite} alt="Thrive Pakistan" width={176} height={40} />
            </Link>
            <p>
              Thrive Pakistan creates events, experiences, learning opportunities and networks that connect
              young people, professionals, innovators, leaders and organizations across the country.
            </p>
            <p className="footer__tagline">{BRAND.tagline}</p>
            <ul className="footer__socials">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Thrive Pakistan on ${s.label}`}>
                    <Icon name={s.id as 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok'} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <h4 className="footer__title">Explore</h4>
            <ul className="footer__links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/futurex">FutureX 2026</Link></li>
              <li><Link to="/speakers">Speakers</Link></li>
              <li><Link to="/team">Team</Link></li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Media">
            <h4 className="footer__title">Media</h4>
            <ul className="footer__links">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/videos">Videos</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/impact">Impact</Link></li>
              <li><Link to="/partners">Partners</Link></li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Get involved">
            <h4 className="footer__title">Get Involved</h4>
            <ul className="footer__links">
              <li><Link to="/become-a-partner">Become a Partner</Link></li>
              <li><Link to="/become-a-speaker">Become a Speaker</Link></li>
              <li><Link to="/volunteer">Become a Volunteer</Link></li>
              <li><Link to="/contact">Contact</Link></li>
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
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
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
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
