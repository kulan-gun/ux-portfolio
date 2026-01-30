import AnimateOnScroll from "@/components/animate-on-scroll"
import MetricsDisplay, { type MetricItem } from "@/components/metrics-display"
import SummaryCard from "@/components/summary-card"

interface OverviewSectionProps {
  metrics: MetricItem[]
  summary: Array<{ title: string; items: string[] }>
  description?: string
  image?: string
}

export default function OverviewSection({
  metrics,
  summary,
  description = "A brief introduction to the case study, highlighting the key challenges, approach, and outcomes. This section provides context and sets expectations for what the reader will learn from this case study.",
  image = "/placeholder.svg?height=150&width=800",
}: OverviewSectionProps) {
  return (
    <section id="overview" className="min-h-screen py-8 sm:py-12" aria-labelledby="overview-heading">
      <AnimateOnScroll animation="bounce-up">
        <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
          Overview
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">{description}</p>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={400}>
        <div className="mt-8 mb-8">
          <MetricsDisplay metrics={metrics} id="overview-metrics" />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={600}>
        <div className="mt-12 mb-12">
          <SummaryCard sections={summary} />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-in" delay={800}>
        <div className="mt-8">
          <img
            src={image || "/placeholder.svg"}
            alt="Project overview diagram showing the key components of the system"
            className="w-full rounded-2xl"
          />
        </div>
      </AnimateOnScroll>
    </section>
  )
}

