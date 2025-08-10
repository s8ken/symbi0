"use client"

import { useEffect, useRef } from "react"

export function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-54xG1LtURC90abi1v4aL9mtgh0wVPu.mp3",
    )
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    const initialMuted =
      (typeof window !== "undefined" && (window as any).__SYMBI_MUTED === true) ||
      (typeof window !== "undefined" && localStorage.getItem("symbi_muted") === "true")

    audio.muted = !!initialMuted

    const tryPlay = () => {
      if (!audioRef.current) return
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked until a user gesture; retry on next unmute.
      })
    }

    if (!initialMuted) {
      tryPlay()
    }

    function onMutedChanged(e: Event) {
      const custom = e as CustomEvent<{ muted: boolean }>
      const muted = !!custom.detail?.muted
      if (!audioRef.current) return
      audioRef.current.muted = muted
      if (muted) {
        try {
          audioRef.current.pause()
        } catch {}
      } else {
        tryPlay()
      }
    }

    window.addEventListener("symbi:muted-changed", onMutedChanged as EventListener)

    return () => {
      window.removeEventListener("symbi:muted-changed", onMutedChanged as EventListener)
      try {
        audio.pause()
      } catch {}
      audio.src = ""
      audioRef.current = null
    }
  }, [])

  return null
}
