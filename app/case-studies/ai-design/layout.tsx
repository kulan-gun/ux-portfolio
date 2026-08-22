import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "AURA AI design case study",
  description: "Designing an AI-native policy summarisation prototype in a consulting lab, and sharing practice in AI tools across a wider design team.",
}

export default function AuraCaseStudyLayout({ children }: { children: ReactNode }) {
  return children
}
