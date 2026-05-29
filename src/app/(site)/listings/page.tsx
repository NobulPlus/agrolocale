'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './listings.module.css'

/* ─── Flier images ───────────────────────────────────── */
const adukeFlierImages = [
  '/images/aduke_flier/WhatsApp Image 2026-05-27 at 8.52.50 AM.jpeg',
  '/images/aduke_flier/WhatsApp Image 2026-05-27 at 8.52.51 AM.jpeg',
  '/images/aduke_flier/WhatsApp Image 2026-05-27 at 8.52.49 AM.jpeg',
  '/images/aduke_flier/WhatsApp Image 2026-05-27 at 8.52.53 AM.jpeg',
]

const elysianFlierImages = [
  '/images/elysian_flier/WhatsApp Image 2026-05-27 at 8.54.11 AM.jpeg',
  '/images/elysian_flier/WhatsApp Image 2026-05-27 at 8.54.12 AM.jpeg',
  '/images/elysian_flier/WhatsApp Image 2026-05-27 at 8.55.51 AM594.jpeg',
]

/* ─── Aduke unit types ───────────────────────────────── */
const adukeUnits = [
  { label: '1 Bed Cottage – Terrace',        promo: '₦28M', deposit: '₦5M', plan6: '₦3,833,333/mo', plan12: '₦2,250,000/mo' },
  { label: '2 Bed Cottage – Semi Detached',   promo: '₦39M', deposit: '₦5M', plan6: '₦5,666,666/mo', plan12: '₦3,166,666/mo' },
  { label: '3 Bed Cottage – Fully Detached',  promo: '₦54M', deposit: '₦5M', plan6: '₦8,166,666/mo', plan12: '₦4,416,666/mo' },
]

/* ─── Data ───────────────────────────────────────────── */
const allListings = [
  {
    id: 1, title: 'Paradiso Farms',                  location: 'Alabata Road, Abeokuta', state: 'Ogun',
    price: 0, acreage: 0, type: 'resort',
    image: '/products/paradiso_new.jpeg',
    badge: 'Available', verified: true,
    priceLabel: 'Contact Us', acreageLabel: 'Available',
    pdfUrl: '/docs/Paradiso_Batch_B.pdf',
    note: '',
    cofo: false, paymentPlan: false,
    flierImages: [] as string[],
  },
  {
    id: 2, title: 'Aduke Cottages',               location: 'Inside Elysian Farm & Resort, Ido-Eruwa Expressway, Ibadan', state: 'Oyo',
    price: 0, acreage: 0, type: 'resort',
    image: '/products/cottages.jpeg',
    badge: '🏠 Housing Offer', verified: true,
    priceLabel: 'From ₦28M', acreageLabel: 'Available on Sale',
    pdfUrl: '/docs/Aduke Brochure.pdf',
    note: '6 months interest free · Initial deposit ₦5M · Managed by Localite Hospitality',
    cofo: true, paymentPlan: true,
    flierImages: adukeFlierImages,
    units: adukeUnits,
  },
  {
    id: 3, title: 'Elysian Farms and Resort',       location: 'Ido-Eruwa Expressway, Ibadan', state: 'Oyo',
    price: 0, acreage: 0, type: 'resort',
    image: '/products/elysian.png',
    badge: '🌿 Land Offer', verified: true,
    priceLabel: 'Contact Us', acreageLabel: 'Available on Sale',
    pdfUrl: undefined,
    note: '',
    cofo: true, paymentPlan: true,
    flierImages: elysianFlierImages,
    units: undefined as typeof adukeUnits | undefined,
  },
  {
    id: 6, title: 'Garri Go! – Fresh & Crispy Garri Ijebu', location: 'Nationwide Delivery', state: 'All States',
    price: 24_590, acreage: 0, type: 'produce',
    image: '/products/garri.jpeg',
    badge: '🔥 Hot Cake', verified: true,
    priceLabel: '₦24,590 (25kg) · ₦48,590 (50kg)', acreageLabel: 'In Stock',
    pdfUrl: undefined,
    note: '',
    cofo: false, paymentPlan: false,
    flierImages: [] as string[],
    units: undefined as typeof adukeUnits | undefined,
  },
]

// patch Paradiso to have units field for type compatibility
;(allListings[0] as any).units = undefined

const propTypes = [
  { value: '',         label: 'All Types'       },
  { value: 'resort',   label: 'Farm & Resort'   },
  { value: 'produce',  label: 'Farm Produce'    },
]

const states = ['All States', 'Oyo']

const sortOpts = [
  { value: 'default',     label: 'Default'               },
  { value: 'price-asc',   label: 'Price: Low → High'     },
  { value: 'price-desc',  label: 'Price: High → Low'     },
  { value: 'acre-asc',    label: 'Acreage: Smallest'     },
  { value: 'acre-desc',   label: 'Acreage: Largest'      },
]

