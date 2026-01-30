import type React from "react"
interface UXLessonsCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function UXLessonsCard({ icon, title, description }: UXLessonsCardProps) {
  return (
    <div className="rounded-3xl bg-muted p-8 backdrop-blur-sm">
      <div className="flex flex-col space-y-4">
        <div className="h-12 w-12 rounded-full bg-muted/80 flex items-center justify-center" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-xl font-normal text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

