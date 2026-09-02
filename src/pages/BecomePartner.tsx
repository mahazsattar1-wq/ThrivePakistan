import { useState } from 'react';
import type { FormEvent } from 'react';
import { PARTNER_BENEFITS, PARTNER_TIERS } from '../data/partners';
import { ORGANIZATION_TYPES, PARTNERSHIP_INTERESTS } from '../data/site';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { FieldShell, FormSuccess, Select, SubmitButton, TextArea, TextInput } from '../components/forms';
import { emailRule, minWords, phoneRule, required, submitForm, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Button, Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';
import { useToast } from '../components/feedback';

const INITIAL = {
  name: '',
  organization: '',
  email: '',
  phone: '',
  orgType: '',
  interest: '',
  message: '',
};

export default function BecomePartner() {
  useSeo({
    title: 'Become a Partner',
    description: 'Partner with Thrive Pakistan: brand visibility, audience access, speaking opportunities, talent pipelines and measurable community impact across a national event calendar.',
  });

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [message, setMessage] = useState('');
  const { push } = useToast();

  const set = (key: keyof typeof INITIAL) => (v: string) => setValues((p) => ({ ...p, [key]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values, {
      name: required('Name'),
      organization: required('Organization'),
      email: emailRule,
      phone: phoneRule,
      orgType: required('Organization type'),
      interest: required('Partnership interest'),
      message: minWords('Message', 10),
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setState('loading');
    const res = await submitForm('partner', values);
    setMessage(res.message);
    setState('done');
    push({ title: 'Partnership request sent', message: 'Our partnerships lead will be in touch.', tone: 'success' });
  };

  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Why partner with Thrive Pakistan?"
        lead="Because your brand meets the exact rooms you need: builders, decision-makers, students and communities — in person, at national scale, with measurable outcomes."
        crumbs={[{ label: 'Partners', to: '/partners' }, { label: 'Become a Partner' }]}
        meta={[
          { icon: 'users', label: '15,000+ participants / year' },
          { icon: 'calendar', label: 'Season-long visibility' },
          { icon: 'trend', label: 'Impact & CSR reporting' },
        ]}
      />

      {/* Benefits */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="What we offer partners"
              title="Nine ways partnership pays for itself."
            />
          </Reveal>
          <div className="benefits-grid">
            {PARTNER_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 70}>
                <div className="benefit-card">
                  <span className="benefit-card__icon"><Icon name={b.icon as IconName} size={20} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              center
              eyebrow="Partnership tiers"
              title="Three ways to stand with us."
              lead="Tiers are examples for conversation — every partnership is shaped around your goals. No public pricing by design."
            />
          </Reveal>
          <div className="tiers-grid">
            {PARTNER_TIERS.map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <div className={`tier-card ${t.highlight ? 'tier-card--highlight' : ''}`}>
                  {t.highlight && <span className="tier-card__flag">Most chosen</span>}
                  <h3>{t.name}</h3>
                  <p className="tier-card__desc">{t.description}</p>
                  <ul className="tier-card__benefits">
                    {t.benefits.map((b) => (
                      <li key={b}><Icon name="check" size={16} /> {b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section section--light">
        <div className="container form-split">
          <Reveal className="form-split__intro">
            <span className="eyebrow">Start a partnership conversation</span>
            <h2>Tell us what you're building toward.</h2>
            <p style={{ color: 'var(--muted-text)' }}>
              Share your goals and our partnerships lead will come back with a shaped proposal —
              visibility plan, talent access, impact metrics and the events where your brand does its best work.
            </p>
            <ul className="highlights-list">
              <li><Icon name="clock" size={16} /> Replies within two working days</li>
              <li><Icon name="shield" size={16} /> Your details stay with the partnerships team</li>
              <li><Icon name="handshake" size={16} /> No obligation — conversations first</li>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="form-panel">
              {state === 'done' ? (
                <FormSuccess title="Partnership request received!" message={message} onReset={() => { setValues(INITIAL); setState('idle'); }} />
              ) : (
                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="form__grid">
                    <FieldShell id="p-name" label="Name" required error={errors.name}>
                      <TextInput id="p-name" value={values.name} error={!!errors.name} autoComplete="name" placeholder="Your full name" onChange={(e) => set('name')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="p-org" label="Organization" required error={errors.organization}>
                      <TextInput id="p-org" value={values.organization} error={!!errors.organization} autoComplete="organization" placeholder="Company or institution" onChange={(e) => set('organization')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="p-email" label="Email" required error={errors.email}>
                      <TextInput id="p-email" type="email" value={values.email} error={!!errors.email} autoComplete="email" placeholder="you@company.com" onChange={(e) => set('email')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="p-phone" label="Phone" error={errors.phone} hint="Optional">
                      <TextInput id="p-phone" type="tel" value={values.phone} error={!!errors.phone} autoComplete="tel" placeholder="+92 3xx xxxxxxx" onChange={(e) => set('phone')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="p-type" label="Organization type" required error={errors.orgType}>
                      <Select id="p-type" value={values.orgType} error={!!errors.orgType} options={ORGANIZATION_TYPES} onChange={(e) => set('orgType')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="p-interest" label="Partnership interest" required error={errors.interest}>
                      <Select id="p-interest" value={values.interest} error={!!errors.interest} options={PARTNERSHIP_INTERESTS} onChange={(e) => set('interest')(e.target.value)} />
                    </FieldShell>
                    <div className="field--full">
                      <FieldShell id="p-message" label="Message" required error={errors.message} hint="What outcomes matter to you? (min 10 words)">
                        <TextArea id="p-message" value={values.message} error={!!errors.message} placeholder="We want to reach engineering students across Punjab and support women founders…" onChange={(e) => set('message')(e.target.value)} />
                      </FieldShell>
                    </div>
                  </div>
                  <SubmitButton loading={state === 'loading'}>Start a Partnership Conversation</SubmitButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Prefer to talk first?</h2>
            <p style={{ marginTop: 10 }}>Book a call with the partnerships team through the contact page.</p>
            <div className="cta-band__ctas">
              <Button to="/contact" icon="arrow-right">Contact us</Button>
              <Button to="/partners" variant="outline-light">Meet current partners</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
