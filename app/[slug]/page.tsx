import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getUpdate, getAllUpdates } from '@/lib/sanity'

export const revalidate = 60

export async function generateStaticParams() {
  const updates = await getAllUpdates()
  return updates.map((u) => ({ slug: u.slug.current }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// Strip tracking pixels injected during email send
function cleanHtml(html: string): string {
  return html
    .replace(/<img[^>]+\/api\/track\/open[^>]*>/gi, '')
    .replace(/href="[^"]+\/api\/track\/click[^"]*url=([^"]+)"/gi, (_, encoded) => {
      try { return `href="${decodeURIComponent(encoded).split('?')[0]}"` } catch { return 'href="#"' }
    })
    // Remove unsubscribe footer paragraph
    .replace(/<p[^>]*>You are receiving this because[^<]*<br[^>]*>[\s\S]*?<\/p>/gi, '')
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const update = await getUpdate(slug)
  if (!update) notFound()

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f8' }}>
      {/* Header */}
      <header style={{ background: '#0B1F3A', padding: '24px 32px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <p style={{ color: '#fff', fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: '-0.3px' }}>
            Medlock &amp; Thames
          </p>
          <p style={{ color: '#21a9ee', fontSize: 12, margin: '4px 0 0', letterSpacing: 1, textTransform: 'uppercase' }}>
            Currency Intelligence
          </p>
        </Link>
        <div style={{ height: 3, background: '#21a9ee', marginTop: 16, marginLeft: -32, marginRight: -32 }} />
      </header>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 24px 0' }}>
        <p style={{ fontSize: 13, color: '#999', margin: 0 }}>
          <Link href="/" style={{ color: '#21a9ee', textDecoration: 'none' }}>All updates</Link>
          {' '}&rsaquo;{' '}
          <span>{formatDate(update.publishedAt)}</span>
        </p>
      </div>

      {/* Email content */}
      <main style={{ maxWidth: 680, margin: '24px auto', padding: '0 24px 64px' }}>
        <div
          style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0' }}
          dangerouslySetInnerHTML={{ __html: cleanHtml(update.body) }}
        />
      </main>

      {/* Footer */}
      <footer style={{ background: '#0C1E2E', padding: '24px 32px' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#4a5568' }}>
          © {new Date().getFullYear()} Medlock &amp; Thames · Manchester
        </p>
      </footer>
    </div>
  )
}
