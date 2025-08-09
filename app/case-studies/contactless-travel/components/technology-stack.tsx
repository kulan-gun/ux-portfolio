export default function TechnologyStack() {
  return (
    <div className="rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-zinc-800/50 rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-zinc-700 rounded-full">
            <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L20 8.00004V16L12 20L4 16V8.00004L12 4Z" stroke="currentColor" strokeWidth="2" />
              <path d="M12 4V20" stroke="currentColor" strokeWidth="2" />
              <path d="M4 8.00004L20 16" stroke="currentColor" strokeWidth="2" />
              <path d="M20 8.00004L4 16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-normal text-white mb-2">Frontend</h3>
          <ul className="text-gray-300 space-y-2">
            <li>React Native</li>
            <li>TypeScript</li>
            <li>Redux</li>
            <li>Styled Components</li>
          </ul>
        </div>

        <div className="text-center p-6 bg-zinc-800/50 rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-zinc-700 rounded-full">
            <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-xl font-normal text-white mb-2">Backend</h3>
          <ul className="text-gray-300 space-y-2">
            <li>Node.js</li>
            <li>Express</li>
            <li>GraphQL</li>
            <li>MongoDB</li>
          </ul>
        </div>

        <div className="text-center p-6 bg-zinc-800/50 rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-zinc-700 rounded-full">
            <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.4 15C19.1277 15.8031 19.2583 16.6718 19.7601 17.37C20.2619 18.0281 21.0755 18.4186 21.9 18.42C21.9726 18.42 22.0451 18.42 22.1177 18.42C22.1177 18.42 22.2 18.42 22.2 18.42C22.2 17.5955 21.8095 16.7819 21.1514 16.2801C20.4932 15.7783 19.6245 15.6477 18.8214 15.92"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7.9 7.68C8.17234 6.87689 8.04176 6.00806 7.53993 5.30997C7.03811 4.61189 6.22447 4.22144 5.4 4.22C5.32744 4.22 5.25488 4.22 5.18233 4.22C5.18233 4.22 5.1 4.22 5.1 4.22C5.1 5.04447 5.49045 5.85811 6.18853 6.35993C6.88661 6.86176 7.75544 6.99234 8.55856 6.72"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7.9 16.32C8.17234 17.1231 8.04176 17.9919 7.53993 18.69C7.03811 19.3881 6.22447 19.7786 5.4 19.78C5.32744 19.78 5.25488 19.78 5.18233 19.78C5.18233 19.78 5.1 19.78 5.1 19.78C5.1 18.9555 5.49045 18.1419 6.18853 17.6401C6.88661 17.1382 7.75544 17.0077 8.55856 17.28"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.4 8.68C19.1277 7.87689 19.2583 7.00806 19.7601 6.30997C20.2619 5.61189 21.0755 5.22144 21.9 5.22C21.9726 5.22 22.0451 5.22 22.1177 5.22C22.1177 5.22 22.2 5.22 22.2 5.22C22.2 6.04447 21.8095 6.85811 21.1514 7.35993C20.4932 7.86176 19.6245 7.99234 18.8214 7.72"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-normal text-white mb-2">DevOps</h3>
          <ul className="text-gray-300 space-y-2">
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>AWS</li>
            <li>CI/CD Pipeline</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

