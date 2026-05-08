'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/lib/sanity/image'
import styles from './home.module.css'

/* ─── Data ───────────────────────────────────────────── */
const featuredListings = [
  { id: 1, title: 'Paradiso Farms II',                 location: 'Alabata, Ogun State', price: '₦700K/Plot · ₦4M/Acre', acreage: 'Batch B – 2026', type: 'Farm Investment', image: '/products/paradiso_2.jpeg', badge: '🔥 New Launch', badgeKey: 'red',   href: '/listings'            },
  { id: 2, title: 'Paradiso II – Tomato Cultivation',  location: 'Alabata, Ogun State', price: '₦1,100,000 / Plot',     acreage: 'Jun/Jul 2026',   type: 'Farm Produce',    image: '/products/paradiso_1.jpeg', badge: 'Available',    badgeKey: 'green', href: '/listings'            },
  { id: 3, title: 'Paradiso II – Habanero Pepper',     location: 'Alabata, Ogun State', price: '₦1,187,000 / Plot',     acreage: 'Jun/Jul 2026',   type: 'Farm Produce',    image: '/products/paradiso_3.jpeg', badge: 'Available',    badgeKey: 'green', href: '/listings'            },
  { id: 4, title: 'Paradiso II – Sweet Potato',        location: 'Alabata, Ogun State', price: '₦285,000 / Plot',       acreage: 'Jun/Jul 2026',   type: 'Farm Produce',    image: '/products/paradiso_4.jpeg', badge: 'Featured',     badgeKey: 'gold',  href: '/listings'            },
  { id: 5, title: 'Garri Go! – Fresh & Crispy',        location: 'Nationwide Delivery', price: '₦24,590 (25kg)',        acreage: 'In Stock',       type: 'Farm Produce',    image: '/products/garri.jpeg',      badge: '🔥 Hot Cake',   badgeKey: 'red',   href: '/products/garri-go'   },
]

const statsData = [
  { value: 4,   prefix: '',  suffix: '',   label: 'Projects Completed'    },
  { value: 250, prefix: '',  suffix: '+',  label: 'Registered Investors'  },
  { value: 50,  prefix: '',  suffix: '+',  label: 'Hectares Sold Out'     },
  { value: 350, prefix: '',  suffix: '+',  label: 'Households Served'     },
]

const whyItems = [
  { icon: '🔍', title: 'Verified Listings',    desc: 'Every property is physically inspected and legally vetted by our expert agents before listing on our platform.' },
  { icon: '🤝', title: 'Expert Guidance',      desc: 'Dedicated agro-realty consultants guide you through every step — from discovery to title transfer.' },
  { icon: '🌍', title: 'Nationwide Coverage',  desc: 'Discover agricultural land across all 36 states and the FCT with our continuously growing network.' },
  { icon: '🔒', title: 'Secure Transactions',  desc: 'End-to-end legal documentation and title verification protects your investment at every stage.' },
]

const testimonials = [
  { name: 'Adeola Bankole', role: 'Commercial Farmer, Lagos',           initials: 'AB', color: '#1e4530', quote: 'Agrolocale helped me find a 60-acre plantation in Kwara that met every requirement. The process was seamless and their support team was outstanding throughout the entire deal.' },
  { name: 'Ibrahim Musa',   role: 'Agricultural Investor, Abuja',       initials: 'IM', color: '#c9a84c', quote: "I've used several platforms but nothing matches Agrolocale's listing quality and verification rigour. I've made three successful acquisitions through them and I keep coming back." },
  { name: 'Ngozi Okafor',   role: 'Agri-Business Owner, Enugu',         initials: 'NO', color: '#2a6344', quote: 'Found the perfect irrigated farmland in Benue through Agrolocale. Their due-diligence support saved us from potential title issues — the deal closed smoothly and on time.' },
]

const galleryImages = [
  '/gallery-1.png', '/elysian-farm.png', '/bounty-harvest.png', '/gallery-2.png', '/gallery-3.png',
]

/* ─── Animated counter hook ──────────────────────────── */
function useCountUp(target: number, running: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!running) return
    let frame = 0
    const total = 60
    const timer = setInterval(() => {
      frame++
      setCount(Math.round((frame / total) * target))
      if (frame >= total) clearInterval(timer)
    }, 1800 / total)
    return () => clearInterval(timer)
  }, [running, target])
  return count
}

