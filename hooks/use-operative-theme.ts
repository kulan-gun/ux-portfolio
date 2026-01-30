"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "operative-theme"
export type OperativeTheme = "dark" | "light"

function readTheme(): OperativeTheme {
  if (typeof window === "undefined") return "dark"
  const v = localStorage.getItem(STORAGE_KEY) as OperativeTheme | null
  if (v === "light" || v === "dark") return v
  return document.documentElement.classList.contains("light") ? "light" : "dark"
}

export function useOperativeTheme(): OperativeTheme {
  const [theme, setTheme] = useState<OperativeTheme>("dark")

  useEffect(() => {
    setTheme(readTheme())
    const check = () => setTheme(readTheme())
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  return theme
}
