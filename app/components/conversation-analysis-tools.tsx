"use client"

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

export function ConversationAnalysisTools({ conversation }: { conversation: Conversation }) {
  const total = conversation.messages.length
  const userMsgs = conversation.messages.filter((m) => m.role === "user").length
  const aiMsgs = total - userMsgs
  const first = new Date(conversation.timestamp).toLocaleString()
  const lastMsg = conversation.messages[conversation.messages.length - 1]
  const lastAt = lastMsg ? new Date(lastMsg.timestamp).toLocaleString() : first

  const topWords = getTopWords(conversation.messages.map((m) => m.content).join(" ")).slice(0, 5)

  return (
    <div className="bg-[#111] border border-[#333] rounded-lg p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <Stat label="Messages" value={String(total)} />
        <Stat label="User" value={String(userMsgs)} />
        <Stat label="SYMBI" value={String(aiMsgs)} />
        <Stat label="Started" value={first} />
      </div>
      <div className="mt-4">
        <div className="text-xs opacity-60 mb-1">Last Activity</div>
        <div className="text-sm">{lastAt}</div>
      </div>
      <div className="mt-4">
        <div className="text-xs opacity-60 mb-1">Top Keywords</div>
        <div className="flex flex-wrap gap-2">
          {topWords.map((w) => (
            <span key={w.word} className="px-2 py-1 text-xs rounded border border-[#444] bg-[#1a1a1a]">
              {w.word} ({w.count})
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] rounded p-3 border border-[#333]">
      <div className="text-xs opacity-60">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  )
}

function getTopWords(text: string) {
  const stop = new Set(["the", "and", "to", "of", "a", "in", "is", "it", "for", "on", "you", "i", "that", "with", "as"])
  const counts: Record<string, number> = {}
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((w) => {
      if (!stop.has(w)) counts[w] = (counts[w] || 0) + 1
    })
  return Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
}
