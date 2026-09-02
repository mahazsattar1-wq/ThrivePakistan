import { useSeo } from '../hooks';
import { PageHero } from '../components/page-hero';

export function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy',
    description: 'How Thrive Pakistan handles information collected through this website prototype.',
  });
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: 'Privacy Policy' }]} />
      <section className="section section--tight">
        <div className="container prose">
          <p>
            This website is a frontend prototype. Forms on this site (contact, partnership, speaker,
            volunteer, registration and newsletter) are wired to placeholder PHP endpoints and, in the
            prototype deployment, do not persist personal data to any database.
          </p>
          <h2>What the production system will collect</h2>
          <ul>
            <li>Information you submit through forms: name, email, phone, organization and message content.</li>
            <li>Newsletter email addresses for community updates.</li>
            <li>Anonymous usage metrics used to improve events and pages.</li>
          </ul>
          <h2>How it will be used</h2>
          <ul>
            <li>To respond to inquiries and process registrations and applications.</li>
            <li>To send event updates you explicitly subscribed to.</li>
            <li>Never sold to third parties.</li>
          </ul>
          <h2>Your controls</h2>
          <p>
            You will be able to request export or deletion of your submissions by contacting the
            organization through the contact page. Authentication and sensitive operations will be
            handled server-side by the PHP/MySQL backend.
          </p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  useSeo({
    title: 'Terms',
    description: 'Terms of use for the Thrive Pakistan website prototype.',
  });
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" crumbs={[{ label: 'Terms' }]} />
      <section className="section section--tight">
        <div className="container prose">
          <p>
            By using this website you agree to these terms. This deployment is a frontend prototype:
            content such as events, speakers, team members, partners, statistics and articles is
            illustrative mock data unless explicitly verified by the organization.
          </p>
          <h2>Content & branding</h2>
          <ul>
            <li>The Thrive Pakistan and FutureX logos are the organization's brand assets.</li>
            <li>Illustrations and portraits on this prototype are generated placeholders, not real individuals.</li>
            <li>Partner brand marks are fictional examples created for layout purposes.</li>
          </ul>
          <h2>Acceptable use</h2>
          <ul>
            <li>Do not attempt to disrupt, scrape aggressively or misuse form endpoints.</li>
            <li>Event registration on this prototype does not constitute a confirmed ticket.</li>
          </ul>
          <h2>Liability</h2>
          <p>
            The prototype is provided as-is for evaluation. Production terms will accompany the live
            PHP/MySQL deployment and administrative dashboard.
          </p>
        </div>
      </section>
    </>
  );
}
