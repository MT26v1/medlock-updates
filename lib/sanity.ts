import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'y9a9c177',
  dataset: 'newsletter',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export interface WeeklyUpdateSummary {
  title: string
  slug: { current: string }
  publishedAt: string
  subject: string
}

export interface WeeklyUpdate extends WeeklyUpdateSummary {
  body: string
}

export async function getAllUpdates(): Promise<WeeklyUpdateSummary[]> {
  return client.fetch(
    `*[_type == "weeklyUpdate"] | order(publishedAt desc) {
      title, slug, publishedAt, subject
    }`
  )
}

export async function getUpdate(slug: string): Promise<WeeklyUpdate | null> {
  return client.fetch(
    `*[_type == "weeklyUpdate" && slug.current == $slug][0] {
      title, slug, publishedAt, subject, body
    }`,
    { slug }
  )
}
