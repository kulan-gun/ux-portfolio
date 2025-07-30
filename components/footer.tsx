import Link from "next/link"

export default function Footer() {
  return (
    <footer
      className="border-t border-gray-800 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(18, 18, 18, 0.8)" }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:gap-16 mb-12">
          {/* Main Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">MAIN</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/work"
                  className="text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:underline"
                >
                  Work
                </Link>
              </li>
              <li>
                <a
                  href="https://medium.com/@kulan.gun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors flex items-center group focus:outline-none focus:underline"
                  aria-label="Articles (opens in new tab)"
                >
                  Articles
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
              {/* <li>
                <Link
                  href="/info"
                  className="text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:underline"
                >
                  Info
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">CONTACT</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/kulan-gun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors flex items-center group focus:outline-none focus:underline"
                  aria-label="LinkedIn (opens in new tab)"
                >
                  LinkedIn
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © 2025 Kulan Gunawardena. Built with React & TypeScript. Always a work in progress.
          </p>
        </div>
      </div>
    </footer>
  )
}

