import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Project archive",
  description: "Earlier product design and UX projects by Kulan Gunawardena.",
}

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children
}
