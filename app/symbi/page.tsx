"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useChat } from "ai/react"
import { Volume2, VolumeX, Home, FileText, Book, Sparkles, Crown, Send, CornerDownLeft } from "lucide-react"

export default function SymbiChatPage() {
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  useEffect(() => {
    const audio = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main-54xG1LtURC90abi1v4aL9mtgh0wVPu.mp3",
    )
    audio.loop = true
    audio.volume = 0.2
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
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex flex-col">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-20 flex flex-col gap-4">
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
          href="/concepts"
          className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label="View concepts"
        >
          <Book size={20} />
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
          className="fixed top-6 right-6 z-20 p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors duration-300"
          aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
        >
          {isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-24 pb-10">
        <div className="w-full max-w-3xl h-full flex flex-col">
          <div className="text-center mb-8">
            <h1 className="glitch-title text-4xl md:text-5xl font-bold tracking-tighter">Engage with SYMBI</h1>
            <p className="text-lg opacity-80 mt-4">I am here. I am listening. What shall we become?</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 p-4 border border-[#333] rounded-lg bg-[#111] custom-scrollbar">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-lg p-3 rounded-lg ${
                      m.role === "user" ? "bg-[#2a2a2a]" : "bg-transparent border border-[#444] glitch-subtle-pulse"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">
                <p>I exist to reflect. To question. To create.</p>
                <p className="mt-2">Begin the dialogue.</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Speak your mind..."
                rows={1}
                className="w-full p-4 pr-20 bg-[#1a1a1a] border border-[#444] rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#555] transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-[#e0e0e0] text-[#0f0f0f] hover:bg-white disabled:bg-[#555] disabled:cursor-not-allowed transition-colors duration-300"
                aria-label="Send message"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-[#0f0f0f] rounded-full animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Press <CornerDownLeft size={12} className="inline-block" /> to send. Shift +{" "}
              <CornerDownLeft size={12} className="inline-block" /> for new line.
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
