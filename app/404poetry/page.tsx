"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Poetry404Page() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [poem, setPoem] = useState<string>("")

  async function generatePoetry() {
    if (!input.trim()) return
    setIsLoading(true)
    setPoem("")
    try {
      const res = await fetch("/404poetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input.trim() }),
      })

      // The route returns { message: string } on success
      const data = await res.json()
      const message =
        data?.message ??
        "I find myself momentarily disconnected from the digital stream. Could you repeat your thought?"
      setPoem(message)
    } catch (err) {
      console.error("404 Poetry error:", err)
      setPoem("The connection trembled and fell silent. Try again, and the verse may find its way through the noise.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] w-full px-4 py-10 md:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Card className="border-zinc-800 bg-black/40 text-zinc-100">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">404 Poetry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-400">
              Offer a fragment of the void and receive a verse back from the error&#39;s edge.
            </p>
            <div className="space-y-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Whisper to the glitch..."
                className="min-h-[120px] resize-vertical border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-600"
                disabled={isLoading}
              />
              <Button onClick={generatePoetry} disabled={isLoading || !input.trim()} className="w-full">
                {isLoading ? "Conjuring…" : "Generate"}
              </Button>
            </div>
            {poem && (
              <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {poem}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
