"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import Footer from "@/components/footer"
import UXLessonsCard from "@/components/ux-lessons-card"
import ImageModal from "@/components/ImageModal"
import CaseStudyMetric from "@/components/case-study-metric"
import CaseStudyHeader, { CaseStudyBackLink } from "@/components/case-study-header"
import MobileTableOfContents from "@/components/mobile-table-of-contents"
import { getProjectById } from "@/lib/projects"
import { motionSafeScrollBehavior } from "@/lib/accessibility"

const project = getProjectById("contactless-travel")!

// Define the sections for this case study
const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "technology", title: "Workstream 1: Live service" },
  { id: "process-2", title: "Workstream 2: Biometrics" },
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

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                On GOV.UK digital immigration, I worked across two connected workstreams: improving the live status
                service and evaluating remote biometric enrolment. I collaborated with another UX designer, three user
                researchers, three content designers, and several business analysts and developers.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <CaseStudyMetric label="Global users served" value="7M" note="40% growth from 5M" trend="up" />
                  <CaseStudyMetric label="Completion rate" value="83%" note="9 percentage points in 2 months" trend="up" />
                  <CaseStudyMetric
                    label="GDS service assessment"
                    value="Passed"
                    note="First attempt · progressed to public beta"
                    scrambleLetters
                  />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-3">
                  <article className="py-8 md:pr-8">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                      01
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">Project scope</h3>
                    <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Workstream 1 improved the live immigration status service.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Workstream 2 evaluated remote biometric self-enrolment.
                      </li>
                    </ul>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:px-8">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                      02
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">My contribution</h3>
                    <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Improved usability and accessibility across public and internal services.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Co-designed online account recovery and evaluated biometric supplier experiences.
                      </li>
                    </ul>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-8">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                      03
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">Constraints</h3>
                    <ul className="mt-5 text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-3">Rigid backend architecture</li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Diverse global and cultural needs
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-3">
                        Strict identity-security requirements
                      </li>
                    </ul>
                  </article>
                </div>
              </div>

              <div className="mt-12 mb-6">
                <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                  SERVICE JOURNEY
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-foreground">
                  How the eVisa journey fits together
                </h3>
              </div>
              <figure>
                <ImageModal
                  src="/contactless/evisa_flow.png"
                  alt="Process flow and high-level user journey for the contactless eVisa service"
                  aria-describedby="evisa-flow-caption"
                />
                <figcaption id="evisa-flow-caption" className="case-study-caption">
                  Process flow and high-level user journey for the contactless eVisa service.
                </figcaption>
              </figure>


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
                The work addressed two connected problems: making the live immigration service more accessible, and
                understanding how remote biometric enrolment could feel secure and trustworthy.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-10">
                <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
                  <article className="py-8 md:pr-10">
                    <div className="mb-6">
                      <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                        WORKSTREAM 1
                      </span>
                      <h3 className="text-xl sm:text-2xl font-medium text-foreground">Access and account recovery</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Public immigration status service</p>
                    </div>
                    <ul className="text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Expiring physical documents created an urgent need for digital proof of status.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Users without identity documents faced barriers when creating an account.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Jargon and inaccessible content excluded people with lower English or digital confidence.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Lost account details forced users into slow offline recovery routes.
                      </li>
                    </ul>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-10">
                    <div className="mb-6">
                      <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                        WORKSTREAM 2
                      </span>
                      <h3 className="text-xl sm:text-2xl font-medium text-foreground">Trust and remote biometrics</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Biometric self-enrolment trials</p>
                    </div>
                    <ul className="text-sm sm:text-base text-muted-foreground">
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Users needed confidence when sharing biometric data with the UK government.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Strict security requirements had to coexist with a usable experience.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Collection and storage needed to remain secure throughout the journey.
                      </li>
                      <li className="border-t border-black/10 dark:border-white/10 py-4">
                        Biometric authentication had to connect coherently with wider account journeys.
                      </li>
                    </ul>
                  </article>
                </div>

                <aside className="mt-10 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Design challenge">
                  <p className="mb-3 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                    Design philosophy
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-foreground">
                    Design for the 1% with the most complex needs, while making secure identity services clearer and
                    easier for everyone.
                  </p>
                </aside>
              </div>
            </AnimateOnScroll>


          </section>

          {/* Process Section - Workstream 1 */}
          <section id="technology" className="min-h-screen py-8 sm:py-12" aria-labelledby="process-heading-1">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="process-heading-1" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Workstream 1: Improving the live service
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
                <div className="rounded-fui-lg bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Usability testing with diverse users revealed issues and improved accessibility.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Created iterative prototypes, refining user journeys based on ongoing user feedback.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Accessibility</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Ensured compliance with WCAG standards and best practices for digital inclusion.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">4</span>
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
                    aria-describedby="gov-caption-1"
                  />
                  <figcaption
                    id="gov-caption-1"
                    className="case-study-caption"
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
                    posterSrc="/contactless/app-poster.png"
                    alt="Animated hybrid prototype showing a user journey where a Figma mobile prototype is integrated with a GOV.UK coded prototype, allowing the user to pause the desktop flow and complete identity verification via the government app on their phone"
                    aria-describedby="app-caption"
                  />
                  <figcaption
                    id="app-caption"
                    className="case-study-caption"
                  >
                    I set up a Figma mobile prototype and connected it to a GOV.UK prototype built in HTML, CSS, and JavaScript. This simulated a real omni-channel journey.
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
                    aria-describedby="process1-caption"
                  />
                  <figcaption
                    id="process1-caption"
                    className="case-study-caption"
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
                Workstream 2: Testing remote biometrics
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
                <div className="rounded-fui-lg bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">User research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Ran biometric trials to gauge views on remote fingerprint and facial recognition.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Designed and refined biometric enrolment UI components from real-world tests.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Security & trust</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Advised app suppliers on ways to build user trust through clear messaging.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <span className="text-xl font-medium text-primary-foreground md:text-2xl">4</span>
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
                    className="case-study-caption"
                  >
                    Insights and sentiment analysis from 200 participants in biometric self-enrolment trials.
                  </figcaption>
                </figure>

                <aside className="max-w-3xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Disclosure note">
                  <p className="mb-3 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                    Disclosure note
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Because this work involved sensitive biometric systems, I cannot show the tested interfaces. My
                    contribution included evaluating supplier apps, identifying accessibility and trust risks, and
                    translating findings into recommendations for security, privacy, research, and supplier teams.
                  </p>
                </aside>
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
                <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
                  <article className="py-8 md:pr-10">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                      WORKSTREAM 1
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-foreground">Strengthening the live service</h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      I simplified complex steps, improved accessibility across devices, and co-designed an automated
                      online account recovery journey.
                    </p>
                  </article>

                  <article className="border-t border-black/10 dark:border-white/10 py-8 md:border-t-0 md:border-l md:pl-10">
                    <span className="mb-3 block font-mono text-xs tracking-widest-fui text-fui-primary">
                      WORKSTREAM 2
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-foreground">Evaluating remote biometric enrolment</h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      We captured more than 200 fingerprints, evaluated nine supplier apps against accessibility and
                      usability heuristics, and produced recommendations for safer remote enrolment.
                    </p>
                  </article>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                Four Workstream 1 design decisions show how research findings became focused improvements to the
                public service and internal platform.
              </p>
            </AnimateOnScroll>

            {/* 1) Relatable analogies, tooltips, screen reader tweaks */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-12 space-y-6 sm:space-y-8">
                <div className="grid gap-3 border-t border-black/10 dark:border-white/10 pt-6 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                  <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">WS1 · 01</span>
                  <h3 className="text-xl sm:text-2xl font-medium text-foreground">
                    Use plain language and improve the reading order
                  </h3>
                </div>
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/multiple_examples.png"
                    alt="Examples showing NFC explained in plain language, an acronym tooltip using the abbr element, and a layout change that keeps key info before the primary action for screen readers"
                    aria-describedby="img-caption-multiple-examples"
                  />
                  <figcaption
                    id="img-caption-multiple-examples"
                    className="case-study-caption"
                  >
                    Plain language, acronym tooltips, and screen-reader-friendly layout.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  We made technical terms relatable, kept the original English for acronyms via tooltips, and moved critical content above the call-to-action. These changes improved comprehension and reduced missed information for assistive tech users.
                </p>
              </div>
            </AnimateOnScroll>

            {/* 2) Context-aware warning near decision radios */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-16 space-y-6 sm:space-y-8">
                <div className="grid gap-3 border-t border-black/10 dark:border-white/10 pt-6 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                  <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">WS1 · 02</span>
                  <h3 className="text-xl sm:text-2xl font-medium text-foreground">
                    Put warnings at the point of decision
                  </h3>
                </div>
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/pull_revelation.png"
                    alt="Before and after screens showing a generic alert being missed and a new inline warning placed next to decision radio buttons so it appears at the moment of choice"
                    aria-describedby="img-caption-context-warning"
                  />
                  <figcaption
                    id="img-caption-context-warning"
                    className="case-study-caption"
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
              <div className="mt-16 space-y-6 sm:space-y-8">
                <div className="grid gap-3 border-t border-black/10 dark:border-white/10 pt-6 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                  <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">WS1 · 03</span>
                  <h3 className="text-xl sm:text-2xl font-medium text-foreground">
                    Split complex choices to reduce overwhelm
                  </h3>
                </div>
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/reduce-overwhelm.png"
                    alt="Comparison showing a single page with nine radio options replaced by a two page flow that groups options into clearer themes with brief hints"
                    aria-describedby="img-caption-two-page"
                  />
                  <figcaption
                    id="img-caption-two-page"
                    className="case-study-caption"
                  >
                    Two-page flow clusters options together with helpful hints. Images are blurred deliberately to protect sensitive information.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Research showed too many options on one page caused overwhelm and limited design scalability. I split the flow into two pages with short hints. This reduced cognitive load and helped users decide faster with fewer errors.
                </p>
              </div>
            </AnimateOnScroll>

            {/* 4) WAVE contrast issue with greyed out radios */}
            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-16 space-y-6 sm:space-y-8">
                <div className="grid gap-3 border-t border-black/10 dark:border-white/10 pt-6 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                  <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">WS1 · 04</span>
                  <h3 className="text-xl sm:text-2xl font-medium text-foreground">
                    Remove inaccessible disabled controls
                  </h3>
                </div>
                <figure className="m-0">
                  <ImageModal
                    src="/contactless/wave_test.png"
                    alt="WAVE accessibility report highlighting greyed out radio buttons that failed contrast checks next to the page where those radios appear disabled"
                    aria-describedby="img-caption-wave"
                  />
                  <figcaption
                    id="img-caption-wave"
                    className="case-study-caption"
                  >
                    Disabled radios failed contrast checks in WAVE. Images are blurred deliberately to protect sensitive information.
                  </figcaption>
                </figure>

                <div className="max-w-3xl space-y-5 text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I initially identified the disabled radios as failing WCAG SC 1.4.3 contrast requirements. Because
                    they served no purpose when another active user was viewing the case, I explored whether they could
                    be removed.
                  </p>

                  <p>
                    During the review, I learned that disabled or inactive interface components are exempt from the
                    contrast requirements in WCAG 2.2 SC 1.4.3 and SC 1.4.11. I shared this clarification with the team,
                    and we ultimately kept the controls disabled.
                  </p>

                  <aside className="border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Accessibility learning">
                    <p className="mb-2 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                      What I learned
                    </p>
                    <p>
                      Not every low-contrast disabled component constitutes a WCAG failure. The experience reinforced
                      the importance of checking the precise scope of accessibility criteria before recommending a
                      change.
                    </p>
                  </aside>
                </div>

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
                  <CaseStudyMetric label="Global users served" value="7M" note="40% growth from 5M" trend="up" />
                  <CaseStudyMetric label="Completion rate" value="83%" note="9 percentage points in 2 months" trend="up" />
                  <CaseStudyMetric label="GDS service assessment" value="Passed" note="First attempt · progressed to public beta" scrambleLetters />
                  <CaseStudyMetric label="Average journey time" value="21 min" note="4% reduction" trend="down" />
                  <CaseStudyMetric label="Offline recovery requests" value="-67%" note="Fewer requests after online recovery launched" />
                  <CaseStudyMetric label="Biometric enrolment trials" value="200+" note="Participants across remote trials" />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="bounce-up">
              {/* Trim bottom margin so it doesn't compound with the quote block that follows */}
              <div className="mt-8 mb-8">  {/* was: mb-12 */}
                <div className="rounded-fui-lg bg-muted p-8 md:p-12 backdrop-blur-sm">
                  {/* Slightly tighter vertical rhythm inside the card */}
                  <div className="space-y-10">  {/* was: space-y-12 */}
                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Workstream 1</h3>
                      </div>
                      <div className="flex-1">
                        <div className="mb-4 h-0.5 w-12 bg-foreground/70"></div>  {/* was: mb-6 */}
                        <p className="text-muted-foreground mb-4">
                          We achieved a first-time GDS assessment pass, allowing the service to move to public beta.
                        </p>
                        <ul className="space-y-4 text-muted-foreground">
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Over 7 million users worldwide can now prove their immigration status digitally.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Simplified content and added tooltips for acronyms through inclusive language design.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-foreground">•</span>
                            <span>Co-designed and prototyped an automated account recovery flow, reducing offline requests by 67%.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-8 md:gap-16">
                      <div className="w-32 md:w-40">
                        <h3 className="text-xl md:text-2xl font-normal text-foreground">Workstream 2</h3>
                      </div>
                      <div className="flex-1">
                        <div className="mb-4 h-0.5 w-12 bg-foreground/70"></div>  {/* was: mb-6 */}
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
            <div className="mt-6 rounded-fui-lg bg-muted p-8 backdrop-blur-sm">  {/* was: mt-8 */}
              <div className="flex flex-col space-y-4">
                <blockquote className="relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-muted-foreground/60" aria-hidden="true">
                    "
                  </div>
                  <p className="text-xl italic text-muted-foreground pl-6 pr-6">
                    This will make things so much easier. I won't have to travel for 2 hours to do this, I can just do it at home.
                  </p>
                  {/* Removed the leading em dash in the citation to match your no-em-dash rule */}
                  <footer className="mt-4 text-sm text-muted-foreground pl-6">
                    Participant in the biometric trials
                  </footer>
                  <div className="absolute -bottom-4 -right-4 text-4xl text-muted-foreground/60" aria-hidden="true">
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
                  description={"Designing for the extremes of user ability benefits everyone. By focusing on accessibility for users with disabilities, we created a more intuitive system that all travellers found easier to use, regardless of their digital literacy or physical capabilities. By adopting an omni-channel design approach, we ensured the service works for users regardless of device access."}
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

