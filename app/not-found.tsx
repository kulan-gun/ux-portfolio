import Link from "next/link"

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground font-sans">
      <h1 className="font-sans text-2xl font-semibold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Page not found.</p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-fui font-mono text-xs tracking-widest-fui uppercase text-fui-dim hover:text-fui-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
      >
        Return home
      </Link>
    </main>
  )
}
