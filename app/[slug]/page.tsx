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
    // Make outer wrapper table transparent so page background shows through
    .replace(/(<table)(\ style="background-color:#E8ECF3")/i, '$1 style="background-color:transparent;width:100%;min-height:100vh"')
    // Give the outer td padding so the white card has breathing room
    .replace(/(<td style="padding:0">)(<table class="mt-container")/i, '<td style="padding:48px 24px">$2')
    // Centre the inner 600px email container and add card shadow
    .replace(/(class="mt-container"\ style=")(width:600px;max-width:600px;background-color:#FFFFFF)/i,
      '$1$2;margin:0 auto;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.06)')
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const update = await getUpdate(slug)
  if (!update) notFound()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundImage: "linear-gradient(rgba(11,31,58,0.70), rgba(11,31,58,0.70)), url('/Towers.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>

      <SiteHeader />

      {/* Email content — no padding/maxWidth here; the email's own grey table fills the page */}
      <main style={{ flex: 1, padding: 0, boxSizing: 'border-box' }}>
        <div dangerouslySetInnerHTML={{ __html: cleanHtml(update.body) }} />
      </main>

      <SiteFooter />

    </div>
  )
}
