"use client"

import { useEffect, useState } from "react"

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let animationFrame = 0

    const calculateScrollProgress = () => {
      if (animationFrame) return

      animationFrame = window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0
        setScrollProgress(Math.min(1, Math.max(0, progress)))
        animationFrame = 0
      })
    }

    window.addEventListener("scroll", calculateScrollProgress, { passive: true })
    window.addEventListener("resize", calculateScrollProgress)
    calculateScrollProgress()

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress)
      window.removeEventListener("resize", calculateScrollProgress)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div
        className="h-full origin-left bg-primary will-change-transform"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
    </div>
  )
}

