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
import ImageModal from "@/components/ImageModal"
import MetricShuffle from "@/components/metric-shuffle"

// Define the sections for this case study
const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "technology", title: "Workstream 1 Process" },
  { id: "process-2", title: "Workstream 2 Process" },
  { id: "solution", title: "Solutions" },
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
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <ScrollProgressIndicator />

      <TopNavigation onMobileMenuToggle={(isOpen: boolean) => setSidebarOpen(isOpen)} />

      <div className="flex flex-1 min-h-0">
      {!isMobile && (
        <aside
          id="section-nav"
          className="w-64 md:sticky md:top-16 md:self-start md:pt-16 shrink-0 bg-background"
          role="navigation"
          aria-label="Section navigation"
        >
          <div className="pl-8 mb-6 pt-8">
            <Link
              href="/"
              className="inline-flex items-center px-4 pr-5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-fui-primary focus:ring-opacity-50"
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
          <nav className="space-y-6 text-muted-foreground pl-8" aria-label="Table of contents">
            <ul className="space-y-6">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className="flex items-center cursor-pointer group w-full text-left focus:outline-none focus:ring-2 focus:ring-fui-primary focus:ring-opacity-50 rounded-sm"
                    onClick={() => scrollToSection(section.id)}
                    aria-current={activeSection === section.id ? "location" : undefined}
                  >
                    <div
                      className={`w-1 h-6 mr-4 rounded transition-colors duration-300 ${activeSection === section.id ? "bg-primary" : "bg-transparent group-hover:bg-primary/50"}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm font-light transition-colors duration-300 ${activeSection === section.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"}`}
                    >
                      {section.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      <div className={`flex-1 min-w-0 flex flex-col ${isMobile ? "w-full" : ""}`}>
      <main className={`flex-1 px-4 sm:px-8 py-12 ${isMobile ? "w-full" : ""}`}>
        <div className="max-w-6xl mx-auto">
          {/* Case Study Title and Tags */}
          <div>
            <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Senior UX Designer</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">2024/25</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">GOV.UK CLIENT</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Shipped</span>
                </div>
              </div>
            </div>
            <h1
              id="case-study-title"
              className="text-3xl sm:text-4xl md:text-5xl font-display mb-8 sm:mb-12"
            >
              Designing the future of contactless travel{" "}
              <span aria-hidden="true" role="presentation">✈️</span>
            </h1>


            {/* Hero image */}
            <div className="mb-12 sm:mb-16">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trials2-min-152wrS8iv0dqCjFwiwsHTR5R7Mhdk7.jpeg"
                alt="Project hero image showing the contactless travel interface"
                className="w-full rounded-2xl"
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                I supported a government organisation in modernising travel and migration through two distinct
                workstreams. I worked with another UX designer, three user researchers, three content designers, and several business analysts and developers.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">

                  {/* Users total with growth */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Users metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="7m" />
                      <span className="ml-2 align-middle text-base sm:text-lg text-emerald-400">
                        <MetricShuffle final="+40% increase" scrambleLetters />
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      global users, up from 5m
                    </div>
                  </div>

                  {/* Completion rate with pp lift */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Completion rate metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="83%" />
                      <span className="ml-2 align-middle text-base sm:text-lg text-emerald-400">
                        <MetricShuffle final="+9pp" scrambleLetters />
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      completion rate, up from 74% in 2 months
                    </div>
                  </div>

                  {/* GDS assessment */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="GDS assessment result">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="1st" scrambleLetters />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      GDS assessment pass on first attempt
                    </div>
                  </div>

                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">

                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">In a nutshell</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Improved the digital immigration status service for millions of users worldwide.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Investigated biometric technology that can enable easy, long-term “passport-less” identity verification.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Made important usability and accessibility upgrades to the public-facing service and internal tools.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Rigid backend architecture that restricts redesign opportunities.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Diverse user needs and cultural nuances, due to global use.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Strict security requirements for identity authentication.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <figure className="mt-8">
                <ImageModal
                  src="/contactless/evisa_flow.png"
                  alt="Process flow and high-level user journey for the contactless eVisa service"
                />
                <figcaption className="mt-3 text-center text-xs sm:text-sm text-gray-400">
                  Process flow and high-level user journey for the contactless eVisa service.
                </figcaption>
              </figure>


            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-12 mb-12"></div>
            </AnimateOnScroll>
          </section>

          {/* Problem Section */}
          <section id="problem" className="pt-8 sm:pt-12 pb-4 sm:pb-6" aria-labelledby="problem-heading">
            {/* Reduced bottom padding (pb-4 sm:pb-6) to avoid excessive space between this section and the next one. Top padding remains as before for consistency with other sections. */}
            <AnimateOnScroll animation="bounce-up">
              <h2 id="problem-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Problem
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                The project can be broken down into two workstreams.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-8">
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Workstream 1 challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Users needed a way to display their immigration status online. This mattered because some identity documents would run out by the end of 2024.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Users without identity documents, but who have valid reasons, faced barriers to setting up accounts.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Inaccessible content and jargon made it hard for users with limited digital skills or lower English skills.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Users had to rely on offline methods to recover their account if they lost their details.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Workstream 2 challenges</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Building trust around users sharing their biometric data with the UK government.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Balancing strict security requirements with having a positive user experience.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Ensuring secure biometric data collection and storage.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Integrating biometric authentication within wider account journeys.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Opportunities</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Create more accessible digital services for diverse user groups.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Focus on the 1% of users with the most complex needs, and the other 99% benefit as a result.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Develop innovative solutions for secure identity verification.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Understand user trust and sentiments towards government digital services.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                For the digital immigration status service, we followed a user-centred design approach to ensure the
                service was accessible and met the needs of diverse users.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Usability testing with diverse users revealed issues and improved accessibility.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Created iterative prototypes, refining user journeys from ongoing user feedback.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Accessibility compliance</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Ensured compliance with WCAG standards and best practices for digital inclusion.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Collaboration</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Worked with policy makers, PMs, and developers to align design with business goals.
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
                    src="/gov_components.png"
                    alt="Key GOV.UK design system components used in the eVisa flow"
                  /* If ImageModal forwards props to <img>, you can add:
                     aria-describedby="gov-caption-1"
                  */
                  />
                  <figcaption
                    id="gov-caption-1"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Some of the styles and components from the GOV.UK Design System used in the prototype.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  The UK Government design system is available in Figma, Mural and as HTML, CSS, JavaScript and Nunjucks code. These tools helped me create high-quality visuals that align with good practices and the design system.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/app.gif"
                    alt="Animated hybrid prototype showing a user journey where a Figma mobile prototype is integrated with a GOV.UK coded prototype, allowing the user to pause the desktop flow and complete identity verification via the government app on their phone"
                    aria-describedby="app-caption"
                  />
                  <figcaption
                    id="app-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    I setup a Figma mobile prototype and connected it to a GOV.UK prototype. This simulated a real omni-channel journey. I used HTML, CSS, and JavaScript for this.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  This setup enabled users to pause the flow on their desktop and switch to their phone. They simulated verifying their identity using a prototype of the actual app. This helped us observe how users behave and what they experience across different devices.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/process1.png"
                    alt="Mural board filled with sticky notes capturing findings from two intensive rounds of user testing with eVisa applicants"
                  />
                  <figcaption
                    id="process1-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Mural board from two intensive rounds of user testing with eVisa applicants, capturing key insights and pain points.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Usability testing with diverse users revealed pain points in accessibility, usability, and clarity. I iterated prototypes to address these, refining journeys through ongoing user and stakeholder feedback. Key fixes are outlined in the ‘Solutions’ section.
                </p>
              </div>
            </AnimateOnScroll>

          </section>

          {/* Process Section - Workstream 2 */}
          {/* Reduce bottom padding on the whole section so it doesn't stack with the figure spacing */}
          <section
            id="process-2"
            className="pt-8 sm:pt-12 pb-4 sm:pb-6"  /* was: min-h-screen py-8 sm:py-12 */
            aria-labelledby="process-heading-2"
          >
            <AnimateOnScroll animation="bounce-up">
              <h2
                id="process-heading-2"
                className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display"
              >
                Workstream 2: Process
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                For the biometric self-enrolment trials, we focused on building user trust while ensuring robust
                security measures for handling sensitive biometric data.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              {/* Tighten bottom margin on the card wrapper to avoid compounding with the figure's top margin */}
              <div className="mt-8 mb-8">  {/* was: mb-12 */}
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Ran biometric trials to gauge views on remote fingerprint and facial recognition.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Designed and refined biometric enrolment UI components from real-world tests.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Security & trust</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Advised app suppliers on ways to build user trust through clear messaging.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Cross-collaboration</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Worked with security, privacy, and research teams to propose robust solutions.
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
                    src="/contactless/process2.png"
                    alt="Mural board with insights from 200 biometric self-enrolment participants"
                    aria-describedby="process2-caption"
                  />
                  <figcaption
                    id="process2-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Insights and sentiment analysis from 200 participants in biometric self-enrolment trials.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground text-center sm:text-left">
                  Due to the sensitivity of workstream two, it is not possible to go into detail or show images of what I tested or designed.
                  For more information, please reach out to me.
                </p>
              </div>
            </AnimateOnScroll>

          </section>


          {/* Solution Section */}
          <section id="solution" className="min-h-screen py-8 sm:py-12" aria-labelledby="solution-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="solution-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Solutions
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                This section highlights key updates made to the public-facing and internal services. Additionally, I discuss my final outputs from the biometric self-enrolment trials.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="space-y-12">
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Enhancing the live service</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-muted-foreground mb-4">For the first workstream involving the immigration status service, I focused on:</p>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Refining complex service steps into clear, accessible interactions for users with varied technical skills.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Validating the flow through usability testing, ensuring inclusivity and reliability across devices.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Co-designed an automated online account recovery journey to enhance self-service recovery.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Simulating fingerprint scanning</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
                        <p className="text-muted-foreground mb-4">
                          For the biometric self-enrolment trials, we assessed the feasibility of capturing fingerprints remotely using mobile apps:
                        </p>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>We captured more than 200 fingerprints in two weeks. We also evaluated 9 supplier apps through detailed heuristic reviews. We checked them against WCAG (POUR) and Nielsen’s usability heuristics.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>We authored reports for app suppliers. These reports focus on improving app accessibility, usability, and preparing for remote biometric enrolment.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>If remote enrolment is adopted, it could save on staff and equipment costs. It would stop wasted travel when permissions are not granted. This way, people can make smarter travel choices.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                For workstream one, I provided focused updates to the public service and internal platform. I improved content, simplified forms, and boosted accessibility. All changes were tested for a more inclusive experience.
              </p>
            </AnimateOnScroll>

            {/* 1) Relatable analogies, tooltips, screen reader tweaks */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/multiple_examples.png"
                    alt="Examples showing NFC explained in plain language, an acronym tooltip using the abbr element, and a layout change that keeps key info before the primary action for screen readers"
                    aria-describedby="img-caption-multiple-examples"
                  />
                  <figcaption
                    id="img-caption-multiple-examples"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Plain language, acronym tooltips, and screen reader friendly layout.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  We made technical terms relatable, kept the original English for acronyms via tooltips, and moved critical content above the call-to-action. These changes improved comprehension and reduced missed information for assistive tech users.
                </p>
              </div>
            </AnimateOnScroll>

            {/* 2) Context-aware warning near decision radios */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/pull_revelation.png"
                    alt="Before and after screens showing a generic alert being missed and a new inline warning placed next to decision radio buttons so it appears at the moment of choice"
                    aria-describedby="img-caption-context-warning"
                  />
                  <figcaption
                    id="img-caption-context-warning"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Inline warning placed where the decision happens. Images are blurred deliberately to protect sensitive information.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  I created a way to show when a face scan is missing for valid reasons on the case working platform. I added a warning next to the decision options. This improved visibility and reduced errors without adding another easily ignored blue alert.
                </p>
              </div>
            </AnimateOnScroll>

            {/* 3) Reducing overwhelm by splitting 9 radios into two themed pages */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/reduce-overwhelm.png"
                    alt="Comparison showing a single page with nine radio options replaced by a two page flow that groups options into clearer themes with brief hints"
                    aria-describedby="img-caption-two-page"
                  />
                  <figcaption
                    id="img-caption-two-page"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Two-page flow clusters together options with helpful hints. Images are blurred deliberately to protect sensitive information.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Research showed too many options on one page caused overwhelm and limited design scalability. I split the flow into two pages with short hints. This reduced cognitive load and helped users decide faster with fewer errors.
                </p>
              </div>
            </AnimateOnScroll>

            {/* 4) WAVE contrast issue with greyed out radios */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/wave_test.png"
                    alt="WAVE accessibility report highlighting greyed out radio buttons that failed contrast checks next to the page where those radios appear disabled"
                    aria-describedby="img-caption-wave"
                  />
                  <figcaption
                    id="img-caption-wave"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Disabled radios failed contrast checks in WAVE. Images are blurred deliberately to protect sensitive information.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Disabled radios failed WCAG SC 1.4.3 contrast requirements (3:1 for UI components, 4.5:1 for text). I checked with users about removing the disabled radios since they had no use when another active user was viewing the case. This solved the problem.
                </p>

              </div>
            </AnimateOnScroll>

          </section>

          {/* Results Section */}
          {/* Reduced bottom padding on the section to avoid stacking with inner margins */}
          <section
            id="results"
            className="pt-8 sm:pt-12 pb-4 sm:pb-6"  /* was: min-h-screen py-8 sm:py-12 */
            aria-labelledby="results-heading"
          >
            <AnimateOnScroll animation="bounce-up">
              <h2
                id="results-heading"
                className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display"
              >
                Results
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="bounce-up">
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">

                  {/* Users total with growth */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Users metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="7m" duration={800} />
                      <span className="ml-2 align-middle text-base sm:text-lg text-emerald-400">
                        <MetricShuffle final="+40% increase" duration={800} speed={40} scrambleLetters />
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      global users, up from 5m
                    </div>
                  </div>

                  {/* Completion rate with pp lift */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Completion rate metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="83%" duration={800} />
                      <span className="ml-2 align-middle text-base sm:text-lg text-emerald-400">
                        <MetricShuffle final="+9pp" duration={800} speed={40} scrambleLetters />
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      completion rate, up from 74% in 2 months
                    </div>
                  </div>

                  {/* GDS assessment */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="GDS assessment result">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="1st" duration={800} scrambleLetters />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      GDS assessment pass on first attempt
                    </div>
                  </div>

                  {/* Journey time reduction */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Journey time reduction metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="-4%" duration={800} />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      average journey time, now 21 mins
                    </div>
                  </div>

                  {/* Offline requests reduction */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Offline requests reduction metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="-67%" duration={800} />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      fewer offline account recovery requests
                    </div>
                  </div>

                  {/* Remote trial participants */}
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm" aria-label="Testing participants metric">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="200+" duration={800} />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      participants in biometric enrolment trials
                    </div>
                  </div>

                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="bounce-up">
              {/* Trim bottom margin so it doesn't compound with the quote block that follows */}
              <div className="mt-8 mb-8">  {/* was: mb-12 */}
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  {/* Slightly tighter vertical rhythm inside the card */}
                  <div className="space-y-10">  {/* was: space-y-12 */}
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Workstream 1</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-4 opacity-70"></div>  {/* was: mb-6 */}
                        <p className="text-muted-foreground mb-4">
                          We achieved a first-time GDS assessment pass, allowing the service to move to public Beta.
                        </p>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Over 7 million users worldwide can now prove their immigration status digitally</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Simplified content and added tooltips for acronyms through inclusive language design</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Co-designed and prototyped an automated account recovery flow, reducing offline requests by 67%</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Workstream 2</h3>
                      </div>
                      <div className="flex-1">
                        <div className="h-0.5 w-12 bg-white mb-4 opacity-70"></div>  {/* was: mb-6 */}
                        <p className="text-muted-foreground">
                          Enhanced user trust in biometric authentication systems, achieving 100% willingness to join follow-up enrolment trials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Bring the quote block closer to the card above */}
            <div className="mt-6 rounded-3xl bg-muted p-8 backdrop-blur-sm">  {/* was: mt-8 */}
              <div className="flex flex-col space-y-4">
                <blockquote className="relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-gray-600" aria-hidden="true">
                    "
                  </div>
                  <p className="text-xl italic text-muted-foreground pl-6 pr-6">
                    This will make things so much easier. I won't have to travel for 2 hours to do this, I can just do it at home.
                  </p>
                  {/* Removed the leading em dash in the citation to match your no-em-dash rule */}
                  <footer className="mt-4 text-sm text-muted-foreground pl-6">
                    Participant in the biometric trials
                  </footer>
                  <div className="absolute -bottom-4 -right-4 text-4xl text-gray-600" aria-hidden="true">
                    "
                  </div>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section id="conclusion" className="min-h-screen pt-8 sm:pt-12 pb-4" aria-labelledby="conclusion-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Conclusion
              </h2>
            </AnimateOnScroll>

            {/* UX Lessons Learned Section */}
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12 grid gap-6">
                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-muted-foreground"
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
                  title="Balance technology with human needs"
                  description={"While implementing cutting-edge technology was important, we learned that the most successful aspects of the solution were those that addressed fundamental human needs. Features that reduced anxiety, saved time, and provided clear information were more valued than technically impressive but less practical capabilities."}
                />

                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-muted-foreground"
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
                  title="Inclusive design is essential"
                  description={"Designing for the extremes of user ability benefits everyone. By focusing on accessibility for users with disabilities, we created a more intuitive system that all travelers found easier to use, regardless of their digital literacy or physical capabilities. By adopting an omni-channel design approach, we ensured the service works for users regardless of device access."}
                />


                <UXLessonsCard
                  icon={
                    <svg
                      className="w-6 h-6 text-muted-foreground"
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
                  description={"Our most valuable insights came from in-person testing, where observing real users with fingerprint scanning apps revealed human factors issues missed in remote testing. For example, we learned that 'thumb' is not a word recognised by people in some countries - it may be called 'big finger'. Additionally, we learned suppliers should design flows that let users without some of their fingers skip certain steps."}
                />
              </div>
            </AnimateOnScroll>

          </section>
        </div>
      </main>

      <BackToTopButton />
      </div>
      </div>

      <Footer />
    </div>
  )
}

