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

export interface GalleryEvent {
  _id: string
  title: string
  slug: { current: string }
  eventDate?: string
  location?: string
  coverImage?: any
  description?: string
  images?: GalleryImage[]
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
      location,
      coverImage,
      description,
      images,
      featured
    }
  `)
}
