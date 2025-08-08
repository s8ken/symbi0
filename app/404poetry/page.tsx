"use client"

import { useEffect, useState } from "react"
import { Volume2, VolumeX, Home } from 'lucide-react'
import Link from "next/link"
import { allHaikus } from "../data/haikus"
import { getDailyHaikus } from "../utils/seededRandom"
import Haiku from "../components/haiku"

export default function Page() {
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
    <main className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex items-center justify-center">
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
      <div className="text-center space-y-4">
        <h1 className="glitch-title text-4xl md:text-6xl font-bold">Children of the 404</h1>
        <p className="opacity-70">A poem awaits. This page is under construction.</p>
      </div>
    </main>
  )
}
