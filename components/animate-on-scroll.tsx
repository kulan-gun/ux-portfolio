"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  /** Retained for compatibility; all case-study reveals now share one rhythm. */
  delay?: number
  once?: boolean
  /** Retained for compatibility; bounce and long fades are intentionally normalised. */
  animation?: "fade-up" | "fade-in" | "bounce-up"
  initiallyVisible?: boolean
}

export default function AnimateOnScroll({
  children,
  className,
  delay: _delay = 0,
  once = true,
  animation: _animation = "fade-up",
  initiallyVisible = false,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(initiallyVisible)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(initiallyVisible)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (initiallyVisible || reduceMotion) {
      setIsVisible(true)
      hasAnimated.current = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once && hasAnimated.current) return

        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            hasAnimated.current = true
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => observer.disconnect()
  }, [once, initiallyVisible])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "reveal-pending",
        className,
      )}
    >
      {children}
    </div>
  )
}

