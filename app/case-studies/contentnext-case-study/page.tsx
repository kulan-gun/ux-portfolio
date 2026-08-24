"use client"

import { useState, useEffect } from "react"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TopNavigation from "@/components/top-navigation"
import BackToTopButton from "@/components/back-to-top-button"
import Footer from "@/components/footer"
import CaseStudyMetric from "@/components/case-study-metric"
import CaseStudyHeader, { CaseStudyBackLink } from "@/components/case-study-header"
import MobileTableOfContents from "@/components/mobile-table-of-contents"
import ImageModal from "@/components/ImageModal"
import { getProjectById } from "@/lib/projects"
import { motionSafeScrollBehavior } from "@/lib/accessibility"

const project = getProjectById("contentnext")!

const sections = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "process", title: "Process" },
  { id: "solution", title: "Solution" },
  { id: "measurement", title: "Measurement" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
]

function SystemWorkflow() {
  const steps = [
    {
      title: "Open ContentNext",
      detail: "ContentNext works within tools users already use: ChatGPT and Cursor. A user starts in the ContentNext Custom GPT or Cursor toolkit and describes the UI content they need (e.g. tooltip, warning, error, or dialog).",
    },
    {
      title: "ContentNext gathers the missing context",
      detail: "Guided questions collect the product details a draft typically needs, rather than leaving those gaps to a one-line prompt.",
    },
    {
      title: "Weave standards are applied automatically",
      detail: "Inside ContentNext, knowledge files and MCP servers pull rules from Weave, Autodesk's design system, so the draft follows Fusion content patterns.",
    },
    {
      title: "Review and ship the draft",
      detail: "The team edits the ContentNext draft where they already are, then ships it. They never leave the initiative for a separate content tool.",
    },
  ]

  return (
    <figure>
      <figcaption className="mb-6">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          WHAT CONTENTNEXT DOES
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          From a UI content need to a draft that follows Weave standards
        </span>
      </figcaption>
      <ImagePlaceholder
        label="ContentNext visualised"
        src="/contentnext/what_contentnext_does.png"
        alt="ContentNext GPT and Cursor toolkit helping users write in-product content for Autodesk Fusion"
        caption="People use ContentNext through a Custom GPT or a Cursor toolkit to write content for Autodesk Fusion."
        className="mb-10"
      />
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="mb-4 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base sm:text-lg font-medium text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

const CONTENTNEXT_IMAGE_FALLBACK = "/contentnext/image-placeholder-large.jpg"

function ImagePlaceholder({
  label,
  caption,
  src,
  alt,
  captionId,
  className = "mt-10",
}: {
  label: string
  caption: string
  /** Drop the file in `public/contentnext/` and set this path, e.g. `/contentnext/miro.png`. */
  src?: string
  alt?: string
  captionId?: string
  aspectClassName?: string
  className?: string
}) {
  const id = captionId ?? `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-caption`
  const [activeSrc, setActiveSrc] = useState(CONTENTNEXT_IMAGE_FALLBACK)

  useEffect(() => {
    const requested = src?.trim()
    if (!requested) {
      setActiveSrc(CONTENTNEXT_IMAGE_FALLBACK)
      return
    }

    let cancelled = false
    const probe = new window.Image()
    probe.onload = () => {
      if (!cancelled) setActiveSrc(requested)
    }
    probe.onerror = () => {
      if (!cancelled) setActiveSrc(CONTENTNEXT_IMAGE_FALLBACK)
    }
    probe.src = requested

    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <figure className={className}>
      <ImageModal src={activeSrc} alt={alt ?? caption} aria-describedby={id} />
      <figcaption id={id} className="case-study-caption">
        <span className="mb-1 block font-mono text-xs tracking-widest-fui uppercase text-fui-dim">{label}</span>
        {caption}
      </figcaption>
    </figure>
  )
}

function VideoPlaceholder({
  label,
  caption,
  src = "/contentnext/app_prototype.mp4",
  captionId,
  className = "mt-10",
}: {
  label: string
  caption: string
  src?: string
  captionId?: string
  className?: string
}) {
  const id = captionId ?? `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-caption`
  const [failed, setFailed] = useState(false)

  return (
    <figure className={className}>
      {failed ? (
        <img src={CONTENTNEXT_IMAGE_FALLBACK} alt="" className="block w-full rounded-xl" />
      ) : (
        <video
          className="block w-full rounded-xl"
          controls
          playsInline
          preload="auto"
          src={`${src}#t=0.1`}
          onError={() => setFailed(true)}
        />
      )}
      <figcaption id={id} className="case-study-caption">
        <span className="mb-1 block font-mono text-xs tracking-widest-fui uppercase text-fui-dim">{label}</span>
        {caption}
      </figcaption>
    </figure>
  )
}

function MetricsDashboard() {
  return (
    <figure>
      <ImageModal
        src="/contentnext/final_metrics_dashboard.png"
        alt="ContentNext metrics dashboard with adoption at 29 of 51 workstreams, 100% of respondents reporting faster creation, and average quality at 3.8 out of 5, up from 1.9"
        aria-describedby="contentnext-dashboard-caption"
      />
      <figcaption id="contentnext-dashboard-caption" className="case-study-caption">
      The monthly dashboard I designed to run ContentNext as a DesignOps practice. It tracks adoption, productivity, and quality in one place.
      </figcaption>
    </figure>
  )
}

function ReadabilityComparison() {
  const comparisons = [
    { label: "Guided input", value: "−2.86 grades", width: "95%", accent: true },
    { label: "Free text", value: "−1.88 grades", width: "63%", accent: false },
  ]

  return (
    <figure className="mt-10 border-y border-black/10 dark:border-white/10 py-8">
      <figcaption className="mb-7">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          AWS TOOLKIT APP
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          Guided fields compared with free text
        </span>
        <span className="mt-2 block text-sm text-muted-foreground">
          Tested on the AWS toolkit app before it was retired. Guided fields produced a larger Flesch-Kincaid drop than
          free text. They also asked more of the user, and the app still needed specialist skills to host and maintain.
          Supporting evidence from that first arc, not a result from the Cursor toolkit.
        </span>
      </figcaption>
      <div className="space-y-6">
        {comparisons.map((comparison) => (
          <div key={comparison.label} className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)_7rem] sm:items-center sm:gap-5">
            <span className="text-sm font-medium text-foreground">{comparison.label}</span>
            <div className="h-2 bg-muted" aria-hidden="true">
              <div
                className={`h-full ${comparison.accent ? "bg-fui-primary" : "bg-muted-foreground/40"}`}
                style={{ width: comparison.width }}
              />
            </div>
            <span className="font-mono text-xs tracking-wider-fui text-muted-foreground sm:text-right">
              {comparison.value}
            </span>
          </div>
        ))}
      </div>
    </figure>
  )
}

function OnboardingFriction() {
  const findings = [
    ["01", "Authentication", "VPN, SSO, and personal access tokens were the hardest first step.", "N=6"],
    ["02", "Git and CLI setup", "Technical setup assumed Terminal and Git knowledge many people did not have.", "N=5"],
    ["03", "Hard-to-find docs", "Wiki pages felt like a lot, with duplicates and little sense of what was current.", "N=4"],
    ["04", "Stale MCP servers", "MCP servers dropped when Cursor was not updated, then reported a false admin-rights error.", "N=4"],
  ]

  return (
    <figure className="mt-10">
      <figcaption className="mb-6">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          AUTONOMOUS USER RESEARCH · N=6 participants
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          Usability testing of the ContentNext onboarding experience
        </span>
        <span className="mt-2 block text-sm text-muted-foreground">
          I planned, conducted, and synthesised this research independently. Six moderated sessions, focused on the
          Cursor toolkit, with ContentNext GPT as a lighter path, plus the documentation around both. Findings went
          onto a Miro board, then into the recommendations below.
        </span>
      </figcaption>
      <ImagePlaceholder
        label="Miro board"
        src="/contentnext/aug_ur.png"
        alt="Miro board of August 2026 ContentNext user research observations, from sticky-note synthesis to insight slides"
        caption="Miro board used to synthesise the onboarding research into insights and recommendations."
        className="mb-8"
      />
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-4">
        {findings.map(([number, title, detail, count]) => (
          <li
            key={number}
            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
              {number}
            </span>
            <h4 className="mt-3 text-base sm:text-lg font-medium text-foreground">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
            <p className="mt-4 font-mono text-xs tracking-wider-fui text-fui-dim">{count}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

function OnboardingRecommendations() {
  const actions = [
    ["01", "Be honest about setup", "Tell people to connect to VPN first, and that SSO retries sit outside the team. Give clearer help for personal access tokens, cloning, Terminal, and Git."],
    ["02", "Surface docs at the point of need", "The videos already exist; they were buried. Put them in the toolkit path, and tidy duplicate wiki pages so people can tell what is current."],
    ["03", "Explain how MCP servers work", "Knowledge files and MCP servers only help if people know to check them. Name that Cursor must be kept updated or those MCP servers drop."],
    ["04", "Finish retiring the old app", "The AWS URL still resolved with no notice, which caused tool confusion. Redirect it, and always share the exact GPT or docs link."],
    ["05", "Reduce the first five minutes in Cursor", "The onboarding canvas was unclear or broken, and an out-of-date model prompt felt like a quiz. Prompt only when the model is actually wrong."],
    ["06", "Meet people in their own repos", "Most participants prototype outside fusion-360. Explore a plug-and-play path that keeps Fusion context without forcing a full-repo scan."],
  ]

  return (
    <figure className="mt-10">
      <figcaption className="mb-6">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          RECOMMENDATIONS
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          Insights that informed what to change next
        </span>
      </figcaption>
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
        {actions.map(([number, title, detail]) => (
          <li
            key={number}
            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-l md:px-8 md:odd:border-l-0 md:odd:pl-0 md:even:pr-0 md:[&:nth-child(-n+2)]:border-t-0"
          >
            <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
              {number}
            </span>
            <h4 className="mt-3 text-base sm:text-lg font-medium text-foreground">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

function QualityRubric() {
  const levels = [
    ["1", "Unusable", "The content cannot be used due to poor quality. It needs a full rewrite."],
    ["2", "Significant rework needed", "Usable intent, but multiple compliance or clarity issues."],
    ["3", "Acceptable, with edits", "Sound content, but needs structural or style edits to comply."],
    ["4", "Strong, near publish-ready", "Clear and compliant; only light polish required."],
    ["5", "Publish-ready", "Meets Weave and editorial standards as written. No edits needed."],
  ]

  return (
    <figure>
      <figcaption className="sr-only">Content quality rubric from 1, unusable, to 5, publish-ready</figcaption>
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-5">
        {levels.map(([score, title, detail]) => (
          <li
            key={score}
            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-5 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className={`font-mono text-xs tracking-widest-fui ${score === "4" || score === "5" ? "text-fui-primary" : "text-fui-dim"}`}>
              {score}
            </span>
            <h4 className="mt-3 text-base font-medium text-foreground">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

function QualityDistribution() {
  const baseline = [
    { score: "1", pct: 55.8 },
    { score: "2", pct: 18.6 },
    { score: "3", pct: 11.6 },
    { score: "4", pct: 11.6 },
    { score: "5", pct: 2.3 },
  ]
  const current = [
    { score: "1", pct: 0 },
    { score: "2", pct: 6.25 },
    { score: "3", pct: 18.75 },
    { score: "4", pct: 62.5 },
    { score: "5", pct: 12.5 },
  ]

  const BarRow = ({
    label,
    average,
    n,
    data,
  }: {
    label: string
    average: string
    n: string
    data: { score: string; pct: number }[]
  }) => (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-base sm:text-lg font-medium text-foreground">{label}</h4>
        <p className="font-mono text-xs tracking-wider-fui text-muted-foreground">
          {average} · n={n}
        </p>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.score} className="grid grid-cols-[1.5rem_minmax(0,1fr)_3.5rem] items-center gap-3">
            <span className="font-mono text-xs text-fui-dim">{item.score}</span>
            <div className="h-2 bg-muted" aria-hidden="true">
              <div
                className={`h-full ${item.score === "4" || item.score === "5" ? "bg-fui-primary" : "bg-muted-foreground/45"}`}
                style={{ width: `${Math.max(item.pct, item.pct === 0 ? 0 : 2)}%` }}
              />
            </div>
            <span className="text-right font-mono text-xs text-muted-foreground">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <figure className="mt-10 border-y border-black/10 dark:border-white/10 py-8">
      <figcaption className="mb-8">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          LIKE-FOR-LIKE COMPARISON
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          Later samples clustered higher on the same rubric
        </span>
      </figcaption>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <BarRow label="Baseline" average="1.9 / 5" n="43" data={baseline} />
        <BarRow label="ContentNext" average="3.8 / 5" n="16" data={current} />
      </div>
    </figure>
  )
}

function HardGateDiagram() {
  return (
    <figure className="mt-10">
      <figcaption className="sr-only">Two-step scoring: pass Weave hard rules first, then score 3 to 5</figcaption>
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
        <li className="py-8 md:pr-8">
          <span className="font-mono text-xs tracking-widest-fui text-fui-primary">01</span>
          <h4 className="mt-3 text-lg font-medium text-foreground">Hard-rule gate</h4>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Pass or fail on explicit rules in Weave, Autodesk's design system, first. A broken tooltip, missing recovery step, or unmatched title caps the score at 1 or 2.
          </p>
        </li>
        <li className="border-t border-black/10 dark:border-white/10 py-8 md:border-l md:border-t-0 md:pl-8">
          <span className="font-mono text-xs tracking-widest-fui text-fui-primary">02</span>
          <h4 className="mt-3 text-lg font-medium text-foreground">Nuanced score</h4>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Scores of 3 to 5 are only available if every gate passes. The same rubric was used on the baseline and on ContentNext output.
          </p>
        </li>
      </ol>
    </figure>
  )
}

function ProcessArcs() {
  const arcs = [
    {
      status: "Go or no-go?",
      title: "AWS-hosted app",
      detail:
        "The first surface was a toolkit app for drafting Fusion UI content. The Cursor model already existed for writing help documentation, but Enterprise ChatGPT was emerging as a lightweight alternative. The questions were whether the app was worth keeping, and what its unique selling point was.",
    },
    {
      status: "Establishing the product",
      title: "GPT, Cursor, and DesignOps",
      detail:
        "I built a GPT as part of an experiment, but it ended up being the new lightweight tool that replaced the app. ContentNext now runs through a Custom GPT and a Cursor toolkit with MCP servers. Autonomous user research on people's onboarding experiences with these surfaces came later.",
    },
  ]

  return (
    <figure>
      <figcaption className="mb-6">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          TWO ARCS
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          From experimentation to a usable product
        </span>
      </figcaption>
      <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
        {arcs.map((arc) => (
          <article
            key={arc.title}
            className="flex flex-col border-t border-black/10 dark:border-white/10 py-8 first:border-t-0 md:border-t-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs tracking-widest-fui text-fui-primary">{arc.status}</span>
            <h3 className="mt-3 text-xl font-medium text-foreground">{arc.title}</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{arc.detail}</p>
          </article>
        ))}
      </div>
    </figure>
  )
}

function DeliveryRouteDiagram() {
  const routes = [
    {
      status: "SHIPPED",
      title: "Custom GPT",
      detail: "Everyday drafting surface. Less setup than Cursor, and no extra hosting.",
      signal: "Everyday drafting",
    },
    {
      status: "INTEGRATED",
      title: "Cursor toolkit",
      detail: "Used when the draft needs to land in the Fusion codebase, with live Weave, Figma and Wiki context at the point of creation.",
      signal: "Production pathway",
    },
    {
      status: "SUNSET",
      title: "AWS toolkit app",
      detail: "Retired after the go/no-go. Similar reading level to the GPT, with higher interaction cost and hosting overhead.",
      signal: "Retired after comparison",
    },
  ]

  return (
    <figure>
      <figcaption className="sr-only">ContentNext production routes</figcaption>
      <div className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-3">
        {routes.map((route, index) => (
          <article
            key={route.title}
            className="flex flex-col border-t border-black/10 dark:border-white/10 py-8 first:border-t-0 md:border-t-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs tracking-widest-fui text-fui-primary">{route.status}</span>
            <h3 className="mt-3 text-xl font-medium text-foreground">{route.title}</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{route.detail}</p>
            <div className="mt-auto pt-6">
              <p className="border-t border-black/10 dark:border-white/10 pt-3 font-mono text-xs tracking-wider-fui text-fui-dim">
                {String(index + 1).padStart(2, "0")} · {route.signal}
              </p>
            </div>
          </article>
        ))}
      </div>
    </figure>
  )
}

function OperatingModel() {
  const parts = [
    ["01", "Productivity survey", "A short monthly form asks whether ContentNext made content creation faster, and captures qualitative notes the dashboard can show."],
    ["02", "Quality review", "A sample of output is scored on the same 1-to-5 Weave rubric used for the baseline, so the quality number stays like-for-like."],
    ["03", "Adoption tracking", "Workstreams are counted as using ContentNext or not, then grouped by engagement model, so coverage is visible without a census of every file."],
    ["04", "Dashboard refresh", "The three-pillar view is updated from those inputs. The operating model can be inherited without its author."],
  ]

  return (
    <figure className="mt-10">
      <figcaption className="mb-6">
        <span className="mb-2 block font-mono text-xs tracking-widest-fui text-fui-primary">
          MONTHLY OPERATING MODEL
        </span>
        <span className="text-xl sm:text-2xl font-medium text-foreground">
          How metrics are gathered on an ongoing basis
        </span>
      </figcaption>
      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-4">
        {parts.map(([number, title, detail]) => (
          <li
            key={number}
            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
              {number}
            </span>
            <h4 className="mt-3 text-base sm:text-lg font-medium text-foreground">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

const lessons = [
  {
    title: "Bespoke tools face lifecycle risk",
    description:
      "In enterprise settings, a custom internal app can be outpaced by licensed platform tools. Putting the work in tools people already used was the bet here; later adoption sat at 29 of 51 workstreams.",
  },
  {
    title: "Prompt engineering is product design",
    description:
      "Output quality depended on rules, examples, constraints, and maintainable knowledge structures as much as on the model. Designing those systems was part of the product work.",
  },
  {
    title: "Proxy testing can still move the work",
    description:
      "When formal research capacity is constrained, structured proxy testing can still produce findings you can act on, as long as the limits are explicit and follow-up measurement is planned.",
  },
  {
    title: "Measurement outlives the tool",
    description:
      "What remained after the AWS app was retired was a quality rubric, a baseline, and a monthly operating model other people can run. That was the practice to share, not a one-off app.",
  },
]

export default function ContentNextCaseStudyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })

      if (currentSection) setActiveSection(currentSection.id)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false)
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [sidebarOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: motionSafeScrollBehavior(),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <ScrollProgressIndicator />
      <TopNavigation backHref="/#work" />

      <div className="flex flex-1 min-h-0">
        {!isMobile && (
          <aside
            id="section-nav"
            className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:sticky md:top-16 md:block md:self-start md:pt-16"
            aria-label="Section navigation"
          >
            <CaseStudyBackLink />

            <nav className="px-6 text-muted-foreground" aria-label="Table of contents">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={`group flex w-full cursor-pointer items-center rounded-fui py-2 pr-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary ${activeSection === section.id ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60"}`}
                      onClick={() => scrollToSection(section.id)}
                      aria-current={activeSection === section.id ? "location" : undefined}
                    >
                      <div
                        className={`mr-3 h-5 w-0.5 transition-colors duration-200 ${activeSection === section.id ? "bg-primary" : "bg-transparent group-hover:bg-primary/50"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-sm transition-colors duration-200 ${activeSection === section.id ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                      >
                        {section.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        <div className={`flex-1 min-w-0 flex flex-col ${isMobile ? "w-full" : ""}`}>
          <main id="main-content" className={`flex-1 px-4 py-8 sm:px-8 md:py-12 ${isMobile ? "w-full" : ""}`}>
            <div className="max-w-6xl mx-auto">
              <CaseStudyHeader
                project={project}
                mobileNavigation={<MobileTableOfContents sections={sections} />}
              />

              <section id="overview" className="py-8 sm:py-12" aria-labelledby="overview-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="overview-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Overview
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    ContentNext is an AI-native DesignOps initiative for Autodesk Fusion, a CAD/CAM product sold as SaaS. ContentNext helps internal teams write in-product UI content that follows Autodesk's Weave design system.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <div className="mb-12">
                    <SystemWorkflow />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="problem" className="py-8 sm:py-12" aria-labelledby="problem-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="problem-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Problem
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    There were not enough content designers to support every team, and hiring more was not an option. The business had set out that AI should be able to close that gap.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <aside className="mb-8 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="User need">
                      <p className="mb-2 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                        User need
                      </p>
                      <p className="text-lg leading-relaxed text-foreground">
                        As a user, I need to independently write in-product UI content that follows Weave guidelines, sometimes late into the build cycle.
                      </p>
                    </aside>
                    <figure>
                      <figcaption className="sr-only">ContentNext content-design delivery bottleneck</figcaption>
                      <ol className="grid border-y border-black/10 dark:border-white/10 md:grid-cols-4">
                        {[
                          ["01", "Late copy need", "UI content was often requested near the end of build cycles."],
                          ["02", "Scattered guidance", "Weave rules, Autodesk's design system, lived across documentation, Confluence, and expert knowledge."],
                          ["03", "Inconsistent AI drafts", "Ad-hoc prompts produced uneven structure, tone, and compliance."],
                          ["04", "Capacity, not headcount", "Too few content designers to support every team. Hiring more was off the table; leadership expected AI to close the gap."],
                        ].map(([number, title, detail]) => (
                          <li
                            key={number}
                            className="border-t border-black/10 dark:border-white/10 py-6 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
                          >
                            <span className="font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                              {number}
                            </span>
                            <h3 className="mt-3 text-base sm:text-lg font-medium text-foreground">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                          </li>
                        ))}
                      </ol>
                    </figure>
                    <aside className="mt-8 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Design opportunity">
                      <p className="mb-2 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                        Design opportunity
                      </p>
                      <p className="text-lg leading-relaxed text-foreground">
                      Empower engineers and experience designers to create Weave-compliant UI content themselves using AI, reducing their reliance on central content design support and avoiding delays.
                      </p>
                    </aside>
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="process" className="py-8 sm:py-12" aria-labelledby="process-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="process-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Process
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <div className="mb-8">
                    <ProcessArcs />
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <div className="mt-8 mb-12">
                    <h3 className="mb-2 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                      Arc 1 · Experimentation on the AWS toolkit app
                    </h3>
                    <p className="mb-6 max-w-3xl text-sm sm:text-base text-muted-foreground">
                      The first ContentNext surface was a hosted AWS app for drafting in-product UI content.
                    </p>
                    <VideoPlaceholder
                      label="AWS toolkit before guided input"
                      src="/contentnext/aws_as-is.mp4"
                      caption="The hosted toolkit as it stood before guided fields: an open-text, chat-style drafting surface."
                    />
                    <ImagePlaceholder
                      label="Prompt refinement framework"
                      src="/contentnext/toolkit_prompt_refinement.png"
                      alt="Figma canvas of the Content Design Toolkit showing versioned system prompts, stress tests, and storyboards used to refine the AWS toolkit"
                      caption="Prompt refinement framework for the AWS toolkit. System prompts were versioned, stress-tested, and compared with a Taguchi-style experiment so multiple factors could be judged together rather than tweaked one at a time."
                    />
                    <ImagePlaceholder
                      label="AWS toolkit prototypes"
                      src="/contentnext/toolkit_prototypes.png"
                      alt="AWS toolkit prototypes showing the chat interface, guided input fields, and a scored draft with readability and word-count comparison"
                      caption="Prototypes of the AWS toolkit: chat with an open text box, guided input fields, and a scored draft. Same backend, two input methods."
                    />
                    <VideoPlaceholder
                      label="AWS toolkit walkthrough"
                      src="/contentnext/app_prototype.mp4"
                      caption="Walkthrough of the AWS toolkit: chat and guided input on the same backend."
                    />
                    <ImagePlaceholder
                      label="Prompt comparison sheet"
                      src="/contentnext/testing_sheet.png"
                      alt="Excel sheet comparing output quality from 40 prompts tested on the AWS toolkit and ContentNext GPT"
                      caption="I led a comparison of 40 prompts on the AWS toolkit and ContentNext GPT, scoring output quality for publishability."
                    />
                    <ol className="mt-10 border-y border-black/10 dark:border-white/10">
                      <li className="grid gap-4 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                        <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                          01
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-foreground mb-3">Establishing the baseline</h4>
                          <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                            I encoded rules from Weave, Autodesk's design system, into a modular prompt architecture. Then I
                            built a 1-to-5 rubric so outputs could be scored and compared the same way.
                          </p>
                        </div>
                      </li>
                      <li className="grid gap-4 border-t border-black/10 dark:border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                        <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                          02
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-foreground mb-3">Comparing input methods</h4>
                          <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                            On the AWS toolkit app, I held the backend and prompts constant, then compared guided fields
                            with free text. The question was whether the change would alter quality enough to justify
                            keeping the app. I also compared those outputs with the ContentNext GPT.
                          </p>
                        </div>
                      </li>
                      <li className="grid gap-4 border-t border-black/10 dark:border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                        <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                          03
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-foreground mb-3">Retiring the AWS app</h4>
                          <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                            Guided fields produced more readable content than free text. They also asked more of the
                            user. Hosting, maintenance, and specialist skills still cost more than the ContentNext GPT, which
                            reached a similarly low reading level without that overhead. That comparison was the rationale
                            for sunsetting the app, which I shared with content leads and leadership.
                          </p>
                        </div>
                      </li>
                    </ol>
                    <ReadabilityComparison />
                  </div>

                  <div className="mt-16 mb-12">
                    <h3 className="mb-2 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                      Arc 2 · GPT, Cursor, and DesignOps
                    </h3>
                    <p className="mb-6 max-w-3xl text-sm sm:text-base text-muted-foreground">
                      After the AWS app was gone, ContentNext ran as an AI and DesignOps system: a Custom GPT, a Cursor
                      toolkit wired up with MCP servers, knowledge files, documentation, and a monthly operating model.
                      Onboarding research came months later.
                    </p>
                    <ImagePlaceholder
                      label="GPT and Cursor models"
                      src="/contentnext/gpt-cursor-prototypes.png"
                      alt="ContentNext Custom GPT and Cursor toolkit models"
                      caption="ContentNext Custom GPT and Cursor toolkit models."
                    />
                    <ol className="mt-10 border-y border-black/10 dark:border-white/10">
                      <li className="grid gap-4 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                        <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                          04
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-foreground mb-3">Shipping GPT and Cursor</h4>
                          <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                            ContentNext GPT became the lower-overhead drafting route: readable, low grade-level output
                            without a specialist-built form or hosting bill. The Cursor toolkit connected knowledge files
                            and MCP servers so generated content could follow live Weave rules in the Fusion codebase.
                          </p>
                        </div>
                      </li>
                      <li className="grid gap-4 border-t border-black/10 dark:border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                        <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                          05
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-foreground mb-3">Running it as DesignOps</h4>
                          <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                            I set up a monthly operating model: adoption tracking, a productivity survey, quality review,
                            and a dashboard refresh, plus the documentation and supporting materials around the tools.
                            The point was to share a practice other people could run, not to leave the system dependent
                            on its author.
                          </p>
                        </div>
                      </li>
                      <li className="grid gap-4 border-t border-black/10 dark:border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
                        <span className="font-mono text-sm tracking-widest-fui text-fui-primary" aria-hidden="true">
                          06
                        </span>
                        <div>
                          <h4 className="text-xl font-medium text-foreground mb-3">Testing onboarding</h4>
                          <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
                            Months after the AWS toolkit was retired, I planned, conducted, and synthesised autonomous
                            user research with six experience designers and content designers. The sessions focused on
                            the Cursor toolkit, with ContentNext GPT as a lighter path, plus the documentation around
                            both. Sentiment was optimistic; setup friction was high. Findings are directional.
                          </p>
                        </div>
                      </li>
                    </ol>
                    <OnboardingFriction />
                    <OnboardingRecommendations />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="solution" className="py-8 sm:py-12" aria-labelledby="solution-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="solution-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Solution
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <div className="mb-8 max-w-3xl space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    <p>
                      ContentNext is in production. Teams have used it to publish UI content into Autodesk Fusion itself
                      and onto the Fusion Help website, not only into internal drafts. The Custom GPT and Cursor toolkit
                      are the two live surfaces.
                    </p>
                    <p>
                      I built the GPT and shaped the Cursor toolkit's prompt architecture and knowledge base. I also created the onboarding materials and output-scoring system.
                    </p>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <DeliveryRouteDiagram />
                    <VideoPlaceholder
                      label="ContentNext GPT"
                      src="/contentnext/gpt_test.mp4"
                      caption="A short walkthrough of example prompts showing how the GPT works. Markdown and JSON files handle conversations; external connections supply extra context."
                    />
                    <ImagePlaceholder
                      label="Published in Fusion"
                      src="/contentnext/gpt_and_published_copy.png"
                      alt="Real example of ContentNext-generated content published in Autodesk Fusion"
                      caption="Real example of ContentNext-generated content used in Fusion."
                    />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="measurement" className="py-8 sm:py-12" aria-labelledby="measurement-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="measurement-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Measurement
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <div className="mb-8 max-w-3xl space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    <p>
                      There was no reliable "before" number for Fusion UI content, so I built a way to create one. The
                      rubric scores 1 to 5 against rules in Weave, Autodesk's design system.
                    </p>
                    {/* <p>
                      Product documentation was excluded from the headline score because templates and gated checks give
                      it a structurally higher baseline. Including it would have made the starting point look stronger
                      than the UI-content work actually was.
                    </p> */}
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={350}>
                  <div className="mt-8 mb-12">
                    <QualityRubric />
                    <HardGateDiagram />
                    <QualityDistribution />
                    <ImagePlaceholder
                      label="Dashboard early drafts"
                      src="/contentnext/dashboard_mockups.png"
                      alt="Miro board of ContentNext metrics dashboard drafts, from paper sketches to high-fidelity mockups of the adoption, productivity, and quality pillars"
                      caption="Early drafts of the three-pillar metrics dashboard."
                    />
                    <div className="mt-10">
                      <MetricsDashboard />
                    </div>
                    <OperatingModel />
                  </div>
                </AnimateOnScroll>
              </section>

              <section id="results" className="pt-8 sm:pt-12 pb-6 sm:pb-8" aria-labelledby="results-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="results-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Results
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-muted-foreground">
                    Quality moved from 1.9 to 3.8 on a like-for-like rubric, twenty-nine workstreams are using the
                    system, and respondents report faster content creation.
                  </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={300}>
                  <div className="mt-8 mb-8">
                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3" role="group" aria-label="Headline outcome metrics">
                      <CaseStudyMetric label="Quality" value="3.8/5" note="Up from 1.9 / 5, same strict rubric" trend="up" compact />
                      <CaseStudyMetric label="Adoption" value="29/51" note="Workstreams engaged" trend="up" compact />
                      <CaseStudyMetric label="Productivity" value="100%" note="n=5" compact />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2" role="group" aria-label="Supporting outcome metrics">
                      <CaseStudyMetric label="Readability grade drop" value="-4.67" note="From the prompt architecture and Markdown/JSON knowledge files" compact />
                      <CaseStudyMetric label="Production overhead" value="0" note="Additional AWS hosting and DevOps costs" compact />
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={450}>
                  <aside className="mt-10 mb-8 max-w-4xl border-l-2 border-fui-primary py-1 pl-5 sm:pl-7" aria-label="Reading the results">
                    <p className="mb-3 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                      Reading the results
                    </p>
                    <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      <p>
                        The quality comparison is a two-sample cohort, not matched items, which is the standard approach
                        here and remains directional. Productivity is self-reported from a small sample. The baseline was
                        opportunistic rather than randomised, and product documentation was excluded by design.
                      </p>
                      <p>
                        On the retired AWS toolkit app, guided fields produced a larger readability drop than free text
                        in most categories. The largest drop was in warnings: an average 4.67-grade-level change on the
                        Flesch-Kincaid scale, toward a target of grade 7 to 8. That change came with higher interaction
                        cost, plus hosting and specialist maintenance. The ContentNext GPT reached a similarly low
                        reading level without that overhead.
                      </p>
                    </div>
                  </aside>
                </AnimateOnScroll>
              </section>

              <section id="conclusion" className="pt-8 sm:pt-12 pb-4" aria-labelledby="conclusion-heading">
                <AnimateOnScroll animation="bounce-up">
                  <h2 id="conclusion-heading" className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-display">
                    Conclusion
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={200}>
                  <div className="mb-8 max-w-3xl space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    <p>
                      The work suggested that output reliability depended more on structure (prompts, knowledge files,
                      and a shared rubric) than on swapping AI models.
                    </p>
                    <p>
                      Onboarding research later showed that setup friction
                      could still block people even when sample quality had improved.
                    </p>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={400}>
                  <ol className="mt-12 mb-12 grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
                    {lessons.map((lesson, index) => (
                      <li
                        key={lesson.title}
                        className={`py-8 ${
                          index % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8"
                        } ${index > 1 ? "border-t border-black/10 dark:border-white/10" : ""} ${
                          index === 1 ? "border-t border-black/10 dark:border-white/10 md:border-t-0" : ""
                        }`}
                      >
                        <span className="mb-4 block font-mono text-xs tracking-widest-fui text-fui-primary" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="mb-3 text-xl font-medium text-foreground">{lesson.title}</h3>
                          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {lesson.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </AnimateOnScroll>
              </section>
            </div>
          </main>

          <BackToTopButton />
        </div>
      </div>

      <Footer />
    </div>
  )
}
