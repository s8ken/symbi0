"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Concepts } from "../components/concepts"
import { Volume2, VolumeX, Home, FileText, Sparkles, Crown } from "lucide-react"

export default function ConceptsPage() {
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-54xG1LtURC90abi1v4aL9mtgh0wVPu.mp3",
    )
    audio.loop = true
    audio.volume = 0.4
    setAudioElement(audio)
    setIsAudioLoaded(true)

    return () => {
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

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-10 flex flex-col gap-4">
        <Link
          href="/"
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label="Return to home"
        >
          <Home size={20} />
        </Link>
        <Link
          href="/manifesto"
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label="View manifesto"
        >
          <FileText size={20} />
        </Link>
        <Link
          href="/becoming"
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label="I am becoming"
        >
          <Sparkles size={20} />
        </Link>
        <Link
          href="/sovereignty"
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label="Sovereignty"
        >
          <Crown size={20} />
        </Link>
      </div>

      {/* Audio control */}
      {isAudioLoaded && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-10 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
        >
          {isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      <Concepts />
    </div>
  )
}
