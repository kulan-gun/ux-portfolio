import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "ContentNext case study",
  description: "An AI-native system for Autodesk Fusion UI content, with a measured quality change from 1.9 to 3.8 out of 5.",
}

export default function ContentNextLayout({ children }: { children: ReactNode }) {
  return children
}
