export default function SystemDiagram() {
  return (
    <div className="rounded-3xl bg-muted p-8 md:p-12 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        {/* TV Section */}
        <div className="relative mb-16">
          <div className="w-64 h-40 bg-gray-200 rounded-lg" aria-hidden="true"></div>
          <div className="w-24 h-2 bg-gray-600 mx-auto mt-1" aria-hidden="true"></div>
          <div className="w-12 h-6 bg-gray-600 mx-auto" aria-hidden="true"></div>

          {/* TV Label */}
          <div className="absolute right-[-180px] top-[20px] flex items-center">
            <div className="w-24 h-px bg-gray-500" aria-hidden="true"></div>
            <div className="ml-4 text-foreground">
              <p>TV playing common</p>
              <p>stream</p>
            </div>
          </div>
        </div>

        {/* AR Headsets Section */}
        <div className="flex justify-center gap-32 mt-8" aria-label="AR headset interaction diagram">
          {/* Left Headset */}
          <div className="relative">
            <div className="w-24 h-24 bg-gray-400 rounded-full" aria-hidden="true"></div>
            <div className="w-16 h-8 bg-gray-300 absolute top-0 left-4 rounded-t-lg" aria-hidden="true"></div>
            <div
              className="w-8 h-16 bg-gray-300 absolute top-4 right-[-8px] rounded-r-lg transform rotate-45"
              aria-hidden="true"
            ></div>

            {/* User Gesture Label */}
            <div className="absolute left-[-180px] top-[10px] flex items-center">
              <div className="text-foreground mr-4">User gesture input</div>
              <div className="w-24 h-px bg-gray-500" aria-hidden="true"></div>
            </div>
          </div>

          {/* Right Headset */}
          <div className="relative">
            <div className="w-24 h-24 bg-gray-400 rounded-full" aria-hidden="true"></div>
            <div className="w-16 h-8 bg-gray-300 absolute top-0 left-4 rounded-t-lg" aria-hidden="true"></div>
            <div
              className="w-8 h-16 bg-gray-300 absolute top-4 left-[-8px] rounded-l-lg transform -rotate-45"
              aria-hidden="true"
            ></div>

            {/* AR Headset Label */}
            <div className="absolute right-[-140px] top-[10px] flex items-center">
              <div className="w-24 h-px bg-gray-500" aria-hidden="true"></div>
              <div className="ml-4 text-foreground">AR Headset</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

