import type React from "react"
interface TagBadgeProps {
  color?: string
  children: React.ReactNode
  hasBackground?: boolean
}

export default function TagBadge({ color, children, hasBackground = false }: TagBadgeProps) {
  return (
    <div className="inline-flex rounded-full bg-muted px-3 py-1 sm:px-4 sm:py-1.5">
      <div className="flex items-center gap-2">
        {hasBackground && color && <div className={`h-2 w-2 rounded-full ${color}`} />}
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{children}</span>
      </div>
    </div>
  )
}

