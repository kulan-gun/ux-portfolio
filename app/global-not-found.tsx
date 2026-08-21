import "./globals.css"

export const metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        }}
      >
        <main id="main-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            404
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "hsl(var(--muted-foreground))" }}>
            Page not found.
          </p>
          <a
            href="/"
            className="inline-flex min-h-11 items-center rounded-fui focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "hsl(var(--muted-foreground))",
              textDecoration: "underline",
            }}
          >
            Return home
          </a>
        </main>
      </body>
    </html>
  )
}
