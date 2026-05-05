import Link from 'next/link'
import styles from './Footer.module.css'

const footerLinks = [
  { href: '/home',     label: 'Home' },
  { href: '/listings', label: 'Find Land' },
  { href: '/blog',     label: 'Blog' },
  { href: '/about',    label: 'About Us' },
  { href: '/contact',  label: 'Contact' },
]

const propertyTypes = [
  'Arable Farmland', 'Plantation Land', 'Ranch & Pasture',
  'Irrigated Plots', 'Mixed Farmland', 'Agricultural Estates',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/home" className={styles.logo}>
            🌾 Agro<span className={styles.logoAccent}>locale</span>
          </Link>
          <p className={styles.tagline}>
            Nigeria's premier platform for agricultural land discovery and acquisition. Connecting farmers, investors, and communities across the nation.
          </p>
          <div className={styles.socials}>
            {[
              { label: 'Facebook',  path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Twitter',   path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
            ].map(s => (
              <a key={s.label} href="#" className={styles.social} aria-label={s.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
            <a href="#" className={styles.social} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" className={styles.social} aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>Navigation</h4>
          <ul className={styles.links}>
            {footerLinks.map(l => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Property types */}
        <div className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>Property Types</h4>
          <ul className={styles.links}>
            {propertyTypes.map(t => (
              <li key={t}><Link href="/listings" className={styles.link}>{t}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>Get In Touch</h4>
          <ul className={styles.contactList}>
            {[
              { icon: '📍', text: 'Ayobola Daodu, Lekki Scheme II, Ajah, Lagos State' },
              { icon: '📞', text: '+234 707 152 3904, +234 901 045 8648' },
              { icon: '✉️', text: 'info@agrolocale.com, customercare@agrolocale.com' },
              { icon: '🕐', text: 'Mon – Thu: 9am – 4pm | Fri: 10am – 4pm' },
            ].map((item, i) => (
              <li key={i} className={styles.contactItem}>
                <span className={styles.contactIcon}>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>© {year} Agrolocale. All rights reserved.</p>
        <div className={styles.legal}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
            <Link key={t} href="/home" className={styles.legalLink}>{t}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
