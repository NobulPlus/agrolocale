'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import styles from './gallery.module.css'
import { getAllGalleryEvents, type GalleryEvent } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

type StoryImage = {
  url: string
  alt: string
  caption?: string
}

type GalleryDetails = {
  id: string
  title: string
  category: string
  location?: string
  eventDate?: string
  description?: string
  coverImageUrl?: string
  coverImageAlt?: string
  imageCount: number
  featured: boolean
  story?: GalleryEvent['story']
  highlightStats?: GalleryEvent['highlightStats']
  images: StoryImage[]
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function mapEvent(event: GalleryEvent): GalleryDetails {
  const validImages =
    event.images?.filter((image) => image?.asset?._ref || image?.asset?._id) || []

  return {
    id: event._id,
    title: event.title,
    category: event.category || 'Gallery Event',
    location: event.location,
    eventDate: formatDate(event.eventDate),
    description: event.description,
    coverImageUrl: event.coverImage
      ? urlFor(event.coverImage).width(1200).height(900).url()
      : undefined,
    coverImageAlt: event.coverImage?.alt,
    imageCount: event.images?.length || 0,
    featured: Boolean(event.featured),
    story: event.story,
    highlightStats: event.highlightStats,
    images:
      validImages.map((image, index) => ({
        url: urlFor(image).width(1400).height(1050).url(),
        alt: image.alt || `${event.title} image ${index + 1}`,
        caption: image.caption,
      })) || [],
  }
}

export default function GalleryHubClient() {
  const [events, setEvents] = useState<GalleryDetails[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeEvent, setActiveEvent] = useState<GalleryDetails | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadEvents() {
      try {
        const galleryEvents = await getAllGalleryEvents()
        if (!mounted) return

        const mapped = galleryEvents.map(mapEvent)
        setEvents(mapped)
        setActiveEvent(mapped.find((event) => event.featured) || mapped[0] || null)
        setHasError(false)
      } catch (error) {
        console.error('Failed to fetch gallery events:', error)
        if (!mounted) return
        setHasError(true)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadEvents()

    return () => {
      mounted = false
    }
  }, [])

  const categories = useMemo(() => {
    const values = Array.from(new Set(events.map((event) => event.category).filter(Boolean)))
    return ['All', ...values]
  }, [events])

  const visibleEvents = useMemo(() => {
    if (activeCategory === 'All') return events
    return events.filter((event) => event.category === activeCategory)
  }, [activeCategory, events])

  const modalImages = activeEvent?.images || []
  const lightboxImage = activeImageIndex !== null ? modalImages[activeImageIndex] : null

  if (isLoading) {
    return (
      <div className={styles.emptyState}>
        <p>Loading gallery events...</p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={styles.emptyState}>
        <p>We couldn't load the gallery right now. Please try refreshing the page.</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No events have been published yet. Check back soon — new experiences are on the way.</p>
      </div>
    )
  }

  return (
    <>
      {activeEvent ? (
        <article className={styles.featuredPanel}>
          <div className={styles.featuredMedia}>
            {activeEvent.coverImageUrl ? (
              <Image
                src={activeEvent.coverImageUrl}
                alt={activeEvent.coverImageAlt || activeEvent.title}
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                className={styles.featuredImage}
              />
            ) : (
              <div className={styles.cardPlaceholder}>Featured Event</div>
            )}
          </div>
          <div className={styles.featuredBody}>
            <span className={styles.featuredLabel}>Featured event</span>
            <h2>{activeEvent.title}</h2>
            <p>
              {activeEvent.description ||
                'A standout Agrolocale moment highlighted for quick access.'}
            </p>
            <div className={styles.featuredMeta}>
              <span>{activeEvent.category}</span>
              {activeEvent.eventDate ? <span>{activeEvent.eventDate}</span> : null}
              {activeEvent.location ? <span>{activeEvent.location}</span> : null}
            </div>
            <button
              type="button"
              className={styles.featuredCta}
              onClick={() => setActiveEvent(activeEvent)}
            >
              Open featured story
            </button>
          </div>
        </article>
      ) : null}

      <div className={styles.filterBar}>
        <div className={styles.filterLabel}>Browse by category</div>
        <div className={styles.filterChips}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filterChip} ${
                activeCategory === category ? styles.filterChipActive : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleEvents.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No events found in this category yet. Try browsing another category.</p>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {visibleEvents.map((event) => (
            <article key={event.id} className={styles.card}>
              <button
                type="button"
                className={styles.cardLink}
                onClick={() => {
                  setActiveEvent(event)
                  setActiveImageIndex(null)
                }}
              >
                <div className={styles.cardMedia}>
                  {event.coverImageUrl ? (
                    <Image
                      src={event.coverImageUrl}
                      alt={event.coverImageAlt || event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.cardImage}
                    />
                  ) : (
                    <div className={styles.cardPlaceholder}>Agrolocale Gallery</div>
                  )}
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardMetaTop}>
                    <span className={styles.cardCategory}>{event.category}</span>
                    {event.featured ? (
                      <span className={styles.featuredBadge}>Featured</span>
                    ) : null}
                  </div>
                  <div className={styles.cardMetaBottom}>
                    <span>{event.imageCount} photos</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardDateRow}>
                    {event.eventDate ? <span>{event.eventDate}</span> : null}
                    {event.location ? <span>{event.location}</span> : null}
                  </div>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardText}>
                    {event.description || 'A moment from the Agrolocale community.'}
                  </p>
                  <span className={styles.cardCta}>View event story -&gt;</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      )}

      {activeEvent ? (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeEvent.title} gallery details`}
          onClick={() => {
            setActiveEvent(null)
            setActiveImageIndex(null)
          }}
        >
          <div className={styles.modalCard} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                setActiveEvent(null)
                setActiveImageIndex(null)
              }}
              aria-label="Close event details"
            >
              x
            </button>

            <div className={styles.modalHero}>
              <div className={styles.modalHeroCopy}>
                <span className={styles.cardCategory}>{activeEvent.category}</span>
                <h3 className={styles.modalTitle}>{activeEvent.title}</h3>
                <p className={styles.modalText}>
                  {activeEvent.description || 'A visual story from the Agrolocale community.'}
                </p>
                <div className={styles.modalMetaRow}>
                  {activeEvent.eventDate ? <span>{activeEvent.eventDate}</span> : null}
                  {activeEvent.location ? <span>{activeEvent.location}</span> : null}
                  <span>{activeEvent.imageCount} photos</span>
                </div>
              </div>

              <div className={styles.modalHeroMedia}>
                {activeEvent.coverImageUrl ? (
                  <Image
                    src={activeEvent.coverImageUrl}
                    alt={activeEvent.coverImageAlt || activeEvent.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                    className={styles.featuredImage}
                  />
                ) : (
                  <div className={styles.cardPlaceholder}>Agrolocale Event</div>
                )}
              </div>
            </div>

            {activeEvent.highlightStats && activeEvent.highlightStats.length > 0 ? (
              <div className={styles.statsGrid}>
                {activeEvent.highlightStats.map((stat, index) => (
                  <article
                    key={`${stat.label || stat.value || 'stat'}-${index}`}
                    className={styles.statCard}
                  >
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            ) : null}

            <div className={styles.modalBody}>
              <div className={styles.modalStory}>
                <p className={styles.sectionTag}>Event story</p>
                <div className={styles.modalProse}>
                  {activeEvent.story && activeEvent.story.length > 0 ? (
                    <PortableText value={activeEvent.story} />
                  ) : (
                    <p>More details about this event coming soon.</p>
                  )}
                </div>
              </div>

              <aside className={styles.modalSidebar}>
                <div className={styles.sidebarCard}>
                  <h3>Quick details</h3>
                  <ul>
                    <li>
                      <strong>Category</strong>
                      <span>{activeEvent.category}</span>
                    </li>
                    {activeEvent.eventDate ? (
                      <li>
                        <strong>Date</strong>
                        <span>{activeEvent.eventDate}</span>
                      </li>
                    ) : null}
                    {activeEvent.location ? (
                      <li>
                        <strong>Location</strong>
                        <span>{activeEvent.location}</span>
                      </li>
                    ) : null}
                    <li>
                      <strong>Gallery size</strong>
                      <span>{activeEvent.imageCount} photos</span>
                    </li>
                  </ul>
                </div>

                <Link href="/contact" className={styles.eventCta}>
                  Enquire about this experience
                </Link>
              </aside>
            </div>

            {activeEvent.images.length > 0 ? (
              <div className={styles.modalGallery}>
                <p className={styles.sectionTag}>Photo story</p>
                <div className={styles.modalImageGrid}>
                  {activeEvent.images.map((image, index) => (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      className={styles.modalImageCard}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <div className={styles.modalImageFrame}>
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.cardImage}
                        />
                      </div>
                      {image.caption ? (
                        <span className={styles.modalImageCaption}>{image.caption}</span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {lightboxImage ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeEvent?.title || 'Gallery'} image viewer`}
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close image viewer"
          >
            x
          </button>

          {modalImages.length > 1 ? (
            <>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveImageIndex((current) =>
                    current === null ? 0 : (current - 1 + modalImages.length) % modalImages.length
                  )
                }}
                aria-label="Previous image"
              >
                &lt;
              </button>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveImageIndex((current) =>
                    current === null ? 0 : (current + 1) % modalImages.length
                  )
                }}
                aria-label="Next image"
              >
                &gt;
              </button>
            </>
          ) : null}

          <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <div className={styles.lightboxFrame}>
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                fill
                sizes="100vw"
                className={styles.cardImage}
              />
            </div>
            {lightboxImage.caption ? (
              <p className={styles.lightboxCaption}>{lightboxImage.caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
