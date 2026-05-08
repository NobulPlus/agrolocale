import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './paradiso.module.css'

export const metadata: Metadata = {
  title: 'Paradiso Farm Cultivation Model | Agrolocale',
  description:
    'Invest in organized, managed farmland at Paradiso Farms II. 80% revenue share, no farm management required. Crops include Tomato, Habanero Pepper, and Sweet Potato — starting from ₦285,000.',
  openGraph: {
    title: 'Paradiso Farm Cultivation Model — Agrolocale',
    description:
      'You invest, our team manages everything. 80% of harvest revenue goes to you. Explore Tomato, Habanero, and Sweet Potato cultivation slots at Alabata, Ogun State.',
    images: ['/products/paradiso_2.jpeg'],
  },
}

const crops = [
  {
    id: 1,
    name: 'Sweet Potato',
    emoji: '🍠',
    image: '/products/paradiso_4.jpeg',
    price: '₦285,000',
    priceUnit: '/ Plot',
    timeline: 'Jun / Jul 2026',
    badge: '⭐ Best Entry Point',
    badgeClass: 'gold',
    highlight: true,
    desc: 'The lowest entry cost, the shortest cycle, and one of the cleanest market-absorption windows of all three crops. If you have never invested in this model, this is where to start.',
    stats: [
      { label: 'Entry Cost',     val: '₦285,000' },
      { label: 'Harvest Split',  val: '80% yours' },
      { label: 'Timeline',       val: 'Jun/Jul 2026' },
      { label: 'Location',       val: 'Alabata, Ogun' },
    ],
  },
  {
    id: 2,
    name: 'Tomato Cultivation',
    emoji: '🍅',
    image: '/products/paradiso_1.jpeg',
    price: '₦1,100,000',
    priceUnit: '/ Plot  ·  ₦6,300,000 / Acre',
    timeline: 'Jun / Jul 2026',
    badge: '🔥 Hot Slot',
    badgeClass: 'red',
    highlight: false,
    desc: 'Tomatoes go into every Nigerian meal — they are not trend-dependent produce. Supply is fragmented; organized cultivation gives you a structural edge in one of the most consistent markets on the continent.',
    stats: [
      { label: 'Entry Cost',     val: '₦1,100,000' },
      { label: 'Harvest Split',  val: '80% yours' },
      { label: 'Timeline',       val: 'Jun/Jul 2026' },
      { label: 'Location',       val: 'Alabata, Ogun' },
    ],
  },
  {
    id: 3,
    name: 'Habanero Pepper',
    emoji: '🌶️',
    image: '/products/paradiso_3.jpeg',
    price: '₦1,187,000',
    priceUnit: '/ Plot  ·  ₦6,922,000 / Acre',
    timeline: 'Jun / Jul 2026',
    badge: 'Available',
    badgeClass: 'green',
    highlight: false,
    desc: 'Premium habanero cultivation with strong price resilience across dry and wet seasons. One of the highest per-plot revenue profiles in the Paradiso Batch B lineup.',
    stats: [
      { label: 'Entry Cost',     val: '₦1,187,000' },
      { label: 'Harvest Split',  val: '80% yours' },
      { label: 'Timeline',       val: 'Jun/Jul 2026' },
      { label: 'Location',       val: 'Alabata, Ogun' },
    ],
  },
]

const howItWorks = [
  { step: '01', icon: '💰', title: 'You Invest in a Plot', desc: 'Choose your crop and plot size. A one-time capital outlay locks in your slot for the upcoming Batch B cultivation cycle.' },
  { step: '02', icon: '🌱', title: 'Our Team Handles Everything', desc: 'From soil prep to planting, irrigation, pest management, and harvest logistics — you don\'t manage anything unless you want to.' },
  { step: '03', icon: '📊', title: '80% Revenue Is Yours', desc: 'At harvest, 80% of the revenue generated from your plot goes directly to you. Our 20% is earned only when your farm earns.' },
  { step: '04', icon: '🔄', title: 'Reinvest or Withdraw', desc: 'After harvest, decide whether to roll your capital into the next cycle or withdraw your earnings. No lock-in beyond the crop timeline.' },
]

