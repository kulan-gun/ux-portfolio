"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "operative-theme"
type Theme = "dark" | "light"

function getTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const v = localStorage.getItem(STORAGE_KEY) as Theme | null
  return v === "light" || v === "dark" ? v : "dark"
}

function setThemeClass(t: Theme) {
  if (typeof document === "undefined") return
  const el = document.documentElement
  el.classList.remove("light", "dark")
  el.classList.add(t)
  try {
    localStorage.setItem(STORAGE_KEY, t)
  } catch (_) { /* ignore */ }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme(getTheme())
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setThemeClass(next)
    setTheme(next)
  }

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "p-2 rounded-fui border border-black/10 dark:border-white/10",
        "text-fui-dim hover:text-fui-primary dark:hover:text-fui-primary hover:border-fui-primary/40",
        "transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
