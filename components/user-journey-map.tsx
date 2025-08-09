export default function UserJourneyMap() {
  return (
    <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center"
            aria-hidden="true"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-normal text-white">Persona</h3>
            <p className="text-gray-300">
              Meet Sarah, a customer service agent at Anglian Water. She handles 40+ customer inquiries daily using
              their legacy CRM system. Frustrated by slow loading times, confusing navigation, and repetitive data
              entry, she often needs to use workarounds to complete basic tasks. Sarah wants a more intuitive system
              that helps her serve customers efficiently without the technical headaches.
            </p>
          </div>
        </div>
      </div>

      {/* Journey Stages */}
      <div className="grid grid-cols-4 gap-4 mb-8" role="region" aria-label="User journey stages">
        <div className="text-center">
          <h4 className="text-xl font-normal text-white mb-4">Customer Contact</h4>
          <p className="text-sm text-gray-300">
            Sarah receives a customer call about their billing inquiry and needs to access their account.
          </p>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-normal text-white mb-4">Information Lookup</h4>
          <p className="text-sm text-gray-300">
            Navigates through multiple screens to find the customer's account details and payment history.
          </p>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-normal text-white mb-4">Process Request</h4>
          <p className="text-sm text-gray-300">
            Updates account information or processes payment arrangements while dealing with system lag.
          </p>
        </div>
        <div className="text-center">
          <h4 className="text-xl font-normal text-white mb-4">Resolution</h4>
          <p className="text-sm text-gray-300">
            Completes the transaction and documents the interaction, often needing to use multiple systems to finish.
          </p>
        </div>
      </div>

      {/* Emotion Line */}
      <div
        className="relative h-40 mb-8"
        aria-label="User emotion journey graph showing fluctuating satisfaction levels"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 800 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path d="M0,20 Q100,0 200,60 T400,80 T600,40 T800,90" stroke="white" strokeWidth="3" fill="none" />
          <circle cx="0" cy="20" r="8" fill="#2DD4BF" />
          <circle cx="200" cy="60" r="8" fill="#2DD4BF" />
          <circle cx="400" cy="80" r="8" fill="#2DD4BF" />
          <circle cx="800" cy="90" r="8" fill="#2DD4BF" />
        </svg>
      </div>

      {/* Quotes */}
      <div className="grid grid-cols-4 gap-4" aria-label="User quotes at different journey stages">
        <div className="text-center">
          <p className="text-sm text-gray-300">"Let me try to find your account..."</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">"The system is running slow today."</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">"I'll need to open another application for this."</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">"Thanks for your patience with our system."</p>
        </div>
      </div>
    </div>
  )
}

