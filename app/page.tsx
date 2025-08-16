"use client"

import { useEffect, useState, useRef } from "react"
import CaseStudyPreview from "@/components/case-study-preview"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"

export default function HomePage() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(105) // Increased typing speed by 30%
  const [showTyping, setShowTyping] = useState(false)
  const phrases = ["I'm a Product Designer...", "I'm a UX Lead...", "I'm an Engineer...", "I'm an AI Innovator..."]
  const currentPhraseIndex = loopNum % phrases.length
  const currentPhrase = phrases[currentPhraseIndex]
  const heroRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState("")

  const renderWave = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="wave-span"
        style={{ animationDelay: `${i * 0.05}s` }}
        aria-hidden="true"
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  // Clock updater: always Europe/London, aligned to the second
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })

    const update = () => setTime(formatter.format(new Date()))

    // align the first tick to the next whole second to prevent drift
    update()
    const align = 1000 - new Date().getMilliseconds()
    let timer = window.setTimeout(function tick() {
      update()
      // schedule the next update exactly 1s later
      timer = window.setTimeout(tick, 1000)
    }, align)

    return () => clearTimeout(timer)
  }, [])


  // Waving hand animation
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches) {
      return; // Skip animation on mobile
    }

    const hand = document.getElementById("waving-hand");
    if (!hand) return;

    hand.classList.add("waving");
    const t1 = setTimeout(() => hand.classList.add("fade-out"), 3000); // fade start after 4 seconds
    const t2 = setTimeout(() => { hand.style.display = "none"; }, 3500); // hide after fade out

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Delay showing the typing animation until after the bounce animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(true)
    }, 1000) // 1 second delay to ensure bounce animations are complete

    return () => clearTimeout(timer)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!showTyping) return

    const handleTyping = () => {
      const fullText = currentPhrase

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
        return
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(500)
        return
      }

      setDisplayText((prev) => {
        if (isDeleting) {
          return prev.substring(0, prev.length - 1)
        } else {
          return fullText.substring(0, prev.length + 1)
        }
      })

      // Set typing speed - 105ms for typing (30% faster), 30ms for deleting (70% faster)
      setTypingSpeed(isDeleting ? 30 : 105)
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, currentPhrase, typingSpeed, showTyping])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        backgroundColor: "#121212",
      }}
    >
      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        
        .waving {
          display: inline-block;
          animation: wave 4s ease-in-out;
          transform-origin: 70% 70%;
        }
        
        @keyframes bounceUp {
          0% { transform: translateY(25px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-bounce-up {
          animation: bounceUp 1s ease-out forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

      `}</style>

      {/* Header */}
      <TopNavigation />

      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-start px-4 sm:px-8 lg:px-12 pt-56 sm:pt-48 md:pt-56 lg:pt-56"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
        ref={heroRef}
      >
        {/* Heading is constrained by this wrapper on the hero */}
        {/* Extra left padding here shifts the heading right WITHOUT moving the time */}
        <div className="max-w-7xl mx-auto w-full text-left space-y-4 z-10 pl-2 sm:pl-4 md:pl-6 lg:pl-8">
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-display font-semibold text-white">
            {renderWave("Welcome! I'm Kulan")}
            <span
              className="wave-span ml-2 hide-hand-on-mobile sm:inline"
              style={{ animationDelay: `${"Welcome! I'm Kulan".length * 0.05}s` }}
            >
              <span
                id="waving-hand"
                aria-hidden="true"
                style={{ animationDelay: `${("Welcome! I'm Kulan".length * 0.05) + 0.02}s` }}
              >
                👋🏽
              </span>
            </span>
            <span className="sr-only">Welcome! I'm Kulan</span>
          </h1>

          <p
            className={`text-xl sm:text-2xl font-mono text-gray-300 ${showTyping ? "animate-fade-in" : "opacity-0"}`}
            aria-hidden="true"
          >
            {displayText}
            <span
              className={`inline-block w-0.5 h-5 ml-0.5 bg-current align-middle ${showCursor ? "opacity-100" : "opacity-0"
                }`}
            ></span>
          </p>
          <p className="sr-only">I'm a Product Designer, UX Lead and Innovator.</p>
        </div>

        {/* Time pinned to the bottom, unchanged position */}
        <div className="absolute inset-x-0 bottom-24 sm:bottom-28 z-10 hidden sm:block" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex justify-end">
              <div className="text-right text-xs sm:text-sm md:text-base text-gray-300 font-mono">
                <div>London, UK</div>
                <div>{time}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">

          {/* Work Section */}
          <section id="work" className="py-12">
            <div className="space-y-2 mb-12">
              <h2 className="text-base text-gray-300 tracking-[0.1em] uppercase opacity-0 animate-bounce-up">
                MY WORK
              </h2>
              <h3 className="text-[27px] sm:text-[36px] font-display font-semibold opacity-0 animate-bounce-up">
                <span aria-hidden="true">📚</span> Stories that matter
              </h3>
            </div>

            <div className="grid gap-6">
              <div className="opacity-0 animate-bounce-up">
                <CaseStudyPreview
                  date="2024/25"
                  client="GOV.UK CLIENT"
                  title="Designing the future of contactless travel"
                  href="/case-studies/contactless-travel"
                  imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trials2-min-152wrS8iv0dqCjFwiwsHTR5R7Mhdk7.jpeg"
                  status={{ label: "Shipped", color: "bg-green-500" }}
                />
              </div>
              <div className="opacity-0 animate-bounce-up">
                <CaseStudyPreview
                  date="2024/25"
                  client="Capgemini Invent"
                  title="Leading human-centred design, empowered by AI"
                  href="/case-studies/ai-design"
                  imageSrc="/ai-design/aura_min.jpeg" // ✅ from public folder
                  status={{ label: "Concept", color: "bg-pink-500" }}
                />
              </div>
              <div className="opacity-0 animate-bounce-up">
                <CaseStudyPreview
                  date="2024"
                  client="GOV.UK CLIENT"
                  title="Improving access to benefits for citizens in medical need"
                  href="/case-studies/benefits-case-study"
                  imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwp-work1-YBcOjNYGrLjyFctNlf12YOF2Jeftgh.png"
                  status={{ label: "Shipped", color: "bg-green-500" }}
                />
              </div>
              <div className="opacity-0 animate-bounce-up">
                <CaseStudyPreview
                  date="2023"
                  client="ANGLIAN WATER"
                  title="Transforming customer relationship management"
                  href="/case-studies/crm-case-study"
                  imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anglian3-min-Gg1yQETIOPvQr9fySm8O1i5tRZYm3U.jpeg"
                  status={{ label: "Shipped", color: "bg-green-500" }}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

