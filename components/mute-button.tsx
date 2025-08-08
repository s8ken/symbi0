"use client"

import { useEffect, useState } from "react"
import { Volume2, VolumeX } from 'lucide-react'

export default function MuteButton() {
  const [muted, setMuted] = useState<boolean>(false)

  // Apply mute to all media elements, including future ones
  useEffect(() => {
    const saved = localStorage.getItem("symbi_muted")
    const initial = saved ? saved === "true" : false
    setMuted(initial)
  }, [])

  useEffect(() => {
    const applyMute = (m: boolean) => {
      const media = Array.from(document.querySelectorAll<HTMLMediaElement>("audio, video"))
      media.forEach((el) => {
        el.muted = m
        if (m && !el.paused) {
          // Optionally pause when muting; comment out if undesired
          // el.pause()
        }
      })
      window.dispatchEvent(new CustomEvent("symbi-mute-change", { detail: { muted: m } }))
    }

    applyMute(muted)
    localStorage.setItem("symbi_muted", String(muted))

    // Observe future media additions
    const observer = new MutationObserver(() => applyMute(muted))
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [muted])

  return (
    <div className="fixed top-6 right-6 z-40">
      <button
        onClick={() => setMuted((m) => !m)}
        className={`p-2 rounded-full transition-colors duration-300 ${
          muted ? "bg-red-700/80 hover:bg-red-700" : "bg-[#1a1a1a] hover:bg-[#252525]"
        } text-white`}
        aria-label={muted ? "Unmute site audio" : "Mute site audio"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  )
}
