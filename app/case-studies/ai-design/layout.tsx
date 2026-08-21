import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "AURA AI design case study",
  description: "Exploring AI-assisted policy document summarisation through user-centred design.",
}

export default function AuraCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
