'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/home',     label: 'Home' },
  { href: '/listings', label: 'Find Land' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/blog',     label: 'Blog' },
  { href: '/about',    label: 'About Us' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/home" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/logo2.png"
            alt="Agrolocale"
            width={36}
            height={36}
            className={styles.logoImg}
            priority
          />
          <span>Agro<span className={styles.logoAccent}>locale</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className={styles.desktopActions}>
          <Link href="/contact" className={styles.ctaBtn}>Get Started</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
              style={{ animationDelay: `${i * 0.07 + 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}
