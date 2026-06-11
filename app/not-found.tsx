import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 48, fontWeight: 700, color: '#0B1F3A', margin: '0 0 8px' }}>404</p>
        <p style={{ color: '#666', marginBottom: 24 }}>This update doesn&apos;t exist.</p>
        <Link href="/" style={{ color: '#21a9ee', textDecoration: 'none', fontSize: 15 }}>
          ← Back to all updates
        </Link>
      </div>
    </div>
  )
}
