import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogsService } from '../services/blogsService';
import { useSeo } from '../hooks';
import type { BlogPost } from '../types';
import { formatDate, formatViews } from '../utils';
import { PageHero } from '../components/page-hero';
import { BlogCard } from '../components/cards';
import { Badge, Button, EmptyState, Icon, Reveal, SectionHeader, SpriteBox } from '../components/ui';
import { useToast } from '../components/feedback';

export default function BlogDetail() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const { push } = useToast();

  useSeo({
    title: post ? `${post.title} · Thrive Pakistan Newsroom` : 'Article Details',
    description: post?.excerpt,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          timeRequired: `PT${post.readingTime}M`,
          author: { '@type': 'Organization', name: post.author, description: post.authorRole },
          publisher: { '@type': 'Organization', name: 'Thrive Pakistan' },
          articleSection: post.category,
          keywords: post.tags.join(', '),
        }
      : null,
  });

  useEffect(() => {
    let alive = true;
    setPost(undefined);
    blogsService.getBySlug(slug).then(async (p) => {
      if (!alive) return;
      setPost(p ?? null);
      if (p) {
        const rel = await blogsService.related(p.slug);
        if (alive) setRelated(rel);
      }
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      push({ title: 'Link Copied', message: 'Article link copied to clipboard.', tone: 'success' });
    }
  };

  if (post === undefined) {
    return <PageHero title="Loading article…" crumbs={[{ label: 'Blog', to: '/blog' }, { label: '…' }]} />;
  }

  if (post === null) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState title="Article not found." message="The story may have been unpublished or the link is incorrect." icon="spark" />
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/blog" className="btn btn--primary">Back to the newsroom</Link>
          </p>
        </div>
      </section>
    );
  }

  const initials = post.author.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.category }]}
        eyebrow={post.category}
        title={post.title}
        lead={post.excerpt}
        center
      >
        <div className="article__meta" style={{ justifyContent: 'center' }}>
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
          {post.views > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{formatViews(post.views)} views</span>
            </>
          )}
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <article className="article">
            <SpriteBox image={post.image} label={`Cover illustration: ${post.title}`} className="article__cover" />
            <div className="article__content">
              {post.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Author details & Social sharing */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border-dark)' }}>
              <div className="article__author" style={{ marginTop: 0 }}>
                <span className="article__author-avatar" aria-hidden="true">{initials}</span>
                <div>
                  <strong>{post.author}</strong>
                  <span>{post.authorRole}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--muted-on-dark)' }}>Share article:</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline-light btn--sm"
                  aria-label="Share on LinkedIn"
                  style={{ padding: '6px 12px' }}
                >
                  <Icon name="linkedin" size={15} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline-light btn--sm"
                  aria-label="Share on X"
                  style={{ padding: '6px 12px' }}
                >
                  <Icon name="x" size={14} />
                </a>
                <Button variant="outline-light" size="sm" onClick={handleCopyLink} icon="globe">
                  Copy Link
                </Button>
              </div>
            </div>

            <div className="article__tags" style={{ marginTop: 20 }}>
              {post.tags.map((t) => (
                <Badge key={t} tone="outline">{t}</Badge>
              ))}
            </div>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <Reveal>
              <SectionHeader eyebrow="Keep reading" title="Related articles" />
            </Reveal>
            <div className="grid grid--3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
