export type ProjectStatus = "Shipped" | "Concept" | "Archived"

export type Project = {
  id: string
  seq?: string
  date: string
  client: string
  role: string
  title: string
  subtitle: string
  href: string
  imageSrc: string
  imageAlt: string
  status: ProjectStatus
}

/** Selected work on the home page — newest first (PROJECT 03 → 01). */
export const selectedProjects: Project[] = [
  {
    id: "contentnext",
    seq: "03",
    date: "2025/26",
    client: "Autodesk",
    role: "Senior Experience Designer",
    title: "ContentNext",
    subtitle:
      "Making AI-generated Fusion content more usable and doubling the average quality score",
    href: "/case-studies/contentnext-case-study/",
    imageSrc: "/contentnext/cover.jpg",
    imageAlt: "ContentNext toolkit and Custom GPT configuration interfaces",
    status: "Shipped",
  },
  {
    id: "contactless-travel",
    seq: "02",
    date: "2024/25",
    client: "GOV.UK",
    role: "Senior UX Designer",
    title: "Digital immigration and contactless travel",
    subtitle:
      "Making digital immigration easier for 7M+ users, reducing offline support requests by 67%",
    href: "/case-studies/contactless-travel/",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trials2-min-152wrS8iv0dqCjFwiwsHTR5R7Mhdk7.jpeg",
    imageAlt: "Project hero image showing the contactless travel interface",
    status: "Shipped",
  },
  {
    id: "benefits",
    seq: "01",
    date: "2024",
    client: "GOV.UK",
    role: "Product Designer",
    title: "Improving access to benefits for those in need",
    subtitle:
      "Removing barriers to essential benefits, driving a 9.7pp increase in digital uptake",
    href: "/case-studies/benefits-case-study/",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwp-work1-YBcOjNYGrLjyFctNlf12YOF2Jeftgh.png",
    imageAlt: "Project hero image showing the benefits application interface",
    status: "Shipped",
  },
]

/** Older work listed on /work/archived/ — no project numbers. */
export const archivedProjects: Project[] = [
  {
    id: "aura",
    date: "2024/25",
    client: "Capgemini Invent",
    role: "UX Designer",
    title: "AURA",
    subtitle:
      "Accelerating policy document summarisation with human-centred AI, saving 60%+ time in testing",
    href: "/case-studies/ai-design/",
    imageSrc: "/ai-design/aura_min.jpeg",
    imageAlt: "Project hero image showing the AURA interface",
    status: "Archived",
  },
  {
    id: "crm",
    date: "2023",
    client: "Anglian Water",
    role: "Product Designer",
    title: "Customer relationship management",
    subtitle:
      "Simplifying agent workflows for water customers, cutting estimated task time by 40%",
    href: "/case-studies/crm-case-study/",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anglian3-min-Gg1yQETIOPvQr9fySm8O1i5tRZYm3U.jpeg",
    imageAlt: "Project hero image showing the CRM interface",
    status: "Archived",
  },
]

export function getProjectById(id: string): Project | undefined {
  return [...selectedProjects, ...archivedProjects].find((p) => p.id === id)
}
