import { Link } from 'react-router-dom';
import { useSeo } from '../hooks';
import { Button } from '../components/ui';

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you are looking for does not exist. Head back to Thrive Pakistan and keep exploring.',
  });

  return (
    <section className="nf">
      <span className="nf__glow" aria-hidden="true" />
      <div className="nf__inner">
        <span className="nf__code" aria-hidden="true">404</span>
        <h1>Looks like this path hasn't thrived yet.</h1>
        <p>
          The page you're after may have moved, been unpublished, or never existed.
          The ecosystem, however, is very much alive.
        </p>
        <div className="nf__ctas">
          <Button to="/" size="lg" icon="arrow-right">Back to Home</Button>
          <Link to="/events" className="btn btn--outline-light btn--lg">Explore events</Link>
        </div>
      </div>
    </section>
  );
}
