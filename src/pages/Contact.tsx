import { useState } from 'react';
import type { FormEvent } from 'react';
import { CONTACT_INFO } from '../data/site';
import { ORG } from '../data/org';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { FieldShell, FormSuccess, SubmitButton, TextArea, TextInput } from '../components/forms';
import { emailRule, minWords, phoneRule, required, submitForm, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Icon, Reveal } from '../components/ui';
import { useToast } from '../components/feedback';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

/** Direct official channels — verified against the organizational documents. */
const DIRECT_CHANNELS = [
  {
    icon: 'handshake' as const,
    title: 'Partnerships',
    detail: 'Institutions, industry, sponsors & collaborators',
    email: CONTACT_INFO.email,
  },
  {
    icon: 'globe' as const,
    title: 'Marketing & Media',
    detail: 'Campaigns, press & media collaboration',
    email: CONTACT_INFO.emailMarketing,
  },
  {
    icon: 'briefcase' as const,
    title: 'Managing Director',
    detail: 'MD-level communication',
    email: CONTACT_INFO.emailMd,
    phone: CONTACT_INFO.phoneMd,
  },
  {
    icon: 'spark' as const,
    title: 'Chief Executive Officer',
    detail: 'CEO-level correspondence',
    email: CONTACT_INFO.emailCeo,
    phone: CONTACT_INFO.phoneCeo,
  },
];

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Contact Thrive Pakistan for partnerships, marketing and media, and direct channels to the Managing Director and CEO. Based in Hazara, Khyber Pakhtunkhwa.',
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
      email: emailRule,
      phone: phoneRule,
      subject: required('Subject'),
      message: minWords('Message', 8),
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setState('loading');
    const res = await submitForm('contact', values);
    setMessage(res.message);
    setState('done');
    push({ title: 'Message sent', message: 'Thank you for reaching out, the relevant team will follow up.', tone: 'success' });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building."
        lead="Partnerships, media, campus collaboration, volunteering or a question about FutureX 2026: reach the right team directly."
        crumbs={[{ label: 'Contact' }]}
      />

      {/* Direct channels */}
      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--4">
            {DIRECT_CHANNELS.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="info-card" style={{ height: '100%', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                  <span className="info-card__icon"><Icon name={c.icon} size={20} /></span>
                  <div>
                    <strong>{c.title}</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: 4 }}>{c.detail}</p>
                    <a href={`mailto:${c.email}`} style={{ display: 'inline-block', marginTop: 8, fontSize: '0.86rem' }}>{c.email}</a>
                    {c.phone && (
                      <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{ display: 'block', marginTop: 4, fontSize: '0.86rem' }}>
                        {c.phone}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Org info + form */}
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="info-cards">
              <div className="info-card">
                <span className="info-card__icon"><Icon name="pin" size={20} /></span>
                <div>
                  <strong>Base</strong>
                  <p>{ORG.name} is based in {CONTACT_INFO.base}.</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card__icon"><Icon name="globe" size={20} /></span>
                <div>
                  <strong>Website</strong>
                  <a href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer">{CONTACT_INFO.website.replace('https://', '')}</a>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card__icon"><Icon name="users" size={20} /></span>
                <div>
                  <strong>Social</strong>
                  <p>{CONTACT_INFO.social}</p>
                </div>
              </div>
              <div className="map-box">
                <span className="map-box__grid" aria-hidden="true" />
                <span className="map-box__pin">
                  <Icon name="pin" size={30} />
                  Hazara, Khyber Pakhtunkhwa, Pakistan
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="form-panel">
              {state === 'done' ? (
                <FormSuccess title="Message received!" message={message} onReset={() => { setValues(INITIAL); setState('idle'); }} />
              ) : (
                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="form__grid">
                    <FieldShell id="c-name" label="Name" required error={errors.name}>
                      <TextInput id="c-name" value={values.name} error={!!errors.name} autoComplete="name" placeholder="Your full name" onChange={(e) => set('name')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="c-email" label="Email" required error={errors.email}>
                      <TextInput id="c-email" type="email" value={values.email} error={!!errors.email} autoComplete="email" placeholder="you@example.com" onChange={(e) => set('email')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="c-phone" label="Phone" error={errors.phone} hint="Optional">
                      <TextInput id="c-phone" type="tel" value={values.phone} error={!!errors.phone} placeholder="+92 3xx xxxxxxx" onChange={(e) => set('phone')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="c-subject" label="Subject" required error={errors.subject}>
                      <TextInput id="c-subject" value={values.subject} error={!!errors.subject} placeholder="Partnership, media, campus…" onChange={(e) => set('subject')(e.target.value)} />
                    </FieldShell>
                    <div className="field--full">
                      <FieldShell id="c-message" label="Message" required error={errors.message} hint="Min 8 words so we can route you correctly">
                        <TextArea id="c-message" value={values.message} error={!!errors.message} placeholder="Tell us what you need…" onChange={(e) => set('message')(e.target.value)} />
                      </FieldShell>
                    </div>
                  </div>
                  <SubmitButton loading={state === 'loading'}>Send message</SubmitButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
