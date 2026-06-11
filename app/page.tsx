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
    <div style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(11,31,58,0.70), rgba(11,31,58,0.70)), url('/Towers.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', display: 'flex', flexDirection: 'column' }}>

      <SiteHeader />

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

      <SiteFooter />

    </div>
  )
}
