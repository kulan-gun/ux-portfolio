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
  const phrases = ["I'm a Product Designer...", "I'm a UX Lead...", "I'm an Innovator..."]
  const currentPhraseIndex = loopNum % phrases.length
  const currentPhrase = phrases[currentPhraseIndex]
  const heroRef = useRef<HTMLDivElement>(null)

  // Waving hand animation
  useEffect(() => {
    const hand = document.getElementById("waving-hand")
    if (hand) {
      hand.classList.add("waving")

      // Remove the animation class after 4 seconds
      setTimeout(() => {
        hand.classList.remove("waving")
      }, 4000)
    }
  }, [])

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

      {/* HERO SECTION — full width */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-start px-4 pt-56 sm:pt-48 md:pt-56 lg:pt-56"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
        ref={heroRef}
      >

        <div className="max-w-6xl mx-auto w-full text-left space-y-4 z-10">
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-display font-semibold text-white opacity-0 animate-bounce-up">
            Welcome! I'm Kulan
          </h1>
          <p
            className={`text-xl sm:text-2xl font-mono text-gray-300 ${showTyping ? "animate-fade-in" : "opacity-0"}`}
            aria-hidden="true"
          >
            {displayText}
            <span className={`inline-block w-0.5 h-5 ml-0.5 bg-current align-middle ${showCursor ? "opacity-100" : "opacity-0"}`}></span>
          </p>
          <p className="sr-only">I'm a Product Designer, UX Lead and Innovator.</p>
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
                Stories that matter
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
                  title="Helping citizens get their benefits faster"
                  href="/case-studies/benefits-case-study"
                  imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwp-work1-YBcOjNYGrLjyFctNlf12YOF2Jeftgh.png"
                  status={{ label: "Shipped", color: "bg-green-500" }}
                />
              </div>
              <div className="opacity-0 animate-bounce-up">
                <CaseStudyPreview
                  date="2023"
                  client="ENTERPRISE CLIENT"
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

