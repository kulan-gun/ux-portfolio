export interface ProcessStep {
  number: string | number
  title: string
  tasks: string[]
}

interface DesignProcessProps {
  steps: ProcessStep[]
}

export default function DesignProcess({ steps }: DesignProcessProps) {
  return (
    <div className="rounded-fui-lg bg-muted p-8 md:p-12 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            {/* Number Circle */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-medium text-primary-foreground md:text-2xl">{step.number}</span>
            </div>

            {/* Step Title */}
            <h3 className="text-lg md:text-xl font-normal text-foreground mb-4">{step.title}</h3>

            {/* Tasks List */}
            <ul className="space-y-3 text-left w-full">
              {step.tasks.map((task, index) => (
                <li key={index} className="text-muted-foreground text-sm md:text-base text-center">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

