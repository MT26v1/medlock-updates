import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getUpdate, getAllUpdates } from '@/lib/sanity'

export const revalidate = 60

export const metadata = {
  robots: 'noindex, nofollow',
}

export async function generateStaticParams() {
  const updates = await getAllUpdates()
  return updates.map((u) => ({ slug: u.slug.current }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
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

      {/* Header */}
      <header style={{ background: '#0B1F3A' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            src="/logo.png"
            alt="Medlock & Thames"
            width={200}
            height={59}
            style={{ height: 44, width: 'auto' }}
            priority
          />
          <span style={{ fontSize: 12, color: '#21a9ee', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500 }}>
            Currency Intelligence
          </span>
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #21a9ee 0%, #1a85c0 100%)' }} />
      </header>

      {/* Date label */}
      <div style={{ maxWidth: 720, margin: '32px auto 0', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
        <p style={{ fontSize: 13, color: '#21a9ee', margin: 0, letterSpacing: 0.5, fontWeight: 500 }}>
          {formatDate(update.publishedAt)}
        </p>
      </div>

      {/* Email content */}
      <main style={{ maxWidth: 720, margin: '16px auto 0', padding: '0 24px 64px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
          dangerouslySetInnerHTML={{ __html: cleanHtml(update.body) }}
        />
      </main>

      {/* Footer */}
      <footer style={{ background: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Image
            src="/logo.png"
            alt="Medlock & Thames"
            width={120}
            height={35}
            style={{ height: 28, width: 'auto', opacity: 0.7 }}
          />
          <p style={{ margin: 0, fontSize: 12, color: '#4a6080' }}>
            © {new Date().getFullYear()} Medlock &amp; Thames Ltd · Manchester · Currency Specialists
          </p>
        </div>
      </footer>

    </div>
  )
}
