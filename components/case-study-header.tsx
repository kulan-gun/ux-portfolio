import Link from "next/link"
import type { ReactNode } from "react"
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
  mobileNavigation?: ReactNode
}

export function CaseStudyHeaderTags({ project }: { project: Project }) {
  return (
    <dl
      className="mb-6 grid grid-cols-2 border-y border-border sm:mb-8 lg:grid-cols-4"
      aria-label="Project details"
    >
      <div className="py-4 pr-3 sm:pr-6">
        <dt className="font-machine text-fui-dim">Role</dt>
        <dd className="mt-1.5 text-sm text-foreground">{project.role}</dd>
      </div>
      <div className="border-l border-border py-4 pl-3 sm:pl-6">
        <dt className="font-machine text-fui-dim">Date</dt>
        <dd className="mt-1.5 text-sm text-foreground">{project.date}</dd>
      </div>
      <div className="border-t border-border py-4 pr-3 sm:pr-6 lg:border-l lg:border-t-0 lg:pl-6">
        <dt className="font-machine text-fui-dim">{project.organisationLabel ?? "Client"}</dt>
        <dd className="mt-1.5 text-sm text-foreground">{project.client}</dd>
      </div>
      <div className="border-l border-t border-border py-4 pl-3 sm:pl-6 lg:border-t-0">
        <dt className="font-machine text-fui-dim">Status</dt>
        <dd className="mt-1.5 flex items-center gap-2 text-sm text-foreground">
          <span className={`h-2 w-2 rounded-full ${statusDotClass[project.status]}`} aria-hidden="true" />
          <span>
            {project.status}
          </span>
        </dd>
      </div>
    </dl>
  )
}

export function CaseStudyTitleBlock({ project }: { project: Project }) {
  return (
    <div className="mb-6 sm:mb-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display mb-3 sm:mb-4">
        {project.title}
      </h1>
      <p className="max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground font-sans">
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
        className="w-full rounded-xl"
      />
    </div>
  )
}

/** Shared tags + title/subtitle + hero image for case study pages. */
export default function CaseStudyHeader({
  project,
  mobileNavigation,
}: Pick<CaseStudyHeaderProps, "project" | "mobileNavigation">) {
  return (
    <div>
      <div className="md:hidden">
        <CaseStudyTitleBlock project={project} />
        <CaseStudyHeaderTags project={project} />
        {mobileNavigation}
      </div>
      <div className="hidden md:block">
        <CaseStudyHeaderTags project={project} />
        <CaseStudyTitleBlock project={project} />
      </div>
      <CaseStudyHeroImage project={project} />
    </div>
  )
}

export function CaseStudyBackLink({
  href = "/#work",
  label,
  compact = false,
}: {
  href?: string
  label?: string
  compact?: boolean
}) {
  const resolvedLabel = label ?? (href === "/work/archived/" ? "Back to archive" : "Back to work")

  return (
    <div className={compact ? "mb-8" : "mb-6 px-6 pt-8"}>
      <Link
        href={href}
        className="inline-flex min-h-11 items-center gap-2 rounded-fui border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-fui-primary/50 hover:bg-sidebar-accent hover:text-fui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>{resolvedLabel}</span>
      </Link>
    </div>
  )
}
