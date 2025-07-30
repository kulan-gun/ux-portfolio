"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type TopNavigationProps = {
  onMobileMenuToggle?: (isOpen: boolean) => void;
};

export default function TopNavigation({ onMobileMenuToggle }: TopNavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <header
      className={`${isMobile ? "relative" : "md:sticky"} top-0 z-40 border-b border-gray-800 backdrop-blur-sm`}
      style={{ backgroundColor: "rgba(18, 18, 18, 0.8)" }}
    >
      <div className="flex flex-col md:flex-row md:h-16 items-center justify-between px-4 sm:px-8 py-3 md:py-0">
        <div className="flex justify-center w-full md:w-auto md:justify-start mb-3 md:mb-0">
          <Link href="/" className="flex items-center" aria-label="Home">
            <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-white">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-b07vLZDfIhbE0cTGGIba8vBcMMU4UB.png"
                alt="KG Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
          </Link>
        </div>

        <nav className="flex items-center space-x-6" aria-label="Main navigation">
          <Link href="https://kulangun.com" className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline">
            Work
          </Link>

          <a
            href="https://www.credly.com/users/kulan-gunawardena"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group"
            aria-label="Credentials (opens in new tab)"
          >
            Credentials
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

          <a
            href="https://www.linkedin.com/in/kulan-gun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group"
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

          <a
            href="https://medium.com/@kulan.gun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group"
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
        </nav>



      </div>
    </header>
  );
}
