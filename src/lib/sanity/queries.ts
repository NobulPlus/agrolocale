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
