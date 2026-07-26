import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './blog.module.css'
import { getAllPosts } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: 'Blog & Insights | Agrolocale',
  description: "Expert insights, market trends, and news on agricultural land investment and farming in Nigeria.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className={styles.blogHero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Agrolocale <em>Insights</em>
            </h1>
            <p className={styles.heroSub}>
              Expert analysis, market trends, and essential guides for agricultural land investment in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ───────────────────────────────────── */}
      <section className={styles.mainContent}>
        <div className="container">
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className={styles.card}>
                  <div className={styles.imageWrap}>
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(400).url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', background: '#f5f7f5' }}>
                        🌾
                      </div>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{post.categories?.[0] || 'Article'}</span>
                      <span className={styles.date}>
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className={styles.title}>{post.title}</h2>
                    <p className={styles.excerpt}>{post.excerpt || 'Read the full article...'}</p>
                    
                    <div className={styles.footer}>
                      <span className={styles.author}>{post.author || 'Agrolocale Team'}</span>
                      <span className={styles.readMore}>Read Article →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
