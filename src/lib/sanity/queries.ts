import { client } from './client'

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author?: string
  publishedAt: string
  coverImage?: any
  excerpt?: string
  body?: any[]
  categories?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface GalleryImage {
  alt?: string
  caption?: string
  asset?: any
}

export interface GalleryStat {
  label?: string
  value?: string
}

export interface GalleryEvent {
  _id: string
  title: string
  slug: { current: string }
  eventDate?: string
  category?: string
  location?: string
  coverImage?: any
  description?: string
  story?: any[]
  images?: GalleryImage[]
  highlightStats?: GalleryStat[]
  featured?: boolean
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      publishedAt,
      coverImage,
      excerpt,
      categories
    }
  `)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await client.fetch(`
    *[_type == "post" && slug.current == $slug] {
      _id,
      title,
      slug,
      author,
      publishedAt,
      coverImage,
      excerpt,
      body,
      categories,
      seo
    }
  `, { slug })
  
  return posts.length > 0 ? posts[0] : null
}

export async function getAllGalleryEvents(): Promise<GalleryEvent[]> {
  return client.fetch(`
    *[_type == "galleryEvent"] | order(featured desc, eventDate desc, _createdAt desc) {
      _id,
      title,
      slug,
      eventDate,
      category,
      location,
      coverImage,
      description,
      story,
      images,
      highlightStats,
      featured
    }
  `)
}

export async function getGalleryEventBySlug(slug: string): Promise<GalleryEvent | null> {
  const events = await client.fetch(
    `
    *[_type == "galleryEvent" && slug.current == $slug] {
      _id,
      title,
      slug,
      eventDate,
      category,
      location,
      coverImage,
      description,
      story,
      images,
      highlightStats,
      featured
    }
  `,
    { slug }
  )

  return events.length > 0 ? events[0] : null
}
