"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { motionSafeScrollBehavior } from "@/lib/accessibility"

export default function BackToTopButton() {
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: motionSafeScrollBehavior(),
    })
  }

  // Only render on mobile
  if (!isMobile) return null

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={scrollToTop}
        className="inline-flex min-h-11 items-center gap-2 rounded-fui border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-fui-primary/50 hover:bg-sidebar-accent hover:text-fui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
        <span>Back to top</span>
      </button>
    </div>
  )
}

