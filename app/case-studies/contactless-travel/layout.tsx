import type { Metadata } from "next"
import type { ReactNode } from "react"
import CaseStudyGate from "@/components/case-study-gate"
import { caseStudyRobots } from "@/lib/case-study-robots"
import { gatedPages } from "@/lib/page-access"

export const metadata: Metadata = {
  title: "Digital identity and contactless travel case study",
  description: "Making digital immigration easier for more than seven million users.",
  robots: caseStudyRobots,
}

export default function ContactlessTravelLayout({ children }: { children: ReactNode }) {
  return <CaseStudyGate page={gatedPages.homeOffice}>{children}</CaseStudyGate>
}
