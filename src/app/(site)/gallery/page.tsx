import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './gallery.module.css'
import { getAllGalleryEvents } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: 'Gallery | Agrolocale',
  description:
    'Explore Agrolocale events, harvest experiences, estate activities, and farm lifestyle moments in our visual gallery.',
}

export default async function GalleryPage() {
  let galleryEvents = []

  try {
    galleryEvents = await getAllGalleryEvents()
  } catch (error) {
    console.error('Failed to fetch gallery events:', error)
  }

  return (
    <main>
      <section className={styles.galleryHero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Agrolocale <em>Gallery</em>
            </h1>
            <p className={styles.heroSub}>
              A visual record of our events, field experiences, produce showcases, and the communities growing with us.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.mainContent}>
        <div className="container">
          {galleryEvents.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No gallery events published yet. Add your first Gallery Event in Sanity Studio.</p>
            </div>
          ) : (
            <div className={styles.eventsStack}>
              {galleryEvents.map((event) => (
                <article key={event._id} className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <div>
                      <div className={styles.metaRow}>
                        <span className={styles.badge}>
                          {event.featured ? 'Featured Event' : 'Gallery Event'}
                        </span>
                        {event.eventDate ? (
                          <span className={styles.metaText}>
                            {new Date(event.eventDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        ) : null}
                        {event.location ? <span className={styles.metaText}>{event.location}</span> : null}
                      </div>
                      <h2 className={styles.eventTitle}>{event.title}</h2>
                      <p className={styles.eventDesc}>
                        {event.description || 'A curated visual highlight from the Agrolocale community.'}
                      </p>
                    </div>
                    <Link href="/contact" className={styles.eventCta}>
                      Enquire Now
                    </Link>
                  </div>

                  <div className={styles.coverWrap}>
                    {event.coverImage ? (
                      <Image
                        src={urlFor(event.coverImage).width(1400).height(760).url()}
                        alt={event.coverImage.alt || event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 90vw"
                        className={styles.coverImage}
                      />
                    ) : (
                      <div className={styles.coverPlaceholder}>Agrolocale Gallery</div>
                    )}
                  </div>

                  {event.images && event.images.length > 0 ? (
                    <div className={styles.galleryGrid}>
                      {event.images.map((image, index) => (
                        <figure key={`${event._id}-${index}`} className={styles.galleryItem}>
                          <div className={styles.galleryImgWrap}>
                            <Image
                              src={urlFor(image).width(900).height(700).url()}
                              alt={image.alt || `${event.title} image ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className={styles.galleryImage}
                            />
                          </div>
                          {image.caption ? (
                            <figcaption className={styles.caption}>{image.caption}</figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
