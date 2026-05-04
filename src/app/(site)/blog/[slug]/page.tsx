import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getAllPosts, getPostBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import styles from './post.module.css'

// IMPORTANT: Pre-generate all static pages for the static export
export async function generateStaticParams() {
  const posts = await getAllPosts()
  if (!posts || posts.length === 0) {
    return [{ slug: 'coming-soon' }]
  }
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export const dynamicParams = false;

// Generate per-post SEO tags
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug)
  if (!post) return {}

  const title = post.seo?.metaTitle || `${post.title} | Agrolocale Blog`
  const description = post.seo?.metaDescription || post.excerpt || 'Read this insight on Agrolocale.'
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : [],
      images: post.coverImage ? [urlFor(post.coverImage).width(1200).height(630).url()] : [],
    },
  }
}

// Custom Portable Text components (e.g. for images inside the rich text body)
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <div className={styles.ptImage}>
          <Image
            alt={value.alt || 'Blog image'}
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            width={800}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug)
  if (!post) notFound()

  // JSON-LD structured data for Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.coverImage ? [urlFor(post.coverImage).url()] : [],
    datePublished: post.publishedAt,
    author: [{ '@type': 'Person', name: post.author || 'Agrolocale Team' }],
  }

  return (
    <main className={styles.postPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        {/* ── HERO ── */}
        <header className={styles.postHero}>
          {post.coverImage && (
            <div className={styles.heroBg}>
              <Image
                src={urlFor(post.coverImage).width(1920).height(1080).url()}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.meta}>
                <span className={styles.category}>{post.categories?.[0] || 'Article'}</span>
                <span className={styles.date}>
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              
              <div className={styles.authorRow}>
                <div className={styles.authorAvatar}>
                  {post.author ? post.author.charAt(0) : 'A'}
                </div>
                <span className={styles.authorName}>{post.author || 'Agrolocale Team'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── BODY ── */}
        <div className={styles.articleContainer}>
          <div className={styles.portableText}>
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className={styles.articleFooter}>
          <Link href="/blog" className={styles.backBtn}>
            ← Back to All Articles
          </Link>
        </footer>
      </article>
    </main>
  )
}
