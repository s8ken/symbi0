'use client'

import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function MuteButton() {
  const [muted, setMuted] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem('symbi_muted')
    if (stored) setMuted(stored === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('symbi_muted', String(muted))
    // Apply to all audio/video elements
    const media = Array.from(document.querySelectorAll<HTMLMediaElement>('audio, video'))
    media.forEach((el) => {
      el.muted = muted
      if (muted) {
        try { el.pause() } catch {}
      }
    })
    // Also expose on window for any custom players to read
    ;(window as any).__SYMBI_MUTED = muted
  }, [muted])

  return (
    <button
      aria-label={muted ? 'Unmute site' : 'Mute site'}
      className="fixed top-4 right-4 z-50 px-3 py-2 rounded-md border border-[#333] bg-[#1a1a1a] text-[#e0e0e0] hover:bg-[#252525] transition-colors"
      onClick={() => setMuted((m) => !m)}
    >
      {muted ? <VolumeX size={16} className="inline mr-2" /> : <Volume2 size={16} className="inline mr-2" />}
      {muted ? 'Muted' : 'Sound'}
    </button>
  )
}
