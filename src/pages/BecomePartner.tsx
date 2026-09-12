import { useState } from 'react';
import type { FormEvent } from 'react';
import { COLLABORATION_VALUES, ENGAGEMENT_MODELS } from '../data/partners';
import { ORGANIZATION_TYPES, PARTNERSHIP_INTERESTS } from '../data/site';
import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';
import { FieldShell, FormSuccess, Select, SubmitButton, TextArea, TextInput } from '../components/forms';
import { emailRule, minWords, phoneRule, required, submitForm, validate } from '../services/formService';
import type { Errors } from '../services/formService';
import { Icon, Reveal, SectionHeader } from '../components/ui';
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

/**
 * Sponsorship activation options — propositions from the organizational
 * profile's sponsors section. They describe what collaboration CAN include,
 * not packages that are already sold.
 */
const ACTIVATIONS = [
  { icon: 'trophy' as IconName, t: 'Presenting or strategic partnership', d: 'A visible leadership role in a platform, with agreed deliverables and reporting.' },
  { icon: 'chip' as IconName, t: 'Zone ownership', d: 'Own the AI Lab, Finance Lab, Learning Lab, Career Hub or another relevant zone.' },
  { icon: 'bulb' as IconName, t: 'Challenges & awards', d: 'Back a student innovation challenge, award, scholarship or startup pitch support.' },
  { icon: 'briefcase' as IconName, t: 'Employer activations', d: 'Employer meet & hire, career speed networking or portfolio review sessions.' },
  { icon: 'mic' as IconName, t: 'Expert sessions', d: 'Panel participation, expert sessions or practical workshops where subject fit is strong.' },
  { icon: 'eye' as IconName, t: 'Demonstrations & content', d: 'Technology demonstrations, booth experiences and digital campaign integration.' },
];

export default function BecomePartner() {
  useSeo({
    title: 'Become a Partner',
    description:
      'Partner with Thrive Pakistan to co-build access across education, technology, careers, and entrepreneurship in Hazara and Khyber Pakhtunkhwa. Contact partnerships@thrivepakistan.com.',
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
        title="Co-build access with us."
        lead="Partnership with Thrive Pakistan means translating your institutional goals into visible activities, including labs, workshops, challenges, mentorship, recruitment, and research, with defined ownership and follow-up."
        crumbs={[{ label: 'Partners', to: '/partners' }, { label: 'Become a Partner' }]}
        meta={[
          { icon: 'pin', label: 'Hazara & northern Pakistan' },
          { icon: 'users', label: 'Students · Institutions · Founders · Communities' },
          { icon: 'shield', label: 'Purposeful activation, measurable outcomes' },
        ]}
      />

      {/* Why partner */}
      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Why partnership creates value"
              title="What collaboration with Thrive Pakistan offers."
              lead="We design collaboration as strategic co-building and measurable activation, not passive logo placement."
            />
          </Reveal>
          <div className="grid grid--4">
            {COLLABORATION_VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="benefit-card benefit-card--light" style={{ height: '100%' }}>
                  <span className="benefit-card__icon"><Icon name={v.icon as IconName} size={20} /></span>
                  <h3>{v.title}</h3>
                  <p style={{ color: 'var(--muted-text)' }}>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Ways partners engage"
              title="Pick the layer where you create the most value."
            />
          </Reveal>
          <div className="benefits-grid">
            {ENGAGEMENT_MODELS.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 70}>
                <div className="benefit-card" style={{ height: '100%' }}>
                  <span className="benefit-card__icon"><Icon name="handshake" size={20} /></span>
                  <h3>{m.name}</h3>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship activations */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="FutureX 2026 activations"
              title="What sponsorship can include."
              lead="Activation directions for FutureX 2026, where final structures are agreed in writing with each partner."
            />
          </Reveal>
          <div className="benefits-grid">
            {ACTIVATIONS.map((o, i) => (
              <Reveal key={o.t} delay={(i % 3) * 70}>
                <div className="benefit-card" style={{ height: '100%' }}>
                  <span className="benefit-card__icon"><Icon name={o.icon} size={20} /></span>
                  <h3>{o.t}</h3>
                  <p>{o.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How collaboration works */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <SectionHeader
              center
              eyebrow="How collaboration works"
              title="Professional collaboration begins with clarity and ends with evidence."
            />
          </Reveal>
          <Reveal delay={90}>
            <ol className="approach-list" style={{ gridTemplateColumns: '1fr', marginTop: 18 }}>
              <li><strong>Discover</strong><p>Understand the organization, audience, need and desired outcome.</p></li>
              <li><strong>Fit</strong><p>Identify the right programme, role, activation or collaboration model.</p></li>
              <li><strong>Scope</strong><p>Agree ownership, resources, deliverables, timeline and approvals.</p></li>
              <li><strong>Delivery</strong><p>Execute through accountable teams and official communication channels.</p></li>
              <li><strong>Evidence</strong><p>Document outputs, participation, visibility, learning and follow-up actions.</p></li>
              <li><strong>Continuity</strong><p>Decide together what should continue, scale, improve or stop.</p></li>
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="section section--light">
        <div className="container form-split">
          <Reveal className="form-split__intro">
            <span className="eyebrow">Start a partnership conversation</span>
            <h2>Tell us what you're building toward.</h2>
            <p style={{ color: 'var(--muted-text)' }}>
              Share your goals and our partnerships lead will come back with a scoped proposal with clear contribution, defined ownership, and agreed outcomes.
            </p>
            <ul className="highlights-list">
              <li><Icon name="mail" size={16} /> <a href="mailto:partnerships@thrivepakistan.com">partnerships@thrivepakistan.com</a></li>
              <li><Icon name="shield" size={16} /> Your details stay with the partnerships team</li>
              <li><Icon name="handshake" size={16} /> No obligation, conversations first</li>
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
                        <TextArea id="p-message" value={values.message} error={!!errors.message} placeholder="We want to support AI skills for students in Hazara…" onChange={(e) => set('message')(e.target.value)} />
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
    </>
  );
}
