import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Digital immigration and contactless travel case study",
  description: "Making digital immigration easier for more than seven million users.",
}

export default function ContactlessTravelLayout({ children }: { children: ReactNode }) {
  return children
}
