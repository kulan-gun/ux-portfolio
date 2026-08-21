"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import Footer from "@/components/footer"
import CaseStudyMetric from "@/components/case-study-metric"
import CaseStudyHeader, { CaseStudyBackLink } from "@/components/case-study-header"
import MobileTableOfContents from "@/components/mobile-table-of-contents"
import { getProjectById } from "@/lib/projects"
import { motionSafeScrollBehavior } from "@/lib/accessibility"

const project = getProjectById("contentnext")!

const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

function SystemWorkflow() {
  const steps = [
    {
      title: "Describe the UI need",
      detail: "An engineer or designer provides the product context and content type.",
    },
    {
      title: "Guide the input",
      detail: "Structured questions capture the information needed for a useful response.",
    },
    {
      title: "Apply guardrails",
      detail: "Modular prompts encode Autodesk Weave standards, patterns, and examples.",
    },
    {
      title: "Review and ship",
      detail: "Teams receive clearer UI content in the tools where they already work.",
    },
  ]

  return (
    <figure>
      <figcaption className="sr-only">ContentNext workflow from product context to usable UI content</figcaption>
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="mb-4 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base sm:text-lg font-medium text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

function ReadabilityComparison() {
  const comparisons = [
    { label: "Guided input", value: "−2.86 grades", width: "95%", accent: true },
    { label: "Free text", value: "−1.88 grades", width: "63%", accent: false },
  ]

  return (
    <figure className="mt-10 border-y border-black/10 dark:border-white/10 py-8">
      <figcaption className="mb-7">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          CONTROLLED COMPARISON
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          Guided input improved readability more
        </span>
        <span className="mt-2 block text-sm text-muted-foreground">
          Average Flesch-Kincaid grade reduction; a larger drop means easier-to-read content.
        </span>
      </figcaption>
      <div className="space-y-6">
        {comparisons.map((comparison) => (
          <div key={comparison.label} className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)_7rem] sm:items-center sm:gap-5">
            <span className="text-sm font-medium text-foreground">{comparison.label}</span>
            <div className="h-2 bg-muted" aria-hidden="true">
              <div
                className={`h-full ${comparison.accent ? "bg-fui-primary" : "bg-muted-foreground/40"}`}
                style={{ width: comparison.width }}
              />
            </div>
            <span className="font-mono text-xs tracking-wider-fui text-muted-foreground sm:text-right">
              {comparison.value}
            </span>
          </div>
        ))}
      </div>
    </figure>
  )
}

function DeliveryRouteDiagram() {
  const routes = [
    {
      status: "SHIPPED",
      title: "Custom GPT",
      detail: "Lowest-friction route for everyday drafting in ChatGPT Enterprise.",
      signal: "Default entry point",
    },
    {
      status: "INTEGRATED",
      title: "Cursor workflow",
      detail: "Connects governed content guidance to codebase and repository workflows.",
      signal: "Production pathway",
    },
    {
      status: "SUNSET",
      title: "AWS toolkit app",
      detail: "Sunset after evaluation because its infrastructure and maintenance costs outweighed the adoption benefit.",
      signal: "Avoided ongoing overhead",
    },
  ]

  return (
    <figure>
      <figcaption className="sr-only">ContentNext production routes</figcaption>
      <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-3">
        {routes.map((route, index) => (
          <article
            key={route.title}
            className="flex flex-col border-t border-black/10 dark:border-white/10 py-8 first:border-t-0 md:border-t-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs tracking-widest-fui text-fui-primary">{route.status}</span>
            <h3 className="mt-3 text-xl font-medium text-foreground">{route.title}</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{route.detail}</p>
            <div className="mt-auto pt-6">
              <p className="border-t border-black/10 dark:border-white/10 pt-3 font-mono text-xs tracking-wider-fui text-fui-dim">
                {String(index + 1).padStart(2, "0")} · {route.signal}
              </p>
            </div>
          </article>
        ))}
      </div>
    </figure>
  )
}

