import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kulan - Product Designer",
  description: "Kulan Gunawardena - UX Portfolio",
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

        {/* Sans serif for body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
          rel="stylesheet"
        />

        {/* Monospace options for code and typing animation */}
        <link
          href="https://fonts.googleapis.com/css2?family=Recursive:wght@300..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}



