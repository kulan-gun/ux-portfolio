"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

type TopNavigationProps = {
  onMobileMenuToggle?: (isOpen: boolean) => void
  backHref?: string
}

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "https://www.credly.com/users/kulan-gunawardena", label: "Credentials", external: true },
  { href: "https://www.linkedin.com/in/kulan-gun/", label: "LinkedIn", external: true },
  { href: "https://medium.com/@kulan.gun", label: "Articles", external: true },
]

export default function TopNavigation({ onMobileMenuToggle, backHref }: TopNavigationProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    const nextState = !isMenuOpen
    setIsMenuOpen(nextState)
    onMobileMenuToggle?.(nextState)
  }

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        onMobileMenuToggle?.(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isMenuOpen, onMobileMenuToggle])

  return (
    <header
      className={cn(
        "w-full min-w-0 overflow-x-hidden",
        "sticky top-0 z-40 border-b border-black/10 dark:border-white/10",
        "bg-sheet/95 dark:bg-void/95 backdrop-blur-sm"
      )}
    >
      <div className="md:hidden">
        <div className="flex h-14 items-center justify-between px-3">
          <div className="flex items-center gap-1">
            {backHref && (
              <Link
                href={backHref}
                className="inline-flex h-11 w-11 items-center justify-center rounded-fui text-foreground hover:bg-sidebar-accent hover:text-fui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">
                  {backHref === "/work/archived/" ? "Back to archive" : "Back to work"}
                </span>
              </Link>
            )}
            <HomeLink />
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-main-navigation"
              className="inline-flex min-h-11 items-center gap-2 rounded-fui px-2.5 text-sm font-medium text-foreground hover:bg-sidebar-accent hover:text-fui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
            >
              {isMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
              Menu
            </button>
          </div>
        </div>
        <nav
          id="mobile-main-navigation"
          className={cn("grid grid-cols-2 gap-1 border-t border-border p-3", !isMenuOpen && "hidden")}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => <NavigationLink key={link.label} {...link} />)}
        </nav>
      </div>

      <div className="hidden h-14 w-full min-w-0 items-center justify-between px-4 sm:px-6 md:flex lg:px-8">
        <HomeLink />
        <nav className="flex min-w-0 items-center gap-6 md:gap-8" aria-label="Main navigation">
          {navLinks.map((link) => <NavigationLink key={link.label} {...link} />)}
          <div>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

function HomeLink() {
  return (
    <Link
      href="/"
      className="flex items-center rounded-fui focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Home"
    >
      <div className="relative h-9 w-9 overflow-hidden rounded-fui border border-black/10 bg-sheet dark:border-white/10 dark:bg-surface">
        <Image src="/favicon.png" alt="" fill className="object-contain p-1" priority />
      </div>
    </Link>
  )
}

function NavigationLink({
  href,
  label,
  external,
}: {
  href: string
  label: string
  external?: boolean
}) {
  const linkClass = cn(
    "group inline-flex min-h-11 items-center gap-1 rounded-fui px-1 font-mono text-xs uppercase tracking-widest-fui text-fui-dim",
    "transition-colors duration-200 hover:text-fui-primary",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  )

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
      <ArrowUpRight
        className="h-3 w-3 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        strokeWidth={2}
        aria-hidden="true"
      />
    </a>
  ) : (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  )
}
