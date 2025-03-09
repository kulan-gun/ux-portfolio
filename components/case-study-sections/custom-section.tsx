import type React from "react"
import AnimateOnScroll from "@/components/animate-on-scroll"

interface CustomSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

export default function CustomSection({ id, title, children }: CustomSectionProps) {
  return (
    <section id={id} className="min-h-screen py-8 sm:py-12" aria-labelledby={`${id}-heading`}>
      <AnimateOnScroll animation="bounce-up">
        <h2 id={`${id}-heading`} className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
          {title}
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={200}>
        {children}
      </AnimateOnScroll>
    </section>
  )
}

