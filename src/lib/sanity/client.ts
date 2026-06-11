import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9oq1p93e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-01', // use a current date
  // CDN mode is more reliable in local Windows dev and is fine for public content
  useCdn: true,
})
