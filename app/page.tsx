"use client"

import { useEffect, useState, useRef } from "react"
import CaseStudyPreview from "@/components/case-study-preview"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"

// Reverse chronological: newest at top (04), oldest at bottom (01)
const missions = [
  {
    seq: "04",
    date: "2024/25",
    client: "GOV.UK",
    title: "Designing the future of contactless travel",
    href: "/case-studies/contactless-travel/",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trials2-min-152wrS8iv0dqCjFwiwsHTR5R7Mhdk7.jpeg",
    status: { label: "Shipped" as const },
  },
  {
    seq: "03",
    date: "2024/25",
    client: "Capgemini Invent",
    title: "Leading human-centred design, empowered by AI",
    href: "/case-studies/ai-design/",
    imageSrc: "/ai-design/aura_min.jpeg",
    status: { label: "Concept" as const },
  },
  {
    seq: "02",
    date: "2024",
    client: "GOV.UK",
    title: "Improving access to benefits for citizens in medical need",
    href: "/case-studies/benefits-case-study/",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwp-work1-YBcOjNYGrLjyFctNlf12YOF2Jeftgh.png",
    status: { label: "Shipped" as const },
  },
  {
    seq: "01",
    date: "2023",
    client: "Anglian Water",
    title: "Transforming customer relationship management",
    href: "/case-studies/crm-case-study/",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anglian3-min-Gg1yQETIOPvQr9fySm8O1i5tRZYm3U.jpeg",
    status: { label: "Shipped" as const },
  },
]

const sysLines = [
  "AI PRODUCT DESIGNER...",
  "TECHNICAL PROTOTYPER...",
  "SYSTEMS THINKER...",
]

export default function HomePage() {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(90)
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
    const current = sysLines[lineIndex]
    if (!isDeleting && displayText === current) {
      const t = setTimeout(() => setIsDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setLineIndex((i) => (i + 1) % sysLines.length)
      setTypingSpeed(400)
      return
    }
    const t = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
      setTypingSpeed(isDeleting ? 35 : 90)
    }, typingSpeed)
    return () => clearTimeout(t)
  }, [mounted, displayText, isDeleting, lineIndex, typingSpeed])

  return (
    <div className="home-page min-h-screen w-full min-w-0 overflow-x-hidden bg-background text-foreground font-sans">
      <TopNavigation />

      <section
        ref={heroRef}
        className="relative min-h-[85vh] w-full min-w-0 flex flex-col justify-center px-4 sm:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20 overflow-x-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" aria-hidden="true" />

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
              className="max-w-2xl font-sans text-body-m text-muted-foreground animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "160ms" }}
            >
              Optimising the experience of trust-critical systems.
            </p>
            <div
              className="font-mono text-sm tracking-widest-fui text-foreground dark:text-white flex items-center gap-2 min-h-5 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "320ms" }}
              aria-live="polite"
            >
              <span className="uppercase min-w-0 tabular-nums">
                {displayText || "\u200B"}
              </span>
              <span
                className="inline-block w-0.5 h-4 bg-fui-primary shrink-0 animate-cursor-blink"
                aria-hidden="true"
              />
            </div>
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
                Mission Logs
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 min-w-0">
              {missions.map((m, i) => (
                <div
                  key={m.href}
                  className="min-w-0 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${180 + i * 60}ms` }}
                >
                  <CaseStudyPreview
                    seq={m.seq}
                    date={m.date}
                    client={m.client}
                    title={m.title}
                    href={m.href}
                    imageSrc={m.imageSrc}
                    status={m.status}
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
