import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAllUpdates } from '@/lib/sanity'
import { SiteHeader } from './_components/SiteHeader'
import { SiteFooter } from './_components/SiteFooter'

export const revalidate = 60

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).toUpperCase()
}

export default async function IndexPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('mt-archive')
  if (!auth || auth.value !== 'authenticated') {
    redirect('/login')
  }

  const updates = await getAllUpdates()

  return (
    <div style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(11,31,58,0.70), rgba(11,31,58,0.70)), url('/Towers.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', display: 'flex', flexDirection: 'column' }}>

      <SiteHeader />

      <main style={{ flex: 1, maxWidth: 960, margin: '0 auto', padding: '56px 24px 64px', width: '100%', boxSizing: 'border-box' }}>

        {/* Page heading */}
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#21a9ee' }}>
          From the desk
        </p>
        <h1 style={{ margin: '0 0 6px', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, color: '#F7F4EE', fontFamily: 'var(--font-ubuntu)', lineHeight: 1.15 }}>
          Weekly Market Updates
        </h1>
        <p style={{ margin: '0 0 40px', fontSize: 15, color: 'rgba(247,244,238,0.55)', fontWeight: 400 }}>
          Currency intelligence from our desk, sent weekly.
        </p>

        {/* Update list panel */}
        {updates.length === 0 ? (
          <p style={{ color: 'rgba(247,244,238,0.5)' }}>No updates yet.</p>
        ) : (
          <div style={{ background: 'rgba(11,31,58,0.72)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
            {updates.map((u, i) => (
              <Link key={u.slug.current} href={`/${u.slug.current}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="update-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    padding: '18px 28px',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 28, minWidth: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#21a9ee', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {formatDate(u.publishedAt)}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: '#F7F4EE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {u.subject ?? u.title}
                    </span>
                  </div>
                  <span style={{ color: '#21a9ee', fontSize: 20, flexShrink: 0, lineHeight: 1 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />

    </div>
  )
}
