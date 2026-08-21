import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "ContentNext case study",
  description: "Improving AI-generated UI content quality for Autodesk Fusion.",
}

export default function ContentNextLayout({ children }: { children: ReactNode }) {
  return children
}
