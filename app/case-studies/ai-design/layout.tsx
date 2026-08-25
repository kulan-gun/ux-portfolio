import type { Metadata } from "next"
import type { ReactNode } from "react"
import { caseStudyRobots } from "@/lib/case-study-robots"

export const metadata: Metadata = {
  title: "AURA AI design case study",
  description: "Designing an AI-native policy summarisation prototype in a consulting lab, and sharing practice in AI tools across a wider design team.",
  robots: caseStudyRobots,
}

export default function AuraCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
