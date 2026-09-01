import type { Metadata } from 'next'
import styles from './gallery.module.css'
import GalleryHubClient from './GalleryHubClient'

export const metadata: Metadata = {
  title: 'Gallery | Agrolocale',
  description:
    'Explore Agrolocale events, harvest experiences, estate activities, and farm lifestyle moments in our visual gallery.',
}

export default async function GalleryPage() {
  return (
    <main>
      <section className={styles.galleryHero}>
        <div className="container">
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Event Gallery</span>
            <h1 className={styles.heroTitle}>
              Moments from the Farm & Beyond
            </h1>
            <p className={styles.heroSub}>
              Step inside the Agrolocale experience. From harvest days and estate tours to
              community events and resort activities — every moment captured here is a glimpse
              into the life we&apos;re building together.
            </p>
            <div className={styles.heroActions}>
              <a href="#events" className={styles.primaryBtn}>
                Browse Events
              </a>
              <a href="/contact" className={styles.secondaryBtn}>
                Plan Your Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainContent} id="events">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionTag}>Our Events</p>
              <h2 className={styles.sectionTitle}>
                Explore our farm experiences and community moments.
              </h2>
            </div>
            <p className={styles.sectionText}>
              Browse events by category, open a full story, and explore photos from each experience.
              Every event is a window into the Agrolocale community.
            </p>
          </div>

          <GalleryHubClient />
        </div>
      </section>
    </main>
  )
}
