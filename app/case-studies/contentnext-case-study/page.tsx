"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import Footer from "@/components/footer"
import SummaryCard from "@/components/summary-card"
import UXLessonsCard from "@/components/ux-lessons-card"
import MetricShuffle from "@/components/metric-shuffle"

const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

export default function ContentNextCaseStudyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })

      if (currentSection) setActiveSection(currentSection.id)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false)
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [sidebarOpen])

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
              <div>
                <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
                  <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                    <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                      Senior Experience Designer
                    </span>
                  </div>
                  <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                    <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">2025/26</span>
                  </div>
                  <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                    <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Autodesk</span>
                  </div>
                  <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Shipped</span>
                    </div>
                  </div>
                </div>

                <h1 id="case-study-title" className="text-3xl sm:text-4xl md:text-5xl font-display mb-8 sm:mb-12">
                  ContentNext: scaling content design with AI
                </h1>

                <div className="mb-12 sm:mb-16">
                  <img
                    src="/ai-design/aura_min.jpeg"
                    alt="Abstract AI interface visual representing ContentNext"
                    className="w-full rounded-2xl"
                  />
                </div>
              </div>

              <section id="overview" className="min-h-screen py-8 sm:py-12" aria-labelledby="overview-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Overview
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    ContentNext is an AI-powered content design system created for Fusion teams at Autodesk. It helps
                    designers and engineers produce consistent, Weave-compliant in-product copy such as tooltips,
                    warnings, errors, and notifications.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={400}>
                  <div className="mt-8 mb-8">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                          <MetricShuffle final="~2.2/3" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          average first-pass publishability score
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                          <MetricShuffle final="-4.67" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          warning-grade improvement with guided input
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                          <MetricShuffle final="0" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          additional AWS hosting cost in production
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={500}>
                  <div className="mt-12 mb-12">
                    <SummaryCard
                      sections={[
                        {
                          title: "Key facts",
                          items: [
                            "Project duration: 6 months (October 2025 to March 2026)",
                            "Role: Sole designer, owning prompt architecture, testing, and production decision",
                            "Cross-functional inputs from CXD reviewers, leadership, and content design leads",
                          ],
                        },
                        {
                          title: "Challenges",
                          items: [
                            "No dedicated user research resource for formal studies",
                            "Need to move quickly in a fast-changing product environment",
                            "Balancing governance depth with speed-to-value",
                          ],
                        },
                        {
                          title: "Approach",
                          items: [
                            "Encoded Weave standards into a modular prompt architecture",
                            "Tested multiple delivery models before selecting production route",
                            "Ran controlled guided-vs-free-text comparisons",
                          ],
                        },
                      ]}
                    />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="problem" className="min-h-screen py-8 sm:py-12" aria-labelledby="problem-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="problem-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Problem
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    Content design was becoming a delivery bottleneck. Engineers needed compliant copy late in build
                    cycles, and guidance was fragmented across docs and tribal knowledge. Informal AI drafting was fast
                    but inconsistent.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <SummaryCard
                      sections={[
                        {
                          title: "User pain points",
                          items: [
                            "Engineers needed quality UI copy without content design expertise",
                            "Content designers spent time rewriting drafts instead of shaping systems",
                            "Ad-hoc AI outputs lacked consistency and compliance",
                          ],
                        },
                        {
                          title: "Business challenges",
                          items: [
                            "Inconsistent copy quality across Fusion surfaces",
                            "Manual reviews consumed CXD team capacity",
                            "No scalable way to enforce standards at point of creation",
                          ],
                        },
                        {
                          title: "Opportunities",
                          items: [
                            "Formalize existing AI drafting behavior with design guardrails",
                            "Encode Weave standards into reusable prompts and patterns",
                            "Ship lightweight tooling with high adoption and low overhead",
                          ],
                        },
                      ]}
                    />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="process" className="min-h-screen py-8 sm:py-12" aria-labelledby="process-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="process-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Process
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    The work progressed through prompt architecture, structured input experimentation, and delivery model
                    evaluation. Each phase used evidence to guide the next decision.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <div className="mt-8 mb-12 rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-xl font-normal text-foreground mb-4">Phase 1</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Built an AUTOMAT-based system prompt and translated content standards into explicit rules for
                          readability, tone, structure, and message constraints.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-normal text-foreground mb-4">Phase 2</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Compared guided fields against free text while holding backend prompts constant. Guided input
                          delivered stronger readability gains, especially for warnings.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-normal text-foreground mb-4">Phase 3</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Evaluated AWS toolkit, Custom GPT, and Cursor workflows. Chose Custom GPT for drafting and
                          Cursor for production integration.
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="solution" className="min-h-screen py-8 sm:py-12" aria-labelledby="solution-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="solution-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Solution
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    ContentNext shipped as a system, not just a single tool: a production Custom GPT for zero-friction
                    drafting, Cursor workflows for repo-level pathways, and modular knowledge files for fast iteration.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <SummaryCard
                      sections={[
                        {
                          title: "What shipped",
                          items: [
                            "Custom GPT in ChatGPT Enterprise for structured in-product content drafting",
                            "Cursor-adjacent workflows for codebase-connected production routes",
                            "Modular prompt stack: instructions, conversation starter, examples, and system prompt",
                          ],
                        },
                        {
                          title: "What was paused",
                          items: [
                            "AWS toolkit app paused to avoid infrastructure and maintenance overhead",
                            "Governed app remains a future option when deterministic enforcement is required",
                          ],
                        },
                        {
                          title: "Core design decisions",
                          items: [
                            "Meet users where they already work",
                            "Use structure and constraints to make AI reliable",
                            "Treat guided input as behavior design, not just form design",
                          ],
                        },
                      ]}
                    />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="results" className="pt-8 sm:pt-12 pb-6 sm:pb-8" aria-labelledby="results-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="results-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Results
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    The production decision delivered immediate adoption, lower operational burden, and faster prompt
                    iteration cycles while preserving quality guardrails for in-product content.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <div className="mt-8 mb-8">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4" role="group" aria-label="Outcome metrics">
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-foreground">
                          <MetricShuffle final="2.2/3" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          average publishability score
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-foreground">
                          <MetricShuffle final="-2.86" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          guided-input grade change overall
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-foreground">
                          <MetricShuffle final="-0" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          additional DevOps overhead in production
                        </div>
                      </div>
                      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl font-normal text-foreground">
                          <MetricShuffle final="4 files" />
                        </div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                          modular knowledge assets powering updates
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="conclusion" className="min-h-screen pt-8 sm:pt-12 pb-4" aria-labelledby="conclusion-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Conclusion
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    ContentNext demonstrated that AI reliability comes from design structure, not model novelty. Prompt
                    engineering, interaction design, and measured experimentation enabled a practical system that scales
                    quality without scaling friction.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={400}>
                  <div className="mt-12 mb-12 grid gap-6">
                    <UXLessonsCard
                      icon={
                        <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M19 9L13 15L9 11L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      }
                      title="Bespoke tools face lifecycle risk"
                      description="In enterprise settings, custom internal apps can be outpaced by licensed platform tools. Shipping where users already work often improves adoption, cost, and resilience."
                    />
                    <UXLessonsCard
                      icon={
                        <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      }
                      title="Prompt engineering is product design"
                      description="Quality output required rules, examples, constraints, and maintainable knowledge structures. Designing those systems had direct product impact."
                    />
                    <UXLessonsCard
                      icon={
                        <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 2L3 7V12C3 17 6.5 21.74 12 23C17.5 21.74 21 17 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      }
                      title="Proxy testing can unlock momentum"
                      description="When formal research capacity is constrained, structured proxy testing can still produce actionable findings, as long as limits are explicit and follow-up instrumentation is planned."
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
