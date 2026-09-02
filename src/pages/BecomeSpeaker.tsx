import { useState } from 'react';
import type { FormEvent } from 'react';
import { SPEAKING_INTERESTS } from '../data/site';
import { EXPERTISE_FILTERS } from '../data/speakers';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { FieldShell, FormSuccess, Select, SubmitButton, TextArea, TextInput } from '../components/forms';
import { emailRule, minWords, required, submitForm, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Icon, Reveal } from '../components/ui';
import { useToast } from '../components/feedback';

const INITIAL = { name: '', email: '', organization: '', expertise: '', interest: '', profile: '' };

const WHY = [
  { icon: 'mic' as const, title: 'Rooms that listen', text: 'Our audiences arrive to learn and hire — speakers report their best conversations happen in the hallway after.' },
  { icon: 'trend' as const, title: 'National reach', text: 'Sessions are filmed, cut and published across the Thrive video channel and newsletter.' },
  { icon: 'users' as const, title: 'Peer bench', text: 'Join a speaker community of 100+ practitioners who swap notes, referrals and collaborations year-round.' },
  { icon: 'shield' as const, title: 'Curated, not sold', text: 'Slots are chosen by practitioner chairs for evidence and craft — never sold to the highest bidder.' },
];

export default function BecomeSpeaker() {
  useSeo({
    title: 'Become a Speaker',
    description: 'Apply to speak at Thrive Pakistan platforms — FutureX, leadership summits, Women Thrive, campus tours and workshops. Sessions are curated by practitioner chairs.',
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
      organization: required('Organization'),
      expertise: required('Expertise'),
      interest: required('Event interest'),
      profile: minWords('Profile', 15),
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setState('loading');
    const res = await submitForm('speaker', values);
    setMessage(res.message);
    setState('done');
    push({ title: 'Speaker profile submitted', message: 'The program team reviews every submission.', tone: 'success' });
  };

  return (
    <>
      <PageHero
        eyebrow="Speak at Thrive"
        title="Take a stage that works as hard as you do."
        lead="We curate speakers who share practice — decisions, data, failures and playbooks — not slideware."
        crumbs={[{ label: 'Become a Speaker' }]}
        meta={[
          { icon: 'mic', label: '100+ speakers hosted' },
          { icon: 'spark', label: '6 platforms to speak on' },
        ]}
      />

      <section className="section section--tight">
        <div className="container benefits-grid band--4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="benefit-card benefit-card--light">
                <span className="benefit-card__icon"><Icon name={w.icon} size={20} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we invite + what we ask */}
      <section className="section section--light">
        <div className="container grid grid--2" style={{ alignItems: 'start', gap: 'clamp(26px,4vw,54px)' }}>
          <Reveal>
            <div className="event-block">
              <h3>Who we invite</h3>
              <ul className="role-chips">
                {[
                  { icon: 'briefcase' as const, l: 'CEOs & executives' },
                  { icon: 'rocket' as const, l: 'Founders & co-founders' },
                  { icon: 'chip' as const, l: 'Technology leaders' },
                  { icon: 'campus' as const, l: 'Academics & researchers' },
                  { icon: 'trend' as const, l: 'Entrepreneurs & operators' },
                  { icon: 'shield' as const, l: 'Government & institutional reps' },
                  { icon: 'star' as const, l: 'Industry experts' },
                  { icon: 'tools' as const, l: 'Trainers & coaches' },
                ].map((x) => (
                  <li key={x.l}><Icon name={x.icon} size={15} /> {x.l}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="event-block">
              <h3>What we ask speakers</h3>
              <ul className="highlights-list">
                <li><Icon name="check" size={16} /> Evidence over endorsement: decisions, data, failures and playbooks</li>
                <li><Icon name="check" size={16} /> No sales pitches from the main stage — product stories belong in the expo</li>
                <li><Icon name="check" size={16} /> Stay for Q&A and hallway conversations; that is where impact happens</li>
                <li><Icon name="check" size={16} /> Consent to professional recording for the Thrive video channel</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container form-split">
          <Reveal className="form-split__intro">
            <span className="eyebrow">Speaker submission</span>
            <h2>Tell us what you'd teach the room.</h2>
            <p style={{ color: 'var(--muted-on-dark)' }}>
              Share your expertise and the session you'd run. The program team reviews submissions before
              every event cycle and replies with next steps — usually a 20-minute format conversation.
            </p>
            <ul className="highlights-list">
              <li><Icon name="check" size={16} /> Keynotes, panels, workshops & labs</li>
              <li><Icon name="check" size={16} /> Travel support for out-of-city speakers</li>
              <li><Icon name="check" size={16} /> Professional session recording provided</li>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="form-panel form-panel--dark">
              {state === 'done' ? (
                <FormSuccess title="Profile received!" message={message} onReset={() => { setValues(INITIAL); setState('idle'); }} />
              ) : (
                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="form__grid">
                    <FieldShell id="s-name" label="Name" required error={errors.name}>
                      <TextInput id="s-name" value={values.name} error={!!errors.name} autoComplete="name" placeholder="Your full name" onChange={(e) => set('name')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="s-email" label="Email" required error={errors.email}>
                      <TextInput id="s-email" type="email" value={values.email} error={!!errors.email} autoComplete="email" placeholder="you@example.com" onChange={(e) => set('email')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="s-org" label="Organization" required error={errors.organization}>
                      <TextInput id="s-org" value={values.organization} error={!!errors.organization} placeholder="Company, lab or institution" onChange={(e) => set('organization')(e.target.value)} />
                    </FieldShell>
                    <FieldShell id="s-exp" label="Expertise" required error={errors.expertise}>
                      <Select id="s-exp" value={values.expertise} error={!!errors.expertise} options={EXPERTISE_FILTERS} onChange={(e) => set('expertise')(e.target.value)} />
                    </FieldShell>
                    <div className="field--full">
                      <FieldShell id="s-interest" label="Event interest" required error={errors.interest}>
                        <Select id="s-interest" value={values.interest} error={!!errors.interest} options={SPEAKING_INTERESTS} onChange={(e) => set('interest')(e.target.value)} />
                      </FieldShell>
                    </div>
                    <div className="field--full">
                      <FieldShell id="s-profile" label="Profile & session idea" required error={errors.profile} hint="Who you are, what you've built, and the session you'd run (min 15 words)">
                        <TextArea id="s-profile" value={values.profile} error={!!errors.profile} placeholder="I lead payments infrastructure at… I'd run a workshop on…" onChange={(e) => set('profile')(e.target.value)} />
                      </FieldShell>
                    </div>
                  </div>
                  <SubmitButton loading={state === 'loading'}>Submit speaker profile</SubmitButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
