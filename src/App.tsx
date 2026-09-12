import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout, ScrollToTop } from './components/layout';
import { ToastProvider } from './components/feedback';

import Home from './pages/Home';

/* Route-level code splitting: interior pages load on demand. */
const About = lazy(() => import('./pages/About'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const Speakers = lazy(() => import('./pages/Speakers'));
const SpeakerDetail = lazy(() => import('./pages/SpeakerDetail'));
const Team = lazy(() => import('./pages/Team'));
const Partners = lazy(() => import('./pages/Partners'));
const BecomePartner = lazy(() => import('./pages/BecomePartner'));
const BecomeSpeaker = lazy(() => import('./pages/BecomeSpeaker'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Videos = lazy(() => import('./pages/Videos'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Impact = lazy(() => import('./pages/Impact'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(async () => ({ default: (await import('./pages/Legal')).PrivacyPolicy }));
const Terms = lazy(async () => ({ default: (await import('./pages/Legal')).Terms }));

function PageFallback() {
  return (
    <div className="section" aria-busy="true">
      <div className="container" style={{ display: 'grid', gap: 16, justifyItems: 'center', paddingBlock: 60 }}>
        <span className="spinner" style={{ width: 26, height: 26, borderColor: 'rgba(67,183,73,.3)', borderTopColor: 'var(--primary-green)' }} />
        <p className="sr-only">Loading page…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events mode="overview" />} />
            <Route path="/events/upcoming" element={<Events mode="upcoming" />} />
            <Route path="/events/past" element={<Events mode="past" />} />
            <Route path="/events/seminars" element={<Events mode="seminars" />} />
            <Route path="/events/workshops" element={<Events mode="workshops" />} />
            <Route path="/events/tours-trips" element={<Events mode="tours-trips" />} />
            <Route path="/events/tours" element={<Events mode="tours-trips" />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/futurex" element={<Navigate to="/events/futurex-2026" replace />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/speakers/:slug" element={<SpeakerDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/become-a-partner" element={<BecomePartner />} />
            <Route path="/become-a-speaker" element={<BecomeSpeaker />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:slug" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ToastProvider>
  );
}
