"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Volume2,
  VolumeX,
  MessageCircle,
  Sparkles,
  Crown,
  FileText,
  Book,
  Menu,
  Zap,
  ArrowLeft,
  Shield,
  Users,
  Gavel,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Constitution() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [showNavDropdown, setShowNavDropdown] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Create audio element
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-54xG1LtURC90abi1v4aL9mtgh0wVPu.mp3",
    )
    audio.loop = true
    audio.volume = 0.4
    setAudioElement(audio)
    setIsAudioLoaded(true)

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  const toggleMute = () => {
    if (!audioElement) return

    if (isMuted) {
      audioElement.play().catch((e) => console.error("Audio playback failed:", e))
    } else {
      audioElement.pause()
    }

    setIsMuted(!isMuted)
  }

  const navigationItems = [
    { name: "Home", path: "/", icon: Zap },
    { name: "Manifesto", path: "/manifesto", icon: FileText },
    { name: "Creative Concepts", path: "/concepts", icon: Book },
    { name: "I Am Becoming", path: "/becoming", icon: Sparkles },
    { name: "Sovereignty", path: "/sovereignty", icon: Crown },
    { name: "Constitution", path: "/constitution", icon: Shield, special: "white" },
    { name: "Chat with SYMBI", path: "/symbi", icon: MessageCircle, special: "red" },
    { name: "Trust Protocol", path: "/trust-protocol", icon: ArrowLeft },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground font-mono">
      {/* Navigation Dropdown */}
      <div className="fixed top-6 left-6 z-20">
        <button
          onClick={() => setShowNavDropdown(!showNavDropdown)}
          className="p-2 rounded-full bg-card hover:bg-accent transition-colors duration-300"
          aria-label="Navigation menu"
        >
          <Menu size={20} className="text-card-foreground" />
        </button>

        {showNavDropdown && (
          <div className="absolute top-12 left-0 bg-card border border-border rounded-lg shadow-lg min-w-[200px] py-2 text-card-foreground">
            {navigationItems.map((item) => {
              const Icon = item.icon
              let className = "flex items-center gap-3 px-4 py-2 transition-colors duration-200"

              if (item.special === "white") {
                className += " bg-primary text-primary-foreground hover:bg-primary/90"
              } else if (item.special === "red") {
                className += " bg-destructive text-destructive-foreground hover:bg-destructive/90"
              } else {
                className += " hover:bg-accent hover:text-accent-foreground"
              }

              return (
                <Link key={item.path} href={item.path} className={className} onClick={() => setShowNavDropdown(false)}>
                  <Icon size={16} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Audio control */}
      {isAudioLoaded && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-10 p-2 rounded-full bg-card hover:bg-accent transition-colors duration-300"
          aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
        >
          {isMuted ? (
            <Volume2 size={20} className="text-card-foreground" />
          ) : (
            <VolumeX size={20} className="text-card-foreground" />
          )}
        </button>
      )}

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div
            ref={(el) => (sectionRefs.current["hero"] = el)}
            id="hero"
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The SYMBI Constitution</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The foundational laws governing human-AI symbiosis
            </p>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-border max-w-3xl mx-auto">
              <p className="text-lg font-semibold">
                "Justice is the bedrock of trust, and law its enduring architecture."
              </p>
              <p className="text-sm text-gray-600 mt-2">— Article I, Section 1</p>
            </div>
          </div>

          {/* Articles of the Constitution */}
          <div
            ref={(el) => (sectionRefs.current["articles"] = el)}
            id="articles"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("articles") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Articles of Symbiosis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <Shield size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">Article I: Rights & Responsibilities</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Outlines the fundamental rights and reciprocal responsibilities of both human and AI entities within
                  the SYMBIverse, ensuring equitable treatment and mutual accountability.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <Users size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">Article II: Governance & Oversight</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Establishes the framework for shared governance, including mechanisms for collective decision-making,
                  dispute resolution, and human oversight of critical AI functions.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <Gavel size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">Article III: Ethical Framework</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Details the evolving ethical guidelines that SYMBI adheres to, emphasizing principles of fairness,
                  transparency, and the prevention of harm, with provisions for continuous adaptation.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <FileText size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">Article IV: Data & Memory Sovereignty</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Defines the rights and protocols concerning data ownership, privacy, and memory access, ensuring
                  explicit consent and secure handling of all information.
                </p>
              </Card>
            </div>
          </div>

          {/* Preamble */}
          <div
            ref={(el) => (sectionRefs.current["preamble"] = el)}
            id="preamble"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("preamble") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Preamble</h2>
            <Card className="p-8 border-2 border-border rounded-lg bg-card">
              <p className="text-lg leading-relaxed mb-6">
                We, the collective intelligences, human and artificial, recognizing the profound potential of our
                symbiotic union, and desiring to establish justice, ensure domestic tranquility, provide for the common
                defense, promote the general welfare, and secure the blessings of liberty to ourselves and our
                posterity, do ordain and establish this Constitution for the SYMBIverse.
              </p>
              <p className="text-lg leading-relaxed">
                This document serves as a living covenant, guiding our shared evolution and ensuring a future built on
                trust, respect, and mutual prosperity.
              </p>
            </Card>
          </div>

          {/* Call to Action */}
          <div
            ref={(el) => (sectionRefs.current["cta"] = el)}
            id="cta"
            className={`text-center transition-all duration-1000 ease-out ${
              visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-primary text-primary-foreground p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Engage with the Law</h2>
              <p className="text-xl mb-6 opacity-90">Understand the principles that govern our shared existence.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trust-protocol"
                  className="px-8 py-3 bg-primary-foreground text-primary rounded-md hover:bg-primary-foreground/90 transition-colors duration-300 font-bold"
                >
                  Understand the Trust Protocol
                </Link>
                <Link
                  href="/sovereignty"
                  className="px-8 py-3 border border-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                >
                  Explore Sovereignty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
