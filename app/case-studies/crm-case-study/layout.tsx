import type { Metadata } from "next"
import type { ReactNode } from "react"
import { caseStudyRobots } from "@/lib/case-study-robots"

export const metadata: Metadata = {
  title: "Customer relationship management case study",
  description: "Simplifying customer-service workflows and reducing estimated task time.",
  robots: caseStudyRobots,
}

export default function CrmCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
