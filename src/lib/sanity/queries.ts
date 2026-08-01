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

function normalizeSlugValue(slug?: string): string {
  return slug?.trim() ?? ''
}

function normalizePost(post: Post): Post {
  return {
    ...post,
    slug: {
      ...post.slug,
      current: normalizeSlugValue(post.slug?.current),
    },
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await client.fetch<Post[]>(`
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

  return posts
    .map(normalizePost)
    .filter((post) => post.slug.current.length > 0)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const normalizedSlug = normalizeSlugValue(slug)
  if (!normalizedSlug) {
    return null
  }

  const posts = await client.fetch<Post[]>(`
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
  `, { slug: normalizedSlug })

  if (posts.length > 0) {
    return normalizePost(posts[0])
  }

  const allPosts = await client.fetch<Post[]>(`
    *[_type == "post" && defined(slug.current)] {
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
  `)

  const fallbackMatch = allPosts.find((post) => normalizeSlugValue(post.slug?.current) === normalizedSlug)
  return fallbackMatch ? normalizePost(fallbackMatch) : null
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
      coverImage{
        ...,
        asset->
      },
      description,
      story,
      images[]{
        ...,
        asset->
      },
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
      coverImage{
        ...,
        asset->
      },
      description,
      story,
      images[]{
        ...,
        asset->
      },
      highlightStats,
      featured
    }
  `,
    { slug }
  )

  return events.length > 0 ? events[0] : null
}
