"use client"

import { useEffect, useRef } from "react"

type SparticlesInstance = NonNullable<typeof window.Sparticles> extends new (
  ...args: infer _A
) => infer R
  ? R
  : never

const SPARTICLES_SRC = "/vendor/sparticles.js"

let scriptLoadPromise: Promise<NonNullable<typeof window.Sparticles>> | null = null

function loadSparticlesConstructor(): Promise<NonNullable<typeof window.Sparticles>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Sparticles requires a browser environment"))
  }

  if (window.Sparticles) {
    return Promise.resolve(window.Sparticles)
  }

  if (!scriptLoadPromise) {
    scriptLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[data-sparticles="true"]`
      )
      if (existing) {
        existing.addEventListener("load", () => {
          if (window.Sparticles) resolve(window.Sparticles)
          else reject(new Error("Sparticles failed to attach to window"))
        })
        existing.addEventListener("error", () => reject(new Error("Sparticles script error")))
        return
      }

      const script = document.createElement("script")
      script.src = SPARTICLES_SRC
      script.async = true
      script.dataset.sparticles = "true"
      script.onload = () => {
        if (window.Sparticles) resolve(window.Sparticles)
        else reject(new Error("Sparticles failed to attach to window"))
      }
      script.onerror = () => reject(new Error("Failed to load Sparticles script"))
      document.head.appendChild(script)
    })
  }

  return scriptLoadPromise
}

function readTheme(): "dark" | "light" {
  return document.documentElement.classList.contains("light") ? "light" : "dark"
}

function getOptions(theme: "dark" | "light", count: number): Record<string, unknown> {
  const isDark = theme === "dark"
  return {
    count,
    direction: 180,
    drift: 1.2,
    speed: 8,
    minSize: 5,
    maxSize: isDark ? 20 : 15,
    minAlpha: 0.15,
    maxAlpha: isDark ? 0.85 : 0.55,
    alphaSpeed: 8,
    alphaVariance: 1,
    parallax: 0.6,
    rotate: true,
    rotation: 0.8,
    twinkle: true,
    shape: "circle",
    style: "fill",
    glow: isDark ? 6 : 0,
    color: isDark
      ? ["#00FF94", "#3B82F6", "#FAFAFA", "#888888"]
      : ["#166534", "#111111", "#888888"],
    xVariance: 3,
    yVariance: 1.5,
    bounce: false,
  }
}

function clearContainer(container: HTMLElement) {
  container.querySelectorAll("canvas.sparticles").forEach((node) => node.remove())
}

function stopInstance(instance: SparticlesInstance | null) {
  if (!instance) return

  try {
    instance.loop?.stop?.()
  } catch {
    /* not started yet */
  }

  try {
    const { canvas, el } = instance
    if (canvas && el?.contains(canvas)) {
      el.removeChild(canvas)
    }
  } catch {
    /* already removed */
  }

  try {
    window.removeEventListener("resize", instance as unknown as EventListener)
  } catch {
    /* ignore */
  }
}

function styleCanvas(container: HTMLElement) {
  const canvas = container.querySelector("canvas.sparticles")
  if (canvas instanceof HTMLCanvasElement) {
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.setAttribute("aria-hidden", "true")
  }
}

export default function HeroSparticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<SparticlesInstance | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let cancelled = false
    let rafId = 0
    let instance: SparticlesInstance | null = null

    const init = async () => {
      if (cancelled) return

      const { width, height } = container.getBoundingClientRect()
      if (width < 1 || height < 1) {
        rafId = requestAnimationFrame(() => {
          void init()
        })
        return
      }

      try {
        const SparticlesCtor = await loadSparticlesConstructor()
        if (cancelled) return

        stopInstance(instanceRef.current)
        clearContainer(container)
        instanceRef.current = null

        const count = width < 640 ? 40 : width < 1024 ? 60 : 80
        instance = new SparticlesCtor(container, getOptions(readTheme(), count))
        instanceRef.current = instance
        styleCanvas(container)
      } catch (error) {
        if (!cancelled) {
          console.error("HeroSparticles:", error)
        }
      }
    }

    void init()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      stopInstance(instanceRef.current)
      instanceRef.current = null
      clearContainer(container)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hero-sparticles absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  )
}
