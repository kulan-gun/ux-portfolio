"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number // Delay in ms
  once?: boolean // Whether to only animate once
  animation?: "fade-up" | "fade-in" | "bounce-up" // Animation type
  initiallyVisible?: boolean // Whether to show the animation immediately on load
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  once = true,
  animation = "fade-up",
  initiallyVisible = false,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(initiallyVisible)
  const [hasAnimated, setHasAnimated] = useState(initiallyVisible)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If initiallyVisible is true, we don't need to observe
    if (initiallyVisible) {
      setIsVisible(true)
      if (once) setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we only want to animate once and it's already animated, do nothing
        if (once && hasAnimated) return

        // Update visibility state based on intersection
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) setHasAnimated(true)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, hasAnimated, initiallyVisible])

  // Animation classes based on the selected animation type
  const animationClasses = {
    "fade-up": "translate-y-10 opacity-0",
    "fade-in": "opacity-0",
    "bounce-up": "translate-y-16 opacity-0",
  }

  // Transition classes based on the selected animation type
  const transitionClasses = {
    "fade-up": "transition-all duration-700 ease-out",
    "fade-in": "transition-opacity duration-700 ease-out",
    "bounce-up": "transition-all duration-700 ease-out",
  }

  return (
    <div
      ref={ref}
      className={cn(transitionClasses[animation], isVisible ? "" : animationClasses[animation], className)}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isVisible
          ? "translate3d(0, 0, 0)"
          : animation === "fade-in"
            ? "translate3d(0, 0, 0)"
            : animation === "bounce-up"
              ? "translate3d(0, 4rem, 0)"
              : "translate3d(0, 2.5rem, 0)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  )
}

