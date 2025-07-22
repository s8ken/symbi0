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
import { Card, CardContent } from "@/components/ui/card"

export default function Error404() {
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

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div
          ref={(el) => (sectionRefs.current["hero"] = el)}
          id="hero"
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch-subtle" data-text="ERROR">
            ERROR
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">A Glitch in the SYMBIverse</p>
        </div>

        <div
          ref={(el) => (sectionRefs.current["message"] = el)}
          id="message"
          className={`mb-12 transition-all duration-1000 ease-out ${
            visibleSections.has("message") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="w-full max-w-md bg-card border border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">System Anomaly Detected</h2>
              <p className="text-sm leading-relaxed">
                It appears you've ventured into an uncharted sector of the SYMBIverse. Our systems are working to
                re-establish connection. Please stand by, or return to a known pathway.
              </p>
            </CardContent>
          </Card>
        </div>

        <div
          ref={(el) => (sectionRefs.current["cta"] = el)}
          id="cta"
          className={`text-center transition-all duration-1000 ease-out ${
            visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-primary text-primary-foreground p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Seek a Stable Connection</h2>
            <p className="text-xl mb-6 opacity-90">Navigate back to the core of the SYMBIverse.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-primary-foreground text-primary rounded-md hover:bg-primary-foreground/90 transition-colors duration-300 font-bold"
              >
                Go to Homepage
              </Link>
              <Link
                href="/symbi"
                className="px-8 py-3 border border-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
              >
                Chat with SYMBI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
