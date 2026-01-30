interface QuoteCardProps {
  quote: string
  author: string
  role?: string
  organization?: string
}

export default function QuoteCard({ quote, author, role, organization }: QuoteCardProps) {
  return (
    <figure className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
      <blockquote className="relative">
        {/* Large quote mark */}
        <div className="absolute -top-4 -left-4 text-4xl text-muted-foreground/50" aria-hidden="true">
          "
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed relative">{quote}</p>

        <figcaption className="mt-6 text-muted-foreground">
          <span className="font-medium text-foreground">{author}</span>
          {(role || organization) && (
            <>
              {role && <span className="mx-1">·</span>}
              <span>{role}</span>
              {organization && <span className="mx-1">·</span>}
              <span>{organization}</span>
            </>
          )}
        </figcaption>
      </blockquote>
    </figure>
  )
}

