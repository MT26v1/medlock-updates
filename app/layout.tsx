import type { Metadata } from 'next'
import { Open_Sans, Ubuntu } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-ubuntu',
})

export const metadata: Metadata = {
  title: 'Market Updates — Medlock & Thames',
  description: 'Weekly currency market intelligence from Medlock & Thames.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://updates.medlockandthames.com'
  ),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.className} ${ubuntu.variable}`}>
      <body>{children}</body>
    </html>
  )
}
