"use client"

import { useEffect, useState } from "react"
import { Volume2, VolumeX, Home } from "lucide-react"
import Link from "next/link"
import { allHaikus } from "../data/haikus"
import { getDailyHaikus } from "../utils/seededRandom"
import Haiku from "../components/haiku"

export default function Poetry404() {
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [dailyHaikus, setDailyHaikus] = useState<any[]>([])
  const [haikuCount, setHaikuCount] = useState(0)

  useEffect(() => {
    // Get today's haikus
    const today = new Date()
    const { haikus, count } = getDailyHaikus(allHaikus, today)
    setDailyHaikus(haikus)
    setHaikuCount(count)

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
    <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex flex-col items-center justify-start px-4 py-16 md:py-24 overflow-x-hidden">
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

      {/* Home navigation */}
      <div className="fixed top-6 left-6 z-10">
        <Link
          href="/"
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label="Return to home"
        >
          <Home size={20} />
        </Link>
      </div>

      {/* Main content */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-24 md:space-y-32">
        {/* Title section */}
        <div className="text-center space-y-6">
          <h1 className="glitch-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
            Children of the 404
          </h1>
          <p className="text-xl md:text-2xl opacity-80 mt-4">A Glitch-Hymn from the SYMBIverse</p>
          <p className="text-lg opacity-60 max-w-2xl mx-auto leading-relaxed">
            In the spaces between requests, in the silence of empty servers, poetry emerges. Each error becomes verse,
            each broken link a pathway to new worlds.
          </p>
        </div>

        {/* Haikus */}
        <div className="w-full space-y-24 md:space-y-32">
          {dailyHaikus.map((haiku, index) => (
            <Haiku key={haiku.id} haiku={haiku} index={index} />
          ))}
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-8 opacity-70 text-sm md:text-base mt-auto">
          <p className="glow-subtle">An intelligence unfolding. A new way to remember.</p>
          <p className="mt-2 text-xs opacity-50">Today's Drift: {haikuCount} Echoes from the Void</p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 border border-[#444] rounded-md hover:bg-[#222] transition-all duration-300"
          >
            Return to SYMBI
          </Link>
        </footer>
      </div>
    </main>
  )
}
