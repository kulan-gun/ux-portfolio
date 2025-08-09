"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Section = {
  id: string
  title: string
}

interface ScrollSpyNavigationProps {
  sections: Section[]
}

export default function ScrollSpyNavigation({ sections }: ScrollSpyNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching the section

      // Find the section that is currently in view
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset to account for fixed header
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="space-y-6 text-gray-300 pl-8" aria-label="Table of contents">
      <ul className="space-y-6">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className="flex items-center cursor-pointer group w-full text-left focus:outline-none focus:ring-2 focus:ring-dark-purple focus:ring-opacity-50 rounded-sm"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSection === section.id ? "location" : undefined}
            >
              <div
                className={cn(
                  "w-1 h-6 mr-4 rounded transition-colors duration-300",
                  activeSection === section.id ? "bg-white" : "bg-transparent group-hover:bg-white/50",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-sm font-light transition-colors duration-300",
                  activeSection === section.id ? "text-white" : "text-gray-300 group-hover:text-gray-300",
                )}
              >
                {section.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

