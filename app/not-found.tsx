import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground font-sans">
      <h1 className="font-sans text-2xl font-semibold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Page not found.</p>
      <Link
        href="/"
        className="font-mono text-xs tracking-widest-fui uppercase text-fui-dim hover:text-fui-primary transition-colors"
      >
        Return home
      </Link>
    </div>
  )
}
