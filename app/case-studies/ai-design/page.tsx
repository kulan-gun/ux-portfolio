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

      {/* Main Content - With left margin on desktop, full width on mobile */}
      <main className={`flex-1 px-4 sm:px-8 py-12 ${isMobile ? "w-full" : "md:ml-64 md:max-w-[calc(100%-64px)]"}`}>
        <div className="max-w-6xl mx-auto">
          {/* Case Study Title and Tags */}
          <div>
            <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">UX Designer</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">2024/25</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Capgemini Invent</span>
                </div>
              </div>
              <div className="inline-flex rounded-full bg-zinc-800/50 px-3 py-1 sm:px-4 sm:py-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-500" />
                  <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Concept</span>
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
                As Design Manager for Capgemini Invent's Innovation Lab, I led our exploration into how generative AI can empower human-centred design.
                <br /><br />
                We developed three AI-powered prototypes — AURA, CARA, and MOSAiC/NEXUS — each addressing different client types: keystone, growth, and target. These tools used Retrieval-Augmented Generation (RAG) to support users in navigating complex challenges.
                <br /><br />
                Alongside product innovation, I launched a Designathon to upskill 40+ designers, enabling safe, hands-on experimentation with AI tooling. I also authored a
                <a
                  href="https://www.capgemini.com/gb-en/insights/research-library/think-big-start-small/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline mx-1"
                >
                  thought leadership article
                </a>
                introducing the concept of Agentic AI — autonomous AI systems designed to act responsibly toward human goals.
              </p>
            </AnimateOnScroll>


            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">40+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      participants in Designathons
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">1.5×</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      faster design iteration cycles
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">3,000+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      engagements with Agentic AI article
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
                        "Project duration: 1.5 years",
                        "Team size: 8 designers and researchers",
                        "My role: Design Manager, AI Innovation",
                        "Primary focus: Delivering GenAI PoCs, hackathons and thought leadership",
                      ],
                    },
                    {
                      title: "Challenges",
                      items: ["Communicating the value of speculative AI PoCs",
                        "Balancing speed with responsible design",
                        "Cross-functional collaboration with engineering"],
                    },
                    {
                      title: "Approach",
                      items: ["Define use-cases per client type (keystone, target, growth)",
                        "Prototype with RAG (Retrieval-Augmented Generation)",
                        "Embed explainability and usability in AI interfaces",
                        "Upskill teams with hands-on designathons"],
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                Design leaders, service teams and clients were unsure how to safely integrate generative AI into real-world delivery.
                <br /><br />
                UCD teams felt pressure to adopt AI, but lacked a safe space to experiment. Clients needed to see tangible use-cases — but many GenAI products felt gimmicky or overly technical.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-8 mb-12">
                <SummaryCard
                  sections={[
                    {
                      title: "User pain points",
                      items: [
                        "Designers unsure which AI tools were safe or useful",
                        "Clients hesitant about investing in early AI products",
                        "Engineering constraints around scalable AI implementation",
                        "No clear process for prototyping AI responsibly",
                      ],
                    },
                    {
                      title: "Business challenges",
                      items: ["Unclear ROI of speculative AI design",
                        "Need to differentiate in a competitive consulting space",
                        "Low internal confidence with AI tooling"],
                    },
                    {
                      title: "Opportunities",
                      items: [
                        "Define archetypal use-cases and audiences",
                        "Demonstrate tangible outputs using RAG",
                        "Upskill staff through guided experiments",
                        "Publish credible thought leadership",
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
                          <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">Persona: Rani – the Curious Consultant</h3>
                          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                            Rani is a mid-level service designer who wants to experiment with AI tools but feels overwhelmed by choice. She wants examples that are relevant to government and healthcare clients, and needs a space to try things out safely, without needing to code.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Journey Stages */}
                    <div className="grid grid-cols-4 gap-4 mt-12" role="region" aria-label="User journey stages">
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Awareness</h4>
                        <p className="text-sm text-gray-400">Rani hears about GenAI through internal channels and client projects but is unsure where to start.</p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Motivation</h4>
                        <p className="text-sm text-gray-400">She wants to learn AI but finds tutorials too generic or irrelevant to her domain.</p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Exploration</h4>
                        <p className="text-sm text-gray-400">Rani attends the Designathon, using Figma plugins and prompt libraries to create design concepts.</p>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-normal text-white mb-4">Application</h4>
                        <p className="text-sm text-gray-400">She reuses Designathon prompts on her next project, embedding AI into research and ideation.</p>
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
                        <p className="text-sm text-gray-400">"I want to try this, but I do not know where to begin."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"Is this even safe for government clients?"</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"Oh! This plugin actually makes sense for our workflow."</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">"I reused this approach on my NHS project last week."</p>
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                We followed a 3-stream delivery approach. While prototyping the AURA, CARA and MOSAiC/NEXUS tools, I ran a parallel Designathon to upskill colleagues, and authored a thought leadership piece introducing Agentic AI.
                <br /><br />
                This ecosystem allowed designers to learn through play, while also delivering credible outcomes for clients. The prototypes were built using Figma, RAG techniques, and AI APIs. The Designathon encouraged hands-on experimentation and safe failure.
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
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Research & scoping</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Identified public sector use-cases for AI using desk research, internal strategy docs, and expert interviews.
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
                          Designed and tested RAG-based tools (AURA, CARA, MOSAiC/NEXUS) using Figma and AI APIs.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">3</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Designathon</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Hosted a AI Designathons with 40+ consultants, enabling hands-on learning and safe experimentation.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">4</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Feedback loops</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Gathered insights from design, engineering, and client stakeholders to iterate on usability and ethics.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                        <span className="text-xl md:text-2xl font-medium text-white">5</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-normal text-white mb-4">Thought leadership</h3>
                      <ul className="space-y-3 text-left w-full">
                        <li className="text-gray-400 text-sm md:text-base text-center">
                          Published a widely read article introducing Agentic AI to help define responsible autonomy in design.
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
                  src="/ai-design/aura_architecture.png"
                  alt="Animated demonstration of the Aura generate feature"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/ai-design/early_stage_concepts.png"
                  alt="Early concepts of AURA's features"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/ai-design/aura_design_crit.png"
                  alt="A design crit held to improve early concepts of AURA's features"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/ai-design/aura_ur.png"
                  alt="A user research round held to improve early concepts of AURA's features"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/ai-design/aura_generate.gif"
                  alt="Animated demonstration of the Aura generate feature"
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
                I created a multi-pronged solution: (1) Deliver RAG-powered AI PoCs tailored to real user needs (AURA, CARA, MOSAiC/NEXUS); (2) Run AI Designathons to support learning and experimentation; (3) Publish a forward-looking article to shape the conversation on autonomous AI.
                <br /><br />
                These streams reinforced each other — tools like AURA showed what was possible; the Designathon helped consultants gain hands-on experience; and the Agentic AI article signalled our thought leadership.
                <br /><br />
                <a
                  href="https://www.capgemini.com/gb-en/insights/research-library/think-big-start-small/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Read the Agentic AI article here
                </a>
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/ai-design/aura_mvp.gif"
                  alt="Animated demonstration of the Aura MVP with some features remove, to help with releasing earlier"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll>


            <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8 aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/LHQqpg1krqw"
                  title="AI Designathon – Figma Screen Recording"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
                The AI initiative resulted in three functional PoCs (AURA, CARA, MOSAiC/NEXUS) that helped drive client interest and internal capability building. The designathon fostered a learning culture across 40+ designers, while the Agentic AI article influenced conversations on responsible AI in the public sector.
                <br /><br />
                These outputs improved our maturity in AI tooling and positioned us as thought leaders in human-centred AI design. The assets generated from my work contributed to the development of a go-to-market (GTM) offering, which led to £1m+ in sales for AI projects.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={600}>
              <div className="mt-4 rounded-3xl bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex flex-col space-y-4">
                  <blockquote className="relative">
                    <div className="absolute -top-4 -left-4 text-4xl text-gray-600" aria-hidden="true">
                      "
                    </div>
                    <p className="text-lg sm:text-xl italic text-gray-300 px-6">
                      Thank you so much to our friends at Capgemini for organising and running the AI Designathon yesterday! I hope everyone found it as helpful and insightful as I did."
                    </p>
                    <footer className="mt-2 text-sm text-gray-400 px-6">— Principal Interaction Designer, UK Civil Service</footer>
                    <div className="absolute -bottom-4 -right-4 text-4xl text-gray-600" aria-hidden="true">
                      "
                    </div>
                  </blockquote>
                </div>
              </div>
            </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">40 - 50%</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      faster prototyping with AI
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">4×</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      more ideas generated with AI
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">30+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      civil servants participated
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="mt-8 mb-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Key metrics">
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">£1m+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      generated in sales from this AI work
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">60+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      people trained in prompt engineering
                    </div>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/50 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                    <div className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white">6+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">
                      Designathons run between 2024 - 2025
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
              <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-400">
                From speculative idea to functional proof-of-concept, we empowered teams to understand, apply, and challenge the role of AI in design.
                <br /><br />
                The AURA, CARA and MOSAiC/NEXUS PoCs provided valuable internal learning, reusable front-end patterns, and client-facing propositions. The Designathon fostered capability and confidence, while the Agentic AI article seeded the next wave of discussion.
              </p>
            </AnimateOnScroll>

            {/* <AnimateOnScroll animation="fade-in" delay={600}>
              <div className="mt-8">
                <img
                  src="/anglian/dashboard_alerts.jpg"
                  alt="Project conclusion summary showing key learnings and future opportunities"
                  className="w-full rounded-lg"
                />
              </div>
            </AnimateOnScroll> */}

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
                  title="AI as an ideation partner"
                  description="AI is great for generating and challenging ideas, especially through socractic methods. It's like another member of the team. That said, it can produce so many ideas to the point where we must avoid overwhelm and options paralysis. Moreover, relying solely on AI to solve our issues can cause us to feel disconnected to the problem space and solutions. To combat these, we can implement prompt refinement sessions to review the outputs of AI in the ideation phase. I also recommend people give problem-solving a go first, before turning to AI for help." 
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
                  title="AI democratises design"
                  description="AI tools like v0 and Lovable make design more accessible to a wider range of people. Gone are the days where you need to be an expert in Figma or coding to make a prototype. This is great for empowering non-designers to contribute to the design process, but it also means we need to be careful about how we ensure quality. I recommend setting clear guidelines and providing training on how to use these tools effectively, while also maintaining a human-centred approach. It also means that with AI, the emphasis shifts from mastery of specific tools to proficiency in the language of design."
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
                  title="Preserve the 'human-in-the-loop'"
                  description="Only human beings can be legally accountable for the actions of AI. I led discussions on ethical guardrails, goals, and fail-safes when prototyping autonomous assistants to gather ideas, and the general consensus is that AI should be used to augment human decision-making, not replace it. This is especially true in the public sector, where accountability is paramount. User interface components that support this notion include notifications, audit trails, change logs, decision gate diagrams and more."
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

