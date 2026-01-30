"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import ScrollSpyNavigation from "./scroll-spy-navigation"
import AnimateOnScroll from "./animate-on-scroll"
import MetricsDisplay, { type MetricItem } from "./metrics-display"
import TagBadge from "./tag-badge"
import SummaryCard from "./summary-card"
import SystemDiagram from "./system-diagram"
import UserJourneyMap from "./user-journey-map"
import UXLessonsCard from "./ux-lessons-card"
import DesignProcess, { type ProcessStep } from "./design-process"
import Footer from "./footer"
import TopNavigation from "./top-navigation"
import BackToTopButton from "./back-to-top-button"

const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

// Default design process steps
const defaultProcessSteps: ProcessStep[] = [
  {
    number: "1",
    title: "Research",
    tasks: ["Identifying Problems", "Desk Research", "Competitor Analysis"],
  },
  {
    number: "2",
    title: "Synthesis",
    tasks: ["User Persona", "User Journey", "User Flow"],
  },
  {
    number: "3",
    title: "Ideation",
    tasks: ["Developing a Solution", "Moodboard", "Low Fidelity", "High Fidelity", "Further Explorations"],
  },
  {
    number: "4",
    title: "Final Designs",
    tasks: ["Keynote Prototype", "SwiftUI Prototype", "Figma Prototype"],
  },
  {
    number: "5",
    title: "Reflection",
    tasks: ["User Feedback", "Next Steps"],
  },
]

interface CaseStudyProps {
  title: string
  tags: Array<{ label: string; color: string; hasBackground?: boolean }>
  overviewMetrics: MetricItem[]
  resultsMetrics: MetricItem[]
  overviewSummary: Array<{ title: string; items: string[] }>
  problemSummary: Array<{ title: string; items: string[] }>
  processSteps?: ProcessStep[]
  showUserJourneyMap?: boolean
  showSystemDiagram?: boolean
  customSections?: Array<{
    id: string
    title: string
    content: React.ReactNode
  }>
  heroImage?: string
  conclusion?: {
    customContent?: React.ReactNode
    showLessonsCards?: boolean
  }
  resultsContent?: React.ReactNode
  overviewDescription?: string
  problemDescription?: string
  solutionDescription?: string
  resultsDescription?: string
  conclusionDescription?: string
  processDescription?: string
}

