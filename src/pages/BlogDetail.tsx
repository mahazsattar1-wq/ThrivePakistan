import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogsService } from '../services/blogsService';
import { useSeo } from '../hooks';
import type { BlogPost } from '../types';
import { formatDate, formatViews } from '../utils';
import { PageHero } from '../components/page-hero';
import { BlogCard } from '../components/cards';
import { Badge, EmptyState, Reveal, SectionHeader, SpriteBox } from '../components/ui';

export default function BlogDetail() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useSeo({
    title: post ? post.title : 'Article',
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
          author: { '@type': 'Person', name: post.author, description: post.authorRole, additionalNote: 'Mock author (prototype)' },
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
          <span aria-hidden="true">·</span>
          <span>{formatViews(post.views)} views</span>
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
            <div className="article__author">
              <span className="article__author-avatar" aria-hidden="true">{initials}</span>
              <div>
                <strong>{post.author}</strong>
                <span>{post.authorRole}</span>
              </div>
            </div>
            <div className="article__tags">
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
              <SectionHeader eyebrow="Keep reading" title="Related stories" />
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
