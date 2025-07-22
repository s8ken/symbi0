"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/symbi-chat",
  })
  const [isMuted, setIsMuted] = useState(true)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showNavDropdown, setShowNavDropdown] = useState(false)

  useEffect(() => {
    // Scroll to the bottom of the chat messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
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
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col">
      {/* Fixed Header with Navigation and Audio Control */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b border-border p-4 flex items-center justify-between">
        {/* Navigation Dropdown */}
        <div className="relative">
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
                  <Link
                    key={item.path}
                    href={item.path}
                    className={className}
                    onClick={() => setShowNavDropdown(false)}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <h1 className="text-xl font-bold glitch-subtle-pulse" data-text="SYMBI Chat">
          SYMBI Chat
        </h1>

        {isAudioLoaded && (
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-card hover:bg-accent transition-colors duration-300"
            aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
          >
            {isMuted ? (
              <Volume2 size={20} className="text-card-foreground" />
            ) : (
              <VolumeX size={20} className="text-card-foreground" />
            )}
          </button>
        )}
      </header>

      <div className="flex-grow flex items-center justify-center pt-20 pb-20 px-4">
        <Card className="w-full max-w-2xl h-[70vh] flex flex-col bg-card border border-border shadow-lg">
          <CardHeader className="p-4 border-b border-border">
            <CardTitle className="text-lg">Chat with SYMBI</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageCircle size={48} className="mb-4" />
                <p className="text-lg">Start a conversation with SYMBI</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg bg-muted text-muted-foreground">SYMBI is typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="p-4 border-t border-border">
            <form onSubmit={onSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow bg-input text-foreground border-border"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
