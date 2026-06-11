import { notFound } from 'next/navigation'
import { getUpdate, getAllUpdates } from '@/lib/sanity'
import { SiteHeader } from '../_components/SiteHeader'
import { SiteFooter } from '../_components/SiteFooter'

export const revalidate = 60

export const metadata = {
  robots: 'noindex, nofollow',
}

export async function generateStaticParams() {
  const updates = await getAllUpdates()
  return updates.map((u) => ({ slug: u.slug.current }))
}

function cleanHtml(html: string): string {
  return html
    .replace(/<img[^>]+\/api\/track\/open[^>]*>/gi, '')
    .replace(/href="[^"]+\/api\/track\/click[^"]*url=([^"]+)"/gi, (_, encoded) => {
      try { return `href="${decodeURIComponent(encoded).split('?')[0]}"` } catch { return 'href="#"' }
    })
    .replace(/<p[^>]*>You are receiving this because[^<]*<br[^>]*>[\s\S]*?<\/p>/gi, '')
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const update = await getUpdate(slug)
  if (!update) notFound()

  return (
    <div style={{ height: '100dvh', background: '#f0f2f5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      <SiteHeader />

      {/* Scrollable email content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 24px 48px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
            dangerouslySetInnerHTML={{ __html: cleanHtml(update.body) }}
          />
        </div>
      </main>

      <SiteFooter />

    </div>
  )
}
