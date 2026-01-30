"use client"

import { useEffect, useRef } from "react"

function getNiceScale(rawMax: number, desiredSteps = 5) {
  if (rawMax <= 0) return { niceMax: 1, step: 1 }

  const roughStep = rawMax / desiredSteps
  const pow10 = Math.pow(10, Math.floor(Math.log10(roughStep)))
  const candidates = [1, 2, 2.5, 5, 10].map(m => m * pow10)

  let step = candidates[0]
  for (const c of candidates) {
    const ticks = Math.ceil(rawMax / c) + 1
    if (ticks <= desiredSteps + 1) {
      step = c
      break
    }
  }

  const niceMax = Math.ceil(rawMax / step) * step
  return { niceMax, step }
}

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

export default function BarChart({
  title,
  description,
  data,
  height = 400,
  yAxisLabel,
  xAxisLabel
}: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const chartWidth = canvas.offsetWidth - 80
    const chartHeight = height - 100
    const barSpacing = 2

    const rawMax = Math.max(...data.values)
    const { niceMax, step } = getNiceScale(rawMax, 5)
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
    ctx.textAlign = "right"
    ctx.font = "12px Inter, system-ui, sans-serif"
    ctx.fillStyle = "#999"

    const yAxisSteps = Math.round(niceMax / step)
    for (let i = 0; i <= yAxisSteps; i++) {
      const value = i * step
      const y = chartHeight + 20 - (value / niceMax) * chartHeight

      ctx.beginPath()
      ctx.moveTo(60, y)
      ctx.lineTo(chartWidth + 60, y)
      ctx.strokeStyle = "#333"
      ctx.stroke()

      ctx.fillText(value.toString(), 50, y + 4)
    }

    // Y-axis label
    if (yAxisLabel) {
      ctx.save()
      ctx.translate(15, chartHeight / 2 + 20)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = "center"
      ctx.fillText(yAxisLabel, 0, 0)
      ctx.restore()
    }

    // Bars and x-axis labels
    ctx.textAlign = "center"
    data.values.forEach((value, index) => {
      const x = 60 + index * (barWidth + barSpacing)
      const barHeight = (value / niceMax) * chartHeight
      const y = chartHeight + 20 - barHeight

      ctx.fillStyle = "#90d190"
      ctx.fillRect(x, y, barWidth, barHeight)

      ctx.fillStyle = "#999"
      ctx.fillText((index + 1).toString(), x + barWidth / 2, chartHeight + 40)

      if (data.labels[index]) {
        const label = data.labels[index]
        const truncatedLabel =
          label.length > 10 ? label.substring(0, 10) + "..." : label
        ctx.fillText(truncatedLabel, x + barWidth / 2, chartHeight + 60)
      }
    })

    // X-axis label
    if (xAxisLabel) {
      ctx.fillStyle = "#999"
      ctx.textAlign = "center"
      ctx.fillText(xAxisLabel, chartWidth / 2 + 60, chartHeight + 80)
    }
  }, [data, height, xAxisLabel, yAxisLabel])

  return (
    <div className="rounded-3xl bg-muted p-6 md:p-8 backdrop-blur-sm">
      {title && (
        <h3 className="text-xl md:text-2xl font-normal text-foreground mb-4">
          {title}
        </h3>
      )}
      {description && <p className="text-muted-foreground mb-6">{description}</p>}

      <div className="w-full">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: `${height}px` }}
          aria-label={title || "Bar chart visualization"}
          role="img"
        ></canvas>

        {data.categories && data.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {data.categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <span className="w-3 h-3 inline-block mr-2 bg-blue-500"></span>
                <span className="text-sm text-muted-foreground">{category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
