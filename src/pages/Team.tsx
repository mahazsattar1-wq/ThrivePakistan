import { useState } from 'react';
import { TEAM } from '../data/team';
import { useSeo } from '../hooks';
import type { TeamMember } from '../types';
import { PageHero } from '../components/page-hero';
import { MonogramAvatar, TeamCard } from '../components/cards';
import { Badge, Button, Reveal, SectionHeader, SpriteBox } from '../components/ui';
import { Modal } from '../components/feedback';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useSeo({
    title: 'Leadership',
    description:
      'The confirmed Thrive Pakistan leadership roster, featuring executive and functional leads accountable for direction, execution, partnerships, events, outreach, inclusion, and operations.',
  });

  const executive = TEAM.filter((m) => m.group === 'executive');
  const functional = TEAM.filter((m) => m.group !== 'executive');

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Youth-led, professionally accountable."
        lead="Thrive Pakistan combines the energy of student and community teams with defined executive ownership, reporting, and documentation: every major task has one accountable owner."
        crumbs={[{ label: 'Team' }]}
        meta={[
          { icon: 'users', label: '4 executive leads' },
          { icon: 'shield', label: '9 functional leads' },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Executive leadership" title="Direction & delivery." />
          </Reveal>
          <div className="grid grid--4">
            {executive.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 80}>
                <TeamCard member={m} onClick={setSelectedMember} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Functional leadership" title="The people who run the platform." />
          </Reveal>
          <div className="grid grid--3">
            {functional.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 70}>
                <TeamCard member={m} onClick={setSelectedMember} />
              </Reveal>
            ))}
          </div>
          <p style={{ marginTop: 26, fontSize: '0.84rem', color: 'var(--muted-text)', maxWidth: '78ch' }}>
            Official photographs of the leadership team will be published as they become available. Until
            then, initials are shown instead of any substitute imagery.
          </p>
        </div>
      </section>

      <section className="section cta-band">
        <span className="cta-band__glow" aria-hidden="true" />
        <div className="container cta-band__inner">
          <Reveal>
            <h2>Work with this team.</h2>
            <p style={{ marginTop: 10 }}>
              Institutions, partners, speakers and volunteers collaborate with the leadership on every
              platform Thrive Pakistan builds.
            </p>
            <div className="cta-band__ctas">
              <Button to="/become-a-partner" icon="arrow-right">Partner With Us</Button>
              <Button to="/volunteer" variant="outline-light">Join as a volunteer</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Member Profile Modal */}
      <Modal open={selectedMember !== null} onClose={() => setSelectedMember(null)} label="Leadership profile" size="md">
        {selectedMember && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {selectedMember.portrait ? (
                <SpriteBox image={selectedMember.portrait} label={`Portrait of ${selectedMember.name}`} style={{ width: 72, height: 72, borderRadius: '50%', flexShrink: 0 }} />
              ) : (
                <MonogramAvatar name={selectedMember.name} className="person-hero__photo" />
              )}
              <div>
                <Badge tone="green">{selectedMember.group === 'executive' ? 'Executive Lead' : 'Functional Lead'}</Badge>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--white)', marginTop: 4 }}>
                  {selectedMember.name}
                </h3>
                <p style={{ color: 'var(--primary-green)', fontSize: '0.92rem', fontWeight: 600 }}>
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: 14 }}>
              <strong style={{ color: 'var(--white)', fontSize: '0.92rem', display: 'block', marginBottom: 4 }}>
                Functional Focus:
              </strong>
              <p style={{ color: 'var(--muted-on-dark)', fontSize: '0.9rem' }}>{selectedMember.focus}</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-dark)', paddingTop: 14 }}>
              <strong style={{ color: 'var(--white)', fontSize: '0.92rem', display: 'block', marginBottom: 4 }}>
                Accountability & Responsibilities:
              </strong>
              <p style={{ color: '#d4dddc', fontSize: '0.9rem', lineHeight: 1.6 }}>{selectedMember.bio}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <Button onClick={() => setSelectedMember(null)} variant="outline-light" size="sm">
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
