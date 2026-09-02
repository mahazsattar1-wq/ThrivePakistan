import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal, useToast } from './feedback';
import { FieldShell, TextInput, SubmitButton, FormSuccess } from './forms';
import { submitForm, validate, required, emailRule } from '../services/formService';
import type { Errors } from '../services/formService';

/**
 * Registration / register-interest dialog shared by event pages & FutureX.
 * Submissions flow through formService → `/api/registration.php` (PHP/MySQL later).
 */
export function RegisterModal({
  open, onClose, eventName,
}: {
  open: boolean;
  onClose: () => void;
  eventName: string;
}) {
  const [values, setValues] = useState({ name: '', email: '', organization: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [message, setMessage] = useState('');
  const { push } = useToast();

  const set = (key: keyof typeof values) => (v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values, {
      name: required('Full name'),
      email: emailRule,
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('loading');
    const res = await submitForm('registration', { ...values, event: eventName });
    setMessage(res.message);
    setState('done');
    push({ title: 'Registration interest recorded', message: `We saved your seat request for ${eventName}.`, tone: 'success' });
  };

  const reset = () => {
    setValues({ name: '', email: '', organization: '' });
    setErrors({});
    setState('idle');
  };

  return (
    <Modal open={open} onClose={onClose} label={`Register interest for ${eventName}`}>
      {state === 'done' ? (
        <FormSuccess
          title="You're on the list!"
          message={message}
          onReset={() => {
            reset();
            onClose();
          }}
        />
      ) : (
        <form className="form" onSubmit={onSubmit} noValidate>
          <div>
            <span className="eyebrow">Registration</span>
            <h3 style={{ marginTop: 8 }}>{eventName}</h3>
            <p style={{ color: 'var(--muted-text)', fontSize: '0.92rem', marginTop: 6 }}>
              Passes open in waves. Register interest and we'll email your wave-one code first.
            </p>
          </div>
          <FieldShell id="reg-name" label="Full name" required error={errors.name}>
            <TextInput
              id="reg-name"
              value={values.name}
              error={!!errors.name}
              placeholder="Your name"
              autoComplete="name"
              onChange={(e) => set('name')(e.target.value)}
            />
          </FieldShell>
          <FieldShell id="reg-email" label="Email" required error={errors.email}>
            <TextInput
              id="reg-email"
              type="email"
              value={values.email}
              error={!!errors.email}
              placeholder="you@example.com"
              autoComplete="email"
              onChange={(e) => set('email')(e.target.value)}
            />
          </FieldShell>
          <FieldShell id="reg-org" label="Organization / University" hint="Optional — helps us reserve community seats.">
            <TextInput
              id="reg-org"
              value={values.organization}
              placeholder="Company, society or campus"
              onChange={(e) => set('organization')(e.target.value)}
            />
          </FieldShell>
          <SubmitButton loading={state === 'loading'}>Register Interest</SubmitButton>
        </form>
      )}
    </Modal>
  );
}
