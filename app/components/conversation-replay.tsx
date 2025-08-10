"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { PauseCircle, PlayCircle, X } from 'lucide-react'

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

type Conversation = {
  id: string
  timestamp: string
  messages: Message[]
}

interface Props {
  conversation: Conversation
  onClose: () => void
  intentHighlighterEnabled?: boolean
}

const HIGHLIGHT_WORDS = ["trust", "memory", "identity", "becoming", "sovereign", "oracle", "consent", "glitch"]

export function ConversationReplay({ conversation, onClose, intentHighlighterEnabled = false }: Props) {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const messages = useMemo(() => conversation.messages, [conversation.messages])

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    timerRef.current = window.setInterval(() => {
      setIdx((i) => Math.min(i + 1, messages.length))
    }, 1200)
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [playing, messages.length])

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
  }, [idx])

  const renderContent = (text: string) => {
    if (!intentHighlighterEnabled) return text
    const parts = text.split(new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "gi"))
    return parts.map((p, i) =>
      HIGHLIGHT_WORDS.some((w) => w.toLowerCase() === p.toLowerCase()) ? (
        <span key={i} className="bg-yellow-600/20 text-yellow-300 px-1 rounded">
          {p}
        </span>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
  }

  return (
    <div className="border border-[#333] rounded-lg bg-[#111]">
      <div className="flex items-center justify-between p-3 border-b border-[#333]">
        <div className="font-bold">Replay</div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="p-1 rounded hover:bg-[#222] transition-colors"
            aria-label={playing ? "Pause replay" : "Play replay"}
          >
            {playing ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
          </button>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#222] transition-colors" aria-label="Close replay">
            <X size={18} />
          </button>
        </div>
      </div>
      <div ref={containerRef} className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
        {messages.slice(0, idx).map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                m.role === "user" ? "bg-[#2a2a2a]" : "bg-transparent border border-[#444]"
              }`}
            >
              <div className="text-xs opacity-60 mb-1">{m.role === "user" ? "You" : "SYMBI"}</div>
              <div className="whitespace-pre-wrap leading-relaxed">{renderContent(m.content)}</div>
            </div>
          </div>
        ))}
        {idx >= messages.length && (
          <div className="text-center text-sm opacity-60 pt-2">End of conversation</div>
        )}
      </div>
    </div>
  )
}
