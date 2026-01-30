"use client"

import { cn } from "@/lib/utils"

export type Status = "LIVE" | "PROTOTYPE" | "CONCEPT" | "SHIPPED" | "ARCHIVED"

const statusConfig: Record<Status, { label: string; className: string }> = {
  LIVE: {
    label: "LIVE",
    className:
      "border-fui-primary/60 text-fui-primary bg-fui-primary/5 dark:border-fui-primary/60 dark:text-fui-primary dark:bg-fui-primary/5",
  },
  PROTOTYPE: {
    label: "PROTOTYPE",
    className:
      "border-fui-blue/60 text-fui-blue bg-fui-blue/5 dark:border-fui-blue/60 dark:text-fui-blue dark:bg-fui-blue/5",
  },
  CONCEPT: {
    label: "CONCEPT",
    className:
      "border-amber-500/60 text-amber-600 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/5 dark:border-amber-400/60",
  },
  SHIPPED: {
    label: "SHIPPED",
    className:
      "border-fui-primary/60 text-fui-primary bg-fui-primary/5 dark:border-fui-primary/60 dark:text-fui-primary dark:bg-fui-primary/5",
  },
  ARCHIVED: {
    label: "ARCHIVED",
    className:
      "border-fui-dim/50 text-fui-dim bg-transparent dark:border-white/20 dark:text-fui-dim",
  },
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: statusClassName } = statusConfig[status] ?? statusConfig.ARCHIVED
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[10px] sm:text-xs tracking-widest-fui uppercase px-2 py-0.5 border rounded-fui",
        statusClassName,
        className
      )}
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  )
}
