"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import AnimateOnScroll from "@/components/animate-on-scroll"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import SummaryCard from "@/components/summary-card"

// Define the sections for this case study
const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

export default function BenefitsCaseStudyPage() {
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
                      className={`w-1 h-6 mr-4 rounded transition-colors duration-300 ${
                        activeSection === section.id ? "bg-white" : "bg-transparent group-hover:bg-white/50"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm font-light transition-colors duration-300 ${
                        activeSection === section.id ? "text-white" : "text-gray-400 group-hover:text-gray-300"
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
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">2024</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Confidential Client</span>
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
              Helping citizens get their benefits faster
            </h1>

            {/* Hero image */}
            <div className="mb-12 sm:mb-16">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwp-work1-YBcOjNYGrLjyFctNlf12YOF2Jeftgh.png"
                alt="Project hero image showing the benefits application interface"
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
                This case study highlights my work on a UK government benefits service, enabling 500,000 - 700,000
                citizens each year to submit fit notes and access financial support.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">46K</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">monthly sessions</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">+10%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      points increase in digital uptake
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">+5%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">points increase in CSAT</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-12 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Key Facts</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Project duration: 1 year, 2 months</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Team size: 10+ members</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>My role: Lead UX Designer</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Primary focus: Improving user experience</span>
                          </li>
                        </ul>
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
                            <span>Limited developer capacity</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Nuanced policy requirements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Approach</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Design thinking and systems thinking</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Iterative testing and refinement</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Cross-functional collaboration</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                Citizens were facing significant delays and complications when applying for and receiving their
                benefits. Through research, we identified that primary users are likely to submit their fit note several
                times due to a recurring health condition.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">User pain points</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Guidance is confusing and hard to interpret</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Facing technical issues when uploading fit notes</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Incompatible file format for file upload</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>High abandonment rate during submission</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-white">Business challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-gray-300">
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>High support call volume</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Manual processing overhead</span>
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
                            <span>Streamline the submission process</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Improve clarity of instructions</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-white">•</span>
                            <span>Reduce call support needs through better design</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center">
                    {/* User Journey Map */}
                    <div className="mb-12">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-normal text-white">Persona</h3>
                          <p className="text-gray-400">
                            Andy, who has chronic health conditions, relies on government support to manage his living
                            expenses. He wants to ensure he receives the benefits he needs to maintain his financial
                            stability.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Journey Stages */}
                    <div className="grid grid-cols-4 gap-4 mb-8" role="region" aria-label="User journey stages">
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Consider</h4>
                        <p className="text-sm text-gray-400">
                          Begins benefits claim and obtains a fit note from the doctor.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Explore</h4>
                        <p className="text-sm text-gray-400">
                          Reads instructions. Selects either paper or digital fit note. Follows guidance.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Upload</h4>
                        <p className="text-sm text-gray-400">
                          Selects the correct format. Uploads the fit note. Asks for help from friends or family if
                          needed.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Accept</h4>
                        <p className="text-sm text-gray-400">
                          If successful, Andy gets a text notification, and the fit note is sent for processing.
                          Otherwise, he must post it manually.
                        </p>
                      </div>
                    </div>

                    {/* Emotion Line */}
                    <div
                      className="relative h-40 mb-8"
                      aria-label="User emotion journey graph showing fluctuating satisfaction levels"
                    >
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 800 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-hidden="true"
                      >
                        <path
                          d="M0,20 Q100,0 200,60 T400,80 T600,40 T800,90"
                          stroke="white"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle cx="0" cy="20" r="8" fill="#2DD4BF" />
                        <circle cx="200" cy="60" r="8" fill="#2DD4BF" />
                        <circle cx="400" cy="80" r="8" fill="#2DD4BF" />
                        <circle cx="800" cy="90" r="8" fill="#2DD4BF" />
                      </svg>
                    </div>

                    {/* Quotes */}
                    <div className="grid grid-cols-4 gap-4" aria-label="User quotes at different journey stages">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"What do I need to do here?"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"Seems clear enough"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"Wait, this was meant to be simple!"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"That took far too long"</p>
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
                  alt="Problem definition diagram illustrating the challenges in the benefits application process"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Process Section */}
          <section id="process" className="min-h-screen py-8 sm:py-12" aria-labelledby="process-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="process-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Process
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                My primary tools were Figma and the GOV.UK prototyping kit, which uses HTML, CSS and JavaScript. Our
                team's user-centred design approach was as follows:
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Number Circle */}
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">User research</h3>

                      {/* Tasks List */}
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Conducted interviews, surveys, and usability testing with citizens and staff to uncover
                          actionable insights.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Analysis and ideation</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Assessed back-end performance and user flows, identified bottlenecks, and drew inspiration
                          from similar services.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Prototyping and testing</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Designed low- and high-fidelity prototypes, iteratively tested with users, and refined based
                          on feedback.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Collaboration and alignment</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Worked with UX writers, researchers, developers, and policy teams to ensure feasibility and
                          secure sign-off.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">5</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Implementation</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Partnered with developers to roll out changes, preserving the design intent and improving the
                          user experience.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={800}>
              <div className="mt-12 mb-12">
                <h3 className="text-xl font-medium text-white mb-6">Research Findings - Round 1</h3>
                <SummaryCard
                  sections={[
                    {
                      title: "User insights",
                      items: [
                        "Users may have limited digital literacy",
                        "Users are highly likely to have accessibility needs",
                        "Users may rely on their phones to access the service if they do not own a computer",
                      ],
                    },
                    {
                      title: "Analytics",
                      items: [
                        "3 = average no. of attempts to upload a fit note",
                        "37% = drop-off rate",
                        "63% = monthly completion rate",
                      ],
                    },
                  ]}
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <h3 className="text-xl font-medium text-white mb-6">Iterations</h3>
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Design process workflow showing research, ideation, prototyping, and testing phases"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={500}>
              <div className="mt-12 mb-12">
                <h3 className="text-xl font-medium text-white mb-6">Research Findings - Round 2</h3>
                <SummaryCard
                  sections={[
                    {
                      title: "New insights",
                      items: [
                        "Some fit notes have data matrices or 'QR codes' on them",
                        "These need to be prominently displayed in the photo, so the service can automatically read the fit note's contents",
                        "User research sessions revealed that 'data matrix' was a confusing term for users, as was 'QR code', especially for those with lower digital literacy",
                      ],
                    },
                    {
                      title: "Suggested improvement",
                      items: [
                        "Collaborating with the Content Designer, we created relatable copy describing the data matrix as a 'black and white square'",
                        "This resonated well in subsequent testing rounds, as the fit note contains only one square",
                        `I co-authored a Medium article going into more detail about tackling this example of bias in design: https://medium.com/...`
                      ],                      
                    },
                  ]}
                />

                <div className="mt-8 rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <blockquote className="relative">
                      <div className="absolute -top-4 -left-4 text-4xl text-gray-600" aria-hidden="true">
                        "
                      </div>
                      <p className="text-xl italic text-gray-300 pl-6 pr-6">My mum wouldn't know what a QR code is.</p>
                      <footer className="mt-4 text-sm text-gray-400 pl-6">— User of the benefits service</footer>
                      <div className="absolute -bottom-4 -right-4 text-4xl text-gray-600" aria-hidden="true">
                        "
                      </div>
                    </blockquote>
                  </div>
                </div>
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
                After several testing rounds and iterations, we finalised the new guidance content and concepts for
                'upload' pages to improve users' understanding of what's needed.
              </p>

              <AnimateOnScroll animation="fade-up" delay={300}>
                <div className="mb-8 max-w-3xl">
                  <h3 className="text-xl font-medium text-white mb-4">Key features include:</h3>
                  <ul className="space-y-2 text-sm sm:text-base md:text-lg text-gray-400 list-disc pl-5">
                    <li>Clearer and more helpful guidance content and error messages</li>
                    <li>Better examples of good and bad images of fit notes</li>
                    <li>Enhanced back-end capabilities to automate fit note scanning</li>
                  </ul>
                </div>
              </AnimateOnScroll>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Solution design mockup showing the redesigned benefits application interface"
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

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                My design changes delivered significant results in under six months. This demonstrates the effectiveness
                of my solution and the value it provided.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">+3%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      points increase in completion rate
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">+10%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      points increase in digital uptake
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">+5%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">points increase in CSAT</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Results dashboard showing key performance metrics and improvements"
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
                Through accessible and thoughtful design, we empowered users to navigate the service more confidently,
                transforming lives and demonstrating the profound impact design can have on public services.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12 grid gap-6">
                <div className="rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div
                      className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-6 h-6 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 3V21H21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 9L13 15L9 11L5 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 9H15M19 9V13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-normal text-white">Data-driven design</h3>
                    <p className="text-gray-400 leading-relaxed">
                      In live projects, using quantitative data for Reach, Impact, Confidence, and Effort (RICE) scoring
                      helps prioritise design changes effectively, focusing on areas with the greatest impact. A/B
                      testing can validate how our design changes are benefiting the service.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div
                      className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-6 h-6 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                        <path
                          d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="17" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                        <path
                          d="M17 13C19.2091 13 21 14.7909 21 17V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-normal text-white">Digital inclusion</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Users were told to take a screenshot of their fit note, but one user this meant taking a photo of a screen. This revealed a bias in assuming all users understand technical
                      terms, highlighting the need for simpler language to support those with lower digital literacy.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div
                      className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-6 h-6 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M8 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path d="M9 13L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M15 13V7H9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-normal text-white">Content can't solve it all</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Not all service issues can be resolved with front-end changes like content updates or redesigns
                      alone. Often, more significant back-end improvements are required to automate processes, reduce
                      manual tasks for users, and substantially enhance the overall user experience.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            
          </section>
        </div>
        <BackToTopButton />
      </main>

      {/* Add the Footer component */}
      <Footer />
    </div>
  )
}

