import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BLOG_CATEGORIES } from '../data/blogs';
import { blogsService } from '../services/blogsService';
import { useDebouncedValue, useSeo } from '../hooks';
import type { BlogPost } from '../types';
import { formatDate, formatViews } from '../utils';
import { PageHero } from '../components/page-hero';
import { BlogCard } from '../components/cards';
import { Button, CardSkeleton, EmptyState, Icon, Pagination, Reveal } from '../components/ui';

const PAGE_SIZE = 6;

export default function Blog() {
  useSeo({
    title: 'Blog & News',
    description: 'The Thrive Pakistan newsroom — field notes, playbooks and stories on technology, leadership, entrepreneurship, youth, women and community.',
  });

  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'all';
  const sort = (params.get('sort') as 'newest' | 'popular') ?? 'newest';
  const [query, setQuery] = useState(params.get('q') ?? '');
  const debounced = useDebouncedValue(query, 250);
  const [page, setPage] = useState(1);

  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [popular, setPopular] = useState<BlogPost[]>([]);

  const filters = useMemo(() => ({ category, query: debounced, sort }), [category, debounced, sort]);

  useEffect(() => {
    let alive = true;
    setPosts(null);
    blogsService.list(filters).then((list) => alive && setPosts(list));
    return () => {
      alive = false;
    };
  }, [filters]);

  useEffect(() => {
    let alive = true;
    blogsService.popular(4).then((list) => alive && setPopular(list));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, debounced, sort]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all' || value === 'newest') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const pages = posts ? Math.max(1, Math.ceil(posts.length / PAGE_SIZE)) : 1;
  const visible = posts ? posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : null;
  const featuredPost = posts?.find((p) => p.featured && category === 'all' && !debounced && page === 1);
  const gridPosts = visible?.filter((p) => p.slug !== featuredPost?.slug) ?? [];

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Stories & playbooks from the field."
        lead="Written by practitioners — event directors, investors, volunteers and community leads — not by a marketing bot."
        crumbs={[{ label: 'Blog' }]}
        meta={[
          { icon: 'spark', label: '8 categories' },
          { icon: 'eye', label: '90K+ reads' },
        ]}
      />

      <section className="section section--tight">
        <div className="container blog-layout">
          <div>
            <div className="filter-bar" role="group" aria-label="Blog filters">
              <div className="searchbar" style={{ maxWidth: 420 }}>
                <span className="searchbar__icon"><Icon name="search" size={17} /></span>
                <input
                  className="searchbar__input"
                  type="search"
                  placeholder="Search articles…"
                  value={query}
                  aria-label="Search articles"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setParam('q', e.target.value);
                  }}
                />
              </div>
              <div className="filter-bar__chips">
                <button
                  type="button"
                  className={`chip ${category === 'all' ? 'chip--active' : ''}`}
                  onClick={() => setParam('category', 'all')}
                  aria-pressed={category === 'all'}
                >
                  All
                </button>
                {BLOG_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`chip ${category === c ? 'chip--active' : ''}`}
                    onClick={() => setParam('category', c)}
                    aria-pressed={category === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="filter-bar__selects">
                <select className="filter-select" value={sort} onChange={(e) => setParam('sort', e.target.value)} aria-label="Sort articles">
                  <option value="newest">Newest first</option>
                  <option value="popular">Most popular</option>
                </select>
              </div>
            </div>

            {posts === null || visible === null ? (
              <div className="grid grid--2">
                {[0, 1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <EmptyState
                title="No articles found."
                message="Nothing matches this search or category yet — try another topic."
                actionLabel="Clear filters"
                onAction={() => {
                  setParams(new URLSearchParams(), { replace: true });
                  setQuery('');
                }}
                icon="spark"
              />
            ) : (
              <>
                {featuredPost && (
                  <div style={{ marginBottom: 24 }}>
                    <BlogCard post={featuredPost} featured />
                  </div>
                )}
                <div className="grid grid--2">
                  {gridPosts.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 2) * 80}>
                      <BlogCard post={p} />
                    </Reveal>
                  ))}
                </div>
                <Pagination page={page} pages={pages} onChange={setPage} />
              </>
            )}
          </div>

          <aside className="blog-aside">
            <div className="aside-card">
              <h4>Most read</h4>
              <ol className="popular-list">
                {popular.map((p, i) => (
                  <li key={p.id}>
                    <span className="popular-list__rank">{i + 1}</span>
                    <div>
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                      <span>{formatViews(p.views)} views · {formatDate(p.date)}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="aside-card">
              <h4>Categories</h4>
              <div className="filter-bar__chips" style={{ marginTop: 4 }}>
                {BLOG_CATEGORIES.map((c) => (
                  <button key={c} type="button" className={`chip ${category === c ? 'chip--active' : ''}`} onClick={() => setParam('category', c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="aside-card aside-card--dark">
              <h4>Write for us</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-on-dark)' }}>
                Practitioners with a story or playbook: the newsroom is open.
              </p>
              <Button to="/contact" variant="outline-light" size="sm" icon="arrow-right">Pitch a story</Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
