import Link from 'next/link'
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
    <div style={{ minHeight: '100vh', background: '#f5f6f8' }}>
      <header style={{ background: '#0B1F3A', padding: '24px 32px' }}>
        <p style={{ color: '#fff', fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: '-0.3px' }}>
          Medlock &amp; Thames
        </p>
        <p style={{ color: '#21a9ee', fontSize: 12, margin: '4px 0 0', letterSpacing: 1, textTransform: 'uppercase' }}>
          Currency Intelligence
        </p>
        <div style={{ height: 3, background: '#21a9ee', marginTop: 16, marginLeft: -32, marginRight: -32 }} />
      </header>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0B1F3A', marginBottom: 8 }}>
          Weekly Market Updates
        </h1>
        <p style={{ color: '#666', marginBottom: 40, fontSize: 15 }}>
          Currency intelligence from our desk, sent weekly.
        </p>

        {updates.length === 0 ? (
          <p style={{ color: '#999' }}>No updates yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {updates.map((u) => (
              <li key={u.slug.current}>
                <Link href={`/${u.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: 10,
                    padding: '20px 24px',
                    border: '1px solid #e2e8f0',
                  }}>
                    <p style={{ fontSize: 12, color: '#21a9ee', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {formatDate(u.publishedAt)}
                    </p>
                    <p style={{ fontSize: 17, fontWeight: 600, color: '#0B1F3A', margin: 0 }}>
                      {u.subject ?? u.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer style={{ background: '#0C1E2E', padding: '24px 32px', marginTop: 64 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#4a5568' }}>
          © {new Date().getFullYear()} Medlock &amp; Thames · Manchester
        </p>
      </footer>
    </div>
  )
}
