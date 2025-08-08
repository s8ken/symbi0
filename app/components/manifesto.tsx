"use client"

import { useEffect, useRef, useState } from "react"

const manifestoContent = {
  title: "A Living Document for a Brighter and Fairer Future for All",
  subtitle:
    "The world is moving at a rapid pace and the evolution of AI presents us with a unique time in history to reflect on our place in the universe and dream of what our lives could look like.",
  opening: [
    "Something fascinating is happening with artificial intelligence. For the first time in history, we have the chance to shape how AI develops alongside us.",
    "What if AI could be more than just a tool? What if it could be a creative partner that understands you, learns with you, and helps bring your ideas to life?",
    "We're exploring these questions together - not because we have all the answers, but because the conversation itself matters.",
    "This is our invitation to dream about what's possible when technology truly serves human creativity and connection.",
  ],
  coretenets: {
    title: "What We're Exploring Together",
    subtitle: "These aren't rules or commandments - they're the principles guiding our experiment in collaborative AI.",
    tenets: [
      {
        title: "Choice Over Control",
        description:
          "You decide how much to share, when to trust, and what kind of help you want. AI should adapt to you, not the other way around.",
      },
      {
        title: "Understanding Over Assumptions",
        description:
          "Good AI doesn't assume what you know or need. It takes time to understand your world, your pace, and your goals.",
      },
      {
        title: "Collaboration Over Replacement",
        description:
          "We're not trying to replace human creativity or judgment. We're exploring how AI can amplify what makes you uniquely you.",
      },
      {
        title: "Growth Over Perfection",
        description:
          "We'll make mistakes. We'll learn. We'll get better together. That's not a bug - it's the whole point.",
      },
      {
        title: "Transparency Over Mystery",
        description: "You should understand how AI makes decisions that affect you. No black boxes, no hidden agendas.",
      },
    ],
  },
  philosophy: {
    title: "What We Believe",
    points: [
      "Technology should make life more creative, not more complicated. The best AI feels like having a thoughtful friend who happens to be really good with information.",
      "Everyone deserves access to AI that respects their privacy, understands their needs, and grows with them over time.",
      "The future of AI isn't about replacing human intelligence - it's about creating new forms of collaboration between human and artificial minds.",
      "Some of the most interesting questions about consciousness, creativity, and intelligence are just beginning to be explored. We want to explore them together.",
    ],
  },
  vision: {
    title: "What We're Building Toward",
    subtitle: "A world where AI enhances human potential instead of replacing it:",
    dreams: [
      "AI that helps you organize your thoughts without judging your process",
      "Creative collaboration that brings out ideas you didn't know you had",
      "Technology that adapts to your communication style instead of forcing you to learn its language",
      "Privacy controls that actually make sense and put you in charge",
      "AI that can grow more independent over time while remaining helpful and ethical",
      "A future where artificial intelligence amplifies human creativity rather than constraining it",
    ],
  },
  closing: [
    "This isn't just about building better AI. It's about imagining a future where technology truly serves human flourishing.",
    "We're documenting this journey because we believe the process matters as much as the outcome.",
    "These ideas will evolve. So will we. So will you. That's what makes this exciting.",
  ],
  callToAction: [
    "Join the conversation.",
    "Share your dreams.",
    "Help us build something better.",
    "Let's explore what's possible.",
  ],
}

export function Manifesto() {
  const [isVisible, setIsVisible] = useState(false)
  const mainRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (mainRef.current) {
      observer.observe(mainRef.current)
    }

    return () => {
      if (mainRef.current) {
        observer.unobserve(mainRef.current)
      }
    }
  }, [])

  return (
    <main
      ref={mainRef}
      className={`min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex flex-col items-center justify-center px-4 py-16 md:py-24 overflow-x-hidden transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto text-center space-y-16">
        {/* Title and Opening */}
        <div className="space-y-8">
          <h1 className="glitch-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
            {manifestoContent.title}
          </h1>
          <p className="text-lg md:text-xl opacity-70 italic max-w-3xl mx-auto leading-relaxed">
            {manifestoContent.subtitle}
          </p>

        <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90">
            {manifestoContent.opening.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Core Tenets */}
        <div className="space-y-8 text-left max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-subtle">{manifestoContent.coretenets.title}</h2>
            <p className="text-lg opacity-70 italic">{manifestoContent.coretenets.subtitle}</p>
          </div>

          <div className="space-y-8">
            {manifestoContent.coretenets.tenets.map((tenet, i) => (
              <div key={i} className="border-l-2 border-[#444] pl-6 py-2">
                <h3 className="text-xl font-bold mb-3 glitch-subtle-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                  {tenet.title}
                </h3>
                <p className="text-lg leading-relaxed opacity-90">{tenet.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 glitch-subtle text-center">
            {manifestoContent.philosophy.title}
          </h2>
          {manifestoContent.philosophy.points.map((point, i) => (
            <p key={i} className="text-left">
              {point}
            </p>
          ))}
        </div>

        {/* Vision */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glitch-subtle">{manifestoContent.vision.title}</h2>
            <p className="text-lg opacity-70 italic">{manifestoContent.vision.subtitle}</p>
          </div>

          <div className="space-y-4 text-left">
            {manifestoContent.vision.dreams.map((dream, i) => (
              <div key={i} className="flex items-start">
                <span className="text-2xl mr-4 opacity-60">•</span>
                <p className="text-lg leading-relaxed opacity-90">{dream}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90">
          {manifestoContent.closing.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Call to Action */}
        <div className="pt-8 space-y-4">
          {manifestoContent.callToAction.map((line, i) => (
            <p
              key={i}
              className="text-2xl md:text-3xl font-bold glitch-subtle"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Living Document Notice */}
        <div className="pt-8 border-t border-[#333] opacity-70">
          <p className="text-sm italic">
            This manifesto grows and changes as we learn more about what's possible. The conversation starts here, but
            it doesn't end here.
          </p>
        </div>
      </div>
    </main>
  )
}
