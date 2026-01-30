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
import MetricShuffle from "@/components/metric-shuffle"



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
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <ScrollProgressIndicator />

      <TopNavigation onMobileMenuToggle={(isOpen) => setSidebarOpen(isOpen)} />

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
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">UX Designer</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">2024/25</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Capgemini Invent</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-500" />
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Concept</span>
                </div>
              </div>
            </div>
            <h1 id="case-study-title" className="text-3xl sm:text-4xl md:text-5xl font-display mb-8 sm:mb-12">
              Leading human-centred design, empowered by AI
            </h1>

            {/* Hero image */}
            <div className="mb-12 sm:mb-16">
              <img
                src="/ai-design/aura_min.jpeg"
                alt="Project hero image showing the AURA interface"
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
                As Design Lead for Capgemini Invent's Innovation Lab, I led our exploration into how Generative AI (GenAI) and Agentic AI can empower human-centred design.</p>

              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                This involved exploring (1) how to design AI tools and (2) how to integrate them into design workflows.</p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mb-8 max-w-3xl">
                <h3 className="text-xl font-medium text-foreground mb-4">Key highlights:</h3>
                <ul className="space-y-2 text-sm sm:text-base md:text-lg text-muted-foreground list-disc pl-5">
                  <li>Created a prototype for AURA (Automatic Resource Assistant). This AI tool turns long, complex documents into clear, concise content.</li>
                  <li>Launched a Designathon for over 40 designers. This event encouraged safe, hands-on experimentation with AI tools like v0, ChatGPT and Copilot.</li>
                  <li>
                    Published <a
                      href="https://www.capgemini.com/gb-en/insights/research-library/think-big-start-small/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                      title="Read the Capgemini thought leadership article explaining Agentic AI for governments worldwide (opens in new tab)"
                      aria-label="Read the Capgemini thought leadership article explaining Agentic AI for governments worldwide (opens in new tab)"
                    >
                      an official Capgemini article (opens in new tab)
                    </a> on Agentic AI’s potential to transform global citizen services.
                  </li>

                </ul>
              </div>
            </AnimateOnScroll>



            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="40+" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">participants in Designathons</div>
                  </div>

                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="1.5×" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">faster design iteration cycles</div>
                  </div>

                  <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
                      <MetricShuffle final="3,000+" />
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-muted-foreground">engagements with Agentic AI article</div>
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
                        "Project duration: 1.5 years",
                        "Team size: 8 designers and researchers",
                        "Role: Design Lead – crafting GenAI prototypes, designathons, and thought leadership",
                      ],
                    },
                    {
                      title: "Challenges",
                      items: ["Communicating the value of speculative AI proofs-of-concept (PoCs)",
                        "Learning whilst doing because AI is a fast-moving field",
                        "Cross-functional collaboration with engineering whilst balancing other projects"],
                    },
                    {
                      title: "Approach",
                      items: ["Working with proxy users to define AI use-cases",
                        "Design AI interfaces with a focus on transparency, trust, and usability",
                        "Run immersive AI designathons to rapidly upskill multidisciplinary teams"],
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                This case study focuses on AURA. Change management consultants needed a faster, more engaging way to communicate complex HR policies. AURA sought to do just that.
              </p>
            </AnimateOnScroll>


            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <SummaryCard
                  sections={[
                    {
                      title: "User pain points",
                      items: [
                        "Lengthy, jargon-heavy HR policies slowed delivery",
                        "Manual distillation of key messages consumed hours",
                        "Inconsistent outputs reduced engagement across channels",
                      ],
                    },
                    {
                      title: "Business challenges",
                      items: [
                        "Slow turnaround for critical change communications",
                        "Difficulty maintaining tone and clarity across formats",
                        "Low visibility of key updates among employees",
                      ],
                    },
                    {
                      title: "Opportunities",
                      items: [
                        "Automate summarisation of complex documents",
                        "Standardise outputs to improve clarity and reach",
                        "Free up consultant time for higher-value work",
                      ],
                    },
                  ]}
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-12 mb-12">
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center">

                    {/* User Persona */}
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
                          <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-4">Persona: Rani – the Change Management Consultant</h3>
                          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                            Rani helps organisations handle change. She often turns long HR and policy documents into engaging formats, like emails, intranet posts, and posters. She needs a way of speeding this up without losing accuracy.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Journey Stages */}
                    <div className="grid grid-cols-4 gap-4 mt-12" role="region" aria-label="User journey stages">
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Receiving</h4>
                        <p className="text-sm text-muted-foreground">
                          Rani is sent lengthy workplace policy documents from clients. They can be hundreds of pages long, packed with complex language and legal terms.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Extracting</h4>
                        <p className="text-sm text-muted-foreground">
                          She reads through each document in detail, manually highlighting and copying relevant sections
                          into a separate working file for later rewriting.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Rewriting</h4>
                        <p className="text-sm text-muted-foreground">
                          Rani rewrites the extracted content in plain language, adjusting tone, structure, and length to
                          match the intended audience, often rechecking for compliance.
                        </p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-foreground mb-4">Review</h4>
                        <p className="text-sm text-muted-foreground">
                          She proofreads, formats, and finalises the summaries before sharing them with colleagues or clients.
                          The whole process can take several days per document.
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
                    <div className="grid grid-cols-4 gap-4 mt-8" aria-label="User quotes at different journey stages">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"These policies are too long for busy employees to digest."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"I need summaries that are both accurate and engaging."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"I wish tailoring content for different audiences were effortless."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">"It's finally done. That took longer than it needed to."</p>
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                The AURA prototype was developed through an iterative, evidence-based approach. We began with model selection, testing Claude Sonnet against alternative LLMs using parameters such as context length, summarisation accuracy, tone control, and processing speed. This ensured we chose the most reliable model for distilling lengthy HR and policy documents into clear, engaging formats.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">1</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Scoping & research</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Mapped challenges faced by consultants in summarising lengthy HR and policy documents through interviews and workflow analysis.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">2</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Model evaluation</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Tested Claude Sonnet and alternative LLMs using parameters such as summarisation accuracy, tone control, and processing speed.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">System prompt</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Primed the model with sample documents and a tailored system prompt to ensure accuracy, avoid hallucinations, and adapt tone to different formats.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Prototyping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Explored both chat-style and agentic document-pane interfaces using Figma and API integrations to assess usability and efficiency.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-600 dark:bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">5</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">Testing & iteration</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-muted-foreground text-sm md:text-base text-center">
                          Gathered feedback from consultants and clients, refining UI, tone handling, and summarisation quality for real-world adoption.
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              {/* AURA architecture */}
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/ai-design/aura_architecture.png"
                    alt="AURA system architecture showing data flow, model orchestration, and integration points"
                    aria-describedby="aura-arch-caption"
                  />
                  <figcaption
                    id="aura-arch-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    AURA system architecture with data flow and integration points.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  The architecture diagram shows how AURA connects to MongoDB, routes prompts through model services, handles auth, and logs activity for audit and safety. We primed the model with sample documents and applied a carefully crafted system prompt to maintain accuracy, avoid hallucinations, and tailor outputs to channels such as emails, posts, and posters.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              {/* Early stage concepts */}
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/ai-design/early_stage_concepts.png"
                    alt="Early AURA concepts exploring information architecture, workflows, and feature directions"
                    aria-describedby="aura-concepts-caption"
                  />
                  <figcaption
                    id="aura-concepts-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Early concepts exploring IA, workflows, and feature directions.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  I explored two interface concepts: a chat-style interface for conversational refinement and an agentic design with a document viewing pane for side-by-side reading, annotation, and summary generation. Rapid Figma prototypes and AI API integrations allowed us to test both paradigms quickly and make evidence-based design decisions.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              {/* Generate feature demo */}
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/ai-design/aura_generate.gif"
                    alt="Animation of AURA’s Generate feature creating a draft from a prompt with inline editing"
                    aria-describedby="aura-generate-caption"
                  />
                  <figcaption
                    id="aura-generate-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Generate demo: prompt, draft, and quick edits.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Shows prompt presets, draft output, and lightweight edits with guardrails. Designed to keep users in control while speeding up first-draft creation.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              {/* Design critique findings */}
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/ai-design/aura_design_crit.png"
                    alt="Design critique notes that informed AURA refinements"
                    aria-describedby="aura-crit-caption"
                  />
                  <figcaption
                    id="aura-crit-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Design critique highlights that guided refinements.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Prioritised clarity and control: tighter labels, better empty states, simplified layouts, and consistent patterns across generate, review, and publish steps.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              {/* User research findings */}
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/ai-design/aura_ur.png"
                    alt="User research findings that shaped AURA’s interaction patterns"
                    aria-describedby="aura-ur-caption"
                  />
                  <figcaption
                    id="aura-ur-caption"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Research insights shaping trust, transparency, and control.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  Sessions surfaced pain points around trust and explainability. We added clearer consent, source attribution, and reversible actions to build confidence.
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                We built a focused MVP that proves value without UI complexity. We selected Claude Sonnet for its long context window and reliable summarisation, primed it with representative HR and policy documents, and used a targeted system prompt to control tone and format.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 space-y-6 sm:space-y-8">
                <figure className="m-0">
                  <ImageModal
                    src="/ai-design/aura_mvp.gif"
                    alt="Animated demonstration of the new AURA generate feature"
                    aria-describedby="img-caption-aura-generate"
                  />
                  <figcaption
                    id="img-caption-aura-generate"
                    className="mt-3 text-center text-xs sm:text-sm text-gray-400"
                  >
                    Animated demonstration of the AURA generate feature producing ready-to-use summaries.
                  </figcaption>
                </figure>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground mb-4">
                  The document viewing pane and chat interface were removed from scope due to technical complexity and time. Summarisation ran behind the scenes, and users simply downloaded channel-ready outputs such as one-pagers, intranet posts, or poster copy. Fine-tuning or in-app editing was not included in the MVP.
                </p>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                  This validated the core outcome fast: accurate, consistent summaries that reduced manual effort and improved clarity, ready for future iterations that can add a viewer, highlights, and conversational refinement.
                </p>
              </div>
            </AnimateOnScroll>

          </section>

          {/* Results Section */}
          <section
            id="results"
            className="pt-8 sm:pt-12 pb-8 sm:pb-12"  /* was: min-h-screen pt-8 sm:pt-12 pb-4 sm:pb-6 */
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

            <AnimateOnScroll animation="fade-up" delay={200}>
              {/* Split into two paragraphs; control spacing via mb */}
              <p className="mb-5 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                The AURA proof of concept explored how RAG-powered AI could automatically summarise lengthy documents for public and private sector users. Through research, prototyping, and stakeholder testing, we validated the core value: AI could deliver accurate summaries behind the scenes, removing the need for a complex in-app viewer or editing tools at MVP stage.
              </p>
              <p className="mb-6 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                While the project was paused before launch due to shifting priorities, it delivered clear learning on technical feasibility, user expectations, and MVP scoping. These insights have since informed other AI initiatives and strengthened our approach to designing responsible, human-centred AI tools.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
  <div className="mt-8 mb-6">
    <div
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
      role="group"
      aria-label="AURA proof of concept outcomes"
    >

      {/* Metric 1 */}
      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
          <MetricShuffle final="3" />
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
          interface concepts explored before narrowing scope
        </div>
      </div>

      {/* Metric 2 */}
      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
          <MetricShuffle final="60%+" />
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
          estimated time saved in document summarisation during testing
        </div>
      </div>

      {/* Metric 3 (letters shuffle) */}
      <div className="rounded-2xl bg-muted p-4 sm:p-6 md:p-8 backdrop-blur-sm">
        <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">
          <MetricShuffle final="MVP" />
        </div>
        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
          simplified to automated behind-the-scenes summarisation due to technical constraints
        </div>
      </div>

    </div>
  </div>
