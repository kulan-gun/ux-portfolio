"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

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
      behavior: "smooth",
    })
  }

  // Only render on mobile
  if (!isMobile) return null

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={scrollToTop}
        className="inline-flex items-center px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-fui-primary focus:ring-opacity-50"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="mr-1.5 w-4 h-4" aria-hidden="true" />
        <span>Back to top</span>
      </button>
    </div>
  )
}

