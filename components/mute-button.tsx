"use client"

import { useEffect, useState } from "react"
import { Volume2, VolumeX } from 'lucide-react'

export default function MuteButton() {
  const [muted, setMuted] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem("symbi_muted")
    const initial = stored === "true"
    setMuted(initial)
    applyMute(initial)
  }, [])

  const applyMute = (val: boolean) => {
    const media = document.querySelectorAll("audio, video")
    media.forEach((el) => {
      try {
        ;(el as HTMLMediaElement).muted = val
        if (val && !(el as HTMLMediaElement).paused) {
          ;(el as HTMLMediaElement).pause()
        }
      } catch {
        // ignore
      }
    })
  }

  const toggle = () => {
    const next = !muted
    setMuted(next)
    localStorage.setItem("symbi_muted", String(next))
    applyMute(next)
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={muted}
      title={muted ? "Unmute" : "Mute"}
      className="fixed top-4 right-4 z-50 p-2 rounded-md bg-[#1a1a1a] text-[#e0e0e0] border border-[#333] hover:bg-[#252525] transition-colors"
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  )
}
