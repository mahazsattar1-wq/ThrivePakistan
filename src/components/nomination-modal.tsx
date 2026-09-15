import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { AWARDS } from '../data/awards';
import { submitForm } from '../services/formService';
import { Modal } from './feedback';
import { useToast } from './feedback';
import { Button, Icon } from './ui';
import { FieldShell, TextArea, TextInput } from './forms';

interface NominationModalProps {
  open: boolean;
  onClose: () => void;
  defaultAwardSlug?: string;
}

export function NominationModal({ open, onClose, defaultAwardSlug }: NominationModalProps) {
  const { push } = useToast();
  const selectedDefault = AWARDS.find((a) => a.slug === defaultAwardSlug) || AWARDS[0];

  const [awardId, setAwardId] = useState(selectedDefault?.id || AWARDS[0].id);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeType, setNomineeType] = useState('individual');
  const [designation, setDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  const [achievements, setAchievements] = useState('');
  const [impactDetails, setImpactDetails] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');

  const [nominatorName, setNominatorName] = useState('');
  const [nominatorEmail, setNominatorEmail] = useState('');
  const [nominatorRelation, setNominatorRelation] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const selectedAward = AWARDS.find((a) => a.id === awardId) || AWARDS[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nomineeName.trim() || !nomineeEmail.trim() || !achievements.trim()) {
      push({ title: 'Incomplete Nomination', message: 'Please fill in nominee details and justification.', tone: 'error' });
      return;
    }

    setSubmitting(true);
    const res = await submitForm('nomination', {
      awardId,
      awardTitle: selectedAward.title,
      nomineeName,
      nomineeType,
      designation,
      organization,
      nomineeEmail,
      profileUrl,
      achievements,
      impactDetails,
      evidenceUrl,
      nominatorName,
      nominatorEmail,
      nominatorRelation,
    });
    setSubmitting(false);
    setDone(true);
    push({ title: 'Nomination Submitted', message: res.message, tone: 'success' });
  };

  const handleReset = () => {
    setDone(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} label="Nominate an Innovator" size="lg">
      {done ? (
        <div style={{ padding: '24px 0', textAlign: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--primary-green)',
              color: 'var(--dark)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Icon name="check" size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
            Nomination Received
          </h3>
          <p style={{ color: 'var(--muted-on-dark)', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
            Thank you for nominating <strong>{nomineeName}</strong> for the <strong>{selectedAward.title}</strong>. Our awards evaluation committee will review the submission.
          </p>
          <Button onClick={handleReset} variant="primary">
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>
              Award Nomination Form
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)' }}>
              Submit a formal nomination for outstanding technologists, campus catalysts, or innovators.
            </p>
          </div>

          {/* Step 1: Select Award & Dynamic Eligibility Criteria */}
          <div style={{ background: 'var(--dark-2)', padding: 18, borderRadius: 'var(--r-md)', border: '1px solid var(--border-dark)' }}>
            <FieldShell id="nom-award-select" label="1. Select Award Program">
              <select
                id="nom-award-select"
                className="field__input field__select"
                value={awardId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setAwardId(e.target.value)}
              >
                {AWARDS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
            </FieldShell>

            {/* Dynamic Eligibility Panel */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-dark)' }}>
              <strong style={{ fontSize: '0.86rem', color: 'var(--primary-green)', display: 'block', marginBottom: 6 }}>
                Eligibility Criteria for {selectedAward.title}:
              </strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted-on-dark)', marginBottom: 8 }}>
                {selectedAward.eligibility.description}
              </p>
              <ul style={{ display: 'grid', gap: 4, paddingLeft: 18, fontSize: '0.82rem', color: '#d4dddc' }}>
                {selectedAward.eligibility.criteria.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 2: Nominee Information */}
          <div style={{ display: 'grid', gap: 14 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>2. Nominee Information</h3>
            <div className="grid grid--2" style={{ gap: 12 }}>
              <FieldShell id="nom-type" label="Nominee Type">
                <select
                  id="nom-type"
                  className="field__input field__select"
                  value={nomineeType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setNomineeType(e.target.value)}
                >
                  <option value="individual">Individual Innovator / Technologist</option>
                  <option value="startup">Early-Stage Startup</option>
                  <option value="team">Student Project Team</option>
                </select>
              </FieldShell>
              <FieldShell id="nom-name" label="Nominee Full Name / Team Name">
                <TextInput
                  id="nom-name"
                  placeholder="e.g. Ayesha Khan or Team Alpha"
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  required
                />
              </FieldShell>
            </div>

            <div className="grid grid--2" style={{ gap: 12 }}>
              <FieldShell id="nom-email" label="Nominee Contact Email">
                <TextInput
                  id="nom-email"
                  type="email"
                  placeholder="nominee@example.com"
                  value={nomineeEmail}
                  onChange={(e) => setNomineeEmail(e.target.value)}
                  required
                />
              </FieldShell>
              <FieldShell id="nom-role" label="Current Designation / Role">
                <TextInput
                  id="nom-role"
                  placeholder="e.g. Lead Software Engineer"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </FieldShell>
            </div>

            <div className="grid grid--2" style={{ gap: 12 }}>
              <FieldShell id="nom-org" label="Organization / Institution">
                <TextInput
                  id="nom-org"
                  placeholder="e.g. Tech Lab or University"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </FieldShell>
              <FieldShell id="nom-profile" label="Profile or LinkedIn URL">
                <TextInput
                  id="nom-profile"
                  placeholder="https://linkedin.com/in/username"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                />
              </FieldShell>
            </div>
          </div>

          {/* Step 3: Justification & Evidence */}
          <div style={{ display: 'grid', gap: 14 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>3. Reason for Nomination & Impact</h3>
            <FieldShell id="nom-achievements" label="Key Achievements & Contributions">
              <TextArea
                id="nom-achievements"
                rows={3}
                placeholder="Describe what specific technical, leadership, or community contributions make this nominee deserving..."
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                required
              />
            </FieldShell>

            <FieldShell id="nom-impact" label="Impact & Beneficiaries">
              <TextArea
                id="nom-impact"
                rows={2}
                placeholder="Who has benefited from their work? How does their contribution advance technology or community goals in Pakistan?"
                value={impactDetails}
                onChange={(e) => setImpactDetails(e.target.value)}
              />
            </FieldShell>

            <FieldShell id="nom-evidence" label="Supporting Evidence / Project Link (Optional)">
              <TextInput
                id="nom-evidence"
                placeholder="https://github.com/project or project link"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
              />
            </FieldShell>
          </div>

          {/* Step 4: Nominator Contact Information */}
          <div style={{ display: 'grid', gap: 14, paddingTop: 12, borderTop: '1px solid var(--border-dark)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)' }}>4. Nominator Information</h3>
            <div className="grid grid--3" style={{ gap: 12 }}>
              <FieldShell id="nominator-name" label="Your Name">
                <TextInput
                  id="nominator-name"
                  placeholder="Your full name"
                  value={nominatorName}
                  onChange={(e) => setNominatorName(e.target.value)}
                />
              </FieldShell>
              <FieldShell id="nominator-email" label="Your Email">
                <TextInput
                  id="nominator-email"
                  type="email"
                  placeholder="you@example.com"
                  value={nominatorEmail}
                  onChange={(e) => setNominatorEmail(e.target.value)}
                />
              </FieldShell>
              <FieldShell id="nominator-rel" label="Relationship / Role">
                <TextInput
                  id="nominator-rel"
                  placeholder="e.g. Peer / Advisor"
                  value={nominatorRelation}
                  onChange={(e) => setNominatorRelation(e.target.value)}
                />
              </FieldShell>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
            <Button variant="outline-light" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting} icon="send">
              {submitting ? 'Submitting Nomination…' : 'Submit Nomination'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
