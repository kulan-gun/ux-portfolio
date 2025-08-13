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
import QuoteCard from "@/components/quote-card"
import UXLessonsCard from "@/components/ux-lessons-card"
import ImageModal from "@/components/ImageModal"

// Define the sections for this case study
const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

export default function CRMCaseStudyPage() {
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
                      className={`w-1 h-6 mr-4 rounded transition-colors duration-300 ${activeSection === section.id ? "bg-white" : "bg-transparent group-hover:bg-white/50"
                        }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm font-light transition-colors duration-300 ${activeSection === section.id ? "text-white" : "text-gray-300 group-hover:text-gray-300"
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
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">2023</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Anglian Water</span>
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
              Transforming customer relationship management
            </h1>

            {/* Hero image */}
            <div className="mb-12 sm:mb-16">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anglian3-min-Gg1yQETIOPvQr9fySm8O1i5tRZYm3U.jpeg"
                alt="Project hero image showing the CRM interface"
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                Anglian Water needed a modernised internal customer relationship management (CRM) system to monitor
                customer payments, streamline workflows, and improve data accuracy.
                <br />
                <br />
                As the lead UX designer, I directed the design and prototyping process. This aimed to create a more intuitive and scalable solution for the internal teams.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">1 mo</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-300">
                      delivered project within 1 month
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">
                      5 to 10
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-300">fewer estimated clicks per task</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">-40%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-300">
                      estimated reduction in task time
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-12 mb-12">
                <SummaryCard
                  sections={[
                    {
                      title: "Key Facts",
                      items: [
                        "Project duration: 1 month",
                        "Team size: 3 members (2x UX Designers, 1x User Researcher)",
                        "My role: Lead UX Designer",
                      ],
                    },
                    {
                      title: "Challenges",
                      items: ["Understanding the workflows of a complex legacy system", "Migrating a CRM to a Experian's new design system using Figma", "Pressure to deliver quickly for the client"],
                    },
                    {
                      title: "Approach",
                      items: ["Iterative user-centred design", "Engage developers early and often", "Collaborative working in Figma"],
                    },
                  ]}
                />
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                The legacy CRM was frustrating and slow. Its outdated interface led to frequent errors and made tasks take longer. This also hurt agent productivity.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <SummaryCard
                  sections={[
                    {
                      title: "User pain points",
                      items: [
                        "The interface was outdated and inconsistent, increasing cognitive load",
                        "Hard to complete routine processes quickly, affecting productivity",
                        "Difficult to track customer interactions due to tricky navigation",
                      ],
                    },
                    {
                      title: "Business challenges",
                      items: ["Data input errors cause downstream issues", "High training costs"],
                    },
                    {
                      title: "Opportunities",
                      items: [
                        "Redesign core workflows and improve cross-team collaboration",
                        "Implement a unified design system",
                        "Enhance data visualisation",
                      ],
                    },
                  ]}
                />
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
                          <p className="text-gray-300">
                            Meet Sarah, a customer service agent at Anglian Water. She handles 40+ customer inquiries
                            daily using their legacy CRM system. She needs to quickly access and update customer
                            information while maintaining high service quality standards.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Journey Stages */}
                    <div className="grid grid-cols-4 gap-4 mb-8" role="region" aria-label="User journey stages">
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Customer Contact</h4>
                        <p className="text-sm text-gray-300">
                          Sarah receives a customer call about their billing inquiry and needs to access their account.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Information Lookup</h4>
                        <p className="text-sm text-gray-300">
                          Navigates through multiple screens to find the customer's account details and payment history.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Process Request</h4>
                        <p className="text-sm text-gray-300">
                          Updates account information or processes payment arrangements while dealing with system lag.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Resolution</h4>
                        <p className="text-sm text-gray-300">
                          Finishes the transaction and records the interaction, often using several systems to complete it.
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
                        <p className="text-sm text-gray-300">"Let me try to find your account..."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300">"The system is running slow today."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300">"I'll need to open another application for this."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-300">"Thanks for your patience with our system."</p>
                      </div>
                    </div>
                  </div>
                </div>
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                We used Figma as our primary design tool, and MS Teams for conducting remote user interviews. Our user-centred
                design process was as follows:
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-300 text-sm md:text-base text-center">
                          Conducted interviews and observations with CRM agents to understand pain points and
                          inefficiencies.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-300 text-sm md:text-base text-center">
                          Developed low-fidelity wireframes and iterated based on feedback before moving to
                          high-fidelity designs.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">User testing</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-300 text-sm md:text-base text-center">
                          Conducted usability testing with agents to refine interactions, ensuring accessibility and
                          ease of use.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Presenting</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-300 text-sm md:text-base text-center">
                          Presented the design to client leadership and developers for feedback. Made minor changes.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">5</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Handoff</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-300 text-sm md:text-base text-center">
                          Worked with developers to enhance the design based on technical feasibility, then handed it over to them.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/anglian/current-state.png"
                    alt="Early stage screens that we inherited from the client"
                    aria-describedby="img-caption-current-state"
                  />
                  <figcaption
                    id="img-caption-current-state"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Early stage screens inherited from the client, highlighting usability and visual design issues.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                  We began by reviewing the existing interface to identify user pain points, inconsistent patterns, and accessibility gaps. This baseline informed our design priorities for improving clarity, consistency, and usability.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/anglian/future-state.png"
                    alt="Our initial redesigns of the as-is interface"
                    aria-describedby="img-caption-future-state"
                  />
                  <figcaption
                    id="img-caption-future-state"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    First round of redesign concepts aimed at addressing key usability concerns.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                  These early redesigns focused on improving information hierarchy, simplifying interactions, and creating a more cohesive visual style. We tested these with stakeholders to validate alignment with user needs.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/anglian/iterations.png"
                    alt="Design iterations based on user feedback"
                    aria-describedby="img-caption-iterations"
                  />
                  <figcaption
                    id="img-caption-iterations"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Iterative design updates incorporating user and stakeholder feedback.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                  Following initial reviews, we iterated on layout, component behaviour, and content structure. This cycle of testing and refinement ensured the designs were both visually coherent and functionally efficient.
                </p>
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                We teamed up with developers from Experian before the build phase. This helped us make sure the designs could be developed. We then finalised the high-fidelity prototype.
                <br />
                <br />
                Our design reimagined workflows, improved information architecture, and enhanced the usability of the CRM for agents.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mb-8 max-w-3xl">
                <h3 className="text-xl font-medium text-white mb-4">Key features include:</h3>
                <ul className="space-y-2 text-sm sm:text-base md:text-lg text-gray-300 list-disc pl-5">
                  <li>Streamlined navigation with fewer clicks to complete common tasks</li>
                  <li>Improved data visualisation for better decision-making</li>
                  <li>Consistent UI components following Experian's design system</li>
                  <li>Responsive design for use across different devices</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/anglian/tallyman-proto.png"
                    alt="Solution design mockup showing the redesigned CRM interface"
                    aria-describedby="img-caption-tallyman-proto"
                  />
                  <figcaption
                    id="img-caption-tallyman-proto"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Prototype of the redesigned CRM interface, streamlining customer account management workflows.
                  </figcaption>
                </figure>
              </div>
            </AnimateOnScroll>

          </section>

          {/* Results Section */}
          <section id="results" className="py-8 sm:py-12" aria-labelledby="results-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="results-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Results
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                We gained leadership approval and made the developer handover easy. This ensured a smooth shift from prototype to implementation.
                <br />
                <br />
                Moving to a design system ensured component scalability and visual consistency. The new interface aims to cut cognitive load and lower errors, which boosts task efficiency.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">1 mo</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-300">
                      delivered project within 1 month
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">
                      5 to 10
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-300">fewer estimated clicks per task</div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">-40%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-300">
                      estimated reduction in task time
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-8 rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm">
                <div className="flex flex-col space-y-4">
                  <blockquote className="relative">
                    <div className="absolute -top-4 -left-4 text-4xl text-gray-600" aria-hidden="true">
                      "
                    </div>
                    <p className="text-xl italic text-gray-300 pl-6 pr-6">You delivered on the brief, and my team and I are really impressed with the prototypes, along with your considerations for the build now and in the future.</p>
                    <footer className="mt-4 text-sm text-gray-300 pl-6">— Anglian Water Client</footer>
                    <div className="absolute -bottom-4 -right-4 text-4xl text-gray-600" aria-hidden="true">
                      "
                    </div>
                  </blockquote>
                </div>
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
                We focused on efficiency, cognitive load, and easier navigation. This helped us create a system that better suits Anglian Water's needs.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/anglian/dashboard_alerts.jpg"
                    alt="Project conclusion summary showing key learnings and future opportunities"
                    aria-describedby="anglian-dashboard-caption"
                  />
                  <figcaption
                    id="anglian-dashboard-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Dashboard alerts summarising key learnings and opportunities for improvement.
                  </figcaption>
                </figure>
              </div>
            </AnimateOnScroll>


            {/* UX Lessons Learned Section */}
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12 grid gap-6">
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-300"
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
                  title="Co-design is key"
                  description="Collaborative design involving end-users throughout the  process leads to more effective solutions. Working with developers early in the process ensures technical feasibility."
                />
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-300"
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
                  title="Design systems prove their return on investment"
                  description="Leveraging existing design systems accelerates development and ensures consistency. In this case, using Experian's design system helped us focus more on addressing user pain points and goals, without having to worry about design inconsistencies."
                />
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-300"
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
                  title="Figma was excellent for collaboration"
                  description="Figma's real-time collaboration, automatic design history, and robust version control streamlined team alignment throughout the project. Its intuitive commenting feature facilitated clear, contextual feedback. This helped us get the job done."
                />
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

