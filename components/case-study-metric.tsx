import MetricShuffle from "@/components/metric-shuffle"
import { cn } from "@/lib/utils"

type CaseStudyMetricProps = {
  label: string
  value: string
  note?: string
  trend?: "up" | "down"
  scrambleLetters?: boolean
  compact?: boolean
}

export default function CaseStudyMetric({
  label,
  value,
  note,
  trend,
  scrambleLetters = false,
  compact = false,
}: CaseStudyMetricProps) {
  return (
    <article
      className="flex h-full min-h-full flex-col rounded-fui-lg border border-border bg-card p-5 sm:p-6 md:p-7"
    >
      <h3 className="mb-5 min-h-[2.75rem] text-sm font-medium leading-snug text-foreground sm:min-h-[3.25rem] sm:text-base">
        {label}
      </h3>
      <div
        className={cn(
          "mt-auto font-normal text-foreground",
          compact
            ? "text-2xl sm:text-3xl md:text-4xl"
            : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
        )}
      >
        <MetricShuffle final={value} scrambleLetters={scrambleLetters} />
      </div>
      <p className="mt-4 min-h-[2.75rem] text-xs leading-snug text-muted-foreground sm:text-sm">
        {note ? (
          <>
            {trend === "up" && <span aria-hidden="true">↑ </span>}
            {trend === "down" && <span aria-hidden="true">↓ </span>}
            {note}
          </>
        ) : (
          <span className="sr-only">No additional detail</span>
        )}
      </p>
    </article>
  )
}