/* ─── Stat item ──────────────────────────────────────── */
function StatItem({ value, prefix, suffix, label, running }: { value: number; prefix: string; suffix: string; label: string; running: boolean }) {
  const count = useCountUp(value, running)
  return (
    <div className={styles.statItem}>
      <div className={styles.statNumber}>{prefix}{count >= 1000 ? count.toLocaleString() : count}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

/* ─── Property card ──────────────────────────────────── */
function PropertyCard({ l }: { l: typeof featuredListings[0] }) {
  const [fav, setFav] = useState(false)
  return (
    <div className={styles.card}>
      <div className={styles.cardImgWrap}>
        <Image src={l.image} alt={l.title} fill sizes="(max-width:768px) 100vw, 33vw" className={styles.cardImg} />
        <span className={`${styles.cardBadge} ${l.badgeKey === 'red' ? styles.badgeRed : l.badgeKey === 'green' ? styles.badgeGreen : styles.badgeGold}`}>{l.badge}</span>
        <button className={styles.cardFav} onClick={() => setFav(v => !v)} aria-label="Save">{fav ? '❤️' : '🤍'}</button>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardType}>{l.type}</p>
        <h3 className={styles.cardTitle}>{l.title}</h3>
        <p className={styles.cardLoc}>📍 {l.location}</p>
        <div className={styles.cardMeta}>
          <span>📐 {l.acreage}</span>
          <span>✅ Verified</span>
        </div>
        <div className={styles.cardFooter}>
          <div>
            <div className={styles.cardPrice}>{l.price}</div>
            <span className={styles.cardPriceNote}>Asking Price</span>
          </div>
          <Link href={l.href} className={styles.cardCta}>View Details</Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────── */
export default function HomeClient({ posts = [] }: { posts?: any[] }) {
  const router = useRouter()
  const [location,   setLocation]   = useState('')
  const [propType,   setPropType]   = useState('')
  const [statsOn,    setStatsOn]    = useState(false)
  const [activeTest, setActiveTest] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)

  /* Intersect stats */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsOn(true); obs.disconnect() } }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  /* Testimonial auto-advance */
  useEffect(() => {
    const t = setInterval(() => setActiveTest(v => (v + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    router.push('/listings')
  }, [router])

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroOverlay} aria-hidden />

        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>🌾 Nigeria's Premier Agro-Realty Platform</span>

            <h1 className={styles.heroTitle}>
              Discover Premium
              <em className={styles.heroTitleAccent}> Agricultural Land</em>
            </h1>

            <p className={styles.heroSub}>
              From fertile arable fields to thriving plantations — find, verify, and acquire the perfect agricultural property for your investment or farming needs.
            </p>

            <form className={styles.searchBar} onSubmit={handleSearch}>
              <input
                id="hero-location"
                className={styles.searchInput}
                type="text"
                placeholder="Search by state or location…"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
              <div className={styles.searchDivider} aria-hidden />
              <select
                id="hero-type"
                className={styles.searchSelect}
                value={propType}
                onChange={e => setPropType(e.target.value)}
              >
                <option value="">All Property Types</option>
                <option value="arable">Arable Farmland</option>
                <option value="plantation">Plantation</option>
                <option value="ranch">Ranch &amp; Pasture</option>
                <option value="irrigated">Irrigated Plot</option>
                <option value="mixed">Mixed Farmland</option>
              </select>
              <button type="submit" className={styles.searchBtn}>🔍 Search Land</button>
            </form>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden>
          <div className={styles.scrollMouse}><div className={styles.scrollDot} /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ─── FEATURED ON BANNER ───────────────────────── */}
      <section className={styles.featuredBanner}>
        <div className="container">
          <div className={styles.featuredGrid}>
            <span className={styles.featuredLabel}>As Featured On</span>
            <span className={styles.featuredLogo}>TVC NEWS</span>
            <span className={styles.featuredLogo}>VANGUARD NEWS</span>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE GROW ─────────────────────────────── */}
      <section className={styles.growSection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={styles.sectionTag}>The Best Taste Is Truly Local</p>
            <h2 className={styles.sectionTitle}>Experience the Freshness Only Our Farm Can Deliver</h2>
            <p className={styles.sectionSub} style={{ margin: '0 auto' }}>
              Explore Our Produce. We cultivate high-quality, organic crops tailored to meet the needs of households and food businesses alike.
            </p>
          </div>
          <div className={styles.produceGrid}>
            {/* HOT CAKE — Tomato Batch B */}
            <div className={styles.produceCard}>
              <div className={styles.produceImgWrap}>
                <Image
                  src="/products/paradiso_1.jpeg"
                  alt="Paradiso Farms II – Tomato Cultivation"
                  fill
                  sizes="(max-width:768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className={styles.produceBadgeHot}>🔥 Hot Cake</span>
                <span className={styles.produceBadgeAvail}>Batch B – Jun/Jul 2026</span>
              </div>
              <div className={styles.produceBody}>
                <h3 className={styles.produceName}>Paradiso II – Tomato Cultivation</h3>
                <p className={styles.produceDesc}>
                  Batch B cultivation commencing June/July 2026 at Alabata, Ogun State. Per Plot: ₦1,100,000 total. Per Acre: ₦6,300,000 total.
                </p>
                <div className={styles.produceStats}>
                  <span>🍅 Tomato</span>
                  <span>📍 Alabata, Ogun</span>
                  <span>✅ Open Now</span>
                </div>
              </div>
            </div>
            {/* Habanero Pepper */}
            <div className={styles.produceCard}>
              <div className={styles.produceImgWrap}>
                <Image
                  src="/products/paradiso_3.jpeg"
                  alt="Paradiso Farms II – Habanero Pepper"
                  fill
                  sizes="(max-width:768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className={styles.produceBadgeAvail}>Available</span>
              </div>
              <div className={styles.produceBody}>
                <h3 className={styles.produceName}>Paradiso II – Habanero Pepper</h3>
                <p className={styles.produceDesc}>
                  Premium Habanero cultivation slot at Paradiso Farms II. Per Plot: ₦1,187,000 total. Per Acre: ₦6,922,000 total.
                </p>
                <div className={styles.produceStats}>
                  <span>🌶️ Habanero</span>
                  <span>📍 Alabata, Ogun</span>
                  <span>💯 Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMITMENT TO QUALITY ────────────────────── */}
      <section className={styles.qualitySection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={styles.sectionTag}>Why Choose Our Produce</p>
            <h2 className={styles.sectionTitle}>Our Commitment to Quality</h2>
          </div>
          <div className={styles.qualityGrid}>
            <div className={styles.qualityCard}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌾</div>
              <h3 className={styles.qualityTitle}>Farm-Fresh Quality & Locally Grown</h3>
              <p className={styles.qualityDesc}>Every produce is nutritious and bursting with natural flavor. Fully traceable from our farm to your table.</p>
            </div>
            <div className={styles.qualityCard}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚫</div>
              <h3 className={styles.qualityTitle}>Zero Harmful Chemicals</h3>
              <p className={styles.qualityDesc}>We grow without synthetic pesticides or artificial fertilisers to ensure your health and safety.</p>
            </div>
            <div className={styles.qualityCard} style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤝</div>
              <h3 className={styles.qualityTitle}>Restaurant & Food Business Alliance</h3>
              <p className={styles.qualityDesc}>Agrolocale partners directly with chefs, restaurant owners, and more. With no middleman inflating prices, you get the best value for premium produce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ────────────────────────── */}
      <section className={styles.visionMissionHome}>
        <div className="container">
          <div className={styles.homeGrid2}>
            <div className={styles.visionBox}>
              <p className={styles.sectionTag}>Our Vision</p>
              <h2 className={styles.homeSectionTitle}>Global Agro Impact</h2>
              <p className={styles.homeSectionText}>
                To be the go-to company in Africa and the world for everything Agro purchase, investment, research, and technology.
              </p>
            </div>
            <div className={styles.missionBox}>
              <p className={styles.sectionTag}>Our Mission</p>
              <h2 className={styles.homeSectionTitle}>Food Security for All</h2>
              <p className={styles.homeSectionText}>
                To produce as many farmland owners as possible within our premium farm estate developments for food security & sufficiency in the economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────── */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className="container">
          <div className={styles.statsGrid}>
            {statsData.map((s, i) => (
              <StatItem key={i} {...s} running={statsOn} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ────────────────────────── */}
      <section className={styles.listingsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionTag}>Farm Properties</p>
              <h2 className={styles.sectionTitle}>Featured Listings</h2>
              <p className={styles.sectionSub}>
                Hand-picked premium agricultural properties across Nigeria's most fertile regions.
              </p>
            </div>
            <Link href="/listings" className={styles.viewAll}>View All Listings →</Link>
          </div>

          <div className={styles.cardsGrid}>
            {featuredListings.map(l => <PropertyCard key={l.id} l={l} />)}
          </div>
        </div>
      </section>

      {/* ─── WHY AGROLOCALE ──────────────────────────── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={styles.sectionTag}>Why Choose Us</p>
            <h2 className={styles.sectionTitle}>The Agrolocale Advantage</h2>
            <p className={styles.sectionSub} style={{ margin: '0 auto' }}>
              We combine local expertise with modern technology to make agricultural land acquisition simple, safe, and successful.
            </p>
          </div>
          <div className={styles.whyGrid}>
            {whyItems.map((w, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.whyIcon}>{w.icon}</div>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─────────────────────────────── */}
      <section className={styles.homeValuesSection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={styles.sectionTag}>What Drives Us</p>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
          </div>
          <div className={styles.homeValuesGrid}>
            {[
              { icon: '👨‍👩‍👧‍👦', title: 'Family' },
              { icon: '⭐', title: 'Excellence' },
              { icon: '💎', title: 'Quality' },
              { icon: '🙏', title: 'Humility' },
              { icon: '⚖️', title: 'Integrity' },
              { icon: '🤝', title: 'Teamwork' },
              { icon: '💬', title: 'Communication' },
              { icon: '💡', title: 'Innovation' },
              { icon: '📋', title: 'Accountability' },
              { icon: '🚀', title: 'Technology' },
            ].map((v, i) => (
              <div key={i} className={styles.homeValueCard}>
                <span className={styles.homeValueIcon}>{v.icon}</span>
                <h3 className={styles.homeValueTitle}>{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ───────────────────────────── */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImgZone}>
              <div className={styles.imgMain}>
                <Image src="/gallery-2.png" alt="Nigerian farmland" fill sizes="50vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.imgSub}>
                <Image src="/gallery-3.png" alt="Agricultural land" fill sizes="30vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.imgBadge}>
                <span className={styles.imgBadgeNum}>2+</span>
                <span className={styles.imgBadgeLbl}>Years of Excellence</span>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <p className={styles.sectionTag}>Our Story</p>
              <h2 className={styles.sectionTitle}>Built for Nigeria's Agricultural Future</h2>
              <p className={styles.aboutText}>
                Founded in 2024, Agrolocale was born from a simple belief: acquiring agricultural land in Nigeria should be transparent, efficient, and trustworthy. We bridge the gap between landowners, farmers, and investors across the country.
              </p>
              <p className={styles.aboutText}>
                Our certified agro-realty experts conduct rigorous due diligence on every listing — giving you accurate information, clear titles, and fair valuations every time.
              </p>
              <div className={styles.aboutMini}>
                <div><div className={styles.miniNum}>04</div><div className={styles.miniLbl}>Projects Completed</div></div>
                <div><div className={styles.miniNum}>250+</div><div className={styles.miniLbl}>Registered Investors</div></div>
                <div><div className={styles.miniNum}>350+</div><div className={styles.miniLbl}>Households Served</div></div>
              </div>
              <Link href="/about" className={styles.aboutCta}>Learn More About Us →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─────────────────────────────────── */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.sectionCenter} style={{ marginBottom: '2.5rem' }}>
            <p className={styles.sectionTag}>Our Properties</p>
            <h2 className={styles.sectionTitle}>A Glimpse of Nigeria's Farmlands</h2>
          </div>
          <div className={styles.galleryGrid}>
            {galleryImages.map((src, i) => (
              <div key={i} className={styles.galleryItem}>
                <Image src={src} alt={`Farmland ${i + 1}`} fill sizes="(max-width:640px) 100vw,33vw" className={styles.galleryImg} />
                <div className={styles.galleryOverlay}><span>🔍</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────── */}
      <section className={styles.testiSection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={`${styles.sectionTag} ${styles.sectionTagLight}`}>What Clients Say</p>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>Trusted by Farmers &amp; Investors</h2>
          </div>

          <div className={styles.testiGrid}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`${styles.testiCard} ${i === activeTest ? styles.testiActive : ''}`}
                onClick={() => setActiveTest(i)}
              >
                <div className={styles.testiQuote}>&ldquo;</div>
                <p className={styles.testiText}>{t.quote}</p>
                <div className={styles.testiStars}>★★★★★</div>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar} style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.testiDots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.testiDot} ${i === activeTest ? styles.dotActive : ''}`} onClick={() => setActiveTest(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST INSIGHTS ─────────────────────────── */}
      <section className={styles.insightsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionTag}>Our Blog</p>
              <h2 className={styles.sectionTitle}>Latest Insights</h2>
              <p className={styles.sectionSub}>
                Stay updated with the latest news, market trends, and expert guides for agricultural investment.
              </p>
            </div>
            <Link href="/blog" className={styles.viewAll}>View All Posts →</Link>
          </div>

          {posts.length > 0 ? (
            <div className={styles.cardsGrid}>
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className={styles.blogCard}>
                  <div className={styles.blogImgWrap}>
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(400).url()}
                        alt={post.coverImage.alt || post.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className={styles.blogImg}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', background: '#f5f7f5' }}>🌾</div>
                    )}
                    <span className={styles.blogBadge}>{post.categories?.[0] || 'Article'}</span>
                  </div>
                  <div className={styles.blogCardBody}>
                    <span className={styles.blogDate}>
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogExcerpt}>{post.excerpt || 'Read the full article...'}</p>
                    <span className={styles.blogReadMore}>Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>More updates coming soon.</p>
          )}
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden />
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Find Your Perfect Farmland?</h2>
            <p className={styles.ctaSub}>
              Join thousands of farmers and investors who've found their ideal agricultural property through Agrolocale.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/listings" className={styles.ctaPrimary}>Browse Listings</Link>
              <Link href="/contact"  className={styles.ctaSecondary}>Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
