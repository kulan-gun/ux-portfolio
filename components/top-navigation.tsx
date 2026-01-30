"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

type TopNavigationProps = {
  onMobileMenuToggle?: (isOpen: boolean) => void
}

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "https://www.credly.com/users/kulan-gunawardena", label: "Credentials", external: true },
  { href: "https://www.linkedin.com/in/kulan-gun/", label: "LinkedIn", external: true },
  { href: "https://medium.com/@kulan.gun", label: "Articles", external: true },
]

export default function TopNavigation({ onMobileMenuToggle: _ }: TopNavigationProps = {}) {
  return (
    <header
      className={cn(
        "md:sticky md:top-0 z-40 border-b border-black/10 dark:border-white/10",
        "bg-sheet/95 dark:bg-void/95 backdrop-blur-sm"
      )}
    >
      <div className="flex flex-col md:flex-row md:h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-0 gap-3 md:gap-0">
        <Link
          href="/"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-fui"
          aria-label="Home"
        >
          <div className="w-9 h-9 relative overflow-hidden rounded-fui border border-black/10 dark:border-white/10 bg-sheet dark:bg-surface">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-b07vLZDfIhbE0cTGGIba8vBcMMU4UB.png"
              alt=""
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </Link>

        <div className="flex justify-center md:hidden">
          <ThemeToggle />
        </div>

        <nav className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-items-center sm:justify-items-stretch gap-3 sm:gap-6 md:gap-8" aria-label="Main navigation">
          {navLinks.map(({ href, label, external }) => {
            const linkClass = cn(
              "font-mono text-xs tracking-widest-fui uppercase text-fui-dim",
              "hover:text-fui-primary dark:hover:text-fui-primary hover:tracking-wider-fui transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-fui",
              "inline-flex items-center gap-1"
            )
            return external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {label}
                <ArrowUpRight className="w-3 h-3 shrink-0" strokeWidth={2} />
              </a>
            ) : (
              <Link key={label} href={href} className={linkClass}>
                {label}
              </Link>
            )
          })}

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
