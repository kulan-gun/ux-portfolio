interface SummarySection {
  title: string
  items: string[]
}

interface SummaryCardProps {
  sections: SummarySection[]
}

export default function SummaryCard({ sections }: SummaryCardProps) {
  return (
    <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="flex items-start gap-8 md:gap-16">
            <div className="w-32 md:w-40">
              <h3 className="text-xl md:text-2xl font-normal text-foreground">{section.title}</h3>
            </div>
            <div className="flex-1">
              <div className="h-0.5 w-12 bg-white mb-6 opacity-70" aria-hidden="true"></div>
              <ul className="space-y-4 text-muted-foreground">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="text-foreground" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

