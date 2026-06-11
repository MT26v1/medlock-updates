import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  const expected = process.env.ARCHIVE_PASSWORD ?? 'mt-archive-2026'

  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('mt-archive', 'authenticated', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  return res
}
