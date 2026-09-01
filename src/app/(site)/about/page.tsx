import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './about.module.css'
import { team, values, timeline, imageCollage, aboutStats } from '@/data/about.data'

export const metadata: Metadata = {
  title: 'About Us | Agrolocale',
  description: "Learn about Agrolocale — Nigeria's premier agricultural land marketplace. Our story, mission, values, and the passionate team behind the platform.",
}



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
              Building Nigeria&apos;s Agricultural
              <em> Future Together</em>
            </h1>
            <p className={styles.heroSub}>
              Since 2024, we&apos;ve been the bridge between profitable farmland investment and ownership, farm resort projects and the investors who need it the most.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─────────────────────────────────── */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <p className={styles.sectionTag}>Our Vision & Mission</p>
              <h2 className={styles.sectionTitle}>Pioneering Sustainable Agriculture</h2>
              
              <h3 className={styles.subHeading}>Our Vision</h3>
              <p className={styles.missionText}>
                To be the go-to company in Africa and the world for everything Agro purchase, investment, research, and technology.
              </p>
              
              <h3 className={styles.subHeading} style={{ marginTop: '1.5rem' }}>Our Mission</h3>
              <p className={styles.missionText}>
                To produce as many farmland owners as possible within our premium farm estate developments for food security & sufficiency in the economy.
              </p>

              <div className={styles.missionStats}>
                {aboutStats.map((s, i) => (
                  <div key={i} className={styles.mStatItem}>
                    <span className={styles.mStatNum}>{s.num}</span>
                    <span className={styles.mStatLbl}>{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.missionImgs}>
              <div className={styles.mImgMain}>
                {imageCollage.map((img, i) => (
                  <div key={img.src} className={styles.collageItem}>
                    <Image
                      src={`/${img.src}`}
                      alt={img.alt}
                      fill
                      sizes="(max-width:768px) 45vw, 20vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.mImgSub}>
                <Image src="/about/about2.jpeg" alt="Agricultural estate" fill sizes="25vw" style={{ objectFit: 'cover' }} />
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
            <h2 className={`${styles.sectionTitle} ${styles.titleLight}`}>Our Journey So Far</h2>
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
          <div className={styles.sectionCenter} style={{ marginBottom: '4rem' }}>
            <p className={styles.sectionTag}>The People Behind Agrolocale</p>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.sectionSub}>
              A passionate group of professionals — legal, operational, agronomic, and creative — united by one mission: transforming agricultural land access in Nigeria.
            </p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamPhotoWrap} style={{ background: m.color }}>
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 150px"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
                <div className={styles.teamCardBody}>
                  <p className={styles.teamRole}>{m.role}</p>
                  <h3 className={styles.teamName}>{m.name}</h3>
                  <div className={styles.teamDivider} />
                  <p className={styles.teamBio}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM GALLERY ─────────────────────────────── */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.sectionCenter} style={{ marginBottom: '3.5rem' }}>
            <p className={styles.sectionTag}>Life at Agrolocale</p>
            <h2 className={styles.sectionTitle}>The People Behind the Mission</h2>
            <p className={styles.sectionSub} style={{ maxWidth: '600px', margin: '0 auto' }}>
              One team. One vision. Building Nigeria&apos;s agricultural future — together.
            </p>
          </div>
          <div className={styles.teamGalleryGrid}>
            <div className={`${styles.teamGalleryItem} ${styles.teamGalleryLarge}`}>
              <Image src="/team/Team1.jpeg" alt="Agrolocale team" fill sizes="(max-width:768px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
              <div className={styles.galleryOverlay}>
                <span className={styles.galleryLabel}>🌾 Our Growing Family</span>
              </div>
            </div>
            <div className={styles.teamGalleryStack}>
              <div className={styles.teamGalleryItem}>
                <Image src="/team/Team2.jpeg" alt="Agrolocale team gathering" fill sizes="(max-width:768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryLabel}>💚 Teamwork in Action</span>
                </div>
              </div>
              <div className={styles.teamGalleryItem}>
                <Image src="/team/Team3.jpeg" alt="Agrolocale team at work" fill sizes="(max-width:768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryLabel}>🚀 Building the Future</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Work with Us?</h2>
            <p className={styles.ctaSub}>Whether you&apos;re buying, selling, or just exploring — our team is here to help every step of the way.</p>
            <div className={styles.ctaBtns}>
              <Link href="/projects" className={styles.ctaPrimary}>Browse Properties</Link>
              <Link href="/contact" className={styles.ctaSecondary}>Contact Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
