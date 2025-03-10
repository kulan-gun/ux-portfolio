"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import Footer from "@/components/footer"
import UXLessonsCard from "@/components/ux-lessons-card"

// Define the sections for this case study
const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "technology", title: "Workstream 1 Process" },
  { id: "process-2", title: "Workstream 2 Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

export default function ContactlessTravelCaseStudyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

  // Force scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  // Handle scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

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

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: "#121212" }}>
      <ScrollProgressIndicator />

      {/* Navigation - Static on mobile, sticky on desktop */}
      <TopNavigation onMobileMenuToggle={(isOpen: boolean) => setSidebarOpen(isOpen)} />


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

          {/* Navigation links */}
          <nav className="space-y-6 text-gray-400 pl-8" aria-label="Table of contents">
            <ul className="space-y-6">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className="flex items-center cursor-pointer group w-full text-left focus:outline-none focus:ring-2 focus:ring-dark-purple focus:ring-opacity-50 rounded-sm"
                    onClick={() => scrollToSection(section.id)}
                    aria-current={activeSection === section.id ? "location" : undefined}
                  >
                    <div
                      className={`w-1 h-6 mr-4 rounded transition-colors duration-300 ${activeSection === section.id ? "bg-white" : "bg-transparent group-hover:bg-white/50"
                        }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm font-light transition-colors duration-300 ${activeSection === section.id ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                        }`}
                    >
                      {section.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Overlay for mobile sidebar */}

      {/* Main Content - With left margin on desktop, full width on mobile */}
      <main className={`flex-1 px-4 sm:px-8 py-12 ${isMobile ? "w-full" : "md:ml-64 md:max-w-[calc(100%-64px)]"}`}>
        <div className="max-w-6xl mx-auto">
          {/* Case Study Title and Tags */}
          <div>
            <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Product Designer</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">2024/25</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">GOV.UK CLIENT</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Shipped</span>
                </div>
              </div>
            </div>
            <h1 id="case-study-title" className="text-3xl sm:text-4xl md:text-5xl font-display mb-8 sm:mb-12">
              Designing the future of contactless travel
            </h1>

            {/* Hero image */}
            <div className="mb-12 sm:mb-16">
              <img
                src="/placeholder.svg?height=200&width=1200"
                alt="Project hero image showing the contactless travel interface"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Overview Section */}
          <section id="overview" className="min-h-screen py-8 sm:py-12" aria-labelledby="overview-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Overview
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                I supported a government organisation in modernising travel and migration through two distinct
                workstreams. I worked closely with three user researchers, one content designer and multiple business
                analysts and developers.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">5m+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">global users</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">2m+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">new users onboarded</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">1st</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">first-time GDS assessment pass</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Workstreams</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-gray-300">
                          One workstream seeks to enhance the current digital immigration status service for 5m+ global
                          users, while the other workstream explores the use of biometric technology for seamless,
                          "passport-less" identity verification in the long-term.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">In a nutshell</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-gray-300">
                          My user-centred design (UCD) approach combined Figma mobile prototypes with a Heroku-hosted
                          GOV.UK prototype. This enabled usability testing across diverse demographics, including
                          various digital literacy levels, age groups, and nationalities.
                        </p>
                        <p className="text-gray-300 mt-4">
                          Notably for workstream one, we achieved a first-time GDS assessment pass, advancing the
                          service to public Beta to support 5m+ users worldwide.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Legacy infrastructure</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Diverse user needs</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Security requirements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-12 mb-12"></div>
            </AnimateOnScroll>
          </section>

          {/* Problem Section */}
          <section id="problem" className="min-h-screen py-8 sm:py-12" aria-labelledby="problem-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="problem-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Problem
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                Workstream 1: Digital immigration status service
                <br />
                <br />
                For one workstream, users needed a seamless way to prove their immigration status digitally, replacing
                traditional physical documents that were expiring at the end of 2024.
                <br />
                <br />
                Workstream 2: Biometric self-enrolment trials
                <br />
                <br />
                For the second workstream, the challenges were addressing user trust and security concerns related to
                biometric data collection and storage, and integrating secure biometric authentication processes within
                wider account creation and management user journeys.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Workstream 1 challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Users with limited digital skills struggled with verification</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Inaccessible content due to complex terminology and acronyms</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Technology failures leaving users unable to prove their status</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Users without identity documents facing barriers to account setup</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>
                              Need to respond rapidly to policy shifts (e.g., physical documents expiring in 2024)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Workstream 2 challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Addressing user trust and security concerns related to biometric data</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Ensuring secure biometric data collection and storage</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Integrating biometric authentication within wider account journeys</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Balancing security requirements with user experience</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Opportunities</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Create more accessible digital services for diverse user groups</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Simplify complex processes through user-centered design</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Develop innovative solutions for secure identity verification</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Build user trust in government digital services</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Problem definition diagram illustrating the challenges in traditional ticketing systems"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Process Section - Workstream 1 */}
          <section id="technology" className="min-h-screen py-8 sm:py-12" aria-labelledby="process-heading-1">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="process-heading-1" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Workstream 1: Process
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                For the digital immigration status service, we followed a user-centered design approach to ensure the
                service was accessible and met the needs of diverse users.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Conducted usability tests with diverse user groups to identify pain points and improve digital
                          service accessibility.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Developed iterative prototypes, refining workflows based on continuous feedback from
                          stakeholders and users.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Accessibility compliance</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Ensured compliance with WCAG standards and best practices for digital inclusion.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Collaboration</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Worked closely with policy makers, product managers, and development teams to align design
                          solutions with business goals.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Process diagram showing the design approach for the digital immigration status service"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Process Section - Workstream 2 */}
          <section id="process-2" className="min-h-screen py-8 sm:py-12" aria-labelledby="process-heading-2">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="process-heading-2" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Workstream 2: Process
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                For the biometric self-enrolment trials, we focused on building user trust while ensuring robust
                security measures for handling sensitive biometric data.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Engaged participants in biometric trials to understand attitudes towards fingerprint and
                          facial recognition for identity verification.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Created custom UI components for biometric enrolment, iterating based on real-world testing
                          results.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Security & trust</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Focused on user trust through transparent communication about biometric data handling and
                          privacy measures.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Cross-functional collaboration</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Partnered with security experts, data protection officers, and service designers to ensure
                          robust, future-ready solutions.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Process diagram showing the design approach for the biometric self-enrolment trials"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Solution Section */}
          <section id="solution" className="min-h-screen py-8 sm:py-12" aria-labelledby="solution-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="solution-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Solution
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                Our approach combined rapid prototyping, usability testing, and policy stakeholder collaboration.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">An omni-channel prototype</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-gray-300 mb-4">For the first workstream involving the immigration status service, I did the following:</p>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Developed a hybrid approach integrating a Figma mobile prototyping with a GOV.UK coded prototype in HTML, CSS, JavaScript to simulate an omni-channel experience</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Tested the service with diverse users across multiple countries, ensuring accessibility for different age groups, digital literacy levels, and technical constraints</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Streamlined content and simplified complex terminology to improve comprehension, particularly for users with limited English skills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Simulating face and fingerprint scanning</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-gray-300 mb-4">For the second workstream involving biometric self-enrolment trials, I did the following:</p>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Designed and coded custom UI components for fingerprint and facial recognition, to simulate face and fingerprint scanning</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Tested and iterated the prototype based on design crit feedback and user testing</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Inclusive design practices were used throughout, giving different options for people who do not have all fingers or cannot scan their face (e.g. for religious reasons)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Solution architecture diagram illustrating the key components of the contactless travel system"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Results Section */}
          <section id="results" className="min-h-screen py-8 sm:py-12" aria-labelledby="results-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="results-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Results
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Workstream 1</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-gray-300 mb-4">We achieved a first-time GDS assessment pass, allowing the service to move to public Beta.</p>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>5+ million users worldwide can now prove their immigration status digitally</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Simplified content and removal of complex acronyms through inclusive language design</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Assisted digital support for users who cannot access online services independently</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Workstream 2</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-gray-300">Enhanced user trust in biometric authentication systems, achieving 100% user willingness to participate in follow-up enrolment trials.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Results graph illustrating the positive impact of the contactless travel system"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Conclusion Section */}
          <section id="conclusion" className="min-h-screen py-8 sm:py-12" aria-labelledby="conclusion-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Conclusion
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                By adopting a user-centred, omni-channel design approach, we successfully improved the digital immigration status service, ensuring it works for all users, regardless of digital ability or device access. My hybrid Figma and GOV.UK prototyping method allowed rapid iteration, enabling the team to respond swiftly to policy shifts and real-world challenges.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                Through dedicated efforts on both digital identity management and biometric enrolment trials, we have significantly advanced migration service design. This work highlights the balance between security, usability, and accessibility, setting new benchmarks in digital public service transformation.
              </p>
            </AnimateOnScroll>

            {/* UX Lessons Learned Section */}
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12 grid gap-6">
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8H12.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  title="Inclusive design is essential"
                  description="Designing for the extremes of user ability benefits everyone. By focusing on accessibility for users with disabilities, we created a more intuitive system that all travelers found easier to use, regardless of their technical proficiency or physical capabilities."
                />
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.4 15C19.1277 15.8031 19.2583 16.6718 19.7601 17.37C20.2619 18.0281 21.0755 18.4186 21.9 18.42C21.9726 18.42 22.0451 18.42 22.1177 18.42C22.1177 18.42 22.2 18.42 22.2 18.42C22.2 17.5955 21.8095 16.7819 21.1514 16.2801C20.4932 15.7783 19.6245 15.6477 18.8214 15.92"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  }
                  title="Balance technology with human needs"
                  description="While implementing cutting-edge technology was important, we learned that the most successful aspects of the solution were those that addressed fundamental human needs. Features that reduced anxiety, saved time, and provided clear information were more valued than technically impressive but less practical capabilities."
                />
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M9 11L12 14L22 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  title="In-person testing offers special insights"
                  description="Our most valuable insights came from continuous testing with real users in physical environments. By observing how people interacted with the system in person, we identified and resolved human factors issues that would not have been apparent in remote user testing."
                />
              </div>
            </AnimateOnScroll>
          </section>
        </div>
      </main>

      <BackToTopButton />
      <Footer />
    </div>
  )
}