const lessons = [
  {
    title: "Bespoke tools face lifecycle risk",
    description:
      "In enterprise settings, custom internal apps can be outpaced by licensed platform tools. Shipping where users already work often improves adoption, cost, and resilience.",
  },
  {
    title: "Prompt engineering is product design",
    description:
      "Quality output required rules, examples, constraints, and maintainable knowledge structures. Designing those systems had direct product impact.",
  },
  {
    title: "Proxy testing can unlock momentum",
    description:
      "When formal research capacity is constrained, structured proxy testing can still produce actionable findings, as long as limits are explicit and follow-up instrumentation is planned.",
  },
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
        behavior: motionSafeScrollBehavior(),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <ScrollProgressIndicator />
      <TopNavigation backHref="/#work" />

      <div className="flex flex-1 min-h-0">
        {!isMobile && (
          <aside
            id="section-nav"
            className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:sticky md:top-16 md:block md:self-start md:pt-16"
            aria-label="Section navigation"
          >
            <CaseStudyBackLink />

            <nav className="px-6 text-muted-foreground" aria-label="Table of contents">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={`group flex w-full cursor-pointer items-center rounded-fui py-2 pr-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary ${activeSection === section.id ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60"}`}
                      onClick={() => scrollToSection(section.id)}
                      aria-current={activeSection === section.id ? "location" : undefined}
                    >
                      <div
                        className={`mr-3 h-5 w-0.5 transition-colors duration-200 ${activeSection === section.id ? "bg-primary" : "bg-transparent group-hover:bg-primary/50"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-sm transition-colors duration-200 ${activeSection === section.id ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
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
          <main id="main-content" className={`flex-1 px-4 py-8 sm:px-8 md:py-12 ${isMobile ? "w-full" : ""}`}>
            <div className="max-w-6xl mx-auto">
              <CaseStudyHeader
                project={project}
                mobileNavigation={<MobileTableOfContents sections={sections} />}
              />

              <section id="overview" className="py-8 sm:py-12" aria-labelledby="overview-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Overview
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    ContentNext helps Autodesk Fusion teams create clearer, Weave-compliant UI content with AI. I moved
                    it from a bespoke app to a Custom GPT and Cursor workflow so teams could use it where they already
                    work.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={400}>
                  <div className="mt-8 mb-8">
                    <dl className="mb-8 grid gap-5 border-y border-border py-5 sm:grid-cols-2">
                      <div>
                        <dt className="font-mono text-xs tracking-widest-fui text-fui-dim">DURATION</dt>
                        <dd className="mt-2 text-sm text-muted-foreground">6 months</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs tracking-widest-fui text-fui-dim">COLLABORATORS</dt>
                        <dd className="mt-2 text-sm text-muted-foreground">CXD reviewers, content leads, and leadership</dd>
                      </div>
                    </dl>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                      <CaseStudyMetric label="First-pass publishability" value="~2.2/3" note="Average quality score" />
                      <CaseStudyMetric label="Warning readability" value="-4.67" note="Average grade-level reduction" />
                      <CaseStudyMetric label="Production hosting cost" value="0" note="Additional AWS hosting cost" />
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={500}>
                  <div className="mt-12 mb-12">
                    <SystemWorkflow />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="problem" className="py-8 sm:py-12" aria-labelledby="problem-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="problem-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Problem
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    Engineers needed compliant UI copy late in build cycles, but the guidance was scattered and expert
                    review did not scale. Informal AI drafting was faster, but its quality and tone were inconsistent.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <figure>
                      <figcaption className="sr-only">ContentNext content-design delivery bottleneck</figcaption>
                      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-4">
                        {[
                          ["01", "Late copy need", "UI content was often requested near the end of build cycles."],
                          ["02", "Scattered guidance", "Standards lived across documentation, Confluence, and expert knowledge."],
                          ["03", "Inconsistent AI drafts", "Ad-hoc prompts produced uneven structure, tone, and compliance."],
                          ["04", "Manual rewrite", "Content designers fixed drafts instead of improving the wider system."],
                        ].map(([number, title, detail]) => (
                          <li
                            key={number}
                            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
                          >
                            <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                              {number}
                            </span>
                            <h3 className="mt-3 text-base sm:text-lg font-medium text-foreground">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                          </li>
                        ))}
                      </ol>
                    </figure>
                    <aside className="mt-8 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Design opportunity">
                      <p className="mb-2 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                        Design opportunity
                      </p>
                      <p className="text-lg leading-relaxed text-foreground">
                        Help engineers create consistent, compliant UI copy in the tools they already use—without
                        adding another complex system to learn.
                      </p>
                    </aside>
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="process" className="py-8 sm:py-12" aria-labelledby="process-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="process-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Process
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    Three phases moved the work from an untested concept to an evidence-backed production route.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <ol className="mt-8 mb-12 border-y border-black/10 dark:border-white/10">
                    <li className="grid gap-4 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                      <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                        01
                      </span>
                      <div>
                        <h3 className="text-xl font-medium text-foreground mb-3">Establishing the baseline</h3>
                        <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                          Reviewed baseline outputs, clarified the readability measures, and encoded Weave standards
                          into a modular prompt architecture.
                        </p>
                      </div>
                    </li>
                    <li className="grid gap-4 border-t border-black/10 dark:border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                      <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                        02
                      </span>
                      <div>
                        <h3 className="text-xl font-medium text-foreground mb-3">Comparing input methods</h3>
                        <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                          Held the backend and prompts constant, then compared guided input with free text.
                        </p>
                      </div>
                    </li>
                    <li className="grid gap-4 border-t border-black/10 dark:border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                      <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                        03
                      </span>
                      <div>
                        <h3 className="text-xl font-medium text-foreground mb-3">Choosing the production route</h3>
                        <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                          Compared the AWS toolkit, Custom GPT, and Cursor before selecting the lowest-friction route.
                        </p>
                      </div>
                    </li>
                  </ol>
                  <ReadabilityComparison />
                </AnimateOnScroll>
              </section>

              <section id="solution" className="py-8 sm:py-12" aria-labelledby="solution-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="solution-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Solution
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    ContentNext shipped as a layered system: Custom GPT for everyday drafting, Cursor for code-connected
                    workflows, and modular knowledge files for fast iteration.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <DeliveryRouteDiagram />
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
                    The production decision delivered faster adoption, lower operational burden, and rapid prompt
                    iteration while preserving quality guardrails for in-product content. Readability improvements were
                    measurable, and we documented where further instrumentation was needed.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <div className="mt-8 mb-8">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4" role="group" aria-label="Outcome metrics">
                      <CaseStudyMetric label="Publishability" value="2.2/3" note="Average score" compact />
                      <CaseStudyMetric label="Guided-input readability" value="-2.86" note="Average grade-level change" compact />
                      <CaseStudyMetric label="Production overhead" value="0" note="AWS hosting and DevOps" compact />
                      <CaseStudyMetric label="Warning readability" value="-4.67" note="Average grade-level reduction" compact />
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={450}>
                  <aside className="mt-10 mb-8 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Reading the results">
                    <p className="mb-3 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                      Reading the results
                    </p>
                    <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      <p>
                        Guided input produced more readable content than free text in most categories, with the clearest
                        gains in warning messages. Warnings saw an average 4.67-grade-level drop on the Flesch-Kincaid
                        scale, meaning the output went from roughly college-level reading difficulty to something
                        accessible to a much wider audience.
                      </p>
                      <p>
                      Our target is a grade level of 7 to 8: clear enough for most
                      users, without stripping out the technical detail that makes the content accurate and useful.
                      </p>
                    </div>
                  </aside>
                </AnimateOnScroll>
              </section>

              <section id="conclusion" className="pt-8 sm:pt-12 pb-4" aria-labelledby="conclusion-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Conclusion
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <div className="mb-8 max-w-3xl space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    <p>
                      ContentNext demonstrated that AI reliability comes from design structure, not model novelty.
                      Prompt engineering, interaction design, and measured experimentation enabled a practical system
                      that scales quality without scaling friction.
                    </p>
                    <p>
                      The strongest strategic lesson was to layer tools by maturity: GPT for adoption, Cursor for
                      integration, and app governance only where strict controls are needed.
                    </p>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={400}>
                  <ol className="mt-12 mb-12 grid border-y border-black/10 dark:border-white/10 md:grid-cols-3">
                    {lessons.map((lesson, index) => (
                      <li
                        key={lesson.title}
                        className={`py-8 ${
                          index > 0
                            ? "border-t border-black/10 dark:border-white/10 md:border-t-0 md:border-l md:pl-8"
                            : ""
                        } ${index < lessons.length - 1 ? "md:pr-8" : ""}`}
                      >
                        <span className="mb-4 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="mb-3 text-xl font-medium text-foreground">{lesson.title}</h3>
                          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {lesson.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
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
