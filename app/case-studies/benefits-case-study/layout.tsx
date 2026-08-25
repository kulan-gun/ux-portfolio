import type { Metadata } from "next"
import type { ReactNode } from "react"
import { caseStudyRobots } from "@/lib/case-study-robots"

export const metadata: Metadata = {
  title: "Benefits service case study",
  description: "Simplifying fit-note submissions and increasing digital uptake.",
  robots: caseStudyRobots,
}

export default function BenefitsCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
