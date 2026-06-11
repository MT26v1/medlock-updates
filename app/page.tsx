import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAllUpdates } from '@/lib/sanity'

export const revalidate = 60

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function IndexPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('mt-archive')
  if (!auth || auth.value !== 'authenticated') {
    redirect('/login')
  }

  const updates = await getAllUpdates()

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#0B1F3A' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <Image
            src="/logo.png"
            alt="Medlock & Thames"
            width={200}
            height={59}
            style={{ height: 44, width: 'auto' }}
            priority
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
            <span style={{ fontSize: 18, fontWeight: 300, color: '#fff', fontFamily: 'var(--font-ubuntu)', whiteSpace: 'nowrap' }}>
              Want to learn more?
            </span>
            <a
              href="https://www.medlockandthames.com/insights"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                border: '1.5px solid #21a9ee',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'var(--font-ubuntu)',
                whiteSpace: 'nowrap',
              }}
            >
              More Insights
            </a>
          </div>
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #21a9ee 0%, #1a85c0 100%)' }} />
      </header>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0B1F3A', marginBottom: 6 }}>
          Weekly Market Updates
        </h1>
        <p style={{ color: '#64748b', marginBottom: 36, fontSize: 15 }}>
          Currency intelligence from our desk, sent weekly.
        </p>

        {updates.length === 0 ? (
          <p style={{ color: '#999' }}>No updates yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {updates.map((u) => (
              <li key={u.slug.current}>
                <Link href={`/${u.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: 10,
                    padding: '18px 24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}>
                    <div>
                      <p style={{ fontSize: 11, color: '#21a9ee', margin: '0 0 5px', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 600 }}>
                        {formatDate(u.publishedAt)}
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 600, color: '#0B1F3A', margin: 0 }}>
                        {u.subject ?? u.title}
                      </p>
                    </div>
                    <span style={{ color: '#21a9ee', fontSize: 18, flexShrink: 0 }}>›</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
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
