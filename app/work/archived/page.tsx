"use client"

import CaseStudyPreview from "@/components/case-study-preview"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"
import { archivedProjects } from "@/lib/projects"

export default function ArchivePage() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background text-foreground font-sans">
      <TopNavigation />

      <main className="w-full min-w-0 px-4 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          <section className="space-y-12 min-w-0">
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                WORK
              </p>
              <h1 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Archive
              </h1>
              <p className="max-w-2xl font-sans text-body-m text-muted-foreground pt-2">
                Earlier projects retained for reference. Selected work lives under{" "}
                <a
                  href="/#work"
                  className="text-fui-primary hover:underline underline-offset-4"
                >
                  Projects on the home page
                </a>
                .
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 min-w-0">
              {archivedProjects.map((project, i) => (
                <div
                  key={project.href}
                  className="min-w-0 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${180 + i * 60}ms` }}
                >
                  <CaseStudyPreview
                    date={project.date}
                    client={project.client}
                    title={project.title}
                    subtitle={project.subtitle}
                    href={project.href}
                    imageSrc={project.imageSrc}
                    status={{ label: project.status }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
