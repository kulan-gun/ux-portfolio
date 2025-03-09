export default function KnownsUnknownsDiagram() {
  return (
    <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
      <div className="space-y-12">
        {/* Knowns Section */}
        <div className="flex items-start gap-8 md:gap-16">
          <div className="w-32 md:w-40">
            <h3 className="text-xl md:text-2xl font-normal text-white">Knowns</h3>
          </div>
          <div className="flex-1">
            <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Setting: Home/Residential + multiple simultaneous users</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Objective: View varying levels of information without interrupting current stream</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Known medium: TV</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Solution type: Companion app for TV, that adds needed functionality</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Unknowns Section */}
        <div className="flex items-start gap-8 md:gap-16">
          <div className="w-32 md:w-40">
            <h3 className="text-xl md:text-2xl font-normal text-white">Unknowns</h3>
          </div>
          <div className="flex-1">
            <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Peripherals & Interaction medium</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Variable Section */}
        <div className="flex items-start gap-8 md:gap-16">
          <div className="w-32 md:w-40">
            <h3 className="text-xl md:text-2xl font-normal text-white">Variable</h3>
          </div>
          <div className="flex-1">
            <div className="h-0.5 w-12 bg-white mb-6 opacity-70"></div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="text-white">•</span>
                <span>Additional Information users want presented</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

