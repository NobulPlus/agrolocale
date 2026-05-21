'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './listings.module.css'

/* ─── Data ───────────────────────────────────────────── */
const allListings = [
  {
    id: 1, title: 'Paradiso Farms',                  location: 'Ido-Eruwa Expressway, Ibadan', state: 'Oyo',
    price: 0, acreage: 0, type: 'resort',
    image: '/products/paradiso_new.jpeg',
    badge: 'Available', verified: true,
    priceLabel: 'Contact Us', acreageLabel: 'Available',
    hasPdf: false,
    note: '',
  },
  {
    id: 2, title: 'Aduke Cottages',               location: 'Ido-Eruwa Expressway, Ibadan', state: 'Oyo',
    price: 0, acreage: 0, type: 'resort',
    image: '/products/cottages.jpeg',
    badge: 'Available', verified: true,
    priceLabel: 'Contact Us', acreageLabel: 'Available',
    hasPdf: false,
    note: '',
  },
  {
    id: 3, title: 'Elysian Farms and Resort',       location: 'Ido-Eruwa Expressway, Ibadan', state: 'Oyo',
    price: 0, acreage: 0, type: 'resort',
    image: '/products/elysian.jpeg',
    badge: 'Available', verified: true,
    priceLabel: 'Contact Us', acreageLabel: 'Available',
    hasPdf: false,
    note: '',
  },
  {
    id: 6, title: 'Garri Go! – Fresh & Crispy Garri Ijebu', location: 'Nationwide Delivery', state: 'All States',
    price: 24_590, acreage: 0, type: 'produce',
    image: '/products/garri.jpeg',
    badge: '🔥 Hot Cake', verified: true,
    priceLabel: '₦24,590 (25kg) · ₦48,590 (50kg)', acreageLabel: 'In Stock',
    hasPdf: false,
    note: '',
  },
]

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

/* ─── Card ───────────────────────────────────────────── */
function ListingCard({ l, mode }: {
  l: Listing; mode: 'grid' | 'list'
}) {
  const isProduce = l.type === 'produce'
  const isComingSoon = l.badge.toLowerCase().includes('coming soon')
  const badgeClass =
    l.badge === 'Hot Deal' || l.badge.includes('🔥') ? styles.badgeRed
    : l.badge === 'Premium' || l.badge === 'Available'  ? styles.badgeGreen
    : l.badge.includes('🌿') ? styles.badgeGreen
    : styles.badgeGold

  return (
    <article className={`${styles.card} ${mode === 'list' ? styles.cardList : ''}`}>
      <div className={styles.cardImg}>
        <Image src={l.image} alt={l.title} fill sizes="(max-width:768px) 100vw, 40vw" className={styles.img} />
        {l.badge && <span className={`${styles.badge} ${badgeClass}`}>{l.badge}</span>}
        {l.verified && <span className={styles.verified}>{isProduce ? '✓ Fresh' : '✓ Verified'}</span>}
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
    </main>
  )
}
