"use client"

import { FormEvent, ReactNode, useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"
import { type GatedPage, hashPagePassword, hashesMatch } from "@/lib/page-access"

export default function CaseStudyGate({
  page,
  children,
}: {
  page: GatedPage
  children: ReactNode
}) {
  const [ready, setReady] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(page.sessionKey)
    if (stored && hashesMatch(stored, page.hash)) {
      setUnlocked(true)
    }
    setReady(true)
  }, [page.hash, page.sessionKey])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setChecking(true)

    try {
      const hash = await hashPagePassword(page.salt, password)
      if (!hashesMatch(hash, page.hash)) {
        setError("That password does not match.")
        return
      }
      sessionStorage.setItem(page.sessionKey, hash)
      setUnlocked(true)
    } catch {
      setError("Could not check the password. Try again.")
    } finally {
      setChecking(false)
    }
  }

  if (!ready) {
    return <div className="min-h-screen bg-background" />
  }

  if (unlocked) {
    return children
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <TopNavigation />
      <main id="main-content" className="flex flex-1 flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <p className="mb-3 font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
            {page.kicker}
          </p>
          <h1 className="mb-3 text-2xl sm:text-3xl font-display">{page.title}</h1>
          <p className="mb-8 text-sm sm:text-base text-muted-foreground">
            This case study is password protected. Enter the password to continue.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="case-study-password" className="mb-2 block font-mono text-xs tracking-widest-fui uppercase text-fui-dim">
                Password
              </label>
              <div className="relative">
                <input
                  id="case-study-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-fui border border-border bg-background py-2.5 pl-3 pr-12 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 inline-flex min-w-11 items-center justify-center text-fui-dim hover:text-fui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button
              type="submit"
              disabled={checking || password.length === 0}
              className="inline-flex min-h-11 items-center rounded-fui bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {checking ? "Checking…" : "Continue"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
