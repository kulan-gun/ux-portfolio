"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*"

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface DecryptedTextProps {
  text: string
  className?: string
  /** When this value changes, the animation replays (e.g. hover count) */
  trigger?: number
  /** Character reveal interval in ms – lower = faster */
  revealInterval?: number
  /** Cycles of random chars before each character settles – lower = faster */
  scrambleCycles?: number
}

export default function DecryptedText({
  text,
  className,
  trigger = 0,
  revealInterval = 25,
  scrambleCycles = 4,
}: DecryptedTextProps) {
  const [displayChars, setDisplayChars] = useState<string[]>(text.split(""))
  const [isRevealed, setIsRevealed] = useState(true)
  const triggerRef = useRef(0)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const runAnimation = useCallback(() => {
    const chars = text.split("")
    setIsRevealed(false)

    timeoutRefs.current.forEach(clearTimeout)
    timeoutRefs.current = []

    setDisplayChars(chars.map((c) => (c === " " ? " " : randomChar())))

    chars.forEach((char, index) => {
      const revealDelay = index * revealInterval
      const scrambleInterval = 20
      let cycle = 0
      const scrambleTimer = setInterval(() => {
        cycle++
        setDisplayChars((prev) => {
          const next = [...prev]
          if (index < next.length && char !== " ") {
            next[index] = randomChar()
          }
          return next
        })
        if (cycle >= scrambleCycles) clearInterval(scrambleTimer)
      }, scrambleInterval)

      const settleTimer = setTimeout(() => {
        clearInterval(scrambleTimer)
        setDisplayChars((prev) => {
          const next = [...prev]
          if (index < next.length) next[index] = char
          return next
        })
        if (index === chars.length - 1) setIsRevealed(true)
      }, revealDelay + scrambleCycles * scrambleInterval)

      timeoutRefs.current.push(settleTimer)
    })
  }, [text, revealInterval, scrambleCycles])

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (trigger > 0 && trigger !== triggerRef.current && !prefersReducedMotion) {
      triggerRef.current = trigger
      runAnimation()
    }
    return () => timeoutRefs.current.forEach(clearTimeout)
  }, [trigger, runAnimation])

  const isScrambling = trigger > 0 && !isRevealed
  const content = displayChars.join("")

  return (
    <>
      <span
        className={cn("inline-block whitespace-pre-wrap", className)}
        aria-hidden={isScrambling}
      >
        {content.split("").map((char, i) => (
          <span
            key={`${trigger}-${i}`}
            className={cn(
              "inline",
              isScrambling && char !== " " && "text-muted-foreground/90 dark:text-muted-foreground/90"
            )}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      {isScrambling && <span className="sr-only">{text}</span>}
    </>
  )
}
