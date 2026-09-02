import { useState } from 'react';
import type { FormEvent } from 'react';
import { CONTACT_INFO } from '../data/site';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { FieldShell, FormSuccess, SubmitButton, TextArea, TextInput } from '../components/forms';
import { emailRule, minWords, phoneRule, required, submitForm, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Icon, Reveal } from '../components/ui';
import { useToast } from '../components/feedback';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  useSeo({
    title: 'Contact',
    description: 'Contact Thrive Pakistan — partnerships, media, volunteering, campus programs and event questions. We reply within two working days.',
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
    push({ title: 'Message sent', message: 'We reply within two working days.', tone: 'success' });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building."
        lead="Partnerships, media, campus programs, volunteering or a question about an event — one form, one inbox, real humans."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section section--tight">
        <div className="container contact-grid">
          <Reveal>
            <div className="info-cards">
              <div className="info-card">
                <span className="info-card__icon"><Icon name="mail" size={20} /></span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card__icon"><Icon name="phone" size={20} /></span>
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card__icon"><Icon name="pin" size={20} /></span>
                <div>
                  <strong>Office</strong>
                  <p>{CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card__icon"><Icon name="clock" size={20} /></span>
                <div>
                  <strong>Hours</strong>
                  <p>{CONTACT_INFO.hours}</p>
                </div>
              </div>
              <div className="map-box">
                <span className="map-box__grid" aria-hidden="true" />
                <span className="map-box__pin">
                  <Icon name="pin" size={30} />
                  Islamabad, Pakistan
                  <span style={{ fontSize: '0.76rem', color: 'var(--muted-on-dark)' }}>
                    (Contact details are mock data on this prototype)
                  </span>
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
