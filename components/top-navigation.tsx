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
          <Link href="/" className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline">
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
          </a>
          <a
            href="https://www.linkedin.com/in/kulan-gun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group"
            aria-label="LinkedIn (opens in new tab)"
          >
            LinkedIn
          </a>
          <a
            href="https://read.cv/kulan.gun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group"
            aria-label="CV (opens in new tab)"
          >
            CV
          </a>
        </nav>

      
      </div>
    </header>
  );
}
