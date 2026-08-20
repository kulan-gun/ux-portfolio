"use client"

import { useEffect, useState, useRef } from "react"
import CaseStudyPreview from "@/components/case-study-preview"
import Footer from "@/components/footer"
import HeroSparticles from "@/components/hero-sparticles"
import TopNavigation from "@/components/top-navigation"
import { selectedProjects } from "@/lib/projects"

const TAGLINE = "Optimising the experience of trust-critical systems."

export default function HomePage() {
  const [displayText, setDisplayText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const update = () => setTime(formatter.format(new Date()))
    update()
    const align = 1000 - new Date().getMilliseconds()
    let timer = window.setTimeout(function tick() {
      update()
      timer = window.setTimeout(tick, 1000)
    }, align)
    return () => clearTimeout(timer)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(TAGLINE)
      setTypingDone(true)
      return
    }

    let i = 0
    const speed = 36
    const timer = window.setInterval(() => {
      i += 1
      setDisplayText(TAGLINE.slice(0, i))
      if (i >= TAGLINE.length) {
        window.clearInterval(timer)
        setTypingDone(true)
      }
    }, speed)

    return () => window.clearInterval(timer)
  }, [mounted])

  return (
    <div className="home-page min-h-screen w-full min-w-0 overflow-x-hidden bg-background text-foreground font-sans">
      <TopNavigation />

      <section
        ref={heroRef}
        className="relative min-h-[85vh] w-full min-w-0 flex flex-col justify-center px-4 sm:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20 overflow-x-hidden"
      >
        <HeroSparticles />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/50 to-background" aria-hidden="true" />

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col">
          <div className="space-y-6 min-w-0">
            <p
              className="font-mono text-xs sm:text-sm tracking-widest-fui uppercase text-fui-dim animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "0ms" }}
            >
              Senior Experience Designer · Autodesk
            </p>
            <h1
              className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "80ms" }}
            >
              Kulan Gunawardena
            </h1>
            <p
              className="max-w-2xl font-sans text-body-m text-muted-foreground flex items-center gap-1 min-h-[1.25rem] animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "160ms" }}
              aria-live="polite"
            >
              <span>{displayText || "\u200B"}</span>
              {!typingDone ? (
                <span
                  className="inline-block w-0.5 h-4 bg-fui-primary shrink-0 animate-cursor-blink"
                  aria-hidden="true"
                />
              ) : null}
            </p>
          </div>

          {mounted && (
            <div
              className="font-mono text-xs tracking-widest-fui uppercase text-fui-dim text-right self-end mt-12 sm:mt-16"
              aria-hidden="true"
            >
              <div>London, UK</div>
              <div>{time}</div>
            </div>
          )}
        </div>
      </section>

      <main className="w-full min-w-0 px-4 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          <section id="work" className="space-y-12 min-w-0">
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                SELECTED WORK
              </p>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Projects
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 min-w-0">
              {selectedProjects.map((project, i) => (
                <div
                  key={project.href}
                  className="min-w-0 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${180 + i * 60}ms` }}
                >
                  <CaseStudyPreview
                    seq={project.seq}
                    date={project.date}
                    client={project.client}
                    title={project.title}
                    subtitle={project.subtitle}
                    href={project.href}
                    imageSrc={project.imageSrc}
                    status={{ label: project.status }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
