export default function NotFound() {
  return (
    <div
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
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
        404
      </h1>
      <p style={{ marginBottom: "1.5rem", color: "hsl(var(--muted-foreground))" }}>
        Page not found.
      </p>
      <a
        href="/"
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "hsl(var(--muted-foreground))",
          textDecoration: "none",
        }}
      >
        Return home
      </a>
    </div>
  )
}
