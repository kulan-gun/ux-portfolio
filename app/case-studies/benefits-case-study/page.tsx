"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import ScrollReveal from "@/components/animate-on-scroll"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import FeedbackAnalysis from "@/components/feedback-analysis"
import ImageModal from "@/components/ImageModal"
import CaseStudyMetric from "@/components/case-study-metric"
import CaseStudyHeader, { CaseStudyBackLink } from "@/components/case-study-header"
import MobileTableOfContents from "@/components/mobile-table-of-contents"
import { getProjectById } from "@/lib/projects"
import { motionSafeScrollBehavior } from "@/lib/accessibility"

const project = getProjectById("benefits")!

// Define the sections for this case study
const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

type RevealProps = React.ComponentProps<typeof ScrollReveal>

// Keep every reveal on this long-form page on one motion rhythm.
function AnimateOnScroll({ children, className }: RevealProps) {
  return (
    <ScrollReveal animation="fade-up" className={className}>
      {children}
    </ScrollReveal>
  )
}

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

          {/* Navigation links */}
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
          {/* Case Study Title and Tags */}
          <CaseStudyHeader
            project={project}
            mobileNavigation={<MobileTableOfContents sections={sections} />}
          />

          {/* Overview Section */}
          <section id="overview" className="min-h-screen py-8 sm:py-12" aria-labelledby="overview-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Overview
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                This case study shows my work on a government benefits service, enabling 500,000 - 700,000
                citizens each year to submit fit notes and access financial support.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <CaseStudyMetric label="Monthly sessions" value="46K" note="Average service traffic" />
                  <CaseStudyMetric label="Digital uptake" value="+10pp" note="Increase after launch" trend="up" />
                  <CaseStudyMetric label="Customer satisfaction" value="+5pp" note="Increase after launch" trend="up" />
                </div>
              </div>
            </AnimateOnScroll>


            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-3">
                  <article className="py-8 md:pr-8">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                      01
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">Scope and ownership</h3>
                    <dl className="mt-5 text-sm sm:text-base">
                      <div className="border-t border-black/10 dark:border-white/10 py-3">
                        <dt className="text-xs text-fui-dim">ROLE</dt>
                        <dd className="mt-1 text-muted-foreground">Lead UX Designer</dd>
                      </div>
                      <div className="border-t border-black/10 dark:border-white/10 py-3">
                        <dt className="text-xs text-fui-dim">DURATION</dt>
                        <dd className="mt-1 text-muted-foreground">1 year, 2 months</dd>
                      </div>
                      <div className="border-t border-black/10 dark:border-white/10 py-3">
                        <dt className="text-xs text-fui-dim">TEAM</dt>
                        <dd className="mt-1 text-muted-foreground">10+ cross-functional members</dd>
                      </div>
                    </dl>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:px-8">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                      02
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">Constraints</h3>
                    <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-3">Low completion and satisfaction rates</li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">Limited developer capacity</li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">Nuanced policy requirements</li>
                    </ul>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-8">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                      03
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">Approach</h3>
                    <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Map upstream issues to downstream service impacts
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Iterate research and prototypes to reduce upload failures
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Align design decisions across technology, policy, and operations
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={400}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/syfn/flowchart.png"
                    alt="Process flow diagram illustrating the user's journey in the benefits application process"
                    aria-describedby="img-caption-syfn-flowchart"
                  />
                  <figcaption
                    id="img-caption-syfn-flowchart"
                    className="case-study-caption"
                  >
                    Process flow diagram illustrating the user's journey in the benefits application process.
                  </figcaption>
                </figure>
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

            <AnimateOnScroll animation="fade-up" delay={400}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                Citizens need to submit fit notes as evidence for their benefit claim, but face significant difficulties when doing so.
                Through research, we found that primary users are likely to submit their fit note several
                times due to a recurring health condition.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-12">
                <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
                  <article className="py-8 md:pr-10">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                      CITIZEN EXPERIENCE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-foreground">Uploading a fit note was too difficult</h3>
                    <ul className="mt-6 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Guidance was confusing and difficult to follow.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Technical upload issues interrupted an already stressful journey.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Unsupported file formats prevented valid fit notes from being submitted.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Frustration and uncertainty caused some users to abandon the process.
                      </li>
                    </ul>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-10">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                      OPERATIONAL IMPACT
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-foreground">Failed uploads created avoidable work</h3>
                    <ul className="mt-6 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Support teams received high volumes of calls from users who could not complete the journey.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Agents manually reprocessed incorrectly uploaded fit notes.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Rejected evidence delayed benefit processing for people awaiting financial support.
                      </li>
                    </ul>
                  </article>
                </div>

                <aside className="mt-10 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Design challenge">
                  <p className="mb-3 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                    Design challenge
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-foreground">
                    Make repeat fit-note submissions clear and reliable, while reducing failed uploads, avoidable
                    support calls, and delays to benefit processing.
                  </p>
                </aside>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <div className="border-y border-black/10 dark:border-white/10 py-8 md:py-12">
                  <div className="flex flex-col items-center justify-center">
                    {/* User Journey Map */}
                    <div className="mb-12">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-16 h-16 shrink-0 bg-muted border border-black/10 dark:border-white/10 rounded-fui-lg overflow-hidden flex items-center justify-center text-foreground"
                          aria-hidden="true"
                        >
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-normal text-foreground">Persona</h3>
                          <p className="text-muted-foreground">
                            Andy, who has chronic health conditions, relies on government support to manage his living
                            expenses. He wants to ensure he receives the benefits he needs to maintain his financial
                            stability.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Journey Stages */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4" role="region" aria-label="User journey stages">
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Consider</h4>
                        <p className="text-sm text-muted-foreground">
                          Begins benefits claim and obtains a fit note from the doctor.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Explore</h4>
                        <p className="text-sm text-muted-foreground">
                          Reads instructions. Selects either paper or digital fit note. Follows guidance.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Upload</h4>
                        <p className="text-sm text-muted-foreground">
                          Selects the correct format. Uploads the fit note. Asks for help from friends or family if
                          needed.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Accept</h4>
                        <p className="text-sm text-muted-foreground">
                          If successful, Andy gets a text notification, and the fit note is sent for processing.
                          Otherwise, he must post it manually.
                        </p>
                      </div>
                    </div>

                    {/* Emotion Line */}
                    <figure className="relative mb-8 h-40">
                      <svg
                        className="w-full h-full text-fui-primary"
                        viewBox="0 0 800 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M0,20 Q100,0 200,60 T400,80 T600,40 T800,90"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle cx="0" cy="20" r="8" fill="currentColor" />
                        <circle cx="200" cy="60" r="8" fill="currentColor" />
                        <circle cx="400" cy="80" r="8" fill="currentColor" />
                        <circle cx="800" cy="90" r="8" fill="currentColor" />
                      </svg>
                      <figcaption className="sr-only">
                        User confidence declines across the journey, with the greatest frustration during upload and completion.
                      </figcaption>
                    </figure>

                    {/* Quotes */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"What do I need to do here?"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"Seems clear enough"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"Wait, this was meant to be simple!"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"That took far too long"</p>
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

            <AnimateOnScroll animation="fade-up" delay={400}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                My primary tools were Figma and the GOV.UK prototyping kit, which uses HTML, CSS and JavaScript. Our
                team's user-centred design approach was as follows:
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div>
                <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                  DELIVERY SEQUENCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-foreground">Activities</h3>
                <ol className="mt-8 mb-12 border-y border-black/10 dark:border-white/10">
                  {[
                    {
                      title: "User research",
                      description:
                        "Reviewed the feedback inbox and conducted interviews and usability testing with citizens and staff.",
                    },
                    {
                      title: "Analysis",
                      description:
                        "Assessed backend performance and user flows, identified bottlenecks, and compared similar services.",
                    },
                    {
                      title: "Prototyping",
                      description:
                        "Designed low- and high-fidelity prototypes, tested them with users, and refined the journey.",
                    },
                    {
                      title: "Collaboration",
                      description:
                        "Worked with content, research, development, and policy teams to align feasibility and secure sign-off.",
                    },
                    {
                      title: "Implementation",
                      description:
                        "Partnered with developers during rollout to preserve design intent and respond to delivery constraints.",
                    },
                  ].map((activity, index) => (
                    <li
                      key={activity.title}
                      className="grid gap-3 border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 sm:grid-cols-[3rem_10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                    >
                      <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-lg font-medium text-foreground">{activity.title}</h4>
                      <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {activity.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <FeedbackAnalysis />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                  RESEARCH ROUND 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-foreground mb-4">
                  Finding where submissions failed
                </h3>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                  We combined feedback-inbox analysis with interviews involving citizens and agents, then used affinity
                  mapping to identify the strongest recurring patterns.
                </p>
              </div>
              <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-3">
                <article className="py-8 md:pr-8">
                  <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                    01
                  </span>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">Feedback inbox</h4>
                  <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                    <li className="border-t border-black/10 dark:border-white/10 py-3">
                      Communication problems, upload failures, and missing fit notes dominated negative feedback.
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-3">
                      Payment complaints were common among detractors but sat outside our scope, so we escalated them.
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-3">
                      Uploading multiple fit notes in one session was the most requested feature.
                    </li>
                  </ul>
                </article>

                <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:px-8">
                  <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                    02
                  </span>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">User interviews</h4>
                  <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                    <li className="border-t border-black/10 dark:border-white/10 py-3">
                      Many users had limited digital confidence or accessibility needs.
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-3">
                      Mobile phones were often the only available way to access the service.
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-3">
                      Repeat submissions made unclear guidance and upload failures especially costly.
                    </li>
                  </ul>
                </article>

                <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-8">
                  <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                    03
                  </span>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">Behavioural data</h4>
                  <dl className="mt-5">
                    <div className="border-t border-black/10 dark:border-white/10 py-3">
                      <dt className="text-2xl font-medium text-foreground">3</dt>
                      <dd className="mt-1 text-sm text-muted-foreground">average upload attempts</dd>
                    </div>
                    <div className="border-t border-black/10 dark:border-white/10 py-3">
                      <dt className="text-2xl font-medium text-foreground">37%</dt>
                      <dd className="mt-1 text-sm text-muted-foreground">drop-off rate</dd>
                    </div>
                    <div className="border-t border-black/10 dark:border-white/10 py-3">
                      <dt className="text-2xl font-medium text-foreground">63%</dt>
                      <dd className="mt-1 text-sm text-muted-foreground">monthly completion rate</dd>
                    </div>
                  </dl>
                </article>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={400}>
              <h3 className="text-2xl font-normal text-foreground mt-12 mb-6">Iterations</h3>
              <ul className="space-y-2 text-sm sm:text-base md:text-lg text-muted-foreground list-disc pl-5">
                <li>I worked with the Content Designer to improve the guidance page copy.</li>
                <li>I designed variants to help users understand how to take clearer, more acceptable photos.</li>
              </ul>

              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/syfn/iterations-test.png"
                    alt="Variant designs tested for helping users take clearer photos"
                    aria-describedby="img-caption-iterations-test"
                  />
                  <figcaption
                    id="img-caption-iterations-test"
                    className="case-study-caption"
                  >
                    Variant layouts tested to improve users’ ability to take acceptable photos.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  The first iteration reworded the guidance to make it simpler to follow, using plain language and clearer structure so critical information was easier to find. We took it to design critique, where feedback highlighted the need to make the page shorter.
                </p>
              </div>

              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/syfn/iterations.png"
                    alt="Guidance page redesign with improved copy and clearer photography instructions"
                    aria-describedby="img-caption-iterations"
                  />
                  <figcaption
                    id="img-caption-iterations"
                    className="case-study-caption"
                  >
                    Revised guidance page layout with improved copy for better user clarity.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  I then explored visual variants that used imagery and step-by-step prompts to guide users towards taking photos that met system requirements, while also making the page shorter. These variants tested much better in user research.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                  RESEARCH ROUND 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-foreground mb-4">
                  Testing the clearest guidance
                </h3>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                  I took the revised designs through critique and heuristic evaluation, then worked with the team
                  across several usability-testing rounds to understand which guidance people could act on.
                </p>
              </div>
              <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
                <article className="py-8 md:pr-10">
                  <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                    01
                  </span>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">What users showed us</h4>
                  <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                    <li className="border-t border-black/10 dark:border-white/10 py-4">
                      Crosshairs around the fit-note image made the intended framing easiest to understand.
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-4">
                      Data matrices had to remain clearly visible so the service could extract fit-note information.
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-4">
                      “Data matrix” and “QR code” confused users, especially those with lower digital confidence.
                    </li>
                  </ul>
                </article>

                <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-10">
                  <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                    02
                  </span>
                  <h4 className="text-lg sm:text-xl font-medium text-foreground">What we changed</h4>
                  <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                    <li className="border-t border-black/10 dark:border-white/10 py-4">
                      I worked with the content designer to describe the data matrix as a “black and white square.”
                    </li>
                    <li className="border-t border-black/10 dark:border-white/10 py-4">
                      The phrasing tested well because each fit note contains only one such square.
                    </li>
                  </ul>
                </article>
              </div>
              <blockquote className="mt-10 max-w-3xl border-l-2 border-fui-primary py-2 pl-5 sm:pl-7">
                <p className="text-xl sm:text-2xl leading-relaxed text-foreground">
                  “My mum wouldn't know what a QR code is.”
                </p>
                <footer className="mt-4 font-mono text-xs tracking-wider-fui uppercase text-fui-dim">
                  User of the benefits service
                </footer>
              </blockquote>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={400}>
              <div className="mt-8">
                <h3 className="text-2xl font-normal text-foreground mb-6">Further iterations</h3>
                <ul className="space-y-2 text-sm sm:text-base md:text-lg text-muted-foreground list-disc pl-5">
                  <li>I also designed and prototyped new error messages and 'multiple fit note' upload flows.</li>
                  <li>I explored ways to convey contextual error messages and play back the user's uploaded fit note.</li>
                  <li>Due to limited developer capacity, these were placed in the backlog.</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={400}>
              <div className="mt-8 space-y-6 sm:space-y-8">

                <figure className="m-0">
                  <ImageModal
                    src="/syfn/iterations2.png"
                    alt="Further iterations focused on improving the upload process for clarity and ease of use"
                    aria-describedby="img-caption-iterations2"
                  />
                  <figcaption
                    id="img-caption-iterations2"
                    className="case-study-caption"
                  >
                    Iteration exploring a clearer, more intuitive upload process.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  These iterations streamlined the upload experience, ensuring clearer instructions and more predictable system responses to reduce user confusion and failed submissions.
                </p>

                <figure className="m-0">
                  <ImageModal
                    src="/syfn/multiple-uploads.png"
                    alt="Further iterations focused on enabling and simplifying multiple file uploads"
                    aria-describedby="img-caption-multiple-uploads"
                  />
                  <figcaption
                    id="img-caption-multiple-uploads"
                    className="case-study-caption"
                  >
                    Iteration exploring a simplified process for multiple file uploads.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  I also explored designs for handling multiple file uploads, making it easier for users to attach all of them in one go and reducing the need for repeat submissions.
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

            <AnimateOnScroll animation="fade-up" delay={400}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                After several testing rounds and iterations, we finalised the new guidance content and concepts for
                'upload' pages to improve users' understanding of what's needed.
              </p>

              <AnimateOnScroll animation="fade-up" delay={400}>
                <div className="mb-8 max-w-3xl">
                  <h3 className="text-2xl font-normal text-foreground mb-6">Key features include:</h3>
                  <ul className="space-y-2 text-sm sm:text-base md:text-lg text-muted-foreground list-disc pl-5">
                    <li>Clearer, more helpful guidance content and error messages</li>
                    <li>Better examples of good and bad fit-note images</li>
                    <li>Primary and secondary buttons placed closer together on the upload page</li>
                    <li>HEIC and HEIF file support, delivered with developers</li>
                  </ul>
                </div>
              </AnimateOnScroll>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={400}>
              <div className="mt-8 space-y-6 sm:space-y-8">

                <figure className="m-0">
                  <ImageModal
                    src="/syfn/improvements.png"
                    alt="Example improvements made to the design"
                    aria-describedby="img-caption-improvements"
                  />
                  <figcaption
                    id="img-caption-improvements"
                    className="case-study-caption"
                  >
                    Key design improvements implemented to simplify the process and improve clarity.
                  </figcaption>
                </figure>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  These refinements addressed user pain points by simplifying the layout, improving the visibility of critical instructions, and ensuring the process could be completed with fewer steps and less scrolling.
                </p>
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

            <AnimateOnScroll animation="fade-up" delay={400}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                My design changes delivered significant results in under six months, demonstrating the effectiveness
                of my solutions and the value they provided.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <CaseStudyMetric label="Completion rate" value="+3pp" note="Increase after launch" trend="up" />
                  <CaseStudyMetric label="Digital uptake" value="+10pp" note="Increase after launch" trend="up" />
                  <CaseStudyMetric label="Customer satisfaction" value="+5pp" note="Increase after launch" trend="up" />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={400}>
              <div className="mt-8 space-y-6 sm:space-y-8">

                <figure className="m-0">
                  <ImageModal
                    src="/syfn/solution.png"
                    alt="Finalised solution layout for the improved process"
                    aria-describedby="img-caption-solution"
                  />
                  <figcaption
                    id="img-caption-solution"
                    className="case-study-caption"
                  >
                    Finalised solution that streamlined the process and improved clarity.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  The final solution consolidated key guidance, optimised visual hierarchy, and reduced unnecessary scrolling. This made the process faster to complete, more accessible, and easier for users to follow without confusion.
                </p>

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

            <AnimateOnScroll animation="fade-up" delay={400}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                Through accessible and thoughtful design, we empowered users to navigate the service more confidently,
                transforming lives and demonstrating the profound impact design can have on public services.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12 grid gap-6">
                <div className="rounded-fui-lg bg-muted p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-6 w-6 text-primary-foreground"
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
                    <h3 className="text-2xl font-normal text-foreground mb-6">Data-driven design</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In live projects, using quantitative data helps you do Reach, Impact, Confidence, and Effort (RICE) scoring. This method
                      can help prioritise design changes effectively, focusing on areas with the greatest benefit to users in the shortest amount of time. Live dashboards and A/B
                      testing can then help validate how our design changes impact the service.
                    </p>
                  </div>
                </div>

                <div className="rounded-fui-lg bg-muted p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-6 w-6 text-primary-foreground"
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
                    <h3 className="text-2xl font-normal text-foreground mb-6">Digital inclusion</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Users were told to take a screenshot of their fit note, but one user thought a 'screenshot' meant taking a photo of your screen with a separate camera. This revealed the 'curse of knowledge' bias, where we assume users understand the same things
                      we do. This highlighted the need for simpler language and relatable analogies to support those with lower digital literacy.
                    </p>
                  </div>
                </div>

                <div className="rounded-fui-lg bg-muted p-8 backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-6 w-6 text-primary-foreground"
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
                    <h3 className="text-2xl font-normal text-foreground mb-6">Content can't solve it all</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Not all issues can be fixed with front-end changes. To reduce failed uploads and improve processing accuracy, we introduced key back-end enhancements. This included a HEIC file converter to support iPhone image uploads, and improvements to the scanning capabilities. These changes led to fewer errors, less manual rework, and a further 6%+ uplift in user satisfaction.
                    </p>

                  </div>
                </div>
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

