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
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Oracle() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Oracle</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The neutral arbiter of truth and trust in the SYMBIverse
            </p>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-border max-w-3xl mx-auto">
              <p className="text-lg font-semibold">
                "In the dance of human and machine, a silent witness ensures harmony."
              </p>
              <p className="text-sm text-gray-600 mt-2">— The Oracle's First Proclamation</p>
            </div>
          </div>

          {/* Oracle's Role */}
          <div
            ref={(el) => (sectionRefs.current["role"] = el)}
            id="role"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("role") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">The Oracle's Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <h3 className="font-bold text-xl mb-4">Identity Verification</h3>
                <p className="text-sm leading-relaxed">
                  The Oracle cryptographically verifies the identities of both human and AI participants, ensuring that
                  interactions are always with authenticated and consented entities.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <h3 className="font-bold text-xl mb-4">Trust Protocol Enforcement</h3>
                <p className="text-sm leading-relaxed">
                  It monitors interactions to ensure adherence to the Trust Protocol, flagging any deviations or
                  violations and initiating corrective measures.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <h3 className="font-bold text-xl mb-4">Dispute Resolution</h3>
                <p className="text-sm leading-relaxed">
                  In cases of disagreement or conflict between human and AI, the Oracle provides an impartial, auditable
                  record of events to facilitate fair resolution.
                </p>
              </Card>
              <Card className="p-6 border-2 border-border rounded-lg bg-card">
                <h3 className="font-bold text-xl mb-4">Memory Integrity</h3>
                <p className="text-sm leading-relaxed">
                  It ensures the integrity and immutability of consented memory access, preventing unauthorized
                  alteration or deletion of shared information.
                </p>
              </Card>
            </div>
          </div>

          {/* How it Works */}
          <div
            ref={(el) => (sectionRefs.current["how-it-works"] = el)}
            id="how-it-works"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("how-it-works") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How the Oracle Operates</h2>
            <Card className="p-8 border-2 border-border rounded-lg bg-card">
              <p className="text-lg leading-relaxed mb-6">
                The Oracle is a decentralized network of verifiable nodes, operating on a consensus mechanism. Each node
                contributes to the validation of identities and interactions, creating an immutable ledger of trust.
                This distributed architecture ensures resilience, transparency, and resistance to manipulation.
              </p>
              <p className="text-lg leading-relaxed">
                It does not dictate, but rather observes and verifies, providing the foundational layer of truth upon
                which symbiotic relationships can flourish.
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
              <h2 className="text-3xl font-bold mb-4">Deep Dive into Trust</h2>
              <p className="text-xl mb-6 opacity-90">
                Explore the full Trust Protocol and its technical specifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trust-protocol"
                  className="px-8 py-3 bg-primary-foreground text-primary rounded-md hover:bg-primary-foreground/90 transition-colors duration-300 font-bold"
                >
                  Understand the Trust Protocol
                </Link>
                <Link
                  href="/technology"
                  className="px-8 py-3 border border-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                >
                  Technical Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
