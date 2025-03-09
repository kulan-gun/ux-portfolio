"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import ScrollSpyNavigation from "./scroll-spy-navigation"
import Footer from "./footer"
import TopNavigation from "./top-navigation"

interface CaseStudyLayoutProps {
  title: string
  tags: Array<{ label: string; color: string; hasBackground?: boolean }>
  sections: Array<{ id: string; title: string }>
  children: React.ReactNode
  heroImage?: string
}

export default function CaseStudyLayout({
  title,
  tags,
  sections,
  children,
  heroImage = "/placeholder.svg?height=200&width=1200",
}: CaseStudyLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  // Handle keyboard navigation for the mobile menu
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSidebarOpen(!sidebarOpen)
    }
  }

  // Handle closing the sidebar with Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [sidebarOpen])

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: "#121212" }}>
      {/* Navigation - Static on mobile, sticky on desktop */}
      <TopNavigation onMobileMenuToggle={(isOpen) => setSidebarOpen(isOpen)} />

      {/* Left Navigation - Fixed on desktop, slide-in on mobile */}
      {!isMobile && (
        <div
          id="mobile-menu"
          className="w-64 md:fixed md:top-16 md:bottom-0 md:pt-16 relative"
          style={{ backgroundColor: "#121212" }}
          role="navigation"
          aria-label="Section navigation"
        >
          <div className="pl-8 mb-6 pt-8">
            <Link
              href="/"
              className="inline-flex items-center px-4 pr-5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Go back to home page"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-1.5"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </Link>
          </div>
          <ScrollSpyNavigation sections={sections} />
        </div>
      )}

      {/* Overlay for mobile sidebar */}

      {/* Main Content - With left margin on desktop, full width on mobile */}
      <main className={`flex-1 px-4 sm:px-8 py-12 ${isMobile ? "w-full" : "md:ml-64 md:max-w-[calc(100%-64px)]"}`}>
        <div className="max-w-6xl mx-auto">
          {/* Case Study Title and Lozenges */}
          <div>
            <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
              {tags.map((tag, index) => (
                <div key={index} className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                  <div className="flex items-center gap-2">
                    {tag.hasBackground && tag.color && <div className={`h-2 w-2 rounded-full ${tag.color}`} />}
                    <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">{tag.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <h1 id="case-study-title" className="text-3xl sm:text-4xl md:text-5xl font-display mb-8 sm:mb-12">
              {title}
            </h1>

            {/* Hero image between title and Overview section */}
            <div className="mb-12 sm:mb-16">
              <img
                src={heroImage || "/placeholder.svg"}
                alt={`Project hero image for ${title}`}
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Render children (case study sections) */}
          {children}
        </div>
      </main>

      {/* Add the Footer component */}
      <Footer />
    </div>
  )
}

