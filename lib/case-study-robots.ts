import type { Metadata } from "next"

/** Case study pages stay reachable by URL and on-site links, but should not appear in search results. */
export const caseStudyRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
}
