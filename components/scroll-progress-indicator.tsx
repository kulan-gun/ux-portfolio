"use client"

import { useEffect, useState } from "react"

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      // Get the total height of the page minus the viewport height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight

      // Get the current scroll position
      const scrollPosition = window.scrollY

      // Calculate the scroll percentage
      const percentage = (scrollPosition / totalHeight) * 100

      // Update state with the calculated percentage
      setScrollProgress(percentage)
    }

    // Add scroll event listener
    window.addEventListener("scroll", calculateScrollProgress)

    // Initial calculation
    calculateScrollProgress()

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", calculateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </div>
  )
}

