import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Us | Agrolocale',
  description: "Learn about Agrolocale — Nigeria's premier agricultural land marketplace. Our story, mission, values, and the passionate team behind the platform.",
}

const team = [
  {
    name: 'Korede Ayeni',
    role: 'CEO',
    photo: '/team/korede_ayeni.jpeg',
    initials: 'KA',
    color: '#0f2d1a',
    bio: 'As the visionary founder and CEO of Agrolocale, Korede Ayeni leads the company\'s strategic direction, growth, and mission to transform agricultural land access across Nigeria. With a deep commitment to innovation and impact, he drives the team\'s pursuit of excellence in agro-realty solutions.',
  },
  {
    name: 'Hamzat Alimat',
    role: 'COO/Head of Account',
    photo: '/team/alimat_hamzat.jpeg',
    initials: 'HA',
    color: '#1e4530',
    bio: 'A results-oriented professional providing leading-edge operational and financial services at Agrolocale. With a friendly spirit that promotes enthusiasm at work and excellent interpersonal communication skills, Alimat is quick at understanding and self-motivating to achieve organisational goals, ensuring smooth financial operations and client-focused service delivery.',
  },
  {
    name: 'Adeoluwa Oluwapamilerinayo',
    role: 'Head Of People/HR',
    photo: '/team/pamilerin_adeoluwa.jpeg',
    initials: 'AO',
    color: '#8b5e2a',
    bio: 'Leads Agrolocale\'s people strategy, culture development, and HR operations with a passion for structure, employee growth, and organisational excellence. Overseeing talent management, workplace policies, and engagement initiatives, she ensures every team member has the tools, clarity, and support needed to thrive in a professional, inclusive, and purpose-driven work environment.',
  },
  {
    name: 'Titilope Awolesi',
    role: 'Head, Legal',
    photo: '/team/legal.jpeg',
    initials: 'TA',
    color: '#2a4a35',
    bio: 'Titilope Oreoluwa Awolesi is a dedicated lawyer with over six years of post-call experience in corporate and commercial law. A University of Lagos alumna, she delivers comprehensive legal services to SMEs and real estate stakeholders — known for meticulous attention to detail, innovative legal solutions, and an unwavering commitment to client excellence.',
  },
  {
    name: 'Shittu Ayomide',
    role: 'HEAD, CUSTOMER EXPERIENCE OFFICER/ADMIN',
    photo: '/team/shittu_ayomide.jpeg',
    initials: 'SA',
    color: '#c9a84c',
    bio: 'An empathetic and seasoned Customer Experience Officer and Administrator dedicated to improving the customer journey at every touchpoint. A University of Lagos alumna, Ayomide has earned multiple awards for exceptional service delivery at leading organisations and brings strong conflict-resolution skills to every client interaction at Agrolocale.',
  },
  {
    name: 'Oyelola Oluwadamilare',
    role: 'Head, Farm Manager',
    photo: '/team/damilare.jpeg',
    initials: 'OO',
    color: '#4a6e30',
    bio: 'An agripreneur and agronomist from Oyo State who cultivates vegetables organically and promotes climate-smart farming. Damilare blends scientific agronomy with entrepreneurial strategy to develop scalable organic production models — emphasising soil health, composting, irrigation, and biocontrol. He also brings deep expertise in broiler production, including nutrition planning, biosecurity, and disease prevention.',
  },
  {
    name: 'Kudayisi Kehinde',
    role: 'Head of Logistics',
    photo: '/team/kehinde.jpeg',
    initials: 'KK',
    color: '#3d6b4f',
    bio: 'Ensuring seamless operations and timely deliveries across all of Agrolocale’s projects. Kudayisi brings expertise in supply chain management, resource allocation, and logistical planning to keep our physical farm cities and daily produce distribution running efficiently and sustainably.',
  },
  {
    name: 'Faniku Oluwakemisola',
    role: 'Project Manager',
    photo: '/team/faniku_kemisola.jpeg',
    initials: 'FO',
    color: '#2a6344',
    bio: 'A Surveying Technology graduate with strong expertise in field surveying, geospatial data collection, and CAD drafting. Skilled in robotic total stations, RTK GNSS, and digital levels, Kemisola has contributed to boundary, construction, and topographic surveys for residential and infrastructure projects, processing data with Civil 3D, MicroSurvey, and GIS software.',
  },
  {
    name: 'Ojelere Eniola',
    role: 'Content Strategist',
    photo: '/team/eniola_ojelere.jpeg',
    initials: 'OE',
    color: '#5a6e3f',
    bio: 'A dedicated social media manager and content creator with a strong passion for storytelling and digital communication. At Agrolocale, Eniola oversees content strategy, manages brand presence across platforms, and develops engaging visuals and campaigns that highlight the company\'s work and impact — building meaningful connections between the brand and its audience.',
  },
  {
    name: 'Hunpatin Sesi Victoria',
    role: 'ASSISTANT CUSTOMER EXPERIENCE OFFICER/ADMIN',
    photo: '/team/victoria.jpeg',
    initials: 'HV',
    color: '#3a8459',
    bio: 'Dedicated to providing top-tier support to Agrolocale’s clients and investors. Victoria ensures every inquiry is handled with care and efficiency, helping to maintain our high standards of customer satisfaction and smooth administrative workflows.',
  },
  {
    name: 'Odey Elizabeth',
    role: 'Assistant Accountant',
    photo: '/team/elizabeth_odey.jpeg',
    initials: 'OE',
    color: '#4a7c59',
    bio: 'An Accounting graduate whose experience with leading real estate companies — including Landwey Investment Limited and its subsidiary Ownland Limited — has built strong analytical skills and exposure to structured financial operations. At Agrolocale, Elizabeth ensures accuracy, transparency, and timely documentation across all financial processes with discipline, adaptability, and dedication.',
  },
  {
    name: 'Udeh Suzan',
    role: 'Agronomist',
    photo: '/team/suzan.jpeg',
    initials: 'US',
    color: '#3a8459',
    bio: 'A dedicated Agronomist committed to ensuring sustainable crop management for diverse clientele through evidence-based agro practices. Suzan is passionate about continuous learning, exploring emerging methods, and innovative research to enhance farm yield performance — achieving optimal results, client satisfaction, and long-term agricultural sustainability.',
  },
]