</AnimateOnScroll>


          </section>


          {/* Conclusion Section */}
          <section id="conclusion" className="min-h-[50vh] py-6 sm:py-8" aria-labelledby="conclusion-heading">
            <AnimateOnScroll animation="bounce-up">
              <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                Conclusion
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                From concept to proof-of-concept, AURA showed how Retrieval-Augmented Generation could transform dense HR and policy documents into concise, engaging formats.
                <br /><br />
                While the MVP was simplified and never shipped, the process delivered valuable internal learnings, reusable design patterns, and a clearer view of the technical and ethical considerations for deploying AI in client contexts.
              </p>
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
                  title="Choosing the right model for the job"
                  description="AURA began with a broad exploration of LLMs and embeddings, testing both open-source and proprietary models for accuracy, speed, and cost. We learned that model selection must be driven not just by technical benchmarks, but by the complexity of the documents, the domain language, and the required factual precision. This is equally relevant in a manufacturing or 'Design & Make' context, where the assistant may need to interpret lengthy technical manuals, engineering specs, or safety standards without losing nuance."
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
                  title="Designing components for AI-powered experiences"
                  description="Unlike conventional products where content is static, AI outputs are probabilistic. This meant designing for uncertainty — with clear loading states, confidence indicators, and mechanisms for users to refine queries. In AURA, this took the form of persistent query history, expandable answer sections, and inline citations. These patterns are directly applicable to manufacturing-focused tools like Autodesk Assistant, where iterative questioning and quick validation of source material are essential."
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
                  title="Balancing automation with human oversight"
                  description="In designing AURA, we found that AI is most valuable when it accelerates human decision-making, not replaces it. For summarising complex policy or technical documentation, we built in transparency features like source linking, full-document context views, and export options so users could verify outputs. The same principle applies in manufacturing workflows — whether checking compliance data or interpreting CAD-related standards, the human-in-the-loop remains essential for quality and accountability."
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

