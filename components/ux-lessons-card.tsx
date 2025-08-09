import type React from "react"
interface UXLessonsCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function UXLessonsCard({ icon, title, description }: UXLessonsCardProps) {
  return (
    <div className="rounded-3xl bg-zinc-900/50 p-8 backdrop-blur-sm">
      <div className="flex flex-col space-y-4">
        <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-xl font-normal text-white">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

