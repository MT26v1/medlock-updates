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
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>

      <SiteHeader />

      {/* Email content */}
      <main style={{ maxWidth: 720, margin: '32px auto 0', padding: '0 24px 64px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
          dangerouslySetInnerHTML={{ __html: cleanHtml(update.body) }}
        />
      </main>

      <SiteFooter />

    </div>
  )
}
