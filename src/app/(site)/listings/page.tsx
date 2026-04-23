'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './listings.module.css'

/* ─── Data ───────────────────────────────────────────── */
const allListings = [
  { id: 1, title: 'Elysian Farm Estate',         location: 'Abeokuta, Ogun State',   state: 'Ogun',    price: 85_000_000,  acreage: 45,  type: 'mixed',      image: '/elysian-farm.png',    badge: 'Featured', verified: true },
  { id: 2, title: 'Bounty Harvest Plantation',    location: 'Zaria, Kaduna State',    state: 'Kaduna',  price: 240_000_000, acreage: 120, type: 'commercial', image: '/bounty-harvest.png',  badge: 'Hot Deal', verified: true },
  { id: 3, title: 'Greenfield Arable Plot',       location: 'Ogbomosho, Oyo State',   state: 'Oyo',     price: 65_000_000,  acreage: 30,  type: 'arable',     image: '/gallery-1.png',       badge: 'New',      verified: true },
  { id: 4, title: 'Riverside Ranch & Pasture',    location: 'Makurdi, Benue State',   state: 'Benue',   price: 110_000_000, acreage: 80,  type: 'ranch',      image: '/gallery-2.png',       badge: '',         verified: true },
  { id: 5, title: 'Plateau Highland Farmland',    location: 'Jos, Plateau State',     state: 'Plateau', price: 48_000_000,  acreage: 22,  type: 'arable',     image: '/gallery-3.png',       badge: 'Premium',  verified: true },
  { id: 6, title: 'Niger Delta Irrigated Estate', location: 'Warri, Delta State',     state: 'Delta',   price: 95_000_000,  acreage: 55,  type: 'irrigated',  image: '/hero-farmland.png',   badge: '',         verified: true },
]

const propTypes = [
  { value: '',            label: 'All Types'        },
  { value: 'arable',      label: 'Arable Farmland'  },
  { value: 'commercial',  label: 'Commercial Farm'  },
  { value: 'ranch',       label: 'Ranch & Pasture'  },
  { value: 'irrigated',   label: 'Irrigated Plot'   },
  { value: 'mixed',       label: 'Mixed Farmland'   },
]

const states = ['All States','Ogun','Kaduna','Oyo','Benue','Plateau','Delta','Kwara','Niger','Kogi']

const sortOpts = [
  { value: 'default',     label: 'Default'               },
  { value: 'price-asc',   label: 'Price: Low → High'     },
  { value: 'price-desc',  label: 'Price: High → Low'     },
  { value: 'acre-asc',    label: 'Acreage: Smallest'     },
  { value: 'acre-desc',   label: 'Acreage: Largest'      },
]

type Listing = typeof allListings[0]

function fmt(n: number) {
  if (n >= 1e9) return `₦${(n/1e9).toFixed(1)}B`
  return `₦${(n/1e6).toFixed(0)}M`
}

/* ─── Card ───────────────────────────────────────────── */
function ListingCard({ l, isFav, onFav, mode }: {
  l: Listing; isFav: boolean; onFav: () => void; mode: 'grid' | 'list'
}) {
  const badgeClass = l.badge === 'Hot Deal' ? styles.badgeRed : l.badge === 'Premium' ? styles.badgeGreen : styles.badgeGold

  return (
    <article className={`${styles.card} ${mode === 'list' ? styles.cardList : ''}`}>
      <div className={styles.cardImg}>
        <Image src={l.image} alt={l.title} fill sizes="(max-width:768px) 100vw, 40vw" className={styles.img} />
        {l.badge && <span className={`${styles.badge} ${badgeClass}`}>{l.badge}</span>}
        {l.verified && <span className={styles.verified}>✓ Verified</span>}
        <button className={styles.fav} onClick={onFav} aria-label="Save listing">{isFav ? '❤️' : '🤍'}</button>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardType}>{l.type.charAt(0).toUpperCase() + l.type.slice(1)} Land</p>
        <h2 className={styles.cardTitle}>{l.title}</h2>
        <p className={styles.cardLoc}>📍 {l.location}</p>
        <div className={styles.cardMeta}>
          <span>📐 {l.acreage} Acres</span>
          <span>📋 C of O Titled</span>
          <span>🌱 Fertile Soil</span>
        </div>
        <div className={styles.cardFooter}>
          <div>
            <div className={styles.cardPrice}>{fmt(l.price)}</div>
            <span className={styles.priceNote}>Negotiable</span>
          </div>
          <Link href="/contact" className={styles.enquireBtn}>Enquire Now</Link>
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
  const [favs,     setFavs]     = useState<number[]>([])
  const [mode,     setMode]     = useState<'grid' | 'list'>('grid')

  const results = useMemo(() => {
    let d = [...allListings]
    if (type)                    d = d.filter(l => l.type === type)
    if (state !== 'All States') d = d.filter(l => l.state === state)
    d = d.filter(l => l.price <= maxPrice)
    if (sort === 'price-asc')  d.sort((a,b) => a.price   - b.price)
    if (sort === 'price-desc') d.sort((a,b) => b.price   - a.price)
    if (sort === 'acre-asc')   d.sort((a,b) => a.acreage - b.acreage)
    if (sort === 'acre-desc')  d.sort((a,b) => b.acreage - a.acreage)
    return d
  }, [type, state, maxPrice, sort])

  const toggleFav = (id: number) =>
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])

  const resetFilters = () => { setType(''); setState('All States'); setMaxPrice(300_000_000); setSort('default') }

  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <p className={styles.headerTag}>Find Your Land</p>
          <h1 className={styles.headerTitle}>Agricultural Property Listings</h1>
          <p className={styles.headerSub}>
            Browse verified farmland across Nigeria — filter by type, state, and price to find your perfect property.
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
                    isFav={favs.includes(l.id)}
                    onFav={() => toggleFav(l.id)}
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
