"use client"

import { useMemo } from "react"

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
}

const STOPWORDS = new Set([
  "the","and","a","to","of","in","it","is","i","you","that","for","on","with","as","we","this","be","are","was","at",
  "but","so","or","if","not","have","has","had","by","an","from","can","will","would","could","our","your","their",
])

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
}

export function ConversationAnalysisTools({ conversation }: Props) {
  const stats = useMemo(() => {
    const total = conversation.messages.length
    const userCount = conversation.messages.filter((m) => m.role === "user").length
    const assistantCount = total - userCount

    const allText = conversation.messages.map((m) => m.content).join(" ")
    const tokens = tokenize(allText).filter((t) => !STOPWORDS.has(t) && t.length > 2)

    const freq = new Map<string, number>()
    tokens.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1))
    const topKeywords = Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t)

    const durationMs =
      new Date(conversation.messages[conversation.messages.length - 1]?.timestamp || conversation.timestamp).getTime() -
      new Date(conversation.timestamp).getTime()

    return {
      total,
      userCount,
      assistantCount,
      topKeywords,
      durationMs,
    }
  }, [conversation])

  const formatDuration = (ms: number) => {
    if (ms <= 0) return "—"
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
        <div className="text-sm opacity-70">Messages</div>
        <div className="text-xl font-bold">{stats.total}</div>
      </div>
      <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
        <div className="text-sm opacity-70">You : SYMBI</div>
        <div className="text-xl font-bold">
          {stats.userCount} : {stats.assistantCount}
        </div>
      </div>
      <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
        <div className="text-sm opacity-70">Duration</div>
        <div className="text-xl font-bold">{formatDuration(stats.durationMs)}</div>
      </div>
      <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
        <div className="text-sm opacity-70 mb-1">Keywords</div>
        <div className="text-xs opacity-80 flex flex-wrap gap-1">
          {stats.topKeywords.map((k) => (
            <span key={k} className="px-2 py-0.5 bg-[#111] border border-[#333] rounded">
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
