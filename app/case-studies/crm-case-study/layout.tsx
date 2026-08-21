import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Customer relationship management case study",
  description: "Simplifying customer-service workflows and reducing estimated task time.",
}

export default function CrmCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
