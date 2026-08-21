import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Benefits service case study",
  description: "Simplifying fit-note submissions and increasing digital uptake.",
}

export default function BenefitsCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
