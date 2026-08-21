"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import type { Status } from "@/components/status-badge"
import { cn } from "@/lib/utils"

const statusLabelMap: Record<string, Status> = {
  Shipped: "SHIPPED",
  LIVE: "LIVE",
  Concept: "CONCEPT",
  PROTOTYPE: "PROTOTYPE",
  Archived: "ARCHIVED",
}

interface CaseStudyPreviewProps {
  date: string
  client: string
  title: string
  subtitle?: string
  href: string
  imageSrc?: string
  status?: { label: string; color?: string } | { label: Status }
  seq?: string
  headingLevel?: "h2" | "h3"
}

export default function CaseStudyPreview({
  date,
  client,
  title,
  subtitle,
  href,
  imageSrc,
  status,
  seq,
  headingLevel = "h3",
}: CaseStudyPreviewProps) {
  const statusKey =
    status && (status.label in statusLabelMap ? statusLabelMap[status.label] : (status.label as Status))
  const resolvedStatus = statusKey ?? "ARCHIVED"
  const showSeq = typeof seq === "string" && seq.length > 0
  const Heading = headingLevel

  return (
    <Link
      href={href}
      className={cn(
        "block min-w-0 w-full group relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-fui-lg",
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
        "motion-safe:hover:scale-[1.01] motion-safe:hover:z-10",
        "motion-safe:focus-visible:scale-[1.01]"
      )}
    >
      <div
        className={cn(
          "relative border rounded-fui-lg overflow-hidden min-w-0 w-full",
          "bg-paper dark:bg-surface border-black/10 dark:border-white/10",
          "p-6 transition-colors duration-300",
          "group-hover:border-fui-primary/50 dark:group-hover:border-fui-primary/50",
          "group-hover:bg-paper-deep dark:group-hover:bg-[#181818]",
          "motion-safe:group-hover:shadow-lg"
        )}
      >
        {showSeq ? (
          <div className="flex justify-between items-start gap-4 mb-4 min-w-0">
            <span className="font-mono text-xs tracking-widest-fui text-fui-dim shrink-0">
              PROJECT {seq.padStart(2, "0")}
            </span>
            <StatusBadge status={resolvedStatus} />
          </div>
        ) : null}

        <div className="flex justify-between items-start gap-4 mb-2 min-w-0">
          <Heading className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-fui-primary dark:group-hover:text-fui-primary break-words min-w-0">
            <span className="block max-w-full">{title}</span>
          </Heading>
          {!showSeq ? <StatusBadge status={resolvedStatus} className="shrink-0 mt-1" /> : null}
        </div>
        {subtitle ? (
          <p className="font-sans text-sm sm:text-base text-muted-foreground mb-3 break-words min-w-0">
            {subtitle}
          </p>
        ) : null}
        <p className="font-mono text-xs tracking-widest-fui text-fui-dim uppercase mb-4 min-w-0">
          {date} · {client}
        </p>

        <div className="relative aspect-video w-full min-w-0 overflow-hidden rounded-xl mt-2">
          <Image
            src={imageSrc || "/placeholder.svg?height=400&width=800"}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-500",
              "brightness-[0.85] dark:brightness-[0.7] group-hover:brightness-100 dark:group-hover:brightness-90"
            )}
          />
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 font-mono text-xs tracking-widest-fui text-fui-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
            <span>[</span>
            <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
            <span>]</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