type Listing = typeof allListings[0]

function fmt(n: number, label?: string) {
  if (label) return label
  if (n >= 1e9) return `₦${(n/1e9).toFixed(1)}B`
  return `₦${(n/1e6).toFixed(0)}M`
}

/* ─── Flier Modal ────────────────────────────────────── */
function FlierModal({ title, images, onClose, pdfUrl }: { title: string; images: string[]; onClose: () => void; pdfUrl?: string }) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const prev = () => setActiveIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setActiveIdx(i => (i + 1) % images.length)

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} fliers`}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title} – Fliers &amp; Offers</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {/* Main image */}
        <div className={styles.modalImgWrap}>
          <Image
            src={images[activeIdx]}
            alt={`${title} flier ${activeIdx + 1}`}
            fill
            sizes="(max-width:768px) 100vw, 70vw"
            className={styles.modalImg}
          />
          {images.length > 1 && (
            <>
              <button className={`${styles.modalNav} ${styles.modalNavPrev}`} onClick={prev} aria-label="Previous">‹</button>
              <button className={`${styles.modalNav} ${styles.modalNavNext}`} onClick={next} aria-label="Next">›</button>
            </>
          )}
          <div className={styles.modalCounter}>{activeIdx + 1} / {images.length}</div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className={styles.modalThumbs}>
            {images.map((src, i) => (
              <button
                key={i}
                className={`${styles.modalThumb} ${i === activeIdx ? styles.modalThumbActive : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`View flier ${i + 1}`}
              >
                <Image src={src} alt={`Thumb ${i + 1}`} fill sizes="80px" style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className={styles.modalFooter}>
          {pdfUrl && (
            <a href={pdfUrl} download className={styles.modalPdfDownload}>
              📥 Download Brochure
            </a>
          )}
          <Link href="/contact" className={styles.modalCta}>Enquire Now →</Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────── */
function ListingCard({ l, mode, onFlierClick }: {
  l: Listing; mode: 'grid' | 'list'; onFlierClick: (id: number) => void
}) {
  const isProduce = l.type === 'produce'
  const isComingSoon = l.badge.toLowerCase().includes('coming soon')
  const badgeClass =
    l.badge === 'Hot Deal' || l.badge.includes('🔥') ? styles.badgeRed
    : l.badge === 'Premium' || l.badge === 'Available' || l.badge.includes('🏠') || l.badge.includes('🌿') ? styles.badgeGreen
    : l.badge.includes('🌿') ? styles.badgeGreen
    : styles.badgeGold

  const hasFliers = l.flierImages.length > 0

  return (
    <article className={`${styles.card} ${mode === 'list' ? styles.cardList : ''}`}>
      <div className={styles.cardImg}>
        <Image src={l.image} alt={l.title} fill sizes="(max-width:768px) 100vw, 40vw" className={styles.img} />
        {l.badge && <span className={`${styles.badge} ${badgeClass}`}>{l.badge}</span>}
        {l.verified && <span className={styles.verified}>{isProduce ? '✓ Fresh' : '✓ Verified'}</span>}
        {hasFliers && (
          <button
            className={styles.flierBtn}
            onClick={() => onFlierClick(l.id)}
            aria-label={`View ${l.title} fliers`}
          >
            📸 View Fliers
          </button>
        )}
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardType}>
          {l.type === 'resort' ? 'Farm & Resort Project'
           : isProduce ? 'Farm Produce'
           : `${l.type.charAt(0).toUpperCase() + l.type.slice(1)} Land`}
        </p>
        <h2 className={styles.cardTitle}>{l.title}</h2>
        <p className={styles.cardLoc}>📍 {l.location}</p>
        {l.note && <p className={styles.cardNote}>💬 {l.note}</p>}

        {/* CofO + Payment Plan tags */}
        {(l.cofo || l.paymentPlan) && (
          <div className={styles.cardTagRow}>
            {l.cofo && <span className={styles.cardTag}>📜 CofO</span>}
            {l.paymentPlan && <span className={styles.cardTag}>💳 Payment Plan Available</span>}
          </div>
        )}

        <div className={styles.cardMeta}>
          {isProduce ? (
            <><span>🌾 Farm Fresh</span><span>🚚 Direct Delivery</span><span>✅ {l.acreageLabel || 'In Stock'}</span></>
          ) : l.type === 'resort' ? (
            <><span>🌿 Farm & Resort</span><span>📍 {l.acreageLabel}</span><span>📞 Enquire</span></>
          ) : (
            <><span>📐 {l.acreage} Acres</span><span>📋 C of O Titled</span><span>🌱 Fertile Soil</span></>
          )}
        </div>

        <div className={styles.cardFooter}>
          <div>
            <div className={styles.cardPrice}>{fmt(l.price, l.priceLabel || undefined)}</div>
            <span className={styles.priceNote}>{isComingSoon ? 'Register Interest' : isProduce ? 'Call to Order' : ''}</span>
          </div>
          <Link href="/contact" className={styles.enquireBtn}>
            {isComingSoon ? 'Register Interest' : isProduce ? 'Order Now' : 'Enquire Now'}
          </Link>
        </div>
        {l.pdfUrl && (
          <a href={l.pdfUrl} download className={styles.downloadBtn}>
            📥 Download Brochure
          </a>
        )}
      </div>
    </article>
  )
}

