"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const mainLinks = [
  { href: "/#work", label: "Work", external: false },
  { href: "https://medium.com/@kulan.gun", label: "Articles", external: true },
]

const contactLinks = [
  { href: "https://www.linkedin.com/in/kulan-gun/", label: "LinkedIn", external: true },
]

export default function Footer() {
  return (
    <footer
      className={cn(
        "w-full min-w-0 overflow-x-hidden",
        "border-t border-black/10 dark:border-white/10",
        "bg-sheet dark:bg-void"
      )}
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl w-full min-w-0 px-4 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:gap-16 mb-12">
          <div>
            <h3 className="font-mono text-xs tracking-widest-fui uppercase font-bold text-foreground mb-4">
              Main
            </h3>
            <ul className="space-y-3">
              {mainLinks.map(({ href, label, external }) => {
                const Wrapper = external ? "a" : Link
                const props = external
                  ? { href, target: "_blank", rel: "noopener noreferrer" }
                  : { href }
                return (
                  <li key={label}>
                    <Wrapper
                      {...props}
                      className={cn(
                        "group font-mono text-xs tracking-widest-fui uppercase text-fui-dim",
                        "hover:text-fui-primary dark:hover:text-fui-primary transition-colors",
                        "inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-fui"
                      )}
                    >
                      {label}
                      {external && (
                        <ArrowUpRight
                          className="w-3 h-3 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                          strokeWidth={2}
                        />
                      )}
                    </Wrapper>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-widest-fui uppercase font-bold text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group font-mono text-xs tracking-widest-fui uppercase text-fui-dim",
                      "hover:text-fui-primary dark:hover:text-fui-primary transition-colors",
                      "inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-fui"
                    )}
                  >
                    {label}
                    <ArrowUpRight
                      className="w-3 h-3 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 dark:border-white/10">
          <p className="font-sans text-xs text-muted-foreground">
            © 2026 Kulan Gunawardena. Built with Next.js, React & TypeScript. Always a work in progress.
          </p>
        </div>
      </div>
    </footer>
  )
}
