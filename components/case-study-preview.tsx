"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import type { Status } from "@/components/status-badge"
import DecryptedText from "@/components/decrypted-text"
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
  href: string
  imageSrc?: string
  status?: { label: string; color?: string } | { label: Status }
  seq?: string
}

export default function CaseStudyPreview({
  date,
  client,
  title,
  href,
  imageSrc,
  status,
  seq = "00",
}: CaseStudyPreviewProps) {
  const statusKey =
    status && (status.label in statusLabelMap ? statusLabelMap[status.label] : (status.label as Status))
  const resolvedStatus = statusKey ?? "ARCHIVED"

  const [hasBeenInView, setHasBeenInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setHasBeenInView(true)
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Link
      href={href}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-fui-lg"
    >
      <div
        ref={cardRef}
        className={cn(
          "relative border rounded-fui-lg overflow-hidden",
          "bg-sheet dark:bg-surface border-black/10 dark:border-white/10",
          "p-6 transition-colors duration-300",
          "hover:border-fui-primary/50 dark:hover:border-fui-primary/50",
          "hover:bg-paper dark:hover:bg-[#181818]"
        )}
      >
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className="font-mono text-xs tracking-widest-fui text-fui-dim shrink-0">
            MISSION {seq.padStart(2, "0")}
          </span>
          <StatusBadge status={resolvedStatus} />
        </div>

        <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-fui-primary dark:group-hover:text-fui-primary mb-2">
          <DecryptedText
            text={title}
            trigger={hasBeenInView ? 1 : 0}
            revealInterval={20}
            scrambleCycles={3}
          />
        </h3>
        <p className="font-mono text-xs tracking-widest-fui text-fui-dim uppercase mb-4">
          {date} · {client}
        </p>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl mt-2">
          <Image
            src={imageSrc || "/placeholder.svg?height=400&width=800"}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-500",
              "brightness-[0.85] dark:brightness-[0.7] group-hover:brightness-100 dark:group-hover:brightness-90",
              "group-hover:scale-[1.02]"
            )}
          />
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 font-mono text-[10px] tracking-widest-fui text-fui-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>[</span>
            <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
            <span>]</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
