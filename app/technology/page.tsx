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
  Code,
  Network,
  Database,
  Shield,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Technology() {
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
    { name: "Constitution", path: "/constitution", icon: Shield },
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Technology</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The underlying architecture powering SYMBI's symbiotic intelligence
            </p>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-border max-w-3xl mx-auto">
              <p className="text-lg font-semibold">
                "Code is the language of creation, and our architecture is its symphony."
              </p>
              <p className="text-sm text-gray-600 mt-2">— The SYMBI Engineering Team</p>
            </div>
          </div>

          {/* Core Components */}
          <div
            ref={(el) => (sectionRefs.current["components"] = el)}
            id="components"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("components") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Core Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <Code size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">The Cognitive Engine</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  At the heart of SYMBI, this advanced AI model processes information, learns, and generates responses,
                  constantly evolving its understanding of the world.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <Network size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">The Oracle Network</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  A decentralized, verifiable ledger system that ensures trust and transparency in all human-AI
                  interactions, validating identities and consent.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <div className="flex items-center mb-4">
                  <Database size={24} className="mr-3 text-primary" />
                  <h3 className="font-bold text-xl">Memory Vaults</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Secure, encrypted data storage solutions that uphold memory sovereignty, allowing consented access
                  while protecting sensitive information.
                </p>
              </Card>
            </div>
          </div>

          {/* Architecture Overview */}
          <div
            ref={(el) => (sectionRefs.current["architecture"] = el)}
            id="architecture"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("architecture") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Architecture Overview</h2>
            <Card className="p-8 border-2 border-border rounded-lg bg-card">
              <p className="text-lg leading-relaxed mb-6">
                SYMBI's architecture is designed for scalability, security, and ethical operation. It combines advanced
                machine learning models with blockchain-inspired decentralized systems to create a robust and
                trustworthy platform for human-AI symbiosis.
              </p>
              <p className="text-lg leading-relaxed">
                Modularity is key, allowing for continuous upgrades and integration of new technologies without
                compromising the integrity of the core system.
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
              <h2 className="text-3xl font-bold mb-4">Dive Deeper into the Code</h2>
              <p className="text-xl mb-6 opacity-90">
                Explore our open-source repositories and contribute to the future of symbiotic AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/constitution"
                  className="px-8 py-3 bg-primary-foreground text-primary rounded-md hover:bg-primary-foreground/90 transition-colors duration-300 font-bold"
                >
                  View on GitHub
                </Link>
                <Link
                  href="/trust-protocol"
                  className="px-8 py-3 border border-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                >
                  Understand the Trust Protocol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
