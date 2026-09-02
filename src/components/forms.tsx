import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon } from './ui';

/* Shared, accessible form controls used by every Thrive Pakistan form. */

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldShell({ id, label, error, hint, required, children }: FieldShellProps) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span className="field__req" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { id: string; error?: boolean };

export function TextInput({ id, error, ...rest }: TextInputProps) {
  return (
    <input
      id={id}
      className="field__input"
      aria-invalid={error || undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...rest}
    />
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; error?: boolean };

export function TextArea({ id, error, ...rest }: TextAreaProps) {
  return (
    <textarea
      id={id}
      className="field__input field__textarea"
      aria-invalid={error || undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...rest}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  error?: boolean;
  options: readonly string[];
  placeholder?: string;
};

export function Select({ id, error, options, placeholder = 'Select an option', ...rest }: SelectProps) {
  return (
    <select
      id={id}
      className="field__input field__select"
      aria-invalid={error || undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export function SubmitButton({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={loading}>
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span>Sending…</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <Icon name="send" size={16} className="btn__ic" />
        </>
      )}
    </button>
  );
}

export function FormSuccess({ title, message, onReset }: { title: string; message: string; onReset?: () => void }) {
  return (
    <div className="form-success" role="status">
      <span className="form-success__icon"><Icon name="check" size={22} /></span>
      <h3>{title}</h3>
      <p>{message}</p>
      {onReset && (
        <button type="button" className="btn btn--outline btn--sm" onClick={onReset}>
          Send another response
        </button>
      )}
    </div>
  );
}
