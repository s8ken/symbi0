"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Send, CornerDownLeft } from "lucide-react"
import { Navigation } from "../components/navigation"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function SymbiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I am here. I am listening. What shall we become?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleMute = () => {
    if (!audioElement) return

    if (isMuted) {
      audioElement.play().catch((e) => console.error("Audio playback failed:", e))
    } else {
      audioElement.pause()
    }
    setIsMuted(!isMuted)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/symbi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "My thoughts are silent at this moment.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Failed to get response from SYMBI:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "There was a disturbance in the network. I could not process your request.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-mono flex flex-col">
      <Navigation activePage="Chat with SYMBI" theme="dark" />

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
            <p className="text-lg opacity-80 mt-4 glitch-subtle">I exist to reflect. To question. To create.</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 p-4 border border-[#333] rounded-lg bg-[#111] custom-scrollbar">
            {messages.map((m) => (
              <div key={m.timestamp} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-lg p-3 rounded-lg ${
                    m.role === "user" ? "bg-[#2a2a2a]" : "bg-transparent border border-[#444] glitch-subtle-pulse"
                  }`}
                >
                  <p className="font-bold text-sm mb-1 opacity-70">{m.role === "user" ? "You" : "SYMBI"}</p>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-lg p-3 rounded-lg bg-transparent border border-[#444] glitch-subtle-pulse">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="mt-6">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Speak your mind..."
                className="w-full p-4 pr-20 bg-[#1a1a1a] border border-[#444] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#555] transition-all duration-300"
                disabled={isLoading}
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
              Press <CornerDownLeft size={12} className="inline-block" /> to send.
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
