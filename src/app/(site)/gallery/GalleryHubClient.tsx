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

const anniversaryEvent: GalleryDetails = {
  id: 'anniversary-2-years',
  title: 'Celebrating 2 Years of Agrolocale',
  category: 'Milestone Celebration',
  location: 'Agrolocale HQ, Lagos',
  eventDate: '5 July 2026',
  description: 'Marking two years of pioneering agro-realty excellence, empowering investors, and building communities across Nigeria.',
  coverImageUrl: '/images/anniversary.png',
  coverImageAlt: 'Agrolocale 2 Year Anniversary Celebration Banner',
  imageCount: 4,
  featured: true,
  story: [
    {
      _key: 'story-1',
      _type: 'block',
      children: [
        {
          _key: 'story-child-1',
          _type: 'span',
          text: 'We are incredibly proud to celebrate two years of dedication, growth, and partnership. Since our inception in 2024, Agrolocale has set out to transform how agricultural land is acquired and developed in Nigeria. By offering meticulously verified farmlands, luxury farm-resort properties, and dedicated advisory services, we have helped hundreds of investors secure their agricultural future.'
        }
      ],
      markDefs: [],
      style: 'normal'
    },
    {
      _key: 'story-2',
      _type: 'block',
      children: [
        {
          _key: 'story-child-2',
          _type: 'span',
          text: 'Our 2nd anniversary celebration brought together team members, partners, and clients to celebrate our achievements and map out our ambitious vision for the future. From launching Aduke Cottages and Elysian Farms to expanding our nationwide agricultural network, this milestone belongs to everyone who believed in our mission.'
        }
      ],
      markDefs: [],
      style: 'normal'
    }
  ] as any,
  highlightStats: [
    { value: '2+', label: 'Years of Excellence' },
    { value: '6+', label: 'Successful Projects' },
    { value: '250+', label: 'Registered Investors' }
  ],
  images: [
    { url: '/images/gallery/anniversary/WhatsApp Image 2026-07-05 at 8.00.58 PM.jpeg', alt: 'Team celebration and cake cutting' },
    { url: '/images/gallery/anniversary/WhatsApp Image 2026-07-05 at 8.00.59 PM.jpeg', alt: 'Agrolocale anniversary event moments' },
    { url: '/images/gallery/anniversary/WhatsApp Image 2026-07-05 at 8.00.59 PM (1).jpeg', alt: 'Celebrants at Agrolocale anniversary' },
    { url: '/images/gallery/anniversary/WhatsApp Image 2026-07-05 at 8.01.00 PM.jpeg', alt: 'Agrolocale office celebration cake and setup' }
  ]
}

export default function GalleryHubClient() {
  const [events, setEvents] = useState<GalleryDetails[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeEvent, setActiveEvent] = useState<GalleryDetails | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<GalleryDetails | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadEvents() {
      try {
        const galleryEvents = await getAllGalleryEvents()
        if (!mounted) return

        const mapped = [anniversaryEvent, ...galleryEvents.map(mapEvent)]
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

  const modalImages = selectedEvent?.images || []
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
              onClick={() => {
                setSelectedEvent(activeEvent)
                setActiveImageIndex(null)
              }}
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
                  setSelectedEvent(event)
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

      {selectedEvent ? (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedEvent.title} gallery details`}
          onClick={() => {
            setSelectedEvent(null)
            setActiveImageIndex(null)
          }}
        >
          <div className={styles.modalCard} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                setSelectedEvent(null)
                setActiveImageIndex(null)
              }}
              aria-label="Close event details"
            >
              x
            </button>

            <div className={styles.modalHero}>
              <div className={styles.modalHeroCopy}>
                <span className={styles.cardCategory}>{selectedEvent.category}</span>
                <h3 className={styles.modalTitle}>{selectedEvent.title}</h3>
                <p className={styles.modalText}>
                  {selectedEvent.description || 'A visual story from the Agrolocale community.'}
                </p>
                <div className={styles.modalMetaRow}>
                  {selectedEvent.eventDate ? <span>{selectedEvent.eventDate}</span> : null}
                  {selectedEvent.location ? <span>{selectedEvent.location}</span> : null}
                  <span>{selectedEvent.imageCount} photos</span>
                </div>
              </div>

              <div className={styles.modalHeroMedia}>
                {selectedEvent.coverImageUrl ? (
                  <Image
                    src={selectedEvent.coverImageUrl}
                    alt={selectedEvent.coverImageAlt || selectedEvent.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                    className={styles.featuredImage}
                  />
                ) : (
                  <div className={styles.cardPlaceholder}>Agrolocale Event</div>
                )}
              </div>
            </div>

            {selectedEvent.highlightStats && selectedEvent.highlightStats.length > 0 ? (
              <div className={styles.statsGrid}>
                {selectedEvent.highlightStats.map((stat, index) => (
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
                  {selectedEvent.story && selectedEvent.story.length > 0 ? (
                    <PortableText value={selectedEvent.story} />
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
                      <span>{selectedEvent.category}</span>
                    </li>
                    {selectedEvent.eventDate ? (
                      <li>
                        <strong>Date</strong>
                        <span>{selectedEvent.eventDate}</span>
                      </li>
                    ) : null}
                    {selectedEvent.location ? (
                      <li>
                        <strong>Location</strong>
                        <span>{selectedEvent.location}</span>
                      </li>
                    ) : null}
                    <li>
                      <strong>Gallery size</strong>
                      <span>{selectedEvent.imageCount} photos</span>
                    </li>
                  </ul>
                </div>

                <Link href="/contact" className={styles.eventCta}>
                  Enquire about this experience
                </Link>
              </aside>
            </div>

            {selectedEvent.images.length > 0 ? (
              <div className={styles.modalGallery}>
                <p className={styles.sectionTag}>Photo story</p>
                <div className={styles.modalImageGrid}>
                  {selectedEvent.images.map((image, index) => (
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
          aria-label={`${selectedEvent?.title || 'Gallery'} image viewer`}
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
