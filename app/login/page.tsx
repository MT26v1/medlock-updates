'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#0B1F3A' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image src="/logo.png" alt="Medlock & Thames" width={200} height={59} style={{ height: 44, width: 'auto' }} priority />
          <span style={{ fontSize: 12, color: '#21a9ee', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500 }}>Currency Intelligence</span>
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #21a9ee 0%, #1a85c0 100%)' }} />
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '40px', width: '100%', maxWidth: 360 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0B1F3A', margin: '0 0 8px' }}>
            Archive access
          </h1>
          <p style={{ color: '#666', fontSize: 14, margin: '0 0 28px' }}>
            Enter your password to view all updates.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: 15,
                border: error ? '1.5px solid #e53e3e' : '1.5px solid #e2e8f0',
                borderRadius: 8,
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 8,
              }}
            />
            {error && (
              <p style={{ color: '#e53e3e', fontSize: 13, margin: '0 0 12px' }}>
                Incorrect password.
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: 8,
                background: loading || !password ? '#93c5e8' : '#21a9ee',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading || !password ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