/* ─── Page ───────────────────────────────────────────── */
export default function ListingsPage() {
  const [type,     setType]     = useState('')
  const [state,    setState]    = useState('All States')
  const [maxPrice, setMaxPrice] = useState(300_000_000)
  const [sort,     setSort]     = useState('default')
  const [mode,     setMode]     = useState<'grid' | 'list'>('grid')
  const [openFlier, setOpenFlier] = useState<number | null>(null)

  const results = useMemo(() => {
    let d = [...allListings]
    if (type)                    d = d.filter(l => l.type === type)
    if (state !== 'All States') d = d.filter(l => l.state === state)
    d = d.filter(l => l.type === 'produce' || l.price <= maxPrice)
    if (sort === 'price-asc')  d.sort((a,b) => a.price   - b.price)
    if (sort === 'price-desc') d.sort((a,b) => b.price   - a.price)
    if (sort === 'acre-asc')   d.sort((a,b) => a.acreage - b.acreage)
    if (sort === 'acre-desc')  d.sort((a,b) => b.acreage - a.acreage)
    return d
  }, [type, state, maxPrice, sort])

  const resetFilters = () => { setType(''); setState('All States'); setMaxPrice(300_000_000); setSort('default') }

  const openListing = openFlier != null ? allListings.find(l => l.id === openFlier) : null

  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerTag}>Farm & Resort Projects</p>
          <h1 className={styles.headerTitle}>Agricultural & Resort Listings</h1>
          <p className={styles.headerSub}>
            Since 2024, we've been the bridge between profitable farmland investment and ownership, farm resort projects and the investors who need it the most.
          </p>
        </div>
      </section>

      {/* Layout */}
      <div className="container">
        <div className={styles.layout}>

          {/* ── Sidebar ─────────────────────────────── */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Property Type</h3>
              <div className={styles.radioGroup}>
                {propTypes.map(pt => (
                  <label key={pt.value} className={styles.radioLabel}>
                    <input
                      type="radio" name="ptype" value={pt.value}
                      checked={type === pt.value}
                      onChange={() => setType(pt.value)}
                      className={styles.radio}
                    />
                    <span className={styles.radioText}>{pt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>State / Location</h3>
              <select id="state-filter" value={state} onChange={e => setState(e.target.value)} className={styles.select}>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Max Price</h3>
              <input
                id="price-range"
                type="range" min={10_000_000} max={300_000_000} step={5_000_000}
                value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                className={styles.range}
              />
              <div className={styles.rangeVal}>Up to {fmt(maxPrice)}</div>
            </div>

            <button id="reset-filters" className={styles.resetBtn} onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          {/* ── Content ─────────────────────────────── */}
          <div className={styles.content}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <p className={styles.resultCount}>
                <strong>{results.length}</strong> propert{results.length !== 1 ? 'ies' : 'y'} found
              </p>
              <div className={styles.toolbarRight}>
                <select id="sort-select" value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSel}>
                  {sortOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className={styles.viewToggle} role="group" aria-label="View mode">
                  <button
                    id="view-grid"
                    className={`${styles.viewBtn} ${mode === 'grid' ? styles.viewActive : ''}`}
                    onClick={() => setMode('grid')} aria-label="Grid view"
                  >⊞</button>
                  <button
                    id="view-list"
                    className={`${styles.viewBtn} ${mode === 'list' ? styles.viewActive : ''}`}
                    onClick={() => setMode('list')} aria-label="List view"
                  >☰</button>
                </div>
              </div>
            </div>

            {results.length > 0 ? (
              <div className={mode === 'grid' ? styles.grid : styles.listView}>
                {results.map(l => (
                  <ListingCard
                    key={l.id} l={l}
                    mode={mode}
                    onFlierClick={id => setOpenFlier(id)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🌾</div>
                <h3>No Properties Found</h3>
                <p>Try adjusting your filters to discover more listings.</p>
                <button className={styles.emptyReset} onClick={resetFilters}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Flier Modal ───────────────────────────── */}
      {openListing && openListing.flierImages.length > 0 && (
        <FlierModal
          title={openListing.title}
          images={openListing.flierImages}
          onClose={() => setOpenFlier(null)}
          pdfUrl={openListing.pdfUrl}
        />
      )}
    </main>
  )
}
