import Link from "next/link"
import type { Project, ProjectStatus } from "@/lib/projects"

const statusDotClass: Record<ProjectStatus, string> = {
  Shipped: "bg-green-500",
  Concept: "bg-pink-500",
  Archived: "bg-fui-dim",
}

type CaseStudyHeaderProps = {
  project: Project
  /** Where the Back control should go. Archived studies link to Archive. */
  backHref?: string
  backLabel?: string
}

export function CaseStudyHeaderTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 pt-8 mb-6" aria-label="Project tags">
      <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          {project.role}
        </span>
      </div>
      <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          {project.date}
        </span>
      </div>
      <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          {project.client}
        </span>
      </div>
      <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${statusDotClass[project.status]}`} />
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            {project.status}
          </span>
        </div>
      </div>
    </div>
  )
}

export function CaseStudyTitleBlock({ project }: { project: Project }) {
  return (
    <div className="mb-8 sm:mb-12">
      <h1 id="case-study-title" className="text-3xl sm:text-4xl md:text-5xl font-display mb-3 sm:mb-4">
        {project.title}
      </h1>
      <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-muted-foreground font-sans">
        {project.subtitle}
      </p>
    </div>
  )
}

export function CaseStudyHeroImage({ project }: { project: Project }) {
  return (
    <div className="mb-12 sm:mb-16">
      <img
        src={project.imageSrc}
        alt={project.imageAlt}
        className="w-full rounded-2xl"
      />
    </div>
  )
}

/** Shared tags + title/subtitle + hero image for case study pages. */
export default function CaseStudyHeader({
  project,
}: Pick<CaseStudyHeaderProps, "project">) {
  return (
    <div>
      <CaseStudyHeaderTags project={project} />
      <CaseStudyTitleBlock project={project} />
      <CaseStudyHeroImage project={project} />
    </div>
  )
}

export function CaseStudyBackLink({
  href = "/",
  label = "Back",
}: {
  href?: string
  label?: string
}) {
  return (
    <div className="pl-8 mb-6 pt-8">
      <Link
        href={href}
        className="inline-flex items-center px-4 pr-5 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-fui-primary focus:ring-opacity-50"
        aria-label={href === "/work/archived/" ? "Go back to Archive" : "Go back to home page"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mr-1.5"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>{label}</span>
      </Link>
    </div>
  )
}
