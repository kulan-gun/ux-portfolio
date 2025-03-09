import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface CaseStudyPreviewProps {
  date: string
  client: string
  title: string
  href: string
  imageSrc?: string
  status?: { label: string; color: string }
}

export default function CaseStudyPreview({ date, client, title, href, imageSrc, status }: CaseStudyPreviewProps) {
  return (
    <Link
      href={href}
      className="block group relative rounded-3xl bg-zinc-700/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-zinc-700/60 hover:scale-[1.02] transform"
    >
      <div className="absolute top-6 right-6 z-10">
        <ArrowUpRight className="w-6 h-6 text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <div className="p-6 pb-4">
        <p className="text-base text-gray-300 mb-2 tracking-[0.1em] uppercase font-sans">
          {date} | {client}
        </p>
        <h3 className="text-2xl font-display font-medium mb-3">{title}</h3>
        {status && (
          <div className="inline-flex rounded-full bg-black px-3 py-1 mb-2">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${status.color}`} />
              <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">{status.label}</span>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 pt-0 pb-6">
        <div className="aspect-video w-full overflow-hidden rounded-2xl relative">
          <Image
            src={imageSrc || "/placeholder.svg?height=400&width=800"}
            alt={`Preview of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </Link>
  )
}