const values = [
  { icon: '🎯', title: 'Transparency', desc: 'Every listing is honest, verified, and accurately described. No hidden clauses — ever.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We prioritise land that supports sustainable farming and responsible environmental stewardship.' },
  { icon: '🤝', title: 'Partnership', desc: 'Every client is a long-term partner in Nigeria\'s agricultural growth story, not a transaction.' },
  { icon: '⚡', title: 'Excellence', desc: 'From listing verification to deal closure, we hold ourselves to the highest professional standards.' },
  { icon: '🔐', title: 'Integrity', desc: 'Your interests come first. We are bound by strict ethics in all our transactions and advice.' },
  { icon: '📊', title: 'Data-Driven', desc: 'Our valuations and market insights are grounded in real field data and agricultural expertise.' },
]

const timeline = [
  { year: '2016', title: 'Founded in Lagos', desc: 'Agrolocale launched with a mission to bring transparency to agricultural land acquisition across Nigeria.' },
  { year: '2018', title: 'Expanded to 10 States', desc: 'Growing demand led us to expand our verified listings network across the South-West, North-West, and FCT.' },
  { year: '2020', title: 'Reached 1,000+ Clients', desc: 'A major milestone — over one thousand farmers and investors trust us with their land acquisition journey.' },
  { year: '2023', title: '₦100B+ Transacted', desc: 'Our cumulative transaction value surpassed ₦100 billion, cementing our place as Nigeria\'s top agro-realty platform.' },
  { year: '2025', title: 'Nationwide Coverage', desc: 'Active listings in 26 states, with dedicated regional advisors in every major agricultural belt of Nigeria.' },
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
              <p className={styles.sectionTag}>Our Vision & Mission</p>
              <h2 className={styles.sectionTitle}>Pioneering Sustainable Agriculture</h2>
              <h3 className={styles.subHeading}>Our Vision</h3>
              <p className={styles.missionText}>
                Agrolocale's vision is to build self-sustainable (physical and digital) farm cities that are fully solar-powered, technologically advanced, and capable of operating on autopilot to ensure consistent food production, comfortable living, and high-value investment returns.
              </p>
              <h3 className={styles.subHeading} style={{ marginTop: '1.5rem' }}>Our Mission</h3>
              <p className={styles.missionText}>
                Agrolocale’s mission centers on combating food insecurity and enhancing agricultural investment through accessible agriculture and sustainable innovation.
              </p>

              <div className={styles.missionStats}>
                {[
                  { num: '04', lbl: 'Projects Completed' },
                  { num: '250+', lbl: 'Registered Investors' },
                  { num: '50+', lbl: 'Hectares Sold Out' },
                  { num: '350+', lbl: 'Households Served' },
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
                    sizes="150px"
                    style={{ objectFit: 'cover' }}
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

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Work with Us?</h2>
            <p className={styles.ctaSub}>Whether you're buying, selling, or just exploring — our team is here to help every step of the way.</p>
            <div className={styles.ctaBtns}>
              <Link href="/listings" className={styles.ctaPrimary}>Browse Properties</Link>
              <Link href="/contact" className={styles.ctaSecondary}>Contact Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
