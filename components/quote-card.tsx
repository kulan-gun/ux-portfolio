interface QuoteCardProps {
  quote: string
  author: string
  role?: string
  organization?: string
}

export default function QuoteCard({ quote, author, role, organization }: QuoteCardProps) {
  return (
    <figure className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
      <blockquote className="relative">
        {/* Large quote mark */}
        <div className="absolute -top-4 -left-4 text-4xl text-gray-700" aria-hidden="true">
          "
        </div>

        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed relative">{quote}</p>

        <figcaption className="mt-6 text-gray-300">
          <span className="font-medium text-white">{author}</span>
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

