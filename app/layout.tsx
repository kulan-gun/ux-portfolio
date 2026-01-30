import type { Metadata } from "next"
import "./globals.css"

const themeInitScript = `
(function(){
  try {
    var k='operative-theme';
    var t='dark';
    if (typeof localStorage!='undefined') { var s=localStorage.getItem(k); if (s==='light'||s==='dark') t=s; }
    var el=document.documentElement;
    if (el) { el.classList.remove('light','dark'); el.classList.add(t); }
  } catch (_) {}
})();
`

export const metadata: Metadata = {
  title: "Kulan Gunawardena — Senior Experience Designer",
  description: "Optimising the experience of trust-critical systems. Kulan Gunawardena · Autodesk.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
