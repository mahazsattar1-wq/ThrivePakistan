import { useState } from 'react';
import type { FormEvent } from 'react';
import { VOLUNTEER_AREAS, VOLUNTEER_BENEFITS } from '../data/site';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { FieldShell, FormSuccess, Select, SubmitButton, TextInput } from '../components/forms';
import { emailRule, phoneRule, required, submitForm, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Button, Icon, Reveal, SectionHeader } from '../components/ui';
import type { IconName } from '../components/ui';
import { useToast } from '../components/feedback';
import { TESTIMONIALS } from '../data/stats';

const INITIAL = { name: '', email: '', phone: '', city: '', skills: '', area: '' };

const EVENT_ROLES = [
  'Stage & session runners',
  'Registration desk hosts',
  'Speaker liaisons',
  'Expo floor coordinators',
];

const COMMUNITY_ROLES = [
  'City chapter leads',
  'Society partnership scouts',
  'Mentor-circle coordinators',
  'Community moderators',
];

const MEDIA_ROLES = [
  'Event photographers',
  'Short-form video editors',
  'Live social coverage',
  'Story writers & diarists',
];

export default function Volunteer() {
  useSeo({
    title: 'Volunteers',
    description: 'Join the Thrive Pakistan volunteer community — event management, marketing, photography, social media, community management, registration desk and technical roles.',
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
      city: required('City'),
      area: required('Area of interest'),
      skills: required('Skills'),
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setState('loading');
    const res = await submitForm('volunteer', values);
    setMessage(res.message);
    setState('done');
    push({ title: 'Volunteer application received', message: 'Welcome — onboarding details are on the way.', tone: 'success' });
  };

  return (
    <>
      <PageHero
        eyebrow="Volunteer community"
        title="Join the Thrive Pakistan volunteer community."
        lead="300+ volunteers across 10 cities run our stages, desks, cameras and community rooms. This is where operations skills, friendships and careers begin."
        crumbs={[{ label: 'Volunteers' }]}
        meta={[
          { icon: 'users', label: '300+ active volunteers' },
          { icon: 'badge', label: 'Certified experience' },
          { icon: 'door', label: 'First access to roles' },
        ]}
      />

      {/* Why volunteer */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Why volunteer" title="What you actually get." />
          </Reveal>
          <div className="benefits-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {VOLUNTEER_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <div className="benefit-card benefit-card--light">
                  <span className="benefit-card__icon"><Icon name={b.icon as IconName} size={20} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader dark eyebrow="Where you can plug in" title="Areas & roles open right now." />
          </Reveal>
          <ul className="role-chips" style={{ marginBottom: 30 }}>
            {VOLUNTEER_AREAS.map((a) => (
              <li key={a}><Icon name="check" size={15} /> {a}</li>
            ))}
          </ul>
          <div className="grid grid--3">
            {[
              { title: 'Event roles', items: EVENT_ROLES },
              { title: 'Community roles', items: COMMUNITY_ROLES },
              { title: 'Media roles', items: MEDIA_ROLES },
            ].map((group, i) => (
              <Reveal key={group.title} delay={i * 90}>
                <div className="benefit-card">
                  <h3>{group.title}</h3>
                  <ul className="tier-card__benefits" style={{ marginTop: 6 }}>
                    {group.items.map((r) => (
                      <li key={r} style={{ color: 'var(--muted-on-dark)' }}><Icon name="arrow-right" size={14} /> {r}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section">
        <div className="container form-split">
          <Reveal className="form-split__intro">
            <span className="eyebrow">Registration</span>
            <h2>Raise your hand.</h2>
            <p style={{ color: 'var(--muted-text)' }}>
              Tell us your city, skills and the area you want to try first. The community lead onboards new
              volunteers in weekly cohorts — you'll shadow one event before owning a role.
            </p>
            <figure className="testimonial-card" style={{ marginTop: 8 }}>
              <Icon name="quote" size={20} className="testimonial-card__quote" />
              <blockquote>{TESTIMONIALS[5].quote}</blockquote>
              <figcaption>
                <strong>{TESTIMONIALS[5].name}</strong>
                <span>{TESTIMONIALS[5].role}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <div className="form-panel">
              {state === 'done' ? (
                <FormSuccess title="Welcome to the community!" message={message} onReset={() => { setValues(INITIAL); setState('idle'); }} />
              ) : (
                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="form__grid">
                    <FieldShell id="v-name" label="Name" required error={errors.name}>
                      <TextInput id="v-name" value={values.name} error={!!errors.name} autoComplete="name" placeholder="Your full name" onChange={(e) => set('name')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="v-email" label="Email" required error={errors.email}>
                      <TextInput id="v-email" type="email" value={values.email} error={!!errors.email} autoComplete="email" placeholder="you@example.com" onChange={(e) => set('email')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="v-phone" label="Phone" error={errors.phone} hint="Optional but helps for event-day coordination">
                      <TextInput id="v-phone" type="tel" value={values.phone} error={!!errors.phone} placeholder="+92 3xx xxxxxxx" onChange={(e) => set('phone')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="v-city" label="City" required error={errors.city}>
                      <TextInput id="v-city" value={values.city} error={!!errors.city} placeholder="e.g. Lahore" onChange={(e) => set('city')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="v-area" label="Area of interest" required error={errors.area}>
                      <Select id="v-area" value={values.area} error={!!errors.area} options={VOLUNTEER_AREAS} onChange={(e) => set('area')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="v-skills" label="Skills" required error={errors.skills} hint="e.g. photography, public speaking, Excel, crowd management">
                      <TextInput id="v-skills" value={values.skills} error={!!errors.skills} placeholder="Your strongest skills" onChange={(e) => set('skills')(e.target.value)} />
                    </FieldShell>
                  </div>
                  <SubmitButton loading={state === 'loading'}>Join the volunteer community</SubmitButton>
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
            <h2>Not ready to volunteer yet?</h2>
            <p style={{ marginTop: 10 }}>Attend an event first — most volunteers say the first visit decided it.</p>
            <div className="cta-band__ctas">
              <Button to="/events" icon="arrow-right">Explore events</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