export default function ParadisoPage() {
  return (
    <main>
      {/* ─── HERO ───────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroOverlay} aria-hidden />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <span className={styles.heroTag}>🌾 Batch B · Jun/Jul 2026 · Alabata, Ogun State</span>
              <h1 className={styles.heroTitle}>
                Paradiso Farm{' '}
                <em className={styles.heroAccent}>Cultivation Model</em>
              </h1>
              <p className={styles.heroSub}>
                You invest. Our team manages everything — from planting to harvest.
                At harvest, <strong>80% of the revenue is yours.</strong> We earn only when your farm earns.
              </p>
              <div className={styles.heroCtas}>
                <a href="#crops" className={styles.ctaPrimary}>See Available Crops →</a>
                <a href="#how-it-works" className={styles.ctaSecondary}>How It Works ↓</a>
              </div>
            </div>

            <div className={styles.heroImgWrap}>
              <Image
                src="/products/paradiso_2.jpeg"
                alt="Paradiso Farms II – Batch B 2026, Alabata Ogun State"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.heroImg}
                priority
              />
              <div className={styles.heroOverlayImg} aria-hidden />
              <div className={styles.heroPriceBadge}>
                <span className={styles.heroPriceFrom}>From</span>
                <span className={styles.heroPriceAmt}>₦285,000</span>
                <span className={styles.heroPriceUnit}>per plot</span>
              </div>
              <div className={styles.heroBadgeNew}>🔥 New Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REFRAME ─────────────────────────────── */}
      <section className={styles.reframeSection}>
        <div className="container">
          <div className={styles.reframeGrid}>
            <div className={styles.reframeLeft}>
              <p className={styles.sectionTag}>The Shift Worth Paying Attention To</p>
              <h2 className={styles.sectionTitle}>
                Most People Still Treat Farmland Investment Like a Get-Rich Scheme
              </h2>
            </div>
            <div className={styles.reframeRight}>
              <p className={styles.reframePara}>
                Put money in, hope for good returns, and move on. That works for Ponzi schemes
                because it does almost nothing for credibility.
              </p>
              <p className={styles.reframePara}>
                The real question has never been whether farming is effective. Farming has always
                worked. <strong>No matter what happened to the economy, people still eat.</strong>
              </p>
              <p className={styles.reframePara}>
                The question has always been about who is managing it, how accountable they are,
                and whether the numbers actually hold up when you look at them closely.
              </p>
            </div>
          </div>

          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>🍅</div>
            <div>
              <p className={styles.insightText}>
                Tomatoes go into every Nigerian meal. They are not trend-dependent produce.
                There&apos;s no way people suddenly stop needing them — and yet the supply side
                has always been fragmented and poorly managed.
              </p>
              <p className={styles.insightSub}>
                The opportunity for organized, capital-backed farming has always been sitting there, largely untouched.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────── */}
      <section id="how-it-works" className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={styles.sectionTagLight}>The Model</p>
            <h2 className={styles.sectionTitleLight}>How the Paradiso Cultivation Model Works</h2>
            <p className={styles.howSub}>
              What Agrolocale has done with the Paradiso project is take that opportunity and build
              a structure around it that actually works for people who are not farmers.
            </p>
          </div>

          <div className={styles.howGrid}>
            {howItWorks.map((step) => (
              <div key={step.step} className={styles.howCard}>
                <div className={styles.howStepNum}>{step.step}</div>
                <div className={styles.howIcon}>{step.icon}</div>
                <h3 className={styles.howTitle}>{step.title}</h3>
                <p className={styles.howDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.howCallout}>
            <span className={styles.howCalloutPct}>80%</span>
            <div>
              <p className={styles.howCalloutHead}>Revenue Split — Always in Your Favour</p>
              <p className={styles.howCalloutSub}>
                Our 20% is tied directly to your harvest. When your farm does well, we earn. When it doesn&apos;t, neither do we.
                That&apos;s accountability built into the structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROPS ───────────────────────────────── */}
      <section id="crops" className={styles.cropsSection}>
        <div className="container">
          <div className={styles.sectionCenter} style={{ marginBottom: '3.5rem' }}>
            <p className={styles.sectionTag}>Batch B · Jun/Jul 2026</p>
            <h2 className={styles.sectionTitle}>Choose Your Crop</h2>
            <p className={styles.cropsSub}>
              Each crop has a different entry cost, a different timeline, and a different yield profile.
              All numbers are grounded in how these crops actually trade across Nigerian markets.
            </p>
          </div>

          <div className={styles.cropsGrid}>
            {crops.map((crop) => (
              <div key={crop.id} className={`${styles.cropCard} ${crop.highlight ? styles.cropHighlight : ''}`}>
                {crop.highlight && <div className={styles.cropRecommended}>★ Recommended for First-Time Investors</div>}
                <div className={styles.cropImgWrap}>
                  <Image
                    src={crop.image}
                    alt={`Paradiso II – ${crop.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className={`${styles.cropBadge} ${styles[`badge_${crop.badgeClass}`]}`}>{crop.badge}</span>
                </div>
                <div className={styles.cropBody}>
                  <div className={styles.cropEmoji}>{crop.emoji}</div>
                  <h3 className={styles.cropName}>{crop.name}</h3>
                  <p className={styles.cropDesc}>{crop.desc}</p>
                  <div className={styles.cropStats}>
                    {crop.stats.map((s) => (
                      <div key={s.label} className={styles.cropStat}>
                        <span className={styles.cropStatVal}>{s.val}</span>
                        <span className={styles.cropStatLbl}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.cropPrice}>
                    <span className={styles.cropPriceAmt}>{crop.price}</span>
                    <span className={styles.cropPriceUnit}>{crop.priceUnit}</span>
                  </div>
                  <div className={styles.cropActions}>
                    <Link href="/contact" className={styles.cropCta}>Invest Now →</Link>
                    <a href="/docs/Paradiso_Batch_B.pdf" download className={styles.cropDownload}>
                      📄 Download Calendar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SWEET POTATO SPOTLIGHT ──────────────── */}
      <section className={styles.spotlightSection}>
        <div className="container">
          <div className={styles.spotlightGrid}>
            <div className={styles.spotlightContent}>
              <p className={styles.sectionTag}>If You&apos;re New to This</p>
              <h2 className={styles.sectionTitle}>
                Start with Sweet Potato — Here&apos;s Why
              </h2>
              <p className={styles.spotlightPara}>
                At ₦285,000, Sweet Potato is the cheapest to enter, the fastest to complete,
                and its harvest window is one of the cleanest in terms of market absorption.
              </p>
              <p className={styles.spotlightPara}>
                If you have never invested in this model before, Sweet Potato is the entry point that
                makes the most sense. The capital requirement is the lowest. The cycle is the shortest.
                The market is consistent.
              </p>
              <p className={styles.spotlightPara}>
                You&apos;ll experience firsthand how the model works — from planting to harvest to revenue
                — before you decide how much further you want to go.
              </p>
              <Link href="/contact" className={styles.spotlightCta}>
                Start with Sweet Potato →
              </Link>
            </div>
            <div className={styles.spotlightImgWrap}>
              <Image
                src="/products/paradiso_4.jpeg"
                alt="Paradiso II – Sweet Potato Cultivation"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.spotlightBadge}>
                <span className={styles.spotlightBadgePrice}>₦285,000</span>
                <span className={styles.spotlightBadgeLbl}>Lowest Entry Point</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVENUE NOTE ────────────────────────── */}
      <section className={styles.revenueSection}>
        <div className="container">
          <div className={styles.revenueCard}>
            <div className={styles.revenueIcon}>📊</div>
            <div>
              <h3 className={styles.revenueTitle}>Are the Revenue Figures Realistic?</h3>
              <p className={styles.revenueText}>
                These are not inflated numbers designed to make the model look attractive. A realistic
                margin of error has been factored in. The price assumptions used are not peak market
                fantasies — they are grounded in how these crops actually trade across Nigerian markets
                through the seasons they are being harvested in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden />
        <div className="container">
          <div className={styles.ctaContent}>
            <span className={styles.ctaTag}>🌾 Batch B Slots Are Open</span>
            <h2 className={styles.ctaTitle}>Ready to Invest in Paradiso?</h2>
            <p className={styles.ctaSub}>
              Join investors who are building passive income through organized, managed farming.
              Contact us to reserve your plot before Batch B fills up.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className={styles.ctaPrimary}>Reserve a Plot →</Link>
              <a href="/docs/Paradiso_Batch_B.pdf" download className={styles.ctaDownload}>
                📄 Download Cultivation Calendar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BACK ────────────────────────────────── */}
      <section className={styles.backSection}>
        <div className="container">
          <Link href="/listings" className={styles.backLink}>← Back to All Listings</Link>
        </div>
      </section>
    </main>
  )
}
