interface MetricCardProps {
  value: string
  label: string
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
      <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">{value}</div>
      <div className="text-xs sm:text-sm md:text-base text-gray-300">{label}</div>
    </div>
  )
}

export interface MetricItem {
  value: string
  label: string
}

interface MetricsDisplayProps {
  metrics: MetricItem[]
  id?: string // Optional ID to identify specific instances
}

export default function MetricsDisplay({ metrics, id }: MetricsDisplayProps) {
  return (
    <div id={id} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
      {metrics.map((metric, index) => (
        <MetricCard key={`${id}-metric-${index}`} value={metric.value} label={metric.label} />
      ))}
    </div>
  )
}

