import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kulan - Product Designer',
  description: 'Kulan Gunawardena - UX Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
