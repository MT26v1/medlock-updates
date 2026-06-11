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
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <Image
            src="/logo.png"
            alt="Medlock & Thames"
            width={200}
            height={59}
            style={{ height: 44, width: 'auto' }}
            priority
          />
          <span style={{ fontSize: 14, color: '#fff', textAlign: 'right', lineHeight: 1.5, fontFamily: 'var(--font-ubuntu)' }}>
            Want to learn more?{' '}
            <a
              href="https://www.medlockandthames.com/insights"
              style={{ color: '#21a9ee', textDecoration: 'none', fontWeight: 500 }}
            >
              Visit our insights page
            </a>
          </span>
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #21a9ee 0%, #1a85c0 100%)' }} />
      </header>

      {/* Email content */}
      <main style={{ maxWidth: 720, margin: '32px auto 0', padding: '0 24px 64px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}
          dangerouslySetInnerHTML={{ __html: cleanHtml(update.body) }}
        />
      </main>

      {/* Footer */}
      <footer style={{ background: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#4a6080', textAlign: 'right', lineHeight: 1.8 }}>
            © 2026 Medlock &amp; Thames™&nbsp;&nbsp;t: +44(0)161 250 3376&nbsp;&nbsp;e:{' '}
            <a href="mailto:info@medlockandthames.com" style={{ color: '#4a6080', textDecoration: 'none' }}>info@medlockandthames.com</a>
            <br />
            m: Adamson House, Towers Business Park, Manchester, M20 2YY
          </p>
        </div>
      </footer>

    </div>
  )
}
