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
    <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            {/* Number Circle */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
              <span className="text-xl md:text-2xl font-medium text-white">{step.number}</span>
            </div>

            {/* Step Title */}
            <h3 className="text-lg md:text-xl font-normal text-white mb-4">{step.title}</h3>

            {/* Tasks List */}
            <ul className="space-y-3 text-left w-full">
              {step.tasks.map((task, index) => (
                <li key={index} className="text-gray-300 text-sm md:text-base text-center">
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

