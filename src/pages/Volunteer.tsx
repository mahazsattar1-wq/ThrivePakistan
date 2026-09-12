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

const INITIAL = { name: '', email: '', phone: '', city: '', skills: '', area: '' };

const EVENT_ROLES = [
  'Stage & session runners',
  'Registration desk hosts',
  'Speaker liaisons',
  'Participant flow coordination',
];

const COMMUNITY_ROLES = [
  'Campus society coordination',
  'Outreach & registrations support',
  'Participant support',
  'Community moderation',
];

const MEDIA_ROLES = [
  'Event photographers',
  'Short-form video editors',
  'Live social coverage',
  'Story writers',
];

export default function Volunteer() {
  useSeo({
    title: 'Volunteers',
    description: 'Join the Thrive Pakistan volunteer community, spanning event management, marketing, photography, social media, community management, registration desk, and technical roles.',
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
    push({ title: 'Volunteer application received', message: 'Welcome, onboarding details are on the way.', tone: 'success' });
  };

  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Build the platform with us."
        lead="Thrive Pakistan platforms are run by young people across stages, registration, media, outreach, and operations. Volunteering is where responsibility, skills, and professional relationships begin."
        crumbs={[{ label: 'Volunteers' }]}
        meta={[
          { icon: 'users', label: 'Student & community teams' },
          { icon: 'badge', label: 'Real operational roles' },
          { icon: 'door', label: 'Pathways into team leadership' },
        ]}
      />

      {/* Why volunteer */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Why volunteer" title="What you actually get." />
          </Reveal>
          <div className="benefits-grid band--4">
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
            <SectionHeader dark eyebrow="Where you can plug in" title="Areas & example roles." />
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
              Tell us your city, skills and the area you want to try first. Volunteers are onboarded
              through the People &amp; HR function and attached to a functional owner, not left in an
              unstructured group.
            </p>
            <div className="event-block">
              <h4 style={{ marginBottom: 10 }}>What we ask of volunteers</h4>
              <ul className="highlights-list">
                <li><Icon name="check" size={15} /> Show up for your assigned shifts, ensuring the desk never runs short</li>
                <li><Icon name="check" size={15} /> One onboarding and one debrief per event cycle</li>
                <li><Icon name="check" size={15} /> Represent the community code of conduct on and off site</li>
                <li><Icon name="check" size={15} /> Flag conflicts early so cohorts can rebalance</li>
              </ul>
            </div>
            <ul className="role-chips">
              <li><Icon name="users" size={15} /> Attached to a functional owner</li>
              <li><Icon name="badge" size={15} /> Work credited and documented</li>
              <li><Icon name="trend" size={15} /> Feedback on output, deadlines & conduct</li>
            </ul>
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
            <p style={{ marginTop: 10 }}>Attend an event first: most volunteers say the first visit decided it.</p>
            <div className="cta-band__ctas">
              <Button to="/events" icon="arrow-right">Explore events</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