export default function CaseStudyTemplate({
  title,
  tags,
  overviewMetrics,
  resultsMetrics,
  overviewSummary,
  problemSummary,
  processSteps = defaultProcessSteps,
  showUserJourneyMap = true,
  showSystemDiagram = true,
  customSections,
  heroImage = "/placeholder.svg?height=200&width=1200",
  conclusion,
  resultsContent,
  overviewDescription,
  problemDescription,
  solutionDescription,
  resultsDescription,
  conclusionDescription,
  processDescription,
}: CaseStudyProps) {
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
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <TopNavigation onMobileMenuToggle={(isOpen) => setSidebarOpen(isOpen)} />

      <div className="flex flex-1 min-h-0">
      {/* Left Navigation - Sticky on desktop so it meets footer when scrolled */}
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
          <ScrollSpyNavigation sections={sections} />
        </aside>
      )}

      {/* Main Content - Footer is below this row so nav never overlaps it */}
      <div className={`flex-1 min-w-0 ${isMobile ? "w-full" : ""}`}>
      <main className={`px-4 sm:px-8 py-12 ${isMobile ? "w-full" : ""}`}>
        <div className="max-w-6xl mx-auto">
          {/* Case Study Title and Lozenges */}
          <div>
            <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
              {tags.map((tag, index) => (
                <TagBadge key={index} color={tag.color} hasBackground={tag.hasBackground}>
                  {tag.label}
                </TagBadge>
              ))}
            </div>
            <h1 id="case-study-title" className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground mb-8 sm:mb-12">
              {title}
            </h1>

            {/* Hero image between title and Overview section */}
            <div className="mb-12 sm:mb-16">
              <img
                src={heroImage || "/placeholder.svg"}
                alt="Project hero image showing the benefits application interface"
                className="w-full rounded-2xl border border-black/10 dark:border-white/10"
              />
            </div>
          </div>

          {/* Overview Section */}
          <section id="overview" className="min-h-screen py-8 sm:py-12" aria-labelledby="overview-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">
                Overview
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                {overviewDescription ||
                  "A brief introduction to the case study, highlighting the key challenges, approach, and outcomes. This section provides context and sets expectations for what the reader will learn from this case study."}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <MetricsDisplay metrics={overviewMetrics} id="overview-metrics" />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-12 mb-12">
                <SummaryCard sections={overviewSummary} />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={800}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Project overview diagram showing the key components of the benefits system"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Problem Section */}
          <section id="problem" className="min-h-screen py-8 sm:py-12" aria-labelledby="problem-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="problem-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">
                Problem
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                {problemDescription ||
                  "Citizens were facing significant delays and complications when applying for and receiving their benefits."}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <SummaryCard sections={problemSummary} />
              </div>
            </AnimateOnScroll>

            {showUserJourneyMap && (
              <AnimateOnScroll animation="fade-up" delay={400}>
                <div className="mt-12 mb-12">
                  <UserJourneyMap />
                </div>
              </AnimateOnScroll>
            )}

            {showSystemDiagram && (
              <AnimateOnScroll animation="fade-up" delay={500}>
                <div className="mt-12 mb-12">
                  <SystemDiagram />
                </div>
              </AnimateOnScroll>
            )}

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Problem definition diagram illustrating the challenges in the benefits application process"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Process Section */}
          <section id="process" className="min-h-screen py-8 sm:py-12" aria-labelledby="process-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="process-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">
                Process
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                {processDescription ||
                  "We used Figma as our primary design tool, and MS Teams for remote user interviews. Our process was as follows:"}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <DesignProcess steps={processSteps} />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Design process workflow showing research, ideation, prototyping, and testing phases"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Solution Section */}
          <section id="solution" className="min-h-screen py-8 sm:py-12" aria-labelledby="solution-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="solution-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">
                Solution
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                {solutionDescription ||
                  "An overview of the solution that was designed and implemented to address the identified problems. This section showcases the final product, key features, and how they solve the user and business needs."}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Solution design mockup showing the redesigned benefits application interface"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Results Section */}
          <section id="results" className="min-h-screen py-8 sm:py-12" aria-labelledby="results-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="results-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">
                Results
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                {resultsDescription ||
                  "My design changes delivered significant results in under six months. This demonstrates the effectiveness of my solution and the value it provided."}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8">
                <MetricsDisplay metrics={resultsMetrics} id="results-metrics" />
              </div>
            </AnimateOnScroll>

            {resultsContent && (
              <AnimateOnScroll animation="fade-up" delay={600}>
                <div className="mt-12 mb-12">{resultsContent}</div>
              </AnimateOnScroll>
            )}

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Results dashboard showing key performance metrics and improvements"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10"
                />
              </div>
            </AnimateOnScroll>
          </section>

          {/* Conclusion Section */}
          <section id="conclusion" className="min-h-screen py-8 sm:py-12" aria-labelledby="conclusion-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">
                Conclusion
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                {conclusionDescription ||
                  "Through accessible and thoughtful design, we empowered users to navigate the service more confidently, transforming lives and demonstrating the profound impact design can have on public services."}
              </p>
            </AnimateOnScroll>

            {conclusion?.customContent ? (
              <AnimateOnScroll animation="fade-up" delay={400}>
                <div className="mt-12 mb-12">{conclusion.customContent}</div>
              </AnimateOnScroll>
            ) : (
              conclusion?.showLessonsCards !== false && (
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
                      }
                      title="Data-driven design"
                      description="In live projects, using quantitative data for Reach, Impact, Confidence, and Effort (RICE) scoring helps prioritise design changes effectively, focusing on areas with the greatest impact. A/B testing confirms these changes, showing clear evidence of how design improvements benefit the service."
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
                      }
                      title="Digital inclusion"
                      description="Users were advised to take a screenshot but one user thought a 'screenshot' meant photographing their screen with a smartphone. This revealed a bias in assuming all users understand technical terms, highlighting the need for simpler language to support those with lower digital literacy."
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
                      }
                      title="Content can't solve it all"
                      description="Not all service issues can be resolved with front-end changes like content updates or redesigns alone. Often, more significant back-end improvements are required to automate processes, reduce manual tasks for users, and substantially enhance the overall user experience."
                    />
                  </div>
                </AnimateOnScroll>
              )
            )}

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/placeholder.svg?height=150&width=800"
                  alt="Project conclusion summary showing key learnings and future opportunities"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10"
                />
              </div>
            </AnimateOnScroll>
          </section>
        </div>
        <BackToTopButton />
      </main>
      </div>
      </div>

      <Footer />
    </div>
  )
}

