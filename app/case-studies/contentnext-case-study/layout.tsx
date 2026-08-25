import type { Metadata } from "next"
import type { ReactNode } from "react"
import CaseStudyGate from "@/components/case-study-gate"
import { caseStudyRobots } from "@/lib/case-study-robots"
import { gatedPages } from "@/lib/page-access"

export const metadata: Metadata = {
  title: "ContentNext case study",
  robots: caseStudyRobots,
}

export default function ContentNextLayout({ children }: { children: ReactNode }) {
  return <CaseStudyGate page={gatedPages.contentnext}>{children}</CaseStudyGate>
}
