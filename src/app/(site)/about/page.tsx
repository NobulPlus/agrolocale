import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Us | Agrolocale',
  description: "Learn about Agrolocale — Nigeria's premier agricultural land marketplace. Our story, mission, values, and the team behind the platform.",
}

const team = [
  { name: 'Emeka Okonkwo',   role: 'CEO & Co-Founder',               initials: 'EO', color: '#1e4530', bio: '15 years in Nigerian real estate and agricultural land development across 20+ states.' },
  { name: 'Fatima Abdullahi', role: 'Head of Listings & Verification', initials: 'FA', color: '#2a6344', bio: 'Certified agronomist with deep expertise in soil assessment, land grading, and valuation.' },
  { name: 'Chukwudi Nwosu',   role: 'Legal & Compliance Director',     initials: 'CN', color: '#c9a84c', bio: 'Specialist in Nigerian land law, title documentation, C of O processing and due diligence.' },
  { name: 'Adaobi Ezemba',    role: 'Client Relations Manager',        initials: 'AE', color: '#3a8459', bio: 'Passionate about connecting the right buyer with the perfect agricultural land investment.' },
]

const values = [
  { icon: '🎯', title: 'Transparency',   desc: 'Every listing is honest, verified, and accurately described. No hidden clauses — ever.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We prioritise land that supports sustainable farming and responsible environmental stewardship.' },
  { icon: '🤝', title: 'Partnership',    desc: 'Every client is a long-term partner in Nigeria\'s agricultural growth story, not a transaction.' },
  { icon: '⚡', title: 'Excellence',     desc: 'From listing verification to deal closure, we hold ourselves to the highest professional standards.' },
  { icon: '🔐', title: 'Integrity',      desc: 'Your interests come first. We are bound by strict ethics in all our transactions and advice.' },
  { icon: '📊', title: 'Data-Driven',    desc: 'Our valuations and market insights are grounded in real field data and agricultural expertise.' },
]

const timeline = [
  { year: '2016', title: 'Founded in Lagos',            desc: 'Agrolocale launched with a mission to bring transparency to agricultural land acquisition across Nigeria.' },
  { year: '2018', title: 'Expanded to 10 States',       desc: 'Growing demand led us to expand our verified listings network across the South-West, North-West, and FCT.' },
  { year: '2020', title: 'Reached 1,000+ Clients',       desc: 'A major milestone — over one thousand farmers and investors trust us with their land acquisition journey.' },
  { year: '2023', title: '₦100B+ Transacted',           desc: 'Our cumulative transaction value surpassed ₦100 billion, cementing our place as Nigeria\'s top agro-realty platform.' },
  { year: '2025', title: 'Nationwide Coverage',          desc: 'Active listings in 26 states, with dedicated regional advisors in every major agricultural belt of Nigeria.' },
]

export default function AboutPage() {
  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.heroTag}>Our Story</p>
            <h1 className={styles.heroTitle}>
              Building Nigeria's Agricultural
              <em> Future Together</em>
            </h1>
            <p className={styles.heroSub}>
              Since 2016, we've been the trusted bridge between agricultural land and the farmers, investors, and communities who need it most.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─────────────────────────────────── */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <p className={styles.sectionTag}>Our Mission</p>
              <h2 className={styles.sectionTitle}>Democratising Access to Agricultural Land</h2>
              <p className={styles.missionText}>
                Nigeria has over 70 million hectares of arable land, yet access to verified, legally-sound agricultural property remains a challenge for most farmers and investors. Agrolocale was founded to change that.
              </p>
              <p className={styles.missionText}>
                We believe every farmer, entrepreneur, and investor who wants to contribute to Nigeria's food security deserves access to quality land — with clear titles, honest descriptions, and expert support throughout the process.
              </p>

              <div className={styles.missionStats}>
                {[
                  { num: '2016',  lbl: 'Founded'       },
                  { num: '500+',  lbl: 'Listings'      },
                  { num: '26',    lbl: 'States'         },
                  { num: '₦120B+',lbl: 'Transacted'    },
                ].map((s, i) => (
                  <div key={i} className={styles.mStatItem}>
                    <span className={styles.mStatNum}>{s.num}</span>
                    <span className={styles.mStatLbl}>{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.missionImgs}>
              <div className={styles.mImgMain}>
                <Image src="/gallery-2.png" alt="Farmland overview" fill sizes="45vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.mImgSub}>
                <Image src="/elysian-farm.png" alt="Agricultural estate" fill sizes="25vw" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ──────────────────────────────────── */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionCenter}>
            <p className={styles.sectionTag}>What We Stand For</p>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ────────────────────────────────── */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.sectionCenter} style={{ marginBottom: '4rem' }}>
            <p className={`${styles.sectionTag} ${styles.tagLight}`}>Our Journey</p>
            <h2 className={`${styles.sectionTitle} ${styles.titleLight}`}>A Decade of Growth</h2>
          </div>
          <div className={styles.timeline}>
            {timeline.map((t, i) => (
              <div key={i} className={`${styles.tlItem} ${i % 2 === 0 ? styles.tlLeft : styles.tlRight}`}>
                <div className={styles.tlCard}>
                  <span className={styles.tlYear}>{t.year}</span>
                  <h3 className={styles.tlTitle}>{t.title}</h3>
                  <p className={styles.tlDesc}>{t.desc}</p>
                </div>
                <div className={styles.tlDot} />
              </div>
            ))}
            <div className={styles.tlLine} aria-hidden />
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────── */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.sectionCenter} style={{ marginBottom: '3rem' }}>
            <p className={styles.sectionTag}>The People Behind Agrolocale</p>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.sectionSub}>
              A passionate group of agricultural experts, legal professionals, and real estate specialists united by one mission.
            </p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamAvatar} style={{ background: m.color }}>{m.initials}</div>
                <h3 className={styles.teamName}>{m.name}</h3>
                <p className={styles.teamRole}>{m.role}</p>
                <p className={styles.teamBio}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Work with Us?</h2>
            <p className={styles.ctaSub}>Whether you're buying, selling, or just exploring — our team is here to help every step of the way.</p>
            <div className={styles.ctaBtns}>
              <Link href="/listings" className={styles.ctaPrimary}>Browse Properties</Link>
              <Link href="/contact"  className={styles.ctaSecondary}>Contact Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
