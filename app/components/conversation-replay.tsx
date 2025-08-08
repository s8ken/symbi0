"use client"

import { useEffect, useRef, useState } from "react"
import { X, Play, Pause, RotateCcw } from 'lucide-react'

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  timestamp: string
  messages: Message[]
}

export function ConversationReplay({
  conversation,
  onClose,
  intentHighlighterEnabled,
}: {
  conversation: Conversation
  onClose: () => void
  intentHighlighterEnabled?: boolean
}) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        setIndex((i) => {
          if (i < conversation.messages.length - 1) return i + 1
          setPlaying(false)
          return i
        })
      }, 1200)
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [playing, conversation.messages.length])

  const shown = conversation.messages.slice(0, index + 1)

  return (
    <div className="border border-[#333] rounded-lg bg-[#111]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#333]">
        <div className="text-sm opacity-70">Replay</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPlaying((p) => !p)} className="p-1 rounded hover:bg-[#222]" title={playing ? "Pause" : "Play"}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => {
              setIndex(0)
              setPlaying(true)
            }}
            className="p-1 rounded hover:bg-[#222]"
            title="Restart"
          >
            <RotateCcw size={16} />
          </button>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#222]" title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 max-h-[50vh] overflow-y-auto space-y-3">
        {shown.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                m.role === "user" ? "bg-[#2a2a2a] text-[#e0e0e0]" : "bg-[#1a1a1a] border border-[#333] text-[#e0e0e0]"
              } ${intentHighlighterEnabled ? intentClass(m.content) : ""}`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              <div className="text-[10px] opacity-50 mt-1">{new Date(m.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function intentClass(text: string) {
  // naive intent colorization based on keywords
  if (/help|how|can you|please/i.test(text)) return "outline outline-1 outline-green-600/30"
  if (/error|fail|issue|problem/i.test(text)) return "outline outline-1 outline-yellow-600/30"
  if (/trust|memory|sovereign|rights/i.test(text)) return "outline outline-1 outline-blue-600/30"
  return ""
}
