import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Market Updates — Medlock & Thames',
  description: 'Weekly currency market intelligence from Medlock & Thames.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
