"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  title?: string
  description?: string
  data: {
    labels: string[]
    values: number[]
    categories?: string[]
  }
  height?: number
  yAxisLabel?: string
  xAxisLabel?: string
}

export default function BarChart({ title, description, data, height = 400, yAxisLabel, xAxisLabel }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const chartWidth = canvas.offsetWidth - 80 // Left padding for y-axis labels
    const chartHeight = height - 100 // Bottom padding for x-axis labels
    const barSpacing = 2
    const maxValue = Math.max(...data.values) * 1.1 // Add 10% padding to the top
    const barWidth = chartWidth / data.values.length - barSpacing

    // Draw y-axis
    ctx.beginPath()
    ctx.moveTo(60, 20)
    ctx.lineTo(60, chartHeight + 20)
    ctx.strokeStyle = "#666"
    ctx.stroke()

    // Draw x-axis
    ctx.beginPath()
    ctx.moveTo(60, chartHeight + 20)
    ctx.lineTo(chartWidth + 60, chartHeight + 20)
    ctx.strokeStyle = "#666"
    ctx.stroke()

    // Draw y-axis grid lines and labels
    const yAxisSteps = 5
    ctx.textAlign = "right"
    ctx.font = "12px Inter, system-ui, sans-serif"
    ctx.fillStyle = "#999"

    for (let i = 0; i <= yAxisSteps; i++) {
      const y = chartHeight + 20 - (i * chartHeight) / yAxisSteps
      const value = Math.round((i * maxValue) / yAxisSteps)

      // Grid line
      ctx.beginPath()
      ctx.moveTo(60, y)
      ctx.lineTo(chartWidth + 60, y)
      ctx.strokeStyle = "#333"
      ctx.stroke()

      // Label
      ctx.fillText(value.toString(), 50, y + 4)
    }

    // Draw y-axis label if provided
    if (yAxisLabel) {
      ctx.save()
      ctx.translate(15, chartHeight / 2 + 20)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = "center"
      ctx.fillText(yAxisLabel, 0, 0)
      ctx.restore()
    }

    // Draw bars and x-axis labels
    ctx.textAlign = "center"

    data.values.slice(0, 7).forEach((value, index) => {
      const x = 60 + index * (barWidth + barSpacing)
      const barHeight = (value / maxValue) * chartHeight
      const y = chartHeight + 20 - barHeight

      // Draw bar
      ctx.fillStyle = "#90d190" // Light green color
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw x-axis label (category number)
      ctx.fillStyle = "#999"
      ctx.fillText((index + 1).toString(), x + barWidth / 2, chartHeight + 40)

      // Draw x-axis label (truncated category name)
      if (data.labels[index]) {
        const label = data.labels[index]
        const truncatedLabel = label.length > 10 ? label.substring(0, 10) + "..." : label
        ctx.fillText(truncatedLabel, x + barWidth / 2, chartHeight + 60)
      }
    })

    // Draw x-axis label if provided
    if (xAxisLabel) {
      ctx.fillStyle = "#999"
      ctx.textAlign = "center"
      ctx.fillText(xAxisLabel, chartWidth / 2 + 60, chartHeight + 80)
    }
  }, [data, height, xAxisLabel, yAxisLabel])

  return (
    <div className="rounded-3xl bg-zinc-900/50 p-6 md:p-8 backdrop-blur-sm">
      {title && <h3 className="text-xl md:text-2xl font-normal text-white mb-4">{title}</h3>}
      {description && <p className="text-gray-300 mb-6">{description}</p>}

      <div className="w-full">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: `${height}px` }}
          aria-label={title || "Bar chart visualization"}
          role="img"
        ></canvas>

        {/* Legend for categories if provided */}
        {data.categories && data.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {data.categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <span className="w-3 h-3 inline-block mr-2 bg-blue-500"></span>
                <span className="text-sm text-gray-300">{category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

